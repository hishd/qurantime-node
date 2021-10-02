import asyncHandler from 'express-async-handler'
import HealthStatus from '../models/HealthStatusModel.js'
import Patient from '../models/PatientModel.js'

const getPatients = asyncHandler(async (req, res) => {
  const patients = await Patient.find({})
  res.json(patients)
})

const signIn = asyncHandler(async (req, res) => {
  if (!req.body.email) return res.status(400).send({ error: 'email not found' })
  if (!req.body.password)
    return res.status(400).send({ error: 'password not found' })

  const patientData = await Patient.findOne({ emailAddress: req.body.email })

  if (!patientData)
    return res.send(404).json({ error: 'Patient account not found' })

  if (await patientData.matchPassword(req.body.password)) {
    return res.json({
      fullName: patientData.fullName,
      nicNo: patientData.nicNo,
      address: patientData.address,
      contactNo: patientData.contactNo,
      emailAddress: patientData.emailAddress,
      hospitalID: patientData.hospital.hospitalID,
    })
  } else {
    return res.send(401).json({ error: 'Invalid email or password' })
  }
})

const resetPassword = asyncHandler(async (req, res) => {
  if (!req.body.email) return res.status(400).send({ error: 'email not found' })

  const patientData = await Patient.findOne({ emailAddress: req.body.email })

  if (!patientData)
    return res.send(404).json({ error: 'Patient account not found' })

  const otp = Math.floor(1000 + Math.random() * 9000)
  res.json({ email: patientData.emailAddress, otp: otp })
  sendOTP(patientData.emailAddress, otp)
})

const updatePassword = asyncHandler(async (req, res) => {
  if (!req.body.email) return res.status(400).send({ error: 'email not found' })

  const patientData = await Patient.findOne({ emailAddress: req.body.email })

  if (!patientData)
    return res.send(404).json({ error: 'Ptient account not found' })

  patientData.password = req.body.password
  await patientData.save()
  res.json({ result: 'Password updated!' })
})

const updateProfile = asyncHandler(async (req, res) => {
  if (!req.body.fullName)
    return res.status(400).send({ error: 'Full Name not found' })
  if (!req.body.contactNo)
    return res.status(400).send({ error: 'Contact number not found' })
  if (!req.body.emailAddress)
    return res.status(400).send({ error: 'Email Address not found' })

  const patientData = await Patient.findOne({
    emailAddress: req.body.emailAddress,
  })

  if (!patientData)
    return res.send(404).json({ error: 'Patient account not updated' })

  patientData.fullName = req.body.fullName
  patientData.contactNo = req.body.contactNo
  patientData.emailAddress = req.body.emailAddress
  await patientData.save()
  res.json({ result: 'Profile information updated!' })
})

const updateSymptoms = asyncHandler(async (req, res) => {
  if (!req.body.nicNo)
    return res.status(400).send({ error: 'NIC Number not found' })
  if (!req.body.symptoms)
    return res.status(400).send({ error: 'Symptoms not found' })
  if (!req.body.lastUpdate)
    return res.status(400).send({ error: 'Last updated time not found' })

  const currentSymptoms = HealthStatus.findOne({
    'patient.nicNo': req.body.nicNo,
  })
  if (currentSymptoms) {
    currentSymptoms.currentCondition.lastUpdate = req.body.lastUpdate
    currentSymptoms.currentCondition.symptoms = req.body.symptoms
    if (req.body.symptoms.length > 3) {
      currentSymptoms.currentCondition.condition = 'Severe'
    } else {
      currentSymptoms.currentCondition.condition = 'Normal'
    }
    await currentSymptoms.save()
    res.json({ result: 'Current symptoms updated!' })
  } else {
    return res.send(404).json({ error: 'Patient symtom record not found' })
  }
})

const updateHealthStatus = asyncHandler(async (req, res) => {
  if (!req.body.nicNo)
    return res.status(400).send({ error: 'NIC Number not found' })
  if (!req.body.spo2Level)
    return res.status(400).send({ error: 'SpO2 level not found' })
  if (!req.body.bpmLevel)
    return res.status(400).send({ error: 'BPM level not found' })
  if (!req.body.time)
    return res.status(400).send({ error: 'Update time not found' })

  const previousData = await HealthStatus.aggregate([
    { $match: { 'patient.nicNo': req.params.nicNo } },
    { $unwind: '$measurements' },
    { $sort: { 'measurements.time': 1 } },
    { $limit: 10 },
    { $project: { measurements: 1 } },
  ])

  var previousSpO2 = []
  var decendingPattern = []
  for (const item of previousData) {
    previousSpO2.push(item.measurements.spo2Level)
  }

  for (var i = 0; i < previousSpO2.length; i++) {
    if (i == 0) continue

    if (previousSpO2[i] < previousSpO2[i - 1]) decendingPattern.push(true)
    else decendingPattern.push(false)
  }

  const desc = decendingPattern.filter((x) => x === true).length
  const asc = decendingPattern.filter((x) => x === false).length
  const healthStatus = desc > asc ? 'Critical Condition' : 'Normal Condition'
  const newRecord = {
    spo2Level: req.body.spo2Level,
    bpmLevel: req.body.bpmLevel,
    time: req.body.time,
    result: req.body.spo2Level > 94 ? 'Normal' : 'Critical',
  }
  const patientRecord = HealthStatus.find({ 'patient.nicNo': req.params.nicNo })
  if (patientRecord) {
    patientRecord.healthStatus = healthStatus
    patientRecord.measurements.push(newRecord)
    await patientRecord.save()
    res.json({ result: 'Health record added!' })
  } else {
    return res.send(404).json({ error: 'Patient health record not found' })
  }
})

const getHealthStatusHistory = asyncHandler(async (req, res) => {
  if (!req.params.nicNo)
    return res.status(400).send({ error: 'NIC Number not found' })
  const previousData = await HealthStatus.aggregate([
    { $match: { 'patient.nicNo': req.params.nicNo } },
    { $unwind: '$measurements' },
    { $sort: { 'measurements.time': 1 } },
    { $limit: 10 },
    { $project: { measurements: 1 } },
  ])

  var healthData = []
  for (const item of previousData) {
    healthData.push({
      spo2Level: item.measurements.spo2Level,
      bpmLevel: item.measurements.bpmLevel,
      time: item.measurements.time,
      result: item.measurements.result,
    })
  }

  res.json(healthData)
})

export {
  getPatients,
  signIn,
  resetPassword,
  updatePassword,
  updateProfile,
  updateSymptoms,
  getHealthStatusHistory,
}

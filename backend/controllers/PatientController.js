import asyncHandler from 'express-async-handler'
import HealthStatus from '../models/HealthStatusModel.js'
import Patient from '../models/PatientModel.js'
import Hospital from '../models/HospitalModel.js'
import moment from 'moment'
import mongoose from 'mongoose'
import { sendOTP } from './EmailController.js'

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
    return res.status(404).json({ error: 'Patient account not found' })

  if (await patientData.matchPassword(req.body.password)) {
    var hospitalContact = '1990'
    const hospitalData = await Hospital.findById(
      patientData.hospital.hospitalID
    )
    if (hospitalData) {
      hospitalContact = hospitalData.contactNo
    }
    return res.json({
      fullName: patientData.fullName,
      nicNo: patientData.nicNo,
      address: patientData.address,
      contactNo: patientData.contactNo,
      emailAddress: patientData.emailAddress,
      hospitalID: patientData.hospital.hospitalID,
      hospitalContact: hospitalContact,
    })
  } else {
    return res.status(401).json({ error: 'Invalid email or password' })
  }
})

const resetPassword = asyncHandler(async (req, res) => {
  if (!req.body.email) return res.status(400).send({ error: 'email not found' })

  const patientData = await Patient.findOne({ emailAddress: req.body.email })

  if (!patientData)
    return res.status(404).json({ error: 'Patient account not found' })

  const otp = Math.floor(1000 + Math.random() * 9000)
  res.json({ email: patientData.emailAddress, otp: otp })
  sendOTP(patientData.emailAddress, otp)
})

const updatePassword = asyncHandler(async (req, res) => {
  if (!req.body.email) return res.status(400).send({ error: 'email not found' })

  const patientData = await Patient.findOne({ emailAddress: req.body.email })

  if (!patientData)
    return res.status(404).json({ error: 'Ptient account not found' })

  patientData.password = req.body.password
  await patientData.save()
  res.json({ result: 'Password updated!' })
})

const updateProfile = asyncHandler(async (req, res) => {
  if (!req.body.nicNo)
    return res.status(400).send({ error: 'NIC number not found' })
  if (!req.body.fullName)
    return res.status(400).send({ error: 'Full Name not found' })
  if (!req.body.contactNo)
    return res.status(400).send({ error: 'Contact number not found' })
  if (!req.body.emailAddress)
    return res.status(400).send({ error: 'Email Address not found' })

  const patientData = await Patient.findOne({
    nicNo: req.body.nicNo,
  })

  const checkemail = await Patient.findOne({
    emailAddress: req.body.emailAddress,
  })

  if (checkemail && patientData.emailAddress != req.body.emailAddress)
    return res.status(400).json({ error: 'Email address already in use' })

  if (!patientData)
    return res.status(404).json({ error: 'Patient account not updated' })

  patientData.fullName = req.body.fullName
  patientData.contactNo = req.body.contactNo
  patientData.emailAddress = req.body.emailAddress
  await patientData.save()
  const healthData = await HealthStatus.findOne({
    'patient.nicNo': req.body.nicNo,
  })
  if (healthData) {
    healthData.patient.fullName = req.body.fullName
    healthData.patient.contactNo = req.body.contactNo
    await healthData.save()
  }
  res.json({ result: 'Profile information updated!' })
})

const updateSymptoms = asyncHandler(async (req, res) => {
  if (!req.body.nicNo)
    return res.status(400).send({ error: 'NIC Number not found' })
  if (!req.body.symptoms)
    return res.status(400).send({ error: 'Symptoms not found' })

  const currentSymptoms = await HealthStatus.findOne({
    'patient.nicNo': req.body.nicNo,
  })
  if (currentSymptoms) {
    currentSymptoms.currentCondition.lastUpdate = moment().utc(true)
    currentSymptoms.currentCondition.symptoms = req.body.symptoms
    if (req.body.symptoms.length > 3) {
      currentSymptoms.currentCondition.condition = 'Severe'
    } else {
      currentSymptoms.currentCondition.condition = 'Normal'
    }
    await currentSymptoms.save()
    res.json({ result: 'Current symptoms updated!' })
  } else {
    return res.status(404).json({ error: 'Patient symtom record not found' })
  }
})

const updateHealthStatus = asyncHandler(async (req, res) => {
  if (!req.body.nicNo)
    return res.status(400).send({ error: 'NIC Number not found' })
  if (!req.body.data)
    return res.status(400).send({ error: 'Measurement data not found' })

  const previousData = await HealthStatus.aggregate([
    { $match: { 'patient.nicNo': req.body.nicNo } },
    { $unwind: '$measurements' },
    { $sort: { 'measurements.time': -1 } },
    { $limit: 10 },
    { $project: { measurements: 1 } },
  ])

  var previousSpO2 = []
  var decendingPattern = []
  for (const item of previousData) {
    previousSpO2.push(item.measurements.spo2Level)
  }

  for (var i = 0; i < previousSpO2.length; i++) {
    if (i == previousSpO2.length - 1) break
    if (previousSpO2[i] < previousSpO2[i + 1] || previousSpO2[i] < 94) {
      decendingPattern.push(true)
      // console.log('Adding to Decending')
    } else decendingPattern.push(false)
  }

  const desc = decendingPattern.filter((x) => x === true).length
  const asc = decendingPattern.filter((x) => x === false).length
  const healthStatus = desc > asc ? 'Critical Condition' : 'Normal Condition'

  //
  // const newRecord = {
  //   spo2Level: req.body.spo2Level,
  //   bpmLevel: req.body.bpmLevel,
  //   time: moment().utc(true),
  //   result: req.body.spo2Level > 94 ? 'Normal' : 'Critical',
  // }

  var patientRecord = await HealthStatus.findOne({
    'patient.nicNo': req.body.nicNo,
  })

  if (patientRecord) {
    patientRecord.healthStatus = healthStatus
    for (const record of req.body.data) {
      patientRecord.measurements.push({
        spo2Level: record.spo2Level,
        bpmLevel: record.bpmLevel,
        time: moment().utc(true),
        result: record.spo2Level > 94 ? 'Normal' : 'Critical',
      })
    }
    await patientRecord.save()
    res.json({ result: 'Health record added!' })
  } else {
    return res.status(404).json({ error: 'Patient health record not found' })
  }
})

const getHealthStatusHistory = asyncHandler(async (req, res) => {
  if (!req.body.nicNo)
    return res.status(400).send({ error: 'NIC Number not found' })
  const previousData = await HealthStatus.aggregate([
    { $match: { 'patient.nicNo': req.body.nicNo } },
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
      time: moment(item.measurements.time).format('YYYY-MM-DD HH:mm'),
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
  updateHealthStatus,
  getHealthStatusHistory,
}

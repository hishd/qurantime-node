import asyncHandler from 'express-async-handler'
import Officer from '../models/OfficerModel.js'
import { sendOTP } from './EmailController.js'
import HealthStatus from '../models/HealthStatusModel.js'
import Patient from '../models/PatientModel.js'
import generator from 'generate-password'
import moment from 'moment'

const getOfficers = asyncHandler(async (req, res) => {})

const signIn = asyncHandler(async (req, res) => {
  if (!req.body.email) return res.status(400).send({ error: 'email not found' })
  if (!req.body.password)
    return res.status(400).send({ error: 'password not found' })

  const officerData = await Officer.findOne({ emailAddress: req.body.email })

  if (!officerData)
    return res.status(404).json({ error: 'Officer account not found' })

  if (await officerData.matchPassword(req.body.password)) {
    return res.json({
      fullName: officerData.fullName,
      nicNo: officerData.nicNo,
      contactNo: officerData.contactNo,
      emailAddress: officerData.emailAddress,
      districtID: officerData.district.districtID,
      districtName: officerData.district.districtName,
      cityID: officerData.city.cityID,
      cityName: officerData.city.cityName,
    })
  } else {
    return res.status(401).json({ error: 'Invalid email or password' })
  }
})

const resetPassword = asyncHandler(async (req, res) => {
  if (!req.body.email) return res.status(400).send({ error: 'email not found' })

  const officerData = await Officer.findOne({ emailAddress: req.body.email })

  if (!officerData)
    return res.status(404).json({ error: 'Officer account not found' })

  const otp = Math.floor(1000 + Math.random() * 9000)
  res.json({ email: officerData.emailAddress, otp: otp })
  sendOTP(officerData.emailAddress, otp)
})

const updatePassword = asyncHandler(async (req, res) => {
  if (!req.body.email) return res.status(400).send({ error: 'email not found' })

  const officerData = await Officer.findOne({ emailAddress: req.body.email })

  if (!officerData)
    return res.status(404).json({ error: 'Officer account not found' })

  officerData.password = req.body.password
  await officerData.save()
  res.json({ result: 'Password updated!' })
})

const getAreaStats = asyncHandler(async (req, res) => {
  if (!req.body.cityID)
    return res.status(400).send({ error: 'City ID not found' })

  const activePatients = await Patient.countDocuments({
    active: true,
    'city.cityID': req.body.cityID,
  })
  const criticalCount = await HealthStatus.countDocuments({
    healthStatus: 'Critical Condition',
    'patient.cityID': req.body.cityID,
  })
  const normalCount = await HealthStatus.countDocuments({
    healthStatus: 'Normal Condition',
    'patient.cityID': req.body.cityID,
  })

  res.json({
    activePatients: activePatients,
    criticalCount: criticalCount,
    normalCount: normalCount,
  })
})

const registerPatient = asyncHandler(async (req, res) => {
  if (!req.body.nicNo)
    return res.status(400).send({ error: 'NIC number not found' })
  if (!req.body.fullName)
    return res.status(400).send({ error: 'Full Name number not found' })
  if (!req.body.address)
    return res.status(400).send({ error: 'Address not found' })
  if (!req.body.contactNo)
    return res.status(400).send({ error: 'Contact number not found' })
  if (!req.body.emailAddress)
    return res.status(400).send({ error: 'Email Address not found' })
  if (!req.body.password)
    return res.status(400).send({ error: 'Password not found' })
  if (!req.body.locationLat)
    return res.status(400).send({ error: 'Location Lat not found' })
  if (!req.body.locationLon)
    return res.status(400).send({ error: 'Location Lon not found' })
  if (!req.body.hospitalID)
    return res.status(400).send({ error: 'Hospital ID not found' })
  if (!req.body.hospitalName)
    return res.status(400).send({ error: 'Hospital name not found' })
  if (!req.body.districtID)
    return res.status(400).send({ error: 'District ID not found' })
  if (!req.body.districtName)
    return res.status(400).send({ error: 'District Name not found' })
  if (!req.body.cityID)
    return res.status(400).send({ error: 'City ID not found' })
  if (!req.body.cityName)
    return res.status(400).send({ error: 'City Name not found' })

  const {
    nicNo,
    fullName,
    address,
    contactNo,
    emailAddress,
    password,
    locationLat,
    locationLon,
    vaccinated,
    hospitalID,
    hospitalName,
    districtID,
    districtName,
    cityID,
    cityName,
  } = req.body

  const active = true
  var comorbidities = []
  if (req.body.comorbidities) {
    for (const entry of req.body.comorbidities) {
      comorbidities.push({
        name: entry.name,
      })
    }
  }

  const patient = await Patient.findOne({ nicNo })
  if (patient) {
    patient.fullName = fullName
    patient.address = address
    patient.contactNo = contactNo
    patient.emailAddress = emailAddress
    patient.location.lat = locationLat
    patient.location.lon = locationLon
    patient.vaccinated = vaccinated
    patient.hospital.hospitalID = hospitalID
    patient.hospital.hospitalName = hospitalName
    patient.district.districtID = districtID
    patient.district.districtName = districtName
    patient.city.cityID = cityID
    patient.city.cityName = cityName
    patient.active = active
    patient.password = password
    patient.comorbidities = comorbidities

    await patient.save()
    return res.json({ result: 'Patient registration successful!' })
  } else {
    const patientData = {
      nicNo: nicNo,
      fullName: fullName,
      address: address,
      contactNo: contactNo,
      emailAddress: emailAddress,
      'location.lat': locationLat,
      'location.lon': locationLon,
      vaccinated: vaccinated,
      'hospital.hospitalID': hospitalID,
      'hospital.hospitalName': hospitalName,
      'district.districtID': districtID,
      'district.districtName': districtName,
      'city.cityID': cityID,
      'city.cityName': cityName,
      active: active,
      password: password,
      comorbidities: comorbidities,
    }

    const createdPatient = await Patient.create(patientData)
    if (createdPatient) {
      const healthRecord = await HealthStatus.findOne({
        'patient.nicNo': nicNo,
      })
      if (!healthRecord) {
        const healthData = {
          'patient.nicNo': nicNo,
          'patient.fullName': fullName,
          'patient.contactNo': contactNo,
          'patient.cityID': cityID,
          hospitalID: hospitalID,
          healthStatus: 'Normal Condition',
          'currentCondition.condition': 'Normal',
        }

        await HealthStatus.create(healthData)
      }

      return res.json({ result: 'Patient registration successful!' })
    } else
      return res
        .status(400)
        .send({ result: 'Could not create new patient record' })
  }
})

const searchPatients = asyncHandler(async (req, res) => {
  if (!req.body.cityID)
    return res.status(400).send({ error: 'City ID not found' })
  var patientDataResponse = []
  if (!req.body.nicNo) {
    const patientsData = await HealthStatus.find(
      { 'patient.cityID': req.body.cityID },
      ['patient.nicNo', 'patient.fullName', 'patient.contactNo', 'healthStatus']
    )
    for (const data of patientsData) {
      patientDataResponse.push({
        nicNo: data.patient.nicNo,
        fullName: data.patient.fullName,
        contactNo: data.patient.contactNo,
        healthStatus: data.healthStatus,
      })
    }
    res.json(patientDataResponse)
  } else {
    const patientsData = await HealthStatus.find(
      { 'patient.nicNo': req.body.nicNo },
      ['patient.nicNo', 'patient.fullName', 'patient.contactNo', 'healthStatus']
    )
    for (const data of patientsData) {
      patientDataResponse.push({
        nicNo: data.patient.nicNo,
        fullName: data.patient.fullName,
        contactNo: data.patient.contactNo,
        healthStatus: data.healthStatus,
      })
    }
    res.json(patientDataResponse)
  }
})

const removePatient = asyncHandler(async (req, res) => {
  Patient.findOneAndRemove({ nicNo: req.body.nicNo }, function (err, data) {
    if (!err) {
      res.status(200).json({ result: 'Patient record removed' })
    } else {
      res.status(400).json({ error: 'Could not remove Patient record!' })
    }
  })
  HealthStatus.findOneAndRemove(
    { 'patient.nicNo': req.body.nicNo },
    function (err, data) {
      if (!err) {
        console.log('Health Record removed')
      } else {
        console.log('Could not remove health record')
      }
    }
  )
})

const filterByStatus = asyncHandler(async (req, res) => {
  if (!req.body.cityID)
    return res.status(400).send({ error: 'City ID not found' })

  if (!req.body.healthStatus && !req.body.currentCondition)
    return res
      .status(400)
      .send({ error: 'Health Status or Current Condition not found' })

  var healthData = []

  if (req.body.healthStatus) {
    healthData = await HealthStatus.find(
      {
        healthStatus: req.body.healthStatus,
        'patient.cityID': req.body.cityID,
      },
      [
        'patient.nicNo',
        'patient.fullName',
        'patient.contactNo',
        'healthStatus',
        'currentCondition.condition',
        'currentCondition.lastUpdate',
      ]
    )
  }

  if (req.body.currentCondition) {
    healthData = await HealthStatus.find(
      {
        'currentCondition.condition': req.body.currentCondition,
        'patient.cityID': req.body.cityID,
      },
      [
        'patient.nicNo',
        'patient.fullName',
        'patient.contactNo',
        'healthStatus',
        'currentCondition.condition',
        'currentCondition.lastUpdate',
      ]
    )
  }

  var responseData = []
  for (const data of healthData) {
    responseData.push({
      nicNo: data.patient.nicNo,
      fullName: data.patient.fullName,
      contactNo: data.patient.contactNo,
      healthStatus: data.healthStatus,
      latestCondition: data.currentCondition.condition,
      lastUpdate: moment
        .utc(data.currentCondition.lastUpdate)
        .format('YYYY-MM-DD HH:mm'),
    })
  }

  res.json(responseData)
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

  const officerData = await Officer.findOne({
    nicNo: req.body.nicNo,
  })

  const checkemail = await Officer.findOne({
    emailAddress: req.body.emailAddress,
  })

  if (checkemail && officerData.emailAddress != req.body.emailAddress)
    return res.status(401).json({ error: 'Email address already in use' })

  if (!officerData)
    return res.status(404).json({ error: 'Officer account not updated' })

  officerData.fullName = req.body.fullName
  officerData.contactNo = req.body.contactNo
  officerData.emailAddress = req.body.emailAddress
  await officerData.save()
  res.json({ result: 'Profile information updated!' })
})

export {
  getOfficers,
  signIn,
  resetPassword,
  updatePassword,
  getAreaStats,
  registerPatient,
  searchPatients,
  removePatient,
  filterByStatus,
  updateProfile,
}

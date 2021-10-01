import asyncHandler from 'express-async-handler'
import Patient from '../models/PatientModel.js'

const getPatients = asyncHandler(async (req, res) => {})

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

export { getPatients, signIn, resetPassword, updatePassword, updateProfile }

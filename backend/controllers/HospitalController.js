import asyncHandler from 'express-async-handler'
import Hospital from '../models/HospitalModel.js'
import mongoose from 'mongoose'

const getHospitals = asyncHandler(async (req, res) => {
  if (!req.body.cityID)
    return res.status(400).send({ error: 'City ID not found' })
  const hospitals = await Hospital.find({ 'city.cityID': req.body.cityID }, [
    'hospitalName',
  ])
  res.json(hospitals)
})

const getHospitalInfo = asyncHandler(async (req, res) => {
  const hospital = await Hospital.findOne({
    _id: mongoose.Types.ObjectId('6157851683bed34bfcb7c58a'),
  })
  if (hospital) {
    return res.json(hospital)
  } else {
    return res.status(404).send({ error: 'Hospital not found' })
  }
})

export { getHospitals, getHospitalInfo }

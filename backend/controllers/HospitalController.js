import asyncHandler from 'express-async-handler'
import Hospital from '../models/HospitalModel.js'

const getHospitals = asyncHandler(async (req, res) => {
  if (!req.body.cityID)
    return res.status(400).send({ error: 'City ID not found' })
  const hospitals = await Hospital.find({ 'city.cityID': req.body.cityID }, [
    'hospitalName',
  ])
  res.json(hospitals)
})

export { getHospitals }

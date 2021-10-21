import express from 'express'
import {
  getHospitals,
  getHospitalInfo,
} from '../controllers/HospitalController.js'

const router = express.Router()
router.route('/').post(getHospitals)
router.route('/:hospitalID').get(getHospitalInfo)

export default router

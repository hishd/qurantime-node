import express from 'express'
import { getHospitals } from '../controllers/HospitalController.js'

const router = express.Router()
router.route('/').post(getHospitals)

export default router

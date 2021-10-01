import express from 'express'
import { getHospitals } from '../controllers/HospitalController.js'

const router = express.Router()
router.route('/').get(getHospitals)

export default router

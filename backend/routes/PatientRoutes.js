import express from 'express'
import {
  getPatients,
  getHealthStatusHistory,
} from '../controllers/PatientController.js'

const router = express.Router()
router.route('/').get(getPatients)
router.route('/:nicNo').get(getHealthStatusHistory)

export default router

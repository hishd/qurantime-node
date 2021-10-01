import express from 'express'
import { getPatients } from '../controllers/PatientController.js'

const router = express.Router()
router.route('/').get(getPatients)

export default router

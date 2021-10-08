import express from 'express'
import {
  getPatients,
  signIn,
  resetPassword,
  updatePassword,
  updateProfile,
  updateSymptoms,
  updateHealthStatus,
  getHealthStatusHistory,
} from '../controllers/PatientController.js'

const router = express.Router()
router.route('/').get(getPatients)
router.route('/signIn').post(signIn)
router.route('/getOtp').post(resetPassword)
router.route('/password').put(updatePassword)
router.route('/profile').put(updateProfile)
router.route('/symptoms').put(updateSymptoms)
router.route('/health').put(updateHealthStatus)
router.route('/health').post(getHealthStatusHistory)

export default router

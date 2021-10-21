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
  getPatientsUnderHospital,
  searchPatientsInHospital,
  getPatientProfile,
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
router.route('/patientsInHospital/:id').get(getPatientsUnderHospital)
router.route('/patientsInHospital/:id/:nicNo').get(searchPatientsInHospital)
router.route('/profile/:nicNo').get(getPatientProfile)

export default router

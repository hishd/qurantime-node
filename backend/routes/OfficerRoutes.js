import express from 'express'
import {
  getOfficers,
  signIn,
  resetPassword,
  updatePassword,
  getAreaStats,
  registerPatient,
  searchPatients,
  removePatient,
  filterByStatus,
  updateProfile,
} from '../controllers/OfficerController.js'

const router = express.Router()
router.route('/').get(getOfficers)
router.route('/signIn').post(signIn)
router.route('/getOtp').post(resetPassword)
router.route('/password').put(updatePassword)
router.route('/areaStat').post(getAreaStats)
router.route('/patient').post(registerPatient)
router.route('/searchPatients').post(searchPatients)
router.route('/removePatient').post(removePatient)
router.route('/filter').post(filterByStatus)
router.route('/profile').put(updateProfile)

export default router

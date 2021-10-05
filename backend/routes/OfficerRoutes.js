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
router.route('/getOtp').get(resetPassword)
router.route('/password').put(updatePassword)
router.route('/areaStat').get(getAreaStats)
router.route('/patient').post(registerPatient)
router.route('/patient').get(searchPatients)
router.route('/patient').delete(removePatient)
router.route('/filter').get(filterByStatus)
router.route('/profile').put(updateProfile)

export default router

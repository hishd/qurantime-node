import express from 'express'
import { getOfficers } from '../controllers/OfficerController.js'

const router = express.Router()
router.route('/').get(getOfficers)

export default router

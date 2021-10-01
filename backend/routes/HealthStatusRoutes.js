import express from 'express'
import { getHealthStatus } from '../controllers/HealthStatusController.js'

const router = express.Router()
router.route('/').get(getHealthStatus)

export default router

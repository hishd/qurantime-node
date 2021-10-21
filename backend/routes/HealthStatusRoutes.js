import express from 'express'
import {
  getHealthStatus,
  getHealthSummary,
  getLatestResults,
  getCriticalResults,
} from '../controllers/HealthStatusController.js'

const router = express.Router()
router.route('/').get(getHealthStatus)
router.route('/healthSummary/:id').get(getHealthSummary)
router.route('/latestResults/:id').get(getLatestResults)
router.route('/criticalCondition/:id').get(getCriticalResults)

export default router

import asyncHandler from 'express-async-handler'
import HealthStatus from '../models/HealthStatusModel.js'

const getHealthStatus = asyncHandler(async (req, res) => {})

const getHealthSummary = asyncHandler(async (req, res) => {
  const totalPatients = await HealthStatus.countDocuments({
    hospitalID: req.params.id,
  })
  const criticalSPO2 = await HealthStatus.countDocuments({
    healthStatus: 'Critical Condition',
    hospitalID: req.params.id,
  })
  const normalSPO2 = totalPatients - criticalSPO2
  const criticalSymptoms = await HealthStatus.countDocuments({
    hospitalID: req.params.id,
    $or: [
      { 'currentCondition.symptoms': { $size: 3 } },
      { 'currentCondition.symptoms': { $size: 4 } },
      { 'currentCondition.symptoms': { $size: 5 } },
    ],
  })
  res.json({
    totalPatients,
    criticalSPO2,
    normalSPO2,
    criticalSymptoms,
  })
})

const getLatestResults = asyncHandler(async (req, res) => {
  const latestResults = await HealthStatus.aggregate([
    {
      $match: { hospitalID: req.params.id },
    },
    {
      $sort: { 'measurements.time': -1 },
    },
    {
      $project: { measurements: { $slice: ['$measurements', -1] }, patient: 1 },
    },
  ])

  var data = []
  for (const record of latestResults) {
    data.push({
      nicNo: record.patient.nicNo,
      fullName: record.patient.fullName,
      spo2Level: record.measurements[0] ? record.measurements[0].spo2Level : 0,
      bpmLevel: record.measurements[0] ? record.measurements[0].bpmLevel : 0,
      time: record.measurements[0] ? record.measurements[0].time : '',
    })
  }

  res.json(data)
})

const getCriticalResults = asyncHandler(async (req, res) => {
  const latestResults = await HealthStatus.aggregate([
    {
      $match: { hospitalID: req.params.id, healthStatus: 'Critical Condition' },
    },
    {
      $sort: { 'measurements.time': -1 },
    },
    {
      $project: { measurements: { $slice: ['$measurements', -1] }, patient: 1 },
    },
  ])

  var data = []
  for (const record of latestResults) {
    data.push({
      nicNo: record.patient.nicNo,
      fullName: record.patient.fullName,
      contactNo: record.patient.contactNo,
      spo2Level: record.measurements[0] ? record.measurements[0].spo2Level : 0,
      bpmLevel: record.measurements[0] ? record.measurements[0].bpmLevel : 0,
      time: record.measurements[0] ? record.measurements[0].time : '',
    })
  }

  res.json(data)
})

export {
  getHealthStatus,
  getHealthSummary,
  getLatestResults,
  getCriticalResults,
}

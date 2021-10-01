import mongoose from 'mongoose'

const HealthStatusSchema = mongoose.Schema({
  patient: {
    nicNo: {
      type: String,
      required: true,
    },
    fullName: {
      type: String,
      required: true,
    },
    contactNo: {
      type: String,
      required: true,
    },
  },
  healthStatus: {
    type: String,
    required: true,
  },
  currentCondition: {
    condition: {
      type: String,
      required: true,
    },
    lastUpdate: {
      type: Date,
      required: true,
    },
    symptoms: [
      {
        symptom: {
          type: String,
          required: true,
        },
      },
    ],
  },
  measurements: [
    {
      spo2Level: {
        type: Number,
        required: true,
      },
      bpmLevel: {
        type: Number,
        required: true,
      },
      time: {
        type: Date,
        required: true,
      },
      result: {
        type: String,
        required: true,
      },
    },
  ],
})

const HealthStatus = mongoose.model('HealthStatus', HealthStatusSchema)
export default HealthStatus

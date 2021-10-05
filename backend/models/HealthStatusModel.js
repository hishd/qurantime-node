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
    cityID: {
      type: String,
      required: false,
    },
  },
  hospitalID: {
    type: String,
    required: true,
  },
  healthStatus: {
    type: String,
    required: true,
  },
  currentCondition: {
    condition: {
      type: String,
    },
    lastUpdate: {
      type: Date,
    },
    symptoms: [
      {
        symptom: {
          type: String,
        },
      },
    ],
  },
  measurements: [
    {
      spo2Level: {
        type: Number,
      },
      bpmLevel: {
        type: Number,
      },
      time: {
        type: Date,
      },
      result: {
        type: String,
      },
    },
  ],
})

const HealthStatus = mongoose.model('HealthStatus', HealthStatusSchema)
export default HealthStatus

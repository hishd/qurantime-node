import mongoose from 'mongoose'

const HospitalSchema = mongoose.Schema(
  {
    hospitalName: {
      type: String,
      required: true,
    },
    contactNo: {
      type: String,
      required: true,
    },
    district: {
      districtID: {
        type: String,
        required: true,
      },
      districtName: {
        type: String,
        required: true,
      },
    },
    city: {
      cityID: {
        type: String,
        required: true,
      },
      cityName: {
        type: String,
        required: true,
      },
    },
    accessKey: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
)

const Hospital = mongoose.model('Hospitals', HospitalSchema)
export default Hospital

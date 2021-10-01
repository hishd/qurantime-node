import mongoose from 'mongoose'

const LocationSchema = mongoose.Schema(
  {
    districtName: {
      type: String,
      required: true,
    },
    cities: [
      {
        cityName: {
          type: String,
          required: true,
        },
      },
    ],
  },
  {
    timestamps: true,
  }
)

const Location = mongoose.model('Location', LocationSchema)
export default Location

import mongoose from 'mongoose'

const OfficerSchema = mongoose.Schema(
  {
    fullName: {
      type: String,
      required: true,
    },
    nicNo: {
      type: String,
      required: true,
    },
    contactNo: {
      type: String,
      required: true,
    },
    emailAddress: {
      type: String,
      required: true,
    },
    password: {
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
  },
  {
    timestamps: true,
  }
)

OfficerSchema.methods.matchPassword = async function (enteredPass) {
  return await bcrypt.compare(enteredPass, this.password)
}

//Todo: Change to save instead of validate
OfficerSchema.pre('validate', async function (next) {
  if (!this.isModified('password')) {
    next()
  }

  const salt = await bcrypt.genSalt(10)
  this.password = await bcrypt.hash(this.password, salt)
})

const Officer = mongoose.model('Officers', OfficerSchema)
export default Officer

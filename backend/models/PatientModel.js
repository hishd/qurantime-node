import mongoose from 'mongoose'

const PatientSchema = mongoose.Schema(
  {
    nicNo: {
      type: String,
      required: true,
    },
    fullName: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    contactNo: {
      type: String,
      required: true,
    },
    location: {
      lat: {
        type: Number,
        required: true,
      },
      lon: {
        type: Number,
        required: true,
      },
    },
    password: {
      type: String,
      required: true,
    },
    vaccinated: {
      type: Boolean,
      required: true,
    },
    active: {
      type: Boolean,
      required: true,
    },
    comorbidities: [
      {
        name: {
          type: String,
          required: true,
        },
      },
    ],
    hospital: {
      hospitalID: {
        type: String,
        required: true,
      },
      hospitalName: {
        type: String,
        required: true,
      },
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

PatientSchema.methods.matchPassword = async function (enteredPass) {
  return await bcrypt.compare(enteredPass, this.password)
}

//Todo: Change to save instead of validate
PatientSchema.pre('validate', async function (next) {
  if (!this.isModified('password')) {
    next()
  }

  const salt = await bcrypt.genSalt(10)
  this.password = await bcrypt.hash(this.password, salt)
})

const Patient = mongoose.model('Patients', PatientSchema)
export default Patient

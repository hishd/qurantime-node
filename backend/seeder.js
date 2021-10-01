import mongoose from 'mongoose'
import dotenv from 'dotenv'
import connectDB from './config/database.js'
import locationData from './data/LocationData.js'
import hospitalData from './data/HospitalData.js'
import healthStatusData from './data/HealthStatusData.js'
import officerData from './data/OfficerData.js'
import patientData from './data/PatientData.js'
import Location from './models/LocationModel.js'
import HealthStatus from './models/HealthStatusModel.js'
import Hospital from './models/HospitalModel.js'
import Officer from './models/OfficerModel.js'
import Patient from './models/PatientModel.js'

dotenv.config()

connectDB()

const importData = async () => {
  try {
    await Location.deleteMany()
    await Location.insertMany(locationData)
    await Officer.deleteMany()
    await Officer.insertMany(officerData)
    await Hospital.deleteMany()
    await Hospital.insertMany(hospitalData)
    await Patient.deleteMany()
    await Patient.insertMany(patientData)
    await HealthStatus.deleteMany()
    await HealthStatus.insertMany(healthStatusData)
    console.log('Data Imported successfully!')
    process.exit()
  } catch (error) {
    console.log(`Error: ${error}`)
    process.exit(1)
  }
}

const destroyData = async () => {
  try {
    await Location.deleteMany()
    await HealthStatus.deleteMany()
    await Hospital.deleteMany()
    await Officer.deleteMany()
    await Patient.deleteMany()
    console.log('Data Cleared successfully!')
    process.exit()
  } catch (error) {
    console.log(`Error: ${error}`)
    process.exit(1)
  }
}

if (process.argv[2] === '-d') {
  destroyData()
} else {
  importData()
}

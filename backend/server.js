import express from 'express'
import dotenv from 'dotenv'
import connectDB from './config/database.js'

//Routes
import healthStatusRoutes from './routes/HealthStatusRoutes.js'
import hospitalRoutes from './routes/HospitalRoutes.js'
import locationRoutes from './routes/LocationRoutes.js'
import officerRoutes from './routes/OfficerRoutes.js'
import patientRoutes from './routes/PatientRoutes.js'
import path from 'path'

dotenv.config()
connectDB()

const app = express()
app.use(express.json())

app.use('/api/healthStatus', healthStatusRoutes)
app.use('/api/hospital', hospitalRoutes)
app.use('/api/location', locationRoutes)
app.use('/api/officer', officerRoutes)
app.use('/api/patient', patientRoutes)

const __dirname = path.resolve()

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '/frontend/build')))
  app.get('*', (req, res) =>
    res.sendFile(path.resolve(__dirname, 'frontend', 'build', 'index.html'))
  )
} else {
  app.get('/', (req, res) => {
    res.send('API is running')
  })
}

const PORT = process.env.PORT || 5000

app.listen(
  PORT,
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`)
)

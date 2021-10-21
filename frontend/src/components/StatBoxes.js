import React, { useState, useEffect } from 'react'
import axios from 'axios'
import dotenv from 'dotenv'

function StatBoxes() {
  const [totalPatients, setTotalPatients] = useState(0)
  const [criticalSymptoms, setCriticalSymptoms] = useState(0)
  const [criticalSPO2, setCriticalSPO2] = useState(0)
  const [normalPatients, setNormalPatients] = useState(0)

  dotenv.config()

  const fetchStats = async () => {
    const request = await axios.get(
      `/api/healthStatus/healthSummary/${process.env.REACT_APP_HOSPITAL_KEY}`
    )
    if (request.status === 200) {
      console.log('Stat Data found')
      const { data } = request
      setTotalPatients(data.totalPatients)
      setCriticalSymptoms(data.criticalSymptoms)
      setCriticalSPO2(data.criticalSPO2)
      setNormalPatients(data.normalSPO2)
    } else if (request.status === 404) {
      console.log('Stat data not found')
    } else {
      console.log('Server Error!')
    }
  }

  useEffect(() => {
    fetchStats()
  }, [])

  return (
    <div className='row'>
      <div className='col-lg-3 col-6'>
        <div className='small-box bg-info'>
          <div className='inner'>
            <h3>{totalPatients}</h3>

            <h5>All Patients</h5>
          </div>
        </div>
      </div>
      <div className='col-lg-3 col-6'>
        <div className='small-box bg-warning'>
          <div className='inner'>
            <h3>{criticalSymptoms}</h3>

            <h5>Critical Symptoms</h5>
          </div>
        </div>
      </div>
      <div className='col-lg-3 col-6'>
        <div className='small-box bg-danger'>
          <div className='inner'>
            <h3>{criticalSPO2}</h3>

            <h5>Critical SPo2 Levels</h5>
          </div>
        </div>
      </div>
      <div className='col-lg-3 col-6'>
        <div className='small-box bg-success'>
          <div className='inner'>
            <h3>{normalPatients}</h3>

            <h5>Normal Patients</h5>
          </div>
        </div>
      </div>
    </div>
  )
}

export default StatBoxes

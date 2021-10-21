import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import axios from 'axios'
import dotenv from 'dotenv'

function Header() {
  const history = useHistory()
  const [hospitalName, setHospitalName] = useState()
  dotenv.config()

  const getHospitalData = async () => {
    const request = await axios.get(
      `/api/hospital/${process.env.REACT_APP_HOSPITAL_KEY}`
    )
    if (request.status === 200) {
      console.log('Hospital Data found')
      const { data } = request
      console.log(`Hospital ID : ${data._id}`)
      console.log(`Hospital Name : ${data.hospitalName}`)
      localStorage.setItem('hospitalName', data.hospitalName)
      localStorage.setItem('hospitalID', data._id)
      setHospitalName(data.hospitalName)
    } else if (request.status === 404) {
      console.log('Hospital not found')
    } else {
      console.log('Server Error!')
    }
  }

  useEffect(() => {
    getHospitalData()
  }, [])

  return (
    <div className='content-header'>
      <div className='container-fluid'>
        <div className='row mb-2'>
          <div className='col-sm-6'>
            <a href='/' style={{ color: 'white' }}>
              <h1 className='m-0' onClick={() => history.push('/')}>
                Health Dashboard
              </h1>
            </a>
          </div>
          <div className='col-sm-6'>
            <ol className='breadcrumb float-sm-right'>
              <li className='spacing-btn'>
                <h5>Hospital : {hospitalName}</h5>
              </li>
              <li className='spacing-btn'>
                <button
                  type='button'
                  className='btn btn-block btn-info'
                  onClick={() => history.push('/patients')}
                >
                  View Patients
                </button>
              </li>
            </ol>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Header

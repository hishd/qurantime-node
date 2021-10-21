import React, { useState, useEffect } from 'react'
import axios from 'axios'
import dotenv from 'dotenv'
import Loader from '../components/Loader'
import { LinkContainer } from 'react-router-bootstrap'

function CriticalPatients() {
  const [patients, setPatients] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  dotenv.config()

  const getLatestData = async () => {
    const request = await axios.get(
      `/api/healthStatus/criticalCondition/${process.env.REACT_APP_HOSPITAL_KEY}`
    )

    if (request.status === 200) {
      console.log('Critical records loaded')
      const { data } = request
      setPatients(data)
    } else if (request.status === 404) {
      console.log('Critical records not found')
    } else {
      console.log('Server Error!')
    }
    setIsLoading(false)
  }

  useEffect(() => {
    getLatestData()
  }, [])

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <div>
          <div className='card'>
            <div className='card-header'>
              <h3 className='card-title'>Critical Patients</h3>
            </div>
            <div className='card-body p-0'>
              <ul className='products-list product-list-in-card pl-2 pr-2 ScrollStyle'>
                {patients.map((patient, index) => (
                  <li className='item' key={index}>
                    <div className='product-img'>
                      <img
                        src='img/img_patient.png'
                        className='img-size-50'
                        alt=''
                      />
                    </div>
                    <div className='product-info'>
                      <div className='product-title'>
                        <LinkContainer to={`/profile/${patient.nicNo}`}>
                          <label>{patient.fullName}</label>
                        </LinkContainer>

                        <span className='badge badge-danger float-right'>
                          SPO2 : {patient.spo2Level}%
                        </span>
                      </div>
                      <span className='product-description'>
                        Contact No : {patient.contactNo} | NIC : {patient.nicNo}
                      </span>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default CriticalPatients

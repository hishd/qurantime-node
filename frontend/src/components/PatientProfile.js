import React, { useState, useEffect } from 'react'
import axios from 'axios'
import dotenv from 'dotenv'
import {
  FaMeh,
  FaAddressCard,
  FaInbox,
  FaPhoneAlt,
  FaCalendarAlt,
  FaNotesMedical,
  FaHome,
} from 'react-icons/fa'
import Loader from '../components/Loader'

function PatientProfile({ match }) {
  const patientNIC = match.params.nicNo
  const [patientData, setPatientData] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  dotenv.config()

  const getPatientData = async () => {
    const request = await axios.get(`/api/patient/profile/${patientNIC}`)

    if (request.status === 200) {
      console.log('Patients data loaded')
      const { data } = request
      setPatientData(data)
    } else if (request.status === 404) {
      console.log('Patients data not found')
    } else {
      console.log('Server Error!')
    }

    setIsLoading(false)
  }

  useEffect(() => {
    getPatientData()
  }, [])

  return (
    <div className='content'>
      {isLoading ? (
        <Loader />
      ) : (
        <div className='body-container-padding'>
          <div className='row'>
            <div className='col-md-4'>
              <div className='card card-primary'>
                <div className='card-header'>
                  <h3 className='card-title'>About Patient</h3>
                </div>
                <div className='card-body'>
                  <strong>
                    <FaMeh style={{ color: 'white' }} /> Full Name
                  </strong>
                  <p className='text-muted' style={{ margin: '10px' }}>
                    {patientData.fullName}
                  </p>
                  <hr />
                  <strong>
                    <FaAddressCard style={{ color: 'white' }} /> NIC Number
                  </strong>
                  <p className='text-muted' style={{ margin: '10px' }}>
                    {patientData.nicNo}
                  </p>
                  <hr />
                  <strong>
                    <FaPhoneAlt style={{ color: 'white' }} /> Contact Number
                  </strong>
                  <p className='text-muted' style={{ margin: '10px' }}>
                    {patientData.contactNo}
                  </p>
                  <hr />
                  <strong>
                    <FaInbox style={{ color: 'white' }} /> Email Address
                  </strong>
                  <p className='text-muted' style={{ margin: '10px' }}>
                    {patientData.emailAddress}
                  </p>
                  <hr />
                  <strong>
                    <FaCalendarAlt style={{ color: 'white' }} /> Registered Date
                  </strong>
                  <p className='text-muted' style={{ margin: '10px' }}>
                    {patientData.createdAt.substring(0, 10)}
                  </p>
                  <hr />
                  <strong>
                    <FaNotesMedical style={{ color: 'white' }} /> Vaccinated
                  </strong>
                  <p className='text-muted' style={{ margin: '10px' }}>
                    {patientData.vaccinated}
                  </p>
                  <hr />
                  <strong>
                    <FaHome style={{ color: 'white' }} /> Home Address
                  </strong>
                  <p className='text-muted' style={{ margin: '10px' }}>
                    {patientData.address}
                  </p>
                </div>
              </div>
            </div>
            <div className='col-md-4'>
              <div className='card'>
                <div className='card-header'>
                  <h3 className='card-title'>Comorbidities</h3>
                </div>
                <div className='card-body p-0'>
                  <ul className='products-list product-list-in-card pl-2 pr-2 ScrollStyle'>
                    {patientData.comorbidities.map((data, index) => (
                      <li className='item' key={index}>
                        <div className='product-img'>
                          <img
                            src='../img/img_comorbedity.png'
                            className='img-size-50'
                            alt=''
                          />
                        </div>
                        <div className='product-info'>
                          <span
                            className='product-description'
                            style={{ marginTop: '0.5rem' }}
                          >
                            {data.name}
                          </span>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
            <div className='col-md-4'>
              <div className='card'>
                <div className='card-header border-transparent'>
                  <h3 className='card-title'>Latest Results</h3>
                </div>
                <div className='card-body p-0'>
                  <div className='table-responsive' style={{ height: '650px' }}>
                    <table className='table m-0 table-head-fixed text-nowrap'>
                      <thead>
                        <tr>
                          <th>Index</th>
                          <th>SpO2</th>
                          <th>BPM</th>
                          <th>Time</th>
                        </tr>
                      </thead>
                      <tbody>
                        {patientData.measurements.map((data, index) => (
                          <tr key={index}>
                            <td>{index + 1}</td>
                            <td>{Number(data.spo2Level).toFixed(2)}%</td>
                            <td>{Number(data.bpmLevel).toFixed(2)}</td>
                            <td>{data.time.substring(0, 16)}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default PatientProfile

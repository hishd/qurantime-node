import React, { useState, useEffect } from 'react'
import axios from 'axios'
import dotenv from 'dotenv'
import { FaSearch } from 'react-icons/fa'
import Loader from '../components/Loader'
import { LinkContainer } from 'react-router-bootstrap'

function Patients() {
  const [patients, setPatients] = useState([])
  const [searchNIC, setSearchNIC] = useState('')
  const [isLoading, setIsLoading] = useState(true)
  dotenv.config()

  const getPatientData = async () => {
    const request = await axios.get(
      `/api/patient/patientsInHospital/${process.env.REACT_APP_HOSPITAL_KEY}`
    )

    if (request.status === 200) {
      console.log('Patients data loaded')
      const { data } = request
      setPatients(data)
    } else if (request.status === 404) {
      console.log('Patients data not found')
    } else {
      console.log('Server Error!')
    }

    setIsLoading(false)
  }

  const searchPatientData = async () => {
    setIsLoading(true)
    const request = await axios.get(
      `/api/patient/patientsInHospital/${process.env.REACT_APP_HOSPITAL_KEY}/${searchNIC}`
    )

    if (request.status === 200) {
      console.log('Patients data loaded')
      const { data } = request
      setPatients(data)
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
    <div className='body-container-padding'>
      {isLoading ? (
        <Loader />
      ) : (
        <div className='card'>
          <div className='card-body p-0'>
            <div className='card-header border-transparent'>
              <div className='form-inline float-sm-right'>
                <div className='input-group' data-widget='sidebar-search'>
                  <input
                    className='form-control form-control-sidebar'
                    type='search'
                    placeholder='Search by NIC'
                    aria-label='Search'
                    value={searchNIC}
                    onChange={(e) => setSearchNIC(e.target.value)}
                  />
                  <div className='input-group-append'>
                    <button
                      className='btn btn-sidebar'
                      onClick={searchPatientData}
                    >
                      <FaSearch style={{ color: 'white' }} />
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div className='table-responsive' style={{ height: '600px' }}>
              <table className='table m-0 table-head-fixed text-nowrap'>
                <thead>
                  <tr>
                    <th>Index</th>
                    <th>NIC</th>
                    <th>Name</th>
                    <th>Reg Date</th>
                    <th>Contact No</th>
                    <th>Comorbedities</th>
                    <th>Average SpO2</th>
                    <th>Average BPM</th>
                  </tr>
                </thead>
                <tbody>
                  {patients.map((patient, index) => (
                    <tr key={index}>
                      <td>
                        <LinkContainer to={`/profile/${patient.nicNo}`}>
                          <label>{index + 1}</label>
                        </LinkContainer>
                      </td>
                      <td>
                        <LinkContainer to={`/profile/${patient.nicNo}`}>
                          <label>{patient.nicNo}</label>
                        </LinkContainer>
                      </td>
                      <td>
                        <LinkContainer to={`/profile/${patient.nicNo}`}>
                          <label>{patient.fullName}</label>
                        </LinkContainer>
                      </td>
                      <td>
                        <LinkContainer to={`/profile/${patient.nicNo}`}>
                          <label>{patient.createdAt.substring(0, 10)}</label>
                        </LinkContainer>
                      </td>
                      <td>
                        <LinkContainer to={`/profile/${patient.nicNo}`}>
                          <label>{patient.contactNo}</label>
                        </LinkContainer>
                      </td>
                      <td>
                        <LinkContainer to={`/profile/${patient.nicNo}`}>
                          <label>{patient.comorbidities ? 'Yes' : 'No'}</label>
                        </LinkContainer>
                      </td>
                      <td>
                        <LinkContainer to={`/profile/${patient.nicNo}`}>
                          <label>
                            {Number(patient.averageSPO2).toFixed(2)}%
                          </label>
                        </LinkContainer>
                      </td>
                      <td>
                        <LinkContainer to={`/profile/${patient.nicNo}`}>
                          <label>{Number(patient.averageBPM).toFixed(2)}</label>
                        </LinkContainer>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default Patients

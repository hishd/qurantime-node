import React, { useState, useEffect } from 'react'
import axios from 'axios'
import dotenv from 'dotenv'
import Loader from '../components/Loader'
import { LinkContainer } from 'react-router-bootstrap'

function LatestResults() {
  const [patients, setPatients] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  dotenv.config()

  const getLatestData = async () => {
    const request = await axios.get(
      `/api/healthStatus/latestResults/${process.env.REACT_APP_HOSPITAL_KEY}`
    )

    if (request.status === 200) {
      console.log('Latest data loaded')
      const { data } = request
      setPatients(data)
    } else if (request.status === 404) {
      console.log('Latest data not found')
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
                    <th>NIC</th>
                    <th>Name</th>
                    <th>SpO2</th>
                    <th>BPM</th>
                    <th>Time</th>
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
                          <label>{Number(patient.spo2Level).toFixed(2)}%</label>
                        </LinkContainer>
                      </td>
                      <td>
                        <LinkContainer to={`/profile/${patient.nicNo}`}>
                          <label>{Number(patient.bpmLevel).toFixed(2)}</label>
                        </LinkContainer>
                      </td>
                      <td>
                        <LinkContainer to={`/profile/${patient.nicNo}`}>
                          <label>{patient.time.substring(0, 16)}</label>
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
    </>
  )
}

export default LatestResults

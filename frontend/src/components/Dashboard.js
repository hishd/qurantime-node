import React from 'react'
import StatBoxes from '../components/StatBoxes'
import CriticalPatients from './CriticalPatients'
import LatestResults from './LatestResults'

function Dashboard() {
  return (
    <div className='content'>
      <div className='container-fluid'>
        <StatBoxes />
      </div>
      <div className='body-container-padding'>
        <div className='row'>
          <div className='col-md-8'>
            <LatestResults />
          </div>
          <div className='col-md-4'>
            <CriticalPatients />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard

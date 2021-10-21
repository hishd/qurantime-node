import React from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import Header from './components/Header'
import Dashboard from './components/Dashboard'
import Patients from './components/Patients'
import PatientProfile from './components/PatientProfile'

const App = () => {
  return (
    <Router>
      <div className='wrapper'>
        <div>
          <Header />
          <main>
            <Route path='/' component={Dashboard} exact />
            <Route path='/profile/:nicNo' component={PatientProfile} exact />
            <Route path='/patients' component={Patients} exact />
          </main>
        </div>
      </div>
    </Router>
  )
}

export default App

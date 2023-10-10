import React from 'react';
import { Routes, Route, BrowserRouter } from 'react-router-dom'
import PatientRegister from './pages/guest/patientRegisterPage';
import PharmacistRequest from './pages/pharmacist/pharmacistRequestPage';
import './pages/guest/patientRegisterPage.css'; // Import the CSS file
import './pages/pharmacist/pharmacistRequestPage.css'; // Import the CSS file

// Styles
import './App.css'

function App() {

  return (
    <div className = 'App'>
      <BrowserRouter>
        <Routes>
          <Route path="/guest/patientRegister" element={<PatientRegister />} />
          <Route path="/pharmacist/pharmacistRequest" element={<PharmacistRequest />} />
        </Routes>
      </BrowserRouter>
   
  </div>
  )
}

export default App

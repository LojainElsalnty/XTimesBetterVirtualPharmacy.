import React from 'react';
import { Routes, Route } from 'react-router-dom'
import AdminMedicineCatalog from './pages/admin/medicineCatalogPage';
import PatientMedicineCatalog from './pages/patient/medicineCatalogPage';
import PharmacistMedicineCatalog from './pages/pharmacist/medicineCatalogPage';
// Styles
import './App.css'

function App() {

  return (

    <div>
      <Routes>
        <Route path="/admin/medicineCatalog" element={<AdminMedicineCatalog />} />
        <Route path="/patient/medicineCatalog" element={<PatientMedicineCatalog />} />
        <Route path="/pharmacist/medicineCatalog" element={<PharmacistMedicineCatalog />} />
      </Routes>
    </div>

  )
}

export default App
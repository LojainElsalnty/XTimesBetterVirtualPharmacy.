import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import PharmacistView from './pages/pharmacist/pharmacistView.jsx'
//import { Routes, Route } from 'react-router-dom'
import AdminMedicineCatalog from './pages/admin/medicineCatalogPage';
import PatientMedicineCatalog from './pages/patient/medicineCatalogPage';
import PharmacistMedicineCatalog from './pages/pharmacist/medicineCatalogPage';
// Styles
import './App.css'
import PatientView from './pages/patient/patientView.jsx';
import MedicineAdd from './pages/medicine/medicineAdd.jsx';
import MedicineEdit from './pages/medicine/madicineEdit.jsx';

function App() {

  return (
    <>
      <Routes>
        <Route
          path="/EditMedicine"
          element={<MedicineEdit />}
        />
        <Route
          path="/AddMedicine"
          element={<MedicineAdd />}
        />

        <Route
          path="/patientInformation"
          element={<PatientView />}
        />
        <Route
          path="/pharmacistInformation"
          element={<PharmacistView />}
        />
        <Route path="/admin/medicineCatalog" element={<AdminMedicineCatalog />} />
        <Route path="/patient/medicineCatalog" element={<PatientMedicineCatalog />} />
        <Route path="/pharmacist/medicineCatalog" element={<PharmacistMedicineCatalog />} />
      </Routes>
    </>
  )
}

export default App
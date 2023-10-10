import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import PharmacistView from './pages/pharmacist/pharmacistView.jsx'
//import { Routes, Route } from 'react-router-dom'
import AdminMedicineCatalog from './pages/admin/medicineCatalogPage';
import PatientMedicineCatalog from './pages/patient/medicineCatalogPage';
import PharmacistMedicineCatalog from './pages/pharmacist/medicineCatalogPage';
//import { Routes, Route, BrowserRouter } from 'react-router-dom'
import AddAdmin from './pages/admin/addadmin';
import RemovePharmacist from './pages/admin/removepharmacist';
import RemovePatient from './pages/admin/removepatient';
//import './pages/admin/addadmin.module.css';

import ViewRequestedPharmacistInfo from './pages/admin/viewRequestedPharmacistInfo';

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

        <Route path="/admin/addadmin" element={<AddAdmin />} />
        <Route path="/admin/removepharmacist" element={<RemovePharmacist />} />
        <Route path="/admin/removepatient" element={<RemovePatient />} />

        <Route path="/admin/requestedPharmacistInfoPage" element={<ViewRequestedPharmacistInfo />} />
      </Routes >
    </>
  )
}

export default App



import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
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

import ViewRequestedPharmacistsInfo from './pages/admin/viewRequestedPharmacistsInfo';
//import { Routes, Route, BrowserRouter } from 'react-router-dom'
import PatientRegister from './pages/guest/patientRegisterPage';
import PharmacistRequest from './pages/pharmacist/pharmacistRequestPage';


// Styles
import './App.css'
import PatientView from './pages/patient/patientView.jsx';
import MedicineAdd from './pages/medicine/medicineAdd.jsx';
import MedicineEdit from './pages/medicine/madicineEdit.jsx';

import { MainPage } from './Temp';
import { ViewPatientMainPage } from './pages/patient/viewPatientMainPage/viewPatientMainPage';
import { ViewPharmacistMainPage } from './pages/pharmacist/viewPharmacistMainPage/viewPharmacistMainPage';
import { ViewAdminMainPage } from './pages/admin/viewAdminMainPage/viewAdminMainPage';


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
        <Route path="/pharmacist/medicineCatalog" element={<PharmacistMedicineCatalog />} />

        <Route path="/admin/addadmin" element={<AddAdmin />} />
        <Route path="/admin/removepharmacist" element={<RemovePharmacist />} />
        <Route path="/admin/removepatient" element={<RemovePatient />} />

        <Route path="/admin/requestedPharmacistsInfoPage" element={<ViewRequestedPharmacistsInfo />} />

        <Route path="/guest/patientRegister" element={<PatientRegister />} />
        <Route path="/pharmacist/pharmacistRequest" element={<PharmacistRequest />} />

        <Route path='/' element={<MainPage />} ></Route>
        <Route path='/patient/*' element={<ViewPatientMainPage />} ></Route>
        <Route path='/pharmacist/*' element={<ViewPharmacistMainPage />} ></Route>
        <Route path='/admin/*' element={<ViewAdminMainPage />} ></Route>
        <Route path='*' element={<Navigate to='/' />} />
      </Routes >
    </>
  )
}

export default App



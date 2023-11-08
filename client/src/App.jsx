import * as React from 'react';

// Styles
import './App.css'

// User Type Main Pages
import { MainPage } from './Temp';
import { ViewPatientMainPage } from './pages/patient/viewPatientMainPage/viewPatientMainPage';
import { ViewPharmacistMainPage } from './pages/pharmacist/viewPharmacistMainPage/viewPharmacistMainPage';
import { ViewAdminMainPage } from './pages/admin/viewAdminMainPage/viewAdminMainPage';

import PatientView from './pages/patient/patientView.jsx';
import MedicineAdd from './pages/medicine/medicineAdd.jsx';
import MedicineEdit from './pages/medicine/madicineEdit.jsx';
import PharmacistView from './pages/pharmacist/pharmacistView.jsx'
import AdminMedicineCatalog from './pages/admin/medicineCatalogPage';
import PatientMedicineCatalog from './pages/patient/medicineCatalogPage';
import PharmacistMedicineCatalog from './pages/pharmacist/medicineCatalogPage';
import AddAdmin from './pages/admin/addadmin';
import RemovePharmacist from './pages/admin/removepharmacist';
import RemovePatient from './pages/admin/removepatient';
import ViewRequestedPharmacistsInfo from './pages/admin/viewRequestedPharmacistsInfo';

// Login Page
import { LoginPage } from './pages/login/loginPage/loginPage';

// Reset Password
import { SendOtpPage } from './pages/login/sendOtpPage/sendOtpPage';
import { VerifyOtpPage } from './pages/login/verifyOtpPage/verifyOtpPage';
import { ResetPasswordPage } from './pages/login/resetPasswordPage/resetPasswordPage';

// Register Pages
import PharmacistRequest from './pages/pharmacist/pharmacistRequestPage';
import PatientRegister from './pages/guest/patientRegisterPage';

// Hooks
import { AuthProvider } from './components/hooks/useAuth';

// React Router Dom Components
import { Routes, Route, Navigate } from 'react-router-dom';

// MUI Components
import { ResponsiveAppBar } from './components/responsiveNavBar/responsiveNavBar';

function App() {

  return (
    <>
      <AuthProvider>
        <ResponsiveAppBar/>
        <Routes>
          {/* <Route path="/EditMedicine" element={<MedicineEdit />} />
          <Route path="/AddMedicine" element={<MedicineAdd />} />

          <Route path="/patientInformation" element={<PatientView />} />
          <Route path="/pharmacistInformation" element={<PharmacistView />} />
          <Route path="/admin/medicineCatalog" element={<AdminMedicineCatalog />} />
          <Route path="/patient/medicineCatalog" element={<PatientMedicineCatalog />} />
          <Route path="/pharmacist/medicineCatalog" element={<PharmacistMedicineCatalog />} />

          <Route path="/admin/addadmin" element={<AddAdmin />} />
          <Route path="/admin/removepharmacist" element={<RemovePharmacist />} />
          <Route path="/admin/removepatient" element={<RemovePatient />} />

          <Route path="/admin/requestedPharmacistsInfoPage" element={<ViewRequestedPharmacistsInfo />} />
          <Route path="/guest/patientRegister" element={<PatientRegister />} />
          <Route path="/pharmacist/pharmacistRequest" element={<PharmacistRequest />} /> */}
          
          {/* Home Path */}
          <Route path='/' element={<MainPage />} ></Route>
          {/* Login Path */}
          <Route path='/login' element={<LoginPage />} ></Route>
          {/* User Types Paths */}
          <Route path='/patient/*' element={<ViewPatientMainPage />} ></Route>
          <Route path='/pharmacist/*' element={<ViewPharmacistMainPage />} ></Route>
          <Route path='/admin/*' element={<ViewAdminMainPage />} ></Route>
          {/* Register Page Paths */} 
          <Route path="/pharmacistRequest" element={<PharmacistRequest />} />
          <Route path="/patientRegister" element={<PatientRegister />} />
          {/* Reset Password Page Paths */}
          <Route path="/sendOTP" element={<SendOtpPage />} />
          <Route path="/verifyOTP" element={<VerifyOtpPage />} />
          <Route path="/resetPassword" element={<ResetPasswordPage />} />
          {/* Default Path */}
          <Route path='*' element={<Navigate to='/' />} />
        </Routes >
      </AuthProvider>
    </>
  )
}

export default App



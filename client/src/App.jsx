import * as React from 'react';

import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'

//sprint2
import CheckoutAddress from './pages/patient/checkoutAddress/checkoutAddressPage.jsx';
import MedicinePayment from './pages/patient/medicinePayment/medicinePaymentPage.jsx';
import PastOrders from './pages/patient/pastOrders/pastOrdersPage.jsx';
//yasS2
import MyCart from './pages/patient/myCart/myCart.jsx';
//yassS3

// Styles
import './App.css'

// User Type Main Pages
import { MainPage } from './pages/default/DefaultPage';

import { ViewPatientMainPage } from './pages/patient/viewPatientMainPage/viewPatientMainPage';
import { ViewPharmacistMainPage } from './pages/pharmacist/viewPharmacistMainPage/viewPharmacistMainPage';
import { ViewAdminMainPage } from './pages/admin/viewAdminMainPage/viewAdminMainPage';

// import PatientView from './pages/patient/patientView.jsx';
// import MedicineAdd from './pages/medicine/medicineAdd.jsx';
// import MedicineEdit from './pages/medicine/madicineEdit.jsx';
// import PharmacistView from './pages/pharmacist/pharmacistView.jsx'
// import AdminMedicineCatalog from './pages/admin/medicineCatalogPage';
// import PatientMedicineCatalog from './pages/patient/medicineCatalogPage';
// import PharmacistMedicineCatalog from './pages/pharmacist/medicineCatalogPage';
// import AddAdmin from './pages/admin/addadmin';
// import RemovePharmacist from './pages/admin/removepharmacist';
// import RemovePatient from './pages/admin/removepatient';

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
// import { Routes, Route, Navigate } from 'react-router-dom';

// MUI Components
import { ResponsiveAppBar } from './components/responsiveNavBar/responsiveNavBar';
import MyPCart from './pages/patient/myPCart';

function App() {

  return (
    <>
      <AuthProvider>
        {/* <ResponsiveAppBar/> */}
        <Routes>
          {/* Home Path */}
          {/* <Route path='/' element={<MainPage />} ></Route> */}
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
          {/* <Route path="/myPCart/:prescriptionId" element={<MyPCart />} /> */}
          {/* <Route path="/patient/UpdatePrescription/:prescriptionId" element={<MyPCart />} /> */}
          {/* <Route path="/patient/myPCart/:prescriptionId" element={<MyPCart />} /> */}

          {/* <Route path="/patient/UpdatePrescription/:prescriptionId" element={<MyPCart />} /> */}

          <Route path='*' element={<Navigate to='/login' />} />
        </Routes >
      </AuthProvider>
    </>
  )
}

export default App



import React from 'react';

// Axios
import axios from 'axios';

// Styles
import styles from './viewPatientMainPage.module.css'

// React Router Dom Components
import { Routes, Route, Navigate } from 'react-router-dom';

// React Router Dom Components
import { useNavigate } from 'react-router-dom';

// Pages
import MedicineCatalog from '../medicineCatalogPage';
import { PatientProfile } from '../PatientProfile/PatientProfile';
import PastOrders from '../../patient/pastOrders/pastOrdersPage.jsx';
import MedicinePayment from '../medicinePayment/medicinePaymentPage';
import SuccessPayment from '../medicinePayment/successPaymentPage';
import SuccessPaymentCreditCard from '../medicinePayment/successPaymentCreditCard';
import UnsuccessPayment from '../medicinePayment/unsuccessfulPaymentPage';
import MyCart from '../myCart/myCart.jsx';
import CheckoutAddress from '../checkoutAddress/checkoutAddressPage.jsx';

// Components
import { Navbar } from '../../../components/navbar/navbar';

// User Defined Hooks
import { useAuth } from '../../../components/hooks/useAuth'; 

export const ViewPatientMainPage = () => {
    // const {accessToken} = useAuth();
    const accessToken = localStorage.getItem('accessToken');
    const navigate = useNavigate();

    async function checkAuthentication() {
        await axios ({
            method: 'get',
            url: `http://localhost:5000/authentication/checkAccessToken`,
            headers: {
                "Content-Type": "application/json",
                'Authorization': accessToken,
                'User-type': 'patient',
            },
        })
        .then((response) => {
            console.log(response);
        })
        .catch((error) => {
          navigate('/login');
        });
      }

    checkAuthentication();

    const list = [
        {
            url: "/patient/profile",
            pageName: "Profile",
        },
        {
            url: "/patient/medicineCatalog",
            pageName: "Medicine Catalog",
        },
        {
            url: "/patient/myOrders",
            pageName: "My Orders",
        },
    ];

    if (accessToken.split(' ')[1] === "") return (<Navigate to="/login" />);

    return (
        <div className={styles['main-div']}>
            <Navbar name="Patient" list={list} />
            <>
                <Routes>
                    <Route path="/medicineCatalog" element={<MedicineCatalog />} />
                    <Route path="/profile" element={<PatientProfile />} />
                    <Route path="/myOrders" element={<PastOrders />} />
                    <Route path="/payment" element={<MedicinePayment />} />
                    <Route path="/successPayment" element={<SuccessPayment />} />
                    <Route path="/unsuccessPayment" element={<UnsuccessPayment />} />
                    <Route path="/successPaymentCC" element={<SuccessPaymentCreditCard />} />
                    <Route path="/myCart" element={<MyCart />} />
                    <Route path="/checkoutAddress" element={<CheckoutAddress />} />
                    <Route path="/payment" element={<MedicinePayment />} />
                </Routes>
            </>
        </div >
    )
}
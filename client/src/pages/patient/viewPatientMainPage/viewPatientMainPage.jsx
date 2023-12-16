import React from 'react';

// Axios
import axios from 'axios';

// Styles
import styles from './viewPatientMainPage.module.css'

// React Router Dom Components
import { Routes, Route, Navigate } from 'react-router-dom';
import { useEffect, useState } from 'react';

// React Router Dom Components
import { useNavigate } from 'react-router-dom';

// Pages
import MedicineCatalog from '../medicineCatalogPage';
import { PatientProfile } from '../PatientProfile/PatientProfile';
import PastOrders from '../../patient/pastOrders/pastOrdersPage.jsx';
import MedicinePayment from '../medicinePayment/medicinePaymentPage';
import SuccessPayment from '../medicinePayment/successPaymentPage';
import UnsuccessPayment from '../medicinePayment/unsuccessfulPaymentPage';
import MyCart from '../myCart/myCart.jsx';
import CheckoutAddress from '../checkoutAddress/checkoutAddressPage.jsx';
import ViewPatientWalletPage from '../viewPatientWalletPage';
import MyPCart from '../myPCart.jsx';
import PrescriptionTable from '../viewPrescriptionInfoPage/PrescriptionTable';
import { ChatPage } from '../ChatPage/chatPage.jsx';

// Components
import { Navbar } from '../../../components/navbar/navbar';
import { ResponsiveSideBar } from '../../../components/responsiveSideBar/responsiveSideBar.jsx';
import { ResponsiveAppBar } from '../../../components/responsiveNavBar/responsiveNavBar';

// User Defined Hooks
import { useAuth } from '../../../components/hooks/useAuth';

export const ViewPatientMainPage = () => {
    // const {accessToken} = useAuth();
    //const accessToken = sessionStorage.getItem('accessToken');
    const navigate = useNavigate();

    //new part
    const accessToken = sessionStorage.getItem('accessToken');
    const [load, setLoad] = useState(true);
    const [username, setUsername] = useState('');
    console.log(accessToken);
    useEffect(() => {
        if (username.length != 0) {
            setLoad(false);
        }
    }, [username]);

    if (accessToken === undefined || accessToken === null || accessToken === "Bearer  " || accessToken === "" || accessToken === " " || accessToken.split(' ')[1] === "") return (<Navigate to="/login" />);

    async function checkAuthentication() {
        await axios({
            method: 'get',
            url: 'http://localhost:8000/authentication/checkAccessToken',
            headers: {
                "Content-Type": "application/json",
                'Authorization': accessToken,
                'User-type': 'patient',
            },
        })
            .then((response) => {
                // console.log(response);
                setUsername(response.data.username);
                //setLoad(false);
            })
            .catch((error) => {
                //setLoad(false);
                navigate('/login');

            });
    }

    const xTest = checkAuthentication();

    const list = [
        {
            url: "/patient/medicineCatalog",
            pageName: "Medicine Catalog",
        },
        {
            url: "/patient/myOrders",
            pageName: "My Orders",
        },
        {
            url: "/patient/prescriptionTable",
            pageName: "Prescriptions",
        },
    ];

    if (load) {
        return (<div>Loading</div>)
    }

    return (
        <div className={styles['main-div']}>
            {/* <Navbar name="Patient" list={list} /> */}
            <ResponsiveAppBar array={list} />
            <ResponsiveSideBar array={list} />
            <>
                <Routes>
                    <Route path="/medicineCatalog" element={<MedicineCatalog />} />
                    <Route path="/profile" element={<PatientProfile />} />
                    <Route path="/myOrders" element={<PastOrders />} />
                    <Route path="/payment" element={<MedicinePayment />} />
                    <Route path="/successPayment" element={<SuccessPayment />} />
                    <Route path="/unsuccessPayment" element={<UnsuccessPayment />} />
                    <Route path="/myCart" element={<MyCart />} />
                    <Route path="/checkoutAddress" element={<CheckoutAddress />} />
                    <Route path="/payment" element={<MedicinePayment />} />
                    <Route path="/viewWalletNumber" element={<ViewPatientWalletPage />} />
                    <Route path="/myPCart/:prescriptionId" element={<MyPCart />} />
                    <Route path="/prescriptionTable" element={<PrescriptionTable />} />
                    <Route path="/chatPage" element={<ChatPage />} />
                    <Route path="/" element={<Navigate to="/patient/medicineCatalog" />} />
                </Routes>
            </>
        </div >
    )
}
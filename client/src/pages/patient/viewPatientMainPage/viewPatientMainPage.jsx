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
import PatientRegister from '../../guest/patientRegisterPage';
import { PatientProfile } from '../PatientProfile/PatientProfile';

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
            url: "/guest/patientRegister",
            pageName: "Patient Registration",
        },
        {
            url: "/patient/medicineCatalog",
            pageName: "Medicine Catalog",
        },
    ];

    if (accessToken.split(' ')[1] === "") return (<Navigate to="/login" />);

    return (
        <div className={styles['main-div']}>
            <Navbar name="Patient" list={list} />
            <>
                <Routes>
                    <Route path="/patientRegister" element={<PatientRegister />} />
                    <Route path="/medicineCatalog" element={<MedicineCatalog />} />
                    <Route path="/profile" element={<PatientProfile />} />
                </Routes>
            </>
        </div>
    )
}
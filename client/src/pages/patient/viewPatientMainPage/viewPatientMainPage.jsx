import React from 'react';

// Styles
import styles from './viewPatientMainPage.module.css'

// React Router Dom Components
import { Routes, Route, Navigate } from 'react-router-dom';

// Pages
import MedicineCatalog from '../medicineCatalogPage';
import PatientRegister from '../../guest/patientRegisterPage';
import { PatientProfile } from '../PatientProfile/PatientProfile';

// Components
import { Navbar } from '../../../components/navbar/navbar';

// User Defined Hooks
import { useAuth } from '../../../components/hooks/useAuth'; 

export const ViewPatientMainPage = () => {
    const {accessToken} = useAuth();

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
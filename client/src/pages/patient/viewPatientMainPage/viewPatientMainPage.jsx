import React from 'react';

// Styles
import styles from './viewPatientMainPage.module.css'

// React Router Dom Components
import { Routes, Route, Navigate } from 'react-router-dom';

// Pages
import MedicineCatalog from '../medicineCatalogPage';
import PatientRegister from '../../guest/patientRegisterPage'

// Components
import { Navbar } from '../../../components/navbar/navbar';

export const ViewPatientMainPage = () => {
    const list = [
        {
            url: "/guest/patientRegister",
            pageName: "Patient Registration",
        },
        {
            url: "/patient/medicineCatalog",
            pageName: "Medicine Catalog",
        },
    ];

    return (
        <div className={styles['main-div']}>
            <Navbar name="Patient" list={list} />
            <>
                <Routes>
                    <Route path="/patientRegister" element={<PatientRegister />} />
                    <Route path="/medicineCatalog" element={<MedicineCatalog />} />
                </Routes>
            </>
        </div>
    )
}
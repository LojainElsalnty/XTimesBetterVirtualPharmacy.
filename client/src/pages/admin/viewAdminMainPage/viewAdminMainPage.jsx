import React from 'react';

// Styles
import styles from './viewAdminMainPage.module.css'

// React Router Dom Components
import { Routes, Route, Navigate } from 'react-router-dom';

// Pages
import AddAdmin from '../addadmin';
import RemovePatient from '../removepatient';
import RemovePharmacist from '../removepharmacist';
import MedicineCatalog from '../medicineCatalogPage';
import RequestedPharmacistsInfo from '../viewRequestedPharmacistsInfo';
import PharmacistView from '../../pharmacist/pharmacistView'
import PatientView from '../../patient/patientView'

// Components
import { Navbar } from '../../../components/navbar/navbar';

export const ViewAdminMainPage = () => {
    const list = [
        {
            url: "/admin/medicineCatalog",
            pageName: "Medicines List",
        },
        {
            url: "/admin/requestedPharmacistsInfoPage",
            pageName: "Pharmacists Requests",
        },
        {
            url: "/pharmacistInformation",
            pageName: "Pharmacists Info",
        },
        {
            url: "/patientInformation ",
            pageName: "Patient Info",
        },
        {
            url: "/admin/addadmin ",
            pageName: "Add Admin",
        },
        {
            url: "/admin/removepharmacist ",
            pageName: "Remove Pharmacist",
        },
        {
            url: "/admin/removepatient ",
            pageName: "Remove Patient",
        },
    ];

    return (
        <div className={styles['main-div']}>
            <Navbar name="Admin" list={list} />
            <>
                <Routes>
                    <Route path="/medicineCatalog" element={<MedicineCatalog />} />
                    <Route path="/requestedPharmacistsInfo" element={<RequestedPharmacistsInfo />} />
                    <Route path="/pharmacistInformation" element={<PharmacistView />} />
                    <Route path="/patientInformation" element={<PatientView />} />
                    <Route path="/addadmin" element={<AddAdmin />} />
                    <Route path="/removepharmacist" element={<RemovePharmacist />} />
                    <Route path="/removepatient" element={<RemovePatient />} />
                </Routes>
            </>
        </div>
    )
}
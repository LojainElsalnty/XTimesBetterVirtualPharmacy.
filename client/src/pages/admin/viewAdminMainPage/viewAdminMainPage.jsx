import React from 'react';
import { useEffect, useState } from 'react';

// Axios
import axios from 'axios';

// Styles
import styles from './viewAdminMainPage.module.css'

// React Router Dom Components
import { Routes, Route, Navigate } from 'react-router-dom';

// React Router Dom 
import { useNavigate } from 'react-router-dom';

// Pages
import AddAdmin from '../addadmin';
import RemovePatient from '../removepatient';
import RemovePharmacist from '../removepharmacist';
import MedicineCatalog from '../medicineCatalogPage';
import RequestedPharmacistsInfo from '../viewRequestedPharmacistsInfo';
import PharmacistView from '../../pharmacist/pharmacistView';
import PatientView from '../../patient/patientView';
import { AdminProfile } from '../AdminProfile/AdminProfile';
import ViewSales from '../viewSalesPage';
// Components
import { Navbar } from '../../../components/navbar/navbar';
import { ResponsiveSideBar } from '../../../components/responsiveSideBar/responsiveSideBar';
import { ResponsiveAppBar } from '../../../components/responsiveNavBar/responsiveNavBar';

// User Defined Hooks
import { useAuth } from '../../../components/hooks/useAuth';

export const ViewAdminMainPage = () => {
    // const {accessToken} = useAuth();
    // const accessToken = sessionStorage.getItem('accessToken');
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
                'User-type': 'admin',
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
            url: "/admin/medicineCatalog",
            pageName: "Medicines List",
        },
        {
            url: "/admin/requestedPharmacistsInfoPage",
            pageName: "Pharmacists Requests",
        },
        {
            url: "/admin/pharmacistInformation",
            pageName: "Pharmacists",
        },
        {
            url: "/admin/patientInformation ",
            pageName: "Patients",
        },
        {
            url: "/admin/addadmin ",
            pageName: "Admins",
        },
        {
            url: "/admin/viewSales",
            pageName: "Sales Report",
        },
    ];

    if (load) {
        return (<div>Loading</div>)
    }


    return (
        <div className={styles['main-div']}>
            {/* <Navbar name="Admin" list={list} /> */}
            <ResponsiveAppBar array={list} />
            <ResponsiveSideBar array={list} />
            <>
                <Routes>
                    <Route path="/medicineCatalog" element={<MedicineCatalog />} />
                    <Route path="/requestedPharmacistsInfoPage" element={<RequestedPharmacistsInfo />} />
                    <Route path="/pharmacistInformation" element={<PharmacistView />} />
                    <Route path="/patientInformation" element={<PatientView />} />
                    <Route path="/addadmin" element={<AddAdmin />} />
                    <Route path="/removepharmacist" element={<RemovePharmacist />} />
                    <Route path="/removepatient" element={<RemovePatient />} />
                    <Route path="/viewSales" element={<ViewSales />} />
                    <Route path="/" element={<Navigate to="/admin/requestedPharmacistsInfoPage" />} />
                </Routes>
            </>
        </div>
    )
}
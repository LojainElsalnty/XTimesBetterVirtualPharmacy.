import React from 'react';
import { useEffect, useState } from 'react';

// Axios
import axios from 'axios';

// Styles
import styles from './viewPharmacistMainPage.module.css'

// React Router Dom Components
import { Routes, Route, Navigate } from 'react-router-dom';

// React Router Dom 
import { useNavigate } from 'react-router-dom';


// Pages
import { PharmacistProfile } from '../PharmacistProfile/PharmacistProfile';
import AddMedicine from '../../medicine/medicineAdd';
import EditMedicine from '../../medicine/madicineEdit';
import PharmacistRequest from '../pharmacistRequestPage';
import MedicineCatalog from '../medicineCatalogPage';
import FilterSales from '../filterSalesPage';
import ViewSales from '../viewSalesPage';
import ViewPharmacistWalletPage from '../viewPharmacistWalletPage';

// Components
import { Navbar } from '../../../components/navbar/navbar';

// User Defined Hooks
import { useAuth } from '../../../components/hooks/useAuth';

export const ViewPharmacistMainPage = () => {
    // const {accessToken} = useAuth();
    // const accessToken = sessionStorage.getItem('accessToken');
    const navigate = useNavigate();

     //new part
     const accessToken = sessionStorage.getItem('accessToken');
     const [load, setLoad] = useState(true);
     const [username, setUsername] = useState('');
     // console.log(accessToken);
     useEffect(() => {
         if (username.length != 0) {
             setLoad(false);
         }
     }, [username]);

     if (accessToken === undefined || accessToken === null || accessToken === "Bearer  " || accessToken === "" || accessToken === " " || accessToken.split(' ')[1] === "") return (<Navigate to="/login" />);

     async function checkAuthentication() {
         await axios({
             method: 'get',
             url: 'http://localhost:5000/authentication/checkAccessToken',
             headers: {
                 "Content-Type": "application/json",
                 'Authorization': accessToken,
                 'User-type': 'pharmacist',
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
            url: "/pharmacist/profile",
            pageName: "Profile",
        },
        {
            url: "/pharmacist/medicineCatalog",
            pageName: "Medicines List",
        },
        {
            url: "/pharmacist/addMedicine",
            pageName: "Add Medicine",
        },
        {
            url: "/pharmacist/editMedicine",
            pageName: "Edit Medicine",
        },
        {
            url: "/pharmacist/viewSales",
            pageName: "view sales",
        },
        {
            url: "/pharmacist/filterSales",
            pageName: "filter sales",
        },
        {
            url: "/pharmacist/viewWalletNumber",
            pageName: "Wallet",
        },
    ];

    if (load) {
        return (<div>Loading</div>)
    }



    return (
        <div className={styles['main-div']}>
            <Navbar name="Pharmacist" list={list} />
            <>
                <Routes>
                    <Route path="/profile" element={<PharmacistProfile />} />
                    <Route path="/medicineCatalog" element={<MedicineCatalog />} />
                    <Route path="/addMedicine" element={<AddMedicine />} />
                    <Route path="/editMedicine" element={<EditMedicine />} />
                    <Route path="/viewSales" element={<ViewSales />} />
                    <Route path="/filterSales" element={<FilterSales />} />
                    <Route path="/viewWalletNumber" element={<ViewPharmacistWalletPage />} />
                </Routes>
            </>
        </div>
    )
}
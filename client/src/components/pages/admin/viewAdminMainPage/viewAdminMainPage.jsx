import React, { useEffect, useState } from 'react';

// Axios
import axios from 'axios';

// Styles
import styles from './viewAdminMainPage.module.css';

// React Router Dom Components
import { Routes, Route, Navigate } from 'react-router-dom';

// React Router Dom
import { useNavigate } from 'react-router-dom';

// Hooks
import { useAuth } from '../../../components/hooks/useAuth';

// Side Bar
import { ResponsiveSideBar } from '../../../components/responsiveSideBar/responsiveSideBar';

// Pages
import  AddPackage  from '../AddPackage/AddPackage';
import  UpdatePackage  from '../UpdatePackage/UpdatePackage';
import  DeletePackage  from '../DeletePackage/DeletePackage';
import AddAdmin from '../AddAdminPage/addadmin';
import RemoveAdmin from '../RemoveAdminPage/removeadmin';
import RemovePatient from '../RemovePatient/removepatient';
import RemoveDoctor from '../RemoveDoctor/removedoctor';
import ViewRequestedDoctorsInfo from '../viewRequestedDoctorsInfo/viewRequestedDoctorsInfo';
import { AdminProfile } from '../AdminProfile/AdminProfile';

// Components
import { Navbar } from '../../../components/navBar/navBar';

export const ViewAdminMainPage = () => {
    // console.log("Admin Access Token: ", accessToken);
    const navigate = useNavigate();

     //Authenticate part
     const accessToken = sessionStorage.getItem('accessToken');
     const [load, setLoad] = useState(true);
     const [username, setUsername] = useState('');
     
     console.log(accessToken);
     useEffect(() => {
         if (username.length != 0) {
             setLoad(false);
         }
     }, [username]);

     if (accessToken === undefined || accessToken === null || accessToken ===  "Bearer  " || accessToken === "" || accessToken === " " || accessToken.split(' ')[1] === "") return (<Navigate to="/login" />);

     async function checkAuthentication() {
         await axios({
             method: 'get',
             url: 'http://localhost:5000/authentication/checkAccessToken',
             headers: {
                 "Content-Type": "application/json",
                 'Authorization': accessToken,
                 'User-type': 'admin',
             },
         })
             .then((response) => {
                 console.log(response);
                 setUsername(response.data.username);
                 //setLoad(false);
             })
             .catch((error) => {
                 //setLoad(false);
                 navigate('/login');
   
             });
     }
   
     const xTest = checkAuthentication();
   //Authenticate part
   
    const list = [
        {
            url: "/admin/profile",
            pageName: "Profile",
        },
        {
            url: "/admin/addadmin",
            pageName: "Add Admin",
        },
        {
            url: "/admin/removeadmin",
            pageName: "Remove Admin",
        },
        {
            url: "/admin/removepatient",
            pageName: "Remove Patient",
        },
        {
            url: "/admin/removedoctor",
            pageName: "Remove Doctor",
        },
        {
            url: "/admin/AddPackage",
            pageName: "Add Package",
        },
        {
            url: "/admin/UpdatePackage",
            pageName: "Update Package",
        },
        {
            url: "/admin/DeletePackage",
            pageName: "Delete Package",
        },
        {
            url: "/admin/requestedDoctorsInfoPage",
            pageName: "View Requested Doctors",
        }
    ];

    if (load) {
        return (<div>Loading</div>)
    }
    return (
        <div className={styles['main-div']}>
            {/* <Navbar name="Admin" list={list} /> */}
            <ResponsiveSideBar array={list}/>
            <>
            <Routes>
            <Route path="/profile" element={<AdminProfile />} />
            <Route path="/addadmin" element={<AddAdmin/>}/>
            <Route path="/removeadmin" element={<RemoveAdmin/>}/>
            <Route path="/removepatient" element={<RemovePatient/>}/>
            <Route path="/removedoctor" element={<RemoveDoctor/>}/>
            <Route path='/AddPackage' element={<AddPackage />} />
            <Route path='/UpdatePackage' element={<UpdatePackage />}/> 
            <Route path='/DeletePackage' element={<DeletePackage />} /> 
            <Route path = "/requestedDoctorsInfoPage" element = {<ViewRequestedDoctorsInfo/>} />
            </Routes>
            </>
        </div>
    )
}
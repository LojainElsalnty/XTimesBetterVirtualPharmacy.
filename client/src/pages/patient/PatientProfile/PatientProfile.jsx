import * as React from 'react';

// Axios
import axios from 'axios';

// Styles
import styles from './PatientProfile.module.css';

// Images
import manImage from '../../../assets/img/male.svg';
import womenImage from '../../../assets/img/female.svg';

// MUI Joy Components
import { Button, Typography } from '@mui/joy';

// FontAwesome Components
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';

// User Defined Components
import { PasswordCard } from '../../../components/changePasswordCard/changePasswordCard';

// React Router DOM
import { useNavigate } from 'react-router-dom';

// Hooks
import { useState, useEffect } from 'react';

// User Defined Hooks
import { useAuth } from '../../../components/hooks/useAuth';

// User Defined Components
import { DropDown } from '../../../components/dropDown/dropDown';

// User Defined Components
import { CreditCard } from '../../../components/creditCard/creditCard';
import { ShowCard } from '../../../components/showCard/showCard';
import { ProfileCard } from '../../../components/profileCard/profileCard';
import { Modal } from '../../../components/modalCard/modalCard';

// MUI Icons
import MedicalInformationIcon from '@mui/icons-material/MedicalInformation';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import NorthEastIcon from '@mui/icons-material/NorthEast';

export const PatientProfile = () => {
    // User Info
    const navigate = useNavigate();
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [dob, setDOB] = useState('');
    const [mobile, setMobile] = useState('');
    const [image, setImage] = useState('');
    const accessToken = sessionStorage.getItem("accessToken");
    const [username, setUsername] = useState('');
    const [load, setLoad] = useState(true);

    useEffect(() => {
      if (username.length != 0) {
        setLoad(false);
      }
    }, [username]);

    async function checkAuthentication() {
      await axios ({
          method: 'get',
          url: `http://localhost:8000/authentication/checkAccessToken`,
          headers: {
              "Content-Type": "application/json",
              'Authorization': accessToken,
              'User-type': 'patient',
          },
      })
      .then((response) => {
          console.log(response);
          setUsername(response.data.username);
      })
      .catch((error) => {
        navigate('/login');
      });
    }

    checkAuthentication();

    if (load) {
      return(<div>Loading</div>)
    }

    function handleViewMedicalHistory() {
      navigate('/patient/viewMedicalHistory');
    }
    
    const getPatientInfo = async () => {
      await axios ({
        method: 'get',
        url: `http://localhost:8000/patient/info`,
        headers: {
            "Content-Type": "application/json",
            'Authorization': accessToken,
        },
      })
      .then((response) => {
        const patient = response.data.patient[0];

        // Choosing image based on the gender of the patient 
        if (patient !== null && patient.gender === 'male') {
          setImage(manImage);
        } else {
          setImage(womenImage);
        }

        if(patient) {
          // Split the patients name string into an array of strings whenever a blank space is encountered
          const arr = patient.name.split(" ");
          // Loop through each element of the array and capitalize the first letter.
          for (let i = 0; i < arr.length; i++) {
              arr[i] = arr[i].charAt(0).toUpperCase() + arr[i].slice(1);
          }
          // Join all the elements of the array back into a string 
          // using a blankspace as a separator 
          patient.name = arr.join(" ");
        }

        setName(patient.name);
        setEmail(patient.email);
        setMobile(patient.mobile);
        setDOB(patient.dob);
      })
      .catch((error) => {
        console.log(error);
      })
    };

    // eslint-disable-next-line react-hooks/rules-of-hooks
    getPatientInfo();

    return (
        <div className={styles['patient-info-main-div']}>
          <div className={styles['patient-info-top-div']}>
            <div className={styles['patient-info-left-div']}>
              <img className={styles['patient-info-img']} src={image}></img>
            </div>
            {/* <div className={styles['patient-info-right-div']}>
              <div className={styles['patient-information-div']}>
                <Typography level="h1" component="h1" sx={{color: 'white'}}>{name}</Typography>
                <div className={styles['patient-information-sub-div']}>
                  <div className={styles['patient-information-left-div']}>
                    <Typography level="title-sm" sx={{color: 'white'}}>username: {username}</Typography>
                    <Typography level="title-sm" sx={{color: 'white'}}>email: {email}</Typography>
                  </div>
                  <div className={styles['patient-information-right-div']}>
                    <Typography level="title-sm" sx={{color: 'white'}}>data of birth: {dob}</Typography>
                    <Typography level="title-sm" sx={{color: 'white'}}>mobile: {mobile}</Typography>
                  </div>
                </div>
              </div>
            </div> */}
          </div>
         {/*  <div className={styles['patient-info-bottom-div']}>
          </div> */}
          <div className={styles['main__div']}>
            <div className={styles['left__div']}>
              <div className={styles['configurations__div']}>
                <DropDown title="change password" child={<PasswordCard />}></DropDown>
                {/* <ShowCard title="view medical history" icon={<MedicalInformationIcon/>}><NorthEastIcon sx={{cursor: 'pointer'}} onClick={handleViewMedicalHistory}></NorthEastIcon></ShowCard> */}
              </div>
            </div>
            <div className={styles['middle__div']}>
              <div className={styles['charts__div']}>
                <ProfileCard info={
                  [
                    {name: 'Name', value: name},
                    {name: 'Username', value: username},
                    {name: 'Email', value: email},
                    {name: 'Mobile', value: mobile},
                    {name: 'Date Of Birth', value: dob}
                  ]
                }></ProfileCard>
              </div>
            </div>
            <div className={styles['right__div']}>
              <div className={styles['wallet__div']}>
                <CreditCard></CreditCard>
              </div>
            </div>
          </div>
        </div>
    );
}
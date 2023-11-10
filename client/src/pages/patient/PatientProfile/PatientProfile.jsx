import * as React from 'react';

// Axios
import axios from 'axios';

// Styles
import styles from './PatientProfile.module.css';

// Images
import manImage from '../../../assets/img/man.png';
import womenImage from '../../../assets/img/woman.png';

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
import { useState } from 'react';

// User Defined Hooks
import { useAuth } from '../../../components/hooks/useAuth';

export const PatientProfile = () => {
    const navigate = useNavigate();
    const [username, setUsername] = useState('');
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [dob, setDOB] = useState('');
    const [mobile, setMobile] = useState('');
    const [image, setImage] = useState('');
    // const {accessToken} = useAuth();
    const accessToken = sessionStorage.getItem('accessToken');

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
    
    const getPatientInfo = async () => {
      await axios ({
        method: 'get',
        url: `http://localhost:5000/patient/info`,
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

        setUsername(patient.username);
        setName(patient.name);
        setEmail(patient.email);
        setMobile(patient.mobile);
        setDOB(patient.dob);
      })
      .catch((error) => {
        console.log(error);
      })
    };

    checkAuthentication();
    getPatientInfo();
    
    return (
        <div className={styles['patient-info-main-div']}>
          <div className={styles['patient-info-top-div']}>
            <div className={styles['patient-info-left-div']}>
              <img className={styles['patient-info-img']} src={image}></img>
            </div>
            <div className={styles['patient-info-right-div']}>
              <div className={styles['patient-information-div']}>
                <Typography level="h1" component="h1">{name}</Typography>
                <div className={styles['patient-information-sub-div']}>
                  <div className={styles['patient-information-left-div']}>
                    <Typography level="title-sm">username: {username}</Typography>
                    <Typography level="title-sm">email: {email}</Typography>
                  </div>
                  <div className={styles['patient-information-right-div']}>
                    <Typography level="title-sm">data of birth: {dob}</Typography>
                    <Typography level="title-sm">mobile: {mobile}</Typography>
                  </div>
                </div>
              </div>
              <div className={styles['patient-settings-div']}>
                <Button onClick={() => navigate(-1)}><FontAwesomeIcon icon={faArrowLeft} /></Button>
              </div>
            </div>
          </div>
          <div className={styles['patient-info-bottom-div']}>
          </div>

          {/* Change Password Card */}
          <PasswordCard></PasswordCard>
        </div>
    );

}
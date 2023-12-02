import * as React from 'react';

// Axios
import axios from 'axios';

// Styles
import styles from './DoctorProfile.module.css';

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
import { useState, useEffect } from 'react';

// User Defined Hooks
import { useAuth } from '../../../components/hooks/useAuth';


export const DoctorProfile = () => {
    const navigate = useNavigate();
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [dob, setDOB] = useState('');
    const [image, setImage] = useState('');
    // const {accessToken} = useAuth();
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
          url: `http://localhost:5000/authentication/checkAccessToken`,
          headers: {
              "Content-Type": "application/json",
              'Authorization': accessToken,
              'User-type': 'doctor',
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

    const getDoctorInfo = async () => {
        await axios ({
          method: 'get',
          url: `http://localhost:5000/doctor/info`,
          headers: {
              "Content-Type": "application/json",
              'Authorization': accessToken,
          },
        })
        .then((response) => {
          const doctor = response.data.doctor[0];
  
          setImage(manImage);
  
          if(doctor) {
            // Split the patients name string into an array of strings whenever a blank space is encountered
            const arr = doctor.name.split(" ");
            // Loop through each element of the array and capitalize the first letter.
            for (let i = 0; i < arr.length; i++) {
                arr[i] = arr[i].charAt(0).toUpperCase() + arr[i].slice(1);
            }
            // Join all the elements of the array back into a string 
            // using a blankspace as a separator 
            doctor.name = arr.join(" ");
          }
  
          setName(doctor.name);
          setEmail(doctor.email);
          setDOB(doctor.dob);
        })
        .catch((error) => {
          console.log(error);
        })
      };

    // Get doctor info
    getDoctorInfo();

    return (
        <div className={styles['doctor-info-main-div']}>
            <div className={styles['doctor-info-top-div']}>
            <div className={styles['doctor-info-left-div']}>
                <img className={styles['doctor-info-img']} src={image}></img>
            </div>
            <div className={styles['doctor-info-right-div']}>
                <div className={styles['doctor-information-div']}>
                <Typography level="h1" component="h1">{name}</Typography>
                <div className={styles['doctor-information-sub-div']}>
                    <div className={styles['doctor-information-left-div']}>
                    <Typography level="title-sm">username: {username}</Typography>
                    <Typography level="title-sm">email: {email}</Typography>
                    </div>
                    <div className={styles['doctor-information-right-div']}>
                    <Typography level="title-sm">data of birth: {dob}</Typography>
                    </div>
                </div>
                </div>
                <div className={styles['doctor-settings-div']}>
                <Button onClick={() => navigate(-1)}><FontAwesomeIcon icon={faArrowLeft} /></Button>
                </div>
            </div>
            </div>
            <div className={styles['doctor-info-bottom-div']}>
            </div>

            {/* Change Password Card */}
            <PasswordCard></PasswordCard>
        </div>
    );
}
import * as React from 'react';

// Axios
import axios from 'axios';

// Styles
import styles from './AdminProfile.module.css';

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


export const AdminProfile = () => {
    const navigate = useNavigate();
    const [username, setUsername] = useState('');
    const [image, setImage] = useState('');
    const {accessToken} = useAuth();

    async function checkAuthentication() {
      await axios ({
          method: 'get',
          url: `http://localhost:5000/authentication/checkAccessToken`,
          headers: {
              "Content-Type": "application/json",
              'Authorization': accessToken,
              'User-type': 'admin',
          },
      })
      .then((response) => {
          console.log(response);
      })
      .catch((error) => {
        navigate('/');
      });
    }

    const getAdminInfo = async () => {
        await axios ({
          method: 'get',
          url: `http://localhost:5000/admin/info`,
          headers: {
              "Content-Type": "application/json",
              'Authorization': accessToken,
          },
        })
        .then((response) => {
          const admin = response.data.admin[0];
  
          // Choosing image based on the gender of the patient
          setImage(manImage);
  
          if(admin) {
            // Split the patients name string into an array of strings whenever a blank space is encountered
            const arr = admin.name.split(" ");
            // Loop through each element of the array and capitalize the first letter.
            for (let i = 0; i < arr.length; i++) {
                arr[i] = arr[i].charAt(0).toUpperCase() + arr[i].slice(1);
            }
            // Join all the elements of the array back into a string 
            // using a blankspace as a separator 
            admin.name = arr.join(" ");
          }
  
          setUsername(admin.username);
        })
        .catch((error) => {
          console.log(error);
        })
      };

    checkAuthentication();
    getAdminInfo();

    return (
        <div className={styles['admin-info-main-div']}>
            <div className={styles['admin-info-top-div']}>
            <div className={styles['admin-info-left-div']}>
                <img className={styles['admin-info-img']} src={image}></img>
            </div>
            <div className={styles['admin-info-right-div']}>
                <div className={styles['admin-information-div']}>
                    <Typography level="h1" component="h1">{username}</Typography>
                </div>
                <div className={styles['admin-settings-div']}>
                <Button onClick={() => navigate(-1)}><FontAwesomeIcon icon={faArrowLeft} /></Button>
                </div>
            </div>
            </div>
            <div className={styles['admin-info-bottom-div']}>
            </div>

            {/* Change Password Card */}
            <PasswordCard></PasswordCard>
        </div>
    );
}
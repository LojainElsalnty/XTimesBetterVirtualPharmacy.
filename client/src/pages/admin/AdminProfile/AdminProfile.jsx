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
import { useState, useEffect } from 'react';

// User Defined Hooks
import { useAuth } from '../../../components/hooks/useAuth';


export const AdminProfile = () => {
    const navigate = useNavigate();
    const [image, setImage] = useState('');
    // const {accessToken} = useAuth();
    const accessToken = sessionStorage.getItem('accessToken');
    const [load, setLoad] = useState(true);
    const [username, setUsername] = useState('');
    
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
              'User-type': 'admin',
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
      return (<div>Loading</div>)
    }

    const getAdminInfo = async () => {
        await axios ({
          method: 'get',
          url: `http://localhost:8000/admin/info`,
          headers: {
              "Content-Type": "application/json",
              'Authorization': accessToken,
          },
        })
        .then((response) => {
          const admin = response.data.admin[0];
  
          // Choosing image based on the gender of the patient
          setImage(manImage);
          })
        .catch((error) => {
          console.log(error);
        })
      };

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
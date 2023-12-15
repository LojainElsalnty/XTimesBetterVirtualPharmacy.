import * as React from 'react';

// Axios
import axios from 'axios';

// Styles
import styles from './AdminProfile.module.css';

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
import { Modal } from '../../../components/modalCard/modalCard';

export const AdminProfile = () => {
    const navigate = useNavigate();
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
      return(<div>Loading</div>)
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
                    <Typography level="h1" component="h1" sx={{color: 'lightskyblue'}}>{username}</Typography>
                </div>
            </div>
            </div>
            <div className={styles['main__div']}>
              <div className={styles['left__div']}>
                <div className={styles['configurations__div']}>
                  <DropDown title="change password" child={<PasswordCard />}></DropDown>
                </div>
              </div>
              <div className={styles['middle__div']}>
                <div className={styles['charts__div']}>
                </div>
              </div>
              <div className={styles['right__div']}>
                <div className={styles['wallet__div']}>
                </div>
              </div>
          </div>
        </div>
    );
}
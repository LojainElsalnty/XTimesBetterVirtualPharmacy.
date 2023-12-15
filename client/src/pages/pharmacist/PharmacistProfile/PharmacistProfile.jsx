import * as React from 'react';

// Axios
import axios from 'axios';

// Styles
import styles from './PharmacistProfile.module.css';

// Images
import manImage from '../../../assets/img/male.svg';
import womenImage from '../../../assets/img/female.svg';

// MUI Joy Components
import { Button, Typography } from '@mui/joy';
import MedicationIcon from '@mui/icons-material/Medication';
import EditIcon from '@mui/icons-material/Edit';

// FontAwesome Components
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';

// User Defined Components
import { PasswordCard } from '../../../components/changePasswordCard/changePasswordCard';
import { DropDown } from '../../../components/dropDown/dropDown';
import { ShowCard } from '../../../components/showCard/showCard';
import { Modal } from '../../../components/modalCard/modalCard';
import { ProfileCard } from '../../../components/profileCard/profileCard';

// React Router DOM
import { useNavigate } from 'react-router-dom';

// Hooks
import { useState, useEffect } from 'react';

// User Defined Hooks
import { useAuth } from '../../../components/hooks/useAuth';

// Pages
import MedicineEdit from '../../medicine/madicineEdit';
import MedicineAdd from '../../medicine/medicineAdd';
import MedicineCatalog from '../medicineCatalogPage';

export const PharmacistProfile = () => {
    const navigate = useNavigate();
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [dob, setDOB] = useState('');
    const [image, setImage] = useState('');
    // const {accessToken} = useAuth();
    const accessToken = sessionStorage.getItem("accessToken");
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
              'User-type': 'pharmacist',
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

    const getPharmacistInfo = async () => {
        await axios ({
          method: 'get',
          url: `http://localhost:8000/pharmacist/info`,
          headers: {
              "Content-Type": "application/json",
              'Authorization': accessToken,
          },
        })
        .then((response) => {
          const pharmacist = response.data.pharmacist[0];
  
          // Choosing image based on the gender of the patient 
          if (pharmacist !== null && pharmacist.gender === 'male') {
            setImage(manImage);
          } else {
            setImage(womenImage);
          }
  
          if(pharmacist) {
            // Split the pharmacist name string into an array of strings whenever a blank space is encountered
            const arr = pharmacist.name.split(" ");
            // Loop through each element of the array and capitalize the first letter.
            for (let i = 0; i < arr.length; i++) {
                arr[i] = arr[i].charAt(0).toUpperCase() + arr[i].slice(1);
            }
            // Join all the elements of the array back into a string 
            // using a blankspace as a separator 
            pharmacist.name = arr.join(" ");
          }
  
          setName(pharmacist.name);
          setEmail(pharmacist.email);
          setDOB(pharmacist.dob);
        })
        .catch((error) => {
          console.log(error);
        })
      };

    getPharmacistInfo();

    return (
        <div className={styles['pharmacist-info-main-div']}>
            <div className={styles['pharmacist-info-top-div']}>
            <div className={styles['pharmacist-info-left-div']}>
                <img className={styles['pharmacist-info-img']} src={image}></img>
            </div>
{/*             <div className={styles['pharmacist-info-right-div']}>
                <div className={styles['pharmacist-information-div']}>
                <Typography level="h1" component="h1" sx={{color: 'white'}}>{name}</Typography>
                <div className={styles['pharmacist-information-sub-div']}>
                    <div className={styles['pharmacist-information-left-div']}>
                    <Typography level="title-sm" sx={{color: 'white'}}>username: {username}</Typography>
                    <Typography level="title-sm" sx={{color: 'white'}}>email: {email}</Typography>
                    </div>
                    <div className={styles['pharmacist-information-right-div']}>
                    <Typography level="title-sm" sx={{color: 'white'}}>data of birth: {dob}</Typography>
                    </div>
                </div>
                </div>
            </div> */}
            </div>
            <div className={styles['pharmacist-info-bottom-div']}>
              <div className={styles['main__div']}>
                <div className={styles['left__div']}>
                  <div className={styles['configurations__div']}>
                    <DropDown title="change password" child={<PasswordCard />}></DropDown>
                    <ShowCard title="add medicine" icon={<MedicationIcon />}><Modal title="Add medicine"><MedicineAdd /></Modal></ShowCard>
                    <ShowCard title="edit medicine" icon={<EditIcon />}><Modal title="Edit medicine"><MedicineEdit /></Modal></ShowCard>
                  </div>
                </div>
                <div className={styles['middle__div']}>
                  <div className={styles['charts__div']}>
                    <ProfileCard info={
                      [
                        {name: 'Name', value: name},
                        {name: 'Username', value: username},
                        {name: 'Email', value: email},
                        {name: 'Date Of Birth', value: dob}
                      ]
                    }></ProfileCard>
                  </div>
                </div>
{/*                 <div className={styles['right__div']}>
                  <div className={styles['wallet__div']}>

                  </div>
                </div> */}
              </div>
            </div>
        </div>
    );
}
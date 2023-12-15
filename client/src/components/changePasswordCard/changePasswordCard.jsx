import * as React from 'react';

// Axios
import axios from 'axios';

// Styles
import styles from './changePasswordCard.module.css';

// Hooks
import { useState, useEffect } from 'react';

// User Defined Hooks
import { useAuth } from '../hooks/useAuth';

// User Defined Components
import { AlertMessageCard } from '../alertMessageCard/alertMessageCard';
import { PasswordValidation } from '../passwordValidation/passwordValidation';

// FontAwesome Components
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faE, faEye } from '@fortawesome/free-solid-svg-icons';

export const PasswordCard = () => {
    const [currentPassword, setCurrentPassword] =useState('');
    const [newPassword, setNewPassword] = useState('');
    const [showAlertMessage, setShowAlertMessage] = useState(false);
    const [alertMessage, setAlertMessage] = useState("");
    const [passwordLowerCase, setPasswordLowerCase] = useState(false);
    const [passwordUpperCase, setPasswordUpperCase] = useState(false);
    const [passwordNumber, setPasswordNumber] = useState(false);
    const [passwordLength, setPasswordLength] = useState(false);
    const [displayPasswordValidation, setDisplayPasswordValidation] = useState(false);
    // const {accessToken} = useAuth();
    const accessToken = sessionStorage.getItem("accessToken");

    useEffect(() => {
        if (newPassword.length > 0) {
            setDisplayPasswordValidation(true);
        }
        else {
            setDisplayPasswordValidation(false);
        }

    }, [newPassword]);

    useEffect(() => {
        if (newPassword.match(/[a-z]/)) {
            setPasswordLowerCase(true);
        } else {
            setPasswordLowerCase(false);
        }

        if (newPassword.match(/[A-Z]/)) {
            setPasswordUpperCase(true);
        } else {
            setPasswordUpperCase(false);
        }

        if (newPassword.match(/[0-9]/)) {
            setPasswordNumber(true);
        } else {
            setPasswordNumber(false);
        }

        if (newPassword.length >= 8) {
            setPasswordLength(true);
        } else {
            setPasswordLength(false);
        }
    }, [newPassword]);

    async function handleClickChangePassword() {
        // check that the password is valid
        if (!passwordLowerCase || !passwordUpperCase || !passwordLength || !passwordNumber) {
            setAlertMessage('Password does not match the criteria');
            setShowAlertMessage(true);
            return;
        }

        // send the new password to the server
        await axios ({
            method: 'put',
            url: `http://localhost:8000/authentication/changePassword`,
            headers: {
                "Content-Type": "application/json",
                'Authorization': accessToken,
            },
            params: {
                currentPassword: currentPassword,
                newPassword: newPassword,
            }
        })
        .then((response) => {
            setAlertMessage('Password changed successfully');
            setShowAlertMessage(true);
        })
        .catch((error) => {
            console.log(`Error ${error}`);
            setAlertMessage('Incorrect current password or current password is same as new password');
            setShowAlertMessage(true);
        });
    }

    function handleChangeCurrentPassword(event) {
        setCurrentPassword(event.target.value);
    }

    function handleChangeNewPassword(event) {
        setNewPassword(event.target.value);
    }

    return (
        <>
            <div className={styles['change-password-main-div']}>
                <div className={styles['change-password-sub1-div']}>
                    <div className={styles['change-password-sub1-subtitle-div']}>
                        <label className={styles['subtitle']}>Enter Current Password</label>
                    </div>
                    <input className={styles['password-input']} value={currentPassword} placeholder="Enter Current Password" type="password" onChange={handleChangeCurrentPassword}/>
                </div>
                <div className={styles['change-password-sub2-div']}>
                    <div className={styles['change-password-sub2-subtitle-div']}>
                        <label className={styles['subtitle']}>Enter New Password</label>
                    </div>
                    <input className={styles['password-input']} value={newPassword} placeholder="Enter New Password" type="password" onChange={handleChangeNewPassword}/>
                </div>
                {displayPasswordValidation && (
                    <div className={styles['change-password-sub4-div']}>
                        <PasswordValidation newPassword={newPassword} />
                    </div>
                )}
                <div className={styles['change-password-sub3-div']}>
                    <button className={styles['change-password-button']} onClick={handleClickChangePassword}>Change Password</button>
                </div>
            </div>
            {showAlertMessage && (<AlertMessageCard message={alertMessage} showAlertMessage={setShowAlertMessage} ></AlertMessageCard>)}
        </>
    );
}
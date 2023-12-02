import * as React from 'react';

// Axios
import axios from 'axios';

// Styles
import styles from './resetPasswordPage.module.css';

// User Defined Components
import { AlertMessageCard } from '../../../components/alertMessageCard/alertMessageCard';
import { PasswordValidation } from '../../../components/passwordValidation/passwordValidation';

// React Router DOM
import { useNavigate } from 'react-router-dom';

// Hooks
import { useState, useEffect } from 'react';

// User Defined Hooks
import { useRecoveryContext } from '../../../components/hooks/useAuth';

export const ResetPasswordPage = () => {
    const {email} = useRecoveryContext();
    const [newPassword, setNewPassword] = useState('');
    const [alertMessage, setAlertMessage] = useState("");
    const [showAlertMessage, setShowAlertMessage] = useState(false);
    const [displayPasswordValidation, setDisplayPasswordValidation] = useState(false);
    const [passwordLowerCase, setPasswordLowerCase] = useState(false);
    const [passwordUpperCase, setPasswordUpperCase] = useState(false);
    const [passwordNumber, setPasswordNumber] = useState(false);
    const [passwordLength, setPasswordLength] = useState(false);
    const navigate = useNavigate();

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
            url: `http://localhost:5000/resetPassword/updatePassword?email=${email}`,
            headers: {
                "Content-Type": "application/json",
            },
            params: {newPassword: newPassword},
        })
        .then((response) => {
            setAlertMessage('Password changed successfully');
            setShowAlertMessage(true);
        })
        .catch((error) => {
            console.log(`Error ${error}`);
            setAlertMessage('Something went wrong!');
            setShowAlertMessage(true);
        });
    }

    function handleChangeNewPassword(event) {
        setNewPassword(event.target.value);
    }

    function handleAlertMessageOkayButtonClicked() {
        setShowAlertMessage(false);
    }

    return (
        <>
            <div className={styles['reset-password-main-div']}>
                <div className={styles['reset-password-sub-div']}>
                    <div className={styles['reset-password-sub1-div']}>
                        <div className={styles['reset-password-subtitle-div']}>
                            <label className={styles['subtitle']}>Enter New Password</label>
                        </div>
                        <div className={styles['reset-password-input-div']}>
                            <input className={styles['password-input']} value={newPassword} placeholder="Enter New Password" type="password" onChange={handleChangeNewPassword}/>
                        </div>
                    </div>
                    {displayPasswordValidation && (
                    <div className={styles['change-password-sub4-div']}>
                        <PasswordValidation newPassword={newPassword} />
                    </div>
                    )}
                </div>

                <div className={styles['reset-password-button-div']}>
                    <button className={styles['reset-password-button']} onClick={handleClickChangePassword}>Change Password</button>
                </div>
            </div>
            {showAlertMessage && (<AlertMessageCard message={alertMessage} showAlertMessage={handleAlertMessageOkayButtonClicked} ></AlertMessageCard>)}
        </>
    );
}
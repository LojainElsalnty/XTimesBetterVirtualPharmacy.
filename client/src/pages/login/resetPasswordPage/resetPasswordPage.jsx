import * as React from 'react';

// Axios
import axios from 'axios';

// Styles
import styles from './resetPasswordPage.module.css';

// User Defined Components
import { AlertMessageCard } from '../../../components/alertMessageCard/alertMessageCard';


// React Router DOM
import { useNavigate } from 'react-router-dom';

// Hooks
import { useState } from 'react';

// User Defined Hooks
import { useRecoveryContext } from '../../../components/hooks/useAuth';

export const ResetPasswordPage = () => {
    const [newPassword, setNewPassword] = useState('');
    const {email} = useRecoveryContext();
    const [showAlertMessage, setShowAlertMessage] = useState(false);
    const [alertMessage, setAlertMessage] = useState("");
    const navigate = useNavigate();

    async function handleClickChangePassword() {
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
        navigate('/');
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
                </div>
                <div className={styles['reset-password-button-div']}>
                    <button className={styles['reset-password-button']} onClick={handleClickChangePassword}>Change Password</button>
                </div>
            </div>
            {showAlertMessage && (<AlertMessageCard message={alertMessage} showAlertMessage={handleAlertMessageOkayButtonClicked} ></AlertMessageCard>)}
        </>
    );
}
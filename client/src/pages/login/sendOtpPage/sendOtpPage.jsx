import * as React from 'react';

// Axios
import axios from 'axios';

// Styles
import styles from './sendOtpPage.module.css';

// Hooks
import { useState } from 'react';
import { useOTPContext } from '../../../components/hooks/useAuth';

// React Router Hooks
import { useNavigate } from 'react-router-dom';

// User Defined Hooks
import { useRecoveryContext } from '../../../components/hooks/useAuth';

// User Defined Components
import { AlertMessageCard } from '../../../components/alertMessageCard/alertMessageCard';

import { ResponsiveAppBar } from '../../../components/responsiveNavBar/responsiveNavBar';


export const SendOtpPage = () => {
    const { otp, setOTP, email, setEmail } = useRecoveryContext();
    const [userEmail, setUserEmail] = useState("");
    const [alertMessage, setAlertMessage] = useState("");
    const [showAlertMessage, setShowAlertMessage] = useState("");
    const navigate = useNavigate();
    const { setOtpSent } = useOTPContext();

    function sendOtp() {
        if (!userEmail.match(/^[a-zA-Z0-9.+_-]+@gmail.com$/)) {
            setAlertMessage("Please enter a valid email!");
            setShowAlertMessage(true);
            return;
        }

        if (userEmail) {
            axios.get(`http://localhost:8000/resetPassword/checkEmail?email=${userEmail}`)
                .then((response) => {
                    if (response.status === 200) {
                        // generate the OTP
                        const OTP = Math.floor(Math.random() * 9000 + 1000);
                        console.log(OTP);
                        // change the global value of the otp in the RecoveryContext Provider
                        setOTP(OTP);
                        // change the global value of the email in the RecoveryContext Provider
                        setEmail(userEmail);
                        console.log(userEmail);

                        axios.post("http://localhost:8000/resetPassword/sendEmail", {
                            otp: OTP,
                            recipientEmail: userEmail,
                        })
                            .then(() => {
                                setOtpSent(true);
                                navigate('/verifyOTP')
                            })
                            .catch((error) => { console.log(error) })
                    }
                    else {
                        alert("User with this email does not exist!");
                        console.log(response.data.message);
                    }
                })
                .catch((error) => {
                    setAlertMessage("Email does not exist!");
                    setShowAlertMessage(true);
                });
        }
        else {
            setAlertMessage("Please enter your email!");
            setShowAlertMessage(true);
        }
    }

    function handleEmailChange(event) {
        setUserEmail(event.target.value);
    }

    return (
        <>
            <ResponsiveAppBar array={[]} />
            <div className={styles['send-otp-main-div']}>
                <div className={styles['otp__main__div']}>
                    <div className={styles['send-otp-title-div']}>
                    </div>
                    <div className={styles['main__div']}>
                        <div className={styles['title__div']}>
                            <img src='src/assets/img/email.png' className={styles['send__otp__img']}></img>
                            <h2 className={styles['send-otp-title-h2']}>Request OTP</h2>
                        </div>
                        <div className={styles['send-otp-sub-div']}>
                            <div className={styles['send-otp-label-div']}>
                                <label className={styles['send-otp-label']}>Enter your email</label>
                            </div>
                            <div className={styles['send-otp-input-div']}>
                                <input className={styles['send-otp-input']} value={userEmail} placeholder="example: email@gmail.com" type="text" onChange={handleEmailChange}></input>
                            </div>
                        </div>
                        <div className={styles['send-otp-button-div']}>
                            <button className={styles['send-otp-button']} onClick={sendOtp}>Send OTP</button>
                        </div>
                    </div>
                </div>


                {showAlertMessage && (<AlertMessageCard message={alertMessage} showAlertMessage={setShowAlertMessage}></AlertMessageCard>)}
            </div>
        </>

    );
}
import * as React from "react";

// Axios
import axios from "axios";

// Styles
import styles from "./verifyOtpPage.module.css";

// Hooks
import { useState, useEffect } from 'react';
import { useOTPContext } from "../../../components/hooks/useAuth";

// Images
import verifyPassword from '../../../assets/img/otp.png';

// React Router DOM
import { useNavigate } from "react-router-dom";
import { Navigate } from 'react-router-dom';


// User Defined Hooks
import { useRecoveryContext } from "../../../components/hooks/useAuth";

// Components
import { AlertMessageCard } from '../../../components/alertMessageCard/alertMessageCard';

import { ResponsiveAppBar } from '../../../components/responsiveNavBar/responsiveNavBar';


export const VerifyOtpPage = () => {
  const { otp, setOTP, email, setEmail } = useRecoveryContext();
  const [OTPinput, setOTPinput] = useState();
  const [disable, setDisable] = useState(true);
  const [timerCount, setTimer] = useState(60);
  const [showMessage, setShowMessage] = useState(true);
  const [alertMessage, setAlertMessage] = useState(`An OTP is sent to your email: ${email}`);
  const navigate = useNavigate();
  const { otpSent, setOtpVerified } = useOTPContext();

  useEffect(() => {
    let interval = setInterval(() => {
      setTimer(lastCount => {
        lastCount <= 1 && clearInterval(interval);
        if (lastCount <= 1) setDisable(false);
        return lastCount - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [disable]);

  function verifyOTP() {
    if (!isNaN(parseInt(OTPinput)) && parseInt(OTPinput) === otp) {
      navigate('/resetPassword');
    }
    else {
      setShowMessage(true);
      setAlertMessage("The code you have entered is not correct, try again!");
    }
  }

  //function to resend OTP 
  function resendOTP() {
    if (disable) return;
    // generate another OTP
    const OTP = Math.floor(Math.random() * 9000 + 1000);
    // change the global value of the otp in the RecoveryContext Provider
    setOTP(OTP);
    axios.post("http://localhost:8000/resetPassword/sendEmail", {
      otp: OTP,
      recipientEmail: email,
    })
      .then(() => setDisable(true))
      .then(() => {
        setOtpVerified(true);
        setAlertMessage("A new OTP has succesfully been sent to your email.");
        setShowMessage(true);
      })
      .then(() => setTimer(60))
      .catch(console.log);
  }

  if (!otpSent) {
    return <Navigate to="/login" />
  }

  return (
    <>
      <ResponsiveAppBar array={[]} />
      <div className={styles['verify-otp-main-div']}>
        <div className={styles['verify__main__div']}>
          <div className={styles['verify-otp-title-div']}>
          </div>
          <div className={styles['main__div']}>
            <div className={styles['title__div']}>
              <img src='src/assets/img/otp.png' className={styles['verify__otp__img']}></img>
              <h2 className={styles['verify-otp-title-h2']}>Email Verification</h2>
            </div>
            <div className={styles['verify-otp-sub-div']}>
              <div className={styles['verify-otp-label-div']}>
                <label className={styles['verify-otp-label']}>Enter OTP</label>
              </div>
              <div className={styles['verify-otp-input-div']}>
                <input className={styles['verify-otp-input']} type="text" placeholder="example: 12345" value={OTPinput} onChange={(e) => { setOTPinput(e.target.value) }} />
              </div>
            </div>
            <div className={styles['verify-otp-button-div']}>
              <button className={styles['verify-otp-button']} onClick={() => verifyOTP()}>Verify Account</button>
            </div>
            <div className={styles['verify-otp-a-div']}>
              <a className={styles['resend-otp-a']} onClick={() => resendOTP()} > Did not receive code? {disable ? `Resend OTP in ${timerCount}s` : " Resend OTP"}</a>
            </div>
          </div>
        </div>
        {showMessage && (<AlertMessageCard message={alertMessage} showAlertMessage={setShowMessage} ></AlertMessageCard>)}
      </div>
    </>

  );
}
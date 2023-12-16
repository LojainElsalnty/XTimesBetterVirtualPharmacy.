import React from 'react';

// Axios
import axios from 'axios';

// Styles
import styles from './loginPage.module.css';

// Hooks
import { useState } from 'react';

// Home Made Hooks
import { useAuthUpdate, useUsername, useUserType, useRecoveryContext, useOTPContext } from '../../../components/hooks/useAuth';

// React Router
import { useNavigate } from 'react-router-dom';

// User Defined Components
import { AlertMessageCard } from '../../../components/alertMessageCard/alertMessageCard';

// Font Awesome
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHouse } from '@fortawesome/free-solid-svg-icons';

import { ResponsiveAppBar } from '../../../components/responsiveNavBar/responsiveNavBar';


export const LoginPage = () => {
    const [name, setName] = useState("");
    const [password, setPassword] = useState("");
    const [accessToken, setAccessToken] = useState("");
    const [refreshToken, setRefreshToken] = useState("");
    const [error, setError] = useState(false);
    const {updateAccessToken, updateRefreshToken} = useAuthUpdate();
    const {username, setUsername} = useUsername();
    const {userType, setUserType} = useUserType();
    const navigate = useNavigate();
    const {setOtpSent, setOtpVerified} = useOTPContext();
    // clear access token and refresh token and username stored in the browser
    sessionStorage.setItem("accessToken", "Bearer  ");
    sessionStorage.setItem("refreshToken", "");
    sessionStorage.setItem("username", "");
    sessionStorage.setItem("userType", "");

    setOtpSent(false);
    setOtpVerified(false);

    function handleUsernameChange(event) {
        setName(event.target.value);
    }

    function handlePasswordChange(event) {
        setPassword(event.target.value);
    }

    async function handleLogInClick() {
        try {
            await axios({
                method: 'POST',
                url: 'http://localhost:8000/login',
                headers: {
                    "Content-Type": "application/json",
                },
                data: {
                    username: name,
                    password: password
                }
            })
            .then((response) => {
                console.log(`Refresh Token: ${response.data.refreshToken}`);
    
                setAccessToken(response.data.accessToken);
                setRefreshToken(response.data.refreshToken);
                updateAccessToken(response.data.accessToken);
                updateRefreshToken(response.data.refreshToken);
                setUsername(name);

                // Setting Session storage
                sessionStorage.setItem("accessToken", response.data.accessToken);
                sessionStorage.setItem("refreshToken", response.data.refreshToken);
                sessionStorage.setItem("username", name);
                sessionStorage.setItem("name", response.data.name);
    
                if (response.data.userType === "patient") {
                    setError(false);
                    setUserType("patient");
                    sessionStorage.setItem("userType", "patient");
                    navigate('/patient');
                } 
                else if (response.data.userType === "pharmacist") {
                    setError(false);
                    setUserType("pharmacist");
                    sessionStorage.setItem("userType", "pharmacist");
                    navigate('/pharmacist');
                }
                else if (response.data.userType === "admin") {
                    setError(false);
                    setUserType("admin");
                    sessionStorage.setItem("userType", "admin");
                    navigate('/admin');
                }
            })
        } catch (error) {
            setError(true);
        }
    }

    function handleGoBackButtonClicked () {
        navigate('/');
    }

    return (
        <>
            <ResponsiveAppBar array={[]}/>
            <div className={styles['login-main-div']}>
            <div className={styles['login-back-button-div']}>
                {/* <button className={styles['login-back-button']} onClick={handleGoBackButtonClicked}>
                    <FontAwesomeIcon icon={faHouse} />
                </button> */}
            </div>
            <div className={styles['login-sub-div']}>
                <h2 className={styles['login-title-h2']}>Login Here</h2>

                <div className={styles['login-username-div']}>
                    <div className={styles['login-username-label-div']}>
                        <label className={styles['login-username-label']}>Username</label>
                    </div>
                    <div className={styles['username-input-div']}>
                        <input className={styles['searchbar-input']} value={name} placeholder="Enter username ..." type="text" onChange={handleUsernameChange}/>
                    </div>
                </div>

                <div className={styles['login-password-div']}>
                    <div className={styles['login-password-label-div']}>
                        <label className={styles['login-password-label']}>Password</label>
                    </div>
                    <div className={styles['password-input-div']}>
                        <input className={styles['searchbar-input']} value={password} placeholder="Enter password ..." type="password" onChange={handlePasswordChange}/>
                    </div>
                </div>
                <a className={styles['reset-password-a']} href={"/sendOTP"}>Reset Password</a>
                <button className={styles['login-button']} onClick={handleLogInClick}>Log In</button>
                <div className={styles['register__div']}>
                    <a className={styles['register-a']} href={"/patientRegister"}>Don't have an account yet?</a>
                </div>
            </div>
            {error && (<AlertMessageCard message={"Invalid username or password"} showAlertMessage={setError}></AlertMessageCard>)}
        </div>
        </>
        
    )
}

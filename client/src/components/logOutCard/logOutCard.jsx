import React from 'react';

// Axios
import axios from 'axios';

// Styles
import styles from './logOutCard.module.css';

// Images
import crossImage from '../../assets/img/cross.png';

// User Defined Hooks
import { useAuth, useAuthUpdate, useUsername } from '../hooks/useAuth';

// React Router
import { useNavigate } from 'react-router-dom';

export const LogOutCard = ({showLogOutCard}) => {
    // const {accessToken, refreshToken} = useAuth();
    const refreshToken = localStorage.getItem('refreshToken');
    const {updateAccessToken, updateRefreshToken} = useAuthUpdate();
    const {username, setUsername} = useUsername();
    const navigate = useNavigate(); // A hook that allow me to navigate between routes

    async function handleLogOut() {
        // hide component in the frontend
        showLogOutCard(false);
        // remove refresh token from the database
        await axios({
            method: 'DELETE',
            url: 'http://localhost:5000/logout',
            headers: {
                "Content-Type": "application/json",
            },
            params: {
                refreshToken: refreshToken,
            }
        }).then((response) => {
            // clear access token and refresh token and username stored in the frontend
            updateAccessToken("Bearer  ");
            updateRefreshToken("");
            setUsername("");

            // clear access token and refresh token and username stored in the browser
            localStorage.setItem("accessToken", "Bearer  ");
            localStorage.setItem("refreshToken", "");
            localStorage.setItem("username", "");
            localStorage.setItem("userType", "");
    
            // navigate to the home page of the website
            navigate('/');
        });

    }

    function handleExitLogOutCard() {
        showLogOutCard(false);
    }

    return (
        <div className={styles['logout-message-div']}>
            <div className={styles['confirm-message-div']}>
                <h3>Are you sure you want to log out?</h3>
                <div className={styles['cross-div']}>
                    <img className={styles['cross-message-img']} src={crossImage} onClick={handleExitLogOutCard}></img>
                </div>
            </div>
            <div className={styles['confirm-logout-div']}>
                <button className={styles['confirm-logout-button']} type="button" onClick={handleLogOut}>Log Out</button>
            </div>
        </div>
    )
}


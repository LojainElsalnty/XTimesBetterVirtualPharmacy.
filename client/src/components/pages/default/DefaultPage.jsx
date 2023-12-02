import React, { useState } from 'react';

// Styles
import styles from './DefaultPage.module.css';

// React Router Components
import { useNavigate } from 'react-router-dom';

// User Defined Hooks
import { useAuthUpdate, useUsername } from '../../components/hooks/useAuth';

export const MainPage = () => {
  const navigate = useNavigate();
  const {updateAccessToken, updateRefreshToken} = useAuthUpdate();
  const {setUsername} = useUsername();
  
  // clear access token and refresh token and username stored in the frontend
  updateAccessToken("Bearer  ");
  updateRefreshToken("");
  setUsername("");

  // clear access token and refresh token and username stored in the browser
  sessionStorage.setItem("accessToken", "Bearer  ");
  sessionStorage.setItem("refreshToken", "");
  sessionStorage.setItem("username", "");
  sessionStorage.setItem("userType", "");

  return (
    <div className={styles.container}>
        
    </div>
  );
};


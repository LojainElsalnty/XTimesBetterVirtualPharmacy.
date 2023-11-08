import * as React from 'react';

// Styles
import styles from './passwordValidation.module.css';

// Hooks
import { useState, useEffect } from 'react';

export const PasswordValidation = ({ newPassword }) => {
    const [password, setPassword] = useState(newPassword);
    const [mainDiv, setMainDiv] = useState('password-validation-main-invalid-div');
    const [passwordLowerCase, setPasswordLowerCase] = useState('password-validation-lowercase-invalid-li');
    const [passwordUpperCase, setPasswordUpperCase] = useState('password-validation-uppercase-invalid-li');
    const [passwordNumber, setPasswordNumber] = useState('password-validation-number-invalid-li');
    const [passwordLength, setPasswordLength] = useState('password-validation-length-invalid-li');

    useEffect(() => {
        console.log(newPassword);
        setPassword(newPassword);
        if (newPassword.match(/[a-z]/)) {
            setPasswordLowerCase('password-validation-lowercase-valid-li');
        } else {
            setPasswordLowerCase('password-validation-lowercase-invalid-li');
        }

        if (newPassword.match(/[A-Z]/)) {
            setPasswordUpperCase('password-validation-uppercase-valid-li');
        } else {
            setPasswordUpperCase('password-validation-uppercase-invalid-li');
        }

        if (newPassword.match(/[0-9]/)) {
            setPasswordNumber('password-validation-number-valid-li');
        } else {
            setPasswordNumber('password-validation-number-invalid-li');
        }

        if (newPassword.length >= 8) {
            setPasswordLength('password-validation-length-valid-li');
        } else {
            setPasswordLength('password-validation-length-invalid-li');
        }

        if (newPassword.match(/[a-z]/) && newPassword.match(/[A-Z]/) && newPassword.match(/[0-9]/) && newPassword.length >= 8) {
            setMainDiv('password-validation-main-valid-div');
        }
        else {
            setMainDiv('password-validation-main-invalid-div');
        }
    },[newPassword]);

    return (
        <div className={styles[mainDiv]}>
            <h3 className={styles['password-validation-title-h3']}>Password should be:</h3>
            <ul className={styles['password-validation-ul']}>
                <li className={styles[passwordLowerCase]}>A <b>lowercase</b> letter</li>
                <li className={styles[passwordUpperCase]}>A <b>capital (uppercase)</b> letter</li>
                <li className={styles[passwordNumber]}>A <b>number</b></li>
                <li className={styles[passwordLength]}>Minimum <b>8 characters</b></li>
            </ul>
        </div>
    );
}
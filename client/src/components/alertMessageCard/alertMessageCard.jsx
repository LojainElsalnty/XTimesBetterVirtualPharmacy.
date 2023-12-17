import * as React from 'react';

// Styles
import styles from './alertMessageCard.module.css';

// Images
import crossImage from '../../assets/img/cross.png';

// Hooks
import { useState, useEffect } from 'react';

export const AlertMessageCard = ({ message, status, showAlertMessage }) => {
    const [alertMessage, setAlertMessage] = useState("");

    useEffect(() => {
        setAlertMessage(message);
    }, [message]);

    return (
        <div className={styles['alert-main-div']}>
            <div className={styles['alert-message-div']}>
                <h3 className={styles['alert-message-h3']}>{message}</h3>
                <div className={styles['cross-div']}>
                    <img className={styles['cross-message-img']} src={crossImage} onClick={() => showAlertMessage(false)}></img>
                </div>
            </div>
            <div className={styles['confirm-message-div']}>
                <button className={styles['confirm-message-button']} type="button" onClick={() => showAlertMessage(false)}>Okay</button>
            </div>
        </div>
    );
}
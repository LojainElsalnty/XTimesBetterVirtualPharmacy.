import React from 'react';

// Styles
import styles from './chatTab.module.css';

// Hooks
import { useState, useEffect } from 'react';

export const ChatTab = ({ username, onClick }) => {
    const [userUsername, setUserUsername] = useState(username);
    console.log(`ChatTab: ${username}`);

    return (
        <div className={styles['']} onClick={() => onClick(username)}>
            <div className={styles['']}>
                <p>{userUsername}</p>
            </div>
        </div>
    );
}

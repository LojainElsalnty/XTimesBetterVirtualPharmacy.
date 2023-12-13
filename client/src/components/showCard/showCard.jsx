import React from 'react'

// Styles
import styles from './showCard.module.css';

// Hooks
import { useState } from 'react';

// MUI Components
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import WalletIcon from '@mui/icons-material/Wallet';
import MedicationIcon from '@mui/icons-material/Medication';
import EditIcon from '@mui/icons-material/Edit';

// Font Awesome icons
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faKey, faWallet, faEye, faDeaf } from '@fortawesome/free-solid-svg-icons';

// Components
import { Modal } from '../modalCard/modalCard';

export const ShowCard = ({ title, icon, children }) => {
    const [showContent, setShowContent] = useState(false); 

    console.log(`State: ${showContent}`);

    return (
        <div className={styles['main__div']}>
            <div className={styles['left__div']}>
                {
                    icon
                }
            </div>
            <div className={styles['middle__div']}>
                <label className={styles['dropdown__label']}>{ title }</label>
            </div>
            <div className={styles['right__div']} >
                {children}
            </div>
        </div>
    )
}


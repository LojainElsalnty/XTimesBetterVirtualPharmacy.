import React from 'react'

// Styles
import styles from './dropDown.module.css';

// Hooks
import { useState } from 'react';

// MUI Components
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import WalletIcon from '@mui/icons-material/Wallet';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';

// Font Awesome icons
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faKey, faWallet, faEye, faDeaf } from '@fortawesome/free-solid-svg-icons';

export const DropDown = ({ title, child }) => {
    const [showContent, setShowContent] = useState(false); 

    console.log(`State: ${showContent}`);

    return (
        <div className={styles['main__div']}>
            <div className={styles['left__div']}>
                {
                    title === 'change password' ?
                        <FontAwesomeIcon icon={faKey} /> :
                    title === 'wallet' ?
                        <FontAwesomeIcon icon={faWallet} /> :
                        <></>
                }
            </div>
            <div className={styles['middle__div']}>
                <label className={styles['dropdown__label']}>{ title }</label>
            </div>
            <div className={styles['right__div']} >
                    <div className={styles['keyboard__div']}>
                        {
                            showContent ? 
                                <KeyboardArrowRightIcon onClick={() => 
                                    {
                                        setShowContent(!showContent);
                                    }}/> : 
                                <KeyboardArrowDownIcon onClick={() => 
                                    {
                                        setShowContent(!showContent);
                                    }}/>
                        }
                    </div>
                    <div className={styles['child__div']}>
                        {
                            showContent ? child : <></>
                        }
                    </div>
            </div>
        </div>
    )
}


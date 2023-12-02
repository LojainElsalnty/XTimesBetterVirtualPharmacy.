import React, { useEffect, useState } from 'react';
import axios from 'axios';
import styles from './WalletDrInfo.module.css'; // Import your CSS for styling
//import moneyImage from '../../../assets/images/money.png';

// React Router DOM
import { useNavigate } from 'react-router-dom';

// User Defined Hooks
import { useAuth } from '../../../components/hooks/useAuth';

const viewPharmacistWallet = () => {
    // const { accessToken } = useAuth();
    const [walletNumber, setWalletNumber] = useState(null);
    const navigate = useNavigate();
    const accessToken = sessionStorage.getItem('accessToken');
    const [load, setLoad] = useState(true);
    const [username, setUsername] = useState('');
    
    console.log(accessToken);
    useEffect(() => {
        if (username.length != 0) {
            setLoad(false);
        }
    }, [username]);
    async function checkAuthentication() {
        await axios({
            method: 'get',
            url: 'http://localhost:5000/authentication/checkAccessToken',
            headers: {
                "Content-Type": "application/json",
                'Authorization': accessToken,
                'User-type': 'pharmacist',
            },
        })
            .then((response) => {
                console.log(response);
                setUsername(response.data.username);
                //setLoad(false);
            })
            .catch((error) => {
                //setLoad(false);
                navigate('/login');
  
            });
    }
  
    const xTest = checkAuthentication();
  //Authenticate part
    useEffect(() => {
        const fetchWalletDetails = async () => {
            try {
                const response = await axios.get('http://localhost:5000/pharmacist/viewWalletNumber', {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': accessToken,
                    },
                });

                if (response && response.data) {
                    setWalletNumber(response.data);
                }
            } catch (error) {
                console.error('Error fetching wallet number:', error);
            }
        };

        fetchWalletDetails();
    }, []);
    if (load) {
        return (<div>Loading</div>)
    }
    return (
        <div>
          <h1>Wallet Amount</h1>
          <div className={styles.walletContainer}>
            <div className={styles.walletAmount}>
            <p className={styles.largeText}>Your Balance: ${walletNumber} EGP </p>
            <div className={styles.walletAmount}>
              <img src={moneyImage} alt="Money Icon" className={styles.moneyIcon} />
            </div>
              {/* <p className={styles.largeText}>${walletNumber}</p> Display the wallet amount here with larger text */}
            </div>
            <br />
            <br />
           
          </div>
        </div>
    );
};
    

export default viewPharmacistWallet;
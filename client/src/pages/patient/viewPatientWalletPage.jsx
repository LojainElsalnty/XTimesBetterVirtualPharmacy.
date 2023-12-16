import React, { useEffect, useState } from 'react';
import axios from 'axios';
import styles from './WalletInfo.module.css'; // Import your CSS for styling
//import moneyImage from './client/src/assets/images/money.png';

// React Router DOM
import { useNavigate } from 'react-router-dom';

// User Defined Hooks
//import { useAuth } from '../../../components/hooks/useAuth';

const ViewPatientWalletPage = () => {
    // const { accessToken } = useAuth();
    const [walletNumber, setWalletNumber] = useState(null);
    const navigate = useNavigate();

    //Authenticate part
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
            url: 'http://localhost:8000/authentication/checkAccessToken',
            headers: {
                "Content-Type": "application/json",
                'Authorization': accessToken,
                'User-type': 'patient',
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
                const response = await axios.get('http://localhost:8000/patient/viewWalletNumber', {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': accessToken,
                    },
                });

                if (response && response.data) {
                    setWalletNumber(response.data);
                    //window.location.reload();

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
        <p className={styles.largeText}>Balance: {walletNumber} LE</p>
    );
};


export default ViewPatientWalletPage;
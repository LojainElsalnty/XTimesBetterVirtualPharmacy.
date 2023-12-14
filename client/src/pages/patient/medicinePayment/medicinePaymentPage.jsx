import axios from 'axios';

import { useState, useEffect } from "react";

import { useNavigate, useLocation } from "react-router-dom";


import {   Button, ChakraProvider ,Box} from '@chakra-ui/react'
import styles from './medicinePayment.module.css';

function MedicinePayment() {
    const navigate = useNavigate();
    // const accessToken = sessionStorage.getItem("accessToken");
    const location = useLocation();
    // const receipt = location.state.receipt;
    const [selectedButton, setSelectedButton] = useState(null);

    //new part
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
                // console.log(response);
                setUsername(response.data.username);
                //setLoad(false);
            })
            .catch((error) => {
                //setLoad(false);
                navigate('/login');

            });
    }

    const xTest = checkAuthentication();


    const receivedInfo = {
        cartItems: location.state.cartItems,
        deliveryAddress: location.state.deliveryAddress,
        username: location.state.username,
    }


    const handleButtonClick = (buttonId) => {
        // Update the selected button in the component's state
        setSelectedButton({ selectedButton: buttonId });
        handleSubmit(buttonId);
    };

    const handleSubmit = async (buttonId) => {
        if(buttonId==="myCart"){
            navigate('/patient/myCart');
        }
        //console.log(receivedInfo)
        if (buttonId === "creditCard") {
            let receiptCreditCard;

            fetch('http://localhost:8000/patient/paymentCreditCard', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': accessToken,
                },

                body: JSON.stringify(receivedInfo)


            }).then(res => {
                // console.log("Response", res)
                return res.json();

            }).then((data) => {

                //console.log("Response data", data)
                if (data.outofstock) {
                    alert(data.message);
                    // window.location= 'http://localhost:5173/patient/unsuccessPayment';
                    navigate('/patient/unsuccessPayment');

                }

                else {
                    sessionStorage.setItem('orderInfo', JSON.stringify(data.orderInfo))
                    window.location = data.url;
                }

            })



        }
        if (buttonId === "wallet") {
            try {
                fetch('http://localhost:8000/patient/paymentWallet', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': accessToken,
                    },
                    body: JSON.stringify(receivedInfo)
                }).then(res => {
                    console.log(res);
                    return res.json();
                }).then((data) => {
                    if (data.order) {
                        const receipt = data.order;
                        sessionStorage.setItem('orderInfo', JSON.stringify(receipt));
                        // console.log(data.order);
                        navigate('/patient/successPayment');
                        //window.location = data.url;
                    }
                    else {
                        alert(data.message);
                        // window.location = 'http://localhost:5173/patient/unsuccessPayment';
                        navigate('/patient/unsuccessPayment');
                    }

                })
            } catch {
                // alert(response.data.message);
                throw new Error('Error Occuried while payment')
            }

        }

        if (buttonId === "cashOnDelivery") {

            try {
                fetch('http://localhost:8000/patient/paymentCashOnDelivery', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': accessToken,
                    },
                    body: JSON.stringify(receivedInfo)

                }).then(res => {
                    console.log(res);
                    return res.json();
                }).then((data) => {
                    if (data.outofstock) {
                        alert(data.message);
                        navigate('/patient/unsuccessPayment');
                    }
                    else {
                        const receipt = data.order;
                        sessionStorage.setItem('orderInfo', JSON.stringify(receipt));
                        // console.log(data.order);
                        navigate('/patient/successPayment');
                    }

                    //window.location = data.url;

                })
            } catch {
                throw new Error('Error Occuried while payment')
            }



        }

    }
    if (load) {
        return (<div>Loading</div>)
    }
    return (
        <div style={{ backgroundColor: '#f4f4ff', minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <div className={styles['form-container']}>
            <div className={styles['bordered-container']}>
            
              <div className={styles['button-container']}>
                <ChakraProvider>
                  <Box
                    overflowY="auto"
                    width="100%"
                    border="1px solid #ccc"
                    borderRadius="10px"
                    padding="30px"
                  >
                      <h2 style={{ fontSize: '1.5em', marginTop: '-10px', marginBottom: '10px', textAlign: 'center' }}>
                <strong>Choose payment method</strong>
              </h2>
                    <Button
                      className={`${styles['button']} `}
                      colorScheme="gray"
                      variant="solid"
                      type="button"
                      onClick={() => handleButtonClick('wallet')}
                    >
                      Wallet
                    </Button>
                    <Button
                      className={`${styles['button']} `}
                      colorScheme="gray"
                      variant="solid"
                      type="button"
                      onClick={() => handleButtonClick('creditCard')}
                    >
                      Credit Card
                    </Button>
                    <Button
                      className={`${styles['button']} `}
                      colorScheme="gray"
                      variant="solid"
                      type="button"
                      onClick={() => handleButtonClick('cashOnDelivery')}
                    >
                      Cash On Delivery
                    </Button>
                  </Box>
                  <Button
                    className={`${styles['button']} `}
                    colorScheme="blue"
                    variant="solid"
                    type="button"
                    onClick={() => handleButtonClick('myCart')
                        }
                  >
                    Return to Cart
                  </Button>
                </ChakraProvider>
              </div>
            </div>
          </div>
          </div>
       
      );
}

export default MedicinePayment; 

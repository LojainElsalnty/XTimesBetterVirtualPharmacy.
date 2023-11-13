import axios from 'axios';

import { useState, useEffect } from "react";

import { useNavigate, useLocation } from "react-router-dom";

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
            url: 'http://localhost:5000/authentication/checkAccessToken',
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



    // To add from mazen
    // const receivedInfo = {
    //     cartItems:[{
    //         medName: "Medicine1",
    //         quantity: 2,
    //         price_per_item : 2000000
    //     }], deliveryAddress: " ",
    //     username: "john_doe123"
    // };

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
        //console.log(receivedInfo)
        if (buttonId === "creditCard") {
            let receiptCreditCard;

            fetch('http://localhost:5000/patient/paymentCreditCard', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': accessToken,
                },

                body: JSON.stringify(receivedInfo)


            }).then(res => {
                console.log("Response", res)
                return res.json();

            }).then((data) => {

                console.log("Response data", data)
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
                fetch('http://localhost:5000/patient/paymentWallet', {
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
                fetch('http://localhost:5000/patient/paymentCashOnDelivery', {
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
        <div className="payment">
            <h2>Choose payment Method</h2>

            <button
                id="wallet"
                className={selectedButton === 'wallet' ? 'selected' : ''}
                onClick={() => handleButtonClick('wallet')}
            >
                Wallet
            </button>
            <button
                id="creditCard"
                className={selectedButton === 'creditCard' ? 'selected' : ''}
                onClick={() => handleButtonClick('creditCard')}
            >
                Credit Card
            </button>
            <button
                id="cashOnDelivery"
                className={selectedButton === 'cashOnDelivery' ? 'selected' : ''}
                onClick={() => handleButtonClick('cashOnDelivery')}

            >
                Cash On Delivery
            </button>

        </div>
    );
}

export default MedicinePayment; 

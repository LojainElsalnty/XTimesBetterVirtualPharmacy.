import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

function MedicinePayment() {
    const navigate = useNavigate();
    const location = useLocation();
    // const receipt = location.state.receipt;
    const [selectedButton, setSelectedButton] = useState(null);

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

        if (buttonId === "creditCard") {
            let receiptCreditCard;

            fetch('http://localhost:5000/patient/paymentCreditCard', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },

                body: JSON.stringify(receivedInfo)


            }).then(res => {
                return res.json();
            }).then((data) => {
                console.log(data.url);
                console.log(data.successURL);
                receiptCreditCard = data.orderInfo;
                window.location = data.url;

            })



        }
        if (buttonId === "wallet") {
            try {
                fetch('http://localhost:5000/patient/paymentWallet', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(receivedInfo)
                }).then(res => {
                    console.log(res);
                    return res.json();
                }).then((data) => {
                    if (data.order) {
                        const receipt = data.order;
                        // console.log(data.order);
                        navigate('/patient/successPayment', { state: { receipt: receipt, } });
                        //window.location = data.url;
                    }
                    else {
                        alert(data.message);
                        window.location = 'http://localhost:5173/patient/unsuccessPayment';
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
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(receivedInfo)

                    // body: JSON.stringify({
                    //     cartItems: [{
                    //         "medName": "med123",
                    //         "quantity": 0,
                    //         "price_per_item": 10
                    //     }],
                    //     deliveryAddress: " ",
                    //     username: "john_doe123"
                    // })
                }).then(res => {
                    console.log(res);
                    return res.json();
                }).then((data) => {
                    const receipt = data.order;
                    // console.log(data.order);
                    navigate('/patient/successPayment', { state: { receipt: receipt, } });

                    //window.location = data.url;

                })
            } catch {
                throw new Error('Error Occuried while payment')
            }



        }

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

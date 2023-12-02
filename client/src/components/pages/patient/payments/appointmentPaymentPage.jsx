import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

// Axios
import axios from 'axios';

// React Router DOM
import { useNavigate } from 'react-router-dom';

function AppointmentPayment() {
    const location = useLocation()
    const [selectedButton, setSelectedButton] = useState(null);
    
    const [username, setUsername] = useState("");
    const [load, setLoad] = useState(false);
    const accessToken = sessionStorage.getItem("accessToken");
    const navigate = useNavigate();

    useEffect(() => {
        if(username.length != 0) {
            setLoad(true);
        }
    }, [username]);

    async function checkAuthentication() {
      await axios ({
          method: 'get',
          url: `http://localhost:5000/authentication/checkAccessToken`,
          headers: {
              "Content-Type": "application/json",
              'Authorization': accessToken,
              'User-type': 'patient',
          },
      })
      .then((response) => {
          console.log(response);
          setUsername(response.data.username);
      })
      .catch((error) => {
        navigate('/login');
      });
    }
    checkAuthentication() ;

    if (!load) {
        return (<div>Loading</div>);
    }

    const receivedInfo = {
        appointmentDate: location.state.appointmentDate,
        doctorName: location.state.doctorName,
        doctorUsername: location.state.doctorUsername, 
        appointmentPrice: location.state.appointmentPrice,
        appointmentSlot : location.state.appointmentSlot,
        username: location.state.patient_username,
        rowId : location.state.rowID
    };
    // console.log("receivedInfo",receivedInfo);

    // For test
    // const receivedInfo = {
    //     appointmentDate: "11/11/2023",
    //     doctorName: "dr_jones",
    //     appointmentPrice: 1,
    //     username: "ali",
    // };


    const handleButtonClick = (buttonId) => {
        // Update the selected button in the component's state
        setSelectedButton({ selectedButton: buttonId });
        handleSubmit(buttonId);
    };

    const handleSubmit = async (buttonId) => {
        // console.log("receivedInfo",receivedInfo);

        if (buttonId === "creditCard") {


            fetch('http://localhost:5000/patient/appointmentPaymentCreditCard', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },

                body: JSON.stringify(receivedInfo)


            }).then(res => {
                return res.json();
            }).then((data) => {
                console.log(data);
                if(data.success){
                // console.log(data.url);
                // console.log(data.successURL);
                // receiptCreditCard= data.orderInfo;
                window.location = data.url;
                }
                else{

                    alert(data.message);
                    navigate('/patient/unsuccessPayment');
                }

            })



        }
        if (buttonId === "wallet") {
            try {
                console.log(receivedInfo);
                fetch('http://localhost:5000/patient/appointmentPaymentWallet', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(receivedInfo)
                }).then(res => {
                    console.log(res);
                    return res.json();
                }).then((data) => {
                    console.log(data.success);
                    if (data.success) {

                        window.location = 'http://localhost:5173/patient/successPayment';
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



    }
    return (
        <div className="receipt-container">
            <h2>Appointment Receipt</h2>
            <div>
                <strong>Appointment Date:</strong> {receivedInfo.appointmentDate}
            </div>
            <div>
                <strong>Doctor Name:</strong> {receivedInfo.doctorName}
            </div>
            <div>
                <strong>Appointment Price:</strong> {receivedInfo.appointmentPrice}
            </div>
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


        </div>
    );
}

export default AppointmentPayment; 
import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

// Axios
import axios from 'axios';

function PackagePayment() {

    const location = useLocation();
    const [selectedButton, setSelectedButton] = useState(null);

    const [username, setUsername] = useState("");
    const [load, setLoad] = useState(true);
    const accessToken = sessionStorage.getItem("accessToken");
    const navigate = useNavigate();

    const receivedInfo = {
        patient_username: location.state.patient_username,   
        paying_username: location.state.paying_username,  
        package_name: location.state.package_name,
        priceBefore : location.state.priceBefore,
        priceAfter: location.state.priceAfter,
        isExistingPatient: location.state.isExistingPatient
    };

    // console.log(receivedInfo);
    
    // console.log("Payment package page line 17");

    // setUsername(receivedInfo.paying_username);
    // console.log("username", username);

    useEffect(() => {
        if(username.length != 0) {
            setLoad(false);
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
          
          setLoad(false);
       
           setUsername(response.data.username);
      })
      .catch((error) => { 
        setLoad(false);
        navigate('/login');

      });
    }
    checkAuthentication() ;
    console.log(load);

    if (load) {
        return (<div>Loading</div>);
    }
    
   
    console.log("Received Info at package payment page",receivedInfo);


    // const receivedInfo = {
    //     patient_username: location.state.patient_username,   
    //     paying_username: location.state.paying_username,  
    //     package_name: location.state.package_name,
    //     priceBefore : location.state.priceBefore,
    //     priceAfter: location.state.priceAfter,
    //     isExistingPatient: isExistingPatient
    // };
   

    const handleButtonClick = (buttonId) => {
        // Update the selected button in the component's state
        setSelectedButton({ selectedButton: buttonId });
        handleSubmit(buttonId);
    };

    const handleSubmit = async (buttonId) => {
        sessionStorage.setItem("receivedInfo", JSON.stringify(receivedInfo));

        if (buttonId === "creditCard") {
            console.log(receivedInfo);
           
            
            fetch('http://localhost:5000/patient/packagePaymentCreditCard', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(receivedInfo)

            }).then(res => {

                return res.json();
            }).then((data) => {
                
                window.location = data.url;
            })
        }

        if (buttonId === "wallet") {
            try {
                console.log(receivedInfo);
                fetch('http://localhost:5000/patient/packagePaymentWallet', {
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
                    console.log(data.packObject);
                    if (data.success) {
                        navigate('/patient/successPackagePay', {state:{ packObject: data.packObject}})

                       // window.location = 'http://localhost:5173/patient/successPackPayWallet';
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
        <div className="payment">
            <div className="receipt-container">
                <h2>Receipt</h2>
                <div>
                    <strong>Package: </strong> {receivedInfo.package_name}
                </div>
                <div>
                    <strong>Price: </strong> {receivedInfo.priceAfter}
                </div>
            </div>
            <h3>Choose payment Method</h3>
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

export default PackagePayment; 
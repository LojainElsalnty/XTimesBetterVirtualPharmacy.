// Axios
import axios from 'axios';

import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from "react";

import styles from './medicinePayment.module.css';
import { Button, ChakraProvider, IconButton } from '@chakra-ui/react'
import { CloseIcon } from '@chakra-ui/icons'

function UnsuccessPayment() {
  const navigate = useNavigate();
  // const accessToken = sessionStorage.getItem('accessToken');

  // const receivedInfo = {
  //     cartItems: [{
  //         medName: "Medicine1",
  //         quantity: 2,
  //         price_per_item: 20
  //     }], deliveryAddress: " ",
  //     username: "john_doe123"
  // };
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

  const handleSubmit = () => {
    sessionStorage.removeItem('cartItems');//if redirect changed to another payment method remove this line!!!!
    // window.location.href = "http://localhost:5173/patient/";
    navigate('/patient');

  };

  if (load) {
    return (<div>Loading</div>)
  }

  return (
    // <div className="Success Payment">
    //     <h2>Unsuccessful Payment</h2>
    //     <button onClick={() => handleSubmit()}>Proceed</button>
    // </div>

    <div
      style={{
        backgroundColor: "#f4f4ff",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <ChakraProvider>
        <div className={styles["form-container"]}>
          <div className={styles["bordered-container"]} style={{ maxWidth: "600px", overflowY: "auto" }}>
            <h2
              style={{
                fontSize: "1.5em",
                marginTop: "10px",
                marginBottom: "10px",
                textAlign: "center",
              }}
            >
              <strong>
                {" "}
                Unsuccessful Payment
              </strong>{" "}
              <IconButton
                isRound={true}
                variant="solid"
                colorScheme="red"
                aria-label="Done"
                size="5px"
                icon={<CloseIcon />}
              />
            </h2>



            <div className={styles["button-container"]}>
              <Button
                className={`${styles["button"]} `}
                colorScheme="blue"
                variant="solid"
                type="button"
                onClick={() => handleSubmit()}
              >
                Home
              </Button>
            </div>
          </div>
        </div>
      </ChakraProvider>
    </div>
  );

}

export default UnsuccessPayment; 
// Axios
import axios from 'axios';

import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import styles from './medicinePayment.module.css';
import { Button, ChakraProvider, IconButton } from '@chakra-ui/react'
import { CheckIcon } from '@chakra-ui/icons'


function SuccessPayment() {
  const navigate = useNavigate();
  const location = useLocation();
  //const receipt = location.state.receipt;
  const receipt = JSON.parse(sessionStorage.getItem('orderInfo'))
  // const accessToken = sessionStorage.getItem('accessToken');
  console.log(receipt);
  const handleSubmit = () => {
    sessionStorage.removeItem('cartItems');
    //window.location.href = 'http://localhost:5174/patient';
    //window.location.reload();
    navigate('/patient');
  }

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

  if (load) {
    return (<div>Loading</div>)
  }

  // Calculate total sum of order items
  const totalSum = receipt?.orderItems.reduce(
    (sum, item) => sum + item.price_per_item * item.quantity,
    0
  );

  return (
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
                Success Payment
              </strong>{" "}
              <IconButton
                isRound={true}
                variant="solid"
                colorScheme="green"
                aria-label="Done"
                size="5px"
                icon={<CheckIcon />}
              />
            </h2>

            <div style={{ textAlign: "left" }}>
              <h3
                style={{
                  color: "#000000",
                  fontSize: "1.3em",
                  marginTop: "20px",
                  marginBottom: "10px",
                  marginRight: "100px",
                }}
              >
                Order Information:
              </h3>
              <div
                className={`${styles["order-items"]} ${styles["form-container"]}`}
                style={{ textAlign: "center" }}
              >
                <ul style={{ listStyle: "none" }}>
                  {receipt &&
                    receipt.orderItems &&
                    receipt.orderItems.map((item, index) => (
                      <li
                        key={index}
                        style={{
                          marginBottom: "10px",
                          textAlign: "left",
                        }}
                      >
                        <p>
                          <strong>Medicine:</strong> {item.medName}
                        </p>
                        <p>
                          <strong>Quantity:</strong> {item.quantity}
                        </p>
                        <p>
                          <strong>Price per Item:</strong> {item.price_per_item}
                        </p>
                      </li>
                    ))}
                </ul>
              </div>
              <p style={{ marginTop: "20px" }}>
                <strong>Total:</strong> {totalSum.toFixed(2)} LE
              </p>
              <p style={{ marginTop: "10px" }}>
                <strong>Delivery Address:</strong> {receipt.deliveryAddress}
              </p>
              <p style={{ marginTop: "10px" }}>
                <strong>Payment through:</strong> {receipt.paymentMethod}
              </p>
              <p style={{ marginTop: "10px" }}>
                <strong>Status:</strong> {receipt.status}
              </p>
            </div>
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

export default SuccessPayment; 

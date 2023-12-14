import axios from 'axios';
import out_of_stock from '../../../assets/images/out_of_stock.png'
import { useState, useEffect } from "react";
import styles from '../notifications/viewNotificationsPage.module.css';
import { Button, ChakraProvider, Box } from '@chakra-ui/react'
import { useNavigate } from 'react-router-dom';


function Notifications() {
  const navigate = useNavigate();

  //new part
  const accessToken = sessionStorage.getItem('accessToken');
  const [load, setLoad] = useState(true);
  const [username, setUsername] = useState('');
  const [notifications, setNotifications] = useState([]);
  //   console.log(accessToken);
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
        'User-type': 'pharmacist',
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

  checkAuthentication();



  useEffect(() => {
    if (username.length !== 0) {
      setLoad(false);
      fetch('http://localhost:8000/pharmacist/notifications', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': accessToken,
        },

        body: JSON.stringify({ username: username })


      }).then(res => {
        // console.log("Response", res)
        return res.json();

      }).then((data) => {
        // console.log("Data in notifications", data.notifications)
        setNotifications(data.notifications);



      })
    }
  }, [username]);

  const handleSubmit = () => {
    navigate('/pharmacist/');
  }

  //console.log("notifications", notifications)
  if (load) {
    return (<div>Loading</div>)
  }

  // calculate the time difference
  const calculateTimeDifference = (timestamp) => {
    const currentTime = new Date();
    const notificationTime = new Date(timestamp);
    const timeDifference = currentTime - notificationTime;

    const hoursDifference = Math.floor(timeDifference / (1000 * 60 * 60));
    const daysDifference = Math.floor(hoursDifference / 24);
    if (hoursDifference < 1)
      return `few minutes ago`;

    if (hoursDifference < 24) {
      return `${hoursDifference} hours ago`;
    } else {
      return `${daysDifference} days ago`;
    }
  };

  return (
    <div style={{ backgroundColor: '#f4f4ff' }}>
      <div className={styles['update-form-container']} >
        <div className={styles['bordered-container']}>
          <h2 style={{ fontSize: '1.5em', marginTop: '30px', marginBottom: '30px' }}>
            <strong>Notifications</strong>
          </h2>
          <div style={{ display: 'flex', justifyContent: 'center', height: '70vh' }}>
            <Box
              overflowY="auto"  // Add vertical scrollbar when content overflows
              height="400px" // Adjust the height based on your preference
              width="100%"
              border="1px solid #ccc"
              borderRadius="10px"
              padding="30px"
            >
              {notifications.map((notification) => (
                <div key={notification.timestamp} style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
                  <img
                    src={out_of_stock}
                    alt="X"
                    style={{ width: '50%', maxWidth: '50px', marginRight: '10px' }}
                  />
                  <span>{notification.message} - {calculateTimeDifference(notification.timestamp)}</span>
                </div>
              ))}

            </Box>
          </div>
          <ChakraProvider>
            <Button
              className={`${styles['update-button']} ${styles['update-info']}`}
              colorScheme="blue"
              variant="solid"
              type="button"
              onClick={handleSubmit}
            >
              home
            </Button>
          </ChakraProvider>
        </div>
      </div>
    </div>
  );




}
export default Notifications;
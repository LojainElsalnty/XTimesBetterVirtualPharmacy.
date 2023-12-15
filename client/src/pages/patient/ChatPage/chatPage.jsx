import React, { useState, useEffect } from 'react';

// Axios
import axios from 'axios';

// Styles
import styles from './chatPage.module.css';

// Hooks
import { useNavigate } from 'react-router-dom';

// Socket.io
import socketIO from 'socket.io-client';

// User Defined Components
import { ChatFooter } from '../../../components/chatFooter/chatFooter';
import { ChatBar } from '../../../components/chatBar/chatBar';

export const ChatPage = () => {
    const [selectedUser, setSelectedUser] = useState('');
    const [selectedUserType, setSelectedUserType] = useState('');
    const [username, setUsername] = useState('');
    const [name, setName] = useState('');
    const [load, setLoad] = useState(true);
    const [socket, setSocket] = useState(null);
    const accessToken = sessionStorage.getItem("accessToken");
    const navigate = useNavigate();

    useEffect(() => {
      if (username.length != 0) {
        setLoad(false);
      }
    }, [username]);

    async function checkAuthentication() {
      await axios ({
          method: 'get',
          url: `http://localhost:8000/authentication/checkAccessToken`,
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

    checkAuthentication();

    if (load) {
      return(<div>Loading</div>)
    }

    function selectUser(userUsername, name, userType) {
      setSocket(socketIO.connect('http://localhost:8000'));
      console.log(`Selected name: ${name}`);
      setName(name);
      console.log(`Selected username: ${userUsername}`);
      setSelectedUser(userUsername);
      console.log(`Selected user type: ${userType}`);
      setSelectedUserType(userType);
    }

    return (
        <div className={styles['chat']}>
          <div className={styles['chat__bar']}>
            <ChatBar selectedUser={selectUser} userType={"patient"}/>
          </div>
          <div className={styles['chat__main']}>
            <ChatFooter socket={socket} userUsername={selectedUser} receiverName={name} receiverUserType={selectedUserType} userType={"patient"} />
          </div>
      </div>
    );
}

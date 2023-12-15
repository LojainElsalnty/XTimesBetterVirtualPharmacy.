/* eslint-disable react/jsx-key */
import React from 'react'

// Axios
import axios from 'axios';

// Styles
// import './chatFooter.css';
import styles from './chatFooter.module.css';

// Hooks
import { useState, useEffect } from 'react';

// React Router DOM
import { useNavigate } from 'react-router-dom';

// Font Awesome
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserDoctor, faUser, faUserNurse, faCircleArrowRight, faPaperPlane, faX } from '@fortawesome/free-solid-svg-icons';

export const ChatFooter = ({ socket, userUsername, receiverName, receiverUserType, userType }) => {
    const [text, setText] = useState("");
    const [messages, setMessages] = useState([]);
    const navigate = useNavigate();
    const accessToken = sessionStorage.getItem("accessToken");
    const username = sessionStorage.getItem("username");

    useEffect(() => {
      if (userUsername !== undefined && userUsername !== null && userUsername !== "") {
        console.log("talking to new user")
        setMessages([]);
        getMessages();
      }
    }, [userUsername]); 

    useEffect(() => {
      if (socket) {
        const handleMessage = (data) => {
          setMessages(prevMessages => [...prevMessages, {name: data.name, text: data.text}]);
          console.log("got a message");
        };
     
        socket.on('message', handleMessage);
     
        return () => {
          socket.off('message', handleMessage);
        }
      }
    }, [socket]);

    const handleLeaveChat = () => {
      navigate('/');
      window.location.reload();
    };

    async function getMessages() {
      await axios ({
        method: 'get',
        url: `http://localhost:8000/${userType}/chat/${userUsername}`,
        headers: {
            "Content-Type": "application/json",
            'Authorization': accessToken,
        },
      }).then(res => {
        let newMessages = res.data.messages.map((data) => { return {name: data.sender_username, text: data.message}});
        let filterMessages = newMessages.filter((data) => data.text !== undefined);
        setMessages(filterMessages);
      }).catch(err => console.log(err));
    }

    async function postMessages(message) {
      await axios ({
        method: 'post',
        url: `http://localhost:8000/${userType}/chat/${userUsername}`,
        headers: {
            "Content-Type": "application/json",
            'Authorization': accessToken,
        },
        data: {
          message: message,
        }
      }).then(res => {
        console.log("Message stored successfully!");
      }).catch(err => console.log(err));
    }

    const handleSendMessage = (e) => {
        e.preventDefault();
        
        if (!text || !socket) {
          return;
        }

        setMessages(prevMessages => [...prevMessages, {name: sessionStorage.getItem('username'), text: text}]);

        // Store the message in the database
        postMessages(text);

        const roomName = sessionStorage.getItem('username') + "!@!@2@!@!" + userUsername;
        if (text.trim() && sessionStorage.getItem('username')) {
          socket.emit('room', {
            text: text,
            name: sessionStorage.getItem('username'),
            room: roomName,
            id: `${socket.id}${Math.random()}`,
            socketID: socket.id,
          });
        }
        setText('');
      };

    if (!text && !socket) {
        return (<div></div>);
    }

    console.log(receiverUserType);

    return (
      <>
        <div className={styles['messages__chat']}>
          <div className={styles['message__header']}>
            <div className={styles['message__receiver__title']}>
              {
                receiverUserType === 'doctor' ? 
                    (
                      <>
                        <FontAwesomeIcon icon={faUserDoctor} className={styles['message__receiver__icon']} />
                        <p className={styles['title__name']}>Doctor: {receiverName}</p>
                      </>
                    ) :
                receiverUserType === 'patient' ?
                    (
                      <>
                        <FontAwesomeIcon icon={faUser} className={styles['message__receiver__icon']} />
                        <p className={styles['title__name']}>Patient: {receiverName}</p>
                      </>
                    ) :
                receiverUserType === 'pharmacist' ?
                    (
                      <>
                        <FontAwesomeIcon icon={faUserNurse} className={styles['message__receiver__icon']} />
                        <p className={styles['title__name']}>Pharmacist: {receiverName}</p>
                      </>
                    ) :
                    (
                      <></>
                    )
              }

            </div>
          </div>
          {messages.map((message) => {

            if (message.name === username) {
              return (
              <div className={styles['sender__main']}>
                <p className={styles['sender__name']}>You</p>
                <div className={styles['message__sender']}>
                  <p className={styles['sender__message']}>{message.text}</p>
                </div>
              </div>
            )}
            else {
              return (
              <div className="receiver__main">
                <p className={styles['receiver__name']}>{receiverName}</p>
                <div className={styles["message__receiver"]}>
                  <p className={styles['receiver__message']}>{message.text}</p>
                </div>
              </div>
            )}
          })}
        </div>
        <div className={styles['text__input__div']}>
          <form className={styles['text__form']} onSubmit={handleSendMessage}>
            <input
              type="text"
              placeholder="Write message"
              className={styles['text__input']}
              value={text}
              onChange={(e) => setText(e.target.value)}
            />
            <button className={styles['sendBtn']}>
              <FontAwesomeIcon icon={faPaperPlane} className={styles['sendBtn__icon']} />
            </button>
          </form>
        </div>
      </>
    );

}

export default ChatFooter;
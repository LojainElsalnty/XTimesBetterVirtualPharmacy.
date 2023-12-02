/* eslint-disable react/jsx-key */
import React from 'react'

// Axios
import axios from 'axios';

// Styles
import './chatFooter.css';

// Hooks
import { useState, useEffect } from 'react';

// React Router DOM
import { useNavigate } from 'react-router-dom';

export const ChatFooter = ({ socket, userUsername, userType }) => {
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
        url: `http://localhost:5000/${userType}/chat/${userUsername}`,
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
        url: `http://localhost:5000/${userType}/chat/${userUsername}`,
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

    return (
      <>
        <div className="message__container">
          {messages.map((message) => {

            if (message.name === username) {
              return (
              <div className="message__chats">
                <p className="sender__name">You</p>
                <div className="message__sender">
                  <p>{message.text}</p>
                </div>
              </div>
            )}
            else {
              return (
              <div className="message__chats">
                <p>{message.name}</p>
                <div className="message__recipient">
                  <p>{message.text}</p>
                </div>
              </div>
            )}
          })}
        </div>
        <div className="chat__footer">
          <form className="form" onSubmit={handleSendMessage}>
            <input
              type="text"
              placeholder="Write message"
              className="message"
              value={text}
              onChange={(e) => setText(e.target.value)}
            />
            <button className="sendBtn">SEND</button>
          </form>
        </div>
      </>
    );

}

export default ChatFooter;
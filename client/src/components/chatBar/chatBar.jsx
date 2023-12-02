import React from 'react';

// Axios
import axios from 'axios';

// Styles
import styles from './chatBar.module.css';

// Hooks
import { useState, useEffect } from 'react';

// User Defined Hooks
import { ChatTab } from '../chatTab/chatTab';

export const ChatBar = ({ selectedUser, userType }) => {
  const [users, setUsers] = useState([]);
  const accessToken = sessionStorage.getItem("accessToken");

  useEffect(() => {
    getUsers();
  }, []);

  async function getUsers() {
      await axios ({
        method: 'get',
        url: `http://localhost:5000/${userType}/chat/users`,
        headers: {
            "Content-Type": "application/json",
            'Authorization': accessToken,
        },
      })
      .then((res) => {
        setUsers(res.data.users);
      })
      .catch((err) => console.log(err));
  }

  return (
    <div className="chat__sidebar">
      <h2>Open Chat</h2>

      <div>
        <h4 className="chat__header">ACTIVE USERS</h4>
        <div className="chat__users">
          {
            users.map((username, id) => {
              return (
                <ChatTab
                  key={id}
                  username={username}
                  onClick={selectedUser}
                />
              );
            })
          }
        </div>
      </div>
    </div>
  );
}

export default ChatBar;
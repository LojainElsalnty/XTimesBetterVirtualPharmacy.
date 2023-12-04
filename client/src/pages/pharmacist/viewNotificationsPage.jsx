import axios from 'axios';

import { useState, useEffect } from "react";

import { useNavigate, useLocation } from "react-router-dom";

 function Notifications() {

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
      url: 'http://localhost:5000/authentication/checkAccessToken',
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
     fetch('http://localhost:5000/pharmacist/notifications', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
        'Authorization': accessToken,
    },

    body: JSON.stringify({username: username})


}).then(res => {
    // console.log("Response", res)
    return res.json();

}).then((data) => {
   // console.log("Data in notifications", data.notifications)
    setNotifications(data.notifications);

    

})
}
}, [username]);
  
//console.log("notifications", notifications)
  if (load) {
    return (<div>Loading</div>)
  }

  return (
    <div>
      <h2>Notifications</h2>
      <ul>
        {notifications.map((notification) => (
          <li key={notification.timestamp}>
            {notification.message} .
          </li>
        ))}
      </ul>
    </div>
  );
        
        

}
export default Notifications;
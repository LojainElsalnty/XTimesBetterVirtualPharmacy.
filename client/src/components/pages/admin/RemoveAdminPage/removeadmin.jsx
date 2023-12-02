import React, { useState } from 'react';

function RemoveAdmin() {
  const [adminInfo, setAdminInfo] = useState({
    username: ''
    
  });

  const [selectedRadio, setSelectedRadio] = useState(null);
  const [requestBody, setRequestBody] = useState({}); 
  // const [username, setUsername] = useState({}); 

  const handleChange = (e) => {
    const { name, value } = e.target;
  
      setAdminInfo({ ...adminInfo, username: value });
  };
  console.log(adminInfo)

  const handleRadioChange = (val) => {
    setSelectedRadio(val);

    // Prepare the request body based on selectedRadio
    const body = {};
    
    // Update the state with the request body
    setRequestBody(body);
  };
  
  const handleSubmit = () => {
    const requestBody = {
        username: adminInfo.username
      };

    // Make an HTTP PATCH request to send the data to the backend using the requestBody
    fetch('http://localhost:5000/Admin/addremoveclinic/removeadmin', {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(requestBody),
    }).then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      }).then((data) => {
       // console.log(data.success);
        if (data) {
            console.log('Admin removed', data);
            alert('Admin removed');
           
          } else {
            console.error('Can not remove admin', data);
            alert('Can not remove admin');
           
          }
      })
      .catch((error) => {
        console.error('Error removing Admin', error);
        console.log('This Admin does not exist');
        alert('This Admin does not exist');
        
      });
  };
 
    
      

return (
    <div className="choose">
      
      <div className="username" id="username">
          <label htmlFor="username"> Admin username: </label>
          <input
            type="text"
            name="username"
            value={adminInfo.username}
            onChange={handleChange}
            
          />
        </div>

     <button type="button" onClick={handleSubmit}>
        Remove admin
      </button>
    </div>
  );

}

export default RemoveAdmin; 
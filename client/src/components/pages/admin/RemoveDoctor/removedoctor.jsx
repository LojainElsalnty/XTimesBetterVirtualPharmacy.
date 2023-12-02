import React, { useState } from 'react';

function RemoveDoctor() {
  const [doctorInfo, setDoctorInfo] = useState({
    username: ''
    
  });

  const [selectedRadio, setSelectedRadio] = useState(null);
  const [requestBody, setRequestBody] = useState({}); 
  // const [username, setUsername] = useState({}); 

  const handleChange = (e) => {
    const { name, value } = e.target;
  
      setDoctorInfo({ ...doctorInfo, username: value });
  };
  console.log(doctorInfo)

  const handleRadioChange = (val) => {
    setSelectedRadio(val);

    // Prepare the request body based on selectedRadio
    const body = {};
    
    // Update the state with the request body
    setRequestBody(body);
  };
  
  const handleSubmit = () => {
    const requestBody = {
        username: doctorInfo.username
      };

    // Make an HTTP PATCH request to send the data to the backend using the requestBody
    fetch('http://localhost:5000/admin/addremoveclinic/removedoctor', {
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
            console.log('Doctor removed', data);
            alert('Doctor removed');
           
          } else {
            console.error('Can not remove doctor', data);
            alert('Can not remove doctor');
           
          }
      })
      .catch((error) => {
        console.error('Error removing doctor', error);
        console.log('This doctor does not exist');
        alert('This doctor does not exist');
        
      });
  };
 
    
      

return (
    <div className="choose">
      
      <div className="username" id="username">
          <label htmlFor="username"> Doctor username: </label>
          <input
            type="text"
            name="username"
            value={doctorInfo.username}
            onChange={handleChange}
            
          />
        </div>

     <button type="button" onClick={handleSubmit}>
        Remove doctor
      </button>
    </div>
  );

}

export default RemoveDoctor; 
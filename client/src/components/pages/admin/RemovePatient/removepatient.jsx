import React, { useState } from 'react';

function RemovePatient() {
  const [patientInfo, setPatientInfo] = useState({
    username: ''
    
  });

  const [selectedRadio, setSelectedRadio] = useState(null);
  const [requestBody, setRequestBody] = useState({}); 
  // const [username, setUsername] = useState({}); 

  const handleChange = (e) => {
    const { name, value } = e.target;
  
      setPatientInfo({ ...patientInfo, username: value });
  };
  console.log(patientInfo)

  const handleRadioChange = (val) => {
    setSelectedRadio(val);

    // Prepare the request body based on selectedRadio
    const body = {};
    
    // Update the state with the request body
    setRequestBody(body);
  };
  
  const handleSubmit = () => {
    const requestBody = {
        username: patientInfo.username
      };

    // Make an HTTP PATCH request to send the data to the backend using the requestBody
    fetch('http://localhost:5000/admin/addremoveclinic/removepatient', {
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
            console.log('Patient removed', data);
            alert('Patient removed');
           
          } else {
            console.error('Can not remove patient', data);
            alert('Can not remove patient');
           
          }
      })
      .catch((error) => {
        console.error('Error removing patient', error);
        console.log('This patient does not exist');
        alert('This patient does not exist');
        
      });
  };
 
    
      

return (
    <div className="choose">
      
      <div className="username" id="username">
          <label htmlFor="username"> Patient username: </label>
          <input
            type="text"
            name="username"
            value={patientInfo.username}
            onChange={handleChange}
            
          />
        </div>

     <button type="button" onClick={handleSubmit}>
        Remove patient
      </button>
    </div>
  );

}

export default RemovePatient; 
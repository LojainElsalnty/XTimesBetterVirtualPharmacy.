import React, { useState } from 'react';

function RemovePharmacist() {
  const [pharmacistInfo, setPharmacistInfo] = useState({
    username: ''
    
  });

  const [selectedRadio, setSelectedRadio] = useState(null);
  const [requestBody, setRequestBody] = useState({}); 
  // const [username, setUsername] = useState({}); 

  const handleChange = (e) => {
    const { name, value } = e.target;
  
      setPharmacistInfo({ ...pharmacistInfo, username: value });
  };
  console.log(pharmacistInfo)

  const handleRadioChange = (val) => {
    setSelectedRadio(val);

    // Prepare the request body based on selectedRadio
    const body = {};
    
    // Update the state with the request body
    setRequestBody(body);
  };
  
  const handleSubmit = () => {
    const requestBody = {
        username: pharmacistInfo.username
      };

    // Make an HTTP PATCH request to send the data to the backend using the requestBody
    fetch('http://localhost:5000/admin/addremove/removePharmacist', {
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
            console.log('Pharmacist removed', data);
            alert('Pharmacist removed');
           
          } else {
            console.error('Can not remove pharmacist', data);
            alert('Can not remove pharmacist');
           
          }
      })
      .catch((error) => {
        console.error('Error removing pharmacist', error);
        console.log('This pharmacist does not exist');
        alert('This pharmacist does not exist');
      });
  };
 
    
      

return (
    <div className="choose">
      
      <div className="username" id="username">
          <label htmlFor="username"> Pharmacist username: </label>
          <input
            type="text"
            name="username"
            value={pharmacistInfo.username}
            onChange={handleChange}
            
          />
        </div>

     <button type="button" onClick={handleSubmit}>
        Remove pharmacist
      </button>
    </div>
  );

}

export default RemovePharmacist; 
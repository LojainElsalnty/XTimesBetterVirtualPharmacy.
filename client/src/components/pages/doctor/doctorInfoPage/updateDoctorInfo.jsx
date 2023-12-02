import React, { useState } from 'react';

function UpdateDoctorInfo() {
  const [doctorInfo, setDoctorInfo] = useState({
    username: '',
    email:'',
    hourly_rate: 0,
    affiliation:'',
    
  });

  const [selectedRadio, setSelectedRadio] = useState(null);
  const [requestBody, setRequestBody] = useState({}); 
  // const [username, setUsername] = useState({}); 

  const handleChange = (e) => {
    const { name, value } = e.target;
  
    if (name === 'email' || name === 'affiliation' || name === 'hourly_rate') {
      // Only allow editing of email, affiliation, and hourly_rates fields
      setDoctorInfo({ ...doctorInfo, [name]: value });
    }else if (name === 'username') {
      setDoctorInfo({ ...doctorInfo, username: value });
    }
  };
  // console.log(doctorInfo)

  const handleRadioChange = (val) => {
    setSelectedRadio(val);

    // Prepare the request body based on selectedRadio
    const body = {};
    if (val === 0) {
      body.email = doctorInfo.email;
    } else if (val === 1) {
      body.hourly_rate = doctorInfo.hourly_rate;
    } else if (val === 2) {
      body.affilitation = doctorInfo.affilitation;
    }
    
    // Update the state with the request body
    setRequestBody(body);
  };
  
  const handleSubmit = () => {
    if (!doctorInfo.username) {
      // Check if the username is empty
      alert("Please enter the username!");
      return; // Stop the submission
    }
  //   if(!selectedRadio){
  //     alert("Please select info to update ");
  //  }
  if(doctorInfo.hourly_rate===0&& doctorInfo.affiliation===''&&doctorInfo.email===''){
    alert("Please enter the info to update!");
      return;
  }
    const requestBody = {
        username: doctorInfo.username,
        email: doctorInfo.email,
        hourly_rate: doctorInfo.hourly_rate,
        affiliation: doctorInfo.affiliation
      };

      
    // Make an HTTP PATCH request to send the data to the backend using the requestBody
    fetch('http://localhost:5000/doctor/profile/updateDoctorInfo', {
      method: 'PATCH',
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
            console.log('Doctor updated successfully:', data);
            alert("Doctor updated successfully ");
          } else {
            
            alert("Doctor update failed");
           
          }
      })
      .catch((error) => {
        
        
        console.log('This doctor does not exist');
        alert("This doctor does not exist");

  });
  };
 
    
      

return (
    <div className="choose">
      <h2>Update your personal Info</h2>
      
      <div className="radio-container m-r-45">
        
        <input
          type="radio"
          name="update"
          onClick={() => handleRadioChange(0)}
          value="0"
          checked={selectedRadio === 0}
          
        />
        <label>Email</label>
      </div>
      <div className="radio-container m-r-45">
        
        <input
          type="radio"
          name="update"
          onClick={() => handleRadioChange(1)}
          value="1"
          checked={selectedRadio === 1}
        />
       <label> Hourly Rate</label>
      </div>
      <div className="radio-container m-r-45">
        
        <input
          type="radio"
          name="update"
          onClick={() => handleRadioChange(2)}
          value="2"
          checked={selectedRadio === 2}
        />
       <label> Affiliation</label>
      </div>

      {selectedRadio === 0 && (
        <div className="updateEmail" id="email">
          <label htmlFor="email"> Doctor email: </label>
          <input
            type="text"
            name="email"
            value={doctorInfo.email}
            onChange={handleChange}
          />
        </div>
      )}
      {selectedRadio === 1 && (
        <div className="updateHourlyRate" id="hourly_rate">
          <label htmlFor="hourly_rate"> Doctor Hourly Rate: </label>
          <input
            type="Number"
            name="hourly_rate"
            value={doctorInfo.hourly_rate}
            onChange={handleChange}
          />
        </div>
      )}
      {selectedRadio === 2 && (
        <div className="updateAffiliation" id="affiliation">
          <label htmlFor="affiliation"> Doctor affiliation: </label>
          <input
            type="text"
            name="affiliation"
            value={doctorInfo.affiliation}
            onChange={handleChange}
          />
        </div>
      )}
      <div className="username" id="username">
          <label htmlFor="username"> Doctor username: </label>
          <input
            type="text"
            name="username"
            value={doctorInfo.username}
            onChange={handleChange}
            required="true"
            
          />
        </div>

     <button type="button" onClick={handleSubmit}>
        Update Doctor Info
      </button>
    </div>
  );

}

export default UpdateDoctorInfo; 
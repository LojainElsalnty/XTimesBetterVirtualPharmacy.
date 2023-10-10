//import React, { Component } from 'react';
import styles from './pharmacistView.module.css';

import React, { useState } from 'react'


function PharmacistView() {
  const [username, setUsername] = useState('');
  const [pharmacist, setPharmacist] = useState(null);
   
  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };
 // console.log(username)
 //console.log("iam here")
  const fetchPharmacistInfo = async () => {
  try {
    const response = await fetch(`http://localhost:5000/pharmaRoutes/viewPharmaInfo/${username}`);

    console.log(response);
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const data = await response.json();
    setPharmacist(data);
  } catch (error) {
    console.error('Error fetching pharmacist information:', error);
    
  }
  
};


  return (
    <div>
      <h2>Pharmacist Information</h2>
      <label>
        Enter Pharmacist Username:
        <input
          type="text"
          value={username}
          onChange={handleUsernameChange}
        />
      </label>
      <button onClick={fetchPharmacistInfo}>Fetch Information</button>
      {pharmacist && (
        <div>
          <h3>Pharmacist Information for {pharmacist.username}</h3>
          <p>Name: {pharmacist.name}</p>
          <p>Email: {pharmacist.email}</p>
          <p>Date of Birth: {pharmacist.dob}</p>
          <p>Hourly Rate: ${pharmacist.hourly_rate.toFixed(2)}</p>
          <p>Affiliation: {pharmacist.affiliation}</p>
          <p>Educational Background: {pharmacist.educational_background}</p>
        </div>
      )}
    </div>
  );
}

export default PharmacistView;

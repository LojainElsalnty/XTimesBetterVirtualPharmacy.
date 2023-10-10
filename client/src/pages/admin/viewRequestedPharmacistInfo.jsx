import React, { useState } from 'react';
function ViewRequestedPharmacistInfo() {
  const [pharmacistInfo, setPharmacistInfo] = useState({
    username: ''
  });
  const [requestedPharmacist, setRequestedPharmacist] = useState(null);
  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === 'username') {
      setPharmacistInfo({ ...pharmacistInfo, username: value });
    }
  };
  const handleSubmit = () => {
    const data = {
      param1: pharmacistInfo.username
    };
    const url = `http://localhost:5000/admin/viewREQPharmacist?username=${data.param1}`
    // Make an HTTP PATCH request to send the data to the backend using the requestBody
    fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      }
      // body: JSON.stringify(requestBody),
    }).then((response) => {
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
        //alert('Cannot view requested pharmacist')
      }
      return response.json();
    }).then((data) => {
      // console.log(data.success);
      if (data.length > 0) {
        console.log('Requested Pharmacist:', data);
        setRequestedPharmacist(data[0]);

      } else {
        console.error('Can not view requested pharmacist:', data);
        alert('Cannot view requested pharmacist')


      }
    })
      .catch((error) => {
        console.error('Error viewing pharmacist information : ', error);
        console.log('This Requested pharmacist does not exist');
        alert('This Requested pharmacist does not exist')
      });
  };
  return (
    <div className="choose">
      <h2>Enter requested Pharmacist username</h2>

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
        View information
      </button>
      {requestedPharmacist && (
        <div style={{ display: requestedPharmacist ? 'block' : 'none' }}>
          <h3>Requested Pharmacist Information:</h3>
          <p>Pharmacist Name: {requestedPharmacist?.name}</p>
          <p>Username: {requestedPharmacist?.username}</p>
          <p>Email: {requestedPharmacist?.email}</p>
          <p>password: {requestedPharmacist?.password}</p>
          <p>Date of Birth: {requestedPharmacist?.dob}</p>
          <p>Hourly Rate: {requestedPharmacist?.hourly_rate}</p>
          <p>Affiliation: {requestedPharmacist?.affiliation}</p>
          <p>Educational Background: {requestedPharmacist?.educational_background}</p>
          <p>Status: {requestedPharmacist?.status}</p>
        </div>
      )}
    </div>
  );
}


export default ViewRequestedPharmacistInfo;
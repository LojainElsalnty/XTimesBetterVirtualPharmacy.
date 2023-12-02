import React, { useState, useEffect } from 'react';

// Axios
import axios from 'axios';

//  React Router DOM
import { useNavigate } from 'react-router-dom';

const PHealthRecords = () => {
  const [username, setUsername] = useState('');
  const [healthRecords, setHealthRecords] = useState([]);
  const baseURL = 'http://localhost:5000/uploads/';

  const accessToken = sessionStorage.getItem("accessToken");
  const navigate = useNavigate();
  const [doctorUsername, setDoctorUsername] = useState('');
  const [load, setLoad] = useState(true);

  useEffect(() => {
    if (doctorUsername.length != 0) {
      setLoad(false);
    }
  }, [doctorUsername]);

  async function checkAuthentication() {
    await axios ({
        method: 'get',
        url: `http://localhost:5000/authentication/checkAccessToken`,
        headers: {
            "Content-Type": "application/json",
            'Authorization': accessToken,
            'User-type': 'doctor',
        },
    })
    .then((response) => {
        console.log(response);
        setDoctorUsername(response.data.username);
    })
    .catch((error) => {
      navigate('/login');
    });
  }

  checkAuthentication();

  if (load) {
    return(<div>Loading</div>)
  }

  const handleUsernameChange = (e) => {
    setUsername(e.target.value, () => {
      console.log(username);
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log({ username });
    //const requestdata={username:username}
    try {
      const response = await fetch(`http://localhost:5000/doctor/viewPHealthRecords/${username}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': accessToken,
        },
      });
  
      if (response.ok) {
        const data = await response.json();
        console.log(data);
        console.log(data.healthRecords);
  
        setHealthRecords(data.healthRecords);
      } else {
        const errorMessage = await response.json(); // Extract error message from the response
        console.error('Error fetching health records:', errorMessage);
        alert(`Error: ${errorMessage.message}`);
        setHealthRecords([]);
      }
    } catch (error) {
      console.error('Error fetching health records:', error);
      alert(`Error: ${error.message}`);
      setHealthRecords([]);
    }
  };

  return (
    <div>
      <h2>Health Records</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Username:
          <input 
  type="text" 
  value={username} 
  onChange={handleUsernameChange} 
  required
/>
        </label>
        <button type="submit">Fetch Health Records</button>
      </form>

      {healthRecords.length > 0 ? (
        <ul>
          {healthRecords.map((record, index) => (
            <li key={index}>
              {/* Display each health record */}
              <a href={baseURL + record} target="_blank" rel="noopener noreferrer">
                Health Record {index + 1}
              </a>
            </li>
          ))}
        </ul>
      ) : (
        <p>No health records found</p>
      )}
    </div>
  );
};

export default PHealthRecords;
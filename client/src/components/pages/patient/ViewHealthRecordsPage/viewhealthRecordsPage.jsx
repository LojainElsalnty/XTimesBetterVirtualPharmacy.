import React, { useEffect, useState } from 'react';

// Axios
import axios from 'axios';

//  React Router DOM
import { useNavigate } from 'react-router-dom';

const HealthRecords = () => {
  const [healthRecords, setHealthRecords] = useState([]);
  const baseURL='http://localhost:5000/uploads/';
  let healthRecordURL = null;

  const accessToken = sessionStorage.getItem("accessToken");
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [load, setLoad] = useState(true);

  useEffect(() => {
    if (username.length != 0) {
      setLoad(false);
    }
  }, [username]);

  async function checkAuthentication() {
    await axios ({
        method: 'get',
        url: `http://localhost:5000/authentication/checkAccessToken`,
        headers: {
            "Content-Type": "application/json",
            'Authorization': accessToken,
            'User-type': 'patient',
        },
    })
    .then((response) => {
        console.log(response);
        setUsername(response.data.username);
    })
    .catch((error) => {
      navigate('/login');
    });
  }

  checkAuthentication();

  useEffect(() => {
    // Make an API request to fetch health records
    fetch('http://localhost:5000/patient/viewHealthRecords', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': accessToken,
        // You might need to include authentication headers if needed
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setHealthRecords(data.healthRecords);
        console.log(healthRecords);
      })
      .catch((error) => {
        console.error('Error fetching health records:', error);
      });
  }, []); // Empty dependency array means this effect runs once when the component mounts

    if (load) {
      return(<div>Loading</div>)
    }

  return (
    <div>
      <h2>Health Records</h2>
{ healthRecords && healthRecords.length > 0  ? (
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

export default HealthRecords;
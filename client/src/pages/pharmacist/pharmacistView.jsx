import React, { useState, useEffect } from 'react';
import axios from 'axios';
import searchIcon from '../../assets/img/searchicon.png';

import styles from './pharmacistView.module.css';
import { Modal } from '../../components/modalCard/modalCard';


const PharmacistView = () => {
  const [pharmacists, setPharmacists] = useState([]);
  const [username, setUsername] = useState('');
  const [pharmacist, setPharmacist] = useState(null);

  const fetchData = async () => {
    try {
      const response = await axios.get('http://localhost:8000/pharmaRoutes/viewAllPharma');
      setPharmacists(response.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const fetchPharmacistInfo = async () => {
    try {
      if (username == "") {
        return setPharmacist(null);
      }
      const response = await axios.get(`http://localhost:8000/pharmaRoutes/viewPharmaInfo/${username}`);

      if (!response.data) {
        return alert('Pharmacist not found');
      }

      setPharmacist(response.data);
    } catch (error) {
      console.error('Error fetching pharmacist information:', error);
    }
  };

  const removePharmacistHandler = async (pharmacist) => {
    try {
      const username = pharmacist.username;
      const response = await fetch(`http://localhost:8000/admin/addremove/removePharmacist`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();

      if (data) {
        console.log('Pharmacist removed', data);
        alert('Pharmacist removed');
        fetchData();//to refresh table

      } else {
        console.error('Can not remove pharmacist', data);
        alert('Can not remove pharmacist');
      }
    } catch (error) {
      console.error('Error removing pharmacist', error);
      alert('An error occurred while removing the pharmacist');
    }
  };

  const addSalaryToAll = async () => {
    try {
      const response = await axios.post('http://localhost:8000/admin/addremove/gettt');
      console.log(response.data); // You can log or handle the response as needed
      fetchData();
      alert('Salary added to all pharmacists'); // Refresh the pharmacists list after successful salary addition
    } catch (error) {
      console.error('Error adding salary to all pharmacists:', error);
    }
  };

  // Get the current date
  const currentDate = new Date();

  // Check if today is the start of the month
  const isStartOfMonth = currentDate.getDate() === 1;

  const handleAddSalaryClick = () => {
    if (!isStartOfMonth) {
      alert('Cannot add salary until the start of the month.');
    } else {
      addSalaryToAll();
    }
  };

  return (
    <div>
      <br />
      <h1>Pharmacists List</h1>

      <div style={{ display: 'flex', alignItems: 'center', marginBottom: '10px', marginTop: '50px', marginLeft: '150px' }}>
        <button
          onClick={handleAddSalaryClick}
          style={{
            backgroundColor: isStartOfMonth ? 'green' : 'grey',
            color: 'white',
            padding: '8px 12px',
            cursor: isStartOfMonth ? 'pointer' : 'not-allowed',
            marginRight: '750px'

          }}
        >
          Add Salary to All
        </button>
        <label style={{ display: 'flex', alignItems: 'center', marginRight: '20px' }}>
          Enter Pharmacist Username:
          <input
            type="text"
            value={username}
            onChange={handleUsernameChange}
          />
          <button className={styles['find-button']} onClick={fetchPharmacistInfo}>
            <br />
            <img src={searchIcon} alt="Search" style={{ width: '25px', height: '25px' }} />
            <br />
          </button>
        </label>

      </div>

      {pharmacist && (
        <div>
          <h3>Pharmacist Information for {pharmacist.username}</h3>
          <table className={styles.pharmacistTable}>
            <thead>
              <tr>
                <th>Username</th>
                <th>Name</th>
                <th>Email</th>
                <th>Date of Birth</th>
                <th>Hourly Rate</th>
                <th>Affiliation</th>
                <th>Educational Background</th>
                <th>National ID</th>
                <th>Working License</th>
                <th>Pharmacy Degree</th>
              </tr>
            </thead>
            <tbody>
              <tr key={pharmacist._id}>
                <td>{pharmacist.username}</td>
                <td>{pharmacist.name}</td>
                <td>{pharmacist.email}</td>
                <td>{pharmacist.dob}</td>
                <td>{pharmacist.hourly_rate}</td>
                <td>{pharmacist.affiliation}</td>
                <td>{pharmacist.educational_background}</td>
                <td>
                  <a href={`http://localhost:8000/uploads/${pharmacist.nationalID.name}`} target="_blank" rel="noopener noreferrer">
                    View National ID
                  </a>
                </td>
                <td>
                  <a href={`http://localhost:8000/uploads/${pharmacist.workingLicense.name}`} target="_blank" rel="noopener noreferrer">
                    View Working License
                  </a>
                </td>
                <td>
                  <a href={`http://localhost:8000/uploads/${pharmacist.pharmacyDegree.name}`} target="_blank" rel="noopener noreferrer">
                    View Pharmacy Degree
                  </a>
                </td>
                <td>
                  <button onClick={() => removePharmacistHandler(pharmacist)} style={{ backgroundColor: '#cc0000', color: 'white' }}>
                    Remove
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      )}

      <h3>All Pharmacists</h3>

      <br />
      <br />

      <table className={styles.pharmacistTable}>
        <thead>
          <tr>
            <th>Username</th>
            <th>Name</th>
            <th>Email</th>
            <th>Date of Birth</th>
            <th>Hourly Rate</th>
            <th>Affiliation</th>
            <th>Educational Background</th>
            <th>National ID</th>
            <th>Working License</th>
            <th>Pharmacy Degree</th>
          </tr>
        </thead>
        <tbody>
          {pharmacists.map((pharmacist) => (
            <tr key={pharmacist._id}>
              <td>{pharmacist.username}</td>
              <td>{pharmacist.name}</td>
              <td>{pharmacist.email}</td>
              <td>{pharmacist.dob}</td>
              <td>{pharmacist.hourly_rate}</td>
              <td>{pharmacist.affiliation}</td>
              <td>{pharmacist.educational_background}</td>
              <td>
                <a href={`http://localhost:8000/uploads/${pharmacist.nationalID.name}`} target="_blank" rel="noopener noreferrer">
                  View National ID
                </a>
              </td>
              <td>
                <a href={`http://localhost:8000/uploads/${pharmacist.workingLicense.name}`} target="_blank" rel="noopener noreferrer">
                  View Working License
                </a>
              </td>
              <td>
                <a href={`http://localhost:8000/uploads/${pharmacist.pharmacyDegree.name}`} target="_blank" rel="noopener noreferrer">
                  View Pharmacy Degree
                </a>
              </td>
              <td>
                <button onClick={() => removePharmacistHandler(pharmacist)} style={{ backgroundColor: '#cc0000', color: 'white' }}>
                  Remove
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PharmacistView;
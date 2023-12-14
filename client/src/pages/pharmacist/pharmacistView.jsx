import React, { useState, useEffect } from 'react';
import axios from 'axios';
import searchIcon from '../../assets/img/searchicon.png'

import styles from './pharmacistView.module.css'


const PharmacistView = () => {
  const [pharmacists, setPharmacists] = useState([]);
  const [username, setUsername] = useState('');
  const [pharmacist, setPharmacist] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:8000/pharmaRoutes/viewAllPharma'); // Adjust the API endpoint as needed
        setPharmacists(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const fetchPharmacistInfo = async () => {
    try {
      const response = await axios.get(`http://localhost:8000/pharmaRoutes/viewPharmaInfo/${username}`);

      if (!response.data) {
        return alert('Pharmacist not found');
      }

      setPharmacist(response.data);
    } catch (error) {
      console.error('Error fetching pharmacist information:', error);
    }
  };

  return (
    <div>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
    <label style={{ display: 'flex', alignItems: 'center' }}>
      Enter Pharmacist Username:
      <input
        type="text"
        value={username}
        onChange={handleUsernameChange}
      />
      <button className={styles["find-button"]} onClick={fetchPharmacistInfo}>
        <img src={searchIcon} alt="Search" style={{ width: '25px', height: '25px' }} />
      </button>
    </label>
      </div>


      {pharmacist && (
        <div>
          <h3>Pharmacist Information for {pharmacist.username}</h3>
          <table>
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
                <td>{pharmacist.nationalID.name}</td>
              </tr>
            </tbody>
          </table>
        </div>
      )}

      <h3>All Pharmacists</h3>
      <table>
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
              <td><a href={`http://localhost:8000/uploads/${pharmacist.nationalID.name}`} target="_blank" rel="noopener noreferrer">View National ID </a></td>
              <td><a href={`http://localhost:8000/uploads/${pharmacist.workingLicense.name}`} target="_blank" rel="noopener noreferrer">View Working License </a></td>
              <td><a href={`http://localhost:8000/uploads/${pharmacist.pharmacyDegree.name}`} target="_blank" rel="noopener noreferrer">View Pharmacy Degree </a></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PharmacistView;

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
      const response = await axios.post('http://localhost:8000/pharmaRoutes/removePharmacist', { username: pharmacist.username });
      console.log(response.data); // You can log or handle the response as needed
      fetchData(); // Refresh the pharmacists list after successful removal
    } catch (error) {
      console.error('Error removing pharmacist:', error);
    }
  };

  return (
    <div>
      <h1>Pharmacists List</h1>

      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '20px' }}>
            <div className={styles['searchbar-main-div']}>
              <div className={styles['searchbar-sub-div']}>
                  <div className={styles['searchbar-input-div']}>
                      <input className={styles['searchbar-input']} value={username} placeholder="Enter pharmacist username" type="text"  onChange={handleUsernameChange}/>
                  </div>
                  <div className={styles['searchbar-icon-div']}>
                    <button 
                          style={{margin: '10px'}}
                          data-tooltip-id="my__search__icon"
                          data-tooltip-content="Search"
                          data-tooltip-place="top"
                          onClick={fetchPharmacistInfo}
                      >
                      <Modal title='Pharmacist' icon='search' className={styles['searchbar-button']}>                   
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
                                  <td>
                                    <button onClick={() => removePharmacistHandler(pharmacist)} style={{ backgroundColor: 'red', color: 'white' }}>
                                      Remove
                                    </button>
                                  </td>
                                </tr>
                              </tbody>
                            </table>
                          </div>
                        )}
                      </Modal>
                      </button>
                </div>
              </div>
            </div>
      </div>
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
                <button onClick={() => removePharmacistHandler(pharmacist)} style={{ backgroundColor: 'red', color: 'white' }}>
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
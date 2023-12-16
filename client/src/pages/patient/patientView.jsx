import React, { useState, useEffect } from 'react';
import axios from 'axios';
import searchIcon from '../../assets/img/searchicon.png';
import styles from '../pharmacist/pharmacistView.module.css';
import { Modal } from '../../components/modalCard/modalCard';
import { TitleCard } from '../../components/titleCard/titleCard';


function PatientView() {
  const [username, setUsername] = useState('');
  const [patient, setPatient] = useState(null);
  const [patients, setPatients] = useState([]);

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const fetchPatientInfo = async () => {
    try {
      const response = await axios.get(`http://localhost:8000/patientRoutes/viewPatientInfo/${username}`);

      if (!response.data) {
        console.error('No patient found for the entered username.');
        setPatient(null);
      } else {
        setPatient(response.data);
      }
    } catch (error) {
      console.error('Error fetching patient information:', error);
    }
  };

  const fetchData = async () => {
    try {
      const response = await axios.get('http://localhost:8000/patientRoutes/viewAllPatientsInfo');
      setPatients(response.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const removePatientHandler = async (patient) => {
    try {
      const response = await axios.post('http://localhost:8000/patientRoutes/removePatient', { username: patient.username });
      console.log(response.data);
      // Refresh the patients list after successful removal
      fetchData();
    } catch (error) {
      console.error('Error removing patient:', error);
    }
  };

  return (
    <div style={{padding: '12px'}}>
      <TitleCard title='Patients List' />

      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '20px' }}>
            <div className={styles['searchbar-main-div']}>
              <div className={styles['searchbar-sub-div']}>
                  <div className={styles['searchbar-input-div']}>
                      <input className={styles['searchbar-input']} value={username} placeholder="Enter patient username" type="text"  onChange={handleUsernameChange}/>
                  </div>
                  <div className={styles['searchbar-icon-div']}>
                    <button 
                          style={{margin: '10px'}}
                          data-tooltip-id="my__search__icon"
                          data-tooltip-content="Search"
                          data-tooltip-place="top"
                          onClick={fetchPatientInfo}
                      >
                      <Modal title='Patient' icon='search' className={styles['searchbar-button']}>                   
                      {patient && (
                        <div>
                          <h3>Patient Details for {username}</h3>
                          <table className={styles.pharmacistTable}>
                            <thead>
                              <tr>
                                <th>Username</th>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Date of Birth</th>
                                <th>Gender</th>
                                <th>Mobile</th>
                              </tr>
                            </thead>
                            <tbody>
                              <tr key={patient._id}>
                                <td>{patient.username}</td>
                                <td>{patient.name}</td>
                                <td>{patient.email}</td>
                                <td>{patient.dob}</td>
                                <td>{patient.gender}</td>
                                <td>{patient.mobile}</td>
                                <td>
                                  <button
                                    onClick={() => removePatientHandler(patient)}
                                    style={{ backgroundColor: 'red', color: 'white' }}
                                  >
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
            <th>Gender</th>
            <th>Mobile</th>
          </tr>
        </thead>
        <tbody>
          {patients.map((patient) => (
            <tr key={patient._id}>
              <td>{patient.username}</td>
              <td>{patient.name}</td>
              <td>{patient.email}</td>
              <td>{patient.dob}</td>
              <td>{patient.gender}</td>
              <td>{patient.mobile}</td>
              <td>
                <button
                  onClick={() => removePatientHandler(patient)}
                  style={{ backgroundColor: 'red', color: 'white' }}
                >
                  Remove
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default PatientView;
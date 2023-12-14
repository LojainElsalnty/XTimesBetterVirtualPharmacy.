import React, { useState, useEffect } from 'react';
import axios from 'axios';
import searchIcon from '../../assets/img/searchicon.png';
import styles from '../pharmacist/pharmacistView.module.css';

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
    <div>
      <h1>Patients List</h1>

      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', marginBottom: '20px' }}>


        <label style={{ display: 'flex', alignItems: 'center', marginRight: '20px' }}>
          Enter Patient Username:
          <input
            type="text"
            value={username}
            onChange={handleUsernameChange}
          />
          <button className={styles["find-button"]} onClick={fetchPatientInfo}>
            <img src={searchIcon} alt="Search" style={{ width: '25px', height: '25px' }} />
          </button>
        </label>
      </div>

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

      <h3>All Patients</h3>
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
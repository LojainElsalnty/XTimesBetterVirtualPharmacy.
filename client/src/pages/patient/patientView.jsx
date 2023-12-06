import React, { useState, useEffect } from 'react';
import axios from 'axios';

function PatientView() {
  const [username, setUsername] = useState('');
  const [patient, setPatient] = useState(null);
  const [patients, setPatients] = useState([]);

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const fetchPatientInfo = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/patientRoutes/viewPatientInfo/${username}`);

      if (!response.data) {
        // Handle the case where no patient is found for the entered username
        console.error('No patient found for the entered username.');
        setPatient(null);
      } else {
        setPatient(response.data);
      }
    } catch (error) {
      console.error('Error fetching patient information:', error);
      // You can set an error state or display an error message to the user here.
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:5000/patientRoutes/viewAllPatientsInfo');
        setPatients(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <h2>Patients Information</h2>
      <label>
        Enter Patient Username:
        <input
          type="text"
          value={username}
          onChange={handleUsernameChange}
        />
      </label>
      <button onClick={fetchPatientInfo}>Find</button>

      {patient && (
        <div>
          <h3>Patient Details for {username}</h3>
          <table>
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
              </tr>
            </tbody>
          </table>
        </div>
      )}

      <h3>All Patients</h3>
      <table>
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
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default PatientView;

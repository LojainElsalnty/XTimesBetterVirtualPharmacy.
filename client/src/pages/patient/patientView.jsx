import React, { useState } from 'react';

function PatientView() {
  const [username, setUsername] = useState('');
  const [patient, setPatient] = useState(null);

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const fetchPatientInfo = async () => {
    try {
      const response = await fetch(`http://localhost:5000/patientRoutes/viewPatientInfo/${username}`);

      if (!response.ok) {
        //throw new Error(`HTTP error! Status: ${response.status}`);
        return alert('Patient not found')
      }
      const data = await response.json();
      setPatient(data);
    } catch (error) {
      console.error('Error fetching patient information:', error);
      // You can set an error state or display an error message to the user here.
    }
  };

  return (
    <div>
      <h2>Patient Information</h2>
      <label>
        Enter Patient Username:
        <input
          type="text"
          value={username}
          onChange={handleUsernameChange}
        />
      </label>
      <button onClick={fetchPatientInfo}>Fetch Information</button>
      {patient && (
        <div>
          <h3>Patient Information for {patient.username}</h3>
          <p>Name: {patient.name}</p>
          <p>Email: {patient.email}</p>
          <p>Date of Birth: {patient.dob}</p>
          <p>Gender: {patient.gender}</p>
          <p>Mobile: {patient.mobile}</p>
          <p>Emergency Contact: {patient.emergency_contact.join(', ')}</p>
        </div>

      )}
    </div>
  );
}

export default PatientView;

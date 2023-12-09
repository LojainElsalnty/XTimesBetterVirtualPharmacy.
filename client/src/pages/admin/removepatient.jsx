import React, { useState, useEffect } from 'react';

function RemovePatient() {
  const [patients, setPatients] = useState([]);
  const [patientInfo, setPatientInfo] = useState({
    username: ''
  });

  useEffect(() => {
    fetchPatients();
  }, []);

  const fetchPatients = async () => {
    try {
      const response = await fetch('http://localhost:5000/admin/addremove/get/');
      const data = await response.json();
      setPatients(data);
    } catch (error) {
      console.error('Error fetching patients:', error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPatientInfo({ ...patientInfo, [name]: value });
  };

  const handleRemovePatient = async (username) => {
    try {
      const response = await fetch(`http://localhost:5000/admin/addremove/removePatient`, {
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
        console.log('Patient removed', data);
        alert('Patient removed');
        fetchPatients(); // Refresh the patient list after removal
      } else {
        console.error('Can not remove patient', data);
        alert('Can not remove patient');
      }
    } catch (error) {
      console.error('Error removing patient', error);
      alert('An error occurred while removing the patient');
    }
  };

  return (
    <div>
      <h2>Patients List</h2>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Username</th>
            <th>Email</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {patients.map((patient) => (
            <tr key={patient.username}>
              <td>{patient.name}</td>
              <td>{patient.username}</td>
              <td>{patient.email}</td>
              <td>
                <button onClick={() => handleRemovePatient(patient.username)}>Remove</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

</div>
  );
}

export default RemovePatient;
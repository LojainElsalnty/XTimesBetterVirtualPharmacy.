import React, { useEffect, useState } from 'react';
// import styles from './doctorRequestPage.module.css';

// Axios
import axios from 'axios';

//  React Router DOM
import { useNavigate } from 'react-router-dom';

const UploadRecords = () => {
  const [formData, setFormData] = useState({
    username: '',
  });

  // const [emailError, setEmailError] = useState('');
  const [healthRecords, setHealthRecords] = useState(null);
  // const [medicalLicense, setMedicalLicense] = useState(null);
  // const [medicalDegree, setMedicalDegree] = useState(null);

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
            'User-type': 'doctor',
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

  if (load) {
    return(<div>Loading</div>)
  }

  const handleFileInputChange = (e) => {
    const { name, files } = e.target;
    // Assuming you allow only one file per input
    if (name === 'healthRecords') {
      setHealthRecords(files[0]);
    }
  };

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    // if (!validateEmail(formData.email)) {
    //   setEmailError('Email must be in Gmail format (e.g., example@gmail.com)');
    // } else {
    //   setEmailError(''); // Clear the error message if the email is valid
    // Rest of the code...
    const formDataToSend = new FormData();

    // Append form data
    for (const key in formData) {
      formDataToSend.append(key, formData[key]);
    }

    // Append uploaded files
    formDataToSend.append('healthRecords', healthRecords);
    // formDataToSend.append('medicalLicense', medicalLicense);
    // formDataToSend.append('medicalDegree', medicalDegree);
     console.log(...formDataToSend)
    try {
      const response = await fetch(`http://localhost:5000/doctor/uploadHealthRecords/${formData.username}`, {
        method: 'POST',
        headers: {
           'Authorization': accessToken,
        },
        // body: JSON.stringify(formData),
        body: formDataToSend, // Use the FormData object
      });

      if (response.ok) {
        // Registration was successful, handle success scenario
        console.log('Upload successful!');
        alert('Upload successful!');
        e.target.reset(); // This will clear all form input fields
        setFormData({
          username: '',
        });
      } else {
        const errorMessage = await response.json(); // Extract error message from the response
        // Registration failed, handle error scenario
        console.error('Upload failed');
        alert(`Error: ${errorMessage.message}`);
      }
    } catch (error) {
      console.error('An error occurred:', error);
      alert('An error occurred:', error);
    }
  };

  return (
    <div className="uploadHealthRecords">
      <h2>Upload Health Records</h2>
      <form onSubmit={handleSubmit}>
        {/* Add form fields for each data attribute */}
        <div>
          <label>Username:</label>
          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <input
            type="hidden"
            name="username"
            value={formData.username}
          />
        </div>
        <div>
          <label>Health Records:</label>
          <input
            type="file"
            name="healthRecords"
            accept=".pdf, .jpg, .jpeg, .png"
            onChange={handleFileInputChange}
            required
          />
        </div>

        {/* Submit button */}
        <button type="submit">Upload</button>
      </form>
    </div>
  );
};

export default UploadRecords;
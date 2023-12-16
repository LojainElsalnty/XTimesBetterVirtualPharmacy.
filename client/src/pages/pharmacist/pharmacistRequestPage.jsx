import React, { useEffect, useState } from 'react';
import styles from './pharmacistRequestPage.module.css';

import { ResponsiveAppBar } from '../../components/responsiveNavBar/responsiveNavBar';

//import axios from 'axios';
const PharmacistRequest = () => {

  const [formData, setFormData] = useState({
    username: '',
    name: '',
    email: '',
    password: '',
    dob: '',
    hourly_rate: '',
    affiliation: '',
    educational_background: '',

  });
  const [emailError, setEmailError] = useState('');
  const [passError, setPassError] = useState('');
  const [nationalID, setNationalID] = useState(null);
  const [workingLicense, setWorkingLicense] = useState(null);
  const [pharmacyDegree, setPharmacyDegree] = useState(null);

  const handleFileInputChange = (e) => {
    const { name, files } = e.target;
    console.log("files[0]", files[0])
    // Assuming you allow only one file per input
    if (name === 'nationalID') {
      setNationalID(files[0]);
    } else if (name === 'workingLicense') {
      setWorkingLicense(files[0]);
    } else if (name === 'pharmacyDegree') {
      setPharmacyDegree(files[0]);
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

  const validateEmail = (email) => {
    const pattern = /^[a-zA-Z0-9._%+-]+@gmail.com$/;
    return pattern.test(email);
  };

  const validatePass = (pass) => {
    const pattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;
    return pattern.test(pass);
  }
  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateEmail(formData.email)) {
      setEmailError('Email must be in Gmail format (e.g., example@gmail.com)');
    } else {
      setEmailError(''); // Clear the error message if the email is valid
    }

    if (!validatePass(formData.password)) {
      setPassError("Please enter atleast 8 characters with number, small and capital letter.");
    } else {
      setPassError(''); // Clear the error message if the pass is valid
    }
    if (validateEmail(formData.email) && validatePass(formData.password)) {
      setEmailError(''); // Clear the error message if the email is valid
      setPassError(''); // Clear the error message if the pass is valid
      const formDataToSend = new FormData();
      console.log('workingLicense:', workingLicense);
      console.log('pharmacyDegree:', pharmacyDegree);

      // Append form data
      for (const key in formData) {
        formDataToSend.append(key, formData[key]);
      }

      // Append uploaded files
      formDataToSend.append('nationalID', nationalID);
      formDataToSend.append('workingLicense', workingLicense);
      formDataToSend.append('pharmacyDegree', pharmacyDegree);

      console.log(...formDataToSend)
      try {
        const response = await fetch('http://localhost:8000/pharmacist/register/', {
          method: 'POST',
          //headers: {
          //  'Content-Type': 'application/json',
          //},
          //body: JSON.stringify(formData),
          body: formDataToSend, // Use the FormData object

        });
        const responseData = await response.json();

        //console.log(response)
        if (responseData.success) {
          // Registration was successful, handle success scenario
          console.log('Registration successful!');
          alert('Registration successful!');
          e.target.reset(); // This will clear all form input fields
          setFormData({
            username: '',
            name: '',
            email: '',
            password: '',
            dob: '',
            hourly_rate: '',
            affiliation: '',
            educational_background: '',
            nationalID: '',
            workingLicense: '',
            pharmacyDegree: '',
            status: '',

            //speciality: '',
          });
        } else {
          // Registration failed, handle error scenario
          console.error('Registration failed');
          alert(responseData.message);
        }
      } catch (error) {
        console.error('An error occurred:', error);
        alert('An error occurred:', error);
      }
    }
  };

  return (
    <>
      <ResponsiveAppBar array={[]}></ResponsiveAppBar>
      <div className={styles.pharmacyRegistrationBack}>
        <div className={styles.pharmacyRegistration}>
          <h2>Pharmacist Registration Request</h2>
          <form onSubmit={handleSubmit} className={styles.registrationForm}>
            <div className={styles.formField}>
              <label htmlFor="username">Username:</label>
              <input
                type="text"
                id="username"
                name="username"
                value={formData.username}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className={styles.formField}>
              <label htmlFor="name">Name:</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className={styles.formField}>
              <label htmlFor="email">Email:</label>
              <input
                type="text"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                required
              />
              {emailError && (
                <div className={styles.errorMessage}>{emailError}</div>
              )}
            </div>
            <div className={styles.formField}>
              <label htmlFor="password">Password:</label>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                required
              />
              {passError && (
                <div className={styles.errorMessage}>{passError}</div>
              )}
            </div>
            <div className={styles.formField}>
              <label htmlFor="dob">Date Of Birth:</label>
              <input
                type="date"
                id="dob"
                name="dob"
                value={formData.dob}
                max={new Date().toISOString().split('T')[0]}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className={styles.formField}>
              <label htmlFor="hourly_rate">Hourly Rate:</label>
              <input
                type="Number"
                id="hourly_rate"
                name="hourly_rate"
                value={formData.hourly_rate}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className={styles.formField}>
              <label htmlFor="affiliation">Affiliation:</label>
              <input
                type="text"
                id="affiliation"
                name="affiliation"
                value={formData.affiliation}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className={styles.formField}>
              <label htmlFor="educational_background">Educational Background:</label>
              <input
                type="text"
                id="educational_background"
                name="educational_background"
                value={formData.educational_background}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className={styles.formField}>
              <label htmlFor="nationalID">National ID:</label>
              <input
                type="file"
                id="nationalID"
                name="nationalID"
                accept=".pdf, .jpg, .jpeg, .png"
                onChange={handleFileInputChange}
                required
              />
            </div>
            <div className={styles.formField}>
              <label htmlFor="workingLicense">Working License:</label>
              <input
                type="file"
                id="workingLicense"
                name="workingLicense"
                accept=".pdf, .jpg, .jpeg, .png"
                onChange={handleFileInputChange}
                required
              />
            </div>
            <div className={styles.formField}>
              <label htmlFor="pharmacyDegree">Pharmacy Degree:</label>
              <input
                type="file"
                id="pharmacyDegree"
                name="pharmacyDegree"
                accept=".pdf, .jpg, .jpeg, .png"
                onChange={handleFileInputChange}
                required
              />
            </div>
            <button type="submit" className={styles.submitButton}>Register</button>
          </form>
        </div>
      </div>
    </>
  );

}

export default PharmacistRequest;
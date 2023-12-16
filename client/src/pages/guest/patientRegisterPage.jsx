import React, { useEffect, useState } from 'react';
import styles from './patientRegisterPage.module.css';
import { ResponsiveAppBar } from '../../components/responsiveNavBar/responsiveNavBar';

//import axios from 'axios';
const PatientRegister = () => {

  const [formData, setFormData] = useState({
    username: '',
    name: '',
    email: '',
    password: '',
    dob: '',
    gender: 'male', // Default value
    mobile: '',
    emergency_contact: {
      name: '',
      mobile: '',
      relation: '',
    },
  });

  // Handle input changes
  // const handleEmergencyContactChange = (e) => {
  //     const { name, value } = e.target;
  //     setFormData({
  //       ...formData,
  //       emergency_contact: {
  //         ...formData.emergency_contact,
  //         [name]: value,
  //       },
  //     });
  //   };

  // const handleInputChange = (e) => {
  //   const { name, value } = e.target;
  //   setFormData({
  //     ...formData,
  //     [name]: value,
  //   });
  // };

  const [emailError, setEmailError] = useState('');
  const [passError, setPassError] = useState('');


  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name.startsWith('emergency_contact.')) {
      // Handle changes in the emergency_contact object
      const field = name.split('.')[1];
      setFormData({
        ...formData,
        emergency_contact: {
          ...formData.emergency_contact,
          [field]: value,
        },
      });
    } else {
      // Handle changes in other form fields
      setFormData({
        ...formData,
        [name]: value,
      });
    }
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

      try {
        // Send the formData object to your backend API for registration
        const response = await fetch('http://localhost:8000/patient/register/', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData),
        });
        //console.log(response)
        const responseData = await response.json();
        //console.log(responseData)

        if (responseData.success) {
          // Registration was successful, handle success scenario
          //console.log('Registration successful!');
          alert('Registration successful!');
          e.target.reset(); // This will clear all form input fields
          setFormData({
            username: '',
            name: '',
            email: '',
            password: '',
            dob: '',
            gender: 'male',
            mobile: '',
            emergency_contact: {
              name: '',
              mobile: '',
              relation: '',
            },
          });
        } else {
          // Registration failed, handle error scenario
          //console.error('Registration failed');
          //console.error(responseData.message);

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
          <h2>Patient Registration</h2>
          <form onSubmit={handleSubmit} className={styles.registrationForm}>

            {/* Username */}
            <div className={styles.formField}>
              <label htmlFor="username">Username:</label>
              <input
                type="text"
                id="username"
                name="username"
                value={formData.username}
                onChange={handleInputChange}
                required />
            </div>

            {/* Name */}
            <div className={styles.formField}>
              <label htmlFor="name">Name:</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                required />
            </div>

            {/* Email */}
            <div className={styles.formField}>
              <label htmlFor="email">Email:</label>
              <input
                type="text"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                required />
              {emailError && (
                <div className={styles.errorMessage}>{emailError}</div>
              )}
            </div>

            {/* Password */}
            <div className={styles.formField}>
              <label htmlFor="password">Password:</label>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                required />
              {passError && (
                <div className={styles.errorMessage}>{passError}</div>
              )}
            </div>

            {/* Date of Birth */}
            <div className={styles.formField}>
              <label htmlFor="dob">Date Of Birth:</label>
              <input
                type="date"
                id="dob"
                name="dob"
                value={formData.dob}
                max={new Date().toISOString().split('T')[0]}
                onChange={handleInputChange}
                required />
            </div>

            {/* Gender */}
            <div className={styles.formField}>
              <label htmlFor="gender">Gender:</label>
              <div className={styles.customSelect}>
                <select
                  id="gender"
                  name="gender"
                  value={formData.gender}
                  onChange={handleInputChange}
                  required
                >
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                </select>
                <div className={styles.selectArrow}></div>
              </div>
            </div>

            {/* Mobile */}
            <div className={styles.formField}>
              <label htmlFor="mobile">Mobile:</label>
              <input
                type="Number"
                id="mobile"
                name="mobile"
                value={formData.mobile}
                onChange={handleInputChange}
                required />
            </div>

            {/* Emergency Contact Info */}
            <div>
              <h3>Emergency Contact Info</h3>
              <div className={styles.emergencyContactRow}>
                <div className={styles.formField}>
                  <label htmlFor="emergencyContactName">Full Name:</label>
                  <input
                    type="text"
                    id="emergencyContactName"
                    name="emergency_contact.name"
                    value={formData.emergency_contact.name}
                    onChange={handleInputChange}
                    required />
                </div>
                <div className={styles.formField}>
                  <label htmlFor="emergencyContactMobile">Mobile Number:</label>
                  <input
                    type="Number"
                    id="emergencyContactMobile"
                    name="emergency_contact.mobile"
                    value={formData.emergency_contact.mobile}
                    onChange={handleInputChange}
                    required />
                </div>
                <div className={styles.formField}>
                  <label htmlFor="emergencyContactRelation">Relation:</label>
                  <input
                    type="text"
                    id="emergencyContactRelation"
                    name="emergency_contact.relation"
                    value={formData.emergency_contact.relation}
                    onChange={handleInputChange}
                    required />
                </div>
              </div>
            </div>

            {/* Submit button */}
            <button type="submit" className={styles.submitButton}>Register</button>
          </form>
        </div>
      </div>
    </>

  );


}

export default PatientRegister;
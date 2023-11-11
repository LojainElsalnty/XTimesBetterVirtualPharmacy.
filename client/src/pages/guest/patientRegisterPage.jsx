import React, { useEffect, useState } from 'react';
import styles from './patientRegisterPage.module.css';

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
        emergency_contact:{
          name: '',
          mobile: '',
          relation:'',
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
    // Handle form submission
    const handleSubmit = async (e) => {
         e.preventDefault();
         if (!validateEmail(formData.email)) {
          setEmailError('Email must be in Gmail format (e.g., example@gmail.com)');
        } 
        else {
        setEmailError(''); // Clear the error message if the email is valid
    
        try {
             // Send the formData object to your backend API for registration
            const response = await fetch('http://localhost:5000/patient/register/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                 },
             body: JSON.stringify(formData),
            });
            
        if (response.ok) {
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
                gender: 'male',
                mobile: '',
                emergency_contact: {
                  name: '',
                  mobile: '',
                  relation:'',
                },
              });
        } else {
            // Registration failed, handle error scenario
            console.error('Registration failed');
            alert('Registration failed ');
        }
        } catch (error) {
            console.error('An error occurred:', error);
            alert('An error occurred:', error);
        }
      }
    };

    return ( 
      <div className={styles.doctorRequest}>
            <h2>Patient Registration</h2>
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
          <label>Name:</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <label>Email:</label>
          <input
            type="text"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            required
          />
          {emailError && (
          <div className="error-message" style={{ color: 'red', fontSize: '1.2rem' }}>
            {emailError}
          </div>
          )}        
        </div>
        <div>
          <label>Password:</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <label>Date Of Birth:</label>
          <input
            type="date"
            name="dob"
            value={formData.dob}
            max={new Date().toISOString().split('T')[0]}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <label>Gender:</label>
          <label>
    <input
      type="radio"
      name="gender"
      value="male"
      checked={formData.gender === 'male'}
      onChange={handleInputChange}
      required
    />
    Male
  </label>
  <label>
    <input
      type="radio"
      name="gender"
      value="female"
      checked={formData.gender === 'female'}
      onChange={handleInputChange}
      required
    />
    Female
  </label>
        </div>
        <div>
          <label>Mobile:</label>
          <input
            type="Number"
            name="mobile"
            value={formData.mobile}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <label>Emergency Contact Full Name:</label>
          <input
            type="text"
            name="emergency_contact.name"
            value={formData.emergency_contact.name}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <label>Emergency Contact Mobile Number:</label>
          <input
            type="Number"
            name="emergency_contact.mobile"
            value={formData.emergency_contact.mobile}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <label>Emergency Contact Relation:</label>
          <input
            type="text"
            name="emergency_contact.relation"
            value={formData.emergency_contact.relation}
            onChange={handleInputChange}
            required
          />
        </div>
        
        {/* Submit button */}
        <button type="submit">Register</button>
      </form>
        </div>
     );
}
 
export default PatientRegister;
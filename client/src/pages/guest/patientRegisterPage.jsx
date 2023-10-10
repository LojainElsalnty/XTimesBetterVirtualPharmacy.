import React, { useEffect, useState } from 'react';
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
        emergency_contact: [{}], // Initialize with an empty contact object
      });

    // Handle input changes
    const handleEmergencyContactChange = (e) => {
        const { name, value } = e.target;
        setFormData({
          ...formData,
          emergency_contact: {
            ...formData.emergency_contact,
            [name]: value,
          },
        });
      };
      
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
    };

    return ( 
        <div className='patientRegister'>
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
        </div>
        <div>
          <label>Password:</label>
          <input
            type="text"
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
            type="text"
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
                name="emergencyName" // Use a different name attribute
                value={formData.emergency_contact.name}
                onChange={handleEmergencyContactChange}
                required
             />
        </div>
        <div>
        <label>Emergency Contact Mobile Number:</label>
        <input
         type="text"
         name="emergencyMobile" // Use a different name attribute
         value={formData.emergency_contact.mobile}
         onChange={handleEmergencyContactChange}
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
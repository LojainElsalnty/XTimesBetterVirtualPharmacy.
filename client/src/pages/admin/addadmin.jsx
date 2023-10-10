import React, { useEffect, useState } from 'react';
//import React, { Component } from 'react';
//import { Alert } from 'react-alert';
//import axios from 'axios';
const AddAdmin = () => {

    const [formData, setFormData] = useState({
        username: '',
        password: ''
      });

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
        try {
             // Send the formData object to your backend API for registration
            const response = await fetch('http://localhost:5000/admin/addremove/', {
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
                  password: ''
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
        <div className='addadmin'>
            <h2>Add Admin</h2>
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
          <label>Password:</label>
          <input
            type="text"
            name="password"
            value={formData.password}
            onChange={handleInputChange}
            required
          />
        </div>





        
        {/* Add similar fields for other attributes */}
        
        {/* Submit button */}
        <button type="submit">Add</button>
        {/* <script>
              function myFunction() {
                  alert("Your file is being uploaded!")
              }
              </script> */}
      </form>
        </div>
     );
}
 
export default AddAdmin;
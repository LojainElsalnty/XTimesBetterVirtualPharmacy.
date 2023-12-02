import React, { useState } from 'react';
import './UpdatePackage.css';

function UpdatePackage() {
  // Initialize state for each attribute
  const [attribute1, setAttribute1] = useState('');
  const [attribute2, setAttribute2] = useState('');
  const [attribute3, setAttribute3] = useState('');
  const [attribute4, setAttribute4] = useState('');
  const [attribute5, setAttribute5] = useState('');
  const [attribute6, setAttribute6] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  // Event handlers for input changes
  const handleAttribute1Change = (e) => {
    setAttribute1(e.target.value);
  };

  const handleAttribute2Change = (e) => {
    setAttribute2(e.target.value);
  };

  const handleAttribute3Change = (e) => {
    setAttribute3(e.target.value);
  };

  const handleAttribute4Change = (e) => {
    setAttribute4(e.target.value);
  };

  const handleAttribute5Change = (e) => {
    setAttribute5(e.target.value);
  };
  const handleAttribute6Change = (e) => {
    setAttribute6(e.target.value);
  };

  // Function to handle form submission
  const handleUpdateSubmit = async (e) => {
    e.preventDefault();

    // Construct the updated data object
    const updatedData = {
      "name":attribute1,
      "price":attribute2,
      "doctor_discount":attribute3,
      "medicine_discount":attribute4,
      "family_discount":attribute5,
      "oldname":attribute6
    };

    try {
        console.log(updatedData);
      // Send the `updatedData` object to your backend API for processing
      const response = await fetch('http://localhost:5000/admin/updatePackage', {
        method: 'PUT', // Use PUT or PATCH depending on your API design
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedData),
      });

      if (response.ok) {
        // Handle a successful response (e.g., show a success message)
        //console.log('Update Successful');
        setErrorMessage('Update Successful');

        
      }
      else if (response.status===404){
        setErrorMessage('No package with this name');
      }
      else {
        // Handle API error (e.g., show an error message)
        console.error('API Error:', response.statusText);
      }
    } catch (error) {
      // Handle any network or other errors
      console.error('Network Error:', error);
    }
  };

  return (
    <div className="update-form">
      <h2>Update Package</h2>
      <form onSubmit={handleUpdateSubmit}>
        {/* Attribute 1 */}
        <div className="form-group">
          <label>Name:</label>
          <input
            type="text"
            value={attribute1}
            onChange={handleAttribute1Change}
          />
        </div>

        {/* Attribute 2 */}
        <div className="form-group">
          <label>Price:</label>
          <input
            type="Number"
            value={attribute2}
            onChange={handleAttribute2Change}
          />
        </div>

        {/* Attribute 3 */}
        <div className="form-group">
          <label>Doctor discount:</label>
          <input
            type="Number"
            value={attribute3}
            onChange={handleAttribute3Change}
          />
        </div>

        {/* Attribute 4 */}
        <div className="form-group">
          <label>Medicine discount:</label>
          <input
            type="Number"
            value={attribute4}
            onChange={handleAttribute4Change}
          />
        </div>

         {/* Attribute 5 */}
         <div className="form-group">
          <label>Family discount:</label>
          <input
            type="Number"
            value={attribute5}
            onChange={handleAttribute5Change}
          />
        </div>

         {/* Attribute 6 */}
         <div className="form-group">
          <label>Old Name:</label>
          <input
            type="text"
            value={attribute6}
            onChange={handleAttribute6Change}
            required
          />
        </div>

        <button className="submit-button" type="submit">Update</button>
        {errorMessage && <p style={{ color: 'black' }}>{errorMessage}</p>}
      </form>
    </div>
  );
}

export default UpdatePackage;

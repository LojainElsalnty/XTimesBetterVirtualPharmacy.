import React, { useState } from 'react';

function DeletePackage() {
  // State to store the input value 
  const [inputValue, setInputValue] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  // Function to handle input change
  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

 
// Function to handle button click and make DELETE API request
const handleButtonClick = async () => {
  if (inputValue === '') {
    setErrorMessage('Please enter some text.');
  } 

  else {

    try {
      // Define the API endpoint (replace with your API URL)
      const apiUrl = 'http://localhost:5000/admin/deletePackage';
  
      // Create a JSON object with the name to delete
      const requestData = {
        "name": inputValue,
      };
  
      // Make the DELETE API request using the Fetch API
      const response = await fetch(apiUrl, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json', // Set the content type to JSON
        },
        body: JSON.stringify(requestData), // Convert the object to JSON string
        //mode: 'no-cors'
      });

      setErrorMessage('');
  
      // Check if the request was successful (status code 200)
      if (response.ok) {
        // Handle success (e.g., show a success message)
        setErrorMessage('Deleted Successfully');
        console.log('Delete Successful');
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
      console.log(' Error:', error);
    }
  }
  };
  

  return (
    <div>
      <h2>Delete Package</h2>
      <input
        type="text"
        value={inputValue}
        onChange={handleInputChange}
        placeholder="Enter Name to Delete"
      />
      <button onClick={handleButtonClick}>Delete</button>
      {errorMessage && <p style={{ color: 'black' }}>{errorMessage}</p>}
    </div>
  );
}

export default DeletePackage;

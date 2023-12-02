import React, { useState } from 'react';


function AddPackage() {
  // State to store input values
  const [inputs, setInputs] = useState({
    text1: '',
    text2: '',
    text3: '',
    text4: '',
    text5: '',
  });
  const [errorMessage, setErrorMessage] = useState('');

  // Function to handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setInputs({
      ...inputs,
      [name]: value,
    });
    console.log(inputs);
  };

  // Function to handle button click and make API request
  const handleButtonClick = async () => {
    if (inputs.text1 === '' || inputs.text2 === '' || inputs.text3 === ''|| inputs.text4 === '' ||inputs.text5 === '' ) {
      setErrorMessage('Please enter some text.');
    } 

    else{
      try {

      // Define the API endpoint (replace with your API URL)
      const apiUrl = 'http://localhost:5000/admin/addPackage';

      // Prepare the request data (customize as needed)
      const requestData = {
        name: inputs.text1,
        price: inputs.text2,
        doctor_discount: inputs.text3,
        medicine_discount:inputs.text4,
        family_discount:inputs.text5,
      };
      console.log(requestData);

      // Make the API request using the Fetch API (POST request in this example)
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestData),
      });
      console.log(response);
      // Check if the request was successful (status code 200)
      if (response.ok) {
        const responseData = await response.json();
        setErrorMessage('Package Added');
        // Handle the response data here
        console.log('API Response:', responseData);
      } 
      else if (response.status===409){
        setErrorMessage('Package already Exist');
      }
      else {
        // Handle API error (e.g., show an error message)
        console.error('API Error:', response.statusText);
      }
    } catch (error) {
      // Handle any network or other errors
      console.error('Network Error:', error);
    }
  }
    
  };

  return (
    <div>
      <input
        type="text"
        name="text1"
        value={inputs.text1}
        onChange={handleInputChange}
        placeholder="Name"
      />
      <input
        type="Number"
        name="text2"
        value={inputs.text2}
        onChange={handleInputChange}
        placeholder="Price"
      />
      <input
        type="Number"
        name="text3"
        value={inputs.text3}
        onChange={handleInputChange}
        placeholder="Doctor Discount"
      />
      <input
        type="Number"
        name="text4"
        value={inputs.text4}
        onChange={handleInputChange}
        placeholder="Medicine Discount"
      />
      <input
        type="Number"
        name="text5"
        value={inputs.text5}
        onChange={handleInputChange}
        placeholder="Family Discount"
      />
      <button onClick={handleButtonClick}>Submit</button>
      {errorMessage && <p style={{ color: 'black' }}>{errorMessage}</p>}
    </div>
  );
}

export default AddPackage;

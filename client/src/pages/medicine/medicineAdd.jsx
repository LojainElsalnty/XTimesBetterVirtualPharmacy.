import React, { useState, useEffect } from 'react';

// Axios
import axios from 'axios';

// React Router DOM
import { useNavigate } from 'react-router-dom';

function MedicineAdd() {
  const [medicineData, setMedicineData] = useState({
    name: '',
    price: '',
    activeIngredients: [],
    availableQuantity: '',
    medicinalUses: [],
    image: '',
  });
  const [isRecordAdded, setIsRecordAdded] = useState(false);
  const [error, setError] = useState(null); // Initialize error state

  //const accessToken = sessionStorage.getItem('accessToken');
  const navigate = useNavigate();

  //new part
  const accessToken = sessionStorage.getItem('accessToken');
  const [load, setLoad] = useState(true);
  const [username, setUsername] = useState('');
  console.log(accessToken);
  useEffect(() => {
    if (username.length != 0) {
      setLoad(false);
    }
  }, [username]);
  async function checkAuthentication() {
    await axios({
      method: 'get',
      url: 'http://localhost:8000/authentication/checkAccessToken',
      headers: {
        "Content-Type": "application/json",
        'Authorization': accessToken,
        'User-type': 'pharmacist',
      },
    })
      .then((response) => {
        console.log(response);
        setUsername(response.data.username);
        //setLoad(false);
      })
      .catch((error) => {
        //setLoad(false);
        navigate('/login');

      });
  }

  const xTest = checkAuthentication();


  const handleChangeImage = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.onload = (e) => {
      setMedicineData({ ...medicineData, image: e.target.result });
    };

    if (file) {
      reader.readAsDataURL(file);
    }
  };




  const handleChange = (e) => {
    const { name, value, type } = e.target;

    if (type === 'file') {
      const file = e.target.files[0];
      setMedicineData({ ...medicineData, [name]: file });
    } else {
      if (name === 'activeIngredients' || name === 'medicinalUses') {
        // Handle the case where the input is a comma-separated list
        const values = value.split(',').map((v) => v.trim());
        setMedicineData({ ...medicineData, [name]: values });
      } else {
        setMedicineData({ ...medicineData, [name]: value });
      }
    }
  };
  console.log(medicineData)

  const handleSubmit = (e) => {
    e.preventDefault();

    const requestBody = {
      name: medicineData.name,
      price: medicineData.price,
      activeIngredients: medicineData.activeIngredients,
      availableQuantity: medicineData.availableQuantity,
      medicinalUses: medicineData.medicinalUses,
      image: medicineData.image,
    };

    console.log("request body", requestBody)
    //console.log(requestBody.file)
    console.log("hena")
    console.log(medicineData)

    fetch('http://localhost:8000/medicineRoutes/addMedicine', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(requestBody),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
          //alert("Please revise data entered and try again!")
        }
        return response.json();

      })
      .then((data) => {
        console.log('Medicine added:', data);

        // Reset the input fields to their initial empty state
        setMedicineData({
          name: '',
          price: '',
          activeIngredients: [],
          availableQuantity: '',
          medicinalUses: [],
          image: '',
        });
      })
      .catch((error) => {
        console.log('Request Body:', JSON.stringify(requestBody));
        // console.log("iam here fe");
        console.error('Error adding medicine:', error);
        //alert("Please revise data entered and try again!")

        // Handle the error here, e.g., display an error message to the user.
        // Set the error state
      });

  };


  if (load) {
    return (<div>Loading</div>)
  }

  return (
    <div>
      <h2>Add a New Medicine</h2>
      <form onSubmit={handleSubmit} encType="multipart/form-data">
        <div>
          <label htmlFor="name">Medicine Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={medicineData.name}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="price">Price:</label>
          <input
            type="number"
            id="price"
            name="price"
            value={medicineData.price}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="activeIngredients">Active Ingredients (comma-separated):</label>
          <input
            type="text"
            id="activeIngredients"
            name="activeIngredients"
            value={medicineData.activeIngredients.join(', ')}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="availableQuantity">Available Quantity:</label>
          <input
            type="number"
            id="availableQuantity"
            name="availableQuantity"
            value={medicineData.availableQuantity}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="medicinalUses">Medicinal Uses (comma-separated):</label>
          <input
            type="text"
            id="medicinalUses"
            name="medicinalUses"
            value={medicineData.medicinalUses.join(', ')}
            onChange={handleChange}
            required
          />
        </div>
        {/* <div>
       

           <label htmlFor="image">Medicine Image:</label>
           <input
            type="file"
            id="image"
            name="image"
            accept="image/*"
          onChange={handleChangeImage}
             required
                />
        </div>
         */}
        <div>
          <label htmlFor="image">Image URL:</label>
          <input
            type="text"
            id="image"
            name="image"
            value={medicineData.image}
            onChange={handleChange}
            required
          />
        </div>

        <button type="submit">Add Medicine</button>
      </form>
    </div>
  );
}

export default MedicineAdd;

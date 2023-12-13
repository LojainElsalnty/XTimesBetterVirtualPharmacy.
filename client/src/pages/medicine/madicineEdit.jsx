import React, { useState, useEffect } from 'react';

// Axios
import axios from 'axios';

// React Router DOM
import { useNavigate } from 'react-router-dom';

// Styles
import styles from './madicineEdit.module.css';

function MedicineEdit() {
  const [medicineData, setMedicineData] = useState({
    name: '',
    price: '',
    activeIngredients: [],
    availableQuantity: '',
    medicinalUses: [],
    image: null,
  });
  //new part
  const accessToken = sessionStorage.getItem('accessToken');
  const [load, setLoad] = useState(true);
  const [username, setUsername] = useState('');
  const navigate = useNavigate();
  
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

  const handleChange = (e) => {
    const { name, value, type } = e.target;

    if (name === 'activeIngredients' || name === 'medicinalUses') {
      // Handle the case where the input is a comma-separated list
      const values = value.split(',').map((v) => v.trim());
      setMedicineData({ ...medicineData, [name]: values });
    } else {
      setMedicineData({ ...medicineData, [name]: value });

    }
  };
  console.log(medicineData)

  const handleSubmit = (e) => {
    e.preventDefault();

    const requestBody = {};
    requestBody.name = medicineData.name;

    if (medicineData.price !== '') {
      requestBody.price = medicineData.price;
    }

    if (medicineData.activeIngredients.length > 0) {
      requestBody.activeIngredients = medicineData.activeIngredients;
    }

    if (medicineData.availableQuantity !== '') {
      requestBody.availableQuantity = medicineData.availableQuantity;
    }

    if (medicineData.medicinalUses.length > 0) {
      requestBody.medicinalUses = medicineData.medicinalUses;
    }
    if (medicineData.image.length > 0) {
      requestBody.image = medicineData.image;
    }


    fetch(`http://localhost:8000/medicineRoutes/updateMedicine`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(requestBody),
    })
      .then((response) => {
        if (!response.ok) {
          //throw new Error(`HTTP error! Status: ${response.status}`);
          alert("This medicine does not exist!")

        }
        return response.json();
      })
      .then((data) => {
        console.log('Medicine updated:', data);
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
        console.error('Error updating medicine:', error);
        console.log("this medicine does not exist")
      });
  };



  if (load) {
    return (<div>Loading</div>)
  }


  return (
    <div className={styles['main__div']}>
      <form className={styles['medicine__form']}  onSubmit={handleSubmit}>
        <div className={styles['medicine__div']}>
          <label htmlFor="name">Medicine Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            className={styles['input__field']}
            value={medicineData.name}
            onChange={handleChange}
            required
          />
        </div>
        <div  className={styles['medicine__div']}>
          <label htmlFor="price">Price:</label>
          <input
            type="number"
            id="price"
            name="price"
            className={styles['input__field']}
            value={medicineData.price}
            onChange={handleChange}
          />
        </div>
        <div  className={styles['medicine__div']}>
          <label htmlFor="activeIngredients">Active Ingredients (comma-separated):</label>
          <input
            type="text"
            id="activeIngredients"
            name="activeIngredients"
            className={styles['input__field']}
            value={medicineData.activeIngredients.join(', ')}
            onChange={handleChange}
          />
        </div>
        <div  className={styles['medicine__div']}>
          <label htmlFor="availableQuantity">Available Quantity:</label>
          <input
            type="number"
            id="availableQuantity"
            name="availableQuantity"
            className={styles['input__field']}
            value={medicineData.availableQuantity}
            onChange={handleChange}
          />
        </div>
        <div  className={styles['medicine__div']}>
          <label htmlFor="medicinalUses">Medicinal Uses (comma-separated):</label>
          <input
            type="text"
            id="medicinalUses"
            name="medicinalUses"
            className={styles['input__field']}
            value={medicineData.medicinalUses.join(', ')}
            onChange={handleChange}
          />
        </div>
        <div  className={styles['medicine__div']}>
          <label htmlFor="name">Medicine Image:</label>
          <input
            type="text"
            id="image"
            name="image"
            className={styles['input__field']}
            value={medicineData.image}
            onChange={handleChange}

          />
        </div>
        <button className={styles['add__medicine__btn']} type="submit">Edit Medicine</button>
      </form>
    </div>
  );
}

export default MedicineEdit;

import React, { useState, useEffect } from 'react';

// Axios
import axios from 'axios';
import { useLocation } from 'react-router-dom';

import styles from './medicineEdit.module.css';

// React Router DOM
import { useNavigate } from 'react-router-dom';

// Styles
// import styles from './madicineEdit.module.css';

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

  //new!! ~S3
  const [medicineName, setMedicineName] = useState('');
  const location = useLocation();
  useEffect(() => {
    if (location.state && location.state.medName) {
      setMedicineName(location.state.medName);
    }
  }, [location.state]);

  medicineData.name = medicineName;
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

    if (medicineData.activeIngredients && medicineData.activeIngredients.length > 0) {
      requestBody.activeIngredients = medicineData.activeIngredients;
    }

    if (medicineData.availableQuantity !== '') {
      requestBody.availableQuantity = medicineData.availableQuantity;
    }

    if (medicineData.medicinalUses && medicineData.medicinalUses.length > 0) {
      requestBody.medicinalUses = medicineData.medicinalUses;
    }
    if (medicineData.image && medicineData.image.length > 0) {
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
    <div className={styles["containerEditMed"]}>
      <h2 className={styles["headerEditMed"]}>Edit Medicine</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label className={styles["labelEditMed"]} htmlFor="name">Medicine Name:</label>
          <input className={styles["inputEditMed"]}
            type="text"
            id="name"
            name="name"
            // className={styles['input__field']}
            value={medicineData.name}
            readOnly
          />
        </div>
        <div>
          <label className={styles["labelEditMed"]} htmlFor="price">Price:</label>
          <input className={styles["inputEditMed"]}
            type="number"
            id="price"
            name="price"
            // className={styles['input__field']}
            value={medicineData.price}
            onChange={handleChange}
          />
        </div>
        <div>
          <label className={styles["labelEditMed"]} htmlFor="activeIngredients">Active Ingredients (comma-separated):</label>
          <input className={styles["inputEditMed"]}
            type="text"
            id="activeIngredients"
            name="activeIngredients"
            // className={styles['input__field']}
            value={medicineData.activeIngredients.join(', ')}
            onChange={handleChange}
          />
        </div>
        <div>
          <label className={styles["labelEditMed"]} htmlFor="availableQuantity">Available Quantity:</label>
          <input className={styles["inputEditMed"]}
            type="number"
            id="availableQuantity"
            name="availableQuantity"
            value={medicineData.availableQuantity}
            onChange={handleChange}
          />
        </div>
        <div>
          <label className={styles["labelEditMed"]} htmlFor="medicinalUses">Medicinal Uses (comma-separated):</label>
          <input className={styles["inputEditMed"]}
            type="text"
            id="medicinalUses"
            name="medicinalUses"
            value={medicineData.medicinalUses.join(', ')}
            onChange={handleChange}
          />
        </div>
        <div>
          <label className={styles["labelEditMed"]} htmlFor="name">Medicine Image:</label>
          <input className={styles["inputEditMed"]}
            type="text"
            id="image"
            name="image"
            value={medicineData.image}
            onChange={handleChange}

          />
        </div>
        <button className={styles["buttonEditMed"]} type="submit">Edit Medicine</button>
      </form>
    </div>
  );
}

export default MedicineEdit;

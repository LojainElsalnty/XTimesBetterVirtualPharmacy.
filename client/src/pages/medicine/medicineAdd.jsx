import React, { useState, useEffect } from 'react';

// Axios
import axios from 'axios';

// React Router DOM
import { useNavigate } from 'react-router-dom';

import styles from './medicineAdd.module.css';

function MedicineAdd() {
  const [medicineData, setMedicineData] = useState({
    name: '',
    price: '',
    isOTC:false,
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
    const { name, value, type, checked } = e.target;
  
    if (type === 'file') {
      const file = e.target.files[0];
      setMedicineData({ ...medicineData, [name]: file });
    } else if (type === 'checkbox') {
      setMedicineData({ ...medicineData, [name]: checked });
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
      isOTC:medicineData.isOTC,
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
          isOTC:false,
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
    <div className={styles.containerAddMed}>
      <h2 className={styles.headerAddMed}>Add a New Medicine</h2>
      <form className={styles.formAddMed} onSubmit={handleSubmit} encType="multipart/form-data">
        <div className={styles.inputAddMed}>
          <label htmlFor="name" className={styles.labelAddMed}>
            Medicine Name:
          </label>
          <input type="text" id="name" name="name" value={medicineData.name} onChange={handleChange} required />
        </div>
        <div className={styles.inputAddMed}>
          <label htmlFor="price" className={styles.labelAddMed}>
            Price:
          </label>
          <input type="number" id="price" name="price" value={medicineData.price} onChange={handleChange} required />
        </div>
        <div className={styles.inputAddMed}>
          <label htmlFor="activeIngredients" className={styles.labelAddMed}>
            Active Ingredients (comma-separated):
          </label>
          <input
            type="text"
            id="activeIngredients"
            name="activeIngredients"
            className={styles['input__field']}
            value={medicineData.activeIngredients.join(', ')}
            onChange={handleChange}
            required
          />
        </div>
        <div className={styles.inputAddMed}>
          <label htmlFor="availableQuantity" className={styles.labelAddMed}>
            Available Quantity:
          </label>
          <input
            type="number"
            id="availableQuantity"
            name="availableQuantity"
            value={medicineData.availableQuantity}
            className={styles['input__field']}
            onChange={handleChange}
            required
          />
        </div>
        <div className={styles.inputAddMed}>
          <label htmlFor="isOTC" className={styles.labelAddMed}>
            Over-the-Counter (OTC):
          </label>
          <input
            type="checkbox"
            id="isOTC"
            name="isOTC"
            checked={medicineData.isOTC}
            onChange={handleChange}
          />
        </div>
        <div className={styles.inputAddMed}>
          <label htmlFor="medicinalUses" className={styles.labelAddMed}>
            Medicinal Uses (comma-separated):
          </label>
          <input
            type="text"
            id="medicinalUses"
            name="medicinalUses"
            value={medicineData.medicinalUses.join(', ')}
            className={styles['input__field']}
            onChange={handleChange}
            required
          />
        </div>
        {/* <div className={styles.inputAddMed}>
          <label htmlFor="image" className={styles.labelAddMed}>
            Medicine Image:
          </label>
          <input
            type="file"
            id="image"
            name="image"
            accept="image/*"
            onChange={handleChangeImage}
            required
          />
        </div> */}
        <div className={styles.inputAddMed}>
          <label htmlFor="image" className={styles.labelAddMed}>
            Image URL:
          </label>
          <input
            type="text"
            id="image"
            name="image"
            value={medicineData.image}
            className={styles['input__field']}
            onChange={handleChange}
            required
          />
        </div>

        <button className={styles.buttonAddMed} type="submit">
          Add Medicine
        </button>
      </form>
    </div>
  );
}

export default MedicineAdd;

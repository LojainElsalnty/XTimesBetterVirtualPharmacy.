import React, { useState } from 'react';

function MedicineEdit() {
  const [medicineData, setMedicineData] = useState({
    name: '',
    price: '',
    activeIngredients: [],
    availableQuantity: '',
    medicinalUses: [],
    image: null,
  });

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
  
    const requestBody = {};
    requestBody.name  = medicineData.name;
  
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
  
    fetch(`http://localhost:5000/medicineRoutes/updateMedicine`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(requestBody),
    })
      .then((response) => {
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);

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
          image: null,
        });
      })
      .catch((error) => {
        console.error('Error updating medicine:', error);
        console.log("this medicine does not exist")
      });
  };

  
  
  

  return (
    <div>
      <h2>Edit Medicine</h2>
      <form onSubmit={handleSubmit}>
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
            
          />
        </div>
        <div>
          <label htmlFor="image">Medicine Image:</label>
          <input
            type="file"
            id="image"
            name="image"
           // onChange={handleChange}
            
          />
        </div>
        <button type="submit">Edit Medicine</button>
      </form>
    </div>
  );
}

export default MedicineEdit;

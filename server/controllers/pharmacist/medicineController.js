const Medicine = require('../../models/Medicine');
const Pharmacist = require('../../models/Medicine')
const mongoose = require('mongoose')



const addMedicine = async (req, res) => {
  try {
    //console.log("req body:",req.body)
    // Extract Medicine details from the request body
    const {
      name,
      price,
      activeIngredients,
      availableQuantity,
      medicinalUses,
      sales,
      isOTC,
      image,
    } = req.body;
    //console.log(req.body)

    // Access the uploaded medicine image from the request file
    //const image = req.file;
    //console.log("image:",image)
    // Create a new Medicine document with the image
    const newMedicine = new Medicine({
      name,
      price,
      activeIngredients,
      availableQuantity,
      medicinalUses,
      sales,
      isOTC,
      image, // Store the image filename in your Medicine model
    });
    console.log("New med: ", newMedicine)
    // Save the new Medicine record to the database
    const savedMedicine = await newMedicine.save()
    console.log('saved medicine:');
    console.log(savedMedicine);
    res.status(201).json(savedMedicine); // Return the saved Medicine document
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};



const updateMedicine = async (req, res) => {
  try {
    //console.log("iam here3")
    // Extract Medicine details from the request body
    const {
      name,
      price,
      activeIngredients,
      availableQuantity,
      medicinalUses,
      sales,
      isOTC,
      image,
    } = req.body;

    // Create a query to find the medicine by its name
    const query = { name };

    // Create an object with the updated medicine details
    const updatedMedicine = {
      price,
      activeIngredients,
      availableQuantity,
      medicinalUses,
      sales,
      isOTC,
      image,
    };

    // Use findOneAndUpdate to find and update the medicine
    const updatedMedicineData = await Medicine.findOneAndUpdate(
      query,
      updatedMedicine,
      { new: true } // Return the updated document
    );

    // Check if the medicine was found and updated
    if (!updatedMedicineData) {
      return res.status(404).json({ error: 'Medicine not found' });
    }

    res.status(200).json(updatedMedicineData); // Return the updated medicine document
  } catch (error) {
    console.error('Update error:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};


module.exports = { addMedicine, updateMedicine }
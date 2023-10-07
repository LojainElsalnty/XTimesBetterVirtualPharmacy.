const Medicine = require('../models/Medicine');
const Pharmacist = require('../models/Medicine')
const mongoose = require('mongoose')



// add a new Medicine
const addMedicine = async (req, res) => {
    try {
      // Extract Medicine details from the request body
      console.log(req.body)
      const {
        name,
        price,
        activeIngredients,
        availableQuantity,
        medicinalUses,
        sales
        
      } = req.body;
      //console.log("iam here")
      // Create a new pharmacist document
      const newMedicine = new Medicine({
       name,
        price,
        activeIngredients,
        availableQuantity,
        medicinalUses,
        sales
      });
      //console.log(pharmacist)
      //console.log("iam here2")
      // Save the new pharmacist record to the database
      const savedMedicine = await newMedicine.save()
      .catch((error) => {
          console.error('Database save error:', error);
        });
        
     // console.log("iam here3")
      res.status(201).json(savedMedicine); // Return the saved pharmacist document
    } catch (error) {
      res.status(500).json({ error: 'Internal Server Error' });
    }
  };


  const updateMedicine = async (req, res) => {
    try {
      // Extract Medicine details from the request body
      const {
        name,
        price,
        activeIngredients,
        availableQuantity,
        medicinalUses,
        sales
      } = req.body;
  
      // Create a query to find the medicine by its name
      const query = { name };
  
      // Create an object with the updated medicine details
      const updatedMedicine = {
        price,
        activeIngredients,
        availableQuantity,
        medicinalUses,
        sales
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
  

  module.exports= {addMedicine,updateMedicine}
const Pharmacist = require('../../models/Pharmacist')
const mongoose = require('mongoose')

const viewPharmaInfo = async (req, res) => {
  const { username } = req.params;
  //console.log(username)
  try {
    // Use the `findOne` method to find a pharmacist by their username
    const pharmacist = await Pharmacist.findOne({ username });
    //console.log(pharmacist)
    if (!pharmacist) {
      return res.status(404).json({ error: "Pharmacist not found" });
    }

    // For debugging, log the found pharmacist
    //console.log("Found pharmacist:", pharmacist);

    res.status(200).json(pharmacist);
  } catch (error) {
    // Handle any errors that may occur during the database query
    console.error("Database error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};





// add a new pharmacist
const addPharmacist = async (req, res) => {
  try {
    // Extract pharmacist details from the request body
    console.log(req.body)
    const {
      username,
      name,
      email,
      password,
      dob,
      hourly_rate,
      affilitation,
      educational_background,
    } = req.body;
    //console.log("iam here")
    // Create a new pharmacist document
    const newPharmacist = new Pharmacist({
      username,
      name,
      email,
      password,
      dob,
      hourly_rate,
      affilitation,
      educational_background,
    });
    //console.log(pharmacist)
    //console.log("iam here2")
    // Save the new pharmacist record to the database
    const savedPharmacist = await newPharmacist.save()
      .catch((error) => {
        console.error('Database save error:', error);
      });

    // console.log("iam here3")
    res.status(201).json(savedPharmacist); // Return the saved pharmacist document
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
//view all pharma 
const viewAllPharmaInfo = async (req, res) => {
   try {
        const pharmacists = await Pharmacist.find();
        res.json(pharmacists);
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
}




module.exports = { viewPharmaInfo, addPharmacist, viewAllPharmaInfo }
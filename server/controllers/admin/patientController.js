const Patient = require('../../models/Patient')

const mongoose = require('mongoose')

const viewPatientInfo = async (req, res) => {
  const { username } = req.params;
  //console.log(username)
  try {
    // Use the `findOne` method to find a Patient by their username
    const response = await Patient.findOne({ username });

    if (!response) {
      return res.status(404).json({ error: "Patient not found" });

    }

    // For debugging, log the found Patient
    console.log("Found Patient:", response);

    res.status(200).json(response);
  } catch (error) {
    // Handle any errors that may occur during the database query
    console.error("Database error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};


//view all patients 
const viewAllPatientsInfo = async (req, res) => {
  try {
       const patients = await Patient.find();
       res.json(patients);
   } catch (error) {
       console.error(error);
       res.status(500).send('Internal Server Error');
   }
}



module.exports = { viewPatientInfo ,viewAllPatientsInfo}
const mongoose = require('mongoose');
const asyncHandler = require('express-async-handler');
const patientModel = require('../../models/Patient');
const bcrypt = require('bcrypt');

// Add a new patient to the database
const createPatient = asyncHandler( async(req,res) => {
   const patient = req.body;

   if (patient.username === undefined) {
      return res.status(400).json({ message: 'Please add a username!', registeredIn: false });
   }

   if (patient.name === undefined) {
      return res.status(400).json({ message: 'Please add a name!', registeredIn: false });
   }

   if (patient.email === undefined) {
      return res.status(400).json({ message: 'Please add an email!', registeredIn: false });
   }

   if (patient.password === undefined) {
      return res.status(400).json({ message: 'Please add a password!', registeredIn: false });
   }

   if (patient.dob === undefined) {
      return res.status(400).json({ message: 'Please add a date of birth!', registeredIn: false });
   }

   if (patient.gender === undefined) {
      return res.status(400).json({ message: 'Please add a gender!', registeredIn: false });
   }

   if (patient.mobile === undefined) {
      return res.status(400).json({ message: 'Please add a mobile number!', registeredIn: false });
   }

   if (patient.emergency_contact === undefined) {
      return res.status(400).json({ message: 'Please add an emergency contact!', registeredIn: false });
   }

   let takenUsername = null;
   let takenEmail = null;

    takenUsername =  await patientModel.findOne({ username: patient.username });
    takenEmail = await patientModel.findOne({ email: patient.email });

    if (takenUsername) {
        return res.status(400).json({success: false, message: 'Username already taken!', registeredIn: false});
    } else if (takenEmail) {
        return res.status(400).json({success: false, message: 'Email already registered!', registeredIn: false});
    } else {
        // Generate a hashcode of user's password
        patient.password = await bcrypt.hash(patient.password, 10);
        const newPatientRequest = await patientModel.create(patient);
        return res.status(200).json({ success: true, message: "Success", patient: newPatientRequest, registeredIn: true});
    }
});
 
// Retrieve all patients from the database
const getPatients = asyncHandler(async (req, res) => {
    let patients = await patientModel.find();

    res.status(200).json(patients);
});
 
module.exports = {createPatient, getPatients};

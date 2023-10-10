const mongoose = require('mongoose');
const asyncHandler = require('express-async-handler');
const pharmacistModel = require('../../models/Pharmacist');
const pharmacistRequestModel = require('../../models/PharmacistRequest');

const bcrypt = require('bcrypt');

// Add a new pharmacist to the database
const createPharmacist = asyncHandler( async(req,res) => {
   const pharmacist = req.body;

   if (pharmacist.username === undefined) {
      return res.status(400).json({ message: 'Please add a username!', registeredIn: false });
   }

   if (pharmacist.name === undefined) {
      return res.status(400).json({ message: 'Please add a name!', registeredIn: false });
   }

   if (pharmacist.email === undefined) {
      return res.status(400).json({ message: 'Please add an email!', registeredIn: false });
   }

   if (pharmacist.password === undefined) {
      return res.status(400).json({ message: 'Please add a password!', registeredIn: false });
   }

   if (pharmacist.dob === undefined) {
      return res.status(400).json({ message: 'Please add a date of birth!', registeredIn: false });
   }

   if (pharmacist.hourly_rate === undefined) {
      return res.status(400).json({ message: 'Please add an hourly rate!', registeredIn: false });
   }

   if (pharmacist.affilitation === undefined) {
      return res.status(400).json({ message: 'Please add an affilitation!', registeredIn: false });
   }

   if (pharmacist.educational_background === undefined) {
      return res.status(400).json({ message: 'Please add an educational background!', registeredIn: false });
   }

   pharmacist.status = "onhold";

   takenUsername =  await pharmacistModel.findOne({ username: pharmacist.username });
   takenEmail = await pharmacistModel.findOne({ email: pharmacist.email });
   takenUsernameReq =  await pharmacistRequestModel.findOne({ username: pharmacist.username });
   takenEmailReq = await pharmacistRequestModel.findOne({ email: pharmacist.email });

    if (takenUsername || takenUsernameReq) {
        return res.status(400).json({ message: 'Username already taken!', registeredIn: false });
    } else if (takenEmail || takenEmailReq) {
        return res.status(400).json({ message: 'Email already registered!', registeredIn: false });
    } else {
        // Generate a hashcode of user's password
        pharmacist.password = await bcrypt.hash(pharmacist.password, 10);
        const newPharmacistRequest = await pharmacistRequestModel.create(pharmacist);
        res.status(200).json({ message: "Success", patient: newPharmacistRequest, registeredIn: true});
    }
});
 
// Retrieve all pharmacists from the database
const getPharmacists = asyncHandler(async (req, res) => {
    let pharmacists = await pharmacistModel.find();

    res.status(200).json(pharmacists);
});

// Retrieve all pharmacist requests from the database
const getPharmacistRequests = asyncHandler(async (req, res) => {
   let pharmacistRequests = await pharmacistRequestModel.find();

   res.status(200).json(pharmacistRequests);
});
 
module.exports = {createPharmacist, getPharmacists, getPharmacistRequests};

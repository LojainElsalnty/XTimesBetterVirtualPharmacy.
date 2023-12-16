const mongoose = require('mongoose');
const asyncHandler = require('express-async-handler');
const adminModel = require('../../models/Admin');
const patientModel = require('../../models/Patient');
const pharmacistModel = require('../../models/Pharmacist');
const bcrypt = require('bcrypt');

const addAdmin = asyncHandler(async (req, res) => {
  const admin = req.body;

  if (admin.username === undefined || admin.password === undefined) {
    return res.status(400).json({ success: false, message: 'Please provide both username and password!', registeredIn: false });
  }

  try {
    let takenUsername = await adminModel.findOne({ username: admin.username });

    if (takenUsername !== null && takenUsername !== undefined) {
      return res.status(400).json({ success: false, message: 'Username already taken!', registeredIn: false });
    } else {
      admin.password = await bcrypt.hash(admin.password, 10);
      const newAdmin = await adminModel.create(admin);
      return res.status(200).json({ success: true, message: 'Admin added successfully', admin: newAdmin, registeredIn: true });
    }
  } catch (error) {
    console.error('Error adding admin:', error);
    return res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
});

// const removeAdmin = asyncHandler( async(req,res) => {
//     app.delete("/admin/:username", async (req, res, next) => {
//         const username = req.params.username;

//         try {
//           admin.remove({ _username: username }).exec().then(data => {
//               res.json(data);
//             });
//         } catch (error) {
//           console.log(error);
//         }
//       })
// });
const removeAdmin = asyncHandler(async (req, res) => {
  try {
    const { adminUsername } = req.params;
    //console.log(adminUsername)
    // Check if the admin with the given username exists
    const existingAdmin = await adminModel.findOne({ username: adminUsername });
    //console.log(existingAdmin)
    if (existingAdmin) {
      // If the admin exists, remove them from the database
      const deletedAdmin = await adminModel.findOneAndDelete({ username: adminUsername });
      res.status(200).json({ message: 'Admin removed successfully', removedAdmin: deletedAdmin });
    } else {
      // If the admin with the given username does not exist, return an error
      return res.status(404).json({ message: 'Admin not found', removedAdmin: null });
    }
  } catch (error) {
    console.error('Error removing admin:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});
const getAdmins = asyncHandler(async (req, res) => {
  let admin = await adminModel.find();
  res.status(200).json(admin);
});
const getPatients = asyncHandler(async (req, res) => {
  let patient = await patientModel.find();
  res.status(200).json(patient);
});
const getPharmacists = asyncHandler(async (req, res) => {
  let pharmacist = await pharmacistModel.find();
  res.status(200).json(pharmacist);
});

const removePatient = asyncHandler(async (req, res) => {
  const patient = req.body;
  console.log("patient: ", patient)

  let existUsername = null;

  existUsername = await patientModel.findOne({ username: patient.username });
  console.log("existUser: ", existUsername)
  if (existUsername) {
    const deleted = await patientModel.findOneAndDelete({ username: patient.username });
    res.status(200).send(deleted);
  }
  else {
    return res.status(400).json({ message: 'Username does not exist!', registeredIn: false });
  }

});

const removePharmacist = asyncHandler(async (req, res) => {
  const pharmacist = req.body;
  let existUsername = null;

  existUsername = await pharmacistModel.findOne({ username: pharmacist.username });

  if (existUsername) {
    const deleted = await pharmacistModel.findOneAndDelete({ username: pharmacist.username });
    res.status(200).send(deleted);
  }
  else {
    return res.status(400).json({ message: 'Username does not exist!', registeredIn: false });
  }

});
const addAmountToAllPharmacists = asyncHandler(async (req, res) => {
  // Update the walletAmount for all pharmacists by adding 2000
  const update = { $inc: { walletAmount: 2000 } };

  // Set new to true to return the modified documents
  const options = { new: true };

  // Update all pharmacists
  const updatedPharmacists = await pharmacistModel.updateMany({}, update, options);

  res.status(200).json(updatedPharmacists);
});



module.exports = { addAdmin, removeAdmin, addAmountToAllPharmacists, getAdmins, getPatients, getPharmacists, removePatient, removePharmacist };
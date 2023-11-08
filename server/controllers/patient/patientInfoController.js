const mongoose = require('mongoose');
const asyncHandler = require('express-async-handler');
const patientModel = require('../../models/Patient.js');

const getPatientInfo = asyncHandler(async (req, res) => {
    const username = req.body.username;
    
    if (username === undefined) {
        return res.status(400).json({ message: 'Please enter a username', patient: null, found: false });
    }

    const patient = await patientModel.find({username: username});

    if (!patient) {
        return res.status(404).json({message: 'Patient not found', patient: null, found: false});
    }
    else {
        return res.status(200).json({message: 'Patient found', patient: patient, found: true});
    }
})

module.exports = { getPatientInfo };
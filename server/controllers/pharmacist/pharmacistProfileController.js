const mongoose = require('mongoose');
const asyncHandler = require('express-async-handler');
const pharmacistModel = require('../../models/Pharmacist');

const getPharmacistInfo = asyncHandler(async (req, res) => {
    const username = req.body.username;

    if (username === undefined) {
        return res.status(400).json({ message: 'Please enter a username', pharmacist: null, found: false });
    }

    const pharmacist = await pharmacistModel.find({username: username});

    if (!pharmacist) {
        return res.status(404).json({message: 'Doctor not found', pharmacist: null,found: false});
    }
    else {
        return res.status(200).json({message: 'Doctor found', pharmacist: pharmacist, found: true});
    }
})

module.exports = { getPharmacistInfo };
const mongoose = require('mongoose');
const asyncHandler = require('express-async-handler');
const pharmacistREQsModel = require('../../models/PharmacistRequest');

const viewReqPharmacistInfo = asyncHandler(async (req, res) => {
    // console.log(req.query)
    const { username } = req.query;

    const query = { username }
    console.log(query)
    const requestedPharmacist = await pharmacistREQsModel.find(query);
    console.log(requestedPharmacist);
    if (requestedPharmacist) {
        res.status(200).json(requestedPharmacist);
    } else {
        res.status(400).json({ message: 'Requested Pharmacist not found!' });
    }

})

module.exports = { viewReqPharmacistInfo };
const mongoose = require('mongoose');
const asyncHandler = require('express-async-handler');
const pharmacistREQsModel = require('../../models/PharmacistRequest');


const viewReqPharmacistsInfo = asyncHandler(async (req, res) => {
    // console.log(req.query)
    const pharmacists = await pharmacistREQsModel.find();

    
    console.log(pharmacists)
    
    
    if (pharmacists) {
        res.status(200).json(pharmacists);
    } else {
        res.status(400).json({ message: 'Requested Pharmacist not found!' });
    }

})
module.exports = { viewReqPharmacistsInfo };
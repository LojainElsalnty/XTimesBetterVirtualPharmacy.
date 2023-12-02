const mongoose = require('mongoose');
const asyncHandler = require('express-async-handler');
const pharmacistModel = require('../../models/Pharmacist');

const viewPharmacistWalletNumber = async (req, res) => {
    const username = req.body.username;
     try {
        const pharmacist = await pharmacistModel.findOne({username: username});
         if (pharmacist) {
             const pharmacistWalletNumber = pharmacist.walletAmount;
             res.status(200).json(doctorWalletNumber);
 
         } else {
            return res.status(404).json({ error: 'pharmacist not found' })
         }
         
     } catch (error) {
         res.status(500).json({ error: "Can't get your wallet Number" });
     }
 }
 
module.exports = { viewPharmacistWalletNumber };
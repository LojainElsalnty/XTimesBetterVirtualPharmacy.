const mongoose = require('mongoose');
const asyncHandler = require('express-async-handler');
const pharmacistModel = require('../../models/Pharmacist');

const getPharmacistNotifications= asyncHandler(async (req, res) => {
  //  console.log(req.body.username);

    
    const pharmacistArray = await pharmacistModel.find({ username: req.body.username });
    const pharmacist = pharmacistArray[0];
    


    if (pharmacist) {
       // console.log(pharmacist);

       return res.status(200).json({notifications: pharmacist.notifications});
    } else {
        res.status(400).json({ message: 'Can not retrieve Pharmacist Data!' });
    }


});



module.exports = { getPharmacistNotifications };
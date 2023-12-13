const mongoose = require('mongoose');
const asyncHandler = require('express-async-handler');
const pharmacistREQsModel = require('../../models/PharmacistRequest');
const pharmacistModel = require('../../models/Pharmacist');


const viewReqPharmacistsInfo = asyncHandler(async (req, res) => {
    // console.log(req.query)
    const pharmacists = await pharmacistREQsModel.find().sort({ createdAt: -1 });


    console.log(pharmacists)


    if (pharmacists) {
        res.status(200).json(pharmacists);
    } else {
        res.status(400).json({ message: 'Requested Pharmacist not found!' });
    }

})
const acceptPharmacist = asyncHandler(async (req, res) => {
    const pharmacistId = req.params.id;
    try {
        // Assuming you have a Mongoose model named "Doctor" representing doctors
        const pharmacist = await pharmacistREQsModel.findByIdAndUpdate(pharmacistId, { status: 'accepted' }, { new: true });
        const newPharmacist = await pharmacistModel.create({
            username: pharmacist.username,
            name: pharmacist.name,
            email: pharmacist.email,
            password: pharmacist.password,
            dob: pharmacist.dob,
            hourly_rate: pharmacist.hourly_rate,
            affiliation: pharmacist.affiliation,
            educational_background: pharmacist.educational_background,
            nationalID:pharmacist.nationalID,
            workingLicense:pharmacist.workingLicense,
            pharmacyDegree:pharmacist.pharmacyDegree
        })

        if (!pharmacist) {
            return res.status(404).json({ message: 'Pharmacist not found' });
        }

        return res.status(200).json({ message: 'Pharmacist request accepted successfully', pharmacist });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ message: 'An error occurred while accepting the request of the pharmacist' });
    }
})

const rejectPharmacist = asyncHandler(async (req, res) => {
    const pharmacistId = req.params.id;
    try {
        // Assuming you have a Mongoose model named "Doctor" representing doctors
        const pharmacist = await pharmacistREQsModel.findByIdAndUpdate(pharmacistId, { status: 'rejected' }, { new: true });

        if (!pharmacist) {
            return res.status(404).json({ message: 'Pharmacist not found' });
        }

        return res.status(200).json({ message: 'Pharmacist request is rejected successfully', pharmacist });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ message: 'An error occurred while accepting the request of the pharmacist' });
    }


});

module.exports = { viewReqPharmacistsInfo, acceptPharmacist, rejectPharmacist };
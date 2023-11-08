const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const asyncHandler = require('express-async-handler');
const patientModel = require('../../models/Patient.js');
const pharmacistModel = require('../../models/Pharmacist.js');
const adminModel = require('../../models/Admin.js');

const updatePassword = asyncHandler(async (req, res) => {
    const username = req.body.username;
    const currentPassword = req.query.currentPassword;
    const newPassword = req.query.newPassword;

    if (username === undefined) {
        return res.status(400).json({ message: 'Please enter a username', changePassword: false });
    }

    if (currentPassword === undefined) {
        return res.status(400).json({ message: 'Please enter the current password', changePassword: false});
    }

    if (newPassword === undefined) {
        return res.status(400).json({ message: 'Please enter the new password', changePassword: false});
    }

    const patientResults = await patientModel.find({username: username});
    const pharmacistResults = await pharmacistModel.find({username: username});
    const adminResults = await adminModel.find({username: username});
    let userType = null;
    let user = null;

    if ((patientResults.length != 0 && pharmacistResults.length != 0) || (patientResults.length != 0 && adminResults.length != 0) || (pharmacistResults.length != 0 && adminResults.length != 0)) {
        return res.status(400).json({ message: 'Username is not unique', changePassword: false});
    }
    if (patientResults.length != 0) {
        user = patientResults[0];
        userType = 'patient';
    }
    else if (pharmacistResults.length != 0) {
        user = pharmacistResults[0];
        userType = 'pharmacist';
    }
    else if (adminResults.length != 0) {
        user = adminResults[0];
        userType = 'admin';
    }
    else {
        return res.status(404).json({ message: 'User is not found', changePassword: false});
    }

    // hash the current password entered by the user and compare it with the password stored in the database
    const passwordCorrect = await bcrypt.compare(currentPassword, user.password);

    // hashed current password entered does not match the password stored in the database
    if (!passwordCorrect) {
        return res.status(400).json({message: 'Current password is incorrect', changePassword: false});
    }
    else {
        const hashedNewPassword = await bcrypt.hash(newPassword, 10); // hash the new password
        if (newPassword === currentPassword) {
            return res.status(400).json({message: 'Current password can not be same as the new password', changedPassword: false});
        }
        else {
            if (userType === 'patient') {
                await patientModel.findOneAndUpdate({username: username}, {password: hashedNewPassword}); // update the patient's password
            }
            else if (userType === 'doctor') {
                await pharmacistModel.findOneAndUpdate({username: username}, {password: hashedNewPassword}); // update the pharmacist's password
            }
            else if (userType === 'admin') {
                await adminModel.findOneAndUpdate({username: username}, {password: hashedNewPassword}); // update the admin's password
            }
            
            return res.status(200).json({message: 'Password is changed successfully', changePassword: true});
        }
    }
});

module.exports = { updatePassword };
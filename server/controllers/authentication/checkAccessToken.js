const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv').config();
const patientModel = require('../../models/Patient');
const pharmacistModel = require('../../models/Pharmacist');
const adminModel = require('../../models/Admin');
const asyncHandler = require('express-async-handler');

const checkAccessToken = asyncHandler( async (req, res) => {
    const authHeader = req.headers['authorization'];
    const accessToken = authHeader && authHeader.split(' ')[1];
    const userType = req.headers['user-type'];
    
    if (accessToken == null) return res.status(401).json({ message: "No access token provided" });

    jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET, async (err, decoded) => {
        if (err) return res.status(403).json({ message: "Invalid access token" });
        const username = decoded.username;

        if (userType === 'patient') {
            const patient = await patientModel.find({username: username});

            if (patient.length === 0) return res.status(400).json({ message: "User does not exist" })
            else return res.status(200).json({ message: "Success", username: decoded.username });
        }
        else if (userType === 'pharmacist') {
            const pharmacist = await pharmacistModel.find({username: username});

            if (pharmacist.length === 0) return res.status(400).json({ message: "User does not exist" })
            else return res.status(200).json({ message: "Success", username: decoded.username });
        }
        else if (userType === 'admin') {
            const admin = await adminModel.find({username: username});

            if (admin.length === 0) return res.status(400).json({ message: "User does not exist" })
            else return res.status(200).json({ message: "Success", username: decoded.username });
        }
        else {
            return res.status(400).json({ message: "Invalid user type" });
        }
    })
});

module.exports = {checkAccessToken};
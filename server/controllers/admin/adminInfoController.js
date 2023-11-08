const mongoose = require('mongoose');
const asyncHandler = require('express-async-handler');
const adminModel = require('../../models/Admin.js');

const getAdminInfo = asyncHandler(async (req, res) => {
    const username = req.body.username;

    if (username === undefined) {
        return res.status(400).json({ message: 'Please enter a username',  admin: null, found: false });
    }

    const admin = await adminModel.find({username: username});

    if (!admin) {
        return res.status(404).json({message: 'Admin not found', admin: null, found: false});
    }
    else {
        return res.status(200).json({message: 'Admin found', admin: admin, found: true});
    }
})

module.exports = { getAdminInfo };
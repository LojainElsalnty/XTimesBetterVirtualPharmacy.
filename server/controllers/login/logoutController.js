const mongoose = require('mongoose');
const asyncHandler = require('express-async-handler');
const refreshtokenModel = require('../../models/RefreshToken');

const logoutUser = asyncHandler( async (req, res) => {
    const refreshToken = req.query.refreshToken;
    if (refreshToken === null) return res.status(401).json({ message: "No refresh token provided", loggingOut: false});
    const storedRefreshToken =  await refreshtokenModel.findOne({token: refreshToken});
    if (!storedRefreshToken) return res.status(401).json({ message: "Invalid refresh token", loggingOut: false});
    await refreshtokenModel.deleteOne({token: refreshToken});
    return res.status(204).json({message: "Success", loggingOut: true});
})

module.exports = {logoutUser};
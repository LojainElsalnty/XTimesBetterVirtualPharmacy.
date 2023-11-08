const dotenv = require('dotenv').config();
const jwt = require('jsonwebtoken')
const mongoose = require('mongoose');
const asyncHandler = require('express-async-handler');
const refreshtokenModel = require('../../models/RefreshToken');

const changeAccessToken = asyncHandler ( async (req, res) => {
    const refreshToken = req.body.refreshToken;
    if (refreshToken === null) return res.status(401).json({ message: "No refresh token provided" });
    const storedRefreshToken = refreshtokenModel.findOne({token: refreshToken});
    if (storedRefreshToken === null) return res.status(403).json({ message: "Invalid refresh token" });
    jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, async (err, decoded) => {
        if (err) return res.status(403).json({ message: "Invalid refresh token" });

        let username = decoded.username;
        const newAccessToken = await generateAccessToken({ name: username });
        return res.status(200).json({ message: "Success", accessToken: "Bearer " + newAccessToken });
    })
});

async function generateAccessToken(username) {
    const payload = {
        username: username,
    }
        
    return await jwt.sign(payload,  process.env.ACCESS_TOKEN_SECRET);
}

module.exports = { changeAccessToken };
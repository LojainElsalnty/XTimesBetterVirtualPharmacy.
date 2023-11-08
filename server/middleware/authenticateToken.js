const jwt = require('jsonwebtoken');
const dotenv = require('dotenv').config();
const asyncHandler = require('express-async-handler');

const authenticateToken = asyncHandler( async (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const accessToken = authHeader && authHeader.split(' ')[1];
    
    if (accessToken == null) return res.status(401).json({ message: "No access token provided" });

    jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
        if (err) return res.status(403).json({ message: "Invalid access token" });

        req.body.username = decoded.username;
        next();
    })
});

module.exports = {authenticateToken};
const jwt = require('jsonwebtoken');
const asyncHandler = require('express-async-handler');
const User = require('../models/userModel');

const verifyJWT = asyncHandler(async(req, res, next) => {
    const authHeader = req.headers.authorization || req.headers.Authorization;

    if (!authHeader?.startsWith('Bearer ')) {
        return res.status(401).json({ message: 'Unauthorized.' });
    }

    const token = authHeader.split(' ')[1];

    jwt.verify(
        token,
        process.env.JWT_ACCESS_SECRET,
        (err, decoded) => {
            if (err) return res.status(403).json({ message: 'Forbidden.' });
            req.userId = decoded.UserInfo.userId;
            req.email = decoded.UserInfo.email;
            req.username = decoded.UserInfo.username;
            next();
        }
    );
});


module.exports = verifyJWT;
const jwt = require('jsonwebtoken');
const asyncHandler = require('express-async-handler');
const User = require('../models/userModel');

const generateRefresh = (res, token) =>{
    
    jwt.verify(
        token,
        process.env.JWT_REFRESH_SECRET,
        asyncHandler(async(err, decoded) =>{
            if (err) return res.status(403).json({ message: 'Forbidden' });

            const user = await User.findOne({_id: decoded.userId});

            if (!user) return res.status(401).json({ message: 'Unauthorized' });

            const accessToken = jwt.sign({"UserInfo":{"userId":user._id, "email": user.email, "username":user.username}}, process.env.JWT_ACCESS_SECRET, {expiresIn: '15m'});

            res.json({accessToken});
        })

    );
};

module.exports = generateRefresh;
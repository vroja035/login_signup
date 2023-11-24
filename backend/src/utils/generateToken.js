const jwt = require('jsonwebtoken');

const generateToken = (res, userId, email, username) => {
    
    const accessToken = jwt.sign({"UserInfo":{"userId":userId, "email": email, "username":username}}, process.env.JWT_ACCESS_SECRET, {expiresIn: '15m'});
    const refreshToken = jwt.sign({userId}, process.env.JWT_REFRESH_SECRET, {expiresIn: '7d'});

    res.cookie('jwt', refreshToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV !== 'development',
        sameSite: 'strict',
        maxAge: 7 * 24 * 60 * 60 * 1000
    });

    res.status(201).json({ accessToken })
};

module.exports = generateToken;
const User = require('../models/userModel');
const asyncHandler = require('express-async-handler');
const generateToken = require('../utils/generateToken');
const generateRefresh = require('../utils/generateRefresh');

//@desc Login/Auth user (set token)
//@route POST /api/user/login
//@access Public
const loginUser =  asyncHandler(async(req, res) =>{
    const {email, password} = req.body;

    if (!email || !password){
        return res.status(400).json({message: 'All fields are required.'});
    }
    
    const user = await User.findOne({email});

    if(user && (await user.matchPasswords(password))){
        generateToken(res, user._id, user.email, user.username);
    }else{
        res.status(401);
        throw new Error('Invalid email or password.');
    }
});

//@desc Login/Auth user (refresh token)
//@route GET /api/user/refresh
//@access Public
const refresh = (req, res) => {
    const cookies = req.cookies;

    if (!cookies?.jwt) return res.status(401).json({message:"Unauthorized"});

    const refreshToken = cookies.jwt;

    generateRefresh(res, refreshToken);
};

//@desc Sign up a new user
//@route POST /api/user/signup
//@access Public
const signupUser =  asyncHandler(async(req, res) =>{
    const {email, username, password} = req.body;

    if (!email || !username || !password){
        return res.status(400).json({message: 'All fields are required.'});
    }

    const userExists = await User.findOne({email});

    if (userExists) return res.status(400).json({message: "User already exists."});

    const user = await User.create({email, username, password});

    if(user){
        generateToken(res, user._id);
    }else{
        return res.status(400).json({message: "Invalid user data."});
    }
});

//@desc Logout user
//@route POST /api/user/logout
//@access Public
const logoutUser = asyncHandler(async (req, res) => {
    const cookies = req.cookies;
    if (!cookies?.jwt) return res.sendStatus(204) //No content
    res.clearCookie('jwt', { httpOnly: true, secure: process.env.NODE_ENV !== 'development', sameSite: 'strict',});
    res.status(200).json({ message: 'User logged out.' });
});

//@desc Get user profile
//@route GET /api/user/profile
//@access Private
const getUserProfile = asyncHandler(async (req, res) => {
    const user = await User.findById(req.userId);

    res.status(200).json(user);
});

//@desc Update user profile
//@route PUT /api/user/profile
//@access Private
const updateUserProfile = asyncHandler(async (req, res) => {
    const user = await User.findById(req.user._id);

    if(user){
        user.username = req.body.username || user.username;
        user.email = req.body.email || user.email;

        const updatedUser = await user.save();

        res.status(200).json({
            _id: updatedUser._id,
            emai: updatedUser.email,
            username: updatedUser.username,
        })
    } else {
        res.status(404);
        throw new Error('User not found.')
    }
});

module.exports = { loginUser, refresh, signupUser, logoutUser, getUserProfile, updateUserProfile};
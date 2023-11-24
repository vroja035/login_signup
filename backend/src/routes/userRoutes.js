const express = require('express');

//controller functions
const { loginUser, refresh, signupUser, logoutUser, getUserProfile, updateUserProfile} = require('../controllers/userController');

//authMiddleware
const verifyJWT = require('../middleware/authMiddleware');

const router = express.Router();

//login route
router.post('/login', loginUser);

//refresh route
router.get('/refresh', refresh);

//register route
router.post('/signup', signupUser);

//logout route
router.post('/logout', logoutUser);

//profile route
router.route('/profile').get(verifyJWT, getUserProfile).put(verifyJWT, updateUserProfile);



module.exports = router;
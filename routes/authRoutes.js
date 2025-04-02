const express = require('express');
const router = express.Router();
const {signup,login} = require('../controllers/authcontroller');

// Signup Route
router.post('/signup',signup);

// Login Route
router.post('/login',login);

module.exports = router;

const verifyToken = require('../middleware/authMiddleware');

// Test Protected Route
router.get('/protected',verifyToken,(req,res) => {
    res.json({message:`Hello, your role is ${req.user.role}! You are successfully authenticated.`});
});

const User = require('../models/user');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
// JWT Secret Key (Keep this secret and safe)
const JWT_SECRET = 'mysecretkey';

// User Signup
 async function signup (req, res) {
    try {
        const {username,email,password,role} = req.body;
        
        if (!username || !email || !password || !role) {
            return res.status(400).json({ message: 'All fields are required.' });
        }

        const userExists = await User.findOne({ email });
        if (userExists) {
            return res.status(400).json({ message: 'Email already exists.' });
        }

        const user = new User({ username, email, password, role });
        await user.save();

        res.status(201).json({ message: 'User registered successfully!' });
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};

// User Login
 async function login(req, res) {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({message: 'Email and password are required.'});
        }

        const user = await User.findOne({email});
        if (!user) return res.status(400).json({message:'User not found.'});

        const isMatch = await user.comparePassword(password);
        if (!isMatch) return res.status(400).json({ message: 'Invalid credentials.'});

        const token = jwt.sign({ userId: user._id, role: user.role }, JWT_SECRET, {expiresIn: '1h'});

        res.status(200).json({message: 'Login successful!', token});
    } catch (error) {
        res.status(500).json({message: 'Server error'});
    }
}

module.exports = {signup,login};



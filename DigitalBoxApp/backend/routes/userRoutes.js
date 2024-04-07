// routes/userRoutes.js
// const express = require('express');
// const router = express.Router();
// const User = require('../models/user');

// // User registration endpoint
// router.post('/', async (req, res) => {
//   const { name, userId, password, accountNumber, accountType, phoneNumber, email, panNumber } = req.body;
//   try {
//     // Create a new user document
//     const user = await User.create({ name, userId, password, accountNumber, accountType, phoneNumber, email, panNumber });
//     res.status(201).json({ user });
//   } catch (error) {
//     console.error('Error registering user:', error);
//     res.status(500).json({ error: 'Server error' });
//   }
// });

// module.exports = router;

// routes/loginRoutes.js
const express = require('express');
const router = express.Router();
const User = require('../models/user');

// User login endpoint
router.post('/', async (req, res) => {
    const { userId, password } = req.body;
    try {
        // Find the user by userId
        const user = await User.findOne({ userId });

        // If user not found or password is incorrect, return error response
        if (!user || user.password !== password) {
            return res.status(401).json({ error: 'Invalid username or password' });
        }

        // If credentials are correct, return success response
        res.status(200).json({ message: 'Login successful', user });
    } catch (error) {
        console.error('Error logging in:', error);
        res.status(500).json({ error: 'Server error' });
    }
});

module.exports = router;

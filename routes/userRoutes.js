const express = require('express');
const router = express.Router();

const { registerUser, authenticateUser, getUserById } = require('../controllers/userController');
const { verifyToken } = require('../middlewares/authMiddleware');

// Register
router.post('/register', registerUser);

// Authenticate (Login)
router.post('/authenticate', authenticateUser);

// Get user details (authenticated)
router.get('/:userId', verifyToken, getUserById);

module.exports = router;

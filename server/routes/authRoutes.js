import { Router } from 'express';
// Import controller functions (to be implemented)
import { register, login, logout } from '../controllers/authController.js';
const router = Router();

// Register route
router.post('/register', register);

// Login route
router.post('/login', login);

// Logout route
router.post('/logout', logout);

export default router; 
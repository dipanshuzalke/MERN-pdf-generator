import { Router } from 'express';
// Import controller functions (to be implemented)
import { register, login } from '../controllers/authController.js';
const router = Router();

// Register route
router.post('/register', register);

// Login route
router.post('/login', login);

export default router; 
import { Router } from 'express';
// Import controller function (to be implemented)
import { getUser } from '../controllers/userController.js';
import authenticateToken from '../middleware/authenticateToken.js';
const router = Router();

// Get user info
router.get('/user', authenticateToken, getUser);

export default router; 
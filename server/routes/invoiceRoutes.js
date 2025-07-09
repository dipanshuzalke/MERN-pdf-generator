import { Router } from 'express';
// Import controller functions (to be implemented)
import { createInvoice, getInvoices } from '../controllers/invoiceController.js';
import authenticateToken from '../middleware/authenticateToken.js';
const router = Router();

// Create invoice
router.post('/invoices', authenticateToken, createInvoice);

// Get invoices
router.get('/invoices', authenticateToken, getInvoices);

export default router; 
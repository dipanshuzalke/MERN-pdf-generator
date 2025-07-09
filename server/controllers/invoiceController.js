import Invoice from '../models/Invoice.js';

export const createInvoice = async (req, res) => {
  try {
    const { products, totals } = req.body;
    const invoice = new Invoice({
      userId: req.user.id,
      products,
      totals,
      invoiceNumber: `INV-${Date.now()}`
    });
    await invoice.save();
    res.status(201).json({
      message: 'Invoice generated successfully',
      invoice
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

export const getInvoices = async (req, res) => {
  try {
    const userInvoices = await Invoice.find({ userId: req.user.id });
    res.json(userInvoices);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
}; 
import mongoose from 'mongoose';

const invoiceSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  products: { type: Array, required: true },
  totals: { type: Object, required: true },
  createdAt: { type: Date, default: Date.now },
  invoiceNumber: { type: String, required: true }
});

const Invoice = mongoose.model('Invoice', invoiceSchema);
export default Invoice; 
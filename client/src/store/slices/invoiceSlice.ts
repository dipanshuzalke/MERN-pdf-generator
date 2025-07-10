import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { Product } from './productSlice';

export interface Invoice {
  id: number;
  userId: number;
  products: Product[];
  totals: {
    subtotal: number;
    totalGst: number;
    grandTotal: number;
  };
  createdAt: string;
  invoiceNumber: string;
}

interface InvoiceState {
  invoices: Invoice[];
  isLoading: boolean;
  error: string | null;
}

const initialState: InvoiceState = {
  invoices: [],
  isLoading: false,
  error: null,
};

// Set API base URL depending on environment
const BASE_URL =
  import.meta.env.MODE === 'production'
    ? 'https://mern-pdf-generator.onrender.com/api'
    : '/api';

export const generateInvoice = createAsyncThunk(
  'invoices/generate',
  async (invoiceData: { products: Product[]; totals: any }, { getState }) => {
    const token = (getState() as any).auth.token;
    
    const response = await fetch(`${BASE_URL}/invoices`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(invoiceData),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message);
    }

    return await response.json();
  }
);

export const fetchInvoices = createAsyncThunk(
  'invoices/fetchAll',
  async (_, { getState }) => {
    const token = (getState() as any).auth.token;
    
    const response = await fetch(`${BASE_URL}/invoices`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    if (!response.ok) {
      throw new Error('Failed to fetch invoices');
    }

    return await response.json();
  }
);

const invoiceSlice = createSlice({
  name: 'invoices',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(generateInvoice.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(generateInvoice.fulfilled, (state, action) => {
        state.isLoading = false;
        state.invoices.push(action.payload.invoice);
      })
      .addCase(generateInvoice.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || 'Failed to generate invoice';
      })
      .addCase(fetchInvoices.fulfilled, (state, action) => {
        state.invoices = action.payload;
      });
  },
});

export const { clearError } = invoiceSlice.actions;
export default invoiceSlice.reducer;
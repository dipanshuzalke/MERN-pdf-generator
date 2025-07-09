import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface Product {
  id: string;
  name: string;
  quantity: number;
  rate: number;
  total: number;
  gst: number;
}

interface ProductState {
  products: Product[];
  totals: {
    subtotal: number;
    totalGst: number;
    grandTotal: number;
  };
}

const initialState: ProductState = {
  products: [],
  totals: {
    subtotal: 0,
    totalGst: 0,
    grandTotal: 0,
  },
};

const calculateTotals = (products: Product[]) => {
  const subtotal = products.reduce((sum, product) => sum + product.total, 0);
  const totalGst = products.reduce((sum, product) => sum + product.gst, 0);
  const grandTotal = subtotal + totalGst;

  return { subtotal, totalGst, grandTotal };
};

const productSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    addProduct: (state, action: PayloadAction<Omit<Product, 'id' | 'total' | 'gst'>>) => {
      const { name, quantity, rate } = action.payload;
      const total = quantity * rate;
      const gst = total * 0.18; // 18% GST

      const product: Product = {
        id: Date.now().toString(),
        name,
        quantity,
        rate,
        total,
        gst,
      };

      state.products.push(product);
      state.totals = calculateTotals(state.products);
    },
    updateProduct: (state, action: PayloadAction<Product>) => {
      const index = state.products.findIndex(p => p.id === action.payload.id);
      if (index !== -1) {
        const { name, quantity, rate } = action.payload;
        const total = quantity * rate;
        const gst = total * 0.18;

        state.products[index] = {
          ...action.payload,
          total,
          gst,
        };
        state.totals = calculateTotals(state.products);
      }
    },
    removeProduct: (state, action: PayloadAction<string>) => {
      state.products = state.products.filter(p => p.id !== action.payload);
      state.totals = calculateTotals(state.products);
    },
    clearProducts: (state) => {
      state.products = [];
      state.totals = { subtotal: 0, totalGst: 0, grandTotal: 0 };
    },
  },
});

export const { addProduct, updateProduct, removeProduct, clearProducts } = productSlice.actions;
export default productSlice.reducer;
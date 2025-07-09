import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import productReducer from './slices/productSlice';
import invoiceReducer from './slices/invoiceSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    products: productReducer,
    invoices: invoiceReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
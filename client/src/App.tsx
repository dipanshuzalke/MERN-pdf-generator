import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Provider } from 'react-redux';
import { ThemeProvider } from 'next-themes';
import { Toaster } from 'sonner';
import { store } from '@/store/store';
import { ProtectedRoute } from '@/components/ProtectedRoute';
import { Register } from '@/pages/Register';
import { Login } from '@/pages/Login';
import { Dashboard } from '@/pages/Dashboard';
import { AddProducts } from '@/pages/AddProducts';
import { GenerateInvoice } from '@/pages/GenerateInvoice';
import './App.css';

function App() {
  return (
    <Provider store={store}>
      <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
        <Router>
          <div className="min-h-screen">
            <Routes>
              <Route path="/" element={<Navigate to="/dashboard" replace />} />
              <Route path="/register" element={<Register />} />
              <Route path="/login" element={<Login />} />
              <Route
                path="/dashboard"
                element={
                  <ProtectedRoute>
                    <Dashboard />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/add-products"
                element={
                  <ProtectedRoute>
                    <AddProducts />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/generate-invoice"
                element={
                  <ProtectedRoute>
                    <GenerateInvoice />
                  </ProtectedRoute>
                }
              />
            </Routes>
          </div>
        </Router>
        <Toaster position="top-right" />
      </ThemeProvider>
    </Provider>
  );
}

export default App;
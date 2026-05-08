import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import { CartProvider } from './context/CartContext';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Products from './pages/Products';
import ProductDetail from './pages/ProductDetail';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import Orders from './pages/Orders';
import AdminDashboard from './pages/AdminDashboard';
import AdminProducts from './pages/AdminProducts';
import AdminOrders from './pages/AdminOrders';
import AdminUsers from './pages/AdminUsers';
import './index.css';

const PrivateRoute = ({ children }) => {
  const { user } = useAuth();
  return user ? children : <Navigate to="/login" />;
};

const AdminRoute = ({ children }) => {
  const { user, isAdmin } = useAuth();
  if (!user) return <Navigate to="/login" />;
  if (!isAdmin) return <Navigate to="/" />;
  return children;
};

const NoNavbarLayout = ({ children }) => <>{children}</>;
const WithNavbarLayout = ({ children }) => (
  <>
    <Navbar />
    {children}
  </>
);

function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Auth pages - no navbar */}
        <Route path="/login" element={<NoNavbarLayout><Login /></NoNavbarLayout>} />
        <Route path="/register" element={<NoNavbarLayout><Register /></NoNavbarLayout>} />

        {/* Public pages */}
        <Route path="/" element={<WithNavbarLayout><Home /></WithNavbarLayout>} />
        <Route path="/products" element={<WithNavbarLayout><Products /></WithNavbarLayout>} />
        <Route path="/products/:id" element={<WithNavbarLayout><ProductDetail /></WithNavbarLayout>} />

        {/* Protected user pages */}
        <Route path="/cart" element={<WithNavbarLayout><PrivateRoute><Cart /></PrivateRoute></WithNavbarLayout>} />
        <Route path="/checkout" element={<WithNavbarLayout><PrivateRoute><Checkout /></PrivateRoute></WithNavbarLayout>} />
        <Route path="/orders" element={<WithNavbarLayout><PrivateRoute><Orders /></PrivateRoute></WithNavbarLayout>} />

        {/* Admin pages - no extra navbar (sidebar layout) */}
        <Route path="/admin" element={<AdminRoute><AdminDashboard /></AdminRoute>} />
        <Route path="/admin/products" element={<AdminRoute><AdminProducts /></AdminRoute>} />
        <Route path="/admin/orders" element={<AdminRoute><AdminOrders /></AdminRoute>} />
        <Route path="/admin/users" element={<AdminRoute><AdminUsers /></AdminRoute>} />

        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </BrowserRouter>
  );
}

function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <AppRoutes />
      </CartProvider>
    </AuthProvider>
  );
}

export default App;

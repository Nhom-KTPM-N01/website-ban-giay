// Presentation Layer (API) - Routes
const express = require('express');
const router = express.Router();
const { authenticate, isAdmin } = require('../middleware/auth');
const { register, login, getProfile } = require('../controllers/authController');
const { getProducts, getProduct, createProduct, updateProduct, deleteProduct } = require('../controllers/productController');
const { getCart, addToCart, updateCart, removeFromCart } = require('../controllers/cartController');
const { createOrder, getUserOrders, getAllOrders, updateOrderStatus } = require('../controllers/orderController');
const { getBrands, createBrand, getAllUsers, deleteUser, getDashboardStats } = require('../controllers/adminController');

// Auth routes
router.post('/auth/register', register);
router.post('/auth/login', login);
router.get('/auth/profile', authenticate, getProfile);

// Product routes (public)
router.get('/products', getProducts);
router.get('/products/:id', getProduct);

// Product routes (admin)
router.post('/products', authenticate, isAdmin, createProduct);
router.put('/products/:id', authenticate, isAdmin, updateProduct);
router.delete('/products/:id', authenticate, isAdmin, deleteProduct);

// Brand routes
router.get('/brands', getBrands);
router.post('/brands', authenticate, isAdmin, createBrand);

// Cart routes (auth required)
router.get('/cart', authenticate, getCart);
router.post('/cart', authenticate, addToCart);
router.put('/cart/:id', authenticate, updateCart);
router.delete('/cart/:id', authenticate, removeFromCart);

// Order routes
router.post('/orders', authenticate, createOrder);
router.get('/orders/my', authenticate, getUserOrders);
router.get('/orders', authenticate, isAdmin, getAllOrders);
router.put('/orders/:id/status', authenticate, isAdmin, updateOrderStatus);

// Admin routes
router.get('/admin/users', authenticate, isAdmin, getAllUsers);
router.delete('/admin/users/:id', authenticate, isAdmin, deleteUser);
router.get('/admin/stats', authenticate, isAdmin, getDashboardStats);

module.exports = router;

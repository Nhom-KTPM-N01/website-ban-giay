const router = require('express').Router();
const { authenticate, isAdmin } = require('../middleware/auth');
const { createOrder, getUserOrders, getAllOrders, updateOrderStatus, getDashboardStats, getRevenueByDay, getRevenueByMonth, getTopProducts } = require('../controllers/orderController');

router.post('/', authenticate, createOrder);
router.get('/my', authenticate, getUserOrders);
router.get('/admin/all', authenticate, isAdmin, getAllOrders);
router.put('/:id/status', authenticate, isAdmin, updateOrderStatus);
router.get('/admin/stats', authenticate, isAdmin, getDashboardStats);
router.get('/admin/revenue-by-day', authenticate, isAdmin, getRevenueByDay);
router.get('/admin/revenue-by-month', authenticate, isAdmin, getRevenueByMonth);
router.get('/admin/top-products', authenticate, isAdmin, getTopProducts);

module.exports = router;

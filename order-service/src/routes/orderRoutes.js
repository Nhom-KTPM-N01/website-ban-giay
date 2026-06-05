const router = require('express').Router();
const { authenticate, isAdmin } = require('../middleware/auth');
const { createOrder, getUserOrders, getAllOrders, updateOrderStatus, getDashboardStats } = require('../controllers/orderController');

router.post('/', authenticate, createOrder);
router.get('/my', authenticate, getUserOrders);
router.get('/admin/all', authenticate, isAdmin, getAllOrders);
router.put('/:id/status', authenticate, isAdmin, updateOrderStatus);
router.get('/admin/stats', authenticate, isAdmin, getDashboardStats);

module.exports = router;

const { pool } = require('../config/database');
const axios = require('axios');
require('dotenv').config();

const CART_URL = process.env.CART_SERVICE_URL || 'http://localhost:5004';
const PRODUCT_URL = process.env.PRODUCT_SERVICE_URL || 'http://localhost:5003';

const createOrder = async (req, res) => {
  const conn = await pool.getConnection();
  try {
    await conn.beginTransaction();
    const { shipping_address, phone, note } = req.body;
    if (!shipping_address) return res.status(400).json({ success: false, message: 'Vui lòng nhập địa chỉ giao hàng.' });

    // Get cart from cart-service
    const cartRes = await axios.get(`${CART_URL}/api/cart/internal/${req.user.id}`);
    const cartItems = cartRes.data.cart;
    if (!cartItems || cartItems.length === 0) {
      await conn.rollback();
      return res.status(400).json({ success: false, message: 'Giỏ hàng trống.' });
    }

    const totalAmount = cartItems.reduce((sum, item) => sum + parseFloat(item.product_price) * item.quantity, 0);

    const [orderResult] = await conn.query(
      'INSERT INTO orders (user_id, user_name, user_email, total_amount, shipping_address, phone, note) VALUES (?, ?, ?, ?, ?, ?, ?)',
      [req.user.id, req.user.name || '', req.user.email, totalAmount, shipping_address, phone, note]
    );
    const orderId = orderResult.insertId;

    for (const item of cartItems) {
      await conn.query(
        'INSERT INTO order_items (order_id, product_id, product_name, product_image, quantity, size, price) VALUES (?, ?, ?, ?, ?, ?, ?)',
        [orderId, item.product_id, item.product_name, item.product_image, item.quantity, item.size, item.product_price]
      );
    }

    // Decrease stock in product-service
    await axios.post(`${PRODUCT_URL}/api/products/decrease-stock`, {
      items: cartItems.map(i => ({ product_id: i.product_id, size: i.size, quantity: i.quantity }))
    });

    // Clear cart
    await axios.delete(`${CART_URL}/api/cart/internal/${req.user.id}/clear`);

    await conn.commit();
    res.status(201).json({ success: true, message: 'Đặt hàng thành công!', orderId });
  } catch (err) {
    await conn.rollback();
    res.status(500).json({ success: false, message: err.message });
  } finally { conn.release(); }
};

const getUserOrders = async (req, res) => {
  try {
    const [orders] = await pool.query('SELECT * FROM orders WHERE user_id = ? ORDER BY created_at DESC', [req.user.id]);
    for (const order of orders) {
      const [items] = await pool.query('SELECT * FROM order_items WHERE order_id = ?', [order.id]);
      order.items = items;
    }
    res.json({ success: true, orders });
  } catch (err) { res.status(500).json({ success: false, message: err.message }); }
};

const getAllOrders = async (req, res) => {
  try {
    const [orders] = await pool.query('SELECT * FROM orders ORDER BY created_at DESC');
    for (const order of orders) {
      const [items] = await pool.query('SELECT * FROM order_items WHERE order_id = ?', [order.id]);
      order.items = items;
    }
    res.json({ success: true, orders });
  } catch (err) { res.status(500).json({ success: false, message: err.message }); }
};

const updateOrderStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const validStatuses = ['pending', 'confirmed', 'shipping', 'delivered', 'cancelled'];
    if (!validStatuses.includes(status)) return res.status(400).json({ success: false, message: 'Trạng thái không hợp lệ.' });
    await pool.query('UPDATE orders SET status = ? WHERE id = ?', [status, req.params.id]);
    res.json({ success: true, message: 'Cập nhật trạng thái đơn hàng thành công!' });
  } catch (err) { res.status(500).json({ success: false, message: err.message }); }
};

const getDashboardStats = async (req, res) => {
  try {
    const [[{ totalOrders }]] = await pool.query('SELECT COUNT(*) as totalOrders FROM orders');
    const [[{ totalRevenue }]] = await pool.query("SELECT COALESCE(SUM(total_amount),0) as totalRevenue FROM orders WHERE status != 'cancelled'");
    const [[{ pendingOrders }]] = await pool.query("SELECT COUNT(*) as pendingOrders FROM orders WHERE status = 'pending'");
    const [recentOrders] = await pool.query('SELECT * FROM orders ORDER BY created_at DESC LIMIT 5');
    res.json({ success: true, stats: { totalOrders, totalRevenue, pendingOrders }, recentOrders });
  } catch (err) { res.status(500).json({ success: false, message: err.message }); }
};

module.exports = { createOrder, getUserOrders, getAllOrders, updateOrderStatus, getDashboardStats };

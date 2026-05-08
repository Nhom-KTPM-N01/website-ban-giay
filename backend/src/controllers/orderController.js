// Business Logic Layer - Order Controller
const { pool } = require('../config/database');

// Create order
const createOrder = async (req, res) => {
  const conn = await pool.getConnection();
  try {
    await conn.beginTransaction();
    const { shipping_address, phone, note } = req.body;

    const [cartItems] = await conn.query(
      `SELECT c.*, p.price, p.stock, p.name FROM cart c 
       JOIN products p ON c.product_id = p.id 
       WHERE c.user_id = ?`,
      [req.user.id]
    );

    if (cartItems.length === 0) {
      await conn.rollback();
      return res.status(400).json({ success: false, message: 'Giỏ hàng trống.' });
    }

    const totalAmount = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

    const [orderResult] = await conn.query(
      'INSERT INTO orders (user_id, total_amount, shipping_address, phone, note) VALUES (?, ?, ?, ?, ?)',
      [req.user.id, totalAmount, shipping_address, phone, note]
    );

    const orderId = orderResult.insertId;

    for (const item of cartItems) {
      await conn.query(
        'INSERT INTO order_items (order_id, product_id, quantity, size, price) VALUES (?, ?, ?, ?, ?)',
        [orderId, item.product_id, item.quantity, item.size, item.price]
      );
      await conn.query('UPDATE products SET stock = stock - ? WHERE id = ?', [item.quantity, item.product_id]);
    }

    await conn.query('DELETE FROM cart WHERE user_id = ?', [req.user.id]);

    await conn.commit();
    res.status(201).json({ success: true, message: 'Đặt hàng thành công!', orderId });
  } catch (err) {
    await conn.rollback();
    res.status(500).json({ success: false, message: 'Lỗi server: ' + err.message });
  } finally {
    conn.release();
  }
};

// Get user orders
const getUserOrders = async (req, res) => {
  try {
    const [orders] = await pool.query(
      'SELECT * FROM orders WHERE user_id = ? ORDER BY created_at DESC',
      [req.user.id]
    );

    for (let order of orders) {
      const [items] = await pool.query(
        `SELECT oi.*, p.name, p.image_url FROM order_items oi 
         JOIN products p ON oi.product_id = p.id 
         WHERE oi.order_id = ?`,
        [order.id]
      );
      order.items = items;
    }

    res.json({ success: true, orders });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Lỗi server: ' + err.message });
  }
};

// Get all orders (Admin)
const getAllOrders = async (req, res) => {
  try {
    const [orders] = await pool.query(
      `SELECT o.*, u.name as user_name, u.email FROM orders o 
       JOIN users u ON o.user_id = u.id 
       ORDER BY o.created_at DESC`
    );

    for (let order of orders) {
      const [items] = await pool.query(
        `SELECT oi.*, p.name, p.image_url FROM order_items oi 
         JOIN products p ON oi.product_id = p.id WHERE oi.order_id = ?`,
        [order.id]
      );
      order.items = items;
    }

    res.json({ success: true, orders });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Lỗi server: ' + err.message });
  }
};

// Update order status (Admin)
const updateOrderStatus = async (req, res) => {
  try {
    const { status } = req.body;
    await pool.query('UPDATE orders SET status = ? WHERE id = ?', [status, req.params.id]);
    res.json({ success: true, message: 'Cập nhật trạng thái đơn hàng thành công!' });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Lỗi server: ' + err.message });
  }
};

module.exports = { createOrder, getUserOrders, getAllOrders, updateOrderStatus };

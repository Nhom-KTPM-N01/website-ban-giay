// Business Logic Layer - Cart Controller
const { pool } = require('../config/database');

// Get cart
const getCart = async (req, res) => {
  try {
    const [items] = await pool.query(
      `SELECT c.*, p.name, p.price, p.image_url, p.stock, b.name as brand_name 
       FROM cart c 
       JOIN products p ON c.product_id = p.id 
       LEFT JOIN brands b ON p.brand_id = b.id
       WHERE c.user_id = ?`,
      [req.user.id]
    );
    res.json({ success: true, cart: items });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Lỗi server: ' + err.message });
  }
};

// Add to cart
const addToCart = async (req, res) => {
  try {
    const { product_id, quantity = 1, size } = req.body;

    const [product] = await pool.query('SELECT * FROM products WHERE id = ?', [product_id]);
    if (product.length === 0) {
      return res.status(404).json({ success: false, message: 'Sản phẩm không tồn tại.' });
    }

    const [existing] = await pool.query(
      'SELECT * FROM cart WHERE user_id = ? AND product_id = ? AND size = ?',
      [req.user.id, product_id, size]
    );

    if (existing.length > 0) {
      await pool.query(
        'UPDATE cart SET quantity = quantity + ? WHERE user_id = ? AND product_id = ? AND size = ?',
        [quantity, req.user.id, product_id, size]
      );
    } else {
      await pool.query(
        'INSERT INTO cart (user_id, product_id, quantity, size) VALUES (?, ?, ?, ?)',
        [req.user.id, product_id, quantity, size]
      );
    }

    res.json({ success: true, message: 'Đã thêm vào giỏ hàng!' });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Lỗi server: ' + err.message });
  }
};

// Update cart item
const updateCart = async (req, res) => {
  try {
    const { quantity } = req.body;
    if (quantity < 1) {
      await pool.query('DELETE FROM cart WHERE id = ? AND user_id = ?', [req.params.id, req.user.id]);
      return res.json({ success: true, message: 'Đã xóa khỏi giỏ hàng.' });
    }

    await pool.query('UPDATE cart SET quantity = ? WHERE id = ? AND user_id = ?', [quantity, req.params.id, req.user.id]);
    res.json({ success: true, message: 'Cập nhật giỏ hàng thành công!' });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Lỗi server: ' + err.message });
  }
};

// Remove from cart
const removeFromCart = async (req, res) => {
  try {
    await pool.query('DELETE FROM cart WHERE id = ? AND user_id = ?', [req.params.id, req.user.id]);
    res.json({ success: true, message: 'Đã xóa khỏi giỏ hàng.' });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Lỗi server: ' + err.message });
  }
};

module.exports = { getCart, addToCart, updateCart, removeFromCart };

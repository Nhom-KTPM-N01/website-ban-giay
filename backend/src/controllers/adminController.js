// Business Logic Layer - Brand Controller
const { pool } = require('../config/database');

const getBrands = async (req, res) => {
  try {
    const [brands] = await pool.query('SELECT * FROM brands ORDER BY name');
    res.json({ success: true, brands });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Lỗi server: ' + err.message });
  }
};

const createBrand = async (req, res) => {
  try {
    const { name, logo_url } = req.body;
    const [result] = await pool.query('INSERT INTO brands (name, logo_url) VALUES (?, ?)', [name, logo_url]);
    res.status(201).json({ success: true, message: 'Thêm hãng thành công!', id: result.insertId });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Lỗi server: ' + err.message });
  }
};

// Admin - Get all users
const getAllUsers = async (req, res) => {
  try {
    const [users] = await pool.query('SELECT id, name, email, role, phone, created_at FROM users ORDER BY created_at DESC');
    res.json({ success: true, users });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Lỗi server: ' + err.message });
  }
};

const deleteUser = async (req, res) => {
  try {
    if (req.user.id == req.params.id) {
      return res.status(400).json({ success: false, message: 'Không thể xóa tài khoản của chính mình.' });
    }
    await pool.query('DELETE FROM users WHERE id = ?', [req.params.id]);
    res.json({ success: true, message: 'Xóa người dùng thành công!' });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Lỗi server: ' + err.message });
  }
};

// Dashboard stats
const getDashboardStats = async (req, res) => {
  try {
    const [[{ totalProducts }]] = await pool.query('SELECT COUNT(*) as totalProducts FROM products');
    const [[{ totalOrders }]] = await pool.query('SELECT COUNT(*) as totalOrders FROM orders');
    const [[{ totalUsers }]] = await pool.query('SELECT COUNT(*) as totalUsers FROM users WHERE role = "user"');
    const [[{ totalRevenue }]] = await pool.query('SELECT COALESCE(SUM(total_amount),0) as totalRevenue FROM orders WHERE status != "cancelled"');

    res.json({ success: true, stats: { totalProducts, totalOrders, totalUsers, totalRevenue } });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Lỗi server: ' + err.message });
  }
};

module.exports = { getBrands, createBrand, getAllUsers, deleteUser, getDashboardStats };

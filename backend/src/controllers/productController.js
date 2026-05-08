// Business Logic Layer - Product Controller
const { pool } = require('../config/database');

// Get all products with search, filter, pagination
const getProducts = async (req, res) => {
  try {
    const { search, brand_id, min_price, max_price, category, page = 1, limit = 12 } = req.query;
    const offset = (page - 1) * limit;

    let where = [];
    let params = [];

    if (search) {
      where.push('(p.name LIKE ? OR p.description LIKE ?)');
      params.push(`%${search}%`, `%${search}%`);
    }
    if (brand_id) {
      where.push('p.brand_id = ?');
      params.push(brand_id);
    }
    if (min_price) {
      where.push('p.price >= ?');
      params.push(min_price);
    }
    if (max_price) {
      where.push('p.price <= ?');
      params.push(max_price);
    }
    if (category) {
      where.push('p.category = ?');
      params.push(category);
    }

    const whereClause = where.length > 0 ? 'WHERE ' + where.join(' AND ') : '';

    const [products] = await pool.query(
      `SELECT p.*, b.name as brand_name FROM products p 
       LEFT JOIN brands b ON p.brand_id = b.id 
       ${whereClause} 
       ORDER BY p.created_at DESC 
       LIMIT ? OFFSET ?`,
      [...params, parseInt(limit), parseInt(offset)]
    );

    const [countResult] = await pool.query(
      `SELECT COUNT(*) as total FROM products p ${whereClause}`,
      params
    );

    res.json({
      success: true,
      products,
      total: countResult[0].total,
      page: parseInt(page),
      totalPages: Math.ceil(countResult[0].total / limit)
    });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Lỗi server: ' + err.message });
  }
};

// Get single product
const getProduct = async (req, res) => {
  try {
    const [products] = await pool.query(
      'SELECT p.*, b.name as brand_name FROM products p LEFT JOIN brands b ON p.brand_id = b.id WHERE p.id = ?',
      [req.params.id]
    );
    if (products.length === 0) {
      return res.status(404).json({ success: false, message: 'Không tìm thấy sản phẩm.' });
    }
    res.json({ success: true, product: products[0] });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Lỗi server: ' + err.message });
  }
};

// Create product (Admin)
const createProduct = async (req, res) => {
  try {
    const { name, description, price, brand_id, image_url, stock, sizes, category } = req.body;
    if (!name || !price) {
      return res.status(400).json({ success: false, message: 'Tên và giá sản phẩm là bắt buộc.' });
    }

    const [result] = await pool.query(
      'INSERT INTO products (name, description, price, brand_id, image_url, stock, sizes, category) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
      [name, description, price, brand_id || null, image_url, stock || 0, JSON.stringify(sizes || []), category]
    );

    res.status(201).json({ success: true, message: 'Thêm sản phẩm thành công!', id: result.insertId });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Lỗi server: ' + err.message });
  }
};

// Update product (Admin)
const updateProduct = async (req, res) => {
  try {
    const { name, description, price, brand_id, image_url, stock, sizes, category } = req.body;
    const [existing] = await pool.query('SELECT id FROM products WHERE id = ?', [req.params.id]);
    if (existing.length === 0) {
      return res.status(404).json({ success: false, message: 'Không tìm thấy sản phẩm.' });
    }

    await pool.query(
      'UPDATE products SET name=?, description=?, price=?, brand_id=?, image_url=?, stock=?, sizes=?, category=? WHERE id=?',
      [name, description, price, brand_id || null, image_url, stock, JSON.stringify(sizes || []), category, req.params.id]
    );

    res.json({ success: true, message: 'Cập nhật sản phẩm thành công!' });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Lỗi server: ' + err.message });
  }
};

// Delete product (Admin)
const deleteProduct = async (req, res) => {
  try {
    const [existing] = await pool.query('SELECT id FROM products WHERE id = ?', [req.params.id]);
    if (existing.length === 0) {
      return res.status(404).json({ success: false, message: 'Không tìm thấy sản phẩm.' });
    }

    await pool.query('DELETE FROM products WHERE id = ?', [req.params.id]);
    res.json({ success: true, message: 'Xóa sản phẩm thành công!' });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Lỗi server: ' + err.message });
  }
};

module.exports = { getProducts, getProduct, createProduct, updateProduct, deleteProduct };

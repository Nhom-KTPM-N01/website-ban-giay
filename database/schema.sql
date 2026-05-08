-- =============================================
-- SHOE STORE DATABASE SCHEMA
-- =============================================

CREATE DATABASE IF NOT EXISTS shoe_store CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE shoe_store;

-- Users table
CREATE TABLE IF NOT EXISTS users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  email VARCHAR(100) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  role ENUM('user', 'admin') DEFAULT 'user',
  phone VARCHAR(20),
  address TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Brands table
CREATE TABLE IF NOT EXISTS brands (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  logo_url VARCHAR(255),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Products table
CREATE TABLE IF NOT EXISTS products (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(200) NOT NULL,
  description TEXT,
  price DECIMAL(10, 2) NOT NULL,
  brand_id INT,
  image_url VARCHAR(255),
  stock INT DEFAULT 0,
  sizes JSON,
  category VARCHAR(50),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (brand_id) REFERENCES brands(id) ON DELETE SET NULL
);

-- Orders table
CREATE TABLE IF NOT EXISTS orders (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT NOT NULL,
  total_amount DECIMAL(10, 2) NOT NULL,
  status ENUM('pending', 'confirmed', 'shipping', 'delivered', 'cancelled') DEFAULT 'pending',
  shipping_address TEXT NOT NULL,
  phone VARCHAR(20),
  note TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- Order items table
CREATE TABLE IF NOT EXISTS order_items (
  id INT AUTO_INCREMENT PRIMARY KEY,
  order_id INT NOT NULL,
  product_id INT NOT NULL,
  quantity INT NOT NULL,
  size VARCHAR(10),
  price DECIMAL(10, 2) NOT NULL,
  FOREIGN KEY (order_id) REFERENCES orders(id) ON DELETE CASCADE,
  FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE
);

-- Cart table
CREATE TABLE IF NOT EXISTS cart (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT NOT NULL,
  product_id INT NOT NULL,
  quantity INT NOT NULL DEFAULT 1,
  size VARCHAR(10),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
  FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE
);

-- =============================================
-- SEED DATA
-- =============================================

INSERT INTO brands (name, logo_url) VALUES
('Nike', 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a6/Logo_NIKE.svg/1200px-Logo_NIKE.svg.png'),
('Adidas', 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/20/Adidas_Logo.svg/1200px-Adidas_Logo.svg.png'),
('Puma', 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/61/Puma_logo.svg/1280px-Puma_logo.svg.png'),
('Converse', 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/30/Converse_logo.svg/1280px-Converse_logo.svg.png'),
('Vans', 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/91/Vans-logo.svg/1280px-Vans-logo.svg.png');

INSERT INTO products (name, description, price, brand_id, image_url, stock, sizes, category) VALUES
('Nike Air Max 270', 'Giày thể thao Nam phong cách hiện đại với đệm Air Max thoải mái', 2500000, 1, 'https://static.nike.com/a/images/t_PDP_1280_v1/f_auto,q_auto:eco/skwgyqrbfzhu6uyeh0gg/air-max-270-shoes-2V5C4p.png', 50, '["39","40","41","42","43","44"]', 'sneaker'),
('Nike Air Force 1', 'Giày cổ điển biểu tượng, phù hợp mọi phong cách', 2200000, 1, 'https://static.nike.com/a/images/t_PDP_1280_v1/f_auto,q_auto:eco/350f1bb8-d9a5-4168-b3c6-e3a22a87a54c/air-force-1-07-shoes-WrLlWX.png', 40, '["38","39","40","41","42","43"]', 'sneaker'),
('Adidas Ultraboost 22', 'Công nghệ Boost tối ưu cho chạy bộ hiệu suất cao', 3200000, 2, 'https://assets.adidas.com/images/h_840,f_auto,q_auto,fl_lossy,c_fill,g_auto/fbaf991a78bc4896a3e9ad7800abcec6_9366/Ultraboost_22_Shoes_Black_GZ0127_01_standard.jpg', 30, '["40","41","42","43","44","45"]', 'running'),
('Adidas Stan Smith', 'Giày tennis cổ điển, thiết kế đơn giản tinh tế', 1800000, 2, 'https://assets.adidas.com/images/h_840,f_auto,q_auto,fl_lossy,c_fill,g_auto/7ed0855435194229a525aad6009a0497_9366/Stan_Smith_Shoes_White_FX5502_01_standard.jpg', 60, '["37","38","39","40","41","42","43"]', 'classic'),
('Puma RS-X3', 'Thiết kế chunky retro pha lẫn công nghệ hiện đại', 1900000, 3, 'https://images.puma.com/image/upload/f_auto,q_auto,b_rgb:fafafa,w_600,h_600/global/380176/03/sv01/fnd/PNA/fmt/png/RS-X3-Twill-AirMesh-Sneakers', 25, '["39","40","41","42","43"]', 'lifestyle'),
('Converse Chuck Taylor All Star', 'Giày canvas cổ điển vượt thời gian', 1200000, 4, 'https://www.converse.com/dw/image/v2/BCZC_PRD/on/demandware.static/-/Sites-cnv-master-catalog/default/dwa2af1a7a/images/a_107/M9160_A_107X1.jpg', 80, '["36","37","38","39","40","41","42","43","44"]', 'classic'),
('Vans Old Skool', 'Giày skate huyền thoại với sọc Side Stripe đặc trưng', 1400000, 5, 'https://images.vans.com/is/image/Vans/VN000D3HY28-HERO?$SCALE-WITH-DPR$', 45, '["37","38","39","40","41","42","43"]', 'skate'),
('Nike React Infinity Run', 'Giày chạy bộ với đệm React mềm mại, hỗ trợ tối ưu', 2800000, 1, 'https://static.nike.com/a/images/t_PDP_1280_v1/f_auto,q_auto:eco/i1-92cc2da2-5bc8-4cbb-9eed-57e5dee41c44/react-infinity-run-flyknit-3-road-running-shoes-1LhvMN.png', 35, '["39","40","41","42","43","44"]', 'running'),
('Adidas NMD R1', 'Street style hiện đại với Boost cushioning', 2600000, 2, 'https://assets.adidas.com/images/h_840,f_auto,q_auto,fl_lossy,c_fill,g_auto/dda1a13b3de74dedb52eabb60126e01d_9366/NMD_R1_Shoes_Black_GZ9256_01_standard.jpg', 20, '["39","40","41","42","43"]', 'lifestyle'),
('Puma Suede Classic XXI', 'Suede kinh điển đã tồn tại hơn 50 năm', 1600000, 3, 'https://images.puma.com/image/upload/f_auto,q_auto,b_rgb:fafafa,w_600,h_600/global/374915/01/sv01/fnd/PNA/fmt/png/Suede-Classic-XXI-Sneakers', 55, '["38","39","40","41","42","43"]', 'classic');

-- Default admin account (password: admin123)
INSERT INTO users (name, email, password, role) VALUES
('Admin', 'admin@shoestore.com', '$2b$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'admin');

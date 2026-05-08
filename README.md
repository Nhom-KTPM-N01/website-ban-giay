# 👟 KickZone - Shoe Store App

## Kiến Trúc 3 Tầng (3-Layer Architecture)

```
┌─────────────────────────────────────────────┐
│   PRESENTATION LAYER (Frontend - React)      │
│   - Giao diện người dùng                    │
│   - React Router, Context API               │
│   - Port: 3000                              │
└─────────────────┬───────────────────────────┘
                  │  HTTP REST API
┌─────────────────▼───────────────────────────┐
│   BUSINESS LOGIC LAYER (Backend - Node.js)  │
│   - Express.js API Server                   │
│   - JWT Authentication                      │
│   - Controllers & Middleware                │
│   - Port: 5000                              │
└─────────────────┬───────────────────────────┘
                  │  MySQL2 Driver
┌─────────────────▼───────────────────────────┐
│   DATA ACCESS LAYER (Database - MySQL)      │
│   - MySQL Database                          │
│   - Tables: users, products, brands,        │
│     orders, order_items, cart               │
└─────────────────────────────────────────────┘
```

## Cấu Trúc Thư Mục

```
shoe-store/
├── database/
│   └── schema.sql          ← Script tạo database
├── backend/
│   ├── src/
│   │   ├── config/
│   │   │   └── database.js ← Kết nối MySQL
│   │   ├── middleware/
│   │   │   └── auth.js     ← JWT middleware
│   │   ├── controllers/    ← Business Logic
│   │   │   ├── authController.js
│   │   │   ├── productController.js
│   │   │   ├── cartController.js
│   │   │   ├── orderController.js
│   │   │   └── adminController.js
│   │   ├── routes/
│   │   │   └── index.js    ← API Routes
│   │   └── server.js       ← Entry point
│   ├── .env
│   └── package.json
└── frontend/
    ├── public/
    │   └── index.html
    ├── src/
    │   ├── components/
    │   │   └── Navbar.js
    │   ├── context/
    │   │   ├── AuthContext.js
    │   │   └── CartContext.js
    │   ├── pages/
    │   │   ├── Home.js
    │   │   ├── Login.js
    │   │   ├── Register.js
    │   │   ├── Products.js      ← Danh sách + tìm kiếm + lọc
    │   │   ├── ProductDetail.js ← Chi tiết sản phẩm
    │   │   ├── Cart.js          ← Giỏ hàng
    │   │   ├── Checkout.js      ← Đặt hàng
    │   │   ├── Orders.js        ← Lịch sử đơn hàng
    │   │   ├── AdminDashboard.js
    │   │   ├── AdminProducts.js ← CRUD sản phẩm
    │   │   ├── AdminOrders.js   ← Quản lý đơn hàng
    │   │   └── AdminUsers.js    ← Quản lý users
    │   ├── services/
    │   │   └── api.js           ← Service Layer (Axios)
    │   ├── App.js
    │   ├── index.js
    │   └── index.css
    └── package.json
```

## Hướng Dẫn Cài Đặt

### Bước 1: Cài MySQL và tạo database

```bash
# Đăng nhập MySQL
mysql -u root -p

# Chạy script tạo database
source /đường/dẫn/shoe-store/database/schema.sql
```

### Bước 2: Cài đặt Backend

```bash
cd shoe-store/backend

# Cài dependencies
npm install

# Cấu hình .env (chỉnh DB_PASSWORD phù hợp)
# Mở file .env và đổi DB_PASSWORD=your_mysql_password

# Chạy server
npm run dev
# Server chạy tại http://localhost:5000
```

### Bước 3: Cài đặt Frontend

```bash
cd shoe-store/frontend

# Cài dependencies
npm install

# Chạy ứng dụng
npm start
# Mở trình duyệt tại http://localhost:3000
```

## Tài Khoản Demo

| Vai trò | Email | Mật khẩu |
|---------|-------|----------|
| Admin | admin@shoestore.com | admin123 |
| User | Tự đăng ký | Tự tạo |

## Tính Năng

### User
- ✅ Đăng ký / Đăng nhập (JWT)
- ✅ Xem danh sách sản phẩm
- ✅ Tìm kiếm sản phẩm
- ✅ Lọc theo hãng / danh mục / giá
- ✅ Xem chi tiết sản phẩm + chọn size
- ✅ Thêm vào giỏ hàng
- ✅ Cập nhật số lượng / xóa khỏi giỏ
- ✅ Đặt hàng (COD)
- ✅ Xem lịch sử đơn hàng

### Admin
- ✅ Dashboard thống kê
- ✅ CRUD sản phẩm (Thêm / Sửa / Xóa / Xem)
- ✅ Quản lý đơn hàng + cập nhật trạng thái
- ✅ Quản lý người dùng

## API Endpoints

```
POST   /api/auth/register
POST   /api/auth/login
GET    /api/auth/profile

GET    /api/products          ?search=&brand_id=&min_price=&max_price=&category=&page=
GET    /api/products/:id
POST   /api/products          [Admin]
PUT    /api/products/:id      [Admin]
DELETE /api/products/:id      [Admin]

GET    /api/brands
GET    /api/cart              [Auth]
POST   /api/cart              [Auth]
PUT    /api/cart/:id          [Auth]
DELETE /api/cart/:id          [Auth]

POST   /api/orders            [Auth]
GET    /api/orders/my         [Auth]
GET    /api/orders            [Admin]
PUT    /api/orders/:id/status [Admin]

GET    /api/admin/users       [Admin]
DELETE /api/admin/users/:id   [Admin]
GET    /api/admin/stats       [Admin]
```

## Công Nghệ Sử Dụng

| Layer | Công nghệ |
|-------|-----------|
| Frontend | React 18, React Router 6, Axios, Context API |
| Backend | Node.js, Express.js, JWT, bcryptjs |
| Database | MySQL 8, mysql2 |
| Auth | JSON Web Token (JWT) |
| Styling | CSS thuần (Custom Design System) |

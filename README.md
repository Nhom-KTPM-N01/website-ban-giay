<<<<<<< HEAD
# 👟 KickZone Microservices

## Kiến trúc hệ thống

```
                    ┌──────────────────┐
   Browser ─────► │  API Gateway     │ :8000
                   └────────┬─────────┘
          ┌─────────────────┼─────────────────────┐
          ▼                 ▼                     ▼
    ┌──────────┐    ┌──────────────┐    ┌──────────────┐
    │  Auth    │    │   Product    │    │    Cart      │
    │ Service  │    │   Service    │    │   Service    │
    │  :5001   │    │    :5003     │    │    :5004     │
    │  DB_Auth │    │  DB_Product  │    │   DB_Cart    │
    └──────────┘    └──────────────┘    └──────────────┘
          │                                     │
    ┌──────────┐                       ┌──────────────┐
    │ Profile  │                       │    Order     │
    │ Service  │                       │   Service    │
    │  :5002   │                       │    :5005     │
    │ DB_Prof  │                       │   DB_Order   │
    └──────────┘                       └──────────────┘
```

## Services

| Service | Port | Database | Mô tả |
|---------|------|----------|-------|
| API Gateway | 8000 | — | Proxy + Auth middleware |
| Auth Service | 5001 | db_auth | Đăng ký, đăng nhập, JWT |
| Profile Service | 5002 | db_profile | Thông tin cá nhân |
| Product Service | 5003 | db_product | Sản phẩm + Kho + Brand + Category |
| Cart Service | 5004 | db_cart | Giỏ hàng |
| Order Service | 5005 | db_order | Đơn hàng |
| Frontend | 3000 | — | React app |

## Cài đặt & Chạy

### 1. Tạo databases

```sql
-- Chạy lần lượt trong MySQL:
source database/01_auth_db.sql
source database/02_profile_db.sql
source database/03_product_db.sql
source database/04_cart_db.sql
source database/05_order_db.sql
```

### 2. Cập nhật .env

Mở từng file `.env` trong mỗi service, sửa `DB_PASSWORD=your_mysql_password` thành mật khẩu MySQL của bạn.

Tất cả service dùng chung `JWT_SECRET=shoe_store_jwt_secret_2024`.

### 3. Cài dependencies & chạy

**Windows — mở 7 terminal:**

```bash
# Terminal 1: Auth Service
cd auth-service && npm install && npm run dev

# Terminal 2: Profile Service
cd profile-service && npm install && npm run dev

# Terminal 3: Product Service
cd product-service && npm install && npm run dev

# Terminal 4: Cart Service
cd cart-service && npm install && npm run dev

# Terminal 5: Order Service
cd order-service && npm install && npm run dev

# Terminal 6: API Gateway
cd api-gateway && npm install && npm run dev

# Terminal 7: Frontend
cd frontend && npm install && npm start
```

Hoặc dùng script `start-all.bat` (Windows):

```
start-all.bat
```

### 4. Truy cập

- **Frontend:** http://localhost:3000
- **API Gateway:** http://localhost:8000
- **Health checks:** http://localhost:8000/health

## Tài khoản mặc định

| Loại | Email | Password |
|------|-------|----------|
| Admin | admin@shoestore.com | admin123 |
| User | user@shoestore.com | admin123 |

## Tính năng mới so với web cũ

- ✅ **Tồn kho riêng từng size**: product_stock(product_id, size, quantity)
- ✅ **Inventory gộp vào Product Service**: nhà cung cấp, phiếu nhập, cảnh báo hết hàng
- ✅ **Profile Service**: hiển thị tên user trên Navbar
- ✅ **API Gateway**: một điểm vào duy nhất port 8000
- ✅ **5 databases độc lập**: db_auth, db_profile, db_product, db_cart, db_order
=======
# 👟 WEBSITE BÁN GIÀY ONLINE

## 📌 Giới thiệu dự án
Website bán giày online là hệ thống thương mại điện tử hỗ trợ người dùng tìm kiếm, xem chi tiết, đặt mua và quản lý đơn hàng giày dép trực tuyến.  
Dự án được xây dựng nhằm mô phỏng quy trình kinh doanh bán giày hiện đại, giúp khách hàng mua sắm nhanh chóng, tiện lợi và hỗ trợ quản trị viên quản lý sản phẩm, người dùng, đơn hàng hiệu quả.

---

# 🎯 Mục tiêu dự án
- Xây dựng website bán giày trực tuyến đầy đủ chức năng
- Hỗ trợ khách hàng mua hàng mọi lúc, mọi nơi
- Quản lý sản phẩm, danh mục, đơn hàng, người dùng
- Tăng trải nghiệm mua sắm online
- Áp dụng kiến thức:
  - Frontend
  - Backend
  - Database
  - Authentication
  - RESTful API

---

# 👥 Đối tượng sử dụng

## Khách hàng:
- Đăng ký / Đăng nhập
- Xem sản phẩm
- Tìm kiếm sản phẩm
- Thêm vào giỏ hàng
- Đặt hàng
- Theo dõi đơn hàng

## Quản trị viên:
- Quản lý sản phẩm
- Quản lý người dùng
- Quản lý đơn hàng
- Thống kê doanh thu

---

# 🛠️ Công nghệ sử dụng

## Frontend:
- ReactJS
- React Router DOM
- Axios
- CSS

## Backend:
- NodeJS
- ExpressJS
- JWT Authentication
- BCrypt

## Database:
- MySQL
>>>>>>> ff01634c1502800b8e3a5ef33ab9712926d72186

# KickZone - Shoe Store Microservices

KickZone là website bán giày online được xây dựng theo kiến trúc microservices. Dự án gồm frontend React, API Gateway và các service backend riêng cho xác thực, hồ sơ người dùng, sản phẩm, giỏ hàng và đơn hàng.

## Công nghệ sử dụng

- Frontend: ReactJS, React Router, Axios
- Backend: Node.js, Express.js
- Database: MySQL
- Xác thực: JWT
- Kiến trúc: Microservices, REST API

## Cấu trúc thư mục

```text
shoe-store-microservices/
├── api-gateway/          # Cổng API chính, proxy request đến các service
├── auth-service/         # Đăng ký, đăng nhập, quản lý user
├── profile-service/      # Thông tin cá nhân người dùng
├── product-service/      # Sản phẩm, danh mục, thương hiệu, tồn kho
├── cart-service/         # Giỏ hàng
├── order-service/        # Đơn hàng, thống kê admin
├── frontend/             # Giao diện React
├── database/             # Script tạo database và dữ liệu mẫu
└── BÁO CÁO HẰNG TUẦN/    # Tài liệu báo cáo môn học
```

## Các service

| Service | Port mặc định | Database | Vai trò |
| --- | ---: | --- | --- |
| API Gateway | 8000 | - | Điểm vào chính của hệ thống, định tuyến request |
| Auth Service | 5001 | db_auth | Đăng ký, đăng nhập, JWT, quản lý user |
| Profile Service | 5002 | db_profile | Quản lý hồ sơ cá nhân |
| Product Service | 5003 | db_product | Sản phẩm, brand, category, inventory |
| Cart Service | 5004 | db_cart | Quản lý giỏ hàng |
| Order Service | 5005 | db_order | Tạo đơn hàng, lịch sử đơn, báo cáo |
| Frontend | 3000 | - | Giao diện người dùng |

## Yêu cầu cài đặt

- Node.js và npm
- MySQL Server
- Git Bash, PowerShell hoặc terminal tương đương

## Chuẩn bị database

Mở MySQL rồi chạy lần lượt các script trong thư mục `database`:

```sql
SOURCE database/01_auth_db.sql;
SOURCE database/02_profile_db.sql;
SOURCE database/03_product_db.sql;
SOURCE database/04_cart_db.sql;
SOURCE database/05_order_db.sql;
```

Nếu chạy bằng MySQL Workbench, có thể mở từng file `.sql` và bấm Execute theo đúng thứ tự từ `01` đến `05`.

## Cấu hình môi trường

Mỗi service backend đã có file `.env` riêng. Kiểm tra và chỉnh các giá trị database cho phù hợp với máy đang chạy:

```env
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=mat_khau_mysql_cua_ban
DB_NAME=ten_database_tuong_ung
JWT_SECRET=shoe_store_jwt_secret_2024
JWT_EXPIRES_IN=7d
```

Riêng `api-gateway/.env` cần trỏ đến URL của các service:

```env
PORT=8000
AUTH_SERVICE_URL=http://localhost:5001
PROFILE_SERVICE_URL=http://localhost:5002
PRODUCT_SERVICE_URL=http://localhost:5003
CART_SERVICE_URL=http://localhost:5004
ORDER_SERVICE_URL=http://localhost:5005
JWT_SECRET=shoe_store_jwt_secret_2024
```

Lưu ý:

- `DB_NAME` của từng service phải khớp với database tương ứng trong bảng service ở trên.
- `JWT_SECRET` cần giống nhau giữa `api-gateway` và các service có kiểm tra token.
- Frontend mặc định gọi API qua `http://localhost:8000/api`. Nếu cần đổi gateway, tạo file `frontend/.env` và đặt `REACT_APP_API_URL`.

Ví dụ:

```env
REACT_APP_API_URL=http://localhost:8000/api
```

## Cài dependencies

Chạy `npm install` trong từng thư mục service và frontend:

```bash
cd auth-service && npm install
cd ../profile-service && npm install
cd ../product-service && npm install
cd ../cart-service && npm install
cd ../order-service && npm install
cd ../api-gateway && npm install
cd ../frontend && npm install
```

## Chạy dự án

Mở nhiều terminal và chạy theo thứ tự sau.

Terminal 1:

```bash
cd auth-service
npm run dev
```

Terminal 2:

```bash
cd profile-service
npm run dev
```

Terminal 3:

```bash
cd product-service
npm run dev
```

Terminal 4:

```bash
cd cart-service
npm run dev
```

Terminal 5:

```bash
cd order-service
npm run dev
```

Terminal 6:

```bash
cd api-gateway
npm run dev
```

Terminal 7:

```bash
cd frontend
npm start
```

Sau khi chạy xong:

- Frontend: <http://localhost:3000>
- API Gateway: <http://localhost:8000>
- Health check gateway: <http://localhost:8000/health>

## Tài khoản mẫu

Dữ liệu mẫu được tạo trong `database/01_auth_db.sql`.

| Vai trò | Email | Mật khẩu |
| --- | --- | --- |
| Admin | admin@shoestore.com | admin123 |
| User | user@shoestore.com | admin123 |

## API chính qua Gateway

Frontend gọi API thông qua API Gateway với prefix `/api`.

| Nhóm API | Endpoint chính |
| --- | --- |
| Auth | `/api/auth` |
| Profile | `/api/profile` |
| Products, Brands, Categories | `/api/products`, `/api/brands`, `/api/categories` |
| Inventory | `/api/inventory` |
| Cart | `/api/cart` |
| Orders | `/api/orders` |
| Admin | `/api/admin`, một số route admin trong `/api/auth` và `/api/orders` |

Các route cần đăng nhập phải gửi header:

```http
Authorization: Bearer <token>
```

## Chức năng chính

- Đăng ký, đăng nhập và phân quyền user/admin
- Xem danh sách sản phẩm, chi tiết sản phẩm, brand và category
- Quản lý sản phẩm, danh mục, thương hiệu và tồn kho cho admin
- Thêm, sửa, xóa sản phẩm trong giỏ hàng
- Tạo đơn hàng và xem lịch sử mua hàng
- Thống kê doanh thu, đơn hàng và sản phẩm bán chạy cho admin

## Ghi chú phát triển

- Mỗi backend service có thể chạy độc lập bằng `npm run dev` hoặc `npm start`.
- API Gateway là điểm vào chính cho frontend, nên khi test giao diện cần chạy gateway cùng các service liên quan.
- Khi gặp lỗi kết nối database, kiểm tra lại MySQL đã chạy chưa, database đã được import chưa và thông tin trong `.env` đã đúng chưa.
- Khi gặp lỗi xác thực, kiểm tra `JWT_SECRET` giữa gateway và service có giống nhau không.

## Nhóm thực hiện

Dự án được thực hiện bởi Nhóm 9 - môn Kiến trúc Phần mềm.

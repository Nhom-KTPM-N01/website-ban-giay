KickZone - Shoe Store Microservices
Giới thiệu

KickZone là hệ thống bán giày trực tuyến được xây dựng theo kiến trúc Microservices nhằm hỗ trợ việc quản lý sản phẩm, khách hàng, giỏ hàng và đơn hàng trên một nền tảng thống nhất.

Hệ thống cho phép khách hàng tìm kiếm sản phẩm, quản lý giỏ hàng, đặt hàng trực tuyến và theo dõi lịch sử mua sắm. Đồng thời, quản trị viên có thể quản lý sản phẩm, thương hiệu, danh mục, tồn kho và theo dõi tình hình kinh doanh thông qua các báo cáo thống kê.

Mục tiêu hệ thống
Cung cấp nền tảng mua sắm giày trực tuyến.
Hỗ trợ quản lý sản phẩm và tồn kho hiệu quả.
Đảm bảo phân quyền người dùng và quản trị viên.
Cho phép mở rộng hệ thống dễ dàng thông qua kiến trúc Microservices.
Tăng tính độc lập giữa các thành phần nghiệp vụ.
Công nghệ sử dụng
Thành phần	Công nghệ
Frontend	ReactJS
Backend	Node.js, Express.js
Database	MySQL
Authentication	JWT
API Communication	REST API
Architecture	Microservices
Các thành phần của hệ thống
Service	Vai trò
API Gateway	Điều hướng request giữa frontend và các service
Auth Service	Đăng ký, đăng nhập, xác thực và phân quyền
Profile Service	Quản lý hồ sơ người dùng
Product Service	Quản lý sản phẩm, danh mục, thương hiệu và tồn kho
Cart Service	Quản lý giỏ hàng
Order Service	Xử lý đơn hàng và thống kê doanh thu
Chức năng người dùng
Quản lý tài khoản
Đăng ký tài khoản
Đăng nhập hệ thống
Cập nhật thông tin cá nhân
Đổi mật khẩu
Quản lý sản phẩm
Xem danh sách sản phẩm
Xem chi tiết sản phẩm
Tìm kiếm sản phẩm
Lọc theo thương hiệu và danh mục
Giỏ hàng
Thêm sản phẩm vào giỏ hàng
Cập nhật số lượng
Xóa sản phẩm khỏi giỏ hàng
Đặt hàng
Tạo đơn hàng
Xem lịch sử mua hàng
Theo dõi trạng thái đơn hàng
Chức năng quản trị viên
Quản lý sản phẩm
Thêm sản phẩm
Chỉnh sửa sản phẩm
Xóa sản phẩm
Quản lý danh mục
Thêm danh mục
Chỉnh sửa danh mục
Xóa danh mục
Quản lý thương hiệu
Thêm thương hiệu
Chỉnh sửa thương hiệu
Xóa thương hiệu
Quản lý tồn kho
Cập nhật số lượng tồn kho
Theo dõi sản phẩm sắp hết hàng
Báo cáo thống kê
Thống kê doanh thu
Thống kê đơn hàng
Thống kê sản phẩm bán chạy
Thiết kế cơ sở dữ liệu

Mỗi Microservice sử dụng cơ sở dữ liệu riêng biệt:

Database	Chức năng
db_auth	Thông tin tài khoản và phân quyền
db_profile	Hồ sơ người dùng
db_product	Sản phẩm, thương hiệu, danh mục, tồn kho
db_cart	Thông tin giỏ hàng
db_order	Đơn hàng và thống kê

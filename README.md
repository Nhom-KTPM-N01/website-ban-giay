👟 Website Bán Giày - Microservices
Dự án website thương mại điện tử bán giày được xây dựng theo kiến trúc Microservices, phát triển trong khuôn khổ môn Kiến trúc Phần mềm 
📌 Giới thiệu
Website Bán Giày là một hệ thống thương mại điện tử cho phép người dùng tìm kiếm, xem sản phẩm và đặt hàng trực tuyến. Hệ thống được thiết kế theo mô hình microservices giúp dễ dàng mở rộng và bảo trì từng thành phần độc lập.
🏗️ Kiến trúc hệ thống
Hệ thống gồm các service độc lập:
ServiceMô tảAPI GatewayCổng trung gian, điều hướng request đến các serviceAuth ServiceXác thực người dùng, cấp phát JWT tokenProfile ServiceQuản lý thông tin cá nhân người dùngProduct ServiceQuản lý danh mục và thông tin sản phẩmCart ServiceQuản lý giỏ hàngOrder ServiceXử lý đơn hàngFrontendGiao diện người dùng (ReactJS)
🛠️ Công nghệ sử dụng

Backend: Node.js, Express.js
Frontend: ReactJS
Database: MySQL
Xác thực: JWT (JSON Web Token)
Kiến trúc: Microservices, REST API

👥 Nhóm thực hiện
Dự án được thực hiện bởi Nhóm N01 - Môn Kiến Trúc Phần mềm.

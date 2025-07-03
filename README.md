# 📚 Nhật ký tiến độ dự án

---

## 📆 Ngày 22/06/2025

- Xây dựng API đăng ký / đăng nhập (POST /register, /login)
- Hash mật khẩu với `bcryptjs`
- Trả JWT token khi login thành công
- Tạo middleware `verifyToken` để bảo vệ API
- Viết API `/api/auth/me` để kiểm tra user hiện tại từ token
- Hiểu được quy trình frontend gửi token → backend xác minh

* API /api/auth/me được bảo vệ bởi middleware verifyToken
* Do đó, để lấy được thông tin user từ API này:
  Frontend bắt buộc phải gửi đúng token hợp lệ.
  Token phải được gửi trong header với định dạng: Authorization: Bearer <token>

-- Vai trò Middleware

- Kiểm soát
- Cho phép qua
- Không cho phép qua
- Chỉnh sửa/ thay đổi

---

## 📆 Ngày 23 - 24/06/2025

- Xây dựng các API CRUD cho:
  - **Foods**: POST /foods, GET /foods, GET /foods/:id, PUT /foods/:id, DELETE /foods/:id
  - **Categories**: POST /categories, GET /categories, PUT /categories/:id, DELETE /categories/:id
- Thêm middleware kiểm tra quyền **admin** để chỉ admin mới được phép thêm, sửa, xóa dữ liệu
- Hiểu được cách phân quyền và bảo vệ route bằng middleware (authorization)
- Học và sử dụng các câu lệnh MongoDB với Mongoose:
  - `find()`, `findOne()`, `findById()`, `findByIdAndUpdate()`, `findByIdAndDelete()`
- Bắt và xử lý lỗi khi trùng dữ liệu (ví dụ: lỗi `E11000 duplicate key error`)
- Trả về status code và thông báo phù hợp:

  - `404` khi không tìm thấy dữ liệu
  - `400` khi dữ liệu không hợp lệ
  - `500` khi xảy ra lỗi server

- Thêm các API liên quan đến **đơn hàng (orders)**:

  - GET /api/orders (admin)
    - Lấy tất cả đơn hàng
  - GET /api/orders/userOrders (user)
    - Lấy các đơn hàng của user hiện tại
  - GET /api/orders/:id (user)
    - Lấy chi tiết đơn hàng theo ID
  - POST /api/orders/create (user)
    - Tạo đơn hàng mới
  - PUT /api/orders/userUpdate/:id (user)
    - Người dùng cập nhật đơn hàng của mình
  - PUT /api/orders/adminUpdate/:id (admin)
    - Admin cập nhật trạng thái đơn hàng
  - DELETE /api/orders/delete/:id (admin)
    - Admin xoá đơn hàng

- Thêm các API liên quan đến **giỏ hàng (cart)**:
  - GET /api/cart/ (user)
  - POST /api/cart/addToCart (user)
  - PUT /api/cart/updateCart (user)
  - DELETE /api/cart/removeFromCart/:foodId (user)
  - DELETE /api/cart/clearCart (user)

---

## 📆 Ngày 03/07/2025

- Viết API `GET /api/auth` để lấy danh sách tất cả user (chỉ dành cho admin).

- Viết tính năng tìm kiếm user (search user) ở frontend.

- Hoàn thiện giao diện đăng nhập và đăng xuất cho Admin bằng Chakra UI.

- Tạo và sử dụng `AuthContext` để:

  - Quản lý trạng thái đăng nhập (`isAuthenticated`, `user`, `token`)
  - Lưu và đồng bộ thông tin đăng nhập qua `localStorage`
  - Tự động gửi token trong header khi gọi các API bảo vệ (Authorization: Bearer ...)
  - Tự logout khi token hết hạn hoặc không hợp lệ.

- Sử dụng middleware `verifyToken` và `verifyAdmin` ở backend để bảo vệ route `/api/auth`.

- Kiểm tra trạng thái `loading`, `isAuthenticated` trước khi hiển thị nội dung (đã xử lý trong `App.js` và `PrivateRoute`).

- Cài đặt `PrivateRoute` để bảo vệ các route admin, ngăn người dùng không có quyền truy cập.

- Tự động chuyển hướng về `/login` nếu người dùng chưa đăng nhập hoặc không hợp lệ.

- Hiển thị cảnh báo khi đăng xuất hoặc khi token hết hạn.

👉 **Kết quả**: Đã hoàn chỉnh luồng xác thực và phân quyền cho admin. Frontend có thể hiển thị nội dung tùy theo quyền người dùng. Hệ thống an toàn và sẵn sàng phát triển tính năng tiếp theo.

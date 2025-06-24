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

👉 **Kết quả**: Backend đã hoàn thành các chức năng quản lý món ăn và danh mục, sẵn sàng tích hợp với frontend.

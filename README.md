# csn-DA23TTA-ThachNgocPhu-front-end--cua-hang-nuoc-hoa-html-css-js-bootstrap
# 🛍️ PERFUME STORE - Ứng Dụng Bán Nước Hoa Dior & Chanel (SPA JavaScript)

*Mô tả tóm tắt: Đồ án là một ứng dụng bán hàng trực tuyến Front-end thuần, tập trung vào việc mô phỏng trải nghiệm người dùng trên mô hình Single Page Application (SPA), đặc biệt chú trọng vào chức năng Giỏ hàng và Trạng thái người dùng.*

---

## I. Thông tin thực hiện Đồ án

Đây là đồ án **[Cơ sở ngành]** của sinh viên:

| Nội dung | Chi tiết |
| :--- | :--- |
| **Mã số sinh viên** | 110123039 |
| **Họ và tên** | THẠCH NGỌC PHÚ |
| **Lớp/Khóa** |DA23TTA |
| **Giảng viên hướng dẫn** | Ths.PHẠM MINH ĐƯƠNG |

---

## II. Công nghệ sử dụng

Đồ án được xây dựng hoàn toàn bằng Front-end (HTML/CSS/JS thuần).

* **Ngôn ngữ lập trình:** **JavaScript ES6** (Xử lý toàn bộ logic và SPA routing).
* **Giao diện & Bố cục:** **Bootstrap 5.3** (Sử dụng các component như Carousel, Navbar, Card, Form).
* **Style tùy chỉnh:** CSS3 (File `style.css` tùy chỉnh font chữ, màu sắc và hiệu ứng).
* **Lưu trữ dữ liệu:** **Web Local Storage** (Lưu trữ trạng thái Giỏ hàng `perfumeCart` và trạng thái Đăng nhập `loggedInUser`).

---

## III. Các tính năng chính đã hoàn thành

### 1. Trải nghiệm Người dùng (UX/SPA)

* **Single Page Application (SPA):** Chuyển đổi giữa các trang (Trang chủ, Sản phẩm, Giỏ hàng, Đăng nhập...) mượt mà mà không cần tải lại trang.
* **Responsive Design:** Giao diện hiển thị tốt trên các thiết bị di động và máy tính bảng (nhờ Bootstrap).
* **Header State:** Hiển thị tên người dùng đã đăng nhập hoặc nút Đăng nhập/Đăng ký.

### 2. Quản lý Sản phẩm

* Hiển thị danh sách sản phẩm và Sản phẩm nổi bật.
* Chức năng **Tìm kiếm** sản phẩm theo tên.
* Bộ lọc đa dạng theo **Loại** (`nam`, `nu`, `unisex`) và **Thương hiệu** (`dior`, `chanel`).
* Trang **Chi tiết sản phẩm** cho phép người dùng chọn **Dung tích** (`ml`) và xem **Giá** cập nhật theo dung tích đó.

### 3. Giỏ hàng và Thanh toán

* **Thêm sản phẩm:** Thêm sản phẩm cùng dung tích và số lượng vào giỏ hàng.
* **Cập nhật Giỏ hàng:**
    * Cập nhật số lượng sản phẩm trực tiếp trong bảng giỏ hàng.
    * Xóa từng sản phẩm khỏi giỏ hàng.
* **Thanh toán (Checkout):** Mô phỏng quy trình đặt hàng, bao gồm hiển thị Tóm tắt đơn hàng và form Thông tin giao hàng (có validation `required`).
* **Bảo vệ Thanh toán:** Nếu Giỏ hàng rỗng, người dùng sẽ không thể truy cập trang Thanh toán.

### 4. Quản lý Tài khoản (Giả lập)

* **Đăng ký & Đăng nhập:** Các form này được xử lý trong `main.js` để **giả lập** việc xác thực, lưu tên người dùng vào Local Storage và chuyển hướng về Trang chủ.
* **Đăng xuất:** Xóa dữ liệu người dùng khỏi Local Storage.
* **Validation Form:** Kiểm tra ràng buộc cơ bản về email, mật khẩu tối thiểu 6 ký tự.

---

## IV. Hướng dẫn cài đặt và chạy thử

Vì đây là dự án Front-end thuần, nên có thể chạy trên khi mở thư mục index hoặc live server của Visual Studio Code

### 1. Tải về và cấu trúc

Đảm bảo bạn có các file sau trong cùng một thư mục:

* `index.html`
* `main.js`
* `style.css`
* [Các file ảnh sản phẩm] 

### 2. Chạy ứng dụng

1.  **Mở file:** Nhấp đúp vào file **`index.html`** hoặc kéo thả vào trình duyệt (Chrome/Edge/Firefox).
2.  **Kiểm tra SPA:** Thử click vào các mục menu (Sản phẩm, Giỏ hàng) để kiểm tra việc chuyển trang.

### 3. Kiểm tra tính năng

* **Thêm vào Giỏ hàng:** Vào trang Sản phẩm, chọn một chai nước hoa, chọn dung tích và thêm vào giỏ.
* **Đăng nhập:** Truy cập Đăng nhập/Đăng ký để thấy tên của bạn hiển thị trên Header.

---

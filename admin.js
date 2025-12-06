document.addEventListener('DOMContentLoaded', function() {
    
    // =================================================================
    // 0. BIẾN TOÀN CỤC & HELPER
    // =================================================================
    
    let currentImageBase64 = ''; // Biến lưu ảnh

    // Helper: Format tiền VNĐ đẹp
    function formatVND(num) {
        return Number(num).toLocaleString('vi-VN') + ' đ';
    }

    // =================================================================
    // 1. DỮ LIỆU MẪU (MOCK DATA)
    // =================================================================
    
    const MOCK_CUSTOMERS = [
        { id: 1, name: 'Nguyễn Văn A', email: 'vana@gmail.com', joined: '01/10/2025', status: 'Active' },
        { id: 2, name: 'Trần Thị B', email: 'thib@gmail.com', joined: '15/10/2025', status: 'Active' },
        { id: 3, name: 'Lê Văn C', email: 'vanc@gmail.com', joined: '20/11/2025', status: 'Inactive' },
    ];
    const MOCK_ORDERS = [
        { id: 'DH001', customer: 'Nguyễn Văn A', date: '26/10/2025', total: 7300000, status: 'Đã xử lý' },
        { id: 'DH002', customer: 'Trần Thị B', date: '01/11/2025', total: 3450000, status: 'Chưa xử lý' },
    ];
    const MOCK_STATS = [
        { name: 'Dior Sauvage Elixir', qty: 5, revenue: 16000000 },
        { name: 'Chanel Coco Mademoiselle', qty: 4, revenue: 12800000 },
        { name: 'Versace Eros EDT', qty: 3, revenue: 7500000 },
    ];

    // =================================================================
    // 2. QUẢN LÝ SẢN PHẨM (CRUD + AUTO RESIZE ẢNH)
    // =================================================================

    let products = JSON.parse(localStorage.getItem('productsData')) || [];

    // Tạo dữ liệu mẫu nếu kho rỗng
    if (products.length === 0) {
        products = [{
            id: 'sp-demo', name: 'Sản phẩm mẫu', image: 'https://via.placeholder.com/150',
            brand: 'dior', type: 'nam', sizes: [{ ml: 100, price: 3000000 }]
        }];
        saveProducts();
    }

    function saveProducts() {
        try {
            localStorage.setItem('productsData', JSON.stringify(products));
            showProduct();
            renderOverview(); 
        } catch (e) {
            alert('Lỗi bộ nhớ: Ảnh quá lớn. Hãy chọn ảnh nhỏ hơn.');
        }
    }

    // --- LOGIC XỬ LÝ ẢNH (AUTO RESIZE) ---
    const fileInput = document.getElementById('new-image-file');
    const previewBox = document.getElementById('preview-box');
    const previewImg = document.getElementById('preview-img');

    if (fileInput) {
        fileInput.addEventListener('change', function(event) {
            const file = event.target.files[0];
            if (!file) return;

            if (!file.type.startsWith('image/')) {
                alert('Vui lòng chỉ chọn file hình ảnh!');
                return;
            }

            const reader = new FileReader();
            reader.onload = function(readerEvent) {
                const img = new Image();
                img.src = readerEvent.target.result;
                
                img.onload = function() {
                    const canvas = document.createElement('canvas');
                    const ctx = canvas.getContext('2d');
                    // Giới hạn chiều rộng 300px để giảm dung lượng
                    const maxWidth = 300; 
                    const scaleFactor = maxWidth / img.width;
                    const newWidth = maxWidth;
                    const newHeight = img.height * scaleFactor;

                    canvas.width = newWidth;
                    canvas.height = newHeight;

                    ctx.drawImage(img, 0, 0, newWidth, newHeight);
                    currentImageBase64 = canvas.toDataURL('image/jpeg', 0.8); // Chất lượng 0.8

                    if (previewImg) {
                        previewImg.src = currentImageBase64;
                        previewBox.style.display = 'block';
                    }
                };
            };
            reader.readAsDataURL(file);
        });
    }

    // --- HÀM HIỂN THỊ DANH SÁCH SẢN PHẨM (STYLE MỚI) ---
    function showProduct() {
        const productListEl = document.getElementById('show-product');
        if (!productListEl) return;

        // Tạo bảng đẹp chuẩn Bootstrap
        let html = `
        <table class="table table-hover align-middle mb-0">
            <thead class="table-light">
                <tr>
                    <th>STT</th>
                    <th>Hình ảnh</th>
                    <th>Tên sản phẩm</th>
                    <th>Thương hiệu</th>
                    <th>Giá bán</th>
                    <th class="text-end">Hành động</th>
                </tr>
            </thead>
            <tbody>`;

        if (products.length === 0) {
            html += '<tr><td colspan="6" class="text-center py-4 text-muted">Chưa có sản phẩm nào.</td></tr>';
        } else {
            products.forEach((p, index) => {
                let price = p.sizes ? formatVND(p.sizes[0].price) : 'Liên hệ';
                let imgSrc = p.image || 'https://via.placeholder.com/150';

                html += `
                <tr>
                    <td>${index + 1}</td>
                    <td>
                        <img src="${imgSrc}" style="width: 50px; height: 50px; object-fit: cover; border-radius: 8px; border: 1px solid #eee;">
                    </td>
                    <td>
                        <span class="fw-bold text-dark">${p.name}</span>
                        <br><small class="text-muted">${p.type.toUpperCase()}</small>
                    </td>
                    <td><span class="badge bg-secondary-subtle text-secondary border border-secondary-subtle">${p.brand.toUpperCase()}</span></td>
                    <td class="fw-bold text-success">${price}</td>
                    <td class="text-end">
                        <button class="btn btn-sm btn-outline-primary me-1" onclick="editProduct('${p.id}')">
                            <i class="bi bi-pencil-square"></i>
                        </button>
                        <button class="btn btn-sm btn-outline-danger" onclick="deleteProduct('${p.id}')">
                            <i class="bi bi-trash"></i>
                        </button>
                    </td>
                </tr>`;
            });
        }
        html += '</tbody></table>';
        productListEl.innerHTML = html;
        
        // Cập nhật số lượng trên Card Tổng quan
        const countEl = document.getElementById('amount-product');
        if(countEl) countEl.textContent = products.length;
    }

    // --- XÓA SẢN PHẨM ---
    window.deleteProduct = function(id) {
        if (confirm('Bạn có chắc chắn muốn xóa sản phẩm này?')) {
            products = products.filter(p => p.id != id);
            saveProducts();
        }
    };

    // --- SỬA SẢN PHẨM (Đổ dữ liệu vào Modal) ---
    window.editProduct = function(id) {
        const p = products.find(x => x.id === id);
        if (!p) return;

        // Điền info cũ
        document.getElementById('edit-product-id').value = p.id; 
        document.getElementById('new-name').value = p.name;
        document.getElementById('new-brand').value = p.brand;
        document.getElementById('new-type').value = p.type;
        document.getElementById('new-short').value = p.short || '';
        
        if (p.sizes && p.sizes.length > 0) {
            document.getElementById('new-size').value = p.sizes[0].ml;
            document.getElementById('new-price').value = p.sizes[0].price;
        }

        // Xử lý ảnh
        currentImageBase64 = ''; 
        document.getElementById('new-image-file').value = ''; 
        if (p.image) {
            document.getElementById('preview-img').src = p.image;
            document.getElementById('preview-box').style.display = 'block';
        } else {
            document.getElementById('preview-box').style.display = 'none';
        }

        // Đổi tiêu đề Modal và hiện lên
        document.querySelector('.modal-title').textContent = "Cập nhật sản phẩm"; 
        const myModal = new bootstrap.Modal(document.getElementById('addProductModal'));
        myModal.show();
    }

    // =================================================================
    // 3. SỰ KIỆN NÚT BẤM (HANDLERS)
    // =================================================================

    // Nút Thêm mới
    const btnAdd = document.getElementById('btn-add-product');
    if (btnAdd) {
        btnAdd.addEventListener('click', function() {
            document.getElementById('form-add-product').reset();
            document.getElementById('edit-product-id').value = ''; 
            currentImageBase64 = '';
            document.getElementById('preview-box').style.display = 'none';
            document.querySelector('.modal-title').textContent = "Thêm Sản Phẩm Mới";
            
            const myModal = new bootstrap.Modal(document.getElementById('addProductModal'));
            myModal.show();
        });
    }

    // Nút Lưu (Trong Modal)
    const btnSaveNew = document.getElementById('btn-save-new-product');
    if (btnSaveNew) {
        btnSaveNew.addEventListener('click', function() {
            const idEdit = document.getElementById('edit-product-id').value; 
            
            const name = document.getElementById('new-name').value;
            const brand = document.getElementById('new-brand').value;
            const type = document.getElementById('new-type').value;
            const size = document.getElementById('new-size').value;
            const price = document.getElementById('new-price').value;
            const shortDesc = document.getElementById('new-short').value;

            if (!name || !price) { alert('Vui lòng nhập tên và giá!'); return; }

            if (idEdit) {
                // Đang sửa
                const index = products.findIndex(p => p.id === idEdit);
                if (index !== -1) {
                    products[index].name = name;
                    products[index].brand = brand;
                    products[index].type = type;
                    products[index].short = shortDesc;
                    products[index].sizes = [{ ml: Number(size), price: Number(price) }];
                    
                    if (currentImageBase64) {
                        products[index].image = currentImageBase64;
                    }
                    alert('Cập nhật thành công!');
                }
            } else {
                // Đang thêm mới
                const finalImage = currentImageBase64 || 'https://via.placeholder.com/150';
                const newProduct = {
                    id: 'sp-' + Date.now(),
                    name: name,
                    image: finalImage,
                    short: shortDesc,
                    brand: brand, type: type,
                    sizes: [{ ml: Number(size), price: Number(price) }]
                };
                products.unshift(newProduct);
                alert('Thêm mới thành công!');
            }

            saveProducts(); 
            
            // Đóng Modal (Bootstrap 5)
            const modalEl = document.getElementById('addProductModal');
            const modalInstance = bootstrap.Modal.getInstance(modalEl);
            modalInstance.hide();
        });
    }

    // =================================================================
    // 4. CHUYỂN TAB & CÁC TAB KHÁC
    // =================================================================
    
    // --- Render Tổng quan ---
    function renderOverview() {
        // Cập nhật số liệu lên các thẻ Card
        const elUser = document.getElementById('amount-user');
        const elProd = document.getElementById('amount-product');
        const elRev = document.getElementById('doanh-thu');
        
        if(elUser) elUser.textContent = MOCK_CUSTOMERS.length;
        if(elProd) elProd.textContent = products.length;
        
        const totalRev = MOCK_ORDERS.reduce((sum, item) => sum + item.total, 0);
        if(elRev) elRev.textContent = formatVND(totalRev);
    }

    // --- Render Khách hàng ---
    function showUser() {
        const el = document.getElementById('show-user'); if(!el) return; el.innerHTML = '';
        MOCK_CUSTOMERS.forEach((c, i) => { 
            const badgeClass = c.status === 'Active' ? 'bg-success-subtle text-success' : 'bg-danger-subtle text-danger';
            el.innerHTML += `
            <tr>
                <td>${i+1}</td>
                <td><span class="fw-bold">${c.name}</span></td>
                <td>${c.email}</td>
                <td>${c.joined}</td>
                <td><span class="badge ${badgeClass}">${c.status}</span></td>
            </tr>`; 
        });
    }

    // --- Render Đơn hàng ---
    function findOrder() {
        const el = document.getElementById('showOrder'); if(!el) return; el.innerHTML = '';
        MOCK_ORDERS.forEach(o => { 
            const badgeClass = o.status === 'Đã xử lý' ? 'bg-success' : 'bg-warning text-dark';
            el.innerHTML += `
            <tr>
                <td><span class="font-monospace text-primary">${o.id}</span></td>
                <td>${o.customer}</td>
                <td>${o.date}</td>
                <td class="fw-bold">${formatVND(o.total)}</td>
                <td><span class="badge ${badgeClass}">${o.status}</span></td>
                <td><button class="btn btn-sm btn-light border">Chi tiết</button></td>
            </tr>`; 
        });
    }

    // --- Render Thống kê ---
    function thongKe() {
        document.getElementById('quantity-product').textContent = MOCK_STATS.length;
        document.getElementById('quantity-order').textContent = MOCK_STATS.reduce((s,i)=>s+i.qty,0);
        document.getElementById('quantity-sale').textContent = formatVND(MOCK_STATS.reduce((s,i)=>s+i.revenue,0));
        
        const el = document.getElementById('showTk'); if(!el) return; el.innerHTML = '';
        MOCK_STATS.forEach((item, i) => { 
            el.innerHTML += `
            <tr>
                <td>#${i+1}</td>
                <td>${item.name}</td>
                <td>${item.qty}</td>
                <td class="fw-bold text-success">${formatVND(item.revenue)}</td>
            </tr>`; 
        });
    }

    // --- LOGIC CHUYỂN TAB (Sửa lại class sidebar-item cho khớp HTML mới) ---
    const sidebarItems = document.querySelectorAll('.sidebar-item'); // Class mới
    const contentSections = document.querySelectorAll('.section');
    
    sidebarItems.forEach((item) => {
        item.addEventListener('click', () => {
            // Xóa active cũ
            sidebarItems.forEach(i => i.classList.remove('active'));
            contentSections.forEach(s => s.classList.remove('active'));
            
            // Active mới
            item.classList.add('active');
            const sectionId = item.getAttribute('data-section');
            document.getElementById(sectionId).classList.add('active');
            
            // Gọi hàm render tương ứng
            if (sectionId === 'tong-quan') renderOverview();
            if (sectionId === 'san-pham') showProduct();
            if (sectionId === 'khach-hang') showUser();
            if (sectionId === 'don-hang') findOrder();
            if (sectionId === 'thong-ke') thongKe();
        });
    });

    // --- ĐĂNG XUẤT ---
    document.getElementById('logout-acc').addEventListener('click', function(e) {
        e.preventDefault();
        if(confirm('Bạn muốn đăng xuất?')) {
            localStorage.removeItem('loggedInUser');
            localStorage.removeItem('isAdmin');
            window.location.href = 'index.html';
        }
    });
    
    // Toggle Menu Mobile
    const toggleBtn = document.querySelector('.menu-toggle');
    if(toggleBtn) {
        toggleBtn.addEventListener('click', () => {
            document.querySelector('.sidebar').classList.toggle('active');
        });
    }

    // Khởi chạy lần đầu
    renderOverview();
    showProduct(); // Render luôn bảng sản phẩm lúc đầu
});
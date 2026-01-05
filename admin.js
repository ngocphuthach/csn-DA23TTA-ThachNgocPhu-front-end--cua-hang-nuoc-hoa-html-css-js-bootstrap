document.addEventListener('DOMContentLoaded', function() {

    // --- 1. AUTH & INIT ---
    const loginOverlay = document.getElementById('admin-login-overlay');
    const loginForm = document.getElementById('admin-login-form');
    const isAdmin = localStorage.getItem('isAdmin') === 'true';

    if (isAdmin && loginOverlay) {
        loginOverlay.classList.remove('d-flex');
        loginOverlay.style.display = 'none';
    }

    if (loginForm) {
        loginForm.addEventListener('submit', function(e) {
            e.preventDefault();
            if (document.getElementById('admin-email').value === 'admin@perfume.vn' && document.getElementById('admin-pass').value === 'admin123') {
                localStorage.setItem('isAdmin', 'true');
                localStorage.setItem('loggedInUser', 'Admin');
                alert('Đăng nhập thành công!');
                location.reload();
            } else {
                document.getElementById('admin-login-error').textContent = 'Email hoặc Mật khẩu không đúng!';
            }
        });
    }

    document.getElementById('logout-acc')?.addEventListener('click', function() {
        if(confirm('Đăng xuất?')) { localStorage.removeItem('isAdmin'); localStorage.removeItem('loggedInUser'); location.reload(); }
    });

    // --- 2. DATA LOAD (LẤY DỮ LIỆU THẬT) ---
    function formatVND(num) { return Number(num).toLocaleString('vi-VN') + ' đ'; }

    let products = JSON.parse(localStorage.getItem('productsData_v2')) || [];
    let realOrders = JSON.parse(localStorage.getItem('perfumeOrders_Real')) || [];
    let realCustomers = JSON.parse(localStorage.getItem('perfumeCustomers')) || [];
    
    // Thương hiệu
    let brandsData = JSON.parse(localStorage.getItem('brandsData')) || [
        {id: 'b1', name: 'Chanel', img: 'pic/chanelthuonghieu.jpg', desc: 'Biểu tượng thanh lịch'}, 
        {id: 'b2', name: 'Dior', img: 'pic/diorthuonghieu.jpg', desc: 'Sang trọng quyến rũ'},
        {id: 'b3', name: 'Gucci', img: 'pic/thuonghieugucci.jpg', desc: 'Đẳng cấp táo bạo'}, 
        {id: 'b4', name: 'Versace', img: 'pic/thuonghieuversace.jpg', desc: 'Mạnh mẽ lôi cuốn'},
        {id: 'b5', name: 'YSL', img: 'pic/thuonghieuysl.jpg', desc: 'Tự do phá cách'},
        {id: 'b6', name: 'Tom Ford', img: 'pic/thuonghieutomford.jpg', desc: 'Bí ẩn và gợi cảm'}
    ];

    // Danh mục (3 MỤC CHÍNH)
    let categoriesData = JSON.parse(localStorage.getItem('categoriesData')) || [
        {id: 'c1', name: 'Nước hoa Nam', desc: 'Dành cho phái mạnh'}, 
        {id: 'c2', name: 'Nước hoa Nữ', desc: 'Dành cho phái đẹp'},
        {id: 'c3', name: 'Nước hoa Unisex', desc: 'Phi giới tính'}
    ];

    // --- 3. BIỂU ĐỒ & THỐNG KÊ (NÂNG CẤP: DOANH THU + SỐ LƯỢNG) ---
    let revenueChartInstance = null;
    let statusChartInstance = null;

    function updateTimeInfo() {
        const now = new Date();
        const timeStr = `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')} ${now.getDate().toString().padStart(2, '0')}/${(now.getMonth()+1).toString().padStart(2, '0')}/${now.getFullYear()}`;
        const elTime = document.getElementById('last-updated');
        const elMonth = document.getElementById('current-month-year');
        if(elTime) elTime.textContent = timeStr;
        if(elMonth) elMonth.textContent = `Tháng ${now.getMonth()+1}/${now.getFullYear()}`;
    }

    // 1. Xử lý dữ liệu: Trả về cả Doanh thu và Số lượng
    function getChartData(timeframe) {
        let dataMap = {};
        // Chỉ lấy đơn thành công để tính toán biểu đồ
        let validOrders = realOrders.filter(o => o.status === 'Giao thành công'); 

        // Sắp xếp theo thời gian (Cũ -> Mới)
        validOrders.sort((a, b) => {
            let da = a.date.split('/').reverse().join('-'); 
            let db = b.date.split('/').reverse().join('-'); 
            return new Date(da) - new Date(db);
        });

        validOrders.forEach(order => {
            let parts = order.date.split('/'); // dd/mm/yyyy
            let key = '';
            
            // Logic gộp nhóm
            if (timeframe === 'day') key = `${parts[0]}/${parts[1]}`; // Hiện ngày/tháng
            else if (timeframe === 'month') key = `T${parts[1]}/${parts[2]}`; // Hiện Tháng/Năm
            else if (timeframe === 'year') key = `Năm ${parts[2]}`; // Hiện Năm

            if (!dataMap[key]) dataMap[key] = { money: 0, qty: 0 };
            
            // Cộng tiền
            dataMap[key].money += order.total;
            
            // Cộng số lượng (duyệt qua từng món trong đơn hàng)
            let orderQty = 0;
            if(order.items && Array.isArray(order.items)) {
                orderQty = order.items.reduce((sum, item) => sum + (item.quantity || 1), 0);
            }
            dataMap[key].qty += orderQty;
        });

        return {
            labels: Object.keys(dataMap),
            revenues: Object.keys(dataMap).map(k => dataMap[k].money),
            quantities: Object.keys(dataMap).map(k => dataMap[k].qty)
        };
    }

    // 2. Vẽ biểu đồ Kết hợp (Mixed Chart)
    function renderCharts(filter = 'day') {
        // --- A. Biểu đồ Doanh thu & Số lượng ---
        const ctxRev = document.getElementById('revenueChart');
        if (ctxRev) {
            if (revenueChartInstance) revenueChartInstance.destroy();
            const data = getChartData(filter);
            
            if (data.labels.length === 0) {
                // Nếu chưa có đơn thành công nào
                ctxRev.parentElement.innerHTML = '<div class="text-center text-muted py-5">Chưa có đơn hàng thành công nào để thống kê.</div>';
            } else {
                revenueChartInstance = new Chart(ctxRev, {
                    type: 'bar',
                    data: {
                        labels: data.labels,
                        datasets: [
                            {
                                label: 'Doanh thu (VNĐ)',
                                data: data.revenues,
                                backgroundColor: 'rgba(54, 153, 255, 0.6)', // Cột xanh
                                borderColor: '#3699ff',
                                borderWidth: 1,
                                borderRadius: 4,
                                yAxisID: 'y', // Trục trái
                                order: 2
                            },
                            {
                                label: 'Số lượng bán (Món)',
                                data: data.quantities,
                                type: 'line', // Đường dây
                                borderColor: '#ffc107', // Màu vàng
                                backgroundColor: 'rgba(255, 193, 7, 0.2)',
                                borderWidth: 3,
                                pointBackgroundColor: '#fff',
                                pointBorderColor: '#ffc107',
                                pointRadius: 5,
                                tension: 0.3,
                                yAxisID: 'y1', // Trục phải
                                order: 1
                            }
                        ]
                    },
                    options: {
                        responsive: true,
                        maintainAspectRatio: false,
                        interaction: {
                            mode: 'index',
                            intersect: false,
                        },
                        plugins: {
                            legend: { position: 'top' },
                            tooltip: {
                                callbacks: {
                                    label: function(context) {
                                        let label = context.dataset.label || '';
                                        if (label) label += ': ';
                                        if (context.dataset.yAxisID === 'y') {
                                            return label + formatVND(context.raw);
                                        }
                                        return label + context.raw;
                                    }
                                }
                            }
                        },
                        scales: {
                            y: {
                                type: 'linear',
                                display: true,
                                position: 'left',
                                title: { display: true, text: 'Doanh thu' },
                                beginAtZero: true,
                                grid: { drawOnChartArea: true }
                            },
                            y1: {
                                type: 'linear',
                                display: true,
                                position: 'right',
                                title: { display: true, text: 'Số lượng' },
                                beginAtZero: true,
                                grid: { drawOnChartArea: false }
                            }
                        }
                    }
                });
            }
        }

        // --- B. Biểu đồ Tròn (Trạng thái) ---
        const ctxStat = document.getElementById('statusChart');
        if (ctxStat) {
            if (statusChartInstance) statusChartInstance.destroy();
            
            let stats = { completed: 0, cancelled: 0, processing: 0 };
            realOrders.forEach(o => {
                if (o.status === 'Giao thành công') stats.completed++;
                else if (o.status === 'Đã hủy') stats.cancelled++;
                else stats.processing++; // Các trạng thái còn lại
            });

            // Nếu chưa có đơn nào thì vẽ placeholder
            if (realOrders.length === 0) {
                 // Có thể để trống hoặc vẽ 1 cái vòng xám
            } else {
                statusChartInstance = new Chart(ctxStat, {
                    type: 'doughnut',
                    data: {
                        labels: ['Hoàn thành', 'Đã hủy', 'Đang xử lý'],
                        datasets: [{
                            data: [stats.completed, stats.cancelled, stats.processing],
                            backgroundColor: ['#36a2eb', '#ff6384', '#ffcd56'],
                            borderWidth: 0
                        }]
                    },
                    options: {
                        responsive: true,
                        plugins: { legend: { position: 'bottom', labels: { usePointStyle: true, boxWidth: 8 } } },
                        cutout: '70%'
                    }
                });
            }
        }
    }
    
    document.getElementById('chart-filter')?.addEventListener('change', function() { renderCharts(this.value); });

    // 4. Render Tổng quan (Dashboard Cards) - Giữ nguyên logic cũ
   // --- CẬP NHẬT SỐ LIỆU CHO 4 Ô MÀU ---
    function renderOverview() {
        // 1. Tính toán số liệu
        // Doanh thu: Chỉ cộng đơn "Giao thành công"
        const validOrders = realOrders.filter(o => o.status === 'Giao thành công');
        const totalRev = validOrders.reduce((sum, item) => sum + item.total, 0);
        
        // Đơn chờ xử lý: Đếm số đơn "Chờ xác nhận"
        const pendingOrders = realOrders.filter(o => o.status === 'Chờ xác nhận').length;

        // 2. Điền vào HTML (Các ID này khớp với code HTML ở trên)
        // Ô Doanh thu (Xanh lá)
        const elRev = document.getElementById('dash-revenue');
        if(elRev) elRev.textContent = formatVND(totalRev);

        // Ô Đơn chờ xử lý (Vàng)
        const elOrder = document.getElementById('dash-orders');
        if(elOrder) elOrder.textContent = pendingOrders; 

        // Ô Kho sản phẩm (Đỏ)
        const elProd = document.getElementById('dash-products');
        if(elProd) elProd.textContent = products.length;

        // Ô Khách hàng (Xanh dương)
        const elUser = document.getElementById('dash-users');
        if(elUser) elUser.textContent = realCustomers.length;

        // 3. Cập nhật ngày giờ (nếu có)
        const elTime = document.getElementById('last-updated');
        if(elTime) {
             const now = new Date();
             elTime.textContent = `${now.getHours()}:${now.getMinutes()} ${now.getDate()}/${now.getMonth()+1}/${now.getFullYear()}`;
        }

        // 4. Vẽ lại biểu đồ
        renderCharts('day');
    }

    // --- 4. NAVIGATION ---
    window.navigateTo = function(sectionId) { const menuItem = document.querySelector(`.sidebar-item[data-section="${sectionId}"]`); if(menuItem) menuItem.click(); }
    document.querySelectorAll('.sidebar-item').forEach(item => {
        item.addEventListener('click', function() {
            document.querySelectorAll('.sidebar-item').forEach(i => i.classList.remove('active'));
            document.querySelectorAll('.section').forEach(s => s.classList.remove('active'));
            this.classList.add('active');
            const secId = this.getAttribute('data-section');
            document.getElementById(secId).classList.add('active');
            if(secId === 'tong-quan') renderOverview();
            if(secId === 'san-pham') showProduct();
            if(secId === 'don-hang') findOrder();
            if(secId === 'khach-hang') showUser();
            if(secId === 'thuong-hieu') renderBrands();
            if(secId === 'danh-muc') renderCategories();
            if(secId === 'thong-ke') thongKe();
        });
    });

    // --- 5. QUẢN LÝ DANH MỤC / THƯƠNG HIỆU ---
    function renderCategories() {
        const el = document.getElementById('show-category'); if(!el) return; el.innerHTML = '';
        categoriesData.forEach(c => { el.innerHTML += `<tr><td class="text-muted">#${c.id}</td><td class="fw-bold">${c.name}</td><td>${c.desc}</td><td class="text-end"><button class="btn btn-sm btn-light text-primary me-2" onclick="window.openGenericModal('category', '${c.id}')"><i class="bi bi-pencil-square"></i></button><button class="btn btn-sm btn-light text-danger" onclick="window.deleteGeneric('category', '${c.id}')"><i class="bi bi-trash"></i></button></td></tr>`; });
    }
    window.deleteGeneric = function(type, id) {
        if(!confirm('Bạn có chắc chắn muốn xóa mục này?')) return;
        if (type === 'brand') { brandsData = brandsData.filter(x => x.id !== id); localStorage.setItem('brandsData', JSON.stringify(brandsData)); renderBrands(); } 
        else { categoriesData = categoriesData.filter(x => x.id !== id); localStorage.setItem('categoriesData', JSON.stringify(categoriesData)); renderCategories(); }
    }
    function renderBrands() {
        const el = document.getElementById('show-brand'); if(!el) return; el.innerHTML = '';
        brandsData.forEach(b => {
             let imgHTML = b.img && b.img.includes('pic/') ? `<img src="${b.img}" style="width: 50px; height: 30px; object-fit: contain;">` : `<div class="bg-light rounded text-center small py-1" style="width:50px">${b.name.charAt(0)}</div>`;
            el.innerHTML += `<tr><td>${imgHTML}</td><td class="fw-bold">${b.name}</td><td class="text-muted small">${b.desc}</td><td class="text-end"><button class="btn btn-sm btn-light text-primary me-2" onclick="window.openGenericModal('brand', '${b.id}')"><i class="bi bi-pencil-square"></i></button><button class="btn btn-sm btn-light text-danger" onclick="window.deleteGeneric('brand', '${b.id}')"><i class="bi bi-trash"></i></button></td></tr>`;
        });
    }
    window.openGenericModal = function(type, id) {
        const modal = new bootstrap.Modal(document.getElementById('genericEditModal'));
        document.getElementById('generic-type').value = type;
        document.getElementById('generic-id').value = id;
        let data = (type === 'brand') ? brandsData : categoriesData;
        let item = data.find(x => x.id === id);
        if(item) {
            document.getElementById('generic-modal-title').textContent = `Cập nhật ${type === 'brand' ? 'Thương hiệu' : 'Danh mục'}`;
            document.getElementById('generic-name').value = item.name;
            document.getElementById('generic-desc').value = item.desc;
        } else {
            document.getElementById('generic-modal-title').textContent = `Thêm mới ${type === 'brand' ? 'Thương hiệu' : 'Danh mục'}`;
            document.getElementById('generic-name').value = '';
            document.getElementById('generic-desc').value = '';
        }
        modal.show();
    }
    window.addNewBrand = function() { window.openGenericModal('brand', ''); }
    window.addNewCategory = function() { window.openGenericModal('category', ''); }
    document.getElementById('btn-save-generic').addEventListener('click', function() {
        const type = document.getElementById('generic-type').value;
        const id = document.getElementById('generic-id').value;
        const name = document.getElementById('generic-name').value;
        const desc = document.getElementById('generic-desc').value;
        if(!name) { alert('Nhập tên!'); return; }
        let data = (type === 'brand') ? brandsData : categoriesData;
        if (id) { let idx = data.findIndex(x => x.id === id); if(idx !== -1) { data[idx].name = name; data[idx].desc = desc; } } 
        else { data.push({id: (type==='brand'?'b':'c') + Date.now(), name, desc, img: ''}); }
        if(type === 'brand') localStorage.setItem('brandsData', JSON.stringify(data)); else localStorage.setItem('categoriesData', JSON.stringify(data));
        bootstrap.Modal.getInstance(document.getElementById('genericEditModal')).hide();
        if(type === 'brand') renderBrands(); else renderCategories();
    });

    // --- 6. QUẢN LÝ ĐƠN HÀNG ---
   // --- 6. QUẢN LÝ ĐƠN HÀNG (GIAO DIỆN PRO) ---
    function findOrder() {
        const el = document.getElementById('showOrder'); 
        if(!el) return; 
        el.innerHTML = '';
        
        // Sắp xếp đơn mới nhất lên đầu
        realOrders.sort((a, b) => { 
            let da = a.date.split('/').reverse().join('-'); 
            let db = b.date.split('/').reverse().join('-'); 
            return new Date(db) - new Date(da); 
        });

        realOrders.forEach(o => {
            // 1. Xác định màu sắc Badge dựa trên trạng thái
            let badgeClass = 'status-cho-xac-nhan';
            let statusText = o.status;
            
            if (o.status === 'Đã xác nhận') badgeClass = 'status-da-xac-nhan';
            else if (o.status === 'Đang giao') badgeClass = 'status-dang-giao';
            else if (o.status === 'Giao thành công') badgeClass = 'status-thanh-cong';
            else if (o.status === 'Đã hủy') badgeClass = 'status-da-huy';

            // 2. Tạo Menu Thao tác (Dropdown) thay cho thẻ <select> cũ
            // Chỉ hiện các nút phù hợp với trạng thái hiện tại để đỡ rối
           // 2. Tạo Menu Thao tác (Dropdown) FULL món
            let actionMenu = '';
            
            // Nếu đơn đã xong/hủy thì chỉ cho xem hoặc phục hồi lại (nếu cần)
            if(o.status === 'Đã hủy' || o.status === 'Giao thành công') {
                 actionMenu = `
                    <li><h6 class="dropdown-header">Thao tác</h6></li>
                    <li><a class="dropdown-item text-muted" href="#"><i class="bi bi-eye me-2"></i>Xem chi tiết</a></li>
                    <li><hr class="dropdown-divider"></li>
                    <li><a class="dropdown-item" href="#" onclick="window.updateOrderStatus('${o.id}', 'Chờ xác nhận')"><i class="bi bi-arrow-counterclockwise me-2"></i>Khôi phục đơn</a></li>
                 `;
            } else {
                 // Đơn đang chạy: Hiện đủ 5 trạng thái để lỡ bấm nhầm còn chọn lại được
                 actionMenu = `
                    <li><h6 class="dropdown-header">Cập nhật trạng thái</h6></li>
                    
                    <li><a class="dropdown-item" href="#" onclick="window.updateOrderStatus('${o.id}', 'Chờ xác nhận')"><i class="bi bi-hourglass-split text-warning me-2"></i>Chờ xác nhận</a></li>
                    
                    <li><a class="dropdown-item" href="#" onclick="window.updateOrderStatus('${o.id}', 'Đã xác nhận')"><i class="bi bi-check-circle text-primary me-2"></i>Đã xác nhận</a></li>
                    <li><a class="dropdown-item" href="#" onclick="window.updateOrderStatus('${o.id}', 'Đang giao')"><i class="bi bi-truck text-info me-2"></i>Đang giao hàng</a></li>
                    <li><a class="dropdown-item" href="#" onclick="window.updateOrderStatus('${o.id}', 'Giao thành công')"><i class="bi bi-check-all text-success me-2"></i>Giao thành công</a></li>
                    
                    <li><hr class="dropdown-divider"></li>
                    <li><a class="dropdown-item text-danger" href="#" onclick="window.updateOrderStatus('${o.id}', 'Đã hủy')"><i class="bi bi-x-circle me-2"></i>Hủy đơn hàng</a></li>
                 `;
            }
            // 3. Render ra bảng
            el.innerHTML += `
                <tr>
                    <td><span class="fw-bold text-primary">#${o.id}</span></td>
                    <td>
                        <div class="d-flex align-items-center">
                            <div class="bg-light rounded-circle d-flex align-items-center justify-content-center me-2" style="width:35px; height:35px; color:#555;">
                                <i class="bi bi-person-fill"></i>
                            </div>
                            <div>
                                <div class="fw-bold text-dark" style="font-size: 0.9rem;">${o.customer}</div>
                                <small class="text-muted" style="font-size: 0.8rem;">${o.phone}</small>
                            </div>
                        </div>
                    </td>
                    <td>${o.date}</td>
                    <td class="fw-bold text-dark">${formatVND(o.total)}</td>
                    
                    <td><span class="${badgeClass}">${statusText}</span></td>
                    
                    <td>
                        <div class="dropdown btn-action-group">
                            <button class="btn btn-light btn-sm dropdown-toggle border shadow-sm" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                                <i class="bi bi-gear-fill me-1"></i> Xử lý
                            </button>
                            <ul class="dropdown-menu dropdown-menu-end shadow border-0 rounded-3">
                                ${actionMenu}
                            </ul>
                        </div>
                    </td>
                </tr>
            `;
        });
    }
    window.updateOrderStatus = function(id, st) {
        const idx = realOrders.findIndex(o => o.id == id);
        if(idx !== -1) { realOrders[idx].status = st; localStorage.setItem('perfumeOrders_Real', JSON.stringify(realOrders)); findOrder(); renderOverview(); }
    }

    // --- 7. QUẢN LÝ SẢN PHẨM (SỬA ĐỔI: NHẬP LINK ẢNH) ---
    let adminPage = 1; const adminLimit = 10;
    function showProduct() {
        const el = document.getElementById('show-product');
        const pagiEl = document.getElementById('admin-pagination');
        if (!el) return;
        const totalPages = Math.ceil(products.length / adminLimit);
        if (adminPage > totalPages) adminPage = 1;
        const start = (adminPage - 1) * adminLimit;
        const end = start + adminLimit;
        const pageProducts = products.slice(start, end);
        let html = `<table class="table table-custom table-hover align-middle mb-0"><thead><tr><th>#</th><th>Ảnh</th><th>Tên SP</th><th>Thương hiệu</th><th>Kho</th><th class="text-end">Hành động</th></tr></thead><tbody>`;
        if (products.length === 0) html += '<tr><td colspan="6" class="text-center py-5 text-muted">Kho trống.</td></tr>';
        else {
            pageProducts.forEach((p, i) => {
                let totalStock = 0; if(p.sizes) p.sizes.forEach(s => totalStock += (s.stock || 0));
                let stockClass = totalStock < 10 ? 'badge-light-danger' : 'badge-light-success';
                html += `<tr><td>${start + i + 1}</td><td><img src="${p.image||''}" width="40" style="object-fit:contain;"></td><td>${p.name}</td><td>${p.brand}</td><td><span class="badge ${stockClass}">${totalStock}</span></td><td class="text-end"><button onclick="window.editProduct('${p.id}')" class="btn btn-sm btn-light"><i class="bi bi-pencil"></i></button> <button onclick="window.deleteProduct('${p.id}')" class="btn btn-sm btn-light text-danger"><i class="bi bi-trash"></i></button></td></tr>`;
            });
        }
        el.innerHTML = html + '</tbody></table>';
        if(pagiEl) { pagiEl.innerHTML = ''; for(let i=1; i<=totalPages; i++) pagiEl.innerHTML += `<li class="page-item ${i===adminPage?'active':''}"><button class="page-link" onclick="window.changeAdminPage(${i})">${i}</button></li>`; }
    }
    window.changeAdminPage = function(p) { adminPage = p; showProduct(); }
    window.deleteProduct = function(id) { if (confirm('Xóa?')) { products = products.filter(p => p.id != id); localStorage.setItem('productsData_v2', JSON.stringify(products)); showProduct(); renderOverview(); } };
    
    // SỬA: Edit product giờ sẽ điền link vào ô text input
    window.editProduct = function(id) {
        const p = products.find(x => x.id == id); if (!p) return;
        document.getElementById('edit-product-id').value = p.id; 
        document.getElementById('new-name').value = p.name;
        document.getElementById('new-brand').value = p.brand;
        document.getElementById('new-type').value = p.type;
        document.getElementById('new-short').value = p.short || '';
        document.getElementById('new-discount').value = p.discount || 0;
        document.getElementById('new-isNew').value = p.isNew ? 'true' : 'false';
        document.getElementById('new-isFeatured').value = p.isFeatured ? 'true' : 'false';
        ['50','75','100'].forEach(s => { document.getElementById(`price-${s}`).value=''; document.getElementById(`stock-${s}`).value=''; });
        if (p.sizes) { p.sizes.forEach(s => { if([50,75,100].includes(s.ml)) { document.getElementById(`price-${s.ml}`).value = s.price; document.getElementById(`stock-${s.ml}`).value = s.stock || 0; } }); }
        
        // Gán link ảnh vào ô input text
        document.getElementById('new-image-path').value = p.image || '';
        document.getElementById('preview-img').src = p.image || 'https://via.placeholder.com/150';
        document.getElementById('preview-box').style.display = 'block';
        
        new bootstrap.Modal(document.getElementById('addProductModal')).show();
    }

    const btnSaveNew = document.getElementById('btn-save-new-product');
    if (btnSaveNew) {
        btnSaveNew.addEventListener('click', function() {
             const idEdit = document.getElementById('edit-product-id').value;
             const name = document.getElementById('new-name').value;
             const brand = document.getElementById('new-brand').value;
             const type = document.getElementById('new-type').value;
             const shortDesc = document.getElementById('new-short').value;
             const discount = Number(document.getElementById('new-discount').value) || 0;
             const isNew = document.getElementById('new-isNew').value === 'true';
             const isFeatured = document.getElementById('new-isFeatured').value === 'true';
             if (discount < 0) { alert('Giảm giá lỗi!'); return; }
             let sizesArr = [];
             [50,75,100].forEach(ml => { const p = document.getElementById(`price-${ml}`).value; const s = document.getElementById(`stock-${ml}`).value; if(p) sizesArr.push({ ml: ml, price: Number(p), stock: Number(s)||0 }); });
             if (sizesArr.some(s => s.price < 0 || s.stock < 0)) { alert('Không nhập số âm!'); return; }
             if(!name || sizesArr.length === 0) { alert('Thiếu tên/giá!'); return; }
             
             // SỬA: Lấy link từ ô text thay vì biến global file base64
             const imgPath = document.getElementById('new-image-path').value;

             const newP = { 
                 id: idEdit || 'sp-' + Date.now(), 
                 name, brand, type, short: shortDesc, discount, isNew, isFeatured, 
                 sizes: sizesArr, 
                 image: imgPath || 'https://via.placeholder.com/150' // Lưu chuỗi text
             };

             if(idEdit) { const idx = products.findIndex(x => x.id == idEdit); if(idx !== -1) products[idx] = newP; } else { products.unshift(newP); }
             localStorage.setItem('productsData_v2', JSON.stringify(products));
             showProduct(); renderOverview();
             bootstrap.Modal.getInstance(document.getElementById('addProductModal')).hide();
        });
    }
    
    // Reset form khi bấm thêm mới
    document.getElementById('btn-add-product').addEventListener('click', function() { 
        document.getElementById('form-add-product').reset(); 
        document.getElementById('edit-product-id').value = ''; 
        document.getElementById('new-image-path').value = ''; 
        document.getElementById('preview-img').src = 'https://via.placeholder.com/150';
        document.getElementById('preview-box').style.display = 'block'; 
        new bootstrap.Modal(document.getElementById('addProductModal')).show(); 
    });

    function showUser() { const el = document.getElementById('show-user'); if(!el) return; el.innerHTML = ''; realCustomers.forEach((c, i) => { el.innerHTML += `<tr><td>${i+1}</td><td><span class="fw-bold text-dark">${c.name}</span></td><td>${c.email}</td><td>${c.joined}</td><td><span class="badge badge-light-success px-3">Active</span></td><td class="text-center"><button class="btn btn-sm btn-icon btn-light text-danger" onclick="deleteCustomer(${i})"><i class="bi bi-trash"></i></button></td></tr>`; }); }
    window.deleteCustomer = function(idx) { if(confirm('Xóa?')) { realCustomers.splice(idx, 1); localStorage.setItem('perfumeCustomers', JSON.stringify(realCustomers)); showUser(); } }
   // --- 7. BÁO CÁO & THỐNG KÊ CHI TIẾT ---
   // --- 7. BÁO CÁO & THỐNG KÊ (SỬA LẠI: TÍNH TOÁN CHO TAB BÁO CÁO) ---
    // --- 7. BÁO CÁO & THỐNG KÊ (NÂNG CẤP: THÊM BIỂU ĐỒ XỊN) ---
    let brandChartInstance = null;
    let cateChartInstance = null;

    function thongKe() {
        // --- A. XỬ LÝ DỮ LIỆU ---
        let brandStats = {}; // { 'Dior': 5000000, 'Chanel': 2000000... }
        let typeStats = { 'nam': 0, 'nu': 0, 'unisex': 0 };
        let salesStats = {}; // Dùng cho bảng Top sản phẩm

        // Khởi tạo stats sản phẩm
        products.forEach(p => salesStats[p.id] = { qty: 0, revenue: 0 });

        // Duyệt đơn hàng thành công
        realOrders.forEach(order => {
            if (order.status === 'Giao thành công' && order.items) {
                order.items.forEach(item => {
                    const productInfo = products.find(p => p.id === item.id);
                    if (productInfo) {
                        const money = (item.price * (item.quantity || 1));
                        
                        // 1. Cộng doanh thu theo Hãng (Chuẩn hóa tên hãng)
                        let brandName = productInfo.brand ? productInfo.brand.trim() : 'Khác';
                        // Viết hoa chữ cái đầu cho đẹp
                        brandName = brandName.charAt(0).toUpperCase() + brandName.slice(1);
                        
                        if (!brandStats[brandName]) brandStats[brandName] = 0;
                        brandStats[brandName] += money;

                        // 2. Cộng số lượng theo Loại
                        if(productInfo.type) typeStats[productInfo.type] += (item.quantity || 1);

                        // 3. Cộng cho bảng Top sản phẩm
                        if(salesStats[item.id]) {
                            salesStats[item.id].qty += (item.quantity || 1);
                            salesStats[item.id].revenue += money;
                        }
                    }
                });
            }
        });

        // --- B. VẼ BIỂU ĐỒ THƯƠNG HIỆU (POLAR AREA - NHÌN XỊN) ---
        const ctxBrand = document.getElementById('brandChart');
        if (ctxBrand) {
            if (brandChartInstance) brandChartInstance.destroy();
            const brands = Object.keys(brandStats);
            const revenues = Object.values(brandStats);
            
            // Bộ màu Pastel sang trọng
            const bgColors = [
                'rgba(255, 99, 132, 0.7)', 'rgba(54, 162, 235, 0.7)', 'rgba(255, 206, 86, 0.7)', 
                'rgba(75, 192, 192, 0.7)', 'rgba(153, 102, 255, 0.7)', 'rgba(255, 159, 64, 0.7)'
            ];

            brandChartInstance = new Chart(ctxBrand, {
                type: 'polarArea', // Loại biểu đồ cực (trông như bông hoa)
                data: {
                    labels: brands,
                    datasets: [{
                        data: revenues,
                        backgroundColor: bgColors,
                        borderWidth: 1
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                        legend: { position: 'right' }, // Chú thích nằm bên phải
                        tooltip: { callbacks: { label: function(context) { return ' ' + formatVND(context.raw); } } }
                    },
                    scales: { r: { ticks: { display: false } } } // Ẩn số trên trục cho gọn
                }
            });
        }

        // --- C. VẼ BIỂU ĐỒ DANH MỤC (DOUGHNUT) ---
        const ctxCate = document.getElementById('categoryChart');
        if (ctxCate) {
            if (cateChartInstance) cateChartInstance.destroy();
            cateChartInstance = new Chart(ctxCate, {
                type: 'doughnut',
                data: {
                    labels: ['Nam', 'Nữ', 'Unisex'],
                    datasets: [{
                        data: [typeStats.nam, typeStats.nu, typeStats.unisex],
                        backgroundColor: ['#3699ff', '#f1416c', '#7239ea'], // Xanh - Đỏ - Tím
                        borderWidth: 0,
                        hoverOffset: 4
                    }]
                },
                options: {
                    responsive: true,
                    plugins: { legend: { position: 'bottom', labels: { usePointStyle: true, boxWidth: 8 } } },
                    cutout: '65%' // Làm vòng tròn mỏng thanh thoát
                }
            });
        }

        // --- D. HIỂN THỊ BẢNG TOP SẢN PHẨM (CODE CŨ NHƯNG THÊM STYLE) ---
        const el = document.getElementById('showTk');
        if(el) {
            el.innerHTML = '';
            let rankedProducts = products.map(p => ({ ...p, soldQty: salesStats[p.id].qty, soldRevenue: salesStats[p.id].revenue }));
            rankedProducts.sort((a, b) => b.soldQty - a.soldQty); // Sắp xếp

            rankedProducts.slice(0, 5).forEach((p, i) => {
                let totalStock = p.sizes ? p.sizes.reduce((s,z)=>s+(z.stock||0),0) : 0;
                let soldDisplay = p.soldQty > 0 ? `<span class="fw-bold text-dark">${p.soldQty}</span>` : '<span class="text-muted">-</span>';
                let revDisplay = p.soldRevenue > 0 ? `<span class="fw-bold text-success">${formatVND(p.soldRevenue)}</span>` : '<span class="text-muted">-</span>';
                
                // Thêm icon Top 1, 2, 3
                let rankIcon = i===0 ? '🥇' : (i===1 ? '🥈' : (i===2 ? '🥉' : `#${i+1}`));

                el.innerHTML += `
                    <tr>
                        <td class="ps-4 fw-bold text-muted">${rankIcon}</td>
                        <td>
                            <div class="d-flex align-items-center">
                                <img src="${p.image}" width="40" height="40" class="rounded border p-1 me-2 bg-white" style="object-fit:contain;">
                                <div><div class="fw-bold text-dark text-truncate" style="max-width: 150px;">${p.name}</div><small class="text-muted">${p.brand}</small></div>
                            </div>
                        </td>
                        <td class="text-center">${soldDisplay}</td>
                        <td class="text-center"><span class="badge bg-light text-dark border">${totalStock}</span></td>
                        <td class="text-end pe-4">${revDisplay}</td>
                    </tr>`;
            });
        }

        // --- E. CẢNH BÁO TỒN KHO (GIỮ NGUYÊN) ---
        const alertEl = document.getElementById('low-stock-alert');
        if(alertEl) {
            alertEl.innerHTML = '';
            let hasAlert = false;
            products.forEach(p => {
                let totalS = p.sizes ? p.sizes.reduce((s,z)=>s+(z.stock||0),0) : 0;
                if(totalS < 10) { 
                    hasAlert = true;
                    alertEl.innerHTML += `<div class="d-flex justify-content-between align-items-center mb-3 pb-3 border-bottom"><div><h6 class="mb-0 text-dark fw-bold" style="font-size:0.9rem">${p.name}</h6><small class="text-danger">Sắp hết (Còn ${totalS})</small></div><i class="bi bi-exclamation-triangle-fill text-warning"></i></div>`;
                }
            });
            if(!hasAlert) alertEl.innerHTML = '<div class="text-center py-4 text-success"><i class="bi bi-shield-check fs-1"></i><p class="mt-2 mb-0 fw-bold">Kho ổn định</p></div>';
        }
    }
    // --- HÀM XEM CHI TIẾT ĐƠN HÀNG (MỚI) ---
    window.viewOrderDetail = function(id) {
        // 1. Tìm đơn hàng
        const order = realOrders.find(o => o.id === id);
        if (!order) return;

        // 2. Điền thông tin khách
        document.getElementById('order-detail-id').textContent = `Chi tiết đơn hàng #${order.id}`;
        document.getElementById('od-customer').textContent = order.customer;
        document.getElementById('od-phone').textContent = order.phone;
        document.getElementById('od-email').textContent = order.email || 'Không có email';
        document.getElementById('od-address').textContent = order.address || 'Tại cửa hàng';
        document.getElementById('od-date').textContent = order.date;
        document.getElementById('od-payment').textContent = order.paymentMethod || 'COD';
        document.getElementById('od-total').textContent = formatVND(order.total);

        // 3. Điền danh sách món hàng
        const listEl = document.getElementById('od-items-list');
        listEl.innerHTML = '';
        
        if (order.items && order.items.length > 0) {
            order.items.forEach(item => {
                let img = item.image || 'https://via.placeholder.com/50';
                listEl.innerHTML += `
                    <tr class="border-bottom">
                        <td style="width: 60px;"><img src="${img}" class="rounded border" width="50" height="50" style="object-fit:contain;"></td>
                        <td>
                            <div class="fw-bold text-dark">${item.name}</div>
                            <small class="text-muted">Phân loại: ${item.ml}ml</small>
                        </td>
                        <td class="text-center">x${item.quantity || 1}</td>
                        <td class="text-end fw-bold">${formatVND(item.price * (item.quantity||1))}</td>
                    </tr>
                `;
            });
        } else {
            listEl.innerHTML = '<tr><td colspan="4" class="text-center text-muted">Không có thông tin sản phẩm</td></tr>';
        }

        // 4. Hiện Modal lên
        new bootstrap.Modal(document.getElementById('orderDetailModal')).show();
    }


    renderOverview();
    showProduct();
});
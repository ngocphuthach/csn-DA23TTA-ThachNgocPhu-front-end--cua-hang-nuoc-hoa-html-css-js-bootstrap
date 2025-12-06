document.addEventListener('DOMContentLoaded', function() {
  
  // =================================================================
  // === DỮ LIỆU GỐC VÀ MOCK DATA ===
  // =================================================================
  
  // Dữ liệu MẶC ĐỊNH (49 SẢN PHẨM) - Dùng để khởi tạo lần đầu
  const DEFAULT_PRODUCTS_DATA = [
    {
      id: 'dior-1',
      name: 'Dior Sauvage Elixir',
      image: 'pic/diorsauvage.jpg',
      short: 'Hương thơm đậm đặc, nam tính.',
      type: 'nam',
      brand: 'dior',
      sizes: [
        { ml: 50, price: 3200000 },
        { ml: 75, price: 3700000 },
        { ml: 100, price: 4150000 }
      ]
    },
    {
      id: 'dior-2',
      name: 'Dior J’adore Eau de Parfum',
      image: 'pic/diorjadore.jpg',
      short: 'Nữ tính, hoa cỏ sang trọng.',
      type: 'nu',
      brand: 'dior',
      sizes: [
        { ml: 50, price: 3100000 },
        { ml: 75, price: 3500000 },
        { ml: 100, price: 3900000 }
      ]
    },
    {
      id: 'dior-3',
      name: 'Miss Dior Blooming Bouquet',
      image: 'pic/diormiss.jpg',
      short: 'Mùi hoa tươi, nhẹ nhàng.',
      type: 'nu',
      brand: 'dior',
      sizes: [
        { ml: 50, price: 2300000 },
        { ml: 75, price: 2700000 },
        { ml: 100, price: 3000000 }
      ]
    },
    {
      id: 'dior-4',
      name: 'Dior Homme Intense',
      image: 'pic/diorhomme.jpg',
      short: 'Hương ấm, gợi cảm cho nam.',
      type: 'nam',
      brand: 'dior',
      sizes: [
        { ml: 50, price: 2900000 },
        { ml: 75, price: 3300000 },
        { ml: 100, price: 3600000 }
      ]
    },
    {
      id: 'dior-5',
      name: 'Dior Hypnotic Poison',
      image: 'pic/diorhypnotic.jpg',
      short: 'Bí ẩn, gợi cảm, quyến rũ.',
      type: 'nu',
      brand: 'dior',
      sizes: [
        { ml: 50, price: 1800000 },
        { ml: 75, price: 2200000 },
        { ml: 100, price: 2500000 }
      ]
    },
    {
      id: 'dior-6',
      name: 'Dior Oud Ispahan',
      image: 'pic/diorispahan.jpg',
      short: 'Hương gỗ oud nồng nàn.',
      type: 'unisex',
      brand: 'dior',
      sizes: [
        { ml: 50, price: 3800000 },
        { ml: 75, price: 4000000 },
        { ml: 100, price: 4200000 }
      ]
    },
    {
      id: 'chanel-1',
      name: 'Bleu de Chanel',
      image: 'pic/chanelbleu.jpg', 
      short: 'Hương gỗ thơm, nam tính, lịch lãm.',
      type: 'nam',
      brand: 'chanel',
      sizes: [
        { ml: 50, price: 2900000 },
        { ml: 75, price: 3400000 },
        { ml: 100, price: 3900000 }
      ]
    },
    {
      id: 'chanel-2',
      name: 'Chanel Coco Mademoiselle',
      image: 'pic/chanelcoco.jpg', 
      short: 'Hương hoa cỏ Chypre, nữ tính.',
      type: 'nu',
      brand: 'chanel',
      sizes: [
        { ml: 50, price: 3200000 },
        { ml: 75, price: 3700000 },
        { ml: 100, price: 4100000 }
      ]
    },
    {
      id: 'chanel-3',
      name: 'Chanel Chance Eau Tendre',
      image: 'pic/chanelchance.jpg',
      short: 'Hương hoa cỏ trái cây, tươi mát.',
      type: 'nu',
      brand: 'chanel',
      sizes: [
        { ml: 50, price: 2950000 },
        { ml: 75, price: 3450000 },
        { ml: 100, price: 3800000 }
      ]
    },
    {
      id: 'chanel-4',
      name: 'Chanel No19 EDP',
      image: 'pic/chanelNo19.jpg',
      short: 'Hương hoa cỏ xanh.',
      type: 'unisex',
      brand: 'chanel',
      sizes: [
        { ml: 50, price: 3700000 },
        { ml: 75, price: 390000 },
        { ml: 100, price: 4100000 }
      ]
    },
    {
      id: 'chanel-5',
      name: 'Chanel 1957',
      image: 'pic/chanel1957.jpg',
      short: 'Xạ hương trắng, hoa cam.',
      type: 'unisex',
      brand: 'chanel',
      sizes: [
        { ml: 50, price: 6200000 },
        { ml: 75, price: 6680000 },
        { ml: 100, price: 7100000 }
      ]
    },
    /* === KHUNG 38 SẢN PHẨM MỚI === */
    {
        id: 'gucci-1', name: 'Gucci Flora Gorgeous Gardenia', image: 'pic/gucci/gucci_1.jpg', short: 'Hương hoa quả ngọt ngào.', type: 'nu', brand: 'gucci', sizes: [{ ml: 50, price: 2950000 }, { ml: 100, price: 3800000 }]
    },
    {
        id: 'gucci-2', name: 'Gucci Guilty Pour Homme EDP', image: 'pic/gucci/gucci_2.jpg', short: 'Gỗ thơm nồng ấm, cổ điển.', type: 'nam', brand: 'gucci', sizes: [{ ml: 50, price: 3000000 }, { ml: 90, price: 3900000 }]
    },
    {
        id: 'gucci-3', name: 'Gucci Bloom Eau de Parfum', image: 'pic/gucci/gucci_3.jpg', short: 'Mùi hoa huệ tự nhiên, thanh lịch.', type: 'nu', brand: 'gucci', sizes: [{ ml: 50, price: 2500000 }, { ml: 100, price: 3300000 }]
    },
    {
        id: 'gucci-4', name: 'Gucci Rush', image: 'pic/gucci/gucci_4.jpg', short: 'Hương nồng, hiện đại, vỏ đỏ.', type: 'nu', brand: 'gucci', sizes: [{ ml: 50, price: 2100000 }, { ml: 75, price: 2600000 }]
    },
    {
        id: 'gucci-5', name: 'Gucci Guilty Intense Pour Femme', image: 'pic/gucci/gucci_5.jpg', short: 'Hổ phách, hoa tử đinh hương.', type: 'nu', brand: 'gucci', sizes: [{ ml: 50, price: 2500000 }, { ml: 90, price: 3500000 }]
    },
    {
        id: 'versace-1', name: 'Versace Eros EDT', image: 'pic/versace/versace_1.jpg', short: 'Hương thơm tươi mát, mạnh mẽ.', type: 'nam', brand: 'versace', sizes: [{ ml: 50, price: 1750000 }, { ml: 100, price: 2500000 }]
    },
    {
        id: 'versace-2', name: 'Versace Bright Crystal', image: 'pic/versace/versace_2.jpg', short: 'Hoa cỏ tươi, nhẹ nhàng, phổ biến.', type: 'nu', brand: 'versace', sizes: [{ ml: 50, price: 1600000 }, { ml: 90, price: 2150000 }]
    },
    {
        id: 'versace-3', name: 'Versace Pour Homme Dylan Blue', image: 'pic/versace/versace_3.jpg', short: 'Thơm mát đại dương, nam tính.', type: 'nam', brand: 'versace', sizes: [{ ml: 50, price: 1800000 }, { ml: 100, price: 2600000 }]
    },
    {
        id: 'versace-4', name: 'Versace Yellow Diamond', image: 'pic/versace/versace_4.jpg', short: 'Hương hoa cỏ trái cây, hiện đại.', type: 'nu', brand: 'versace', sizes: [{ ml: 50, price: 1900000 }, { ml: 90, price: 2750000 }]
    },
    {
        id: 'versace-5', name: 'Versace Crystal Noir', image: 'pic/versace/versace_5.jpg', short: 'Bí ẩn, gợi cảm với hương hoa.', type: 'nu', brand: 'versace', sizes: [{ ml: 50, price: 1700000 }, { ml: 90, price: 2400000 }]
    },
    {
        id: 'ysl-1', name: 'YSL Libre Eau de Parfum', image: 'pic/ysl/ysl_1.jpg', short: 'Hương hoa Lavender hiện đại.', type: 'nu', brand: 'ysl', sizes: [{ ml: 50, price: 3200000 }, { ml: 90, price: 4100000 }]
    },
    {
        id: 'ysl-2', name: 'YSL Y Eau de Parfum', image: 'pic/ysl/ysl_2.jpg', short: 'Gỗ tươi, mạnh mẽ và nam tính.', type: 'nam', brand: 'ysl', sizes: [{ ml: 60, price: 2800000 }, { ml: 100, price: 3650000 }]
    },
    {
        id: 'ysl-3', name: 'YSL Black Opium', image: 'pic/ysl/ysl_3.jpg', short: 'Cà phê, Vani, gợi cảm và lôi cuốn.', type: 'nu', brand: 'ysl', sizes: [{ ml: 50, price: 3100000 }, { ml: 90, price: 4000000 }]
    },
    {
        id: 'ysl-4', name: 'YSL L\'Homme EDT', image: 'pic/ysl/ysl_4.jpg', short: 'Hương gỗ, gia vị nhẹ nhàng.', type: 'nam', brand: 'ysl', sizes: [{ ml: 50, price: 1600000 }, { ml: 100, price: 2300000 }]
    },
    {
        id: 'ysl-5', name: 'YSL Mon Paris', image: 'pic/ysl/ysl_5.jpg', short: 'Dâu tây, hoa nhài, lãng mạn.', type: 'nu', brand: 'ysl', sizes: [{ ml: 50, price: 2900000 }, { ml: 90, price: 3700000 }]
    },
    {
        id: 'armani-1', name: 'Armani Acqua di Gio Profumo', image: 'pic/armani/armani_1.jpg', short: 'Hương biển, trầm hương, nam tính.', type: 'nam', brand: 'armani', sizes: [{ ml: 75, price: 2500000 }, { ml: 125, price: 3400000 }]
    },
    {
        id: 'armani-2', name: 'Armani Si Passione EDP', image: 'pic/armani/armani_2.jpg', short: 'Nữ tính, quả lý chua đen, quyến rũ.', type: 'nu', brand: 'armani', sizes: [{ ml: 50, price: 3100000 }, { ml: 100, price: 3900000 }]
    },
    {
        id: 'armani-3', name: 'Armani My Way', image: 'pic/armani/armani_3.jpg', short: 'Hoa trắng hiện đại, thanh lịch.', type: 'nu', brand: 'armani', sizes: [{ ml: 50, price: 3000000 }, { ml: 90, price: 3800000 }]
    },
    {
        id: 'armani-4', name: 'Armani Code Pour Homme', image: 'pic/armani/armani_4.jpg', short: 'Hương da thuộc, gợi cảm, ấm áp.', type: 'nam', brand: 'armani', sizes: [{ ml: 75, price: 2400000 }, { ml: 125, price: 3100000 }]
    },
    {
        id: 'armani-5', name: 'Armani Prive Rose d’Arabie', image: 'pic/armani/armani_5.jpg', short: 'Hương hoa hồng phương Đông, sang trọng.', type: 'unisex', brand: 'armani', sizes: [{ ml: 100, price: 8500000 }]
    },
    {
        id: 'tomford-1', name: 'Tom Ford Black Orchid EDP', image: 'pic/tomford/tomford_1.jpg', short: 'Hương trầm, nấm truffle, bí ẩn.', type: 'unisex', brand: 'tomford', sizes: [{ ml: 50, price: 4500000 }, { ml: 100, price: 6200000 }]
    },
    {
        id: 'tomford-2', name: 'Tom Ford Tobacco Vanille', image: 'pic/tomford/tomford_2.jpg', short: 'Thuốc lá, vani, mạnh mẽ.', type: 'unisex', brand: 'tomford', sizes: [{ ml: 50, price: 5500000 }, { ml: 100, price: 7900000 }]
    },
    {
        id: 'tomford-3', name: 'Tom Ford Ombré Leather', image: 'pic/tomford/tomford_3.jpg', short: 'Da thuộc, bạch đậu khấu, quyến rũ.', type: 'unisex', brand: 'tomford', sizes: [{ ml: 50, price: 4200000 }, { ml: 100, price: 5800000 }]
    },
    {
        id: 'tomford-4', name: 'Tom Ford Neroli Portofino', image: 'pic/tomford/tomford_4.jpg', short: 'Cam chanh tươi mát, Địa Trung Hải.', type: 'unisex', brand: 'tomford', sizes: [{ ml: 50, price: 4800000 }]
    },
    {
        id: 'tomford-5', name: 'Tom Ford Tuscan Leather', image: 'pic/tomford/tomford_5.jpg', short: 'Da thuộc, mâm xôi, độc đáo.', type: 'unisex', brand: 'tomford', sizes: [{ ml: 50, price: 7500000 }]
    },
    {
        id: 'creed-1', name: 'Creed Aventus', image: 'pic/creed/creed_1.jpg', short: 'Dứa, Khói, Da thuộc, biểu tượng.', type: 'nam', brand: 'creed', sizes: [{ ml: 50, price: 6500000 }, { ml: 100, price: 8800000 }]
    },
    {
        id: 'creed-2', name: 'Creed Silver Mountain Water', image: 'pic/creed/creed_2.jpg', short: 'Trà xanh, Nước suối, Unisex tươi mát.', type: 'unisex', brand: 'creed', sizes: [{ ml: 50, price: 5900000 }, { ml: 100, price: 8000000 }]
    },
    {
        id: 'creed-3', name: 'Creed Viking', image: 'pic/creed/creed_3.jpg', short: 'Bạc hà, Gỗ đàn hương, phiêu lưu.', type: 'nam', brand: 'creed', sizes: [{ ml: 50, price: 6000000 }]
    },
    {
        id: 'creed-4', name: 'Creed Green Irish Tweed', image: 'pic/creed/creed_4.jpg', short: 'Cỏ xanh, hoa diên vĩ, cổ điển.', type: 'nam', brand: 'creed', sizes: [{ ml: 100, price: 7500000 }]
    },
    {
        id: 'ck-1', name: 'CK One', image: 'pic/ck/ck_1.jpg', short: 'Cổ điển, tươi mát, phổ biến nhất.', type: 'unisex', brand: 'ck', sizes: [{ ml: 50, price: 800000 }, { ml: 100, price: 1100000 }]
    },
    {
        id: 'ck-2', name: 'CK Eternity For Men', image: 'pic/ck/ck_2.jpg', short: 'Hương thảo mộc, truyền thống.', type: 'nam', brand: 'ck', sizes: [{ ml: 50, price: 1200000 }, { ml: 100, price: 1700000 }]
    },
    {
        id: 'ck-3', name: 'CK Euphoria For Women', image: 'pic/ck/ck_3.jpg', short: 'Quả lựu, hoa sen, ấm áp, nữ tính.', type: 'nu', brand: 'ck', sizes: [{ ml: 50, price: 1400000 }, { ml: 100, price: 2000000 }]
    },
    {
        id: 'ck-4', name: 'CK Obsessed For Men', image: 'pic/ck/ck_4.jpg', short: 'Da thuộc, Vani đen, hiện đại.', type: 'nam', brand: 'ck', sizes: [{ ml: 75, price: 1350000 }]
    },
    {
        id: 'ck-5', name: 'CK One Shock For Her', image: 'pic/ck/ck_5.jpg', short: 'Hương kẹo ngọt, vani, gợi cảm.', type: 'nu', brand: 'ck', sizes: [{ ml: 100, price: 1250000 }]
    },
    {
        id: 'dg-1', name: 'D&G Light Blue Pour Homme', image: 'pic/dg/dg_1.jpg', short: 'Hương chanh, biển, tươi mát, mùa hè.', type: 'nam', brand: 'dg', sizes: [{ ml: 75, price: 2100000 }, { ml: 125, price: 2800000 }]
    },
    {
        id: 'dg-2', name: 'D&G The One For Men', image: 'pic/dg/dg_2.jpg', short: 'Thuốc lá, hổ phách, ấm áp, nam tính.', type: 'nam', brand: 'dg', sizes: [{ ml: 50, price: 2300000 }, { ml: 100, price: 3000000 }]
    },
    {
        id: 'dg-3', name: 'D&G Light Blue Intense Pour Femme', image: 'pic/dg/dg_3.jpg', short: 'Chanh vàng, táo xanh, tươi mới.', type: 'nu', brand: 'dg', sizes: [{ ml: 50, price: 1900000 }, { ml: 100, price: 2600000 }]
    },
    {
        id: 'dg-4', name: 'D&G Pour Femme', image: 'pic/dg/dg_4.jpg', short: 'Hoa cam, Marshmallow, ngọt nhẹ.', type: 'nu', brand: 'dg', sizes: [{ ml: 50, price: 2200000 }]
    }
  ];
  
  // === MOCK DATA CHO TRANG ADMIN DASHBOARD (Mới) ===
  const MOCK_CUSTOMERS_DATA = [
      { id: 1, name: 'Nguyễn Văn A', email: 'vana@gmail.com', phone: '0901xxxxxx', joined: '01/10/2025', status: 'Active' },
      { id: 2, name: 'Trần Thị B', email: 'thib@gmail.com', phone: '0902xxxxxx', joined: '15/10/2025', status: 'Active' },
      { id: 3, name: 'Lê Văn C', email: 'vanc@gmail.com', phone: '0903xxxxxx', joined: '20/11/2025', status: 'Inactive' },
  ];

  const MOCK_ORDERS_DATA = [
      { id: 'DH001', customer: 'Nguyễn Văn A', date: '26/10/2025', total: 7300000, status: 'Đã xử lý',
          details: [{ name: 'Dior Sauvage Elixir (50ml)', qty: 1, price: 3200000 }, { name: 'Chanel No19 EDP (100ml)', qty: 1, price: 4100000 }],
          customerInfo: { name: 'Nguyễn Văn A', address: '123 ABC, Q.1', phone: '0901xxxxxx' }
      },
      { id: 'DH002', customer: 'Trần Thị B', date: '01/11/2025', total: 3450000, status: 'Chưa xử lý',
          details: [{ name: 'Gucci Flora (75ml)', qty: 1, price: 3450000 }],
          customerInfo: { name: 'Trần Thị B', address: '456 XYZ, Q.3', phone: '0902xxxxxx' }
      },
      { id: 'DH003', customer: 'Lê Văn C', date: '10/11/2025', total: 6200000, status: 'Đang giao',
          details: [{ name: 'Tom Ford Black Orchid (100ml)', qty: 1, price: 6200000 }],
          customerInfo: { name: 'Lê Văn C', address: '789 DEF, Thủ Đức', phone: '0903xxxxxx' }
      },
  ];

  const MOCK_STATS_DATA = [
    { name: 'Dior Sauvage Elixir', qty: 5, revenue: 16000000 },
    { name: 'Chanel Coco Mademoiselle', qty: 4, revenue: 12800000 },
    { name: 'Versace Eros EDT', qty: 3, revenue: 7500000 },
  ];
  
  // =================================================================
  // === KHAI BÁO STATE VÀ CÁC THAM CHIẾU DOM ===
  // =================================================================

  const PRODUCTS_PER_PAGE = 12; 
  let currentPage = 1; 
  let cart = JSON.parse(localStorage.getItem('perfumeCart')) || [];
  let loggedInUser = localStorage.getItem('loggedInUser') || null; 
  let isAdmin = localStorage.getItem('isAdmin') === 'true'; // Cờ Admin
  
  let products = []; // Mảng sản phẩm (sẽ load từ storage)
  
  // --- Khai báo Logic Khách hàng động ---
  function saveCustomers() {
      localStorage.setItem('perfumeCustomers', JSON.stringify(customers));
  }
  let customers = JSON.parse(localStorage.getItem('perfumeCustomers')) || [];
  
  if (customers.length === 0) {
      customers = MOCK_CUSTOMERS_DATA.map(c => ({
          id: c.id, name: c.name, email: c.email, phone: c.phone, joined: c.joined, status: c.status
      }));
      saveCustomers(); 
  }
  // ----------------------------------------
  
  // --- DOM references ---
  const productListEl = document.getElementById('product-list');
  const featuredProductListEl = document.getElementById('featured-product-list');
  const searchInput = document.getElementById('searchInput');
  const filterCheckboxes = document.querySelectorAll('aside input[type="checkbox"]');
  const paginationControlsEl = document.getElementById('pagination-controls'); 
  const adminProductListEl = document.getElementById('admin-product-list');
  const adminProductCountEl = document.getElementById('admin-product-count'); 
  const addProductBtn = document.getElementById('add-product-btn'); 
  const authLinks = document.getElementById('auth-links'); 
  const userInfo = document.getElementById('user-info'); 
  const userNameDisplay = document.getElementById('user-name-display'); 
  const logoutBtn = document.getElementById('logout-btn');
  const adminTitle = document.getElementById('admin-title'); // MỚI
  const adminNavLinks = document.querySelectorAll('.admin-nav-link'); // MỚI


  // =================================================================
  // === LOGIC QUẢN LÝ DỮ LIỆU SẢN PHẨM (LOAD/SAVE/CRUD) ===
  // =================================================================

  // --- Helper: format tiền VNĐ ---
  function formatVND(number) {
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".") + ' VNĐ';
  }

  function saveProducts() {
      // Lưu sản phẩm vào localStorage và cập nhật lại giao diện
      localStorage.setItem('productsData', JSON.stringify(products));
      
      // Chỉ render lại các trang cần thiết
      renderList(); 
      renderFeaturedProducts(); 
      if (window.location.hash === '#trang-admin') {
          renderAdminTable(); 
      }
  }

  function loadInitialProducts() {
      const storedProducts = localStorage.getItem('productsData');
      if (storedProducts) {
          products = JSON.parse(storedProducts);
      } else {
          // Lần đầu tiên, dùng dữ liệu mặc định và lưu vào storage
          products = DEFAULT_PRODUCTS_DATA; 
          saveProducts(); 
      }
  }
  
  // --- LOGIC TRANG ADMIN (CRUD) ---
  
  function renderAdminTable() {
    if (!adminProductListEl) return;

    if (adminProductCountEl) adminProductCountEl.textContent = products.length;
    adminProductListEl.innerHTML = '';
    
    if (products.length === 0) {
        adminProductListEl.innerHTML = '<tr><td colspan="6" class="text-center">Chưa có sản phẩm nào.</td></tr>';
        return;
    }

    products.forEach(p => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td>${p.id}</td>
            <td>${p.name}</td>
            <td>${p.brand.toUpperCase()}</td>
            <td>${p.type.toUpperCase()}</td>
            <td>${formatVND(p.sizes[0].price)}</td>
            <td>
                <button class="btn btn-sm btn-warning me-2 btn-edit-product" data-id="${p.id}">Sửa</button>
                <button class="btn btn-sm btn-danger btn-delete-product" data-id="${p.id}">Xóa</button>
            </td>
        `;
        adminProductListEl.appendChild(tr);
    });

    // Gắn sự kiện Delete (Xóa)
    document.querySelectorAll('.btn-delete-product').forEach(btn => {
        btn.addEventListener('click', function() {
            const productId = this.dataset.id;
            if (confirm(`Bạn có chắc chắn muốn xóa sản phẩm ${productId} không?`)) {
                products = products.filter(p => p.id !== productId);
                saveProducts(); 
            }
        });
    });

    // Gắn sự kiện cho nút Sửa/Thêm (Cần Modal Form đầy đủ)
    document.querySelectorAll('.btn-edit-product').forEach(btn => {
        btn.addEventListener('click', function() {
            alert('Chức năng sửa sản phẩm cần form pop-up. Hiện tại chỉ có Xóa hoạt động.');
        });
    });
    if (addProductBtn) {
        addProductBtn.addEventListener('click', function() {
            alert('Chức năng thêm sản phẩm cần form pop-up.');
        });
    }
  }

  // --- HÀM CHUYỂN ĐỔI GIỮA CÁC PHẦN (TONG-QUAT, SAN-PHAM,...) ---
  function showAdminContent(sectionId) {
    const sections = document.querySelectorAll('.admin-content');
    const links = document.querySelectorAll('.admin-nav-link');
    
    sections.forEach(sec => sec.classList.remove('active'));
    links.forEach(link => link.classList.remove('active'));
    
    document.getElementById(sectionId).classList.add('active');
    document.querySelector(`[data-section="${sectionId}"]`).classList.add('active');
    
    if (adminTitle) adminTitle.textContent = document.querySelector(`[data-section="${sectionId}"]`).textContent;

    if (sectionId === 'tong-quat') renderOverviewCards();
    else if (sectionId === 'san-pham') renderAdminTable(); 
    else if (sectionId === 'khach-hang') renderCustomerList();
    else if (sectionId === 'don-hang') renderOrderList();
    else if (sectionId === 'thong-ke') renderStats();
  }

  // --- 1. RENDER TRANG TỔNG QUÁT ---
  function renderOverviewCards() {
    const totalCustomers = customers.length; 
    const totalProducts = products.length; 
    const totalRevenue = MOCK_ORDERS_DATA.reduce((sum, order) => sum + order.total, 0);

    const cardKH = document.getElementById('card-khach-hang');
    const cardSP = document.getElementById('card-san-pham');
    const cardDT = document.getElementById('card-doanh-thu');

    if (cardKH) cardKH.textContent = totalCustomers;
    if (cardSP) cardSP.textContent = totalProducts;
    if (cardDT) cardDT.textContent = formatVND(totalRevenue);
  }

  // --- 2. RENDER TRANG KHÁCH HÀNG ---
  function renderCustomerList() {
    const customerListEl = document.getElementById('customer-list');
    if (!customerListEl) return;
    customerListEl.innerHTML = '';
    
    if (customers.length === 0) {
        customerListEl.innerHTML = '<tr><td colspan="5" class="text-center">Không có dữ liệu khách hàng.</td></tr>';
        return;
    }

    customers.forEach((c, index) => { 
      const tr = document.createElement('tr');
      const statusClass = c.status === 'Active' ? 'text-success' : 'text-danger';
      tr.innerHTML = `
        <td>${index + 1}</td>
        <td>${c.name}</td>
        <td>${c.email}</td>
        <td>${c.joined}</td>
        <td class="${statusClass} fw-bold">${c.status}</td>
      `;
      customerListEl.appendChild(tr);
    });
  }

  // --- 3. RENDER TRANG ĐƠN HÀNG ---
  function renderOrderList() {
    const orderListEl = document.getElementById('order-list');
    if (!orderListEl) return;
    orderListEl.innerHTML = '';
    
    MOCK_ORDERS_DATA.forEach(o => {
      const statusColor = o.status === 'Đã xử lý' ? 'bg-success' : o.status === 'Đang giao' ? 'bg-warning' : 'bg-danger';
      const tr = document.createElement('tr');
      tr.innerHTML = `
        <td>${o.id}</td>
        <td>${o.customer}</td>
        <td>${o.date}</td>
        <td class="fw-bold">${formatVND(o.total)}</td>
        <td><span class="badge ${statusColor} text-light">${o.status}</span></td>
        <td>
            <button class="btn btn-sm btn-info text-light btn-order-detail" data-order-id="${o.id}">
                <i class="bi bi-eye"></i> Chi Tiết
            </button>
        </td>
      `;
      orderListEl.appendChild(tr);
    });
    
    // Gắn sự kiện xem chi tiết đơn hàng
    document.querySelectorAll('.btn-order-detail').forEach(btn => {
        btn.addEventListener('click', function() {
            const orderId = this.dataset.orderId;
            const order = MOCK_ORDERS_DATA.find(o => o.id === orderId);
            if (order) {
                let details = `Khách hàng: ${order.customerInfo.name}\n`;
                details += `Địa chỉ: ${order.customerInfo.address}\n`;
                details += `SĐT: ${order.customerInfo.phone}\n\n`;
                details += `Chi tiết đơn hàng:\n`;
                order.details.forEach(item => {
                    details += `- ${item.name} x ${item.qty} (${formatVND(item.qty * item.price)})\n`;
                });
                alert(`CHI TIẾT ĐƠN HÀNG ${orderId}\n\n${details}`);
            }
        });
    });
  }

  // --- 4. RENDER TRANG THỐNG KÊ ---
  function renderStats() {
    const statsTotalRevenue = MOCK_ORDERS_DATA.reduce((sum, order) => sum + order.total, 0);
    
    const statsSPBan = document.getElementById('stats-sp-ban');
    const statsSLBan = document.getElementById('stats-sl-ban');
    const statsDT = document.getElementById('stats-doanh-thu');
    const topSellingEl = document.getElementById('top-selling-list');

    if (statsSPBan) statsSPBan.textContent = MOCK_STATS_DATA.length;
    if (statsSLBan) statsSLBan.textContent = MOCK_STATS_DATA.reduce((sum, item) => sum + item.qty, 0);
    if (statsDT) statsDT.textContent = formatVND(statsTotalRevenue);

    if (!topSellingEl) return;
    topSellingEl.innerHTML = '';
    
    MOCK_STATS_DATA.forEach((item, index) => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td>${index + 1}</td>
            <td>${item.name}</td>
            <td>${item.qty}</td>
            <td class="fw-bold">${formatVND(item.revenue)}</td>
        `;
        topSellingEl.appendChild(tr);
    });
  }


  // =================================================================
  // === LOGIC RENDER SẢN PHẨM VÀ PHÂN TRANG ===
  // =================================================================
  
  // --- HÀM TẠO CÁC NÚT PHÂN TRANG ---
  function renderPaginationControls(totalItems) {
    if (!paginationControlsEl) return;
    const totalPages = Math.ceil(totalItems / PRODUCTS_PER_PAGE);
    paginationControlsEl.innerHTML = ''; 
    if (totalPages <= 1) return; 

    for (let i = 1; i <= totalPages; i++) {
      const li = document.createElement('li');
      li.className = `page-item ${i === currentPage ? 'active' : ''}`;
      li.innerHTML = `<a class="page-link" href="#">${i}</a>`;
      li.addEventListener('click', function(e) {
        e.preventDefault();
        currentPage = i;
        renderList(); 
        window.scrollTo(0, 0); 
      });
      paginationControlsEl.appendChild(li);
    }
  }

  // --- HÀM RENDER 1 CARD SẢN PHẨM ---
 // --- HÀM TẠO THẺ SẢN PHẨM (GIAO DIỆN MỚI) ---
  function createProductCard(p) {
    const col = document.createElement('div');
    col.className = 'col'; 
    
    // 1. Tính toán hiển thị giá (Ví dụ: 300k - 500k)
    let priceDisplay = 'Liên hệ';
    if (p.sizes && p.sizes.length > 0) {
        const prices = p.sizes.map(s => s.price);
        const minPrice = Math.min(...prices);
        const maxPrice = Math.max(...prices);

        if (minPrice === maxPrice) {
            priceDisplay = formatVND(minPrice); 
        } else {
            priceDisplay = `${formatVND(minPrice)} - ${formatVND(maxPrice)}`;
        }
    }

    // 2. Tạo HTML (Giao diện mới không viền)
    col.innerHTML = `
      <div class="product-card-minimal" onclick="viewDetail('${p.id}')">
            <img src="${p.image}" class="card-img-top" alt="${p.name}" 
                 onerror="this.src='https://via.placeholder.com/400x400?text=No+Image'">
            
            <div class="card-body p-0">
                <div class="card-title">${p.name}</div>
                <div class="price-text">${priceDisplay}</div>
            </div>
      </div>
    `;
    
    // Hàm phụ trợ để click vào là xem chi tiết ngay
    // (Mình gán trực tiếp onclick ở trên div cho tiện)
    col.querySelector('.product-card-minimal').onclick = function() {
        showProductDetail(p.id);
        showPage('#trang-chi-tiet');
        window.scrollTo(0, 0);
    };

    return col;
  }
  
  // --- HÀM RENDER DANH SÁCH SẢN PHẨM ---
  function renderList() {
    if (!productListEl) return; 

    const q = searchInput.value.trim().toLowerCase();
    const checkedTypes = Array.from(document.querySelectorAll('aside input[name="loai"]:checked')).map(i=>i.value);
    const checkedBrands = Array.from(document.querySelectorAll('aside input[name="thuonghieu"]:checked')).map(i=>i.value);
    
    // 1. Lọc sản phẩm theo tiêu chí
    const filtered = products.filter(p => {
      const matchQ = q === '' || p.name.toLowerCase().includes(q) || p.short.toLowerCase().includes(q);
      const matchType = checkedTypes.length === 0 || checkedTypes.includes(p.type);
      const matchBrand = checkedBrands.length === 0 || checkedBrands.includes(p.brand);
      return matchQ && matchType && matchBrand;
    });

    if (currentPage > Math.ceil(filtered.length / PRODUCTS_PER_PAGE)) {
        currentPage = 1;
    }

    // 2. Phân trang: Cắt mảng để lấy sản phẩm của trang hiện tại
    const startIndex = (currentPage - 1) * PRODUCTS_PER_PAGE;
    const endIndex = startIndex + PRODUCTS_PER_PAGE;
    const productsToDisplay = filtered.slice(startIndex, endIndex);

    // 3. Hiển thị sản phẩm
    productListEl.innerHTML = '';
    if (productsToDisplay.length === 0) {
      productListEl.innerHTML = '<p class="col-12">Không tìm thấy sản phẩm.</p>';
    } else {
        productsToDisplay.forEach(p => {
            const card = createProductCard(p);
            productListEl.appendChild(card);
        });
    }

    // 4. Render lại nút phân trang
    renderPaginationControls(filtered.length);
  }
  
  // --- HÀM RENDER SẢN PHẨM NỔI BẬT (TRANG CHỦ) ---
  function renderFeaturedProducts() {
      if (!featuredProductListEl) return;
      featuredProductListEl.innerHTML = '';
      const featured = products.slice(0, 8); 
      featured.forEach(p => {
          const card = createProductCard(p);
          featuredProductListEl.appendChild(card);
      });
  }

  // --- HIỂN THỊ TRANG CHI TIẾT ---
  function showProductDetail(productId) {
    const p = products.find(x => x.id === productId);
    if (!p) return;
    const imgEl = document.getElementById('product-detail-img');
    const nameEl = document.getElementById('product-detail-name');
    const priceEl = document.getElementById('product-detail-price');
    const shortEl = document.getElementById('product-detail-short');
    const sizeSelect = document.getElementById('product-detail-size');
    const quantityInput = document.getElementById('product-detail-quantity');
    const addBtn = document.getElementById('add-to-cart-btn');
    imgEl.src = p.image;
    nameEl.textContent = p.name;
    shortEl.textContent = p.short;
    quantityInput.value = 1;
    sizeSelect.innerHTML = '';
    p.sizes.forEach(size => {
      const opt = document.createElement('option');
      opt.value = size.ml;
      opt.textContent = `${size.ml}ml`;
      opt.dataset.price = size.price;
      sizeSelect.appendChild(opt);
    });
    function updatePrice() {
      const selectedOption = sizeSelect.options[sizeSelect.selectedIndex];
      priceEl.textContent = formatVND(selectedOption.dataset.price);
    }
    updatePrice();
    sizeSelect.addEventListener('change', updatePrice);
    const newAddBtn = addBtn.cloneNode(true);
    addBtn.parentNode.replaceChild(newAddBtn, addBtn);
    newAddBtn.addEventListener('click', function() {
      const selectedSize = parseInt(sizeSelect.value);
      const selectedQuantity = parseInt(quantityInput.value);
      addToCart(p.id, selectedSize, selectedQuantity);
      alert('Đã thêm vào giỏ hàng!');
    });
  }


  // =================================================================
  // === LOGIC GIỎ HÀNG VÀ THANH TOÁN ===
  // =================================================================

  function saveCart() {
    localStorage.setItem('perfumeCart', JSON.stringify(cart));
  }
  
  function addToCart(productId, selectedSize, quantity) {
    const product = products.find(p => p.id === productId);
    if (!product) return;
    const sizeInfo = product.sizes.find(s => s.ml === selectedSize);
    if (!sizeInfo) return;
    const cartItem = cart.find(item => item.id === productId && item.ml === selectedSize);
    if (cartItem) {
      cartItem.quantity += quantity;
    } else {
      cart.push({
        id: product.id,
        name: product.name,
        image: product.image,
        ml: selectedSize,
        price: sizeInfo.price,
        quantity: quantity
      });
    }
    saveCart();
    updateCartBadge();
  }
  function updateCartBadge() {
    const badge = document.getElementById('cart-badge');
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    if (totalItems > 0) {
      if(badge) badge.textContent = totalItems;
      if(badge) badge.style.display = 'inline-block';
    } else {
      if(badge) badge.style.display = 'none';
    }
  }
  function renderCart() {
    const cartBody = document.getElementById('cart-items-body');
    const checkoutSummary = document.getElementById('checkout-summary');
    const subtotalEl = document.getElementById('cart-subtotal');
    const totalEl = document.getElementById('cart-total');
    
    if (!cartBody || !checkoutSummary || !subtotalEl || !totalEl) return;
    
    cartBody.innerHTML = '';
    checkoutSummary.innerHTML = '';
    let subtotal = 0;
    if (cart.length === 0) {
      cartBody.innerHTML = '<tr><td colspan="5" class="text-center">(Giỏ hàng rỗng)</td></tr>';
      checkoutSummary.innerHTML = '<li>(Giỏ hàng rỗng)</li>';
      subtotalEl.textContent = '0 VNĐ';
      totalEl.textContent = '0 VNĐ';
      return;
    }
    cart.forEach((item, index) => {
      const itemTotal = item.price * item.quantity;
      subtotal += itemTotal;
      const tr = document.createElement('tr');
      tr.innerHTML = `
        <td class="align-middle">
          <img src="${item.image}" alt="${item.name}" style="width: 50px; height: 50px; object-fit: cover;">
          <span class="ms-2">${item.name} (${item.ml}ml)</span>
        </td>
        <td class="align-middle">${formatVND(item.price)}</td>
        <td class="align-middle">
          <input type="number" class="form-control input-cart-quantity" value="${item.quantity}" min="1" data-index="${index}" style="width: 70px;">
        </td>
        <td class="align-middle fw-bold">${formatVND(itemTotal)}</td>
        <td class="align-middle">
          <button class="btn btn-outline-danger btn-sm btn-remove-cart-item" data-index="${index}">
            <i class="bi bi-trash"></i>
          </Button>
        </td>
      `;
      cartBody.appendChild(tr);
      const li = document.createElement('li');
      li.className = 'list-group-item d-flex justify-content-between';
      li.innerHTML = `
        <span>${item.name} (${item.ml}ml) x ${item.quantity}</span>
        <span class="fw-bold">${formatVND(itemTotal)}</span>
      `;
      checkoutSummary.appendChild(li);
    });
    const totalLi = document.createElement('li');
    totalLi.className = 'list-group-item d-flex justify-content-between fw-bold text-danger';
    totalLi.innerHTML = `
      <span>Tổng cộng</span>
      <span>${formatVND(subtotal)}</span>
    `;
    checkoutSummary.appendChild(totalLi);
    subtotalEl.textContent = formatVND(subtotal);
    totalEl.textContent = formatVND(subtotal);
    document.querySelectorAll('.btn-remove-cart-item').forEach(btn => {
      btn.addEventListener('click', function() {
        const index = parseInt(this.dataset.index);
        cart.splice(index, 1);
        saveCart();
        renderCart();
        updateCartBadge();
      });
    });
    document.querySelectorAll('.input-cart-quantity').forEach(input => {
      input.addEventListener('change', function() {
        const index = parseInt(this.dataset.index);
        let newQuantity = parseInt(this.value);
        if (newQuantity < 1) {
            newQuantity = 1;
            this.value = 1;
        }
        cart[index].quantity = newQuantity;
        saveCart();
        renderCart();
        updateCartBadge();
      });
    });
  }


  // =================================================================
  // === LOGIC SPA / NAVIGATION ===
  // =================================================================
  const allPages = document.querySelectorAll('.page');

  function showPage(pageId) {
    if (pageId === '#trang-admin') {
        if (!isAdmin) {
            alert('Bạn cần đăng nhập với tài khoản Admin để truy cập trang này.');
            showPage('#trang-dang-nhap');
            return; 
        }
    }
    allPages.forEach(function(page) { page.classList.remove('active'); });
    const pageToShow = document.querySelector(pageId);
    if (pageToShow) {
        pageToShow.classList.add('active');
        if (pageId === '#trang-gio-hang' || pageId === '#trang-thanh-toan') {
            renderCart();
        } else if (pageId === '#trang-admin') {
            // Hiển thị Trang Tổng quát khi vào Admin
            showAdminContent('tong-quat'); 
        }
    }
  }

  document.body.addEventListener('click', function(event) {
    const link = event.target.closest('a');
    if (!link || !link.hasAttribute('href')) {
        return;
    }
    const targetPageId = link.getAttribute('href');
    if (targetPageId === '#') {
        event.preventDefault();
        return;
    }
    if (targetPageId.startsWith('#trang-')) {
        event.preventDefault(); 
        if (targetPageId === '#trang-chi-tiet' && link.dataset.productId) {
            showProductDetail(link.dataset.productId);
        }
        showPage(targetPageId); 
        window.scrollTo(0, 0); 
    }
  });


  // =================================================================
  // === LOGIC VALIDATION FORM ===
  // =================================================================

  // --- HÀM CẬP NHẬT UI HEADER ---
  function updateLoginState() {
    const authLinks = document.getElementById('auth-links');
    const userInfo = document.getElementById('user-info');
    const userNameDisplay = document.getElementById('user-name-display');
    const adminLink = document.getElementById('admin-link'); 
    
    // Nếu đã đăng nhập
    if (loggedInUser) {
        if (authLinks) authLinks.style.display = 'none';
        if (userInfo) userInfo.style.display = 'block';
        if (userNameDisplay) userNameDisplay.textContent = `Chào, ${loggedInUser}`;
        
        // Chỉ hiện link Admin nếu isAdmin là TRUE
        if (adminLink) {
            if (isAdmin) {
                adminLink.style.display = 'block';
            } else {
                adminLink.style.display = 'none';
            }
        }

    } else {
        // Nếu chưa đăng nhập
        if (authLinks) authLinks.style.display = 'block';
        if (userInfo) userInfo.style.display = 'none';
        if (userNameDisplay) userNameDisplay.textContent = '';
    }
  }
  
  // --- NÚT ĐĂNG XUẤT ---
  if (logoutBtn) {
    logoutBtn.addEventListener('click', function(e) {
        e.preventDefault();
        loggedInUser = null;
        isAdmin = false; 
        localStorage.removeItem('loggedInUser');
        localStorage.removeItem('isAdmin'); 

        updateLoginState(); 
        showPage('#trang-chu'); 
    });
  }

  // --- 1. Form Đăng ký ---
  const formRegister = document.getElementById('form-register');
  if (formRegister) {
    formRegister.addEventListener('submit', function(e) {
      e.preventDefault(); 
      const nameInput = document.getElementById('register-name');
      const emailInput = document.getElementById('register-email');
      const passInput = document.getElementById('register-password');
      const errorDiv = document.getElementById('register-error');
      errorDiv.textContent = '';
      if (nameInput.validity.valueMissing || emailInput.validity.valueMissing || passInput.validity.valueMissing) {
        errorDiv.textContent = 'Vui lòng nhập đầy đủ thông tin.';
      } else if (emailInput.validity.typeMismatch) {
        errorDiv.textContent = 'Bạn nhập gmail không đúng (ví dụ: ten@gmail.com).';
      } else if (passInput.value.length < 6) {
        errorDiv.textContent = 'Mật khẩu phải có ít nhất 6 ký tự.';
      } else {
        alert('Đăng ký thành công! Đã tự động đăng nhập.');
        loggedInUser = nameInput.value; 
        localStorage.setItem('loggedInUser', loggedInUser);
        updateLoginState(); 
        showPage('#trang-chu'); 
        formRegister.reset();
      }
    });
  }
  
  // --- 2. Form Đăng nhập (ĐÃ SỬA LỖI CẬP NHẬT BIẾN ISADMIN) ---
  const formLogin = document.getElementById('form-login');
  if (formLogin) {
    formLogin.addEventListener('submit', function(e) {
      e.preventDefault(); 
      const emailInput = document.getElementById('login-email');
      const passInput = document.getElementById('login-password');
      const errorDiv = document.getElementById('login-error');
      errorDiv.textContent = '';
      
      // TÀI KHOẢN ADMIN MẶC ĐỊNH
      const ADMIN_EMAIL = 'admin@perfume.vn';
      const ADMIN_PASS = 'admin123';
      
      if (emailInput.validity.valueMissing || passInput.validity.valueMissing) {
        errorDiv.textContent = 'Email và Mật khẩu không được để trống.';
        return;
      }
      
      if (emailInput.value === ADMIN_EMAIL && passInput.value === ADMIN_PASS) {
        // ĐĂNG NHẬP ADMIN THÀNH CÔNG
        loggedInUser = "Admin";
        isAdmin = true; 
        localStorage.setItem('loggedInUser', "Admin");
        localStorage.setItem('isAdmin', 'true');
        
        updateLoginState(); 
        showPage('#trang-admin'); 
        formLogin.reset();
      } else {
        // ĐĂNG NHẬP NGƯỜI DÙNG THƯỜNG (Mock)
        const userEmail = emailInput.value;
        loggedInUser = userEmail.split('@')[0]; 
        isAdmin = false; 
        localStorage.setItem('loggedInUser', loggedInUser);
        localStorage.setItem('isAdmin', 'false'); 
        
        // MỚI: Thêm/cập nhật Khách hàng vào danh sách
        const existingCustomer = customers.find(c => c.email === userEmail);

        if (!existingCustomer) {
            const newCustomer = {
                id: customers.length + 1,
                name: loggedInUser.charAt(0).toUpperCase() + loggedInUser.slice(1), 
                email: userEmail,
                phone: 'Chưa cập nhật', 
                joined: new Date().toLocaleDateString('vi-VN'), 
                status: 'Active'
            };
            customers.push(newCustomer);
            saveCustomers(); 
        }

        updateLoginState(); 
        showPage('#trang-chu');
        formLogin.reset();
      }
    });
  }
  // --- 3. Form Quên Mật khẩu ---
  const formForgot = document.getElementById('form-forgot');
  if (formForgot) {
    formForgot.addEventListener('submit', function(e) {
      e.preventDefault(); 
      const emailInput = document.getElementById('forgot-email');
      const errorDiv = document.getElementById('forgot-error');
      const successDiv = document.getElementById('forgot-success');
      errorDiv.textContent = '';
      successDiv.textContent = '';
      if (emailInput.validity.valueMissing) {
        errorDiv.textContent = 'Vui lòng nhập email.';
      } else if (emailInput.validity.typeMismatch) {
        errorDiv.textContent = 'Bạn nhập gmail không đúng.';
      } else {
        errorDiv.textContent = '';
        successDiv.textContent = 'Gửi thành công! Vui lòng kiểm tra email để nhận link (giả lập).';
        formForgot.reset();
      }
    });
  }
  // --- 4. Form Thanh toán ---
  const formCheckout = document.getElementById('form-checkout');
  if (formCheckout) {
      formCheckout.addEventListener('submit', function(e) {
          e.preventDefault(); 
          if (cart.length === 0) {
              alert('Giỏ hàng của bạn đang rỗng!');
              return;
          }
          if (formCheckout.checkValidity() === false) {
              alert('Vui lòng điền đầy đủ thông tin giao hàng.');
              return;
          }
          alert('Đơn hàng đã đặt thành công!');
          cart = [];
          saveCart();
          renderCart();
          updateCartBadge();
          formCheckout.reset();
          showPage('#trang-chu');
      });
  }

  // =================================================================
  // === KHỞI TẠO KHI TẢI TRANG ===
  // =================================================================
  
  loadInitialProducts(); // Tải sản phẩm từ localStorage hoặc data gốc
  
  // --- GẮN SỰ KIỆN ADMIN NAVIGATION ---
  adminNavLinks.forEach(link => {
      link.addEventListener('click', function(e) {
          e.preventDefault();
          const sectionId = this.dataset.section;
          showAdminContent(sectionId);
      });
  });

  updateLoginState(); 
  
  renderList(); 
  renderFeaturedProducts(); 
  updateCartBadge(); 
  
  // Gắn sự kiện cho bộ lọc 
  if(searchInput) searchInput.addEventListener('input', function() {
      currentPage = 1; 
      renderList();
  });
  if(filterCheckboxes) filterCheckboxes.forEach(cb => cb.addEventListener('change', function() {
      currentPage = 1; 
      renderList();
  }));
  
  // Hiển thị trang dựa trên hash (nếu có) hoặc về trang chủ
  const initialHash = window.location.hash || '#trang-chu';
  if (initialHash.startsWith('#trang-')) {
      showPage(initialHash);
      // Nếu vào trang Admin, cần gọi hàm render nội dung đầu tiên
      if (initialHash === '#trang-admin') {
          showAdminContent('tong-quat'); 
      }
  } else {
      showPage('#trang-chu');
  }

});
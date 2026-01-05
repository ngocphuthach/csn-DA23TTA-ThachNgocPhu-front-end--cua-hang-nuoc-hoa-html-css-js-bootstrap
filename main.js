document.addEventListener('DOMContentLoaded', function() {
  
  // =================================================================
  // 1. DỮ LIỆU & KHỞI TẠO
  // =================================================================
  
  const DEFAULT_PRODUCTS_DATA = [
    { id: 'dior-1', name: 'Dior Sauvage Elixir', image: 'pic/diorsauvage.jpg', short: 'Hương thơm đậm đặc, nam tính.', type: 'nam', brand: 'dior', sizes: [{ ml: 50, price: 3200000, stock: 10 }, { ml: 75, price: 3700000, stock: 5 }, { ml: 100, price: 4150000, stock: 2 }] },
    { id: 'dior-2', name: 'Dior J’adore Eau de Parfum', image: 'pic/diorjadore.jpg', short: 'Nữ tính, hoa cỏ sang trọng.', type: 'nu', brand: 'dior', sizes: [{ ml: 50, price: 3100000, stock: 20 }, { ml: 75, price: 3500000, stock: 10 }, { ml: 100, price: 3900000, stock: 5 }] },
    { id: 'dior-3', name: 'Miss Dior Blooming Bouquet', image: 'pic/diormiss.jpg', short: 'Mùi hoa tươi, nhẹ nhàng.', type: 'nu', brand: 'dior', sizes: [{ ml: 50, price: 2300000, stock: 15 }, { ml: 75, price: 2700000, stock: 8 }, { ml: 100, price: 3000000, stock: 5 }] },
    { id: 'dior-4', name: 'Dior Homme Intense', image: 'pic/diorhomme.jpg', short: 'Hương ấm, gợi cảm cho nam.', type: 'nam', brand: 'dior', sizes: [{ ml: 50, price: 2900000, stock: 10 }, { ml: 75, price: 3300000, stock: 6 }, { ml: 100, price: 3600000, stock: 4 }] },
    { id: 'dior-5', name: 'Dior Hypnotic Poison', image: 'pic/diorhypnotic.jpg', short: 'Bí ẩn, gợi cảm, quyến rũ.', type: 'nu', brand: 'dior', sizes: [{ ml: 50, price: 1800000, stock: 20 }, { ml: 75, price: 2200000, stock: 12 }, { ml: 100, price: 2500000, stock: 8 }] },
    { id: 'dior-6', name: 'Dior Oud Ispahan', image: 'pic/diorispahan.jpg', short: 'Hương gỗ oud nồng nàn.', type: 'unisex', brand: 'dior', sizes: [{ ml: 50, price: 3800000, stock: 5 }, { ml: 75, price: 4000000, stock: 3 }, { ml: 100, price: 4200000, stock: 2 }] },
    { id: 'chanel-1', name: 'Bleu de Chanel', image: 'pic/chanelbleu.jpg', short: 'Hương gỗ thơm, nam tính, lịch lãm.', type: 'nam', brand: 'chanel', sizes: [{ ml: 50, price: 2900000, stock: 15 }, { ml: 75, price: 3400000, stock: 10 }, { ml: 100, price: 3900000, stock: 5 }] },
    { id: 'chanel-2', name: 'Chanel Coco Mademoiselle', image: 'pic/chanelcoco.jpg', short: 'Hương hoa cỏ Chypre, nữ tính.', type: 'nu', brand: 'chanel', sizes: [{ ml: 50, price: 3200000, stock: 12 }, { ml: 75, price: 3700000, stock: 8 }, { ml: 100, price: 4100000, stock: 4 }] },
    { id: 'chanel-3', name: 'Chanel Chance Eau Tendre', image: 'pic/chanelchance.jpg', short: 'Hương hoa cỏ trái cây, tươi mát.', type: 'nu', brand: 'chanel', sizes: [{ ml: 50, price: 2950000, stock: 14 }, { ml: 75, price: 3450000, stock: 9 }, { ml: 100, price: 3800000, stock: 6 }] },
    { id: 'chanel-4', name: 'Chanel No19 EDP', image: 'pic/chanelNo19.jpg', short: 'Hương hoa cỏ xanh.', type: 'unisex', brand: 'chanel', sizes: [{ ml: 50, price: 3700000, stock: 7 }, { ml: 75, price: 3900000, stock: 5 }, { ml: 100, price: 4100000, stock: 3 }] },
    { id: 'chanel-5', name: 'Chanel 1957', image: 'pic/chanel1957.jpg', short: 'Xạ hương trắng, hoa cam.', type: 'unisex', brand: 'chanel', sizes: [{ ml: 50, price: 6200000, stock: 3 }, { ml: 75, price: 6680000, stock: 2 }, { ml: 100, price: 7100000, stock: 1 }] },
    { id: 'gucci-1', name: 'Gucci Flora Gorgeous Gardenia', image: 'pic/gucci/gucci_1.jpg', short: 'Hương hoa quả ngọt ngào.', type: 'nu', brand: 'gucci', sizes: [{ ml: 50, price: 2950000, stock: 10 }, { ml: 100, price: 3800000, stock: 5 }] },
    { id: 'gucci-2', name: 'Gucci Guilty Pour Homme EDP', image: 'pic/gucci/gucci_2.jpg', short: 'Gỗ thơm nồng ấm, cổ điển.', type: 'nam', brand: 'gucci', sizes: [{ ml: 50, price: 3000000, stock: 8 }, { ml: 90, price: 3900000, stock: 4 }] },
    { id: 'gucci-3', name: 'Gucci Bloom Eau de Parfum', image: 'pic/gucci/gucci_3.jpg', short: 'Mùi hoa huệ tự nhiên, thanh lịch.', type: 'nu', brand: 'gucci', sizes: [{ ml: 50, price: 2500000, stock: 12 }, { ml: 100, price: 3300000, stock: 6 }] },
    { id: 'gucci-4', name: 'Gucci Rush', image: 'pic/gucci/gucci_4.jpg', short: 'Hương nồng, hiện đại, vỏ đỏ.', type: 'nu', brand: 'gucci', sizes: [{ ml: 50, price: 2100000, stock: 15 }, { ml: 75, price: 2600000, stock: 8 }] },
    { id: 'gucci-5', name: 'Gucci Guilty Intense Pour Femme', image: 'pic/gucci/gucci_5.jpg', short: 'Hổ phách, hoa tử đinh hương.', type: 'nu', brand: 'gucci', sizes: [{ ml: 50, price: 2500000, stock: 10 }, { ml: 90, price: 3500000, stock: 5 }] },
    { id: 'versace-1', name: 'Versace Eros EDT', image: 'pic/versace/versace_1.jpg', short: 'Hương thơm tươi mát, mạnh mẽ.', type: 'nam', brand: 'versace', sizes: [{ ml: 50, price: 1750000, stock: 20 }, { ml: 100, price: 2500000, stock: 10 }] },
    { id: 'versace-2', name: 'Versace Bright Crystal', image: 'pic/versace/versace_2.jpg', short: 'Hoa cỏ tươi, nhẹ nhàng, phổ biến.', type: 'nu', brand: 'versace', sizes: [{ ml: 50, price: 1600000, stock: 25 }, { ml: 90, price: 2150000, stock: 12 }] },
    { id: 'versace-3', name: 'Versace Pour Homme Dylan Blue', image: 'pic/versace/versace_3.jpg', short: 'Thơm mát đại dương, nam tính.', type: 'nam', brand: 'versace', sizes: [{ ml: 50, price: 1800000, stock: 18 }, { ml: 100, price: 2600000, stock: 9 }] },
    { id: 'versace-4', name: 'Versace Yellow Diamond', image: 'pic/versace/versace_4.jpg', short: 'Hương hoa cỏ trái cây, hiện đại.', type: 'nu', brand: 'versace', sizes: [{ ml: 50, price: 1900000, stock: 15 }, { ml: 90, price: 2750000, stock: 7 }] },
    { id: 'versace-5', name: 'Versace Crystal Noir', image: 'pic/versace/versace_5.jpg', short: 'Bí ẩn, gợi cảm với hương hoa.', type: 'nu', brand: 'versace', sizes: [{ ml: 50, price: 1700000, stock: 14 }, { ml: 90, price: 2400000, stock: 6 }] },
    { id: 'ysl-1', name: 'YSL Libre Eau de Parfum', image: 'pic/ysl/ysl_1.jpg', short: 'Hương hoa Lavender hiện đại.', type: 'nu', brand: 'ysl', sizes: [{ ml: 50, price: 3200000, stock: 10 }, { ml: 90, price: 4100000, stock: 5 }] },
    { id: 'ysl-2', name: 'YSL Y Eau de Parfum', image: 'pic/ysl/ysl_2.jpg', short: 'Gỗ tươi, mạnh mẽ và nam tính.', type: 'nam', brand: 'ysl', sizes: [{ ml: 60, price: 2800000, stock: 12 }, { ml: 100, price: 3650000, stock: 6 }] },
    { id: 'ysl-3', name: 'YSL Black Opium', image: 'pic/ysl/ysl_3.jpg', short: 'Cà phê, Vani, gợi cảm và lôi cuốn.', type: 'nu', brand: 'ysl', sizes: [{ ml: 50, price: 3100000, stock: 8 }, { ml: 90, price: 4000000, stock: 4 }] },
    { id: 'ysl-4', name: 'YSL L\'Homme EDT', image: 'pic/ysl/ysl_4.jpg', short: 'Hương gỗ, gia vị nhẹ nhàng.', type: 'nam', brand: 'ysl', sizes: [{ ml: 50, price: 1600000, stock: 15 }, { ml: 100, price: 2300000, stock: 8 }] },
    { id: 'ysl-5', name: 'YSL Mon Paris', image: 'pic/ysl/ysl_5.jpg', short: 'Dâu tây, hoa nhài, lãng mạn.', type: 'nu', brand: 'ysl', sizes: [{ ml: 50, price: 2900000, stock: 10 }, { ml: 90, price: 3700000, stock: 5 }] },
    { id: 'armani-1', name: 'Armani Acqua di Gio Profumo', image: 'pic/armani/armani_1.jpg', short: 'Hương biển, trầm hương, nam tính.', type: 'nam', brand: 'armani', sizes: [{ ml: 75, price: 2500000, stock: 12 }, { ml: 125, price: 3400000, stock: 6 }] },
    { id: 'armani-2', name: 'Armani Si Passione EDP', image: 'pic/armani/armani_2.jpg', short: 'Nữ tính, quả lý chua đen, quyến rũ.', type: 'nu', brand: 'armani', sizes: [{ ml: 50, price: 3100000, stock: 10 }, { ml: 100, price: 3900000, stock: 5 }] },
    { id: 'armani-3', name: 'Armani My Way', image: 'pic/armani/armani_3.jpg', short: 'Hoa trắng hiện đại, thanh lịch.', type: 'nu', brand: 'armani', sizes: [{ ml: 50, price: 3000000, stock: 9 }, { ml: 90, price: 3800000, stock: 4 }] },
    { id: 'armani-4', name: 'Armani Code Pour Homme', image: 'pic/armani/armani_4.jpg', short: 'Hương da thuộc, gợi cảm, ấm áp.', type: 'nam', brand: 'armani', sizes: [{ ml: 75, price: 2400000, stock: 11 }, { ml: 125, price: 3100000, stock: 5 }] },
    { id: 'armani-5', name: 'Armani Prive Rose d’Arabie', image: 'pic/armani/armani_5.jpg', short: 'Hương hoa hồng phương Đông, sang trọng.', type: 'unisex', brand: 'armani', sizes: [{ ml: 100, price: 8500000, stock: 2 }] },
    { id: 'tomford-1', name: 'Tom Ford Black Orchid EDP', image: 'pic/tomford/tomford_1.jpg', short: 'Hương trầm, nấm truffle, bí ẩn.', type: 'unisex', brand: 'tomford', sizes: [{ ml: 50, price: 4500000, stock: 8 }, { ml: 100, price: 6200000, stock: 4 }] },
    { id: 'tomford-2', name: 'Tom Ford Tobacco Vanille', image: 'pic/tomford/tomford_2.jpg', short: 'Thuốc lá, vani, mạnh mẽ.', type: 'unisex', brand: 'tomford', sizes: [{ ml: 50, price: 5500000, stock: 6 }, { ml: 100, price: 7900000, stock: 3 }] },
    { id: 'tomford-3', name: 'Tom Ford Ombré Leather', image: 'pic/tomford/tomford_3.jpg', short: 'Da thuộc, bạch đậu khấu, quyến rũ.', type: 'unisex', brand: 'tomford', sizes: [{ ml: 50, price: 4200000, stock: 9 }, { ml: 100, price: 5800000, stock: 4 }] },
    { id: 'tomford-4', name: 'Tom Ford Neroli Portofino', image: 'pic/tomford/tomford_4.jpg', short: 'Cam chanh tươi mát, Địa Trung Hải.', type: 'unisex', brand: 'tomford', sizes: [{ ml: 50, price: 4800000, stock: 7 }] },
    { id: 'tomford-5', name: 'Tom Ford Tuscan Leather', image: 'pic/tomford/tomford_5.jpg', short: 'Da thuộc, mâm xôi, độc đáo.', type: 'unisex', brand: 'tomford', sizes: [{ ml: 50, price: 7500000, stock: 2 }] },
    { id: 'creed-1', name: 'Creed Aventus', image: 'pic/creed/creed_1.jpg', short: 'Dứa, Khói, Da thuộc, biểu tượng.', type: 'nam', brand: 'creed', sizes: [{ ml: 50, price: 6500000, stock: 15 }, { ml: 100, price: 8800000, stock: 10 }] },
    { id: 'creed-2', name: 'Creed Silver Mountain Water', image: 'pic/creed/creed_2.jpg', short: 'Trà xanh, Nước suối, Unisex tươi mát.', type: 'unisex', brand: 'creed', sizes: [{ ml: 50, price: 5900000, stock: 12 }, { ml: 100, price: 8000000, stock: 6 }] },
    { id: 'creed-3', name: 'Creed Viking', image: 'pic/creed/creed_3.jpg', short: 'Bạc hà, Gỗ đàn hương, phiêu lưu.', type: 'nam', brand: 'creed', sizes: [{ ml: 50, price: 6000000, stock: 8 }] },
    { id: 'creed-4', name: 'Creed Green Irish Tweed', image: 'pic/creed/creed_4.jpg', short: 'Cỏ xanh, hoa diên vĩ, cổ điển.', type: 'nam', brand: 'creed', sizes: [{ ml: 100, price: 7500000, stock: 5 }] },
    { id: 'ck-1', name: 'CK One', image: 'pic/ck/ck_1.jpg', short: 'Cổ điển, tươi mát, phổ biến nhất.', type: 'unisex', brand: 'ck', sizes: [{ ml: 50, price: 800000, stock: 30 }, { ml: 100, price: 1100000, stock: 20 }] },
    { id: 'ck-2', name: 'CK Eternity For Men', image: 'pic/ck/ck_2.jpg', short: 'Hương thảo mộc, truyền thống.', type: 'nam', brand: 'ck', sizes: [{ ml: 50, price: 1200000, stock: 15 }, { ml: 100, price: 1700000, stock: 10 }] },
    { id: 'ck-3', name: 'CK Euphoria For Women', image: 'pic/ck/ck_3.jpg', short: 'Quả lựu, hoa sen, ấm áp, nữ tính.', type: 'nu', brand: 'ck', sizes: [{ ml: 50, price: 1400000, stock: 18 }, { ml: 100, price: 2000000, stock: 9 }] },
    { id: 'ck-4', name: 'CK Obsessed For Men', image: 'pic/ck/ck_4.jpg', short: 'Da thuộc, Vani đen, hiện đại.', type: 'nam', brand: 'ck', sizes: [{ ml: 75, price: 1350000, stock: 12 }] },
    { id: 'ck-5', name: 'CK One Shock For Her', image: 'pic/ck/ck_5.jpg', short: 'Hương kẹo ngọt, vani, gợi cảm.', type: 'nu', brand: 'ck', sizes: [{ ml: 100, price: 1250000, stock: 14 }] },
    { id: 'dg-1', name: 'D&G Light Blue Pour Homme', image: 'pic/dg/dg_1.jpg', short: 'Hương chanh, biển, tươi mát, mùa hè.', type: 'nam', brand: 'dg', sizes: [{ ml: 75, price: 2100000, stock: 16 }, { ml: 125, price: 2800000, stock: 8 }] },
    { id: 'dg-2', name: 'D&G The One For Men', image: 'pic/dg/dg_2.jpg', short: 'Thuốc lá, hổ phách, ấm áp, nam tính.', type: 'nam', brand: 'dg', sizes: [{ ml: 50, price: 2300000, stock: 12 }, { ml: 100, price: 3000000, stock: 6 }] },
    { id: 'dg-3', name: 'D&G Light Blue Intense Pour Femme', image: 'pic/dg/dg_3.jpg', short: 'Chanh vàng, táo xanh, tươi mới.', type: 'nu', brand: 'dg', sizes: [{ ml: 50, price: 1900000, stock: 15 }, { ml: 100, price: 2600000, stock: 7 }] },
    { id: 'dg-4', name: 'D&G Pour Femme', image: 'pic/dg/dg_4.jpg', short: 'Hoa cam, Marshmallow, ngọt nhẹ.', type: 'nu', brand: 'dg', sizes: [{ ml: 50, price: 2200000, stock: 10 }] }
  ];

  // KHỞI TẠO BIẾN
  const PRODUCTS_PER_PAGE = 12; 
  let currentPage = 1; 
  let cart = JSON.parse(localStorage.getItem('perfumeCart')) || [];
  let loggedInUser = localStorage.getItem('loggedInUser') || null; 
  let isAdmin = localStorage.getItem('isAdmin') === 'true';
  let products = []; 
  let customers = JSON.parse(localStorage.getItem('perfumeCustomers')) || [];
  let isPaidOnline = false; // Biến cờ kiểm tra đã thanh toán online chưa

  function loadInitialProducts() {
    const storedProducts = localStorage.getItem('productsData_v2'); 
    if (storedProducts) {
        products = JSON.parse(storedProducts);
    } else {
        products = DEFAULT_PRODUCTS_DATA;
        localStorage.setItem('productsData_v2', JSON.stringify(products)); 
    }
  }
  loadInitialProducts();

  function formatVND(number) {
    return Number(number).toLocaleString('vi-VN') + ' VNĐ';
  }

  // =================================================================
  // 2. CHỨC NĂNG CLICK SẢN PHẨM & CHUYỂN TRANG
  // =================================================================

  window.handleProductClick = function(productId) {
      localStorage.setItem('selectedProductId', productId);
      window.showProductDetail(productId);
      window.location.hash = '#trang-chi-tiet';
      window.showPage('#trang-chi-tiet');
  };

  window.showProductDetail = function(productId) {
    const p = products.find(x => x.id === productId);
    if (!p) return;

    document.getElementById('product-detail-img').src = p.image;
    document.getElementById('product-detail-name').textContent = p.name;
    document.getElementById('product-detail-short').textContent = p.short;
    document.getElementById('product-detail-quantity').value = 1;
    
    const breadName = document.getElementById('breadcrumb-name');
    if(breadName) breadName.textContent = p.name;
    const brandTop = document.getElementById('product-detail-brand-top');
    if(brandTop) brandTop.textContent = p.brand.toUpperCase();

    const descContent = document.getElementById('long-description-content');
    if(descContent) descContent.innerHTML = p.desc ? `<p>${p.desc}</p>` : `<p>${p.short}</p>`;

    const specBrand = document.getElementById('spec-brand');
    if(specBrand) specBrand.textContent = p.brand.toUpperCase();
    const specType = document.getElementById('spec-type');
    if(specType) specType.textContent = p.type === 'nam' ? 'Nam' : (p.type === 'nu' ? 'Nữ' : 'Unisex');

    // Xử lý Size & Giá
    const sizeContainer = document.getElementById('product-detail-size');
    const priceEl = document.getElementById('product-detail-price');
    const addBtn = document.getElementById('add-to-cart-btn');
    const qtyInput = document.getElementById('product-detail-quantity');
    
    sizeContainer.innerHTML = '';
    let currentSize = p.sizes[0];

    function updatePrice() {
        let finalPrice = currentSize.price;
        if(p.discount > 0) finalPrice = finalPrice * (1 - p.discount/100);
        
        let html = '';
        if(p.discount > 0) {
            html = `<div class="d-flex align-items-center mb-2"><span class="badge bg-danger me-2">-${p.discount}%</span><small class="text-decoration-line-through text-muted">${formatVND(currentSize.price)}</small></div><div class="text-danger fw-bold fs-3">${formatVND(finalPrice)}</div>`;
        } else {
            html = `<div class="fw-bold fs-3">${formatVND(finalPrice)}</div>`;
        }
        
        const stock = currentSize.stock || 0;
        if(stock > 0) {
            html += `<div class="text-success small mt-2"><i class="bi bi-check-circle"></i> Còn ${stock} sản phẩm</div>`;
            addBtn.disabled = false;
            addBtn.textContent = 'THÊM VÀO GIỎ';
            qtyInput.max = stock;
        } else {
            html += `<div class="text-danger small mt-2"><i class="bi bi-x-circle"></i> Hết hàng</div>`;
            addBtn.disabled = true;
            addBtn.textContent = 'HẾT HÀNG';
        }
        priceEl.innerHTML = html;
    }

    p.sizes.forEach((s, idx) => {
        const btn = document.createElement('button');
        btn.className = `btn ${idx===0 ? 'btn-dark' : 'btn-outline-dark'}`;
        btn.textContent = `${s.ml}ml`;
        btn.onclick = () => {
            currentSize = s;
            Array.from(sizeContainer.children).forEach(b => b.className = 'btn btn-outline-dark');
            btn.className = 'btn btn-dark';
            updatePrice();
        };
        sizeContainer.appendChild(btn);
    });
    updatePrice();

    const newAddBtn = addBtn.cloneNode(true);
    addBtn.parentNode.replaceChild(newAddBtn, addBtn);
    newAddBtn.onclick = () => {
        const qty = parseInt(qtyInput.value);
        let finalPrice = currentSize.price;
        if(p.discount > 0) finalPrice = finalPrice * (1 - p.discount/100);
        window.addToCart(p.id, currentSize.ml, qty, finalPrice, p);
        alert('Đã thêm vào giỏ!');
    };

    const btnDec = document.getElementById('btn-decrease');
    const btnInc = document.getElementById('btn-increase');
    if(btnDec && btnInc) {
        const nDec = btnDec.cloneNode(true); btnDec.parentNode.replaceChild(nDec, btnDec);
        const nInc = btnInc.cloneNode(true); btnInc.parentNode.replaceChild(nInc, btnInc);
        nDec.onclick = () => { if(qtyInput.value > 1) qtyInput.value--; };
        nInc.onclick = () => { 
            let max = parseInt(qtyInput.max) || 999;
            if(parseInt(qtyInput.value) < max) qtyInput.value++; 
            else alert(`Tối đa chỉ được mua ${max} sản phẩm!`);
        };
    }

    const relatedList = document.getElementById('related-product-list');
    if(relatedList) {
        relatedList.innerHTML = '';
        const rel = products.filter(i => i.brand === p.brand && i.id !== p.id).slice(0,4);
        rel.forEach(r => relatedList.appendChild(createProductCard(r)));
    }
  };

  function createProductCard(p) {
      let originPrice = p.sizes[0].price;
      let priceHTML = `<div class="fw-bold text-dark">${formatVND(originPrice)}</div>`;
      if (p.discount && p.discount > 0) {
          let final = originPrice * (1 - p.discount/100);
          priceHTML = `<div class="d-flex align-items-center justify-content-center gap-2"><small class="text-decoration-line-through text-muted">${formatVND(originPrice)}</small><span class="fw-bold text-danger">${formatVND(final)}</span></div>`;
      }

      const div = document.createElement('div');
      div.className = 'col';
      div.innerHTML = `
        <div class="product-card-minimal position-relative h-100 pb-2 shadow-sm bg-white rounded" onclick="window.handleProductClick('${p.id}')" style="cursor: pointer;">
            ${p.discount > 0 ? `<span class="position-absolute top-0 start-0 bg-danger text-white px-2 py-1 small fw-bold" style="border-radius:0 0 10px 0;">-${p.discount}%</span>` : ''}
            ${p.isNew ? `<span class="position-absolute top-0 end-0 bg-success text-white px-2 py-1 small fw-bold" style="border-radius:0 0 0 10px;">NEW</span>` : ''}
            <div class="overflow-hidden rounded-top mb-2"><img src="${p.image}" class="card-img-top" style="aspect-ratio: 1/1; object-fit: contain;"></div>
            <div class="card-body p-2 text-center">
                <div class="text-muted small text-uppercase mb-1">${p.brand}</div>
                <div class="card-title fw-bold text-dark mb-1 text-truncate">${p.name}</div>
                <div class="price-text">${priceHTML}</div>
            </div>
        </div>`;
      return div;
  }

  function renderList() {
    const list = document.getElementById('product-list');
    if (!list) return; 

    const q = document.getElementById('searchInput')?.value.trim().toLowerCase() || '';
    const checkedTypes = Array.from(document.querySelectorAll('aside input[name="loai"]:checked')).map(i=>i.value);
    const checkedBrands = Array.from(document.querySelectorAll('aside input[name="thuonghieu"]:checked')).map(i=>i.value);
    const priceVal = document.querySelector('input[name="priceRange"]:checked')?.value || 'all';

    const filtered = products.filter(p => {
      const matchQ = q === '' || p.name.toLowerCase().includes(q);
      const matchType = checkedTypes.length === 0 || checkedTypes.includes(p.type);
      const matchBrand = checkedBrands.length === 0 || checkedBrands.includes(p.brand);
      let matchPrice = true;
      const price = p.sizes[0].price;
      if (priceVal === 'under2') matchPrice = price < 2000000;
      else if (priceVal === '2to4') matchPrice = price >= 2000000 && price <= 4000000;
      else if (priceVal === 'over4') matchPrice = price > 4000000;
      return matchQ && matchType && matchBrand && matchPrice;
    });

    document.getElementById('product-count').textContent = filtered.length;
    
    if (currentPage > Math.ceil(filtered.length / PRODUCTS_PER_PAGE)) currentPage = 1;
    const start = (currentPage - 1) * PRODUCTS_PER_PAGE;
    const items = filtered.slice(start, start + PRODUCTS_PER_PAGE);

    list.innerHTML = '';
    if (items.length === 0) list.innerHTML = '<p class="text-center w-100 mt-5">Không tìm thấy sản phẩm.</p>';
    items.forEach(p => list.appendChild(createProductCard(p)));
    
    const pagi = document.getElementById('pagination-controls');
    if(pagi) {
        const totalPages = Math.ceil(filtered.length / PRODUCTS_PER_PAGE);
        pagi.innerHTML = '';
        for(let i=1; i<=totalPages; i++) {
            pagi.innerHTML += `<li class="page-item ${i===currentPage?'active':''}"><button class="page-link" onclick="window.changePage(${i})">${i}</button></li>`;
        }
    }
  }
  
  window.changePage = function(page) { currentPage = page; renderList(); window.scrollTo(0,0); };

  function renderExtraSections() {
      const saleContainer = document.getElementById('sale-product-list');
      const newContainer = document.getElementById('new-product-list');
      const featContainer = document.getElementById('featured-product-list');

      const saleItems = products.filter(p => p.discount > 0).slice(0, 4);
      if(saleContainer) {
          saleContainer.innerHTML = '';
          if(saleItems.length > 0) {
              document.getElementById('sale-section').style.display = 'block';
              saleItems.forEach(p => saleContainer.appendChild(createProductCard(p)));
          }
      }

      const newItems = products.filter(p => p.isNew).slice(0, 4);
      if(newContainer) {
          newContainer.innerHTML = '';
          if(newItems.length > 0) {
              document.getElementById('new-section').style.display = 'block';
              newItems.forEach(p => newContainer.appendChild(createProductCard(p)));
          }
      }

      const featItems = products.filter(p => p.isFeatured).slice(0, 8);
      if(featContainer) {
          featContainer.innerHTML = '';
          const itemsToShow = featItems.length > 0 ? featItems : products.slice(0,4);
          itemsToShow.forEach(p => featContainer.appendChild(createProductCard(p)));
      }
  }

  // =================================================================
  // 4. GIỎ HÀNG (FIXED BUG) & THANH TOÁN
  // =================================================================

  window.addToCart = function(id, ml, qty, price, productObj) {
      if(!productObj) productObj = products.find(p => p.id === id);
      const existing = cart.find(i => i.id === id && i.ml === ml);
      if(existing) {
          existing.quantity += qty;
      } else {
          cart.push({ id, ml, quantity: qty, price, name: productObj.name, image: productObj.image });
      }
      localStorage.setItem('perfumeCart', JSON.stringify(cart));
      window.updateCartBadge();
  };

  window.updateCartBadge = function() {
      const badge = document.getElementById('cart-badge');
      const total = cart.reduce((sum, i) => sum + (i.quantity || 0), 0); 
      if(badge) {
          badge.textContent = total;
          badge.style.display = total > 0 ? 'inline-block' : 'none';
      }
  };

  function renderCart() {
      const tbody = document.getElementById('cart-items-body');
      const totalEl = document.getElementById('cart-total');
      const subEl = document.getElementById('cart-subtotal');
      // Render cho phần Checkout (bên phải)
      const checkoutSummary = document.getElementById('checkout-summary-list');
      const checkoutCount = document.getElementById('checkout-count');
      const checkoutTotal = document.getElementById('checkout-total');

      if(!tbody) return;

      tbody.innerHTML = '';
      if(checkoutSummary) checkoutSummary.innerHTML = '';

      if(cart.length === 0) {
          tbody.innerHTML = '<tr><td colspan="5" class="text-center">Giỏ hàng rỗng</td></tr>';
          if(totalEl) totalEl.textContent = '0 VNĐ';
          if(subEl) subEl.textContent = '0 VNĐ';
          if(checkoutSummary) checkoutSummary.innerHTML = '<li class="list-group-item text-center text-muted">Giỏ hàng trống</li>';
          if(checkoutCount) checkoutCount.textContent = 0;
          if(checkoutTotal) checkoutTotal.textContent = '0 VNĐ';
          return;
      }

      let total = 0;
      let totalQty = 0;

      cart.forEach((item, idx) => {
          let q = item.quantity || 1; // Fix nếu data cũ bị lỗi
          let lineTotal = item.price * q;
          total += lineTotal;
          totalQty += q;

          // Render bảng giỏ hàng
          tbody.innerHTML += `
            <tr>
                <td><img src="${item.image}" width="50" class="me-2"> ${item.name} <br><small class="text-muted">${item.ml}ml</small></td>
                <td>${formatVND(item.price)}</td>
                <td><input type="number" min="1" value="${q}" class="form-control input-cart-quantity" style="width:70px" data-idx="${idx}"></td>
                <td>${formatVND(lineTotal)}</td>
                <td><button class="btn btn-sm btn-danger btn-remove-cart-item" data-idx="${idx}"><i class="bi bi-trash"></i></button></td>
            </tr>`;
          
          // Render list bên trang thanh toán
          if(checkoutSummary) {
              checkoutSummary.innerHTML += `
                <li class="list-group-item d-flex justify-content-between lh-sm">
                    <div>
                        <h6 class="my-0 small fw-bold">${item.name} (${item.ml}ml)</h6>
                        <small class="text-muted">x ${q}</small>
                    </div>
                    <span class="text-muted small">${formatVND(lineTotal)}</span>
                </li>`;
          }
      });

      if(totalEl) totalEl.textContent = formatVND(total);
      if(subEl) subEl.textContent = formatVND(total);
      if(checkoutCount) checkoutCount.textContent = totalQty;
      if(checkoutTotal) checkoutTotal.textContent = formatVND(total);

      document.querySelectorAll('.input-cart-quantity').forEach(inp => {
          inp.addEventListener('change', function() { window.updateCartQty(this.getAttribute('data-idx'), this.value); });
      });
      document.querySelectorAll('.btn-remove-cart-item').forEach(btn => {
          btn.addEventListener('click', function() { window.removeCartItem(this.getAttribute('data-idx')); });
      });
  }

  window.updateCartQty = function(idx, val) {
      if(val < 1) val = 1;
      cart[idx].quantity = parseInt(val);
      localStorage.setItem('perfumeCart', JSON.stringify(cart));
      renderCart();
      window.updateCartBadge();
  };
  
  window.removeCartItem = function(idx) {
      cart.splice(idx, 1);
      localStorage.setItem('perfumeCart', JSON.stringify(cart));
      renderCart();
      window.updateCartBadge();
  };

  // --- LOGIC THANH TOÁN MỚI (Tự điền + QR + Xử lý) ---
  
  function autoFillCheckout() {
      const nameInput = document.getElementById('checkoutName');
      const emailInput = document.getElementById('checkoutEmail');
      
      if(nameInput && emailInput && loggedInUser) {
          const user = customers.find(c => c.name === loggedInUser);
          if(user) {
              nameInput.value = user.name;
              emailInput.value = user.email;
          }
      }
  }

  // Xử lý radio Payment Method (Hiện/Ẩn QR)
  const radioOnline = document.getElementById('paymentOnline');
  const radioCOD = document.getElementById('paymentCOD');
  const qrSection = document.getElementById('qr-payment-section');

  if(radioOnline && radioCOD && qrSection) {
      function updatePaymentMethod() {
          if (radioOnline.checked) {
              qrSection.style.display = 'block';
              updateQR(); // Tạo mã mới
          } else {
              qrSection.style.display = 'none';
              isPaidOnline = false; // Reset trạng thái
          }
      }
      radioOnline.addEventListener('change', updatePaymentMethod);
      radioCOD.addEventListener('change', updatePaymentMethod);
  }

  // Hàm tạo mã QR tự động (VietQR)
  function updateQR() {
      const total = cart.reduce((sum, i) => sum + i.price * (i.quantity||1), 0);
      const name = document.getElementById('checkoutName').value || 'Khach';
      const phone = document.getElementById('checkoutPhone').value || 'SDT';
      const content = `Thanh toan ${name} ${phone}`;
      
      // Link tạo mã QR của VietQR (MB Bank demo)
      // Dùng số điện thoại của bạn làm số tài khoản ảo
      const qrUrl = `https://img.vietqr.io/image/MB-0796812711-compact.png?amount=${total}&addInfo=${encodeURIComponent(content)}`;
      
      document.getElementById('vietqr-image').src = qrUrl;
      document.getElementById('qr-content').textContent = content;
  }

  // Hàm giả lập thanh toán thành công
  window.simulatePaymentSuccess = function() {
      if(!loggedInUser) { alert('Vui lòng đăng nhập trước!'); return; }
      isPaidOnline = true;
      alert('Đã nhận tín hiệu thanh toán từ Ngân hàng!\nBạn có thể bấm "HOÀN TẤT ĐẶT HÀNG" ngay.');
  }

  // Xử lý Checkbox Địa chỉ khác
  const diffAddressCheck = document.getElementById('diffAddress');
  if(diffAddressCheck) {
      diffAddressCheck.addEventListener('change', function() {
          document.getElementById('box-diff-address').style.display = this.checked ? 'block' : 'none';
      });
  }

  const formCheckout = document.getElementById('form-checkout');
  if(formCheckout) {
      formCheckout.addEventListener('submit', (e) => {
          e.preventDefault();
          
          if (!loggedInUser) {
              alert('Vui lòng đăng nhập để tiến hành đặt hàng!');
              window.location.hash = '#trang-dang-nhap';
              window.showPage('#trang-dang-nhap');
              return; 
          }

          if(cart.length === 0) { alert('Giỏ hàng trống!'); return; }
          
          // Kiểm tra thanh toán online
          const isOnline = document.getElementById('paymentOnline').checked;
          if (isOnline && !isPaidOnline) {
              alert('Vui lòng quét mã QR và thanh toán trước khi hoàn tất!');
              return;
          }

          const name = document.getElementById('checkoutName').value;
          const phone = document.getElementById('checkoutPhone').value;
          const email = document.getElementById('checkoutEmail').value;
          let address = document.getElementById('checkoutAddress').value;
          
          if(document.getElementById('diffAddress').checked) {
              const addr2 = document.getElementById('checkoutAddress2').value;
              if(addr2) address = addr2;
          }

          if(phone.length < 10) { alert('Số điện thoại không hợp lệ!'); return; }

          const total = cart.reduce((sum, i) => sum + i.price * (i.quantity||1), 0);
          
          const newOrder = {
              id: 'DH' + Date.now().toString().slice(-6),
              customer: name,
              phone: phone,
              email: email,
              address: address,
              date: new Date().toLocaleDateString('vi-VN'),
              total: total,
              // Quan trọng: Status khác nhau tùy phương thức
              status: isOnline ? 'Đã thanh toán' : 'Chờ xác nhận',
              paymentMethod: isOnline ? 'Chuyển khoản / QR' : 'COD',
              items: cart,
              userEmail: loggedInUser || 'guest'
          };

          let allOrders = JSON.parse(localStorage.getItem('perfumeOrders_Real')) || [];
          allOrders.unshift(newOrder);
          localStorage.setItem('perfumeOrders_Real', JSON.stringify(allOrders));

          let msg = isOnline ? 'Thanh toán online thành công! Cảm ơn bạn.' : 'Đặt hàng thành công! Vui lòng chờ xác nhận.';
          alert(msg + ' Mã đơn: ' + newOrder.id);
          
          cart = [];
          localStorage.setItem('perfumeCart', JSON.stringify(cart));
          window.updateCartBadge();
          formCheckout.reset();
          isPaidOnline = false; // Reset cờ
          
          window.location.hash = '#trang-lich-su';
          window.renderMyOrders();
          window.showPage('#trang-lich-su');
      });
  }

  // =================================================================
  // CÁC HÀM CŨ GIỮ NGUYÊN (Lịch sử, Login, ...)
  // =================================================================

 window.renderMyOrders = function() {
      const tbody = document.getElementById('my-orders-body');
      const msg = document.getElementById('no-orders-msg');
      if(!tbody) return;

      let allOrders = JSON.parse(localStorage.getItem('perfumeOrders_Real')) || [];
      let myOrders = allOrders.filter(o => o.userEmail === (loggedInUser || 'guest'));
      
      tbody.innerHTML = '';
      
      if(myOrders.length === 0) { 
          if(msg) msg.style.display = 'block'; 
      } else {
          if(msg) msg.style.display = 'none';
          
          // Sắp xếp đơn mới nhất lên đầu
          myOrders.sort((a,b) => b.id.localeCompare(a.id));
          
          myOrders.forEach(o => {
              // 1. Badge màu sắc đẹp
              let badgeClass = 'bg-secondary';
              if(o.status === 'Chờ xác nhận') badgeClass = 'bg-warning text-dark';
              else if(o.status === 'Đã xác nhận') badgeClass = 'bg-info text-dark';
              else if(o.status === 'Đang giao') badgeClass = 'bg-primary';
              else if(o.status === 'Giao thành công') badgeClass = 'bg-success';
              else if(o.status === 'Đã hủy') badgeClass = 'bg-danger';

              // 2. Nút Thao tác: Luôn có nút Xem (Mắt). Chỉ hiện nút Hủy nếu đơn chưa xử lý.
              let actionBtns = `
                  <button class="btn btn-sm btn-light border shadow-sm me-2" onclick="window.viewUserOrderDetail('${o.id}')" title="Xem chi tiết">
                      <i class="bi bi-eye-fill text-primary"></i>
                  </button>
              `;
              
              if(o.status === 'Chờ xác nhận') {
                  actionBtns += `
                      <button class="btn btn-sm btn-light border shadow-sm text-danger" onclick="window.cancelMyOrder('${o.id}')" title="Hủy đơn">
                          <i class="bi bi-x-lg"></i>
                      </button>
                  `;
              }

              tbody.innerHTML += `
                <tr>
                    <td class="fw-bold text-primary">#${o.id}</td>
                    <td>${o.date}</td>
                    <td>${o.items.length} sản phẩm</td>
                    <td class="text-danger fw-bold">${formatVND(o.total)}</td>
                    <td><span class="badge ${badgeClass} rounded-pill px-3">${o.status}</span></td>
                    <td>${actionBtns}</td>
                </tr>`;
          });
      }
  };

  window.cancelMyOrder = function(id) {
      if(!confirm('Bạn chắc chắn muốn hủy đơn hàng này?')) return;
      let allOrders = JSON.parse(localStorage.getItem('perfumeOrders_Real')) || [];
      let idx = allOrders.findIndex(o => o.id === id);
      if(idx !== -1) { 
          allOrders[idx].status = 'Đã hủy'; 
          localStorage.setItem('perfumeOrders_Real', JSON.stringify(allOrders)); 
          window.renderMyOrders(); 
      }
  };

  const pages = document.querySelectorAll('.page');
  window.showPage = function(hash) {
      pages.forEach(p => p.classList.remove('active'));
      const target = document.querySelector(hash);
      if(target) target.classList.add('active');
      if(hash === '#trang-gio-hang') renderCart();
      if(hash === '#trang-lich-su') window.renderMyOrders();
      if(hash === '#trang-thanh-toan') {
          renderCart(); // Để cập nhật list bên phải
          autoFillCheckout(); // Tự điền thông tin
          // Cập nhật lại QR code mỗi khi vào trang nếu đang chọn Online
          if(document.getElementById('paymentOnline').checked) updateQR();
      }
      window.scrollTo(0,0);
  };

  document.querySelectorAll('a[href^="#trang-"]').forEach(l => l.onclick = (e) => { e.preventDefault(); window.location.hash = l.getAttribute('href'); window.showPage(l.getAttribute('href')); });
  
  function updateLogin() {
      const u = localStorage.getItem('loggedInUser');
      if(u) { document.getElementById('auth-links').style.display='none'; document.getElementById('user-info').style.display='block'; document.getElementById('user-name-display').textContent=u; }
      else { document.getElementById('auth-links').style.display='block'; document.getElementById('user-info').style.display='none'; }
  }
  updateLogin();
  
  document.getElementById('logout-btn')?.addEventListener('click', () => { localStorage.removeItem('loggedInUser'); localStorage.removeItem('isAdmin'); location.reload(); });
  
  const formLogin = document.getElementById('form-login');
  if(formLogin) {
      formLogin.addEventListener('submit', (e) => {
          e.preventDefault();
          const email = document.getElementById('login-email').value;
          const pass = document.getElementById('login-password').value;
          if(email === 'admin@perfume.vn' && pass === 'admin123') {
              localStorage.setItem('loggedInUser', 'Admin'); localStorage.setItem('isAdmin', 'true'); alert('Chào mừng Admin!'); window.location.href = 'admin.html';
          } else {
              const found = customers.find(c => c.email === email && c.password === pass);
              if (found) {
                  localStorage.setItem('loggedInUser', found.name); localStorage.setItem('isAdmin', 'false'); alert(`Chào mừng ${found.name}!`); updateLogin(); window.location.hash = '#trang-chu'; window.showPage('#trang-chu');
              } else {
                  document.getElementById('login-error').textContent = 'Sai email hoặc mật khẩu!';
              }
          }
      });
  }

  const formRegister = document.getElementById('form-register');
  if(formRegister) {
      formRegister.addEventListener('submit', (e) => {
          e.preventDefault();
          const name = document.getElementById('register-name').value;
          const email = document.getElementById('register-email').value;
          const pass = document.getElementById('register-password').value;
          if(customers.find(c => c.email === email)) { document.getElementById('register-error').textContent = 'Email đã tồn tại'; return; }
          const newCus = { id: Date.now(), name, email, password: pass, joined: new Date().toLocaleDateString('vi-VN'), status: 'Active' };
          customers.push(newCus); localStorage.setItem('perfumeCustomers', JSON.stringify(customers));
          alert('Đăng ký thành công!'); window.location.hash = '#trang-dang-nhap'; window.showPage('#trang-dang-nhap');
      });
  }

  // Tự điền Form Liên Hệ
  function autoFillContact() {
      const nameInput = document.getElementById('contactName');
      const emailInput = document.getElementById('contactEmail');
      if (nameInput && emailInput && loggedInUser) {
          const currentUser = customers.find(c => c.name === loggedInUser);
          if (currentUser) { nameInput.value = currentUser.name; emailInput.value = currentUser.email; }
      }
  }
  document.querySelector('a[href="#trang-lien-he"]')?.addEventListener('click', autoFillContact);

  const contactForm = document.getElementById('form-contact');
  if(contactForm) {
      contactForm.addEventListener('submit', function(e) {
          e.preventDefault(); 
          const name = document.getElementById('contactName').value;
          alert(`Cảm ơn ${name}! Chúng tôi đã nhận được tin nhắn.`);
          contactForm.reset();
          if(loggedInUser) autoFillContact();
      });
  }

  window.filterByBrand = function(brand) {
      document.querySelectorAll('input[name="thuonghieu"]').forEach(c => c.checked = false);
      const cb = document.querySelector(`input[name="thuonghieu"][value="${brand}"]`);
      if(cb) cb.checked = true;
      window.location.hash = '#trang-san-pham';
      window.showPage('#trang-san-pham');
      renderList();
  };

  document.querySelectorAll('aside input').forEach(i => i.onchange = () => { currentPage=1; renderList(); });
  document.getElementById('searchInput')?.addEventListener('input', () => { currentPage=1; renderList(); });

  renderList();
  renderExtraSections();
  window.updateCartBadge();

  const initHash = window.location.hash || '#trang-chu';
  if (initHash === '#trang-chi-tiet') {
      const savedId = localStorage.getItem('selectedProductId');
      if (savedId) { window.showProductDetail(savedId); window.showPage('#trang-chi-tiet'); } 
      else { window.showPage('#trang-san-pham'); }
  } else {
      window.showPage(initHash);
  }
  // =================================================================
  // 5. QUẢN LÝ HỒ SƠ CÁ NHÂN (PROFILE) & AUTO-FILL
  // =================================================================

  // Hàm hiển thị thông tin lên form Hồ sơ
  window.renderProfile = function() {
      if (!loggedInUser) return;
      // Tìm user trong danh sách customers
      const currentUser = customers.find(c => c.name === loggedInUser);
      if (currentUser) {
          document.getElementById('profile-name').value = currentUser.name || '';
          document.getElementById('profile-email').value = currentUser.email || '';
          document.getElementById('profile-phone').value = currentUser.phone || ''; // Lấy SĐT nếu đã lưu
          document.getElementById('profile-address').value = currentUser.address || ''; // Lấy địa chỉ nếu đã lưu
      }
  };

  // Xử lý sự kiện Lưu Hồ sơ
  const formProfile = document.getElementById('form-profile');
  if (formProfile) {
      formProfile.addEventListener('submit', function(e) {
          e.preventDefault();
          if (!loggedInUser) return;

          const newName = document.getElementById('profile-name').value.trim();
          const newPhone = document.getElementById('profile-phone').value.trim();
          const newAddress = document.getElementById('profile-address').value.trim();

          // Cập nhật mảng customers
          const idx = customers.findIndex(c => c.name === loggedInUser);
          if (idx !== -1) {
              customers[idx].name = newName;
              customers[idx].phone = newPhone;
              customers[idx].address = newAddress;
              
              // Lưu lại vào LocalStorage
              localStorage.setItem('perfumeCustomers', JSON.stringify(customers));
              
              // Nếu đổi tên thì phải cập nhật lại biến loggedInUser và giao diện
              if (loggedInUser !== newName) {
                  loggedInUser = newName;
                  localStorage.setItem('loggedInUser', newName);
                  updateLogin(); // Cập nhật tên trên menu
              }

              alert('Cập nhật hồ sơ thành công!');
          }
      });
  }

  // CẬP NHẬT LẠI HÀM AUTO-FILL CHO THANH TOÁN (Thông minh hơn)
  // Ghi đè lại hàm cũ để lấy thêm SĐT và Địa chỉ
  function autoFillCheckout() {
      const nameInput = document.getElementById('checkoutName');
      const emailInput = document.getElementById('checkoutEmail');
      const phoneInput = document.getElementById('checkoutPhone');
      const addrInput = document.getElementById('checkoutAddress');
      
      if(loggedInUser) {
          const user = customers.find(c => c.name === loggedInUser);
          if(user) {
              if(nameInput) nameInput.value = user.name || '';
              if(emailInput) emailInput.value = user.email || '';
              // Điền thêm SĐT và Địa chỉ từ hồ sơ
              if(phoneInput && user.phone) phoneInput.value = user.phone;
              if(addrInput && user.address) addrInput.value = user.address;
          }
      }
  }

  // CẬP NHẬT LẠI HÀM AUTO-FILL CHO LIÊN HỆ
  function autoFillContact() {
      const nameInput = document.getElementById('contactName');
      const emailInput = document.getElementById('contactEmail');
      if (nameInput && emailInput && loggedInUser) {
          const currentUser = customers.find(c => c.name === loggedInUser);
          if (currentUser) { 
              nameInput.value = currentUser.name; 
              emailInput.value = currentUser.email; 
          }
      }
  }

  // Sửa lại showPage để load dữ liệu khi vào trang hồ sơ
 // Sửa lại showPage để load dữ liệu khi vào trang hồ sơ
  const originalShowPage = window.showPage; // Lưu hàm cũ
  
  window.showPage = function(hash) {
      originalShowPage(hash); // Chạy logic cũ trước
      
      // 👇👇👇 THÊM DÒNG NÀY ĐỂ FIX LỖI 👇👇👇
      loggedInUser = localStorage.getItem('loggedInUser'); 
      // 👆👆👆 (Cập nhật lại trạng thái đăng nhập mới nhất)

      // Logic kiểm tra hồ sơ
      if (hash === '#trang-ho-so') {
          if (!loggedInUser) {
              alert('Vui lòng đăng nhập để xem hồ sơ!');
              window.showPage('#trang-dang-nhap');
              return;
          }
          window.renderProfile();
      }
  };
  // --- HÀM XEM CHI TIẾT ĐƠN HÀNG CHO KHÁCH (MỚI) ---
  window.viewUserOrderDetail = function(orderId) {
      let allOrders = JSON.parse(localStorage.getItem('perfumeOrders_Real')) || [];
      const order = allOrders.find(o => o.id === orderId);
      
      if (!order) return;

      // 1. Điền thông tin chung
      document.getElementById('u-od-id').textContent = `Chi tiết đơn hàng #${order.id}`;
      document.getElementById('u-od-name').textContent = order.customer;
      document.getElementById('u-od-phone').textContent = order.phone;
      document.getElementById('u-od-addr').textContent = order.address;
      document.getElementById('u-od-date').textContent = order.date;
      document.getElementById('u-od-payment').textContent = order.paymentMethod || 'COD';
      document.getElementById('u-od-total').textContent = formatVND(order.total);

      // 2. Xử lý Badge trạng thái đẹp
      const statusEl = document.getElementById('u-od-status');
      statusEl.textContent = order.status;
      statusEl.className = 'badge rounded-pill px-3 py-2 '; // Reset class
      
      if(order.status === 'Chờ xác nhận') statusEl.classList.add('bg-warning', 'text-dark');
      else if(order.status === 'Đã xác nhận') statusEl.classList.add('bg-info', 'text-dark');
      else if(order.status === 'Đang giao') statusEl.classList.add('bg-primary');
      else if(order.status === 'Giao thành công') statusEl.classList.add('bg-success');
      else statusEl.classList.add('bg-danger');

      // 3. Render danh sách sản phẩm
      const listEl = document.getElementById('u-od-list');
      listEl.innerHTML = '';
      
      order.items.forEach(item => {
          let img = item.image || 'https://via.placeholder.com/50';
          listEl.innerHTML += `
            <tr class="border-bottom">
                <td class="ps-3">
                    <div class="d-flex align-items-center">
                        <img src="${img}" class="rounded border p-1 me-2" width="50" height="50" style="object-fit:contain;">
                        <div>
                            <div class="fw-bold text-dark small">${item.name}</div>
                            <small class="text-muted" style="font-size: 11px;">Phân loại: ${item.ml}ml</small>
                        </div>
                    </div>
                </td>
                <td class="text-center small">${formatVND(item.price)}</td>
                <td class="text-center small">x${item.quantity||1}</td>
                <td class="text-end fw-bold text-dark pe-3">${formatVND(item.price * (item.quantity||1))}</td>
            </tr>
          `;
      });

      // 4. Mở Modal
      new bootstrap.Modal(document.getElementById('userOrderDetailModal')).show();
  };
});
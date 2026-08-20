const tabs = document.querySelectorAll('.search-tabs button');
const vehicleForm = document.querySelector('#vehicle-form');
const codeForm = document.querySelector('#code-form');
const message = document.querySelector('.form-message');
const cartButton = document.querySelector('.cart');
const cartDrawer = document.querySelector('.cart-drawer');
const closeCart = document.querySelector('.close-cart');
const cartItems = document.querySelector('.cart-items');
const cartEmpty = document.querySelector('.cart-empty');
const cartTotal = document.querySelector('.cart-total strong');
const cartCount = document.querySelector('.cart b');
const cart = [];
const pageView = document.querySelector('#page-view');
const brandSelect = document.querySelector('#brand-select');
const modelSelect = document.querySelector('#model-select');
const yearSelect = document.querySelector('#year-select');
const vehicleData = {
  porsche: { name: 'Porsche', models: ['911', 'Cayenne', 'Macan', 'Panamera'], years: ['2024', '2023', '2022', '2021'] },
  ferrari: { name: 'Ferrari', models: ['488', 'Roma', 'Purosangue', '296 GTB'], years: ['2024', '2023', '2022'] },
  lamborghini: { name: 'Lamborghini', models: ['Urus', 'Huracan', 'Revuelto'], years: ['2024', '2023', '2022'] },
  tesla: { name: 'Tesla', models: ['Model S', 'Model 3', 'Model X', 'Model Y'], years: ['2024', '2023', '2022'] },
  maserati: { name: 'Maserati', models: ['Ghibli', 'Levante', 'Grecale'], years: ['2024', '2023', '2022'] },
  bentley: { name: 'Bentley', models: ['Continental GT', 'Bentayga', 'Flying Spur'], years: ['2024', '2023', '2022'] },
  'aston-martin': { name: 'Aston Martin', models: ['DBX', 'Vantage', 'DB12'], years: ['2024', '2023', '2022'] }
};
const productModal = document.querySelector('.product-modal');
const modalName = document.querySelector('.modal-name');
const modalPrice = document.querySelector('.modal-price');
let selectedProduct = null;

function loadLocalMedia(element) {
  const source = element.dataset.media;
  if (!source) return;
  const image = new Image();
  image.onload = () => {
    element.style.setProperty('--media-image', `url("${source}")`);
    element.classList.add('media-ready');
  };
  image.onerror = () => {
    element.classList.add('media-missing');
  };
  image.src = source;
}

const verifiedVehicleMedia = {
  porsche: 'https://images.unsplash.com/photo-1611651338412-8403fa6e3599?auto=format&fit=crop&w=1200&q=85',
  ferrari: 'https://images.unsplash.com/photo-1592198084033-aade902d1aae?auto=format&fit=crop&w=1200&q=85',
  lamborghini: 'https://images.unsplash.com/photo-1544829099-b9a0c07fad1a?auto=format&fit=crop&w=1200&q=85',
  tesla: 'https://images.unsplash.com/photo-1560958089-b8a1929cea89?auto=format&fit=crop&w=1200&q=85',
  maserati: 'assets/vehicles/Maserati.jpg',
  bentley: 'assets/vehicles/Bentley.jpg',
  'aston-martin': 'assets/vehicles/Aston martin.jpg'
};

document.querySelectorAll('.brand-card[data-brand]').forEach((card) => {
  if (verifiedVehicleMedia[card.dataset.brand]) card.dataset.media = verifiedVehicleMedia[card.dataset.brand];
});

const heroMedia = document.querySelector('.hero-visual.vehicle-media');
if (heroMedia) heroMedia.dataset.media = verifiedVehicleMedia.porsche;

document.querySelectorAll('[data-media]').forEach(loadLocalMedia);

function fillSelect(select, placeholder, values, disabled = false) {
  select.innerHTML = `<option value="">${placeholder}</option>${values.map((value) => `<option value="${value}">${value}</option>`).join('')}`;
  select.disabled = disabled;
}

brandSelect.addEventListener('change', () => {
  const vehicle = vehicleData[brandSelect.value];
  fillSelect(modelSelect, vehicle ? 'Model seçin' : 'Önce marka seçin', vehicle?.models ?? [], !vehicle);
  fillSelect(yearSelect, 'Önce model seçin', [], true);
  message.textContent = vehicle ? `${vehicle.name} modelleri hazır.` : '';
});

modelSelect.addEventListener('change', () => {
  const vehicle = vehicleData[brandSelect.value];
  const hasModel = Boolean(modelSelect.value);
  fillSelect(yearSelect, hasModel ? 'Yıl seçin' : 'Önce model seçin', vehicle?.years ?? [], !hasModel);
});

document.querySelectorAll('.brand-card').forEach((card) => {
  card.addEventListener('click', (event) => {
    event.preventDefault();
    openPage('catalog', card.dataset.brand);
  });
});

const pageTemplates = {
  catalog: `<div class="page-inner"><button class="back-home" data-close-page>← Ana sayfaya dön</button><p class="eyebrow">ERLER OTO KATALOĞU</p><h1>Doğru parçayı<br><i>doğrudan</i> bulun.</h1><div class="catalog-toolbar"><strong>Seçili ürünler</strong><span>12.480 ürün</span><button class="filter-button">Filtreler +</button></div><div class="product-grid catalog-grid"></div></div>`,
  brands: `<div class="page-inner"><button class="back-home" data-close-page>← Ana sayfaya dön</button><p class="eyebrow">SEÇKİN GARAJ</p><h1>Lüks otomobil<br><i>markaları.</i></h1><p class="page-lead">Otomobilinizin karakterine uygun, doğrulanmış parçaları marka bazında keşfedin.</p><div class="brand-grid page-brands"></div></div>`,
  about: `<div class="page-inner about-page"><button class="back-home" data-close-page>← Ana sayfaya dön</button><p class="eyebrow">ERLER OTO HAKKINDA</p><h1>Parçadan önce<br><i>güven.</i></h1><p class="page-lead">Erler Oto, seçkin otomobiller için doğru parçayı bulma deneyimini sadeleştirir. Her ürün; OEM kodu, araç uyumluluğu ve stok bilgisiyle kontrol edilir.</p><div class="about-stats"><strong>12.480+<small>ürün</small></strong><strong>24 sa<small>hızlı çıkış</small></strong><strong>7/24<small>uzman desteği</small></strong></div></div>`,
  checkout: `<div class="page-inner checkout-page"><button class="back-home" data-close-page>← Alışverişe dön</button><p class="eyebrow">GÜVENLİ SİPARİŞ</p><h1>Siparişinizi<br><i>tamamlayın.</i></h1><div class="checkout-layout"><form class="checkout-form"><label>Ad soyad<input required placeholder="Adınız ve soyadınız"></label><label>E-posta<input required type="email" placeholder="ornek@email.com"></label><label>Adres<textarea required placeholder="Teslimat adresiniz"></textarea></label><button class="primary" type="submit">Siparişi onayla <span>↗</span></button></form><div class="checkout-note"><strong>Güvenli ödeme</strong><p>Ödeme sağlayıcısı bağlantısı hazır olduğunda bu adım sunucu tarafı doğrulamayla çalışacaktır.</p><strong class="checkout-sum">Toplam: ₺0</strong></div></div></div>`
};

function openPage(page, brandFilter = '') {
  if (!pageTemplates[page]) return;
  pageView.innerHTML = pageTemplates[page];
  pageView.classList.add('open');
  pageView.setAttribute('aria-hidden', 'false');
  history.pushState({ page, brandFilter }, '', brandFilter ? `#catalog/${brandFilter}` : `#${page}`);
  if (page === 'catalog') {
    const products = [...document.querySelectorAll('main .product-card')].filter((card) => !brandFilter || card.dataset.brand === brandFilter);
    const brandName = vehicleData[brandFilter]?.name;
    pageView.querySelector('.page-inner h1').innerHTML = brandName ? `${brandName} parçaları<br><i>seçiminiz.</i>` : 'Doğru parçayı<br><i>doğrudan</i> bulun.';
    pageView.querySelector('.catalog-toolbar strong').textContent = brandName ? `${brandName} ürünleri` : 'Seçili ürünler';
    pageView.querySelector('.catalog-toolbar span').textContent = `${products.length} ürün gösteriliyor`;
    pageView.querySelector('.catalog-grid').innerHTML = products.length ? products.map((card) => card.outerHTML).join('') : '<p class="empty-results">Bu marka için henüz ürün eklenmedi.</p>';
  }
  if (page === 'brands') {
    document.querySelector('.page-brands').innerHTML = [...document.querySelectorAll('.brand-card')].map((card) => card.outerHTML).join('');
  }
  pageView.querySelector('[data-close-page]').addEventListener('click', closePage);
}

function closePage() {
  pageView.classList.remove('open');
  pageView.setAttribute('aria-hidden', 'true');
  history.pushState({}, '', '#top');
}

document.querySelectorAll('[data-page]').forEach((link) => link.addEventListener('click', (event) => {
  event.preventDefault();
  openPage(link.dataset.page);
}));
window.addEventListener('popstate', closePage);

function renderCart() {
  cartItems.innerHTML = cart.map((item, index) => `<div class="cart-item"><span>${item.name}</span><strong>₺${item.price.toLocaleString('tr-TR')}</strong><button class="remove-item" type="button" data-index="${index}" aria-label="${item.name} ürününü kaldır">Kaldır</button></div>`).join('');
  cartEmpty.hidden = cart.length > 0;
  cartTotal.textContent = `₺${cart.reduce((total, item) => total + item.price, 0).toLocaleString('tr-TR')}`;
  cartCount.textContent = cart.length;
}

function addProductToCart(card) {
  const name = card.querySelector('h3').textContent.trim();
  const priceText = card.querySelector('.product-info strong').textContent.match(/₺([\d.]+)/)?.[1] ?? '0';
  cart.push({ name, price: Number(priceText.replace(/\./g, '')) });
  renderCart();
  toggleCart(true);
}

function toggleCart(isOpen) {
  cartDrawer.classList.toggle('open', isOpen);
  cartDrawer.setAttribute('aria-hidden', String(!isOpen));
}

document.querySelectorAll('.product-card').forEach((card) => {
  card.addEventListener('click', (event) => {
    if (event.target.closest('.add-to-cart')) return;
    selectedProduct = card;
    modalName.textContent = card.querySelector('h3').textContent.trim();
    modalPrice.textContent = card.querySelector('.product-info strong').textContent.split('₺')[1].trim().split(' ')[0];
    productModal.classList.add('open');
    productModal.setAttribute('aria-hidden', 'false');
  });
  const button = document.createElement('button');
  button.className = 'add-to-cart';
  button.type = 'button';
  button.innerHTML = 'Sepete ekle <span>+</span>';
  button.addEventListener('click', () => addProductToCart(card));
  card.querySelector('.product-info').append(button);
});

pageView.addEventListener('click', (event) => {
  const pageBrand = event.target.closest('.page-brands .brand-card');
  if (pageBrand) {
    event.preventDefault();
    openPage('catalog', pageBrand.dataset.brand);
    return;
  }
  const addButton = event.target.closest('.add-to-cart');
  if (addButton) {
    addProductToCart(addButton.closest('.product-card'));
    return;
  }
  const card = event.target.closest('.page-view .product-card');
  if (card) {
    selectedProduct = card;
    modalName.textContent = card.querySelector('h3').textContent.trim();
    modalPrice.textContent = card.querySelector('.product-info strong').textContent.split('₺')[1].trim().split(' ')[0];
    productModal.classList.add('open');
    productModal.setAttribute('aria-hidden', 'false');
  }
});

document.querySelector('.close-modal').addEventListener('click', () => productModal.classList.remove('open'));
productModal.addEventListener('click', (event) => {
  if (event.target === productModal) productModal.classList.remove('open');
});
document.querySelector('.modal-add').addEventListener('click', () => {
  if (selectedProduct) selectedProduct.querySelector('.add-to-cart').click();
  productModal.classList.remove('open');
});

document.querySelector('.checkout').addEventListener('click', () => {
  if (!cart.length) return;
  toggleCart(false);
  openPage('checkout');
  pageView.querySelector('.checkout-sum').textContent = `Toplam: ₺${cart.reduce((total, item) => total + item.price, 0).toLocaleString('tr-TR')}`;
  pageView.querySelector('.checkout-form').addEventListener('submit', (event) => {
    event.preventDefault();
    pageView.querySelector('.checkout-note p').textContent = 'Bilgileriniz alındı. Ödeme sağlayıcısı bağlantısı bekleniyor.';
  });
});

cartButton.addEventListener('click', () => toggleCart(true));
closeCart.addEventListener('click', () => toggleCart(false));
cartItems.addEventListener('click', (event) => {
  const removeButton = event.target.closest('.remove-item');
  if (!removeButton) return;
  cart.splice(Number(removeButton.dataset.index), 1);
  renderCart();
});

tabs.forEach((tab) => {
  tab.addEventListener('click', () => {
    tabs.forEach((item) => item.classList.remove('active'));
    tab.classList.add('active');
    const isVehicle = tab.dataset.tab === 'vehicle';
    vehicleForm.classList.toggle('hidden', !isVehicle);
    codeForm.classList.toggle('hidden', isVehicle);
    message.textContent = '';
  });
});

vehicleForm.addEventListener('submit', (event) => {
  event.preventDefault();
  const selects = [...vehicleForm.querySelectorAll('select')];
  if (selects.some((select) => !select.value)) {
    message.textContent = 'Marka, model ve yıl seçiminizi tamamlayın.';
    return;
  }
  message.textContent = 'Uyumlu parçalar hazırlanıyor...';
  document.querySelector('#catalog').scrollIntoView({ behavior: 'smooth' });
});

codeForm.addEventListener('submit', (event) => {
  event.preventDefault();
  const value = codeForm.querySelector('input').value.trim();
  message.textContent = value ? `${value} için arama hazırlanıyor...` : 'OEM kodu veya şasi numarası girin.';
});

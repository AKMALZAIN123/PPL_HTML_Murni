// Mobile Menu Toggle
const mobileMenuBtn = document.getElementById('mobileMenuBtn');
const navLinks = document.getElementById('navLinks');

if (mobileMenuBtn) {
    mobileMenuBtn.addEventListener('click', () => {
        navLinks.classList.toggle('active');
    });
}

// Read product ID from URL
const urlParams = new URLSearchParams(window.location.search);
const productId = urlParams.get('id') || '1';

// Mock product database
const productsDatabase = {
    "1": {
        id: "1",
        name: "Banner X Premium",
        category: "Banner & Spanduk",
        price: 125000,
        oldPrice: 147000,
        rating: 4.5,
        reviews: 127,
        sold: 543,
        stock: 250,
        description: 'Banner X Premium dengan material berkualitas tinggi...',
        images: [
            'https://images.unsplash.com/photo-1611329857570-f02f340e7378?w=800',
            'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800',
            'https://images.unsplash.com/photo-1609921212029-bb5a28e60960?w=800',
            'https://images.unsplash.com/photo-1596079890744-c1a0462d0975?w=800'
        ],
        variants: {
            sizes: ['160x60', '180x80', '200x80'],
            materials: ['flexi', 'albatros', 'vinyl'],
            prints: ['digital', 'uv']
        }
    },
    "2": {
        id: "2",
        name: "Kartu Undangan Custom",
        category: "Kartu Undangan",
        price: 299000,
        oldPrice: 350000,
        rating: 5.0,
        reviews: 89,
        sold: 324,
        stock: 150,
        description: 'Kartu undangan dengan desain custom sesuai keinginan Anda...',
        images: [
            'https://images.unsplash.com/photo-1530435460869-d13625c69bbf?w=800',
            'https://images.unsplash.com/photo-1611329857570-f02f340e7378?w=800',
            'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800',
            'https://images.unsplash.com/photo-1609921212029-bb5a28e60960?w=800'
        ],
        variants: {
            sizes: ['10x15', '12x18', '15x20'],
            materials: ['art paper', 'linen', 'jasmine'],
            prints: ['digital', 'offset']
        }
    },
    "3": {
        id: "3",
        name: "Lanyard Custom Logo",
        category: "Lanyard & ID Card",
        price: 15000,
        oldPrice: null,
        rating: 4.0,
        reviews: 67,
        sold: 1250,
        stock: 500,
        description: 'Lanyard dengan print sublim berkualitas tinggi...',
        images: [
            'https://images.unsplash.com/photo-1584464491033-06628f3a6b7b?w=800',
            'https://images.unsplash.com/photo-1611329857570-f02f340e7378?w=800',
            'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800',
            'https://images.unsplash.com/photo-1609921212029-bb5a28e60960?w=800'
        ],
        variants: {
            sizes: ['2cm', '2.5cm', '3cm'],
            materials: ['polyester', 'satin', 'nylon'],
            prints: ['sublim', 'sablon']
        }
    },
    "4": {
        id: "4",
        name: "Tumbler Stainless Custom",
        category: "Merchandise",
        price: 75000,
        oldPrice: 95000,
        rating: 4.7,
        reviews: 156,
        sold: 892,
        stock: 200,
        description: 'Tumbler stainless steel 500ml dengan custom logo...',
        images: [
            'https://images.unsplash.com/photo-1534452203293-494d7ddbf7e0?w=800',
            'https://images.unsplash.com/photo-1611329857570-f02f340e7378?w=800',
            'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800',
            'https://images.unsplash.com/photo-1609921212029-bb5a28e60960?w=800'
        ],
        variants: {
            sizes: ['350ml', '500ml', '750ml'],
            materials: ['stainless', 'aluminium'],
            prints: ['laser', 'sticker']
        }
    },
    "5": {
        id: "5",
        name: "Booth Promosi 3x3m",
        category: "Booth & Tenda",
        price: 2500000,
        oldPrice: null,
        rating: 5.0,
        reviews: 45,
        sold: 89,
        stock: 25,
        description: 'Tenda promosi 3x3m dengan custom print...',
        images: [
            'https://images.unsplash.com/photo-1588282322673-c31965a75c3e?w=800',
            'https://images.unsplash.com/photo-1611329857570-f02f340e7378?w=800',
            'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800',
            'https://images.unsplash.com/photo-1609921212029-bb5a28e60960?w=800'
        ],
        variants: {
            sizes: ['2x2m', '3x3m', '4x4m'],
            materials: ['parasut', 'D600', 'blackout'],
            prints: ['digital', 'sablon']
        }
    },
    "6": {
        id: "6",
        name: "Roll Up Banner",
        category: "Banner & Spanduk",
        price: 225000,
        oldPrice: null,
        rating: 4.2,
        reviews: 93,
        sold: 456,
        stock: 180,
        description: 'Roll up banner 85x200cm portable dan praktis...',
        images: [
            'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800',
            'https://images.unsplash.com/photo-1611329857570-f02f340e7378?w=800',
            'https://images.unsplash.com/photo-1609921212029-bb5a28e60960?w=800',
            'https://images.unsplash.com/photo-1596079890744-c1a0462d0975?w=800'
        ],
        variants: {
            sizes: ['60x160', '80x200', '85x200'],
            materials: ['albatros', 'flexi', 'backlight'],
            prints: ['digital', 'eco solvent']
        }
    },
    "7": {
        id: "7",
        name: "Spanduk Flexi Korea",
        category: "Banner & Spanduk",
        price: 35000,
        oldPrice: null,
        rating: 4.6,
        reviews: 234,
        sold: 1567,
        stock: 999,
        description: 'Spanduk flexi korea custom ukuran...',
        images: [
            'https://images.unsplash.com/photo-1609921212029-bb5a28e60960?w=800',
            'https://images.unsplash.com/photo-1611329857570-f02f340e7378?w=800',
            'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800',
            'https://images.unsplash.com/photo-1596079890744-c1a0462d0975?w=800'
        ],
        variants: {
            sizes: ['custom'],
            materials: ['flexi korea', 'flexi jerman', 'flexi china'],
            prints: ['digital', 'eco solvent']
        }
    },
    "8": {
        id: "8",
        name: "Sticker Vinyl Cut",
        category: "Merchandise",
        price: 25000,
        oldPrice: null,
        rating: 4.9,
        reviews: 312,
        sold: 2134,
        stock: 999,
        description: 'Sticker vinyl cut custom design...',
        images: [
            'https://images.unsplash.com/photo-1610701596007-11502861dcfa?w=800',
            'https://images.unsplash.com/photo-1611329857570-f02f340e7378?w=800',
            'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800',
            'https://images.unsplash.com/photo-1609921212029-bb5a28e60960?w=800'
        ],
        variants: {
            sizes: ['custom'],
            materials: ['vinyl cut', 'vinyl print', 'scotchlite'],
            prints: ['cutting', 'print cut']
        }
    },
    "9": {
        id: "9",
        name: "Mug Custom Print",
        category: "Merchandise",
        price: 35000,
        oldPrice: null,
        rating: 4.3,
        reviews: 178,
        sold: 678,
        stock: 300,
        description: 'Mug keramik custom print sublim...',
        images: [
            'https://images.unsplash.com/photo-1589939705384-5185137a7f0f?w=800',
            'https://images.unsplash.com/photo-1611329857570-f02f340e7378?w=800',
            'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800',
            'https://images.unsplash.com/photo-1609921212029-bb5a28e60960?w=800'
        ],
        variants: {
            sizes: ['standard', 'jumbo'],
            materials: ['keramik', 'porselen'],
            prints: ['sublim', 'decal']
        }
    }
};

// Get product data
const productData = productsDatabase[productId];

// If product not found, redirect to products page
if (!productData) {
    console.log('Product not found, redirecting...');
    window.location.href = 'products.html';
}

// Load product data
function loadProductData() {
    // Update breadcrumb
    document.getElementById('productName').textContent = productData.name;
    
    // Set page title
    document.title = `${productData.name} - Bhineka Cipta Kreasi`;
    
    console.log('Product loaded:', productData);
}

// Image Gallery
const mainImage = document.getElementById('mainImage');
const thumbnails = document.querySelectorAll('.thumbnail');

thumbnails.forEach((thumb, index) => {
    thumb.addEventListener('click', () => {
        // Remove active from all
        thumbnails.forEach(t => t.classList.remove('active'));
        // Add active to clicked
        thumb.classList.add('active');
        // Change main image
        mainImage.src = productData.images[index];
    });
});

// Zoom Button
const zoomBtn = document.getElementById('zoomBtn');
zoomBtn.addEventListener('click', () => {
    // TODO: Implement image zoom modal
    showNotification('Fitur zoom gambar akan segera hadir!');
});

// Wishlist Toggle
const wishlistBtn = document.getElementById('wishlistBtn');
let isWishlisted = false;

wishlistBtn.addEventListener('click', () => {
    isWishlisted = !isWishlisted;
    const icon = wishlistBtn.querySelector('i');
    
    if (isWishlisted) {
        icon.classList.remove('far');
        icon.classList.add('fas');
        wishlistBtn.classList.add('active');
        showNotification('Ditambahkan ke wishlist', 'success');
    } else {
        icon.classList.remove('fas');
        icon.classList.add('far');
        wishlistBtn.classList.remove('active');
        showNotification('Dihapus dari wishlist');
    }
});

// Variant Selection
const variantBtns = document.querySelectorAll('.variant-btn');
let selectedVariants = {
    size: '160x60',
    material: 'flexi',
    print: 'digital'
};

variantBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        // Get parent variant group
        const group = btn.closest('.variant-group');
        const groupBtns = group.querySelectorAll('.variant-btn');
        
        // Remove active from all in group
        groupBtns.forEach(b => b.classList.remove('active'));
        
        // Add active to clicked
        btn.classList.add('active');
        
        // Update selected variants
        if (btn.dataset.size) selectedVariants.size = btn.dataset.size;
        if (btn.dataset.material) selectedVariants.material = btn.dataset.material;
        if (btn.dataset.print) selectedVariants.print = btn.dataset.print;
        
        // Update price (example logic)
        updatePrice();
    });
});

// Price Calculator
function updatePrice() {
    const quantity = parseInt(qtyInput.value);
    let basePrice = productData.price;
    
    // Price variations based on size
    if (selectedVariants.size === '180x80') basePrice = 150000;
    if (selectedVariants.size === '200x80') basePrice = 175000;
    
    // Price variations based on material
    if (selectedVariants.material === 'albatros') basePrice += 25000;
    if (selectedVariants.material === 'vinyl') basePrice += 50000;
    
    // Price variations based on print
    if (selectedVariants.print === 'uv') basePrice += 30000;
    
    const totalPrice = basePrice * quantity;
    
    // Format and display
    const priceDisplay = document.getElementById('priceDisplay');
    priceDisplay.textContent = formatPrice(totalPrice);
}

function formatPrice(price) {
    return new Intl.NumberFormat('id-ID', {
        style: 'currency',
        currency: 'IDR',
        minimumFractionDigits: 0
    }).format(price);
}

// Quantity Selector
const qtyInput = document.getElementById('qtyInput');
const qtyMinus = document.getElementById('qtyMinus');
const qtyPlus = document.getElementById('qtyPlus');

qtyMinus.addEventListener('click', () => {
    let value = parseInt(qtyInput.value);
    if (value > 1) {
        qtyInput.value = value - 1;
        updatePrice();
    }
});

qtyPlus.addEventListener('click', () => {
    let value = parseInt(qtyInput.value);
    const max = parseInt(qtyInput.max);
    if (value < max) {
        qtyInput.value = value + 1;
        updatePrice();
    }
});

qtyInput.addEventListener('change', () => {
    let value = parseInt(qtyInput.value);
    const min = parseInt(qtyInput.min);
    const max = parseInt(qtyInput.max);
    
    if (value < min) qtyInput.value = min;
    if (value > max) qtyInput.value = max;
    
    updatePrice();
});

// Add to Cart
const btnAddCart = document.getElementById('btnAddCart');
const cartBadge = document.querySelector('.cart-badge');
let cartCount = parseInt(cartBadge.textContent) || 0;

btnAddCart.addEventListener('click', () => {
    const quantity = parseInt(qtyInput.value);
    
    // Prepare cart item
    const cartItem = {
        id: productData.id,
        name: productData.name,
        price: calculateCurrentPrice(),
        quantity: quantity,
        variants: selectedVariants,
        image: productData.images[0]
    };
    
    // Save to localStorage
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    cart.push(cartItem);
    localStorage.setItem('cart', JSON.stringify(cart));
    
    // Update badge
    cartCount += quantity;
    cartBadge.textContent = cartCount;
    
    // Visual feedback
    btnAddCart.innerHTML = '<i class="fas fa-check"></i> Ditambahkan!';
    setTimeout(() => {
        btnAddCart.innerHTML = '<i class="fas fa-shopping-cart"></i> Tambah ke Keranjang';
    }, 2000);
    
    showNotification(`${quantity} produk ditambahkan ke keranjang!`, 'success');
});

// Buy Now
const btnBuyNow = document.getElementById('btnBuyNow');
btnBuyNow.addEventListener('click', () => {
    // Add to cart first
    btnAddCart.click();
    
    // Redirect to cart after short delay
    setTimeout(() => {
        window.location.href = 'cart.html';
    }, 1000);
});

function calculateCurrentPrice() {
    let basePrice = productData.price;
    if (selectedVariants.size === '180x80') basePrice = 150000;
    if (selectedVariants.size === '200x80') basePrice = 175000;
    if (selectedVariants.material === 'albatros') basePrice += 25000;
    if (selectedVariants.material === 'vinyl') basePrice += 50000;
    if (selectedVariants.print === 'uv') basePrice += 30000;
    return basePrice;
}

// Share Buttons
const shareBtns = document.querySelectorAll('.share-btn');
shareBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        const url = window.location.href;
        const text = `Check out ${productData.name} at Bhineka Cipta Kreasi!`;
        
        if (btn.classList.contains('whatsapp')) {
            window.open(`https://wa.me/?text=${encodeURIComponent(text + ' ' + url)}`, '_blank');
        } else if (btn.classList.contains('facebook')) {
            window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`, '_blank');
        } else if (btn.classList.contains('twitter')) {
            window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`, '_blank');
        } else if (btn.classList.contains('link')) {
            navigator.clipboard.writeText(url);
            showNotification('Link berhasil disalin!', 'success');
        }
    });
});

// Tabs
const tabBtns = document.querySelectorAll('.tab-btn');
const tabContents = document.querySelectorAll('.tab-content');

tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        const targetTab = btn.dataset.tab;
        
        // Remove active from all
        tabBtns.forEach(b => b.classList.remove('active'));
        tabContents.forEach(c => c.classList.remove('active'));
        
        // Add active to selected
        btn.classList.add('active');
        document.getElementById(targetTab).classList.add('active');
    });
});

// Custom Form
const customForm = document.querySelector('.custom-form');
customForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // Collect form data
    const formData = new FormData(customForm);
    const data = {};
    formData.forEach((value, key) => {
        data[key] = value;
    });
    
    console.log('Custom order data:', data);
    
    // TODO: Send to API
    showNotification('Permintaan custom order berhasil dikirim! Tim kami akan menghubungi Anda segera.', 'success');
    customForm.reset();
});

// File Upload
const fileUpload = document.querySelector('.file-upload');
const fileInput = fileUpload.querySelector('input[type="file"]');

fileInput.addEventListener('change', (e) => {
    const file = e.target.files[0];
    if (file) {
        const fileName = file.name;
        const fileSize = (file.size / 1024 / 1024).toFixed(2);
        fileUpload.querySelector('span').textContent = `${fileName} (${fileSize}MB)`;
        showNotification('File berhasil dipilih!', 'success');
    }
});

// Related Products Click
const relatedProducts = document.querySelectorAll('.related-products-grid .product-card');
relatedProducts.forEach(card => {
    card.addEventListener('click', () => {
        // Navigate to product detail
        window.location.href = 'product-detail.html?id=' + Math.floor(Math.random() * 100);
    });
});

// Notification Function
function showNotification(message, type = 'info') {
    const existingNotif = document.querySelector('.notification');
    if (existingNotif) {
        existingNotif.remove();
    }
    
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    
    let icon = 'fa-info-circle';
    let bgColor = '#2563eb';
    
    if (type === 'success') {
        icon = 'fa-check-circle';
        bgColor = '#10b981';
    } else if (type === 'error') {
        icon = 'fa-exclamation-circle';
        bgColor = '#ef4444';
    }
    
    notification.innerHTML = `
        <i class="fas ${icon}"></i>
        <span>${message}</span>
    `;
    
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: white;
        padding: 1rem 1.5rem;
        border-radius: 8px;
        box-shadow: 0 10px 30px rgba(0,0,0,0.2);
        display: flex;
        align-items: center;
        gap: 1rem;
        z-index: 9999;
        animation: slideIn 0.3s ease-out;
        border-left: 4px solid ${bgColor};
        max-width: 400px;
    `;
    
    const notifIcon = notification.querySelector('i');
    notifIcon.style.color = bgColor;
    notifIcon.style.fontSize = '1.5rem';
    
    const notifText = notification.querySelector('span');
    notifText.style.color = '#1f2937';
    notifText.style.fontWeight = '500';
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease-out';
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, 3000);
}

// Add animation styles
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from {
            transform: translateX(400px);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOut {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(400px);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// Initialize on page load
window.addEventListener('load', () => {
    loadProductData();
    updatePrice();
    
    // Load cart count from localStorage
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
        const cart = JSON.parse(savedCart);
        cartCount = cart.reduce((total, item) => total + item.quantity, 0);
        cartBadge.textContent = cartCount;
    }
    
    console.log('Product detail page loaded');
});
// Get cart data from localStorage
let cartItems = JSON.parse(localStorage.getItem('cart')) || [];
let savedAddress = JSON.parse(localStorage.getItem('savedAddress')) || null;

// Initialize page
document.addEventListener('DOMContentLoaded', function() {
    loadCartSummary();
    loadSavedAddress();
    initializeFormHandlers();
    updateCartBadge();
});

// Load cart summary
function loadCartSummary() {
    const summaryProducts = document.getElementById('summaryProducts');
    const itemCount = document.getElementById('itemCount');
    const subtotalEl = document.getElementById('subtotal');
    const shippingEl = document.getElementById('shipping');
    const totalPriceEl = document.getElementById('totalPrice');
    
    if (cartItems.length === 0) {
        summaryProducts.innerHTML = `
            <div style="text-align: center; padding: 2rem; color: var(--text-light);">
                <i class="fas fa-shopping-cart" style="font-size: 3rem; margin-bottom: 1rem; opacity: 0.3;"></i>
                <p>Keranjang kosong</p>
                <a href="produk.html" style="color: var(--primary-color); text-decoration: none;">
                    Belanja Sekarang
                </a>
            </div>
        `;
        return;
    }
    
    // Render products
    summaryProducts.innerHTML = cartItems.map(item => `
        <div class="summary-product">
            <div class="product-thumb">
                <img src="${item.image}" alt="${item.name}">
            </div>
            <div class="product-details">
                <h4>${item.name}</h4>
                <p>Jumlah: ${item.quantity}</p>
                <span class="product-price">${formatPrice(item.price * item.quantity)}</span>
            </div>
        </div>
    `).join('');
    
    // Calculate totals
    const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const shipping = 10000;
    const total = subtotal + shipping;
    
    // Update UI
    itemCount.textContent = `(${cartItems.length} produk)`;
    subtotalEl.textContent = formatPrice(subtotal);
    shippingEl.textContent = formatPrice(shipping);
    totalPriceEl.textContent = formatPrice(total);
}

// Load saved address
function loadSavedAddress() {
    const savedAddressSection = document.getElementById('savedAddressSection');
    const savedAddressInfo = document.getElementById('savedAddressInfo');
    const contactSection = document.getElementById('contactSection');
    
    if (savedAddress) {
        savedAddressSection.style.display = 'block';
        contactSection.style.display = 'none';
        
        savedAddressInfo.innerHTML = `
            <p><strong>Nama:</strong> ${savedAddress.name}</p>
            <p><strong>Telepon:</strong> ${savedAddress.phone}</p>
            <p><strong>Email:</strong> ${savedAddress.email}</p>
            <p><strong>Alamat:</strong> ${savedAddress.address}</p>
            <p><strong>Kecamatan:</strong> ${savedAddress.district}</p>
            <p><strong>Kota:</strong> ${savedAddress.city}, ${savedAddress.province} ${savedAddress.postalCode}</p>
            ${savedAddress.notes ? `<p><strong>Catatan:</strong> ${savedAddress.notes}</p>` : ''}
        `;
        
        // Fill form with saved data
        fillFormWithSavedAddress();
    }
}

// Fill form with saved address
function fillFormWithSavedAddress() {
    if (!savedAddress) return;
    
    document.getElementById('name').value = savedAddress.name || '';
    document.getElementById('phone').value = savedAddress.phone || '';
    document.getElementById('email').value = savedAddress.email || '';
    document.getElementById('address').value = savedAddress.address || '';
    document.getElementById('district').value = savedAddress.district || '';
    document.getElementById('city').value = savedAddress.city || '';
    document.getElementById('province').value = savedAddress.province || '';
    document.getElementById('postalCode').value = savedAddress.postalCode || '';
    document.getElementById('notes').value = savedAddress.notes || '';
}

// Initialize form handlers
function initializeFormHandlers() {
    // Use saved address button
    const btnUseSaved = document.getElementById('btnUseSaved');
    if (btnUseSaved) {
        btnUseSaved.addEventListener('click', function() {
            document.getElementById('savedAddressSection').style.display = 'none';
            document.getElementById('contactSection').style.display = 'block';
            fillFormWithSavedAddress();
        });
    }
    
    // Edit address button
    const btnEditAddress = document.getElementById('btnEditAddress');
    if (btnEditAddress) {
        btnEditAddress.addEventListener('click', function() {
            document.getElementById('savedAddressSection').style.display = 'none';
            document.getElementById('contactSection').style.display = 'block';
            fillFormWithSavedAddress();
        });
    }
    
    // New address button
    const btnNewAddress = document.getElementById('btnNewAddress');
    if (btnNewAddress) {
        btnNewAddress.addEventListener('click', function() {
            document.getElementById('savedAddressSection').style.display = 'none';
            document.getElementById('contactSection').style.display = 'block';
            clearForm();
        });
    }
    
    // Submit buttons
    document.getElementById('btnSubmit').addEventListener('click', handleCheckout);
    document.getElementById('btnSubmitMobile').addEventListener('click', handleCheckout);
    
    // Save address checkbox
    document.getElementById('saveAddress').addEventListener('change', function(e) {
        if (e.target.checked) {
            showNotification('Alamat akan disimpan setelah checkout berhasil', 'info');
        }
    });
}

// Handle checkout
function handleCheckout(e) {
    e.preventDefault();
    
    // Validate cart
    if (cartItems.length === 0) {
        showNotification('Keranjang Anda kosong!', 'error');
        return;
    }
    
    // Get form data
    const formData = {
        name: document.getElementById('name').value.trim(),
        phone: document.getElementById('phone').value.trim(),
        email: document.getElementById('email').value.trim(),
        address: document.getElementById('address').value.trim(),
        district: document.getElementById('district').value.trim(),
        city: document.getElementById('city').value.trim(),
        province: document.getElementById('province').value.trim(),
        postalCode: document.getElementById('postalCode').value.trim(),
        notes: document.getElementById('notes').value.trim(),
        paymentMethod: document.querySelector('input[name="payment"]:checked').value,
        orderNotes: document.getElementById('orderNotes').value.trim(),
        agreeTerms: document.getElementById('agreeTerms').checked
    };
    
    // Validate required fields
    if (!formData.name || !formData.phone || !formData.email || 
        !formData.address || !formData.district || !formData.city || 
        !formData.province || !formData.postalCode) {
        showNotification('Mohon lengkapi semua field yang wajib diisi!', 'error');
        return;
    }
    
    // Validate email
    if (!isValidEmail(formData.email)) {
        showNotification('Format email tidak valid!', 'error');
        return;
    }
    
    // Validate phone
    if (!isValidPhone(formData.phone)) {
        showNotification('Format nomor telepon tidak valid!', 'error');
        return;
    }
    
    // Validate terms
    if (!formData.agreeTerms) {
        showNotification('Anda harus menyetujui Syarat & Ketentuan!', 'error');
        return;
    }
    
    // Save address if checkbox is checked
    if (document.getElementById('saveAddress').checked) {
        const addressToSave = {
            name: formData.name,
            phone: formData.phone,
            email: formData.email,
            address: formData.address,
            district: formData.district,
            city: formData.city,
            province: formData.province,
            postalCode: formData.postalCode,
            notes: formData.notes
        };
        localStorage.setItem('savedAddress', JSON.stringify(addressToSave));
    }
    
    // Calculate totals
    const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const shipping = 10000;
    const total = subtotal + shipping;
    
    // Create order
    const order = {
        orderNumber: generateOrderNumber(),
        date: new Date().toISOString(),
        items: cartItems,
        customer: {
            name: formData.name,
            phone: formData.phone,
            email: formData.email
        },
        shipping: {
            address: formData.address,
            district: formData.district,
            city: formData.city,
            province: formData.province,
            postalCode: formData.postalCode,
            notes: formData.notes
        },
        payment: {
            method: formData.paymentMethod,
            subtotal: subtotal,
            shipping: shipping,
            total: total
        },
        orderNotes: formData.orderNotes,
        status: 'pending'
    };
    
    // Save order to localStorage
    let orders = JSON.parse(localStorage.getItem('orders')) || [];
    orders.push(order);
    localStorage.setItem('orders', JSON.stringify(orders));
    
    // Clear cart
    localStorage.removeItem('cart');
    
    // Show loading
    showLoading();
    
    // Simulate payment process
    setTimeout(() => {
        hideLoading();
        // Redirect to success page
        window.location.href = `order-success.html?order=${order.orderNumber}`;
    }, 2000);
}

// Generate order number
function generateOrderNumber() {
    const timestamp = Date.now();
    const random = Math.floor(Math.random() * 1000);
    return `BCK${timestamp}${random}`;
}

// Clear form
function clearForm() {
    document.getElementById('name').value = '';
    document.getElementById('phone').value = '';
    document.getElementById('email').value = '';
    document.getElementById('address').value = '';
    document.getElementById('district').value = '';
    document.getElementById('city').value = '';
    document.getElementById('province').value = '';
    document.getElementById('postalCode').value = '';
    document.getElementById('notes').value = '';
    document.getElementById('orderNotes').value = '';
    document.getElementById('saveAddress').checked = false;
}

// Validation functions
function isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function isValidPhone(phone) {
    return /^[0-9]{10,13}$/.test(phone.replace(/[\s-]/g, ''));
}

// Format price
function formatPrice(price) {
    return 'Rp ' + price.toLocaleString('id-ID');
}

// Update cart badge
function updateCartBadge() {
    const cartBadge = document.querySelector('.cart-badge');
    if (cartBadge) {
        cartBadge.textContent = cartItems.length;
    }
}

// Show notification
function showNotification(message, type = 'info') {
    // Remove existing notification
    const existingNotif = document.querySelector('.notification');
    if (existingNotif) {
        existingNotif.remove();
    }
    
    // Create notification
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    
    let icon = 'fa-info-circle';
    let bgColor = '#3b82f6';
    
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
    `;
    
    const iconElement = notification.querySelector('i');
    iconElement.style.color = bgColor;
    iconElement.style.fontSize = '1.5rem';
    
    const textElement = notification.querySelector('span');
    textElement.style.color = '#1f2937';
    textElement.style.fontWeight = '500';
    
    document.body.appendChild(notification);
    
    // Auto remove after 3 seconds
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease-out';
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, 3000);
}

// Show loading
function showLoading() {
    const loading = document.createElement('div');
    loading.className = 'loading-overlay';
    loading.innerHTML = `
        <div class="loading-spinner">
            <div class="spinner"></div>
            <p>Memproses pesanan Anda...</p>
        </div>
    `;
    
    loading.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: rgba(0,0,0,0.7);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 10000;
    `;
    
    const spinner = loading.querySelector('.loading-spinner');
    spinner.style.cssText = `
        text-align: center;
        color: white;
    `;
    
    document.body.appendChild(loading);
}

// Hide loading
function hideLoading() {
    const loading = document.querySelector('.loading-overlay');
    if (loading) {
        loading.remove();
    }
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
    
    @keyframes spin {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
    }
    
    .spinner {
        border: 4px solid rgba(255,255,255,0.3);
        border-top: 4px solid white;
        border-radius: 50%;
        width: 50px;
        height: 50px;
        animation: spin 1s linear infinite;
        margin: 0 auto 1rem;
    }
`;
document.head.appendChild(style);
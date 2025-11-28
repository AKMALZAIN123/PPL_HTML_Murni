// Mobile Menu Toggle
const mobileMenuBtn = document.getElementById('mobileMenuBtn');
const navLinks = document.getElementById('navLinks');

if (mobileMenuBtn) {
    mobileMenuBtn.addEventListener('click', () => {
        navLinks.classList.toggle('active');
    });
}

// Sample Products Data (from products page)
const sampleProducts = [
    {
        id: 1,
        name: 'Banner X Premium',
        price: 125000,
        image: 'https://images.unsplash.com/photo-1611329857570-f02f340e7378?w=400',
        variant: 'Ukuran 160x60cm',
        quantity: 2,
        stock: 50
    },
    {
        id: 2,
        name: 'Kartu Undangan Custom',
        price: 299000,
        image: 'https://images.unsplash.com/photo-1530435460869-d13625c69bbf?w=400',
        variant: 'Cetak 100 pcs',
        quantity: 1,
        stock: 100
    },
    {
        id: 3,
        name: 'Lanyard Custom Logo',
        price: 15000,
        image: 'https://images.unsplash.com/photo-1584464491033-06628f3a6b7b?w=400',
        variant: 'Print Sublim',
        quantity: 50,
        stock: 500
    }
];

// Initialize cart with sample products
let cart = [...sampleProducts];

// Constants
const SHIPPING_COST = 15000;

// DOM Elements
const cartItemsContainer = document.getElementById('cartItemsContainer');
const emptyCart = document.getElementById('emptyCart');
const orderSummary = document.getElementById('orderSummary');
const cartCount = document.getElementById('cartCount');
const cartBadge = document.getElementById('cartBadge');
const summaryItemCount = document.getElementById('summaryItemCount');
const summarySubtotal = document.getElementById('summarySubtotal');
const summaryShipping = document.getElementById('summaryShipping');
const summaryTotal = document.getElementById('summaryTotal');
const btnCheckout = document.getElementById('btnCheckout');

// Modal
const deleteModal = document.getElementById('deleteModal');
const btnCancelDelete = document.getElementById('btnCancelDelete');
const btnConfirmDelete = document.getElementById('btnConfirmDelete');
const modalOverlay = deleteModal ? deleteModal.querySelector('.modal-overlay') : null;
let itemToDelete = null;

// Format currency
function formatPrice(price) {
    return new Intl.NumberFormat('id-ID', {
        style: 'currency',
        currency: 'IDR',
        minimumFractionDigits: 0
    }).format(price);
}

// Calculate totals
function calculateTotals() {
    const subtotal = cart.reduce((total, item) => total + (item.price * item.quantity), 0);
    const shipping = cart.length > 0 ? SHIPPING_COST : 0;
    const total = subtotal + shipping;
    
    return { subtotal, shipping, total };
}

// Update summary
function updateSummary() {
    const { subtotal, shipping, total } = calculateTotals();
    const itemCount = cart.reduce((count, item) => count + item.quantity, 0);
    
    summaryItemCount.textContent = `(${itemCount} produk)`;
    summarySubtotal.textContent = formatPrice(subtotal);
    summaryShipping.textContent = formatPrice(shipping);
    summaryTotal.textContent = formatPrice(total);
}

// Update cart count
function updateCartCount() {
    const itemCount = cart.reduce((count, item) => count + item.quantity, 0);
    cartCount.textContent = `${itemCount} produk`;
    cartBadge.textContent = itemCount;
}

// Save to localStorage
function saveCart() {
    localStorage.setItem('cart', JSON.stringify(cart));
    localStorage.setItem('cartCount', cart.reduce((count, item) => count + item.quantity, 0));
}

// Create cart item HTML
function createCartItemHTML(item, index) {
    return `
        <div class="cart-item">
            <div class="item-image">
                <img src="${item.image}" alt="${item.name}">
            </div>
            <div class="item-details">
                <div class="item-header">
                    <div class="item-info">
                        <h3>${item.name}</h3>
                        <div class="item-variant">${item.variant}</div>
                    </div>
                    <button class="item-delete" data-index="${index}">
                        <i class="fas fa-trash"></i>
                    </button>
                </div>
                <div class="item-price">${formatPrice(item.price)}</div>
                <div class="item-footer">
                    <div class="quantity-selector">
                        <button class="qty-btn qty-minus" data-index="${index}" ${item.quantity <= 1 ? 'disabled' : ''}>
                            <i class="fas fa-minus"></i>
                        </button>
                        <input 
                            type="number" 
                            class="qty-input" 
                            value="${item.quantity}" 
                            min="1" 
                            max="${item.stock}" 
                            data-index="${index}"
                            readonly
                        >
                        <button class="qty-btn qty-plus" data-index="${index}" ${item.quantity >= item.stock ? 'disabled' : ''}>
                            <i class="fas fa-plus"></i>
                        </button>
                    </div>
                    <div class="item-subtotal">
                        <span class="item-subtotal-label">Subtotal</span>
                        <span class="item-subtotal-value">${formatPrice(item.price * item.quantity)}</span>
                    </div>
                </div>
            </div>
        </div>
    `;
}

// Render cart
function renderCart() {
    if (cart.length === 0) {
        emptyCart.style.display = 'flex';
        orderSummary.style.display = 'none';
        cartItemsContainer.innerHTML = '';
    } else {
        emptyCart.style.display = 'none';
        orderSummary.style.display = 'block';
        
        cartItemsContainer.innerHTML = cart.map((item, index) => 
            createCartItemHTML(item, index)
        ).join('');
        
        // Attach event listeners
        attachEventListeners();
    }
    
    updateCartCount();
    updateSummary();
    saveCart();
}

// Attach event listeners to cart items
function attachEventListeners() {
    // Delete buttons
    document.querySelectorAll('.item-delete').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const index = parseInt(e.currentTarget.dataset.index);
            showDeleteModal(index);
        });
    });
    
    // Minus buttons
    document.querySelectorAll('.qty-minus').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const index = parseInt(e.currentTarget.dataset.index);
            decreaseQuantity(index);
        });
    });
    
    // Plus buttons
    document.querySelectorAll('.qty-plus').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const index = parseInt(e.currentTarget.dataset.index);
            increaseQuantity(index);
        });
    });
}

// Increase quantity
function increaseQuantity(index) {
    if (cart[index].quantity < cart[index].stock) {
        cart[index].quantity++;
        renderCart();
        showNotification('Jumlah produk ditambahkan', 'success');
    } else {
        showNotification('Stok tidak mencukupi', 'error');
    }
}

// Decrease quantity
function decreaseQuantity(index) {
    if (cart[index].quantity > 1) {
        cart[index].quantity--;
        renderCart();
        showNotification('Jumlah produk dikurangi', 'success');
    }
}

// Show delete modal
function showDeleteModal(index) {
    itemToDelete = index;
    deleteModal.classList.add('active');
}

// Hide delete modal
function hideDeleteModal() {
    deleteModal.classList.remove('active');
    itemToDelete = null;
}

// Delete item
function deleteItem() {
    if (itemToDelete !== null) {
        const deletedItem = cart[itemToDelete];
        cart.splice(itemToDelete, 1);
        renderCart();
        hideDeleteModal();
        showNotification(`${deletedItem.name} dihapus dari keranjang`, 'success');
    }
}

// Checkout
btnCheckout.addEventListener('click', () => {
    if (cart.length === 0) {
        showNotification('Keranjang masih kosong', 'error');
        return;
    }
    
    const { total } = calculateTotals();
    
    // Save checkout data
    const checkoutData = {
        items: cart,
        ...calculateTotals()
    };
    
    localStorage.setItem('checkoutData', JSON.stringify(checkoutData));
    
    // Show success message and redirect
    showNotification('Mengarahkan ke halaman pembayaran...', 'success');
    
    setTimeout(() => {
        window.location.href = 'checkout.html';
    }, 1000);
});

// Modal events
if (btnCancelDelete) {
    btnCancelDelete.addEventListener('click', hideDeleteModal);
}

if (btnConfirmDelete) {
    btnConfirmDelete.addEventListener('click', deleteItem);
}

if (modalOverlay) {
    modalOverlay.addEventListener('click', hideDeleteModal);
}

// Notification function
function showNotification(message, type = 'info') {
    const existingNotif = document.querySelector('.notification');
    if (existingNotif) existingNotif.remove();
    
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
        setTimeout(() => notification.remove(), 300);
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
    renderCart();
    console.log('Cart loaded with sample products');
});
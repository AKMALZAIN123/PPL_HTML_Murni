// Mobile Menu Toggle
const mobileMenuBtn = document.getElementById('mobileMenuBtn');
const navLinks = document.getElementById('navLinks');

if (mobileMenuBtn) {
    mobileMenuBtn.addEventListener('click', () => {
        navLinks.classList.toggle('active');
    });
}

// Search Bar Toggle
const searchToggle = document.querySelector('.search-toggle');
const searchBarWrapper = document.getElementById('searchBarWrapper');
const searchClose = document.getElementById('searchClose');
const searchInput = document.getElementById('searchInput');

searchToggle.addEventListener('click', () => {
    searchBarWrapper.classList.add('active');
    searchInput.focus();
});

searchClose.addEventListener('click', () => {
    searchBarWrapper.classList.remove('active');
    searchInput.value = '';
});

// Search functionality
searchInput.addEventListener('input', (e) => {
    const searchTerm = e.target.value.toLowerCase();
    const productCards = document.querySelectorAll('.product-card');
    
    productCards.forEach(card => {
        const productName = card.querySelector('h3').textContent.toLowerCase();
        const productCategory = card.querySelector('.product-category').textContent.toLowerCase();
        
        if (productName.includes(searchTerm) || productCategory.includes(searchTerm)) {
            card.style.display = 'block';
        } else {
            card.style.display = 'none';
        }
    });
});

// Sort Select
const sortSelect = document.getElementById('sortSelect');
sortSelect.addEventListener('change', (e) => {
    const sortValue = e.target.value;
    showNotification(`Produk diurutkan berdasarkan: ${e.target.options[e.target.selectedIndex].text}`);
});

// Wishlist Toggle
const wishlistBtns = document.querySelectorAll('.wishlist-btn');
wishlistBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
        e.stopPropagation();
        btn.classList.toggle('active');
        const icon = btn.querySelector('i');
        if (btn.classList.contains('active')) {
            icon.classList.remove('far');
            icon.classList.add('fas');
            showNotification('Ditambahkan ke wishlist', 'success');
        } else {
            icon.classList.remove('fas');
            icon.classList.add('far');
            showNotification('Dihapus dari wishlist');
        }
    });
});

// Add to Cart
const addToCartBtns = document.querySelectorAll('.btn-add-cart');
const cartBadge = document.querySelector('.cart-badge');
let cartCount = parseInt(cartBadge.textContent) || 0;

addToCartBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
        e.stopPropagation();
        cartCount++;
        cartBadge.textContent = cartCount;
        
        // Save to localStorage
        localStorage.setItem('cartCount', cartCount);
        
        // Visual feedback
        btn.style.transform = 'scale(0.9)';
        setTimeout(() => {
            btn.style.transform = 'scale(1.1)';
        }, 100);
        setTimeout(() => {
            btn.style.transform = 'scale(1)';
        }, 200);
        
        showNotification('Produk ditambahkan ke keranjang!', 'success');
    });
});

// Quick View
const quickViewBtns = document.querySelectorAll('.btn-quick-view');
quickViewBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
        e.stopPropagation();
        
        const productCard = btn.closest('.product-card');
        const productId = productCard.getAttribute('data-product-id');
        
        // Navigate to product detail
        window.location.href = `detail.html?id=${productId}`;
    });
});

// Product Card Click (Navigate to detail)
const productCards = document.querySelectorAll('.product-card');
productCards.forEach(card => {
    card.addEventListener('click', (e) => {
        // Don't redirect if clicking buttons
        if (e.target.closest('.wishlist-btn') || 
            e.target.closest('.btn-add-cart') ||
            e.target.closest('.btn-quick-view')) {
            return;
        }
        
        const productId = card.getAttribute('data-product-id');
        window.location.href = `detail.html?id=${productId}`;
    });
});

// Pagination
const pageBtns = document.querySelectorAll('.page-btn');
pageBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        if (!btn.disabled && !btn.querySelector('i')) {
            pageBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            
            // Scroll to top
            window.scrollTo({ top: 0, behavior: 'smooth' });
            
            const pageNumber = btn.textContent;
            console.log('Loading page:', pageNumber);
        }
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

// Load cart count on page load
window.addEventListener('load', () => {
    const savedCartCount = localStorage.getItem('cartCount');
    if (savedCartCount) {
        cartCount = parseInt(savedCartCount);
        cartBadge.textContent = cartCount;
    }
    
    console.log('Products page loaded successfully');
});
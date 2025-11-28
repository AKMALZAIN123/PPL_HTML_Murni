// Mobile Menu Toggle
const mobileMenuBtn = document.getElementById('mobileMenuBtn');
const navLinks = document.getElementById('navLinks');

if (mobileMenuBtn) {
    mobileMenuBtn.addEventListener('click', () => {
        navLinks.classList.toggle('active');
    });
}

// Load cart count from localStorage
window.addEventListener('load', () => {
    const cartBadge = document.querySelector('.cart-badge');
    const savedCart = localStorage.getItem('cart');
    
    if (savedCart && cartBadge) {
        const cart = JSON.parse(savedCart);
        const itemCount = cart.reduce((total, item) => total + item.quantity, 0);
        cartBadge.textContent = itemCount;
    }
    
    console.log('Contact page loaded successfully');
});
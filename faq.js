// Mobile Menu Toggle
const mobileMenuBtn = document.getElementById('mobileMenuBtn');
const navLinks = document.getElementById('navLinks');

if (mobileMenuBtn) {
    mobileMenuBtn.addEventListener('click', () => {
        navLinks.classList.toggle('active');
    });
}

// FAQ Accordion
const faqItems = document.querySelectorAll('.faq-item');

faqItems.forEach(item => {
    const question = item.querySelector('.faq-question');
    
    question.addEventListener('click', () => {
        // Close other items
        const wasActive = item.classList.contains('active');
        
        faqItems.forEach(otherItem => {
            if (otherItem !== item) {
                otherItem.classList.remove('active');
            }
        });
        
        // Toggle current item
        if (wasActive) {
            item.classList.remove('active');
        } else {
            item.classList.add('active');
        }
    });
});

// Category Filter
const tabBtns = document.querySelectorAll('.tab-btn');

tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        // Remove active from all tabs
        tabBtns.forEach(tab => tab.classList.remove('active'));
        
        // Add active to clicked tab
        btn.classList.add('active');
        
        // Get category
        const category = btn.getAttribute('data-category');
        
        // Filter FAQ items
        filterFAQ(category);
    });
});

function filterFAQ(category) {
    faqItems.forEach(item => {
        const itemCategory = item.getAttribute('data-category');
        
        if (category === 'all' || itemCategory === category) {
            item.classList.remove('hidden');
        } else {
            item.classList.add('hidden');
            item.classList.remove('active');
        }
    });
}

// Search Functionality
const searchInput = document.getElementById('faqSearch');

searchInput.addEventListener('input', (e) => {
    const searchTerm = e.target.value.toLowerCase().trim();
    
    if (searchTerm === '') {
        // Show all items if search is empty
        faqItems.forEach(item => {
            item.classList.remove('hidden');
        });
        
        // Reset category filter
        const activeTab = document.querySelector('.tab-btn.active');
        const category = activeTab.getAttribute('data-category');
        filterFAQ(category);
        return;
    }
    
    // Search in questions and answers
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question h3').textContent.toLowerCase();
        const answer = item.querySelector('.faq-answer').textContent.toLowerCase();
        
        if (question.includes(searchTerm) || answer.includes(searchTerm)) {
            item.classList.remove('hidden');
            
            // Auto-expand if matches
            if (question.includes(searchTerm)) {
                item.classList.add('active');
            }
        } else {
            item.classList.add('hidden');
            item.classList.remove('active');
        }
    });
    
    // If searching, show "All" category
    if (searchTerm) {
        tabBtns.forEach(tab => {
            if (tab.getAttribute('data-category') === 'all') {
                tab.classList.add('active');
            } else {
                tab.classList.remove('active');
            }
        });
    }
});

// Highlight search term (optional enhancement)
function highlightSearchTerm(text, term) {
    if (!term) return text;
    
    const regex = new RegExp(`(${term})`, 'gi');
    return text.replace(regex, '<mark>$1</mark>');
}

// Load cart count from localStorage
window.addEventListener('load', () => {
    const cartBadge = document.querySelector('.cart-badge');
    const savedCartCount = localStorage.getItem('cartCount');
    
    if (savedCartCount && cartBadge) {
        cartBadge.textContent = savedCartCount;
    }
    
    console.log('FAQ page loaded');
});
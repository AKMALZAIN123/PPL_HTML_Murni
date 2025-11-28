// Mobile Menu Toggle
const mobileMenuBtn = document.getElementById('mobileMenuBtn');
const navLinks = document.getElementById('navLinks');

if (mobileMenuBtn) {
    mobileMenuBtn.addEventListener('click', () => {
        navLinks.classList.toggle('active');
    });
}

// Toggle Password Visibility
const togglePassword = document.getElementById('togglePassword');
const passwordInput = document.getElementById('password');

togglePassword.addEventListener('click', () => {
    const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
    passwordInput.setAttribute('type', type);
    
    const icon = togglePassword.querySelector('i');
    if (type === 'text') {
        icon.classList.remove('fa-eye');
        icon.classList.add('fa-eye-slash');
    } else {
        icon.classList.remove('fa-eye-slash');
        icon.classList.add('fa-eye');
    }
});

// Form Validation
const loginForm = document.getElementById('loginForm');
const emailInput = document.getElementById('email');
const emailError = document.getElementById('emailError');
const passwordError = document.getElementById('passwordError');
const loginBtn = document.getElementById('loginBtn');

// Email Validation
function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

// Real-time Email Validation
emailInput.addEventListener('blur', () => {
    if (!emailInput.value) {
        showError(emailInput, emailError, 'Email tidak boleh kosong');
    } else if (!validateEmail(emailInput.value)) {
        showError(emailInput, emailError, 'Format email tidak valid');
    } else {
        clearError(emailInput, emailError);
    }
});

// Real-time Password Validation
passwordInput.addEventListener('blur', () => {
    if (!passwordInput.value) {
        showError(passwordInput, passwordError, 'Password tidak boleh kosong');
    } else if (passwordInput.value.length < 6) {
        showError(passwordInput, passwordError, 'Password minimal 6 karakter');
    } else {
        clearError(passwordInput, passwordError);
    }
});

// Show Error
function showError(input, errorElement, message) {
    input.parentElement.classList.add('error');
    errorElement.textContent = message;
    errorElement.classList.add('show');
}

// Clear Error
function clearError(input, errorElement) {
    input.parentElement.classList.remove('error');
    errorElement.textContent = '';
    errorElement.classList.remove('show');
}

// Form Submit
loginForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    // Clear previous errors
    clearError(emailInput, emailError);
    clearError(passwordInput, passwordError);
    
    // Validate
    let isValid = true;
    
    if (!emailInput.value) {
        showError(emailInput, emailError, 'Email tidak boleh kosong');
        isValid = false;
    } else if (!validateEmail(emailInput.value)) {
        showError(emailInput, emailError, 'Format email tidak valid');
        isValid = false;
    }
    
    if (!passwordInput.value) {
        showError(passwordInput, passwordError, 'Password tidak boleh kosong');
        isValid = false;
    } else if (passwordInput.value.length < 6) {
        showError(passwordInput, passwordError, 'Password minimal 6 karakter');
        isValid = false;
    }
    
    if (!isValid) return;
    
    // Show loading
    const btnText = loginBtn.querySelector('.btn-text');
    const btnLoader = loginBtn.querySelector('.btn-loader');
    btnText.style.display = 'none';
    btnLoader.style.display = 'inline-block';
    loginBtn.disabled = true;
    
    // Simulate API call (replace with real API)
    try {
        const response = await mockLogin(emailInput.value, passwordInput.value);
        
        if (response.success) {
            // Save token/user data
            localStorage.setItem('user', JSON.stringify(response.user));
            localStorage.setItem('token', response.token);
            
            // Show success notification
            showNotification('Login berhasil! Mengalihkan...', 'success');
            
            // Redirect after 1 second
            setTimeout(() => {
                window.location.href = 'index.html';
            }, 1000);
        } else {
            throw new Error(response.message);
        }
    } catch (error) {
        // Show error
        showNotification(error.message || 'Login gagal. Silakan coba lagi.', 'error');
        
        // Reset button
        btnText.style.display = 'inline-block';
        btnLoader.style.display = 'none';
        loginBtn.disabled = false;
    }
});

// Mock Login API (Replace with real API call)
async function mockLogin(email, password) {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // Demo account
    if (email === 'email@demo.com' && password === 'demo123') {
        return {
            success: true,
            token: 'demo-token-' + Date.now(),
            user: {
                id: 1,
                name: 'Demo User',
                email: email
            }
        };
    }
    
    // Failed login
    return {
        success: false,
        message: 'Email atau password salah'
    };
}

/* 
REAL API INTEGRATION EXAMPLE:
Replace mockLogin with real API call:

async function loginAPI(email, password) {
    const response = await fetch('https://your-api.com/auth/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password })
    });
    
    if (!response.ok) {
        throw new Error('Login gagal');
    }
    
    return await response.json();
}
*/

// Social Login Handlers
const googleBtn = document.querySelector('.google-btn');
const facebookBtn = document.querySelector('.facebook-btn');

googleBtn.addEventListener('click', () => {
    showNotification('Fitur login dengan Google akan segera hadir!', 'info');
    // TODO: Implement Google OAuth
});

facebookBtn.addEventListener('click', () => {
    showNotification('Fitur login dengan Facebook akan segera hadir!', 'info');
    // TODO: Implement Facebook OAuth
});

// Notification Function
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
    
    // Add styles
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
    
    const notifIcon = notification.querySelector('i');
    notifIcon.style.color = bgColor;
    notifIcon.style.fontSize = '1.5rem';
    
    const notifText = notification.querySelector('span');
    notifText.style.color = '#1f2937';
    notifText.style.fontWeight = '500';
    
    document.body.appendChild(notification);
    
    // Auto remove after 3 seconds
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

// Check if user already logged in
window.addEventListener('load', () => {
    const user = localStorage.getItem('user');
    if (user) {
        // User already logged in, redirect to homepage or account page
        // Uncomment if you want auto redirect
        // window.location.href = 'index.html';
    }
});
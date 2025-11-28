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
const toggleConfirmPassword = document.getElementById('toggleConfirmPassword');
const confirmPasswordInput = document.getElementById('confirmPassword');

togglePassword.addEventListener('click', () => {
    togglePasswordVisibility(passwordInput, togglePassword);
});

toggleConfirmPassword.addEventListener('click', () => {
    togglePasswordVisibility(confirmPasswordInput, toggleConfirmPassword);
});

function togglePasswordVisibility(input, button) {
    const type = input.getAttribute('type') === 'password' ? 'text' : 'password';
    input.setAttribute('type', type);
    
    const icon = button.querySelector('i');
    if (type === 'text') {
        icon.classList.remove('fa-eye');
        icon.classList.add('fa-eye-slash');
    } else {
        icon.classList.remove('fa-eye-slash');
        icon.classList.add('fa-eye');
    }
}

// Form Elements
const registerForm = document.getElementById('registerForm');
const fullNameInput = document.getElementById('fullName');
const emailInput = document.getElementById('email');
const phoneInput = document.getElementById('phone');
const agreeTermsInput = document.getElementById('agreeTerms');

// Error Elements
const nameError = document.getElementById('nameError');
const emailError = document.getElementById('emailError');
const phoneError = document.getElementById('phoneError');
const passwordError = document.getElementById('passwordError');
const confirmPasswordError = document.getElementById('confirmPasswordError');
const termsError = document.getElementById('termsError');

// Validation Functions
function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

function validatePhone(phone) {
    const re = /^(\+62|62|0)[0-9]{9,12}$/;
    return re.test(phone.replace(/\s/g, ''));
}

function checkPasswordStrength(password) {
    const strengthIndicator = document.getElementById('passwordStrength');
    const strengthFill = strengthIndicator.querySelector('.strength-fill');
    const strengthText = strengthIndicator.querySelector('.strength-text');
    
    if (!password) {
        strengthIndicator.classList.remove('show');
        return;
    }
    
    strengthIndicator.classList.add('show');
    
    let strength = 0;
    
    // Check length
    if (password.length >= 6) strength++;
    if (password.length >= 10) strength++;
    
    // Check for mixed case
    if (/[a-z]/.test(password) && /[A-Z]/.test(password)) strength++;
    
    // Check for numbers
    if (/\d/.test(password)) strength++;
    
    // Check for special characters
    if (/[^a-zA-Z\d]/.test(password)) strength++;
    
    // Update UI
    strengthFill.className = 'strength-fill';
    strengthText.className = 'strength-text';
    
    if (strength <= 2) {
        strengthFill.classList.add('weak');
        strengthText.classList.add('weak');
        strengthText.textContent = 'Lemah';
    } else if (strength <= 4) {
        strengthFill.classList.add('medium');
        strengthText.classList.add('medium');
        strengthText.textContent = 'Sedang';
    } else {
        strengthFill.classList.add('strong');
        strengthText.classList.add('strong');
        strengthText.textContent = 'Kuat';
    }
}

// Real-time Validations
fullNameInput.addEventListener('blur', () => {
    if (!fullNameInput.value.trim()) {
        showError(fullNameInput, nameError, 'Nama lengkap tidak boleh kosong');
    } else if (fullNameInput.value.trim().length < 3) {
        showError(fullNameInput, nameError, 'Nama minimal 3 karakter');
    } else {
        clearError(fullNameInput, nameError);
    }
});

emailInput.addEventListener('blur', () => {
    if (!emailInput.value) {
        showError(emailInput, emailError, 'Email tidak boleh kosong');
    } else if (!validateEmail(emailInput.value)) {
        showError(emailInput, emailError, 'Format email tidak valid');
    } else {
        clearError(emailInput, emailError);
    }
});

phoneInput.addEventListener('blur', () => {
    if (!phoneInput.value) {
        showError(phoneInput, phoneError, 'Nomor telepon tidak boleh kosong');
    } else if (!validatePhone(phoneInput.value)) {
        showError(phoneInput, phoneError, 'Format nomor telepon tidak valid (contoh: 08123456789)');
    } else {
        clearError(phoneInput, phoneError);
    }
});

passwordInput.addEventListener('input', () => {
    checkPasswordStrength(passwordInput.value);
});

passwordInput.addEventListener('blur', () => {
    if (!passwordInput.value) {
        showError(passwordInput, passwordError, 'Password tidak boleh kosong');
    } else if (passwordInput.value.length < 6) {
        showError(passwordInput, passwordError, 'Password minimal 6 karakter');
    } else {
        clearError(passwordInput, passwordError);
    }
});
    
confirmPasswordInput.addEventListener('blur', () => {
    if (!confirmPasswordInput.value) {
        showError(confirmPasswordInput, confirmPasswordError, 'Konfirmasi password tidak boleh kosong');
    } else if (confirmPasswordInput.value !== passwordInput.value) {
        showError(confirmPasswordInput, confirmPasswordError, 'Password tidak cocok');
    } else {
        clearError(confirmPasswordInput, confirmPasswordError);
    }
});

// Show/Clear Error Functions
function showError(input, errorElement, message) {
    input.parentElement.classList.add('error');
    errorElement.textContent = message;
    errorElement.classList.add('show');
}

function clearError(input, errorElement) {
    input.parentElement.classList.remove('error');
    errorElement.textContent = '';
    errorElement.classList.remove('show');
}

// Form Submit
registerForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    // Clear all previous errors
    clearError(fullNameInput, nameError);
    clearError(emailInput, emailError);
    clearError(phoneInput, phoneError);
    clearError(passwordInput, passwordError);
    clearError(confirmPasswordInput, confirmPasswordError);
    termsError.classList.remove('show');
    
    // Validate all fields
    let isValid = true;
    
    // Name validation
    if (!fullNameInput.value.trim()) {
        showError(fullNameInput, nameError, 'Nama lengkap tidak boleh kosong');
        isValid = false;
    } else if (fullNameInput.value.trim().length < 3) {
        showError(fullNameInput, nameError, 'Nama minimal 3 karakter');
        isValid = false;
    }
    
    // Email validation
    if (!emailInput.value) {
        showError(emailInput, emailError, 'Email tidak boleh kosong');
        isValid = false;
    } else if (!validateEmail(emailInput.value)) {
        showError(emailInput, emailError, 'Format email tidak valid');
        isValid = false;
    }
    
    // Phone validation
    if (!phoneInput.value) {
        showError(phoneInput, phoneError, 'Nomor telepon tidak boleh kosong');
        isValid = false;
    } else if (!validatePhone(phoneInput.value)) {
        showError(phoneInput, phoneError, 'Format nomor telepon tidak valid');
        isValid = false;
    }
    
    // Password validation
    if (!passwordInput.value) {
        showError(passwordInput, passwordError, 'Password tidak boleh kosong');
        isValid = false;
    } else if (passwordInput.value.length < 6) {
        showError(passwordInput, passwordError, 'Password minimal 6 karakter');
        isValid = false;
    }
    
    // Confirm password validation
    if (!confirmPasswordInput.value) {
        showError(confirmPasswordInput, confirmPasswordError, 'Konfirmasi password tidak boleh kosong');
        isValid = false;
    } else if (confirmPasswordInput.value !== passwordInput.value) {
        showError(confirmPasswordInput, confirmPasswordError, 'Password tidak cocok');
        isValid = false;
    }
    
    // Terms validation
    if (!agreeTermsInput.checked) {
        termsError.textContent = 'Anda harus menyetujui syarat & ketentuan';
        termsError.classList.add('show');
        isValid = false;
    }
    
    if (!isValid) return;
    
    // Show loading
    const registerBtn = document.getElementById('registerBtn');
    const btnText = registerBtn.querySelector('.btn-text');
    const btnLoader = registerBtn.querySelector('.btn-loader');
    btnText.style.display = 'none';
    btnLoader.style.display = 'inline-block';
    registerBtn.disabled = true;
    
    // Prepare data
    const formData = {
        fullName: fullNameInput.value.trim(),
        email: emailInput.value.trim(),
        phone: phoneInput.value.trim(),
        password: passwordInput.value,
        newsletter: document.getElementById('newsletter').checked
    };
    
    // Simulate API call (replace with real API)
    try {
        const response = await mockRegister(formData);
        
        if (response.success) {
            // Show success notification
            showNotification('Pendaftaran berhasil! Silakan login.', 'success');
            
            // Redirect to login after 2 seconds
            setTimeout(() => {
                window.location.href = 'login.html';
            }, 2000);
        } else {
            throw new Error(response.message);
        }
    } catch (error) {
        // Show error
        showNotification(error.message || 'Pendaftaran gagal. Silakan coba lagi.', 'error');
        
        // Reset button
        btnText.style.display = 'inline-block';
        btnLoader.style.display = 'none';
        registerBtn.disabled = false;
    }
});

// Mock Register API (Replace with real API call)
async function mockRegister(data) {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Check if email already exists (simulation)
    const existingEmails = ['test@example.com', 'demo@demo.com'];
    if (existingEmails.includes(data.email)) {
        return {
            success: false,
            message: 'Email sudah terdaftar. Silakan gunakan email lain.'
        };
    }
    
    // Successful registration
    return {
        success: true,
        message: 'Pendaftaran berhasil!'
    };
}

/* 
REAL API INTEGRATION EXAMPLE:

async function registerAPI(data) {
    const response = await fetch('https://your-api.com/auth/register', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
    });
    
    if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Pendaftaran gagal');
    }
    
    return await response.json();
}
*/

// Social Register Handlers
const googleBtn = document.querySelector('.google-btn');
const facebookBtn = document.querySelector('.facebook-btn');

googleBtn.addEventListener('click', () => {
    showNotification('Fitur daftar dengan Google akan segera hadir!', 'info');
    // TODO: Implement Google OAuth
});

facebookBtn.addEventListener('click', () => {
    showNotification('Fitur daftar dengan Facebook akan segera hadir!', 'info');
    // TODO: Implement Facebook OAuth
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
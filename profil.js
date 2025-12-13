// ===== USER DATA =====
const userData = {
    name: 'John Doe',
    email: 'john.doe@example.com',
    phone: '081234567890',
    birthdate: '1990-01-01',
    company: 'PT. Example Indonesia'
};

const addresses = [
    {
        id: 1,
        name: 'Alamat Kantor',
        recipient: 'John Doe',
        phone: '081234567890',
        address: 'Jl. Sudirman No. 123, Gedung ABC Lt. 5',
        city: 'Jakarta Selatan',
        province: 'DKI Jakarta',
        postalCode: '12190',
        isPrimary: true
    },
    {
        id: 2,
        name: 'Alamat Rumah',
        recipient: 'John Doe',
        phone: '081234567890',
        address: 'Jl. Gatot Subroto No. 456',
        city: 'Jakarta Selatan',
        province: 'DKI Jakarta',
        postalCode: '12930',
        isPrimary: false
    }
];

// ===== INIT ON PAGE LOAD =====
document.addEventListener('DOMContentLoaded', function() {
    console.log('Page loaded, initializing...');
    loadUserData();
    renderAddresses();
});

// ===== SECTION SWITCHER =====
function switchSection(sectionName) {
    console.log('Switching to section:', sectionName);
    
    // Remove active from all nav items
    const navItems = document.querySelectorAll('.nav-item');
    navItems.forEach(item => {
        item.classList.remove('active');
    });
    
    // Add active to clicked nav item
    event.currentTarget.classList.add('active');
    
    // Hide all sections
    const sections = document.querySelectorAll('.content-section');
    sections.forEach(section => {
        section.classList.remove('active');
    });
    
    // Show selected section
    const targetSection = document.getElementById('section-' + sectionName);
    if (targetSection) {
        targetSection.classList.add('active');
        console.log('Section shown:', sectionName);
    } else {
        console.error('Section not found:', 'section-' + sectionName);
    }
}

// ===== LOAD USER DATA =====
function loadUserData() {
    document.getElementById('userName').textContent = userData.name;
    document.getElementById('userEmail').textContent = userData.email;
    document.getElementById('fullName').value = userData.name;
    document.getElementById('email').value = userData.email;
    document.getElementById('phone').value = userData.phone;
    document.getElementById('birthdate').value = userData.birthdate;
    document.getElementById('company').value = userData.company;
}

// ===== PROFILE FORM =====
function handleProfileSubmit(event) {
    event.preventDefault();
    
    userData.name = document.getElementById('fullName').value;
    userData.email = document.getElementById('email').value;
    userData.phone = document.getElementById('phone').value;
    userData.birthdate = document.getElementById('birthdate').value;
    userData.company = document.getElementById('company').value;
    
    // Update display name
    document.getElementById('userName').textContent = userData.name;
    
    showNotification('Profil berhasil diperbarui!', 'success');
}

function cancelEdit() {
    loadUserData();
    showNotification('Perubahan dibatalkan', 'info');
}

// ===== PASSWORD FORM =====
function handlePasswordSubmit(event) {
    event.preventDefault();
    
    const currentPassword = document.getElementById('currentPassword').value;
    const newPassword = document.getElementById('newPassword').value;
    const confirmPassword = document.getElementById('confirmPassword').value;
    
    if (newPassword !== confirmPassword) {
        showNotification('Password baru tidak cocok!', 'error');
        return;
    }
    
    if (newPassword.length < 8) {
        showNotification('Password minimal 8 karakter!', 'error');
        return;
    }
    
    // Reset form
    document.getElementById('passwordForm').reset();
    showNotification('Password berhasil diubah!', 'success');
}

// ===== ADDRESS MANAGEMENT =====
function renderAddresses() {
    const addressList = document.getElementById('addressList');
    
    if (addresses.length === 0) {
        addressList.innerHTML = `
            <div style="text-align: center; padding: 60px 20px; color: #64748b;">
                <i class="fas fa-map-marker-alt" style="font-size: 64px; margin-bottom: 20px; opacity: 0.2;"></i>
                <h3 style="margin-bottom: 8px; color: #1e293b;">Belum Ada Alamat</h3>
                <p>Tambahkan alamat pengiriman Anda</p>
            </div>
        `;
        return;
    }
    
    addressList.innerHTML = addresses.map(addr => `
        <div class="address-card ${addr.isPrimary ? 'primary' : ''}">
            <div class="address-info">
                <h4>
                    ${addr.name}
                    ${addr.isPrimary ? '<span class="address-badge">Utama</span>' : ''}
                </h4>
                <p><strong>${addr.recipient}</strong> | ${addr.phone}</p>
                <p>${addr.address}</p>
                <p>${addr.city}, ${addr.province} ${addr.postalCode}</p>
            </div>
            <div class="address-actions">
                <button class="btn-icon" onclick="editAddress(${addr.id})" title="Edit">
                    <i class="fas fa-edit"></i>
                </button>
                ${!addr.isPrimary ? `
                    <button class="btn-icon" onclick="setPrimaryAddress(${addr.id})" title="Jadikan Utama">
                        <i class="fas fa-star"></i>
                    </button>
                ` : ''}
                <button class="btn-icon delete" onclick="deleteAddress(${addr.id})" title="Hapus">
                    <i class="fas fa-trash"></i>
                </button>
            </div>
        </div>
    `).join('');
}

function addNewAddress() {
    showNotification('Fitur tambah alamat akan segera tersedia', 'info');
}

function editAddress(id) {
    showNotification('Edit alamat ID: ' + id, 'info');
}

function setPrimaryAddress(id) {
    addresses.forEach(addr => {
        addr.isPrimary = addr.id === id;
    });
    renderAddresses();
    showNotification('Alamat utama berhasil diubah', 'success');
}

function deleteAddress(id) {
    if (confirm('Yakin ingin menghapus alamat ini?')) {
        const index = addresses.findIndex(addr => addr.id === id);
        if (index > -1) {
            addresses.splice(index, 1);
            renderAddresses();
            showNotification('Alamat berhasil dihapus', 'success');
        }
    }
}

// ===== AVATAR =====
function changeAvatar() {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';
    
    input.onchange = function(e) {
        const file = e.target.files[0];
        if (!file) return;
        
        if (file.size > 2 * 1024 * 1024) {
            showNotification('Ukuran file maksimal 2MB', 'error');
            return;
        }
        
        const reader = new FileReader();
        reader.onload = function(e) {
            document.getElementById('avatarImage').src = e.target.result;
        };
        reader.readAsDataURL(file);
        
        showNotification('Foto profil berhasil diubah', 'success');
    };
    
    input.click();
}

// ===== LOGOUT =====
function handleLogout() {
    if (confirm('Yakin ingin keluar dari akun Anda?')) {
        showNotification('Berhasil keluar', 'success');
        setTimeout(function() {
            window.location.href = 'loginpage.html';
        }, 1000);
    }
}

// ===== NOTIFICATION =====
function showNotification(message, type) {
    const existing = document.querySelector('.toast-notification');
    if (existing) existing.remove();
    
    const colors = {
        success: '#10b981',
        error: '#ef4444',
        info: '#2563eb',
        warning: '#f59e0b'
    };
    
    const icons = {
        success: 'fa-check-circle',
        error: 'fa-exclamation-circle',
        info: 'fa-info-circle',
        warning: 'fa-exclamation-triangle'
    };
    
    const notification = document.createElement('div');
    notification.className = 'toast-notification';
    notification.innerHTML = `
        <i class="fas ${icons[type] || icons.info}" style="color: ${colors[type] || colors.info}; font-size: 20px;"></i>
        <span style="color: #1f2937; font-weight: 500;">${message}</span>
    `;
    
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 24px;
        background: white;
        padding: 16px 24px;
        border-radius: 12px;
        box-shadow: 0 10px 30px rgba(0,0,0,0.15);
        display: flex;
        align-items: center;
        gap: 12px;
        z-index: 9999;
        animation: slideIn 0.3s ease-out;
        border-left: 4px solid ${colors[type] || colors.info};
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(function() {
        notification.style.animation = 'slideOut 0.3s ease-out';
        setTimeout(function() {
            notification.remove();
        }, 300);
    }, 3000);
}

// ===== ANIMATIONS =====
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from { transform: translateX(400px); opacity: 0; }
        to { transform: translateX(0); opacity: 1; }
    }
    @keyframes slideOut {
        from { transform: translateX(0); opacity: 1; }
        to { transform: translateX(400px); opacity: 0; }
    }
`;
document.head.appendChild(style);
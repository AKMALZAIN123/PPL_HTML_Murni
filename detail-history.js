// ===== SAMPLE ORDER DATA =====
const orderData = {
    orderNumber: 'ORD-2024-001234',
    date: '10 Desember 2024, 14:30 WIB',
    status: 'onroad', // packaging, onroad, delivered
    items: [
        {
            name: 'Banner X Premium',
            specs: 'Ukuran 160x60cm, Material Premium',
            qty: 2,
            price: 125000,
            image: 'https://images.unsplash.com/photo-1611329857570-f02f340e7378?w=100'
        },
        {
            name: 'Kartu Undangan Custom',
            specs: 'Desain custom, cetak 100 pcs',
            qty: 1,
            price: 350000,
            image: 'https://images.unsplash.com/photo-1530435460869-d13625c69bbf?w=100'
        }
    ],
    shipping: {
        recipient: 'John Doe',
        phone: '081234567890',
        address: 'Jl. Sudirman No. 123, Gedung ABC Lt. 5, Jakarta Selatan, DKI Jakarta 12190'
    },
    payment: {
        subtotal: 600000,
        shippingCost: 0,
        total: 600000,
        method: 'Midtrans'
    },
    timeline: {
        packaging: '10 Des 2024, 15:00',
        onroad: '11 Des 2024, 09:00',
        delivered: null
    }
};

// ===== INIT =====
document.addEventListener('DOMContentLoaded', function() {
    loadOrderData();
    updateProgressTracker();
});

// ===== FORMAT CURRENCY =====
function formatCurrency(amount) {
    return new Intl.NumberFormat('id-ID', {
        style: 'currency',
        currency: 'IDR',
        minimumFractionDigits: 0
    }).format(amount);
}

// ===== LOAD ORDER DATA =====
function loadOrderData() {
    // Header
    document.getElementById('orderNumber').textContent = orderData.orderNumber;
    document.getElementById('orderDate').textContent = orderData.date;
    document.getElementById('orderTotal').textContent = formatCurrency(orderData.payment.total);

    // Items
    renderOrderItems();

    // Shipping Info
    document.getElementById('recipientName').textContent = orderData.shipping.recipient;
    document.getElementById('recipientPhone').textContent = orderData.shipping.phone;
    document.getElementById('recipientAddress').textContent = orderData.shipping.address;

    // Payment Summary
    document.getElementById('subtotal').textContent = formatCurrency(orderData.payment.subtotal);
    document.getElementById('shippingCost').textContent = orderData.payment.shippingCost === 0 ? 'Gratis' : formatCurrency(orderData.payment.shippingCost);
    document.getElementById('totalAmount').textContent = formatCurrency(orderData.payment.total);
}

// ===== RENDER ORDER ITEMS =====
function renderOrderItems() {
    const itemsList = document.getElementById('orderItemsList');
    
    itemsList.innerHTML = orderData.items.map(item => `
        <div class="item-row">
            <img src="${item.image}" alt="${item.name}" class="item-image">
            <div class="item-details">
                <div class="item-name">${item.name}</div>
                <div class="item-specs">${item.specs}</div>
            </div>
            <div class="item-price-info">
                <div class="item-qty">${item.qty}x</div>
                <div class="item-price">${formatCurrency(item.price * item.qty)}</div>
            </div>
        </div>
    `).join('');
}

// ===== UPDATE PROGRESS TRACKER =====
function updateProgressTracker() {
    const status = orderData.status;
    const timeline = orderData.timeline;

    // Reset all steps
    const allSteps = document.querySelectorAll('.progress-step');
    allSteps.forEach(step => {
        step.classList.remove('completed', 'active');
    });

    // Update based on current status
    if (status === 'packaging') {
        document.getElementById('step-packaging').classList.add('active');
        document.getElementById('packaging-date').textContent = timeline.packaging || 'Sedang diproses';
    } 
    else if (status === 'onroad') {
        document.getElementById('step-packaging').classList.add('completed');
        document.getElementById('step-onroad').classList.add('active');
        document.getElementById('packaging-date').textContent = timeline.packaging;
        document.getElementById('onroad-date').textContent = timeline.onroad || 'Sedang dalam pengiriman';
    } 
    else if (status === 'delivered') {
        document.getElementById('step-packaging').classList.add('completed');
        document.getElementById('step-onroad').classList.add('completed');
        document.getElementById('step-delivered').classList.add('completed');
        document.getElementById('packaging-date').textContent = timeline.packaging;
        document.getElementById('onroad-date').textContent = timeline.onroad;
        document.getElementById('delivered-date').textContent = timeline.delivered;
    }
}

// ===== HELP BUTTON =====
document.querySelector('.help-button')?.addEventListener('click', function() {
    alert('Hubungi Customer Service:\n\nWhatsApp: 0812-3456-7890\nEmail: support@bhinekacipta.com\nTelepon: (0281) 6572506');
});

// ===== FETCH FROM API (Optional) =====
async function fetchOrderDetail(orderNumber) {
    try {
        // const response = await fetch(`/api/orders/${orderNumber}`, {
        //     headers: {
        //         'Authorization': 'Bearer ' + localStorage.getItem('token')
        //     }
        // });
        // const data = await response.json();
        // return data;
        
        return orderData;
    } catch (error) {
        console.error('Error fetching order detail:', error);
        return null;
    }
}

// ===== GET ORDER NUMBER FROM URL (Optional) =====
function getOrderNumberFromURL() {
    const params = new URLSearchParams(window.location.search);
    return params.get('order') || 'ORD-2024-001234';
}
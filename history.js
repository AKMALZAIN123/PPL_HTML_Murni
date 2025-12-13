// ===== DATA SAMPLE =====
// Ganti dengan fetch dari API/Database
const sampleOrders = [
    {
        orderNumber: 'ORD-2024-001234',
        date: '2024-12-10 14:30',
        paymentStatus: 'paid',
        productionStatus: 'process',
        estimatedDays: '2-3 hari',
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
        total: 600000
    },
    {
        orderNumber: 'ORD-2024-001233',
        date: '2024-12-08 10:15',
        paymentStatus: 'pending',
        productionStatus: null,
        estimatedDays: null,
        items: [
            {
                name: 'Lanyard Custom Logo',
                specs: 'Print sublim, minimal order 50 pcs',
                qty: 50,
                price: 15000,
                image: 'https://images.unsplash.com/photo-1584464491033-06628f3a6b7b?w=100'
            }
        ],
        total: 750000
    },
    {
        orderNumber: 'ORD-2024-001232',
        date: '2024-12-05 16:45',
        paymentStatus: 'paid',
        productionStatus: 'process',
        estimatedDays: '1-2 hari',
        items: [
            {
                name: 'Roll Up Banner',
                specs: '85x200cm, portable dan praktis',
                qty: 3,
                price: 225000,
                image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=100'
            }
        ],
        total: 675000
    }
];

// ===== UTILITY FUNCTIONS =====
function formatCurrency(amount) {
    return new Intl.NumberFormat('id-ID', {
        style: 'currency',
        currency: 'IDR',
        minimumFractionDigits: 0
    }).format(amount);
}

function calculateSummary(orders) {
    return {
        pending: orders.filter(o => o.paymentStatus === 'pending').length,
        process: orders.filter(o => o.productionStatus === 'process').length,
        completed: orders.filter(o => o.paymentStatus === 'paid' && o.productionStatus !== 'process').length,
        total: orders.length
    };
}

// ===== RENDER FUNCTIONS =====
function renderSummary(orders) {
    const summary = calculateSummary(orders);
    
    document.getElementById('pendingCount').textContent = summary.pending;
    document.getElementById('processCount').textContent = summary.process;
    document.getElementById('completedCount').textContent = summary.completed;
    document.getElementById('totalCount').textContent = summary.total;
}

function renderPaymentBadge(status) {
    if (status === 'paid') {
        return `
            <span class="badge badge-success">
                <i class="fas fa-check-circle"></i>
                Pembayaran Lunas
            </span>
        `;
    } else {
        return `
            <span class="badge badge-warning">
                <i class="fas fa-clock"></i>
                Menunggu Pembayaran
            </span>
        `;
    }
}

function renderProductionBadge(status, estimatedDays) {
    if (status === 'process') {
        return `
            <span class="badge badge-primary">
                <i class="fas fa-cog fa-spin"></i>
                Sedang Dikerjakan (${estimatedDays})
            </span>
        `;
    }
    return '';
}

function renderOrderItem(item) {
    return `
        <div class="order-item">
            <img src="${item.image}" alt="${item.name}" class="item-image">
            <div class="item-info">
                <h4>${item.name}</h4>
                <p>${item.specs}</p>
            </div>
            <div class="item-price">
                <div class="item-qty">${item.qty}x</div>
                <div class="item-total">${formatCurrency(item.price * item.qty)}</div>
            </div>
        </div>
    `;
}

function renderActionButtons(order) {
    let buttons = '';
    
    if (order.paymentStatus === 'pending') {
        buttons += `
            <button class="btn btn-primary" onclick="handlePayNow('${order.orderNumber}')">
                <i class="fas fa-credit-card"></i>
                Bayar Sekarang
            </button>
        `;
    }
    
    buttons += `
        <button class="btn btn-outline" onclick="handleViewDetail('${order.orderNumber}')">
            <i class="fas fa-eye"></i>
            Lihat Detail
        </button>
    `;
    
    return buttons;
}

function renderOrderCard(order) {
    return `
        <div class="order-card">
            <div class="order-header">
                <div class="order-meta">
                    <div class="order-number">
                        <i class="fas fa-receipt"></i>
                        ${order.orderNumber}
                    </div>
                    <div class="order-date">
                        <i class="far fa-calendar"></i>
                        ${order.date}
                    </div>
                </div>
                <div class="order-badges">
                    ${renderPaymentBadge(order.paymentStatus)}
                    ${renderProductionBadge(order.productionStatus, order.estimatedDays)}
                </div>
            </div>

            <div class="order-items">
                ${order.items.map(item => renderOrderItem(item)).join('')}
            </div>

            <div class="order-footer">
                <div class="order-total">
                    <span class="total-label">Total Pembayaran</span>
                    <span class="total-amount">${formatCurrency(order.total)}</span>
                </div>
                <div class="order-actions">
                    ${renderActionButtons(order)}
                </div>
            </div>
        </div>
    `;
}

function renderOrders(orders) {
    const ordersList = document.getElementById('ordersList');
    const emptyState = document.getElementById('emptyState');

    if (orders.length === 0) {
        ordersList.innerHTML = '';
        emptyState.style.display = 'block';
        return;
    }

    emptyState.style.display = 'none';
    ordersList.innerHTML = orders.map(order => renderOrderCard(order)).join('');
}

// ===== EVENT HANDLERS =====
function handleViewDetail(orderNumber) {
    // Redirect ke halaman detail order
    // window.location.href = `/order/detail/${orderNumber}`;
    
    alert(`Detail Pesanan: ${orderNumber}\n\nHalaman detail akan segera tersedia.`);
}

function handlePayNow(orderNumber) {
    // Integrasi dengan Midtrans Snap
    // const order = orders.find(o => o.orderNumber === orderNumber);
    
    alert(`Pembayaran untuk: ${orderNumber}\n\nAnda akan diarahkan ke Midtrans.`);
    
    // Example Midtrans Integration:
    /*
    snap.pay(order.snapToken, {
        onSuccess: function(result) {
            window.location.href = `/order/success/${orderNumber}`;
        },
        onPending: function(result) {
            alert('Pembayaran pending');
        },
        onError: function(result) {
            alert('Pembayaran gagal');
        }
    });
    */
}

// ===== API FUNCTIONS =====
async function fetchOrders() {
    try {
        // Uncomment untuk fetch dari API
        /*
        const response = await fetch('/api/orders', {
            method: 'GET',
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('token'),
                'Content-Type': 'application/json'
            }
        });

        if (!response.ok) {
            throw new Error('Failed to fetch orders');
        }

        const data = await response.json();
        return data.orders;
        */

        // Menggunakan sample data
        return sampleOrders;
    } catch (error) {
        console.error('Error fetching orders:', error);
        return [];
    }
}

// ===== INITIALIZATION =====
async function init() {
    try {
        // Fetch orders dari API
        const orders = await fetchOrders();
        
        // Render summary cards
        renderSummary(orders);
        
        // Render order list
        renderOrders(orders);
    } catch (error) {
        console.error('Error initializing page:', error);
    }
}

// ===== PAGE LOAD =====
document.addEventListener('DOMContentLoaded', init);

// ===== EXPORTS (if using modules) =====
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        fetchOrders,
        renderOrders,
        handleViewDetail,
        handlePayNow,
        formatCurrency
    };
}
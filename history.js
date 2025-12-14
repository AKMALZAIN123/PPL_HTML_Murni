// ===== SAMPLE DATA - HANYA PESANAN YANG SUDAH DIBAYAR =====
const orders = [
    {
        orderNumber: 'ORD-2024-001234',
        date: '10 Desember 2024, 14:30',
        productionStatus: 'Sedang Dikerjakan (2-3 hari)',
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
        orderNumber: 'ORD-2024-001232',
        date: '5 Desember 2024, 16:45',
        productionStatus: 'Sedang Dikerjakan (1-2 hari)',
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
    },
    {
        orderNumber: 'ORD-2024-001231',
        date: '2 Desember 2024, 10:15',
        productionStatus: 'Sedang Dikerjakan (3-4 hari)',
        items: [
            {
                name: 'Booth Promosi 3x3m',
                specs: 'Tenda promosi dengan custom print',
                qty: 1,
                price: 2500000,
                image: 'https://images.unsplash.com/photo-1588282322673-c31965a75c3e?w=100'
            }
        ],
        total: 2500000
    }
];

// ===== INIT =====
document.addEventListener('DOMContentLoaded', function() {
    renderOrders();
});

// ===== FORMAT CURRENCY =====
function formatCurrency(amount) {
    return new Intl.NumberFormat('id-ID', {
        style: 'currency',
        currency: 'IDR',
        minimumFractionDigits: 0
    }).format(amount);
}

// ===== RENDER ORDER ITEM =====
function renderOrderItem(item) {
    return `
        <div class="order-item">
            <img src="${item.image}" alt="${item.name}" class="item-image">
            <div class="item-details">
                <div class="item-name">${item.name}</div>
                <div class="item-specs">${item.specs}</div>
            </div>
            <div class="item-pricing">
                <div class="item-qty">${item.qty}x</div>
                <div class="item-price">${formatCurrency(item.price * item.qty)}</div>
            </div>
        </div>
    `;
}

// ===== RENDER ORDER CARD =====
function renderOrderCard(order) {
    return `
        <div class="order-card">
            <div class="order-header">
                <div class="order-info">
                    <div class="order-number">${order.orderNumber}</div>
                    <div class="order-date">
                        <i class="far fa-calendar"></i>
                        ${order.date}
                    </div>
                </div>
                <div class="status-badge">
                    <i class="fas fa-cog fa-spin"></i>
                    ${order.productionStatus}
                </div>
            </div>

            <div class="order-items">
                ${order.items.map(item => renderOrderItem(item)).join('')}
            </div>

            <div class="order-footer">
                <div class="order-total-section">
                    <span class="total-label">Total Pembayaran</span>
                    <span class="total-amount">${formatCurrency(order.total)}</span>
                </div>
                <div class="order-action">
                    <button class="btn-outline" onclick="viewOrderDetail('${order.orderNumber}')">
                        <i class="fas fa-eye"></i>
                        Lihat Detail
                    </button>
                </div>
            </div>
        </div>
    `;
}

// ===== RENDER ALL ORDERS =====
function renderOrders() {
    const ordersList = document.getElementById('ordersList');
    const emptyState = document.getElementById('emptyState');

    if (orders.length === 0) {
        ordersList.style.display = 'none';
        emptyState.style.display = 'block';
        return;
    }

    emptyState.style.display = 'none';
    ordersList.innerHTML = orders.map(order => renderOrderCard(order)).join('');
}

// ===== VIEW ORDER DETAIL =====
function viewOrderDetail(orderNumber) {
    window.location.href = 'detail-history.html';
    // window.location.href = '/order/detail/' + orderNumber;
}

// ===== FETCH FROM API (Optional) =====
async function fetchOrdersFromAPI() {
    try {
        // Fetch only paid orders
        // const response = await fetch('/api/orders?status=paid', {
        //     headers: {
        //         'Authorization': 'Bearer ' + localStorage.getItem('token')
        //     }
        // });
        // const data = await response.json();
        // return data.orders;
        
        return orders;
    } catch (error) {
        console.error('Error fetching orders:', error);
        return [];
    }
}
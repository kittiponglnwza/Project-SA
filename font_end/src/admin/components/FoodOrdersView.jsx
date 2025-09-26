import React, { useState, useEffect } from 'react';
import { Clock, ChefHat, CheckCircle, Truck, Filter, Search, Bell, Calendar, DollarSign, User } from 'lucide-react';

const FoodOrdersView = ({ foodOrders = [], onUpdateOrderStatus, onRefresh }) => {
  const [filteredOrders, setFilteredOrders] = useState(foodOrders);
  const [statusFilter, setStatusFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('newest');
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);

  // ตัวอย่างข้อมูล orders หากไม่มีข้อมูลส่งมา
  const defaultOrders = [
    {
      id: 1,
      orderNumber: 'F001',
      customer: 'นายสมชาย ใจดี',
      seat: 'A-01',
      status: 'preparing',
      items: [
        { name: 'มาม่า', quantity: 2, price: 15 },
        { name: 'โค้ก', quantity: 1, price: 15 }
      ],
      total: 45,
      orderTime: '14:30',
      orderDate: '2024-12-19',
      notes: 'ไม่ใส่ผัก',
      paymentMethod: 'cash'
    },
    {
      id: 2,
      orderNumber: 'F002',
      customer: 'นางสาวมาลี สวยงาม',
      seat: 'B-05',
      status: 'ready',
      items: [
        { name: 'ข้าวผัดไข่', quantity: 1, price: 45 },
        { name: 'กาแฟเย็น', quantity: 1, price: 25 }
      ],
      total: 70,
      orderTime: '14:15',
      orderDate: '2024-12-19',
      notes: '',
      paymentMethod: 'qr'
    },
    {
      id: 3,
      orderNumber: 'F003',
      customer: 'นายวิชัย เก่งมาก',
      seat: 'C-03',
      status: 'delivered',
      items: [
        { name: 'แซนวิช', quantity: 1, price: 35 },
        { name: 'น้ำส้ม', quantity: 2, price: 20 }
      ],
      total: 75,
      orderTime: '13:45',
      orderDate: '2024-12-19',
      notes: 'ส่งด่วน',
      paymentMethod: 'cash'
    }
  ];

  const orders = foodOrders.length > 0 ? foodOrders : defaultOrders;

  useEffect(() => {
    let filtered = [...orders];

    // Filter by status
    if (statusFilter !== 'all') {
      filtered = filtered.filter(order => order.status === statusFilter);
    }

    // Filter by search query
    if (searchQuery) {
      filtered = filtered.filter(order =>
        order.customer.toLowerCase().includes(searchQuery.toLowerCase()) ||
        order.orderNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
        order.seat.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Sort orders
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'newest':
          return new Date(`${b.orderDate} ${b.orderTime}`) - new Date(`${a.orderDate} ${a.orderTime}`);
        case 'oldest':
          return new Date(`${a.orderDate} ${a.orderTime}`) - new Date(`${b.orderDate} ${b.orderTime}`);
        case 'amount-high':
          return b.total - a.total;
        case 'amount-low':
          return a.total - b.total;
        default:
          return 0;
      }
    });

    setFilteredOrders(filtered);
  }, [orders, statusFilter, searchQuery, sortBy]);

  const getStatusInfo = (status) => {
    switch (status) {
      case 'preparing':
        return { 
          icon: ChefHat, 
          label: 'กำลังเตรียม', 
          color: 'bg-orange-500/20 text-orange-400 border-orange-400/30',
          bgColor: 'bg-orange-500/10'
        };
      case 'ready':
        return { 
          icon: Bell, 
          label: 'พร้อมเสิร์ฟ', 
          color: 'bg-blue-500/20 text-blue-400 border-blue-400/30',
          bgColor: 'bg-blue-500/10'
        };
      case 'delivered':
        return { 
          icon: CheckCircle, 
          label: 'ส่งแล้ว', 
          color: 'bg-green-500/20 text-green-400 border-green-400/30',
          bgColor: 'bg-green-500/10'
        };
      default:
        return { 
          icon: Clock, 
          label: 'รอดำเนินการ', 
          color: 'bg-slate-500/20 text-slate-400 border-slate-400/30',
          bgColor: 'bg-slate-500/10'
        };
    }
  };

  const getOrderStats = () => {
    const stats = {
      total: orders.length,
      preparing: orders.filter(o => o.status === 'preparing').length,
      ready: orders.filter(o => o.status === 'ready').length,
      delivered: orders.filter(o => o.status === 'delivered').length,
      totalRevenue: orders.reduce((sum, o) => sum + o.total, 0)
    };
    return stats;
  };

  const handleUpdateStatus = (order) => {
    setSelectedOrder(order);
    setShowUpdateModal(true);
  };

  const handleStatusUpdate = (newStatus) => {
    if (onUpdateOrderStatus && selectedOrder) {
      onUpdateOrderStatus(selectedOrder.id, newStatus);
    }
    
    // Update local state if no callback provided
    const updatedOrders = orders.map(order =>
      order.id === selectedOrder.id ? { ...order, status: newStatus } : order
    );
    
    setShowUpdateModal(false);
    setSelectedOrder(null);
    
    // Show success message
    alert(`✅ อัปเดตสถานะคำสั่งซื้อ #${selectedOrder.orderNumber} เป็น "${getStatusInfo(newStatus).label}" สำเร็จ`);
  };

  const stats = getOrderStats();

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div>
          <h2 className="text-3xl font-bold text-white mb-2 flex items-center gap-3">
            🍽️ คำสั่งซื้ออาหาร
          </h2>
          <p className="text-slate-400">จัดการคำสั่งซื้ออาหารและเครื่องดื่ม</p>
        </div>
        
        <div className="flex gap-3">
          <button
            onClick={onRefresh}
            className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg text-white font-medium transition-colors flex items-center gap-2"
          >
            <Clock size={18} />
            รีเฟรช
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
        <div className="bg-slate-800 rounded-xl p-4 border border-slate-700">
          <div className="flex items-center gap-3">
            <div className="bg-blue-500/20 p-2 rounded-lg">
              <Truck className="text-blue-400" size={20} />
            </div>
            <div>
              <p className="text-slate-400 text-sm">ทั้งหมด</p>
              <p className="text-2xl font-bold text-white">{stats.total}</p>
            </div>
          </div>
        </div>

        <div className="bg-slate-800 rounded-xl p-4 border border-slate-700">
          <div className="flex items-center gap-3">
            <div className="bg-orange-500/20 p-2 rounded-lg">
              <ChefHat className="text-orange-400" size={20} />
            </div>
            <div>
              <p className="text-slate-400 text-sm">กำลังเตรียม</p>
              <p className="text-2xl font-bold text-white">{stats.preparing}</p>
            </div>
          </div>
        </div>

        <div className="bg-slate-800 rounded-xl p-4 border border-slate-700">
          <div className="flex items-center gap-3">
            <div className="bg-blue-500/20 p-2 rounded-lg">
              <Bell className="text-blue-400" size={20} />
            </div>
            <div>
              <p className="text-slate-400 text-sm">พร้อมเสิร์ฟ</p>
              <p className="text-2xl font-bold text-white">{stats.ready}</p>
            </div>
          </div>
        </div>

        <div className="bg-slate-800 rounded-xl p-4 border border-slate-700">
          <div className="flex items-center gap-3">
            <div className="bg-green-500/20 p-2 rounded-lg">
              <CheckCircle className="text-green-400" size={20} />
            </div>
            <div>
              <p className="text-slate-400 text-sm">ส่งแล้ว</p>
              <p className="text-2xl font-bold text-white">{stats.delivered}</p>
            </div>
          </div>
        </div>

        <div className="bg-slate-800 rounded-xl p-4 border border-slate-700">
          <div className="flex items-center gap-3">
            <div className="bg-yellow-500/20 p-2 rounded-lg">
              <DollarSign className="text-yellow-400" size={20} />
            </div>
            <div>
              <p className="text-slate-400 text-sm">รายได้</p>
              <p className="text-2xl font-bold text-white">฿{stats.totalRevenue}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Filters and Search */}
      <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
        <div className="flex flex-col lg:flex-row gap-4">
          {/* Search */}
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" size={18} />
              <input
                type="text"
                placeholder="ค้นหาด้วยชื่อลูกค้า หมายเลขคำสั่ง หรือที่นั่ง..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>

          {/* Status Filter */}
          <div className="flex items-center gap-2">
            <Filter className="text-slate-400" size={18} />
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">ทุกสถานะ</option>
              <option value="preparing">กำลังเตรียม</option>
              <option value="ready">พร้อมเสิร์ฟ</option>
              <option value="delivered">ส่งแล้ว</option>
            </select>
          </div>

          {/* Sort */}
          <div className="flex items-center gap-2">
            <Calendar className="text-slate-400" size={18} />
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white focus:ring-2 focus:ring-blue-500"
            >
              <option value="newest">ล่าสุด</option>
              <option value="oldest">เก่าสุด</option>
              <option value="amount-high">ราคา: สูง-ต่ำ</option>
              <option value="amount-low">ราคา: ต่ำ-สูง</option>
            </select>
          </div>
        </div>
      </div>

      {/* Orders Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {filteredOrders.length > 0 ? (
          filteredOrders.map((order) => {
            const statusInfo = getStatusInfo(order.status);
            const StatusIcon = statusInfo.icon;

            return (
              <div key={order.id} className="bg-slate-800 rounded-2xl p-6 border border-slate-700 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                {/* Header */}
                <div className="flex justify-between items-start mb-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <h3 className="text-xl font-bold text-white">#{order.orderNumber}</h3>
                      <div className={`flex items-center gap-1 px-2 py-1 rounded-full text-xs font-semibold border ${statusInfo.color}`}>
                        <StatusIcon size={12} />
                        {statusInfo.label}
                      </div>
                    </div>
                    
                    <div className="space-y-1">
                      <p className="text-slate-300 flex items-center gap-2">
                        <User size={14} />
                        {order.customer}
                      </p>
                      <p className="text-sm text-slate-400">ที่นั่ง: {order.seat}</p>
                      <p className="text-sm text-slate-400">
                        <Clock size={12} className="inline mr-1" />
                        {order.orderTime} | {order.orderDate}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Items */}
                <div className={`rounded-xl p-4 mb-4 ${statusInfo.bgColor}`}>
                  <h4 className="text-slate-300 font-medium mb-3">รายการสั่งซื้อ:</h4>
                  <div className="space-y-2 max-h-32 overflow-y-auto">
                    {order.items.map((item, index) => (
                      <div key={index} className="flex justify-between items-center text-sm">
                        <span className="text-slate-300">
                          {item.name} <span className="text-slate-400">x{item.quantity}</span>
                        </span>
                        <span className="text-white font-medium">฿{item.price * item.quantity}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Notes */}
                {order.notes && (
                  <div className="mb-4 p-3 bg-yellow-500/10 border border-yellow-400/30 rounded-lg">
                    <p className="text-yellow-400 text-sm">
                      📝 หมายเหตุ: {order.notes}
                    </p>
                  </div>
                )}

                {/* Footer */}
                <div className="border-t border-slate-700 pt-4">
                  <div className="flex justify-between items-center mb-3">
                    <div>
                      <p className="text-slate-400 text-sm flex items-center gap-1">
                        💰 รวมทั้งสิ้น: <span className="text-green-400 font-bold text-lg">฿{order.total}</span>
                      </p>
                      <p className="text-slate-500 text-xs">
                        ชำระ: {order.paymentMethod === 'cash' ? '💵 เงินสด' : '📱 QR Code'}
                      </p>
                    </div>
                    
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleUpdateStatus(order)}
                        className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center gap-2"
                      >
                        <Clock size={14} />
                        อัปเดต
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })
        ) : (
          <div className="col-span-full text-center py-12">
            <div className="text-6xl mb-4">🍽️</div>
            <h3 className="text-xl font-bold text-slate-400 mb-2">ไม่พบคำสั่งซื้อ</h3>
            <p className="text-slate-500">ลองเปลี่ยนเงื่อนไขการค้นหาหรือกรองข้อมูล</p>
          </div>
        )}
      </div>

      {/* Update Status Modal */}
      {showUpdateModal && selectedOrder && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
          <div className="bg-slate-800 rounded-3xl p-8 max-w-md w-full border border-slate-600 shadow-2xl">
            <h3 className="text-2xl font-bold text-white mb-6">
              อัปเดตสถานะคำสั่งซื้อ #{selectedOrder.orderNumber}
            </h3>
            
            <div className="space-y-4 mb-6">
              <div className="text-slate-300">
                <p><strong>ลูกค้า:</strong> {selectedOrder.customer}</p>
                <p><strong>ที่นั่ง:</strong> {selectedOrder.seat}</p>
                <p><strong>ยอดรวม:</strong> ฿{selectedOrder.total}</p>
              </div>
              
              <div className="border-t border-slate-700 pt-4">
                <p className="text-slate-400 mb-4">เลือกสถานะใหม่:</p>
                <div className="space-y-3">
                  {[
                    { status: 'preparing', label: 'กำลังเตรียม', icon: ChefHat, color: 'orange' },
                    { status: 'ready', label: 'พร้อมเสิร์ฟ', icon: Bell, color: 'blue' },
                    { status: 'delivered', label: 'ส่งแล้ว', icon: CheckCircle, color: 'green' }
                  ].map(({ status, label, icon: Icon, color }) => (
                    <button
                      key={status}
                      onClick={() => handleStatusUpdate(status)}
                      disabled={selectedOrder.status === status}
                      className={`
                        w-full p-4 rounded-xl border-2 transition-all duration-200 flex items-center gap-3
                        ${selectedOrder.status === status 
                          ? `border-${color}-400 bg-${color}-500/20 cursor-not-allowed` 
                          : `border-slate-600 hover:border-${color}-400 hover:bg-${color}-500/10`
                        }
                      `}
                    >
                      <Icon size={20} className={selectedOrder.status === status ? `text-${color}-400` : 'text-slate-400'} />
                      <span className={selectedOrder.status === status ? `text-${color}-400` : 'text-white'}>
                        {label}
                      </span>
                      {selectedOrder.status === status && (
                        <span className="text-xs bg-green-500/20 text-green-400 px-2 py-1 rounded-full ml-auto">
                          ปัจจุบัน
                        </span>
                      )}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => {
                  setShowUpdateModal(false);
                  setSelectedOrder(null);
                }}
                className="flex-1 px-4 py-2 bg-slate-600 hover:bg-slate-700 text-white rounded-xl transition-colors"
              >
                ยกเลิก
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default FoodOrdersView;
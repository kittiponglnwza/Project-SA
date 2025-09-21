// pages/HistoryPage.jsx
import React, { useState } from 'react';
import { Calendar, Clock, MapPin, CreditCard, Star, Filter, Search } from 'lucide-react';

const HistoryPage = () => {
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  // Mock data - ในการใช้งานจริงจะดึงจากฐานข้อมูล
  const historyData = [
    {
      id: 1,
      type: 'booking',
      date: '2024-01-15',
      startTime: '14:00',
      endTime: '17:00',
      duration: 3,
      seat: 'A1',
      price: 100,
      status: 'completed',
      paymentMethod: 'cash',
      game: 'Valorant'
    },
    {
      id: 2,
      type: 'booking',
      date: '2024-01-10',
      startTime: '19:00',
      endTime: '24:00',
      duration: 5,
      seat: 'Room1',
      price: 230,
      status: 'completed',
      paymentMethod: 'qr',
      game: 'League of Legends'
    },
    {
      id: 3,
      type: 'food',
      date: '2024-01-15',
      orderTime: '15:30',
      items: [
        { name: 'มันฝรั่งทอด', quantity: 1, price: 35 },
        { name: 'โค้ก', quantity: 2, price: 15 }
      ],
      totalPrice: 65,
      status: 'delivered'
    },
    {
      id: 4,
      type: 'booking',
      date: '2024-01-08',
      startTime: '10:00',
      endTime: '13:00',
      duration: 3,
      seat: 'B5',
      price: 100,
      status: 'completed',
      paymentMethod: 'cash',
      game: 'FIFA 24'
    },
    {
      id: 5,
      type: 'food',
      date: '2024-01-08',
      orderTime: '11:15',
      items: [
        { name: 'ข้าวผัดไข่', quantity: 1, price: 45 },
        { name: 'กาแฟเย็น', quantity: 1, price: 25 }
      ],
      totalPrice: 70,
      status: 'delivered'
    },
    {
      id: 6,
      type: 'booking',
      date: '2024-01-05',
      startTime: '16:00',
      endTime: '17:00',
      duration: 1,
      seat: 'C3',
      price: 50,
      status: 'cancelled',
      paymentMethod: 'cash',
      game: 'Counter Strike 2'
    }
  ];

  const filterOptions = {
    all: 'ทั้งหมด',
    booking: 'การจองโต๊ะ',
    food: 'การสั่งอาหาร',
    completed: 'สำเร็จแล้ว',
    cancelled: 'ยกเลิกแล้ว'
  };

  const getFilteredData = () => {
    let filtered = historyData;

    if (selectedFilter !== 'all') {
      if (selectedFilter === 'completed') {
        filtered = filtered.filter(item => 
          item.status === 'completed' || item.status === 'delivered'
        );
      } else if (selectedFilter === 'cancelled') {
        filtered = filtered.filter(item => item.status === 'cancelled');
      } else {
        filtered = filtered.filter(item => item.type === selectedFilter);
      }
    }

    if (searchTerm) {
      filtered = filtered.filter(item => 
        (item.seat && item.seat.toLowerCase().includes(searchTerm.toLowerCase())) ||
        (item.game && item.game.toLowerCase().includes(searchTerm.toLowerCase())) ||
        (item.items && item.items.some(foodItem => 
          foodItem.name.toLowerCase().includes(searchTerm.toLowerCase())
        ))
      );
    }

    return filtered.sort((a, b) => new Date(b.date) - new Date(a.date));
  };

  const getStatusColor = (status) => {
    switch(status) {
      case 'completed':
      case 'delivered':
        return 'text-green-400 bg-green-500/20';
      case 'cancelled':
        return 'text-red-400 bg-red-500/20';
      default:
        return 'text-yellow-400 bg-yellow-500/20';
    }
  };

  const getStatusText = (status) => {
    switch(status) {
      case 'completed':
        return 'เสร็จสิ้น';
      case 'delivered':
        return 'จัดส่งแล้ว';
      case 'cancelled':
        return 'ยกเลิกแล้ว';
      default:
        return status;
    }
  };

  const BookingCard = ({ item }) => (
    <div className="bg-slate-800/60 backdrop-blur-sm rounded-2xl p-6 border border-slate-700 hover:border-blue-400/50 transition-all duration-300">
      <div className="flex justify-between items-start mb-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-blue-500/20 rounded-xl flex items-center justify-center">
            <MapPin className="text-blue-400" size={24} />
          </div>
          <div>
            <h3 className="text-xl font-bold text-white">โต๊ะ {item.seat}</h3>
            <p className="text-slate-400">{item.game}</p>
          </div>
        </div>
        <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(item.status)}`}>
          {getStatusText(item.status)}
        </span>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-4">
        <div className="flex items-center gap-2 text-slate-300">
          <Calendar size={16} />
          <span className="text-sm">{new Date(item.date).toLocaleDateString('th-TH')}</span>
        </div>
        <div className="flex items-center gap-2 text-slate-300">
          <Clock size={16} />
          <span className="text-sm">{item.startTime} - {item.endTime}</span>
        </div>
        <div className="flex items-center gap-2 text-slate-300">
          <CreditCard size={16} />
          <span className="text-sm">{item.paymentMethod === 'cash' ? 'เงินสด' : 'QR Code'}</span>
        </div>
        <div className="text-blue-400 font-bold">
          {item.price}฿
        </div>
      </div>

      <div className="text-slate-400 text-sm">
        เล่นเป็นเวลา {item.duration} ชั่วโมง
      </div>
    </div>
  );

  const FoodCard = ({ item }) => (
    <div className="bg-slate-800/60 backdrop-blur-sm rounded-2xl p-6 border border-slate-700 hover:border-orange-400/50 transition-all duration-300">
      <div className="flex justify-between items-start mb-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-orange-500/20 rounded-xl flex items-center justify-center">
            <span className="text-2xl">🍕</span>
          </div>
          <div>
            <h3 className="text-xl font-bold text-white">คำสั่งซื้ออาหาร</h3>
            <p className="text-slate-400">{item.items.length} รายการ</p>
          </div>
        </div>
        <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(item.status)}`}>
          {getStatusText(item.status)}
        </span>
      </div>

      <div className="space-y-2 mb-4">
        {item.items.map((foodItem, index) => (
          <div key={index} className="flex justify-between text-sm">
            <span className="text-slate-300">{foodItem.name} x{foodItem.quantity}</span>
            <span className="text-slate-400">{foodItem.price * foodItem.quantity}฿</span>
          </div>
        ))}
      </div>

      <div className="flex justify-between items-center pt-3 border-t border-slate-600">
        <div className="flex items-center gap-2 text-slate-300">
          <Calendar size={16} />
          <span className="text-sm">{new Date(item.date).toLocaleDateString('th-TH')} {item.orderTime}</span>
        </div>
        <div className="text-orange-400 font-bold">
          รวม {item.totalPrice}฿
        </div>
      </div>
    </div>
  );

  const filteredData = getFilteredData();

  // สถิติสรุป
  const totalBookings = historyData.filter(item => item.type === 'booking').length;
  const totalSpent = historyData.reduce((sum, item) => 
    sum + (item.price || item.totalPrice || 0), 0
  );
  const completedBookings = historyData.filter(item => 
    item.type === 'booking' && item.status === 'completed'
  ).length;

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="mb-8">
        <h2 className="text-4xl lg:text-5xl font-bold mb-2 bg-gradient-to-r from-purple-400 to-pink-600 bg-clip-text text-transparent">
          📊 ประวัติการใช้งาน
        </h2>
        <div className="w-20 h-1 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full"></div>
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-slate-800/60 backdrop-blur-sm rounded-2xl p-6 border border-slate-700 text-center">
          <div className="text-3xl mb-2">🎮</div>
          <div className="text-2xl font-bold text-blue-400 mb-1">{totalBookings}</div>
          <div className="text-slate-400 text-sm">ครั้งที่จองโต๊ะ</div>
        </div>
        <div className="bg-slate-800/60 backdrop-blur-sm rounded-2xl p-6 border border-slate-700 text-center">
          <div className="text-3xl mb-2">💰</div>
          <div className="text-2xl font-bold text-green-400 mb-1">{totalSpent.toLocaleString()}</div>
          <div className="text-slate-400 text-sm">บาท ที่ใช้จ่ายทั้งหมด</div>
        </div>
        <div className="bg-slate-800/60 backdrop-blur-sm rounded-2xl p-6 border border-slate-700 text-center">
          <div className="text-3xl mb-2">⭐</div>
          <div className="text-2xl font-bold text-purple-400 mb-1">{completedBookings}</div>
          <div className="text-slate-400 text-sm">การจองที่สำเร็จ</div>
        </div>
      </div>

      {/* Filters and Search */}
      <div className="flex flex-col sm:flex-row gap-4 mb-8">
        {/* Filter Buttons */}
        <div className="flex flex-wrap gap-2">
          {Object.entries(filterOptions).map(([key, label]) => (
            <button
              key={key}
              onClick={() => setSelectedFilter(key)}
              className={`
                px-4 py-2 rounded-xl font-medium transition-all duration-300 text-sm
                ${selectedFilter === key
                  ? 'bg-gradient-to-r from-purple-500 to-pink-600 text-white shadow-lg shadow-purple-500/25'
                  : 'bg-slate-800 text-slate-300 border border-slate-600 hover:border-purple-400 hover:text-purple-400'
                }
              `}
            >
              <Filter size={16} className="inline mr-1" />
              {label}
            </button>
          ))}
        </div>

        {/* Search */}
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" size={20} />
          <input
            type="text"
            placeholder="ค้นหา (โต๊ะ, เกม, อาหาร...)"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-3 bg-slate-800 border border-slate-600 rounded-xl text-white placeholder-slate-400 focus:border-purple-400 focus:outline-none transition-colors"
          />
        </div>
      </div>

      {/* History List */}
      <div className="space-y-6">
        {filteredData.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">📋</div>
            <h3 className="text-xl font-bold text-slate-400 mb-2">ไม่พบประวัติการใช้งาน</h3>
            <p className="text-slate-500">ลองเปลี่ยนตัวกรองหรือคำค้นหา</p>
          </div>
        ) : (
          <div className="grid gap-6">
            {filteredData.map((item) => (
              <div key={item.id}>
                {item.type === 'booking' ? (
                  <BookingCard item={item} />
                ) : (
                  <FoodCard item={item} />
                )}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Load More Button (สำหรับข้อมูลมาก) */}
      {filteredData.length > 0 && (
        <div className="text-center pt-8">
          <button className="px-8 py-3 bg-slate-700 hover:bg-slate-600 text-white rounded-xl transition-colors">
            โหลดเพิ่มเติม
          </button>
        </div>
      )}
    </div>
  );
};

export default HistoryPage;
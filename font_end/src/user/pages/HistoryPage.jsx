// pages/HistoryPage.jsx
import React, { useState, useEffect } from "react";
import {
  Calendar,
  Clock,
  MapPin,
  CreditCard,
  Filter,
  Search,
} from "lucide-react";
import axios from "axios";

const HistoryPage = () => {
  const [selectedFilter, setSelectedFilter] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [bookings, setBookings] = useState([]);
  const [foodOrders, setFoodOrders] = useState([]);

  // Pagination state
  const [pageSize] = useState(5);
  const [visibleCount, setVisibleCount] = useState(5);

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const token = localStorage.getItem("token");
        const userId = localStorage.getItem("userId");
        if (!userId) return;

        const res = await axios.get(
          `http://localhost:3000/bookings/user/${userId}`,
          { headers: { Authorization: `Bearer ${token}` } }
        );

        const bookingData = res.data.map((b) => ({
          id: `booking-${b.id}`,
          type: "booking",
          date: b.date,
          startTime: b.startTime || "-",
          endTime: b.endTime || "-",
          duration: b.duration,
          seat: b.seat?.zone + b.seat?.id,
          price: b.price,
          status: b.status,
          paymentMethod: b.paymentMethod,
          game: b.game || "-",
        }));

        setBookings(bookingData);
      } catch (err) {
        console.error("Error fetching history:", err);
      }
    };

    fetchHistory();

    // ✅ mock orders (แทนของจริงก่อน)
    setFoodOrders([
      {
        id: "food-1",
        type: "food",
        date: "2025-09-20",
        orderTime: "15:30",
        items: [
          { name: "มันฝรั่งทอด", quantity: 1, price: 35 },
          { name: "โค้ก", quantity: 2, price: 15 },
        ],
        totalPrice: 65,
        status: "delivered",
      },
      {
        id: "food-2",
        type: "food",
        date: "2025-09-18",
        orderTime: "11:15",
        items: [
          { name: "ข้าวผัดไข่", quantity: 1, price: 45 },
          { name: "กาแฟเย็น", quantity: 1, price: 25 },
        ],
        totalPrice: 70,
        status: "delivered",
      },
    ]);
  }, []);

  const historyData = [...bookings, ...foodOrders];

  // ✅ Filter
  const filterOptions = {
    all: "ทั้งหมด",
    booking: "การจองโต๊ะ",
    food: "การสั่งอาหาร",
    completed: "สำเร็จแล้ว",
    cancelled: "ยกเลิกแล้ว",
  };

  const getFilteredData = () => {
    let filtered = historyData;

    if (selectedFilter !== "all") {
      if (selectedFilter === "completed") {
        filtered = filtered.filter(
          (item) => item.status === "completed" || item.status === "delivered"
        );
      } else if (selectedFilter === "cancelled") {
        filtered = filtered.filter((item) => item.status === "cancelled");
      } else {
        filtered = filtered.filter((item) => item.type === selectedFilter);
      }
    }

    if (searchTerm) {
      filtered = filtered.filter(
        (item) =>
          (item.seat &&
            item.seat.toLowerCase().includes(searchTerm.toLowerCase())) ||
          (item.game &&
            item.game.toLowerCase().includes(searchTerm.toLowerCase())) ||
          (item.items &&
            item.items.some((f) =>
              f.name.toLowerCase().includes(searchTerm.toLowerCase())
            ))
      );
    }

    return filtered.sort((a, b) => new Date(b.date) - new Date(a.date));
  };

  const filteredData = getFilteredData();
  const visibleData = filteredData.slice(0, visibleCount);

  // ✅ Summary
  const totalBookings = bookings.length;
  const totalSpent = historyData.reduce(
    (sum, item) => sum + (item.price || item.totalPrice || 0),
    0
  );
  const completedBookings = bookings.filter(
    (item) => item.status === "completed"
  ).length;

  const getStatusColor = (status) => {
    switch (status) {
      case "completed":
      case "delivered":
        return "text-green-400 bg-green-500/20";
      case "cancelled":
        return "text-red-400 bg-red-500/20";
      default:
        return "text-yellow-400 bg-yellow-500/20";
    }
  };

  const BookingCard = ({ item }) => (
    <div className="bg-slate-800/60 rounded-2xl p-6 border border-slate-700 hover:border-blue-400/50 transition-all">
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
        <span
          className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(
            item.status
          )}`}
        >
          {item.status}
        </span>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-4 text-sm text-slate-300">
        <div className="flex items-center gap-2">
          <Calendar size={16} />
          {new Date(item.date).toLocaleDateString("th-TH")}
        </div>
        <div className="flex items-center gap-2">
          <Clock size={16} />
          {item.startTime} - {item.endTime}
        </div>
        <div className="flex items-center gap-2">
          <CreditCard size={16} />
          {item.paymentMethod === "cash" ? "เงินสด" : "QR Code"}
        </div>
        <div className="text-blue-400 font-bold">{item.price}฿</div>
      </div>
    </div>
  );

  const FoodCard = ({ item }) => (
    <div className="bg-slate-800/60 rounded-2xl p-6 border border-slate-700 hover:border-orange-400/50 transition-all">
      <div className="flex justify-between items-start mb-4">
        <h3 className="text-xl font-bold text-white">🍴 คำสั่งซื้ออาหาร</h3>
        <span
          className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(
            item.status
          )}`}
        >
          {item.status}
        </span>
      </div>

      <div className="space-y-2 mb-4 text-sm">
        {item.items.map((f, i) => (
          <div key={i} className="flex justify-between">
            <span className="text-slate-300">
              {f.name} x{f.quantity}
            </span>
            <span className="text-slate-400">{f.price * f.quantity}฿</span>
          </div>
        ))}
      </div>

      <div className="flex justify-between items-center text-sm text-slate-300">
        <Calendar size={16} />
        {new Date(item.date).toLocaleDateString("th-TH")} {item.orderTime}
        <span className="text-orange-400 font-bold">
          รวม {item.totalPrice}฿
        </span>
      </div>
    </div>
  );

  return (
    <div className="space-y-8">
      {/* Header */}
      <h2 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-600 bg-clip-text text-transparent">
        🕒 ประวัติการใช้งาน
      </h2>

      {/* Summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-slate-800/60 rounded-2xl p-6 text-center border border-slate-700">
          🎮
          <div className="text-2xl font-bold text-blue-400">{totalBookings}</div>
          <div className="text-slate-400 text-sm">ครั้งที่จองโต๊ะ</div>
        </div>
        <div className="bg-slate-800/60 rounded-2xl p-6 text-center border border-slate-700">
          💰
          <div className="text-2xl font-bold text-green-400">
            {totalSpent.toLocaleString()}
          </div>
          <div className="text-slate-400 text-sm">บาทที่ใช้จ่าย</div>
        </div>
        <div className="bg-slate-800/60 rounded-2xl p-6 text-center border border-slate-700">
          ⭐
          <div className="text-2xl font-bold text-purple-400">
            {completedBookings}
          </div>
          <div className="text-slate-400 text-sm">การจองที่สำเร็จ</div>
        </div>
      </div>

      {/* Filter + Search */}
      <div className="flex flex-col sm:flex-row gap-4 mb-8">
        <div className="flex flex-wrap gap-2">
          {Object.entries(filterOptions).map(([key, label]) => (
            <button
              key={key}
              onClick={() => {
                setSelectedFilter(key);
                setVisibleCount(pageSize); // reset pagination
              }}
              className={`px-4 py-2 rounded-xl text-sm ${
                selectedFilter === key
                  ? "bg-gradient-to-r from-pink-500 to-purple-600 text-white shadow-lg"
                  : "bg-slate-800 text-slate-300 border border-slate-600 hover:border-purple-400 hover:text-purple-400"
              }`}
            >
              <Filter size={14} className="inline mr-1" />
              {label}
            </button>
          ))}
        </div>

        <div className="relative flex-1 max-w-md">
          <Search
            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400"
            size={18}
          />
          <input
            type="text"
            placeholder="ค้นหา (โต๊ะ, เกม, อาหาร...)"
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setVisibleCount(pageSize); // reset pagination
            }}
            className="w-full pl-10 pr-4 py-2 bg-slate-800 border border-slate-600 rounded-xl text-white placeholder-slate-400 focus:border-purple-400"
          />
        </div>
      </div>

      {/* History List */}
      <div className="space-y-6">
        {visibleData.length === 0 ? (
          <div className="text-center text-slate-400 py-12">
            📋 ไม่พบประวัติการใช้งาน
          </div>
        ) : (
          <div className="grid gap-6">
            {visibleData.map((item) =>
              item.type === "booking" ? (
                <BookingCard key={item.id} item={item} />
              ) : (
                <FoodCard key={item.id} item={item} />
              )
            )}
          </div>
        )}
      </div>

      {/* Load More */}
      {visibleCount < filteredData.length && (
        <div className="text-center pt-8">
          <button
            onClick={() => setVisibleCount((prev) => prev + pageSize)}
            className="px-8 py-3 bg-slate-700 hover:bg-slate-600 text-white rounded-xl"
          >
            โหลดเพิ่มเติม
          </button>
        </div>
      )}
    </div>
  );
};

export default HistoryPage;

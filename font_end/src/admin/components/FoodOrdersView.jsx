// src/pages/FoodOrdersView.jsx
import React, { useState, useEffect } from "react";
import {
  Clock,
  ChefHat,
  CheckCircle,
  Truck,
  Filter,
  Search,
  Bell,
  Calendar,
  DollarSign,
  User,
} from "lucide-react";
import axios from "axios";

const API_URL = "http://localhost:3000"; // backend ของคุณ

const FoodOrdersView = () => {
  const [orders, setOrders] = useState([]);
  const [filteredOrders, setFilteredOrders] = useState([]);
  const [statusFilter, setStatusFilter] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("newest");
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);

  // โหลดข้อมูล
  const fetchOrders = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.get(`${API_URL}/orders`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setOrders(res.data);
    } catch (err) {
      console.error("Error fetching orders:", err);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  // Filter + Sort
  useEffect(() => {
    let filtered = [...orders];

    if (statusFilter !== "all") {
      filtered = filtered.filter((order) => order.status === statusFilter);
    }

    if (searchQuery) {
      filtered = filtered.filter(
        (order) =>
          order.customerName?.toLowerCase().includes(searchQuery.toLowerCase()) ||
          order.orderNumber?.toLowerCase().includes(searchQuery.toLowerCase()) ||
          order.seat?.zone?.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    filtered.sort((a, b) => {
      switch (sortBy) {
        case "newest":
          return new Date(b.orderDate) - new Date(a.orderDate);
        case "oldest":
          return new Date(a.orderDate) - new Date(b.orderDate);
        case "amount-high":
          return b.total - a.total;
        case "amount-low":
          return a.total - b.total;
        default:
          return 0;
      }
    });

    setFilteredOrders(filtered);
  }, [orders, statusFilter, searchQuery, sortBy]);

  // Map สถานะ
  const getStatusInfo = (status) => {
    switch (status) {
      case "PREPARING":
        return {
          icon: ChefHat,
          label: "กำลังเตรียม",
          color: "bg-orange-500/20 text-orange-400",
          bgColor: "bg-orange-500/10",
        };
      case "READY":
        return {
          icon: Bell,
          label: "พร้อมเสิร์ฟ",
          color: "bg-blue-500/20 text-blue-400",
          bgColor: "bg-blue-500/10",
        };
      case "DELIVERED":
        return {
          icon: CheckCircle,
          label: "ส่งแล้ว",
          color: "bg-green-500/20 text-green-400",
          bgColor: "bg-green-500/10",
        };
      case "CANCELLED":
        return {
          icon: Clock,
          label: "ยกเลิก",
          color: "bg-red-500/20 text-red-400",
          bgColor: "bg-red-500/10",
        };
      default:
        return {
          icon: Clock,
          label: "รอดำเนินการ",
          color: "bg-slate-500/20 text-slate-400",
          bgColor: "bg-slate-500/10",
        };
    }
  };

  // Stats
  const getOrderStats = () => ({
    total: orders.length,
    preparing: orders.filter((o) => o.status === "PREPARING").length,
    ready: orders.filter((o) => o.status === "READY").length,
    delivered: orders.filter((o) => o.status === "DELIVERED").length,
    totalRevenue: orders.reduce((sum, o) => sum + o.total, 0),
  });

  const stats = getOrderStats();

  // Update Status
  const handleUpdateStatus = async (orderId, newStatus) => {
    try {
      const token = localStorage.getItem("token");
      await axios.put(
        `${API_URL}/orders/${orderId}/status`,
        { status: newStatus },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      alert("✅ อัปเดตสถานะสำเร็จ");
      fetchOrders();
      setShowUpdateModal(false);
      setSelectedOrder(null);
    } catch (err) {
      console.error("Error updating status:", err);
      alert("❌ อัปเดตสถานะไม่สำเร็จ");
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-3xl font-bold text-white mb-2">🍽️ คำสั่งซื้ออาหาร</h2>
        <p className="text-slate-400">จัดการคำสั่งซื้ออาหารและเครื่องดื่ม</p>
      </div>

      {/* ✅ Summary Cards */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        <div className="bg-slate-800 rounded-xl p-4 border border-slate-700 flex items-center gap-3">
          <Truck className="text-blue-400" size={22} />
          <div>
            <p className="text-slate-400 text-sm">ทั้งหมด</p>
            <p className="text-2xl font-bold text-white">{stats.total}</p>
          </div>
        </div>

        <div className="bg-slate-800 rounded-xl p-4 border border-slate-700 flex items-center gap-3">
          <ChefHat className="text-orange-400" size={22} />
          <div>
            <p className="text-slate-400 text-sm">กำลังเตรียม</p>
            <p className="text-2xl font-bold text-white">{stats.preparing}</p>
          </div>
        </div>

        <div className="bg-slate-800 rounded-xl p-4 border border-slate-700 flex items-center gap-3">
          <Bell className="text-blue-400" size={22} />
          <div>
            <p className="text-slate-400 text-sm">พร้อมเสิร์ฟ</p>
            <p className="text-2xl font-bold text-white">{stats.ready}</p>
          </div>
        </div>

        <div className="bg-slate-800 rounded-xl p-4 border border-slate-700 flex items-center gap-3">
          <CheckCircle className="text-green-400" size={22} />
          <div>
            <p className="text-slate-400 text-sm">ส่งแล้ว</p>
            <p className="text-2xl font-bold text-white">{stats.delivered}</p>
          </div>
        </div>

        <div className="bg-slate-800 rounded-xl p-4 border border-slate-700 flex items-center gap-3">
          <DollarSign className="text-yellow-400" size={22} />
          <div>
            <p className="text-slate-400 text-sm">รายได้</p>
            <p className="text-2xl font-bold text-yellow-400">฿{stats.totalRevenue}</p>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-slate-800 rounded-xl p-6 border border-slate-700 flex flex-col md:flex-row gap-4">
        {/* Search */}
        <div className="flex-1">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" size={18} />
            <input
              type="text"
              placeholder="ค้นหาด้วยชื่อลูกค้า หมายเลขคำสั่ง หรือที่นั่ง..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        {/* Status Filter */}
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white"
        >
          <option value="all">ทุกสถานะ</option>
          <option value="PREPARING">กำลังเตรียม</option>
          <option value="READY">พร้อมเสิร์ฟ</option>
          <option value="DELIVERED">ส่งแล้ว</option>
          <option value="CANCELLED">ยกเลิก</option>
        </select>

        {/* Sort */}
        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          className="px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white"
        >
          <option value="newest">ล่าสุด</option>
          <option value="oldest">เก่าสุด</option>
          <option value="amount-high">ราคา: สูง-ต่ำ</option>
          <option value="amount-low">ราคา: ต่ำ-สูง</option>
        </select>
      </div>

      {/* Orders Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {filteredOrders.length > 0 ? (
          filteredOrders.map((order) => {
            const statusInfo = getStatusInfo(order.status);
            const StatusIcon = statusInfo.icon;

            return (
              <div
                key={order.id}
                className="bg-slate-800 rounded-2xl p-6 border border-slate-700 hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
              >
                {/* Header */}
                <div className="flex justify-between items-start mb-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <h3 className="text-xl font-bold text-white">
                        #{order.orderNumber}
                      </h3>
                      <div
                        className={`flex items-center gap-1 px-2 py-1 rounded-full text-xs font-semibold ${statusInfo.color}`}
                      >
                        <StatusIcon size={12} />
                        {statusInfo.label}
                      </div>
                    </div>

                    <div className="space-y-1">
                      <p className="text-slate-300 flex items-center gap-2">
                        <User size={14} />
                        {order.customerName}
                      </p>
                      <p className="text-sm text-slate-400">
                        ที่นั่ง: {order.seat?.zone || "-"}
                      </p>
                      <p className="text-sm text-slate-400">
                        <Clock size={12} className="inline mr-1" />
                        {new Date(order.orderDate).toLocaleString("th-TH")}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Items */}
                <div className={`rounded-xl p-4 mb-4 ${statusInfo.bgColor}`}>
                  <h4 className="text-slate-300 font-medium mb-3">รายการสั่งซื้อ:</h4>
                  <div className="space-y-2 max-h-32 overflow-y-auto">
                    {order.items.map((item, i) => (
                      <div
                        key={i}
                        className="flex justify-between items-center text-sm"
                      >
                        <span className="text-slate-300">
                          {item.menu?.name}{" "}
                          <span className="text-slate-400">x{item.quantity}</span>
                        </span>
                        <span className="text-white font-medium">
                          ฿{item.price * item.quantity}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Footer */}
                <div className="border-t border-slate-700 pt-4">
                  <div className="flex justify-between items-center">
                    <p className="text-slate-400 text-sm">
                      💰 รวม:{" "}
                      <span className="text-green-400 font-bold text-lg">
                        ฿{order.total}
                      </span>
                    </p>
                    <button
                      onClick={() => {
                        setSelectedOrder(order);
                        setShowUpdateModal(true);
                      }}
                      className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg text-sm font-medium text-white flex items-center gap-2"
                    >
                      <Clock size={14} />
                      อัปเดต
                    </button>
                  </div>
                </div>
              </div>
            );
          })
        ) : (
          <div className="col-span-full text-center py-12 text-slate-400">
            🍽️ ไม่พบคำสั่งซื้อ
          </div>
        )}
      </div>

      {/* Update Modal */}
      {showUpdateModal && selectedOrder && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center">
          <div className="bg-slate-800 p-6 rounded-xl w-96">
            <h3 className="text-xl font-bold mb-4 text-white">
              อัปเดตคำสั่งซื้อ #{selectedOrder.orderNumber}
            </h3>
            <div className="space-y-3">
              {["PREPARING", "READY", "DELIVERED", "CANCELLED"].map((status) => (
                <button
                  key={status}
                  onClick={() => handleUpdateStatus(selectedOrder.id, status)}
                  className="w-full bg-slate-700 hover:bg-blue-600 py-2 rounded-lg text-white"
                >
                  {status}
                </button>
              ))}
            </div>
            <button
              onClick={() => setShowUpdateModal(false)}
              className="mt-4 w-full bg-red-500 py-2 rounded-lg text-white"
            >
              ❌ ยกเลิก
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default FoodOrdersView;

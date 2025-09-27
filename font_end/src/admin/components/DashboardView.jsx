// components/DashboardView.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Users,
  Monitor,
  Clock,
  TrendingUp,
  Bell,
  DollarSign,
  Calendar,
  PieChart,
  BarChart3,
} from "lucide-react";


const DashboardView = ({ onRefresh }) => {
  const [dashboardData, setDashboardData] = useState({
    totalUsers: 0,
    activities: [],
    financialSummary: {
      dailyRevenue: 0,
      monthlyRevenue: 0,
      dailyExpenses: 0,
      monthlyExpenses: 0,
      gamingHours: 0,
      foodRevenue: 0,
      totalProfit: 0,
    },
  });

  // ✅ คำนวณข้อมูลทางการเงิน
  const calculateFinancialData = (bookings, orders = []) => {
    const today = new Date();
    const startOfDay = new Date(today.setHours(0, 0, 0, 0));
    const startOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);

    // รายได้จากเกม
    const todayBookings = bookings.filter((b) => new Date(b.date) >= startOfDay);
    const monthBookings = bookings.filter((b) => new Date(b.date) >= startOfMonth);

    const dailyGamingRevenue = todayBookings.reduce((sum, b) => sum + (b.price || 0), 0);
    const monthlyGamingRevenue = monthBookings.reduce((sum, b) => sum + (b.price || 0), 0);

    // รายได้จากอาหาร
    const todayOrders = orders.filter((o) => new Date(o.orderDate) >= startOfDay);
    const monthOrders = orders.filter((o) => new Date(o.orderDate) >= startOfMonth);

    const dailyFoodRevenue = todayOrders.reduce((sum, o) => sum + (o.total || 0), 0);
    const monthlyFoodRevenue = monthOrders.reduce((sum, o) => sum + (o.total || 0), 0);

    // รวมรายได้
    const dailyRevenue = dailyGamingRevenue + dailyFoodRevenue;
    const monthlyRevenue = monthlyGamingRevenue + monthlyFoodRevenue;

    // ค่าใช้จ่าย (30% ของรายได้)
    const dailyExpenses = Math.round(dailyRevenue * 0.3);
    const monthlyExpenses = Math.round(monthlyRevenue * 0.3);

    // ชั่วโมงเล่นเกม
    const gamingHours = todayBookings.reduce((sum, b) => sum + (b.duration || 1), 0);

    return {
      dailyRevenue,
      monthlyRevenue,
      dailyExpenses,
      monthlyExpenses,
      gamingHours,
      foodRevenue: dailyFoodRevenue,
      totalProfit: dailyRevenue - dailyExpenses,
    };
  };

  // ✅ โหลดข้อมูลจาก backend
  const fetchDashboardData = async () => {
    try {
      const usersRes = await axios.get("http://localhost:3000/users");
      const totalUsers = usersRes.data.length;

      const bookingsRes = await axios.get("http://localhost:3000/bookings");
      const bookings = bookingsRes.data;

      let orders = [];
      try {
        const ordersRes = await axios.get("http://localhost:3000/orders");
        orders = ordersRes.data;
      } catch (err) {
        console.log("Orders API not available");
      }

      // รวมกิจกรรมทั้ง Booking และ Order
      const bookingActivities = bookings.map((b) => ({
        user: b.user?.name || "ไม่ทราบชื่อ",
        action: `จองโต๊ะ ${b.seat?.zone}${b.seat?.id}`,
        time: new Date(b.date).toLocaleString("th-TH"),
      }));

      const orderActivities = orders.map((o) => ({
        user: o.user?.name || o.customerName || "ไม่ทราบชื่อ",
        action: `สั่งอาหาร มูลค่า ${o.total} บาท`,
        time: new Date(o.orderDate).toLocaleString("th-TH"),
      }));

      const activities = [...bookingActivities, ...orderActivities]
        .sort((a, b) => new Date(b.time) - new Date(a.time)) // ใหม่สุดก่อน
        .slice(0, 4); // ✅ แสดงสูงสุด 4 อัน

      const financialSummary = calculateFinancialData(bookings, orders);

      setDashboardData({
        totalUsers,
        activities,
        financialSummary,
      });
    } catch (err) {
      console.error("Error fetching dashboard data:", err);
    }
  };

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const { financialSummary } = dashboardData;

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-4xl font-bold text-white mb-2">
            ยินดีต้อนรับสู่ Easy Game
          </h1>
          <p className="text-slate-300">
            เพลิดเพลินกับการเล่นเกมในบรรยากาศที่ดีที่สุด
          </p>
        </div>

        <button
          onClick={() => {
            fetchDashboardData();
            if (onRefresh) onRefresh();
          }}
          className="bg-blue-600 hover:bg-blue-700 px-6 py-3 rounded-xl flex items-center gap-3 transition-all duration-200 shadow-lg hover:shadow-xl"
        >
          รีเฟรช
        </button>
      </div>

      {/* ✅ การ์ดสรุป รายได้/รายจ่าย/ชั่วโมง */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-gradient-to-br from-green-800 to-green-700 rounded-2xl p-6 border border-green-600 text-white shadow-xl hover:scale-105 transition-all duration-300">
          <p className="text-green-200">รายได้รายวัน</p>
          <h2 className="text-3xl font-bold">{financialSummary.dailyRevenue} ฿</h2>
        </div>
        <div className="bg-gradient-to-br from-blue-800 to-blue-700 rounded-2xl p-6 border border-blue-600 text-white shadow-xl hover:scale-105 transition-all duration-300">
          <p className="text-blue-200">รายได้รายเดือน</p>
          <h2 className="text-3xl font-bold">{financialSummary.monthlyRevenue} ฿</h2>
        </div>
        <div className="bg-gradient-to-br from-purple-800 to-purple-700 rounded-2xl p-6 border border-purple-600 text-white shadow-xl hover:scale-105 transition-all duration-300">
          <p className="text-purple-200">กำไรสุทธิ</p>
          <h2 className="text-3xl font-bold">{financialSummary.totalProfit} ฿</h2>
        </div>
        <div className="bg-gradient-to-br from-orange-800 to-orange-700 rounded-2xl p-6 border border-orange-600 text-white shadow-xl hover:scale-105 transition-all duration-300">
          <p className="text-orange-200">ชั่วโมงเล่นวันนี้</p>
          <h2 className="text-3xl font-bold">{financialSummary.gamingHours}</h2>
        </div>
      </div>

      {/* ✅ Detailed Financial */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* รายได้-รายจ่าย */}
        <div className="bg-gradient-to-br from-slate-800 to-slate-700 rounded-2xl p-8 border border-slate-600 shadow-xl">
          <div className="flex items-center gap-3 mb-6">
            <div className="bg-indigo-500/20 p-2 rounded-lg">
              <BarChart3 className="text-indigo-400" size={24} />
            </div>
            <h3 className="text-2xl font-bold text-white">สรุปรายได้-รายจ่าย</h3>
          </div>

          <div className="space-y-6">
            {/* รายวัน */}
            <div className="bg-gradient-to-r from-slate-700/50 to-slate-600/30 rounded-xl p-6 border border-slate-600/50">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                <h4 className="text-lg font-bold text-white">รายวัน</h4>
              </div>
              
              <div className="space-y-4">
                <div className="flex justify-between items-center p-3 bg-green-500/10 rounded-lg border-l-4 border-green-500">
                  <span className="text-slate-300 font-medium">รายได้รวม</span>
                  <div className="text-right">
                    <span className="text-green-400 font-bold text-lg">+{financialSummary.dailyRevenue.toLocaleString()}</span>
                    <span className="text-green-300 text-sm ml-1">฿</span>
                  </div>
                </div>
                
                <div className="flex justify-between items-center p-3 bg-red-500/10 rounded-lg border-l-4 border-red-500">
                  <span className="text-slate-300 font-medium">ค่าใช้จ่าย</span>
                  <div className="text-right">
                    <span className="text-red-400 font-bold text-lg">-{financialSummary.dailyExpenses.toLocaleString()}</span>
                    <span className="text-red-300 text-sm ml-1">฿</span>
                  </div>
                </div>
                
                <hr className="border-slate-600" />
                
                <div className="flex justify-between items-center p-4 bg-gradient-to-r from-yellow-500/20 to-orange-500/20 rounded-lg border border-yellow-500/30">
                  <div className="flex items-center gap-2">
                    <TrendingUp className="text-yellow-400" size={20} />
                    <span className="text-white font-bold text-lg">กำไรสุทธิ</span>
                  </div>
                  <div className="text-right">
                    <span className="text-yellow-400 font-bold text-2xl">{financialSummary.totalProfit.toLocaleString()}</span>
                    <span className="text-yellow-300 text-sm ml-1">฿</span>
                  </div>
                </div>
              </div>
            </div>

            {/* รายเดือน */}
            <div className="bg-gradient-to-r from-slate-700/50 to-slate-600/30 rounded-xl p-6 border border-slate-600/50">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-3 h-3 bg-purple-500 rounded-full"></div>
                <h4 className="text-lg font-bold text-white">รายเดือน</h4>
              </div>
              
              <div className="space-y-4">
                <div className="flex justify-between items-center p-3 bg-green-500/10 rounded-lg border-l-4 border-green-500">
                  <span className="text-slate-300 font-medium">รายได้รวม</span>
                  <div className="text-right">
                    <span className="text-green-400 font-bold text-lg">+{financialSummary.monthlyRevenue.toLocaleString()}</span>
                    <span className="text-green-300 text-sm ml-1">฿</span>
                  </div>
                </div>
                
                <div className="flex justify-between items-center p-3 bg-red-500/10 rounded-lg border-l-4 border-red-500">
                  <span className="text-slate-300 font-medium">ค่าใช้จ่าย</span>
                  <div className="text-right">
                    <span className="text-red-400 font-bold text-lg">-{financialSummary.monthlyExpenses.toLocaleString()}</span>
                    <span className="text-red-300 text-sm ml-1">฿</span>
                  </div>
                </div>
                
                <hr className="border-slate-600" />
                
                <div className="flex justify-between items-center p-4 bg-gradient-to-r from-yellow-500/20 to-orange-500/20 rounded-lg border border-yellow-500/30">
                  <div className="flex items-center gap-2">
                    <TrendingUp className="text-yellow-400" size={20} />
                    <span className="text-white font-bold text-lg">กำไรสุทธิ</span>
                  </div>
                  <div className="text-right">
                    <span className="text-yellow-400 font-bold text-2xl">{(financialSummary.monthlyRevenue - financialSummary.monthlyExpenses).toLocaleString()}</span>
                    <span className="text-yellow-300 text-sm ml-1">฿</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
              {/* รายละเอียดรายได้ */}
        <div className="bg-gradient-to-br from-slate-800 to-slate-700 rounded-2xl p-8 border border-slate-600 shadow-xl">
          <div className="flex items-center gap-3 mb-6">
            <div className="bg-pink-500/20 p-2 rounded-lg">
              <PieChart className="text-pink-400" size={24} />
            </div>
            <h3 className="text-2xl font-bold text-white">รายละเอียดรายได้</h3>
          </div>

          <div className="space-y-6">
            {/* รายได้จากการจองโต๊ะ */}
            <div className="bg-gradient-to-r from-blue-500/10 to-blue-600/10 border-l-4 border-blue-400 p-6 rounded-lg">
              <div className="flex items-center gap-3 mb-4">
                <div className="bg-blue-500/20 p-2 rounded-lg">
                  <Monitor className="text-blue-400" size={20} />
                </div>
                <h4 className="text-blue-400 font-bold text-lg">รายได้จากการจองโต๊ะ</h4>
              </div>
              
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-slate-300">รายวัน</span>
                  <span className="text-white font-bold text-lg">
                    {(financialSummary.dailyRevenue - financialSummary.foodRevenue).toLocaleString()} ฿
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate-300">ชั่วโมงเล่น</span>
                  <span className="text-blue-300 font-semibold">{financialSummary.gamingHours} ชม.</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate-300">เฉลี่ย/ชม.</span>
                  <span className="text-green-400 font-bold">
                    {financialSummary.gamingHours > 0 
                      ? Math.round((financialSummary.dailyRevenue - financialSummary.foodRevenue) / financialSummary.gamingHours).toLocaleString()
                      : 0} ฿
                  </span>
                </div>
                <div className="flex justify-between items-center pt-2 border-t border-blue-500/30">
                  <span className="text-slate-300">% ของรายได้รวม</span>
                  <span className="text-blue-400 font-bold">
                    {financialSummary.dailyRevenue > 0
                      ? Math.round(((financialSummary.dailyRevenue - financialSummary.foodRevenue) / financialSummary.dailyRevenue) * 100)
                      : 0}%
                  </span>
                </div>
              </div>
            </div>

            {/* รายได้จากอาหาร */}
            <div className="bg-gradient-to-r from-green-500/10 to-green-600/10 border-l-4 border-green-400 p-6 rounded-lg">
              <div className="flex items-center gap-3 mb-4">
                <div className="bg-green-500/20 p-2 rounded-lg">
                  <DollarSign className="text-green-400" size={20} />
                </div>
                <h4 className="text-green-400 font-bold text-lg">รายได้จากอาหาร</h4>
              </div>
              
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-slate-300">รายวัน</span>
                  <span className="text-white font-bold text-lg">{financialSummary.foodRevenue.toLocaleString()} ฿</span>
                </div>
                <div className="flex justify-between items-center pt-2 border-t border-green-500/30">
                  <span className="text-slate-300">% ของรายได้รวม</span>
                  <span className="text-green-400 font-bold">
                    {financialSummary.dailyRevenue > 0
                      ? Math.round((financialSummary.foodRevenue / financialSummary.dailyRevenue) * 100)
                      : 0}%
                  </span>
                </div>
              </div>
            </div>

            {/* แสดง Profit Margin */}
            <div className="bg-gradient-to-r from-yellow-500/10 to-orange-500/10 border border-yellow-500/30 p-6 rounded-lg">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="bg-yellow-500/20 p-2 rounded-lg">
                    <TrendingUp className="text-yellow-400" size={20} />
                  </div>
                  <span className="text-yellow-400 font-bold">Profit Margin</span>
                </div>
                <span className="text-yellow-400 font-bold text-2xl">
                  {financialSummary.dailyRevenue > 0
                    ? Math.round((financialSummary.totalProfit / financialSummary.dailyRevenue) * 100)
                    : 0}%
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* ✅ การ์ด Users/Info */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-slate-800 rounded-xl p-6 text-white flex justify-between">
          <div>
            <p>ผู้ใช้งาน</p>
            <h2 className="text-2xl font-bold">{dashboardData.totalUsers}</h2>
            <p className="text-slate-400">คน</p>
          </div>
          <Users size={32} className="text-blue-400" />
        </div>
        <div className="bg-slate-800 rounded-xl p-6 text-white flex justify-between">
          <div>
            <p>เกมยอดนิยม</p>
            <h2 className="text-2xl font-bold">50+</h2>
            <p className="text-slate-400">เกม</p>
          </div>
          <Monitor size={32} className="text-green-400" />
        </div>
        <div className="bg-slate-800 rounded-xl p-6 text-white flex justify-between">
          <div>
            <p>เปิดบริการ</p>
            <h2 className="text-2xl font-bold">24/7</h2>
            <p className="text-slate-400">ชั่วโมง</p>
          </div>
          <Clock size={32} className="text-purple-400" />
        </div>
        <div className="bg-slate-800 rounded-xl p-6 text-white flex justify-between">
          <div>
            <p>ราคาเริ่มต้น</p>
            <h2 className="text-2xl font-bold">144Hz</h2>
            <p className="text-slate-400">จอภาพ</p>
          </div>
          <Monitor size={32} className="text-yellow-400" />
        </div>
      </div>

      {/* ✅ Promotion */}
      <div className="bg-slate-800 rounded-xl p-6 shadow-xl">
        <div className="flex items-center gap-3 mb-6">
          <div className="bg-red-500/20 p-2 rounded-lg">
            <Bell className="text-red-400" size={24} />
          </div>
          <h3 className="text-2xl font-bold text-white">📢 ข่าวสาร / โปรโมชั่น</h3>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="relative">
            <img
              src="/img/promo.jpg"
              alt="Promo"
              className="w-full h-64 object-cover rounded-lg"
            />
            <div className="absolute bottom-4 left-4 bg-black/60 px-4 py-2 rounded-lg">
              <h4 className="font-bold text-lg text-white">เซ็ตอัพเกมมิ่งใหม่!</h4>
              <p className="text-slate-200 text-sm">อัพเกรดเครื่องใหม่ล่าสุด</p>
            </div>
          </div>
          <div className="bg-blue-500/10 border-l-4 border-blue-400 p-4 rounded-lg">
            <h4 className="text-blue-400 font-bold">💰 ราคาเล่นต่อชั่วโมง</h4>
            <div className="mt-3 space-y-2">
              <p className="flex justify-between text-white">
                🕐 1 ชั่วโมง <span>50 บาท</span>
              </p>
              <p className="flex justify-between text-white">
                🕒 3 ชั่วโมง{" "}
                <span>
                  100 บาท <span className="text-green-400 text-sm">(ประหยัด 50฿)</span>
                </span>
              </p>
              <p className="flex justify-between text-white">
                🕔 5 ชั่วโมง{" "}
                <span>
                  230 บาท <span className="text-green-400 text-sm">(ประหยัด 20฿)</span>
                </span>
              </p>
            </div>
          </div>
        </div>
      </div>


      <div className="bg-slate-800 rounded-xl p-6 shadow-xl">
        <div className="flex items-center gap-3 mb-6">
          <div className="bg-pink-500/20 p-2 rounded-lg">
            <TrendingUp className="text-pink-400" size={24} />
          </div>
          <h3 className="text-2xl font-bold text-white">🎮 เกมยอดนิยม</h3>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {[
            { name: "Roblox", img: "/img/roblox1.jpg" },
            { name: "Valorant", img: "/img/valo.jpg" },
            { name: "League of Legends", img: "/img/lol.jpg" },
            { name: "Counter-Strike", img: "/img/csgo.jpg" },
          ].map((game, index) => (
            <div
              key={index}
              className="group cursor-pointer transform hover:scale-105 transition-all duration-300"
            >
              <div className="bg-slate-700 rounded-xl p-4 hover:bg-slate-600 transition-colors">
                <div className="w-full h-24 rounded-lg mb-3 overflow-hidden">
                  <img
                    src={game.img}
                    alt={game.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <h4 className="text-white font-semibold text-center">{game.name}</h4>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ✅ กิจกรรมล่าสุด */}
      <div className="bg-slate-800 rounded-xl p-6 shadow-xl">
        <h3 className="text-xl font-bold text-white mb-4">📌 กิจกรรมล่าสุด</h3>
        <div className="space-y-3">
          {dashboardData.activities.length > 0 ? (
            dashboardData.activities.map((activity, idx) => (
              <div key={idx} className="bg-slate-700 p-3 rounded-lg">
                <p className="text-white">
                  {activity.user} - {activity.action}
                </p>
                <p className="text-slate-400 text-sm">{activity.time}</p>
              </div>
            ))
          ) : (
            <p className="text-slate-400">ไม่มีข้อมูลกิจกรรม</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default DashboardView;

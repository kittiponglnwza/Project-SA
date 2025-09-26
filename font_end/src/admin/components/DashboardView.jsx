// components/DashboardView.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Users, Monitor, Clock, TrendingUp, Bell, DollarSign, Calendar, PieChart, BarChart3 } from 'lucide-react';

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
      totalProfit: 0
    }
  });

  // ✅ คำนวณข้อมูลทางการเงิน
  const calculateFinancialData = (bookings, orders = []) => {
    const today = new Date();
    const startOfDay = new Date(today.setHours(0, 0, 0, 0));
    const startOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);

    // รายได้จากการจองเล่นเกม
    const todayBookings = bookings.filter(b => new Date(b.date) >= startOfDay);
    const monthBookings = bookings.filter(b => new Date(b.date) >= startOfMonth);

    const dailyGamingRevenue = todayBookings.reduce((sum, b) => sum + (b.totalPrice || 0), 0);
    const monthlyGamingRevenue = monthBookings.reduce((sum, b) => sum + (b.totalPrice || 0), 0);

    // รายได้จากอาหาร (ถ้ามี orders API)
    const todayOrders = orders.filter(o => new Date(o.date) >= startOfDay);
    const monthOrders = orders.filter(o => new Date(o.date) >= startOfMonth);

    const dailyFoodRevenue = todayOrders.reduce((sum, o) => sum + (o.totalPrice || 0), 0);
    const monthlyFoodRevenue = monthOrders.reduce((sum, o) => sum + (o.totalPrice || 0), 0);

    // รวมรายได้
    const dailyRevenue = dailyGamingRevenue + dailyFoodRevenue;
    const monthlyRevenue = monthlyGamingRevenue + monthlyFoodRevenue;

    // ค่าใช้จ่าย (ประมาณการ)
    const dailyExpenses = Math.round(dailyRevenue * 0.3); // 30% ของรายได้
    const monthlyExpenses = Math.round(monthlyRevenue * 0.3);

    // ชั่วโมงการเล่น
    const gamingHours = todayBookings.reduce((sum, b) => sum + (b.hours || 1), 0);

    return {
      dailyRevenue,
      monthlyRevenue,
      dailyExpenses,
      monthlyExpenses,
      gamingHours,
      foodRevenue: dailyFoodRevenue,
      totalProfit: dailyRevenue - dailyExpenses
    };
  };

  // ✅ โหลดข้อมูลจาก backend
  const fetchDashboardData = async () => {
    try {
      // ดึง users
      const usersRes = await axios.get("http://localhost:3000/users");
      const totalUsers = usersRes.data.length;

      // ดึงกิจกรรมล่าสุดจาก bookings
      const bookingsRes = await axios.get("http://localhost:3000/bookings");
      const bookings = bookingsRes.data;

      // ดึงข้อมูล orders (ถ้ามี API)
      let orders = [];
      try {
        const ordersRes = await axios.get("http://localhost:3000/orders");
        orders = ordersRes.data;
      } catch (err) {
        console.log("Orders API not available");
      }

      const activities = bookings
        .map(b => ({
          user: b.user?.name || "ไม่ทราบชื่อ",
          action: `จองโต๊ะ ${b.seat?.zone}${b.seat?.id}`,
          time: new Date(b.date).toLocaleString("th-TH"),
        }))
        .reverse()
        .slice(0, 3);

      // คำนวณข้อมูลทางการเงิน
      const financialSummary = calculateFinancialData(bookings, orders);

      setDashboardData({
        totalUsers,
        activities,
        financialSummary
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
          <h1 className="text-4xl font-bold text-white mb-2">ยินดีต้อนรับสู่ Easy Game</h1>
          <p className="text-slate-300">เพลิดเพลินกับการเล่นเกมในบรรยากาศที่ดีที่สุด</p>
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

      {/* Financial Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* รายได้รายวัน */}
        <div className="bg-gradient-to-br from-green-800 to-green-700 rounded-2xl p-6 border border-green-600 shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-green-200 text-sm font-medium">รายได้รายวัน</p>
              <p className="text-3xl font-bold text-white">₿{financialSummary.dailyRevenue.toLocaleString()}</p>
              <p className="text-green-300 text-sm">บาท</p>
            </div>
            <div className="bg-green-500/20 p-3 rounded-full">
              <DollarSign className="text-green-400" size={32} />
            </div>
          </div>
        </div>

        {/* รายได้รายเดือน */}
        <div className="bg-gradient-to-br from-blue-800 to-blue-700 rounded-2xl p-6 border border-blue-600 shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-blue-200 text-sm font-medium">รายได้รายเดือน</p>
              <p className="text-3xl font-bold text-white">₿{financialSummary.monthlyRevenue.toLocaleString()}</p>
              <p className="text-blue-300 text-sm">บาท</p>
            </div>
            <div className="bg-blue-500/20 p-3 rounded-full">
              <Calendar className="text-blue-400" size={32} />
            </div>
          </div>
        </div>

        {/* กำไรสุทธิ */}
        <div className="bg-gradient-to-br from-purple-800 to-purple-700 rounded-2xl p-6 border border-purple-600 shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-purple-200 text-sm font-medium">กำไรสุทธิวันนี้</p>
              <p className="text-3xl font-bold text-white">₿{financialSummary.totalProfit.toLocaleString()}</p>
              <p className="text-purple-300 text-sm">บาท</p>
            </div>
            <div className="bg-purple-500/20 p-3 rounded-full">
              <TrendingUp className="text-purple-400" size={32} />
            </div>
          </div>
        </div>

        {/* ชั่วโมงการเล่นวันนี้ */}
        <div className="bg-gradient-to-br from-orange-800 to-orange-700 rounded-2xl p-6 border border-orange-600 shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-orange-200 text-sm font-medium">ชั่วโมงเล่นวันนี้</p>
              <p className="text-3xl font-bold text-white">{financialSummary.gamingHours}</p>
              <p className="text-orange-300 text-sm">ชั่วโมง</p>
            </div>
            <div className="bg-orange-500/20 p-3 rounded-full">
              <Clock className="text-orange-400" size={32} />
            </div>
          </div>
        </div>
      </div>

      {/* Detailed Financial Summary */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* รายละเอียดรายได้-รายจ่าย */}
        <div className="bg-gradient-to-br from-slate-800 to-slate-700 rounded-2xl p-8 border border-slate-600 shadow-xl">
          <div className="flex items-center gap-3 mb-6">
            <div className="bg-indigo-500/20 p-2 rounded-lg">
              <BarChart3 className="text-indigo-400" size={24} />
            </div>
            <h3 className="text-2xl font-bold text-white">📊 สรุปรายได้-รายจ่าย</h3>
          </div>

          <div className="space-y-4">
            {/* รายวัน */}
            <div className="bg-slate-700/50 rounded-xl p-4">
              <h4 className="text-lg font-bold text-white mb-3">📅 รายวัน</h4>
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-slate-300">รายได้รวม</span>
                  <span className="text-green-400 font-bold">+{financialSummary.dailyRevenue.toLocaleString()} ฿</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate-300">ค่าใช้จ่าย</span>
                  <span className="text-red-400 font-bold">-{financialSummary.dailyExpenses.toLocaleString()} ฿</span>
                </div>
                <hr className="border-slate-600" />
                <div className="flex justify-between items-center">
                  <span className="text-white font-bold">กำไรสุทธิ</span>
                  <span className="text-yellow-400 font-bold">{financialSummary.totalProfit.toLocaleString()} ฿</span>
                </div>
              </div>
            </div>

            {/* รายเดือน */}
            <div className="bg-slate-700/50 rounded-xl p-4">
              <h4 className="text-lg font-bold text-white mb-3">📈 รายเดือน</h4>
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-slate-300">รายได้รวม</span>
                  <span className="text-green-400 font-bold">+{financialSummary.monthlyRevenue.toLocaleString()} ฿</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate-300">ค่าใช้จ่าย</span>
                  <span className="text-red-400 font-bold">-{financialSummary.monthlyExpenses.toLocaleString()} ฿</span>
                </div>
                <hr className="border-slate-600" />
                <div className="flex justify-between items-center">
                  <span className="text-white font-bold">กำไรสุทธิ</span>
                  <span className="text-yellow-400 font-bold">{(financialSummary.monthlyRevenue - financialSummary.monthlyExpenses).toLocaleString()} ฿</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* รายละเอียดค่าใช้จ่าย */}
        <div className="bg-gradient-to-br from-slate-800 to-slate-700 rounded-2xl p-8 border border-slate-600 shadow-xl">
          <div className="flex items-center gap-3 mb-6">
            <div className="bg-pink-500/20 p-2 rounded-lg">
              <PieChart className="text-pink-400" size={24} />
            </div>
            <h3 className="text-2xl font-bold text-white">💰 รายละเอียดรายได้</h3>
          </div>

          <div className="space-y-4">
            {/* รายได้จากเกม */}
            <div className="bg-blue-500/10 border-l-4 border-blue-400 p-4 rounded-lg">
              <h4 className="text-blue-400 font-bold mb-2">🎮 รายได้จากเกม</h4>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-slate-300">รายวัน</span>
                  <span className="text-white font-bold">{(financialSummary.dailyRevenue - financialSummary.foodRevenue).toLocaleString()} ฿</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-300">ชั่วโมงเล่น</span>
                  <span className="text-blue-300">{financialSummary.gamingHours} ชม.</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-300">เฉลี่ย/ชม.</span>
                  <span className="text-green-400 font-bold">
                    {financialSummary.gamingHours > 0 
                      ? Math.round((financialSummary.dailyRevenue - financialSummary.foodRevenue) / financialSummary.gamingHours).toLocaleString()
                      : 0} ฿
                  </span>
                </div>
              </div>
            </div>

            {/* รายได้จากอาหาร */}
            <div className="bg-green-500/10 border-l-4 border-green-400 p-4 rounded-lg">
              <h4 className="text-green-400 font-bold mb-2">🍕 รายได้จากอาหาร</h4>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-slate-300">รายวัน</span>
                  <span className="text-white font-bold">{financialSummary.foodRevenue.toLocaleString()} ฿</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-300">% ของรายได้รวม</span>
                  <span className="text-green-300">
                    {financialSummary.dailyRevenue > 0 
                      ? Math.round((financialSummary.foodRevenue / financialSummary.dailyRevenue) * 100)
                      : 0}%
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Original Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-gradient-to-br from-slate-800 to-slate-700 rounded-2xl p-6 border border-slate-600 shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-slate-400 text-sm font-medium">ผู้ใช้งาน</p>
              <p className="text-3xl font-bold text-white">{dashboardData.totalUsers}</p>
              <p className="text-blue-400 text-sm">คน</p>
            </div>
            <div className="bg-blue-500/20 p-3 rounded-full">
              <Users className="text-blue-400" size={32} />
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-slate-800 to-slate-700 rounded-2xl p-6 border border-slate-600 shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-slate-400 text-sm font-medium">เกมยอดนิยม</p>
              <p className="text-3xl font-bold text-white">50+</p>
              <p className="text-green-400 text-sm">เกม</p>
            </div>
            <div className="bg-green-500/20 p-3 rounded-full">
              <Monitor className="text-green-400" size={32} />
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-slate-800 to-slate-700 rounded-2xl p-6 border border-slate-600 shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-slate-400 text-sm font-medium">เปิดบริการ</p>
              <p className="text-3xl font-bold text-white">24/7</p>
              <p className="text-purple-400 text-sm">ชั่วโมง</p>
            </div>
            <div className="bg-purple-500/20 p-3 rounded-full">
              <Clock className="text-purple-400" size={32} />
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-slate-800 to-slate-700 rounded-2xl p-6 border border-slate-600 shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-slate-400 text-sm font-medium">ราคาเริ่มต้น</p>
              <p className="text-3xl font-bold text-white">144Hz</p>
              <p className="text-yellow-400 text-sm">จอภาพ</p>
            </div>
            <div className="bg-yellow-500/20 p-3 rounded-full">
              <Monitor className="text-yellow-400" size={32} />
            </div>
          </div>
        </div>
      </div>

      {/* News & Promo */}
      <div className="bg-gradient-to-br from-slate-800 to-slate-700 rounded-2xl p-8 border border-slate-600 shadow-xl">
        <div className="flex items-center gap-3 mb-6">
          <div className="bg-red-500/20 p-2 rounded-lg">
            <Bell className="text-red-400" size={24} />
          </div>
          <h3 className="text-2xl font-bold text-white">📢 ข่าวสาร / โปรโมชั่น</h3>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="relative">
            <div className="w-full h-64 rounded-xl overflow-hidden">
              <img src="/img/promo.jpg" alt="Gaming Setup" className="w-full h-full object-cover" />
            </div>
            <div className="absolute bottom-4 left-4 bg-black/60 px-4 py-2 rounded-lg">
              <h4 className="font-bold text-lg text-white">เซ็ตอัพเกมมิ่งใหม่!</h4>
              <p className="text-slate-200 text-sm">อัพเกรดเครื่องใหม่ล่าสุด</p>
            </div>
          </div>

          <div className="space-y-4">
            <div className="bg-blue-500/10 border-l-4 border-blue-400 p-4 rounded-lg">
              <h4 className="text-blue-400 font-bold">💰 ราคาเล่นต่อชั่วโมง</h4>
              <div className="space-y-2 mt-3">
                <div className="flex items-center justify-between">
                  <span className="text-slate-300">🕐 1 ชั่วโมง</span>
                  <span className="text-white font-bold">50 บาท</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-300">🕒 3 ชั่วโมง</span>
                  <span className="text-white font-bold">
                    100 บาท <span className="text-green-400 text-sm">(ประหยัด 50฿)</span>
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-300">🕔 5 ชั่วโมง</span>
                  <span className="text-white font-bold">
                    230 บาท <span className="text-green-400 text-sm">(ประหยัด 20฿)</span>
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Popular Games */}
      <div className="bg-gradient-to-br from-slate-800 to-slate-700 rounded-2xl p-8 border border-slate-600 shadow-xl">
        <div className="flex items-center gap-3 mb-6">
          <div className="bg-pink-500/20 p-2 rounded-lg">
            <TrendingUp className="text-pink-400" size={24} />
          </div>
          <h3 className="text-2xl font-bold text-white">🎮 เกมยอดนิยม</h3>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {[
            { name: 'Roblox', img: '/img/roblox1.jpg' },
            { name: 'Valorant', img: '/img/valo.jpg' },
            { name: 'League of Legends', img: '/img/lol.jpg' },
            { name: 'Counter-Strike', img: '/img/csgo.jpg' },
          ].map((game, index) => (
            <div key={index} className="group cursor-pointer transform hover:scale-105 transition-all duration-300">
              <div className="bg-slate-700 rounded-xl p-4 hover:bg-slate-600 transition-colors">
                <div className="w-full h-24 rounded-lg mb-3 overflow-hidden">
                  <img src={game.img} alt={game.name} className="w-full h-full object-cover" />
                </div>
                <h4 className="text-white font-semibold text-center">{game.name}</h4>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Activities */}
      <div className="bg-gradient-to-br from-slate-800 to-slate-700 rounded-2xl p-8 border border-slate-600 shadow-xl">
        <h3 className="text-xl font-bold text-white mb-6">กิจกรรมล่าสุด</h3>
        <div className="space-y-4">
          {dashboardData.activities.length > 0 ? (
            dashboardData.activities.map((activity, index) => (
              <div
                key={index}
                className="flex items-center space-x-4 p-4 bg-slate-700/50 rounded-xl hover:bg-slate-700 transition-colors"
              >
                <div className="bg-blue-500/20 p-2 rounded-full" />
                <div className="flex-1">
                  <p className="text-white font-medium">
                    {activity.user} {activity.action}
                  </p>
                  <p className="text-slate-400 text-sm">{activity.time}</p>
                </div>
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
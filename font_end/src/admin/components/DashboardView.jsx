import React from 'react';
import { Users, Monitor, Clock, TrendingUp, Bell } from 'lucide-react';

const DashboardView = ({ dashboardData, onRefresh }) => (
  <div className="space-y-8">
    <div className="flex justify-between items-center">
      <div>
        <h1 className="text-4xl font-bold text-white mb-2">ยินดีต้อนรับสู่ Easy Game</h1>
        <p className="text-slate-300">เพลิดเพลินกับการเล่นเกมในบรรยากาศที่ดีที่สุด</p>
      </div>

      <button
        onClick={onRefresh}
        className="bg-blue-600 hover:bg-blue-700 px-6 py-3 rounded-xl flex items-center gap-3 transition-all duration-200 shadow-lg hover:shadow-xl"
      >
        {/* Icon handled by parent previously; keep consistent button */}
        รีเฟรช
      </button>
    </div>

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
                <span className="text-white font-bold">100 บาท <span className="text-green-400 text-sm">(ประหยัด 50฿)</span></span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-300">🕔 5 ชั่วโมง</span>
                <span className="text-white font-bold">230 บาท <span className="text-green-400 text-sm">(ประหยัด 20฿)</span></span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

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

    <div className="bg-gradient-to-br from-slate-800 to-slate-700 rounded-2xl p-8 border border-slate-600 shadow-xl">
      <h3 className="text-xl font-bold text-white mb-6">กิจกรรมล่าสุด</h3>
      <div className="space-y-4">
        {[
          { user: 'นิรันดร์ ใจดี', action: 'จองที่นั่ง A1', time: '2 นาทีที่แล้ว' },
          { user: 'สุภาพร สมมติ', action: 'สั่งอาหาร', time: '5 นาทีที่แล้ว' },
          { user: 'อานนท์ เล่นเกม', action: 'เล่นเกมเสร็จสิ้น', time: '10 นาทีที่แล้ว' },
        ].map((activity, index) => (
          <div key={index} className="flex items-center space-x-4 p-4 bg-slate-700/50 rounded-xl hover:bg-slate-700 transition-colors">
            <div className="bg-blue-500/20 p-2 rounded-full" />
            <div className="flex-1">
              <p className="text-white font-medium">
                {activity.user} {activity.action}
              </p>
              <p className="text-slate-400 text-sm">{activity.time}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  </div>
);

export default DashboardView;


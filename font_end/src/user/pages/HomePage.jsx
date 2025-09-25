// pages/HomePage.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Users, Gamepad2, Clock, Monitor } from 'lucide-react';

// Import รูปภาพ
import EldenRingImg from "/photo/elden.jpg";
import FifaImg from "/photo/fifa.jpg";
import ValoImg from "/photo/valo.jpg";
import RobloxImg from "/photo/roblox.jpg";
import LolImg from "/photo/lol.jpg";
import CsgoImg from "/photo/csgo.jpg";
import MinecraftImg from "/photo/minecraft.jpg";
import PromoImg from "/photo/promo.jpg";
import BlackmythImg from "/photo/blackmyth.jpg";

const HomePage = () => {
  const [availableSeats, setAvailableSeats] = useState(0);
  const [totalSeats, setTotalSeats] = useState(0);
  const [selectedGame, setSelectedGame] = useState(null);

  // ✅ โหลดโต๊ะจาก backend
  const fetchSeats = async () => {
    try {
      const res = await axios.get("http://localhost:3000/seats");
      const seats = res.data;

      setTotalSeats(seats.length);

      // ✅ นับเฉพาะ status = AVAILABLE
      const availableCount = seats.filter((s) => s.status === "AVAILABLE").length;
      setAvailableSeats(availableCount);
    } catch (err) {
      console.error("Error fetching seats:", err);
    }
  };

  useEffect(() => {
    fetchSeats();
    const interval = setInterval(fetchSeats, 5000); // refresh ทุก 5 วิ
    return () => clearInterval(interval);
  }, []);

  // ข้อมูลเกม
  const games = [
    { name: "Elden Ring", players: "12 คนกำลังเล่น", icon: "🎮", image: EldenRingImg },
    { name: "FIFA 24", players: "8 คนกำลังเล่น", icon: "⚽", image: FifaImg },
    { name: "Valorant", players: "15 คนกำลังเล่น", icon: "🔫", image: ValoImg },
    { name: "Roblox", players: "20 คนกำลังเล่น", icon: "🧱", image: RobloxImg },
    { name: "League of Legends", players: "18 คนกำลังเล่น", icon: "⚔️", image: LolImg },
    { name: "Counter Strike 2", players: "10 คนกำลังเล่น", icon: "💣", image: CsgoImg },
    { name: "Minecraft", players: "25 คนกำลังเล่น", icon: "⛏️", image: MinecraftImg },
    { name: "Black Myth: Wukong", players: "40 คนกำลังเล่น", icon: "🐒", image: BlackmythImg },
  ];

  const images = { promo: PromoImg };

  // เลือกเกม
  const handleGameSelect = (gameName) => {
    setSelectedGame(gameName);
    setTimeout(() => {
      setSelectedGame(null);
      alert(`🎮 เลือกเกม: ${gameName}\n\nคลิก "จองโต๊ะ" เพื่อเริ่มเล่น!`);
    }, 200);
  };

  // Particle Effect
  const createParticles = () => {
    return Array.from({ length: 50 }, (_, i) => (
      <div
        key={i}
        className="particle"
        style={{
          left: `${Math.random() * 100}%`,
          animationDelay: `${Math.random() * 6}s`,
          animationDuration: `${Math.random() * 3 + 3}s`,
        }}
      />
    ));
  };

  return (
    <div className="min-h-screen relative overflow-hidden">
      <style jsx>{`
        .particle {
          position: fixed;
          width: 2px;
          height: 2px;
          background: #4299e1;
          border-radius: 50%;
          opacity: 0.3;
          pointer-events: none;
          z-index: 0;
          animation: float 6s infinite linear;
        }

        @keyframes float {
          0% {
            transform: translateY(100vh) translateX(0);
            opacity: 0;
          }
          10% {
            opacity: 0.3;
          }
          90% {
            opacity: 0.3;
          }
          100% {
            transform: translateY(-100px) translateX(100px);
            opacity: 0;
          }
        }
      `}</style>

      {/* Particles */}
      <div className="fixed inset-0 pointer-events-none z-0">{createParticles()}</div>

      <div className="relative z-10">
        {/* Welcome Section */}
        <div className="bg-slate-700/60 p-8 rounded-2xl mb-8 border border-white/10 text-center">
          <h1 className="text-3xl font-bold mb-3 bg-gradient-to-r from-blue-400 to-green-400 bg-clip-text text-transparent">
            ยินดีต้อนรับสู่ Easy Game
          </h1>
          <p className="text-slate-300 text-lg">
            เพลิดเพลินกับการเล่นเกมในสภาพแวดล้อมที่สมบูรณ์แบบ
          </p>
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
          {[
            { number: availableSeats, label: "โต๊ะว่าง", icon: <Users className="text-blue-400" size={24} /> },
            { number: totalSeats, label: "โต๊ะทั้งหมด", icon: <Monitor className="text-orange-400" size={24} /> },
            { number: "50+", label: "เกมยอดนิยม", icon: <Gamepad2 className="text-green-400" size={24} /> },
            { number: "24/7", label: "เปิดบริการ", icon: <Clock className="text-purple-400" size={24} /> },
          ].map((stat, index) => (
            <div
              key={index}
              className="bg-slate-700/80 p-6 rounded-2xl border border-white/10 text-center"
            >
              <div className="flex justify-center mb-2">{stat.icon}</div>
              <div className="text-3xl font-bold text-blue-400 mb-1">{stat.number}</div>
              <div className="text-slate-400 text-sm">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* News Section */}
        <section className="mb-12 fade-in">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-1 h-8 bg-gradient-to-b from-blue-400 to-blue-600 rounded-full"></div>
            <h2 className="text-3xl font-bold text-white">📢 ข่าวสาร / โปรโมชั่น</h2>
          </div>

          <div className="bg-slate-700/95 backdrop-blur-lg rounded-3xl p-8 border border-white/10 shadow-2xl">
            <div className="grid lg:grid-cols-2 gap-8 items-center">
              {/* รูปโปรโมชั่น */}
              <div className="relative group">
                <img
                  src={images.promo}
                  alt="Promotion"
                  className="w-full h-72 object-cover rounded-2xl shadow-lg transition-transform duration-300 group-hover:scale-105"
                />
              </div>

              {/* ราคาต่อชั่วโมง */}
              <div>
                <h3 className="text-2xl font-bold mb-6 bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent">
                  💰 ราคาเล่นต่อชั่วโมง
                </h3>
                <div className="space-y-4">
                  {[
                    { time: "🕐 1 ชั่วโมง", price: "50 บาท" },
                    { time: "🕘 3 ชั่วโมง", price: "100 บาท (ประหยัด 50฿)" },
                    { time: "🕔 5 ชั่วโมง", price: "230 บาท (ประหยัด 20฿)" },
                  ].map((item, index) => (
                    <div
                      key={index}
                      className="bg-blue-500/10 border border-blue-400/30 border-l-4 border-l-blue-400 p-5 rounded-xl text-slate-200 shadow-sm hover:shadow-md hover:bg-blue-500/15 hover:translate-x-2 transition-all"
                    >
                      <span className="font-medium text-lg">{item.time}</span>
                      <span className="ml-2 text-blue-300">{item.price}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Games Section */}
        <section>
          <h2 className="text-3xl font-bold text-white mb-6">🎯 เกมยอดนิยม</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
            {games.map((game, index) => (
              <div
                key={index}
                onClick={() => handleGameSelect(game.name)}
                className="cursor-pointer overflow-hidden rounded-2xl bg-slate-800/60 shadow-md hover:shadow-xl hover:scale-105"
              >
                <img src={game.image} alt={game.name} className="w-full h-48 object-cover" />
                <div className="p-3 text-white">
                  <div className="font-bold">{game.name}</div>
                  <div className="text-sm opacity-80">{game.players}</div>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default HomePage;

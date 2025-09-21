// pages/HomePage.jsx
import React, { useState } from 'react';
import { Users, Gamepad2, Clock, Monitor } from 'lucide-react';

// Import รูปภาพ
import EldenRingImg from "../photo/elden.jpg";
import FifaImg from "../photo/fifa.jpg";
import ValoImg from "../photo/valo.jpg";
import RobloxImg from "../photo/roblox.jpg";
import LolImg from "../photo/lol.jpg";
import CsgoImg from "../photo/csgo.jpg";
import MinecraftImg from "../photo/minecraft.jpg";
import PromoImg from "../photo/promo.jpg";
import BlackmythImg from "../photo/blackmyth.jpg";


const HomePage = ({ availableSeats }) => {
  const [selectedGame, setSelectedGame] = useState(null);

  // Games data
  const games = [
    { name: 'Elden Ring', players: '12 คนกำลังเล่น', icon: '🎮', image: EldenRingImg },
    { name: 'FIFA 24', players: '8 คนกำลังเล่น', icon: '⚽', image: FifaImg },
    { name: 'Valorant', players: '15 คนกำลังเล่น', icon: '🔫', image: ValoImg },
    { name: 'Roblox', players: '20 คนกำลังเล่น', icon: '🧱', image: RobloxImg },
    { name: 'League of Legends', players: '18 คนกำลังเล่น', icon: '⚔️', image: LolImg },
    { name: 'Counter Strike 2', players: '10 คนกำลังเล่น', icon: '💣', image: CsgoImg },
    { name: 'Minecraft', players: '25 คนกำลังเล่น', icon: '⛏️', image: MinecraftImg },
    { name: 'Black Myth: Wukong', players: '40 คนกำลังเล่น', icon: '⛏️', image: BlackmythImg },
  ];

  // รูปภาพ
  const images = {
    promo: PromoImg
  };

  // Handle game select
  const handleGameSelect = (gameName) => {
    setSelectedGame(gameName);
    setTimeout(() => {
      setSelectedGame(null);
      alert(`🎮 เลือกเกม: ${gameName}\n\nคลิก "จองโต๊ะ" เพื่อเริ่มเล่น!`);
    }, 200);
  };

  // Particle system
  const createParticles = () => {
    return Array.from({ length: 50 }, (_, i) => (
      <div
        key={i}
        className="particle"
        style={{
          left: `${Math.random() * 100}%`,
          animationDelay: `${Math.random() * 6}s`,
          animationDuration: `${Math.random() * 3 + 3}s`
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
        
        .fade-in {
          animation: fadeInUp 0.6s ease forwards;
        }
        
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .game-overlay {
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          background: linear-gradient(transparent, rgba(0,0,0,0.8));
          color: white;
          padding: 20px;
          transform: translateY(100%);
          transition: transform 0.3s ease;
        }
        
        .game:hover .game-overlay {
          transform: translateY(0);
        }
        
        .shimmer {
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent);
          transition: left 0.5s;
        }
        
        .hover\\:shimmer:hover .shimmer {
          left: 100%;
        }
      `}</style>

      {/* Particles */}
      <div className="fixed inset-0 pointer-events-none z-0">
        {createParticles()}
      </div>

      <div className="relative z-10">
        {/* Welcome Section */}
        <div className="bg-slate-700/60 backdrop-blur-sm p-8 rounded-2xl mb-8 border border-white/10 text-center fade-in">
          <h1 className="text-3xl font-bold mb-3 bg-gradient-to-r from-blue-400 to-green-400 bg-clip-text text-transparent">
            🎮 ยินดีต้อนรับสู่ Easy Game
          </h1>
          <p className="text-slate-300 text-lg">
            เพลิดเพลินกับการเล่นเกมในสภาพแวดล้อมที่สมบูรณ์แบบ
          </p>
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-5 mb-8 fade-in">
          {[
            { number: availableSeats, label: 'โต๊ะว่าง', icon: <Users className="text-blue-400" size={24} /> },
            { number: '50+', label: 'เกมยอดนิยม', icon: <Gamepad2 className="text-green-400" size={24} /> },
            { number: '24/7', label: 'เปิดบริการ', icon: <Clock className="text-purple-400" size={24} /> },
            { number: '144Hz', label: 'จอเกมมิ่ง', icon: <Monitor className="text-orange-400" size={24} /> }
          ].map((stat, index) => (
            <div key={index} className="bg-slate-700/80 backdrop-blur-sm p-6 rounded-2xl border border-white/10 text-center transition-all duration-300 hover:transform hover:-translate-y-2 hover:shadow-xl hover:shadow-blue-500/20">
              <div className="flex justify-center mb-2">
                {stat.icon}
              </div>
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

          <div className="bg-slate-700/95 backdrop-blur-lg rounded-3xl p-8 border border-white/10 shadow-2xl transition-all duration-300 hover:transform hover:-translate-y-2 hover:shadow-blue-500/20 hover:shimmer relative overflow-hidden">
            <div className="shimmer"></div>
            <div className="grid lg:grid-cols-2 gap-8 items-center">
              <div className="relative group">
                <img
                  src={images.promo}
                  alt="Promotion"
                  className="w-full h-48 object-cover rounded-2xl shadow-lg transition-transform duration-300 group-hover:scale-105"
                  onError={(e) => {
                    e.target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAwIiBoZWlnaHQ9IjIwMCIgdmlld0JveD0iMCAwIDMwMCAyMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIzMDAiIGhlaWdodD0iMjAwIiBmaWxsPSIjMmQzNzQ4Ii8+CjxyZWN0IHg9IjUwIiB5PSI1MCIgd2lkdGg9IjIwMCIgaGVpZ2h0PSIxMDAiIGZpbGw9IiM0Mjk5ZTEiIHJ4PSIxMCIgZmlsbC1vcGFjaXR5PSIwLjMiLz4KPHN2ZyB4PSIxMjUiIHk9Ijg1IiB3aWR0aD0iNTAiIGhlaWdodD0iMzAiIGZpbGw9IiM0Mjk5ZTEiPgogIDxwYXRoIGQ9Ik0yNSAxNVY3LjVINVYxNUgyMEwyMi41IDE3LjVMMjUgMTVaIi8+Cjwvc3ZnPgo8dGV4dCB4PSIxNTAiIHk9IjE3MCIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZmlsbD0iIzRhNWU2OCIgZm9udC1mYW1pbHk9IkFyaWFsIiBmb250LXNpemU9IjE2Ij5Qcm9tb3Rpb248L3RleHQ+Cjwvc3ZnPg==';
                  }}
                />
              </div>

              <div>
                <h3 className="text-2xl font-bold mb-6 bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent">
                  💰 ราคาเล่นต่อชั่วโมง
                </h3>
                <div className="space-y-4">
                  {[
                    { time: '🕐 1 ชั่วโมง', price: '50 บาท' },
                    { time: '🕘 3 ชั่วโมง', price: '100 บาท (ประหยัด 50฿)' },
                    { time: '🕔 5 ชั่วโมง', price: '230 บาท (ประหยัด 20฿)' }
                  ].map((item, index) => (
                    <div key={index} className="bg-blue-500/10 border border-blue-400/30 border-l-4 border-l-blue-400 p-4 rounded-xl text-slate-200 transition-all duration-300 hover:bg-blue-500/15 hover:translate-x-2">
                      <span className="font-medium">{item.time} : {item.price}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Games Section */}
        <section className="fade-in">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-1 h-8 bg-gradient-to-b from-green-400 to-green-600 rounded-full"></div>
            <h2 className="text-3xl font-bold text-white">🎯 เกมยอดนิยม</h2>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
            {games.map((game, index) => (
              <div
                key={index}
                onClick={() => handleGameSelect(game.name)}
                className="relative cursor-pointer overflow-hidden rounded-2xl border border-white/20 bg-slate-800/60 shadow-md transition-all duration-300 hover:shadow-xl hover:scale-105 hover:-translate-y-1"
              >
                {/* Image */}
                <img
                  src={game.image}
                  alt={game.name}
                  className="w-full h-48 sm:h-56 md:h-48 lg:h-52 object-cover transition-transform duration-300"
                  onError={(e) => {
                    e.target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjE4MCIgdmlld0JveD0iMCAwIDIwMCAxODAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIyMDAiIGhlaWdodD0iMTgwIiBmaWxsPSIjMmQzNzQ4Ii8+CjxyZWN0IHg9IjIwIiB5PSIyMCIgd2lkdGg9IjE2MCIgaGVpZ2h0PSIxNDAiIGZpbGw9IiM0OGJiNzgiIHJ4PSIxMCIgZmlsbC1vcGFjaXR5PSIwLjMiLz4KPHN2ZyB4PSI4NSIgeT0iNzUiIHdpZHRoPSIzMCIgaGVpZ2h0PSIzMCIgZmlsbD0iIzQ4YmI3OCI+CiAgPGNpcmNsZSBjeD0iMTUiIGN5PSIxNSIgcj0iMTAiLz4KPC9zdmc+Cjx0ZXh0IHg9IjEwMCIgeT0iMTYwIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmaWxsPSIjZTJlOGYwIiBmb250LWZhbWlseT0iQXJpYWwiIGZvbnQtc2l6ZT0iMTQiPkdhbWU8L3RleHQ+Cjwvc3ZnPg==';
                  }}
                />

                {/* Overlay */}
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4 text-white transition-opacity duration-300 opacity-0 hover:opacity-100">
                  <div className="font-bold text-lg">{game.name}</div>
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
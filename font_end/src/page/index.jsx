import React, { useState, useEffect } from 'react';
import { Menu, X, Gamepad2, Users, Clock, Monitor, Trophy, Zap } from 'lucide-react';

const EasyGameCafe = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [availableSeats, setAvailableSeats] = useState(24);
  const [selectedGame, setSelectedGame] = useState(null);

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

  // Update available seats periodically
  useEffect(() => {
    const interval = setInterval(() => {
      setAvailableSeats(prev => {
        const change = Math.random() > 0.5 ? 1 : -1;
        return Math.max(0, Math.min(30, prev + change));
      });
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const games = [
    { name: 'Elden Ring', players: '12 คนกำลังเล่น', icon: '🎮', image: 'roblox.jpeg' },
    { name: 'FIFA 24', players: '8 คนกำลังเล่น', icon: '⚽', image: 'roblox.jpeg' },
    { name: 'Valorant', players: '15 คนกำลังเล่น', icon: '🔫', image: 'roblox.jpeg' },
    { name: 'Roblox', players: '20 คนกำลังเล่น', icon: '🧩', image: 'roblox.jpeg' },
    { name: 'League of Legends', players: '18 คนกำลังเล่น', icon: '⚔️', image: 'roblox.jpeg' },
    { name: 'Counter Strike 2', players: '10 คนกำลังเล่น', icon: '💥', image: 'roblox.jpeg' },
    { name: 'Minecraft', players: '25 คนกำลังเล่น', icon: '🟫', image: 'roblox.jpeg' }
  ];

  const handleGameSelect = (gameName) => {
    setSelectedGame(gameName);
    setTimeout(() => {
      setSelectedGame(null);
      alert(`🎮 เลือกเกม: ${gameName}\n\nคลิก "จองโต๊ะ" เพื่อเริ่มเล่น!`);
    }, 200);
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-800 to-slate-700 text-slate-200 font-sans relative overflow-hidden">
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

      {/* Mobile Menu Toggle */}
      <button
        onClick={toggleSidebar}
        className="fixed top-5 left-5 z-50 bg-blue-500/90 text-white p-3 rounded-xl lg:hidden hover:bg-blue-600 transition-colors"
      >
        {isSidebarOpen ? <X size={20} /> : <Menu size={20} />}
      </button>

      <div className="flex min-h-screen relative z-10">
        {/* Sidebar */}
        <aside className={`w-72 bg-slate-800/95 backdrop-blur-lg border-r border-white/10 flex flex-col fixed h-full transition-transform duration-300 z-40 ${
          isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
        } lg:translate-x-0 shadow-2xl`}>
          
          {/* Logo */}
          <div className="text-center p-8 border-b border-white/10">
            <div className="w-44 h-44 mx-auto mb-4 rounded-2xl bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center shadow-xl">
              <Gamepad2 size={80} className="text-white" />
            </div>
          </div>

          {/* Menu */}
          <nav className="flex-1 p-5">
            <div className="space-y-2">
              {[
                { name: 'หน้าหลัก', active: true },
                { name: 'จองโต๊ะ', active: false },
                { name: 'สั่งอาหาร', active: false },
                { name: 'ประวัติการใช้งาน', active: false }
              ].map((item, index) => (
                <a
                  key={index}
                  href="#"
                  className={`block p-4 rounded-r-3xl mr-5 transition-all duration-300 relative overflow-hidden hover:shimmer ${
                    item.active 
                      ? 'bg-gradient-to-r from-blue-500 to-blue-600 text-white transform translate-x-3 shadow-lg shadow-blue-500/30' 
                      : 'text-slate-300 hover:bg-blue-500/10 hover:text-blue-400 hover:translate-x-3'
                  }`}
                >
                  <div className="shimmer"></div>
                  {item.name}
                </a>
              ))}
            </div>
          </nav>

          {/* Bottom Menu */}
          <div className="p-5 border-t border-white/10 space-y-2">
            <a href="#" className="block p-3 rounded-xl text-slate-400 hover:bg-blue-500/10 hover:text-blue-400 transition-all duration-300 hover:translate-x-2">
              Settings
            </a>
            <a href="#" className="block p-3 rounded-xl text-slate-400 hover:bg-blue-500/10 hover:text-blue-400 transition-all duration-300 hover:translate-x-2">
              Log out
            </a>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 lg:ml-72 p-6 lg:p-10">
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
                    src="roblox.jpeg" 
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
                      { time: '🕒 3 ชั่วโมง', price: '100 บาท (ประหยัด 50฿)' },
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
            
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {games.map((game, index) => (
                <div
                  key={index}
                  onClick={() => handleGameSelect(game.name)}
                  className={`game bg-slate-700/95 rounded-2xl overflow-hidden border-2 border-white/10 transition-all duration-300 cursor-pointer relative hover:transform hover:-translate-y-2 hover:scale-105 hover:shadow-xl hover:shadow-green-500/20 hover:border-green-400 ${
                    selectedGame === game.name ? 'bg-gradient-to-br from-blue-500 to-blue-600 scale-95' : ''
                  }`}
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-green-400/10 to-green-600/10 opacity-0 transition-opacity duration-300 hover:opacity-100 z-10"></div>
                  
                  <img 
                    src={game.image}
                    alt={game.name}
                    className="w-full h-32 sm:h-40 object-cover transition-all duration-300 hover:scale-110 hover:brightness-110"
                    onError={(e) => {
                      e.target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjE4MCIgdmlld0JveD0iMCAwIDIwMCAxODAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIyMDAiIGhlaWdodD0iMTgwIiBmaWxsPSIjMmQzNzQ4Ii8+CjxyZWN0IHg9IjIwIiB5PSIyMCIgd2lkdGg9IjE2MCIgaGVpZ2h0PSIxNDAiIGZpbGw9IiM0OGJiNzgiIHJ4PSIxMCIgZmlsbC1vcGFjaXR5PSIwLjMiLz4KPHN2ZyB4PSI4NSIgeT0iNzUiIHdpZHRoPSIzMCIgaGVpZ2h0PSIzMCIgZmlsbD0iIzQ4YmI3OCI+CiAgPGNpcmNsZSBjeD0iMTUiIGN5PSIxNSIgcj0iMTAiLz4KPC9zdmc+Cjx0ZXh0IHg9IjEwMCIgeT0iMTYwIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmaWxsPSIjZTJlOGYwIiBmb250LWZhbWlseT0iQXJpYWwiIGZvbnQtc2l6ZT0iMTQiPkdhbWU8L3RleHQ+Cjwvc3ZnPg==';
                    }}
                  />
                  
                  <div className="game-overlay">
                    <div className="font-bold text-lg mb-1">{game.name}</div>
                    <div className="text-sm opacity-80">{game.players}</div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </main>
      </div>

      {/* Overlay for mobile sidebar */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-30 lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}
    </div>
  );
};

export default EasyGameCafe;
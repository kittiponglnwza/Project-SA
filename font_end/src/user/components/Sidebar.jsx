// components/Sidebar.jsx
import React from 'react';
import { Home, Calendar, UtensilsCrossed, History, Settings, LogOut } from 'lucide-react';

const Sidebar = ({ 
  currentPage, 
  sidebarOpen, 
  setSidebarOpen, 
  handleNavigation, 
  logoImg 
}) => {
  return (
    <aside
      className={`
        fixed lg:static inset-y-0 left-0 z-40 w-80 
        bg-slate-900/95 backdrop-blur-xl border-r border-slate-700
        transform transition-transform duration-300 ease-in-out
        ${sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
        shadow-2xl
      `}
    >
      {/* Logo */}
      <div className="p-8 border-b border-slate-700 text-center">
        <img 
          src={logoImg} 
          alt="Easy Game Logo" 
          className="w-44 h-44 mx-auto rounded-2xl shadow-xl shadow-blue-500/20 mb-4 object-cover"
          onError={(e) => {
            e.target.style.display = 'none';
            e.target.nextSibling.style.display = 'flex';
          }}
        />
        <div className="w-44 h-44 mx-auto bg-gradient-to-br from-blue-500 to-blue-700 rounded-2xl shadow-xl shadow-blue-500/20 mb-4 items-center justify-center hidden">
          <div className="text-4xl">🎮</div>
        </div>
        <h1 className="text-xl font-bold text-blue-400">Easy Game</h1>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-6 space-y-2">
        <button 
          onClick={() => handleNavigation('home')}
          className={`w-full text-left flex items-center p-4 rounded-r-3xl transition-all duration-300 ${
            currentPage === 'home' 
              ? 'bg-gradient-to-r from-blue-500 to-blue-600 text-white translate-x-2 shadow-lg shadow-blue-500/20'
              : 'text-slate-300 hover:text-white hover:bg-gradient-to-r hover:from-blue-500 hover:to-blue-600 hover:translate-x-2'
          }`}
        >
          <Home size={20} className="mr-3" />
          หน้าหลัก
        </button>
        <button 
          onClick={() => handleNavigation('booking')}
          className={`w-full text-left flex items-center p-4 rounded-r-3xl transition-all duration-300 ${
            currentPage === 'booking' 
              ? 'bg-gradient-to-r from-blue-500 to-blue-600 text-white translate-x-2 shadow-lg shadow-blue-500/20'
              : 'text-slate-300 hover:text-white hover:bg-gradient-to-r hover:from-blue-500 hover:to-blue-600 hover:translate-x-2'
          }`}
        >
          <Calendar size={20} className="mr-3" />
          จองโต๊ะ
        </button>
        <button 
          onClick={() => handleNavigation('food')}
          className={`w-full text-left flex items-center p-4 rounded-r-3xl transition-all duration-300 ${
            currentPage === 'food' 
              ? 'bg-gradient-to-r from-blue-500 to-blue-600 text-white translate-x-2 shadow-lg shadow-blue-500/20'
              : 'text-slate-300 hover:text-white hover:bg-gradient-to-r hover:from-blue-500 hover:to-blue-600 hover:translate-x-2'
          }`}
        >
          <UtensilsCrossed size={20} className="mr-3" />
          สั่งอาหาร
        </button>
        <button 
          onClick={() => handleNavigation('history')}
          className={`w-full text-left flex items-center p-4 rounded-r-3xl transition-all duration-300 ${
            currentPage === 'history' 
              ? 'bg-gradient-to-r from-blue-500 to-blue-600 text-white translate-x-2 shadow-lg shadow-blue-500/20'
              : 'text-slate-300 hover:text-white hover:bg-gradient-to-r hover:from-blue-500 hover:to-blue-600 hover:translate-x-2'
          }`}
        >
          <History size={20} className="mr-3" />
          ประวัติการใช้งาน
        </button>
      </nav>

      {/* Bottom menu */}
      <div className="p-6 border-t border-slate-700 space-y-2">
        <a href="#" className="flex items-center p-3 rounded-xl text-slate-400 hover:text-blue-400 hover:bg-slate-800 transition-all">
          <Settings size={16} className="mr-3" />
          Settings
        </a>
        <button
          type="button"
          onClick={(e) => { e.preventDefault(); if (typeof onLogout === 'function') onLogout(); }}
          className="w-full text-left flex items-center p-3 rounded-xl text-slate-400 hover:text-red-400 hover:bg-slate-800 transition-all"
        >
          <LogOut size={16} className="mr-3" />
          Log out
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
// pages/BookingPage.jsx
import React, { useState } from 'react';
import { Crown, Users } from 'lucide-react';
import SeatCard from '../components/SeatCard';

const BookingPage = ({ seatStatus, zones, getZoneStats, handleSeatClick }) => {
  const [currentZone, setCurrentZone] = useState('A');
  const [loading, setLoading] = useState(false);

  // Handle zone change
  const handleZoneChange = (zone) => {
    setLoading(true);
    setTimeout(() => {
      setCurrentZone(zone);
      setLoading(false);
    }, 300);
  };

  const stats = getZoneStats(currentZone);

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="mb-8">
        <h2 className="text-4xl lg:text-5xl font-bold mb-2 bg-gradient-to-r from-blue-400 to-purple-600 bg-clip-text text-transparent">
          🎮 จองโต๊ะ
        </h2>
        <div className="w-20 h-1 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"></div>
      </div>

      {/* Zone Tabs */}
      <div className="flex flex-wrap gap-3 mb-8">
        {Object.keys(zones).map((zone) => (
          <button
            key={zone}
            onClick={() => handleZoneChange(zone)}
            className={`
              px-6 py-3 rounded-full font-medium transition-all duration-300 relative overflow-hidden
              ${currentZone === zone
                ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg shadow-blue-500/25'
                : 'bg-slate-800 text-slate-300 border border-slate-600 hover:border-blue-400 hover:text-blue-400 hover:-translate-y-1'
              }
            `}
          >
            Zone {zone}
          </button>
        ))}
      </div>

      {/* Zone Info */}
      <div className="bg-slate-800/60 backdrop-blur-sm rounded-2xl p-6 mb-8 border border-slate-700">
        <div className="flex justify-between items-center">
          <div className="text-lg">
            <span className="font-medium">Zone {currentZone}</span>
            <span className="mx-2">-</span>
            <span className="text-blue-400 font-medium">{stats.total} โต๊ะ</span>
          </div>
          <div className="text-green-400 font-medium">
            ✅ ว่าง {stats.available} โต๊ะ
          </div>
        </div>
      </div>

      {/* Booking Grid */}
      <div className="relative">
        {loading && (
          <div className="absolute inset-0 bg-slate-900/80 backdrop-blur-sm rounded-3xl flex items-center justify-center z-10">
            <div className="flex items-center space-x-3 text-blue-400">
              <div className="w-8 h-8 border-4 border-blue-400 border-t-transparent rounded-full animate-spin"></div>
              <span className="text-lg">กำลังโหลด...</span>
            </div>
          </div>
        )}
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 animate-in slide-in-from-bottom-4 duration-500">
          {zones[currentZone]?.map((seat) => (
            <SeatCard
              key={seat}
              seat={seat}
              status={seatStatus[seat]}
              handleSeatClick={handleSeatClick}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default BookingPage;
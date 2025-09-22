import React from 'react';
import { Users } from 'lucide-react';

const SeatCard = ({ seat, status, handleSeatClick }) => {
  const isVIP = seat.includes('VIP');
  const isRoom = seat.includes('Room');
  const isAvailable = status === 'available';
  const isMaintenance = status === 'maintenance';

  return (
    <div
      onClick={() => handleSeatClick(seat)}
      className={`
        relative cursor-pointer transform transition-all duration-300 hover:scale-105 hover:-translate-y-2
        rounded-2xl overflow-hidden shadow-xl border-2
        ${isAvailable ? 'hover:shadow-blue-500/20' : 'cursor-not-allowed opacity-75'}
        ${isVIP ? 'border-yellow-400 bg-gradient-to-br from-slate-800 to-slate-700' : ''}
        ${isRoom ? 'border-purple-400 bg-gradient-to-br from-purple-900/20 to-indigo-900/20' : ''}
        ${!isVIP && !isRoom ? 'border-slate-600 bg-slate-800' : ''}
        ${isMaintenance ? 'border-orange-400 bg-gradient-to-br from-orange-900/20 to-red-900/20' : ''}
        backdrop-blur-sm
      `}
    >
      {isVIP && (
        <div className="absolute top-3 right-3 bg-yellow-400/20 p-1 rounded-full z-20">
          <Users className="w-5 h-5 text-yellow-400 drop-shadow-lg" />
        </div>
      )}

      {isRoom && (
        <div className="absolute top-3 right-3 bg-purple-400/20 p-1 rounded-full z-20">
          <Users className="w-5 h-5 text-purple-400 drop-shadow-lg" />
        </div>
      )}

      <div className="relative h-48 bg-slate-900">
        <img
          src={
            isRoom
              ? '/img/room.jpg'
              : isVIP
              ? '/images/vip.jpg'
              : '/img/table1.jpg'
          }
          alt={seat}
          className="w-full h-full object-cover"
        />

        <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 text-slate-200 text-sm bg-black/60 px-2 py-1 rounded">
          {isRoom ? 'Gaming Room' : isVIP ? 'VIP Gaming' : 'Gaming Setup'}
        </div>
      </div>

      <div className="p-5 relative z-20">
        <div className="flex justify-between items-center">
          <h3
            className={`text-xl font-bold bg-gradient-to-r bg-clip-text text-transparent ${
              isVIP
                ? 'from-yellow-400 to-yellow-600'
                : isRoom
                ? 'from-purple-400 to-purple-600'
                : 'from-blue-400 to-blue-600'
            }`}
          >
            {seat}
          </h3>
          <span
            className={`
              px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wide
              ${
                isAvailable
                  ? 'bg-green-500 text-white shadow-green-500/30 animate-pulse'
                  : isMaintenance
                  ? 'bg-orange-500 text-white shadow-orange-500/30'
                  : 'bg-red-500 text-white shadow-red-500/30'
              }
              shadow-lg
            `}
          >
            {isAvailable ? 'ว่าง' : isMaintenance ? 'ซ่อมแซม' : 'ไม่ว่าง'}
          </span>
        </div>
      </div>

      <div
        className={`absolute inset-0 opacity-0 hover:opacity-100 transition-opacity duration-300 ${
          isVIP
            ? 'bg-gradient-to-br from-yellow-500/10 to-orange-500/10'
            : isRoom
            ? 'bg-gradient-to-br from-purple-500/10 to-indigo-500/10'
            : 'bg-gradient-to-br from-blue-500/10 to-purple-500/10'
        }`}
      ></div>
    </div>
  );
};

export default SeatCard;


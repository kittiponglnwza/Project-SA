// components/SeatCard.jsx
import React from 'react';
import { Crown, Users } from 'lucide-react';

// Import รูปภาพ
import TableImg from "../photo/table.jpg";
import RoomImg from "../photo/room.jpg";

const SeatCard = ({ seat, status, handleSeatClick }) => {
  const isVIP = seat.includes("VIP");
  const isRoom = seat.includes("Room");
  const isAvailable = status === 'available';

  // รูปภาพ
  const images = {
    table: TableImg,
    room: RoomImg
  };

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
        backdrop-blur-sm
      `}
    >
      {/* VIP Crown Icon */}
      {isVIP && (
        <Crown className="absolute top-3 right-3 w-6 h-6 text-yellow-400 z-10 drop-shadow-lg" />
      )}

      {/* Room Icon */}
      {isRoom && (
        <Users className="absolute top-3 right-3 w-6 h-6 text-purple-400 z-10 drop-shadow-lg" />
      )}

      {/* Seat Image */}
      <div className="relative h-48 bg-gradient-to-br from-slate-700 to-slate-800">
        <img 
          src={isRoom ? images.room : images.table}
          alt={seat}
          className="w-full h-full object-cover"
          onError={(e) => {
            e.target.style.display = 'none';
            e.target.nextSibling.style.display = 'flex';
          }}
        />
        <div className="absolute inset-0 items-center justify-center hidden">
          <div className="w-32 h-24 bg-blue-500/20 rounded-lg border-2 border-blue-500/30 flex items-center justify-center">
            <div className="w-8 h-6 bg-blue-500 rounded"></div>
          </div>
        </div>
        <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 text-slate-400 text-sm bg-black/50 px-2 py-1 rounded">
          {isRoom ? 'Gaming Room' : 'Gaming Setup'}
        </div>
      </div>

      {/* Seat Info */}
      <div className="p-5 relative z-20">
        <div className="flex justify-between items-center">
          <h3 className="text-xl font-bold bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent">
            {seat}
          </h3>
          <span
            className={`
              px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wide
              ${isAvailable
                ? 'bg-green-500 text-white shadow-green-500/30 animate-pulse'
                : 'bg-red-500 text-white shadow-red-500/30'
              }
              shadow-lg
            `}
          >
            {isAvailable ? 'Available' : 'Occupied'}
          </span>
        </div>
      </div>

      {/* Hover overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-purple-500/10 opacity-0 hover:opacity-100 transition-opacity duration-300"></div>
    </div>
  );
};

export default SeatCard;
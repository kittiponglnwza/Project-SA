// components/SeatCard.jsx
import React from "react";
import { Crown, Users } from "lucide-react";

import TableImg from "/photo/table1.jpg";
import RoomImg from "/photo/room.jpg";

const SeatCard = ({ seat, status, handleSeatClick }) => {
  if (!seat) return null;

  const seatName = `${seat.zone || ""}${seat.id || ""}`;
  const isVIP = seatName.includes("VIP");
  const isRoom = seatName.includes("Room");
  const isAvailable = status === "available";

  return (
    <div
      onClick={() => isAvailable && handleSeatClick(seat)}
      className={`
        relative cursor-pointer transform transition-all duration-300 hover:scale-105 hover:-translate-y-2
        rounded-2xl overflow-hidden shadow-xl border-2
        ${isAvailable ? "hover:shadow-blue-500/20" : "cursor-not-allowed opacity-75"}
        ${isVIP ? "border-yellow-400 bg-gradient-to-br from-slate-800 to-slate-700" : ""}
        ${isRoom ? "border-purple-400 bg-gradient-to-br from-purple-900/20 to-indigo-900/20" : ""}
        ${!isVIP && !isRoom ? "border-slate-600 bg-slate-800" : ""}
        backdrop-blur-sm
      `}
    >
      {isVIP && (
        <Crown className="absolute top-3 right-3 w-6 h-6 text-yellow-400 z-10 drop-shadow-lg" />
      )}
      {isRoom && (
        <Users className="absolute top-3 right-3 w-6 h-6 text-purple-400 z-10 drop-shadow-lg" />
      )}
      <div className="relative h-48 bg-gradient-to-br from-slate-700 to-slate-800">
        <img
          src={isRoom ? RoomImg : TableImg}
          alt={seatName}
          className="w-full h-full object-cover"
        />
        <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 text-slate-400 text-sm bg-black/50 px-2 py-1 rounded">
          {isRoom ? "Gaming Room" : "Gaming Setup"}
        </div>
      </div>
      <div className="p-5 relative z-20">
        <div className="flex justify-between items-center">
          <h3 className="text-xl font-bold bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent">
            {seatName}
          </h3>
          <span
            className={`
              px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wide
              ${isAvailable ? "bg-green-500 text-white animate-pulse" : "bg-red-500 text-white"}
            `}
          >
            {isAvailable ? "Available" : "Occupied"}
          </span>
        </div>
      </div>
    </div>
  );
};

export default SeatCard;

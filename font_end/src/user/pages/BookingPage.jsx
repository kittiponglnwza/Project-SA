// pages/BookingPage.jsx
import React, { useState, useEffect } from "react";
import SeatCard from "../components/SeatCard";
import axios from "axios";

const BookingPage = ({ handleOpenModal, setFetchSeatsCallback }) => {
  const [zones, setZones] = useState({});
  const [seatStatus, setSeatStatus] = useState({});
  const [currentZone, setCurrentZone] = useState("A");
  const [loading, setLoading] = useState(false);

  // โหลดข้อมูล seats จาก backend
  const fetchSeats = async () => {
    try {
      const res = await axios.get("http://localhost:3000/seats");
      const seats = res.data;

      // group by zone
      const grouped = seats.reduce((acc, seat) => {
        if (!acc[seat.zone]) acc[seat.zone] = [];
        acc[seat.zone].push(seat);
        return acc;
      }, {});
      setZones(grouped);

      // map status
      const statusMap = {};
      seats.forEach((seat) => {
        statusMap[seat.id] =
          seat.status === "ว่าง"
            ? "available"
            : seat.status === "ซ่อมบำรุง"
            ? "maintenance"
            : "occupied";
      });
      setSeatStatus(statusMap);
    } catch (err) {
      console.error("Error fetching seats:", err);
    }
  };

  useEffect(() => {
    fetchSeats();
    if (setFetchSeatsCallback) {
      setFetchSeatsCallback(() => fetchSeats); // ✅ ส่ง fetchSeats กลับไปที่ App
    }
  }, []);

  // เปลี่ยนโซน
  const handleZoneChange = (zone) => {
    setLoading(true);
    setTimeout(() => {
      setCurrentZone(zone);
      setLoading(false);
    }, 300);
  };

  // Zone stats
  const getZoneStats = (zone) => {
    const zoneSeats = zones[zone] || [];
    const available = zoneSeats.filter((s) => s.status === "ว่าง").length;
    return { total: zoneSeats.length, available };
  };

  const stats = getZoneStats(currentZone);

  return (
    <div className="space-y-8 p-6">
      {/* Header */}
      <h2 className="text-2xl lg:text-3xl font-bold text-blue-400">🗓️ จองโต๊ะ</h2>

      {/* Zone Tabs */}
      <div className="flex flex-wrap gap-3 mb-6">
        {Object.keys(zones)
          .sort((a, b) => a.localeCompare(b)) // ✅ Zone A มาก่อน
          .map((zone) => (
            <button
              key={zone}
              onClick={() => handleZoneChange(zone)}
              className={`px-6 py-2 rounded-full font-medium ${
                currentZone === zone
                  ? "bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg"
                  : "bg-slate-800 text-slate-300 border border-slate-600 hover:border-blue-400 hover:text-blue-400"
              }`}
            >
              Zone {zone}
            </button>
          ))}
      </div>

      {/* Zone Info */}
      <div className="bg-slate-800/60 rounded-xl p-4 flex justify-between items-center">
        <div>
          Zone {currentZone} - <span className="text-blue-400">{stats.total} โต๊ะ</span>
        </div>
        <div className="text-green-400">✅ ว่าง {stats.available} โต๊ะ</div>
      </div>

      {/* Seats */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-6">
        {zones[currentZone]?.map((seat) => (
          <SeatCard
            key={seat.id}
            seat={seat}
            status={seatStatus[seat.id]}
            handleSeatClick={() => handleOpenModal(seat)} // ✅ ส่ง seat object
          />
        ))}
      </div>
    </div>
  );
};

export default BookingPage;

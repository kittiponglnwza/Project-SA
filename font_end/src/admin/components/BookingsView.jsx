// BookingsView.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import SeatCard from './SeatCard';

const BookingsView = () => {
  const [zones, setZones] = useState({});
  const [seatStatus, setSeatStatus] = useState({});
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentZone, setCurrentZone] = useState("A"); // default Zone A

  // ✅ Mapping enum → ภาษาไทย
  const statusMap = {
    AVAILABLE: "available",
    UNAVAILABLE: "occupied",
    MAINTENANCE: "maintenance",
  };

  const displayStatus = {
    AVAILABLE: "ใช้งานได้",
    UNAVAILABLE: "ใช้งานไม่ได้",
    MAINTENANCE: "ซ่อมแซม",
  };

  const fetchSeats = async () => {
    setLoading(true);
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

      // map status (ใช้ enum จาก backend)
      const statusMapState = {};
      seats.forEach((seat) => {
        statusMapState[seat.id] = statusMap[seat.status] || "unknown";
      });
      setSeatStatus(statusMapState);
    } catch (err) {
      console.error("Error fetching seats:", err);
    } finally {
      setLoading(false);
    }
  };

  const fetchBookings = async () => {
    try {
      const res = await axios.get("http://localhost:3000/bookings");
      setBookings(res.data);
    } catch (err) {
      console.error("Error fetching bookings:", err);
    }
  };

  useEffect(() => {
    fetchSeats();
    fetchBookings();
  }, []);

  const handleSeatClick = async (seat) => {
    try {
      const isAvailable = seatStatus[seat.id] === "available";
      const action = isAvailable ? "จอง" : "ปล่อย";

      if (
        window.confirm(
          `คุณต้องการ${action} โต๊ะ #${seat.id} (Zone ${seat.zone}) หรือไม่?`
        )
      ) {
        if (isAvailable) {
          await axios.patch(`http://localhost:3000/seats/${seat.id}`, {
            status: "UNAVAILABLE",
          });
        } else {
          await axios.patch(`http://localhost:3000/seats/${seat.id}`, {
            status: "AVAILABLE",
          });
        }
        fetchSeats();
        fetchBookings();
      }
    } catch (err) {
      console.error("Error updating seat:", err);
    }
  };

  return (
    <div className="space-y-8">
      {/* ปุ่มเลือก Zone */}
      <div className="flex gap-3 mb-6">
        {["A", "B", "C", "VIP", "Room"].map((zone) => (
          <button
            key={zone}
            onClick={() => setCurrentZone(zone)}
            className={`px-4 py-2 rounded-lg font-medium transition ${
              currentZone === zone
                ? "bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow"
                : "bg-slate-800 text-slate-300 hover:text-blue-400"
            }`}
          >
            Zone {zone}
          </button>
        ))}
      </div>

      {/* แสดงสรุปโซน */}
      <div className="bg-slate-800/60 p-6 rounded-2xl border border-slate-700">
        <div className="flex justify-between items-center">
          <div className="text-lg">
            <span className="font-medium">Zone {currentZone}</span>
            <span className="mx-2">-</span>
            <span className="text-blue-400 font-medium">
              {zones[currentZone]?.length || 0} โต๊ะ
            </span>
          </div>
          <div className="text-green-400 font-medium">
            ✅ ว่าง{" "}
            {zones[currentZone]?.filter((s) => s.status === "AVAILABLE")
              .length || 0}{" "}
            โต๊ะ
          </div>
        </div>
      </div>

      {/* แสดงที่นั่ง */}
      {loading ? (
        <div className="text-blue-400">กำลังโหลด...</div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {zones[currentZone]?.map((seat) => (
            <SeatCard
              key={seat.id}
              seat={seat}
              status={seatStatus[seat.id]}
              displayStatus={displayStatus[seat.status]}
              handleSeatClick={() => handleSeatClick(seat)}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default BookingsView;

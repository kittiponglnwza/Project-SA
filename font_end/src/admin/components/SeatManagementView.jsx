// SeatManagementView.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  CheckCircle,
  XCircle,
  Settings,
  BarChart3,
  Crown,
  Users as UsersIcon,
} from 'lucide-react';

const SeatManagementView = () => {
  const [seatManagement, setSeatManagement] = useState([]);
  const [selectedZone, setSelectedZone] = useState('ทั้งหมด');
  const [selectedStatus, setSelectedStatus] = useState('ทั้งหมด');

  // ✅ Mapping enum → ภาษาไทย
  const statusMap = {
    AVAILABLE: 'ใช้งานได้',
    UNAVAILABLE: 'ใช้งานไม่ได้',
    MAINTENANCE: 'ซ่อมแซม',
  };

  // ✅ โหลดข้อมูลจาก backend
  const fetchSeats = async () => {
    try {
      const res = await axios.get('http://localhost:3000/seats');
      setSeatManagement(res.data);
    } catch (err) {
      console.error('Error fetching seats:', err);
    }
  };

  useEffect(() => {
    fetchSeats();
  }, []);

  // ✅ อัปเดตสถานะ (ส่ง enum ไป backend)
  const updateSeatStatus = async (id, status) => {
    try {
      await axios.patch(`http://localhost:3000/seats/${id}`, { status });
      fetchSeats();
    } catch (err) {
      console.error('Error updating seat:', err);
    }
  };

  // ✅ Filter
  const filteredSeats = seatManagement.filter((seat) => {
    const zoneMatch = selectedZone === 'ทั้งหมด' || seat.zone === selectedZone;
    const statusMatch =
      selectedStatus === 'ทั้งหมด' ||
      statusMap[seat.status] === selectedStatus;
    return zoneMatch && statusMatch;
  });

  // ✅ คำนวณสถิติ
  const totalSeats = seatManagement.length;
  const availableSeats = seatManagement.filter(
    (s) => s.status === 'AVAILABLE'
  ).length;
  const unavailableSeats = seatManagement.filter(
    (s) => s.status === 'UNAVAILABLE'
  ).length;
  const maintenanceSeats = seatManagement.filter(
    (s) => s.status === 'MAINTENANCE'
  ).length;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-bold text-white">จัดการที่นั่ง</h2>
        <div className="text-slate-300">
          รวมทั้งหมด:{' '}
          <span className="text-blue-400 font-bold">{totalSeats}</span> ที่นั่ง
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-gradient-to-br from-green-800 to-green-700 rounded-xl p-6 border border-green-600">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-green-200 text-sm font-medium">ใช้งานได้</p>
              <p className="text-3xl font-bold text-white">{availableSeats}</p>
            </div>
            <div className="bg-green-500/20 p-3 rounded-full">
              <CheckCircle className="text-green-400" size={32} />
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-red-800 to-red-700 rounded-xl p-6 border border-red-600">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-red-200 text-sm font-medium">ใช้งานไม่ได้</p>
              <p className="text-3xl font-bold text-white">{unavailableSeats}</p>
            </div>
            <div className="bg-red-500/20 p-3 rounded-full">
              <XCircle className="text-red-400" size={32} />
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-orange-800 to-orange-700 rounded-xl p-6 border border-orange-600">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-orange-200 text-sm font-medium">ซ่อมแซม</p>
              <p className="text-3xl font-bold text-white">{maintenanceSeats}</p>
            </div>
            <div className="bg-orange-500/20 p-3 rounded-full">
              <Settings className="text-orange-400" size={32} />
            </div>
          </div>
        </div>
      </div>

      {/* Filter */}
      <div className="flex gap-4 items-center">
        <div>
          <label className="text-slate-300 text-sm mb-2 block">กรองตามโซน:</label>
          <select
            value={selectedZone}
            onChange={(e) => setSelectedZone(e.target.value)}
            className="px-4 py-2 bg-slate-800 border border-slate-600 rounded-lg text-white"
          >
            <option value="ทั้งหมด">ทั้งหมด</option>
            <option value="A">Zone A</option>
            <option value="B">Zone B</option>
            <option value="C">Zone C</option>
            <option value="VIP">Zone VIP</option>
            <option value="Room">Zone Room</option>
          </select>
        </div>
        <div>
          <label className="text-slate-300 text-sm mb-2 block">กรองตามสถานะ:</label>
          <select
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
            className="px-4 py-2 bg-slate-800 border border-slate-600 rounded-lg text-white"
          >
            <option value="ทั้งหมด">ทั้งหมด</option>
            <option value="ใช้งานได้">ใช้งานได้</option>
            <option value="ใช้งานไม่ได้">ใช้งานไม่ได้</option>
            <option value="ซ่อมแซม">ซ่อมแซม</option>
          </select>
        </div>
      </div>

      {/* Seat Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-4">
        {filteredSeats.map((seat) => (
          <div
            key={seat.id}
            className={`rounded-xl p-4 border transition-all duration-200 hover:scale-105 ${
              seat.status === 'AVAILABLE'
                ? 'bg-green-900/20 border-green-500/50'
                : seat.status === 'UNAVAILABLE'
                ? 'bg-red-900/20 border-red-500/50'
                : 'bg-orange-900/20 border-orange-500/50'
            }`}
          >
            <div className="flex justify-between items-start mb-3">
              <h3
                className={`text-lg font-bold ${
                  seat.zone === 'VIP'
                    ? 'text-yellow-400'
                    : seat.zone === 'Room'
                    ? 'text-purple-400'
                    : 'text-blue-400'
                }`}
              >
                {seat.id}
              </h3>
              <div className="flex items-center gap-1">
                {seat.zone === 'VIP' && (
                  <Crown className="text-yellow-400" size={16} />
                )}
                {seat.zone === 'Room' && (
                  <UsersIcon className="text-purple-400" size={16} />
                )}
              </div>
            </div>

            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-slate-400">โซน:</span>
                <span className="text-white font-medium">Zone {seat.zone}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">ประเภท:</span>
                <span className="text-white">{seat.type}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">สถานะ:</span>
                <span
                  className={`font-semibold ${
                    seat.status === 'AVAILABLE'
                      ? 'text-green-400'
                      : seat.status === 'UNAVAILABLE'
                      ? 'text-red-400'
                      : 'text-orange-400'
                  }`}
                >
                  {statusMap[seat.status]}
                </span>
              </div>
            </div>

            <div className="mt-4 flex flex-col gap-2">
              <button
                onClick={() => updateSeatStatus(seat.id, 'AVAILABLE')}
                className="w-full bg-green-600 hover:bg-green-700 px-3 py-2 rounded text-sm text-white transition-colors"
              >
                ตั้งเป็นใช้งานได้
              </button>
              <button
                onClick={() => updateSeatStatus(seat.id, 'UNAVAILABLE')}
                className="w-full bg-red-600 hover:bg-red-700 px-3 py-2 rounded text-sm text-white transition-colors"
              >
                ตั้งเป็นใช้งานไม่ได้
              </button>
              <button
                onClick={() => updateSeatStatus(seat.id, 'MAINTENANCE')}
                className="w-full bg-orange-600 hover:bg-orange-700 px-3 py-2 rounded text-sm text-white transition-colors"
              >
                ตั้งเป็นซ่อมแซม
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SeatManagementView;

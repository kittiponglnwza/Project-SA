import React, { useState } from 'react';
import { CheckCircle, XCircle, Settings, BarChart3, Crown, Users as UsersIcon } from 'lucide-react';

const SeatManagementView = ({ seatManagement }) => {
  const [selectedZone, setSelectedZone] = useState('ทั้งหมด');
  const [selectedCondition, setSelectedCondition] = useState('ทั้งหมด');

  const filteredSeats = seatManagement.filter((seat) => {
    const zoneMatch = selectedZone === 'ทั้งหมด' || seat.zone === selectedZone;
    const conditionMatch = selectedCondition === 'ทั้งหมด' || seat.condition === selectedCondition;
    return zoneMatch && conditionMatch;
  });

  const totalSeats = seatManagement.length;
  const availableSeats = seatManagement.filter((s) => s.status === 'ว่าง').length;
  const occupiedSeats = seatManagement.filter((s) => s.status === 'ไม่ว่าง').length;
  const maintenanceSeats = seatManagement.filter((s) => s.status === 'ซ่อมบำรุง').length;
  const excellentCondition = seatManagement.filter((s) => s.condition === 'ดีเยี่ยม').length;
  const goodCondition = seatManagement.filter((s) => s.condition === 'ดี').length;
  const needRepair = seatManagement.filter((s) => s.condition === 'ต้องซ่อม').length;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-bold text-white">ตรวจสอบสถานะที่นั่ง</h2>
        <div className="text-slate-300">
          รวมทั้งหมด: <span className="text-blue-400 font-bold">{totalSeats}</span> ที่นั่ง
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-gradient-to-br from-green-800 to-green-700 rounded-xl p-6 border border-green-600">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-green-200 text-sm font-medium">ที่นั่งว่าง</p>
              <p className="text-3xl font-bold text-white">{availableSeats}</p>
              <p className="text-green-300 text-sm">พร้อมใช้งาน</p>
            </div>
            <div className="bg-green-500/20 p-3 rounded-full">
              <CheckCircle className="text-green-400" size={32} />
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-red-800 to-red-700 rounded-xl p-6 border border-red-600">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-red-200 text-sm font-medium">ที่นั่งไม่ว่าง</p>
              <p className="text-3xl font-bold text-white">{occupiedSeats}</p>
              <p className="text-red-300 text-sm">กำลังใช้งาน</p>
            </div>
            <div className="bg-red-500/20 p-3 rounded-full">
              <XCircle className="text-red-400" size={32} />
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-orange-800 to-orange-700 rounded-xl p-6 border border-orange-600">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-orange-200 text-sm font-medium">ซ่อมบำรุง</p>
              <p className="text-3xl font-bold text-white">{maintenanceSeats}</p>
              <p className="text-orange-300 text-sm">ไม่พร้อมใช้</p>
            </div>
            <div className="bg-orange-500/20 p-3 rounded-full">
              <Settings className="text-orange-400" size={32} />
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-blue-800 to-blue-700 rounded-xl p-6 border border-blue-600">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-blue-200 text-sm font-medium">อัตราการใช้งาน</p>
              <p className="text-3xl font-bold text-white">{Math.round((occupiedSeats / (totalSeats - maintenanceSeats)) * 100)}%</p>
              <p className="text-blue-300 text-sm">ของที่ใช้ได้</p>
            </div>
            <div className="bg-blue-500/20 p-3 rounded-full">
              <BarChart3 className="text-blue-400" size={32} />
            </div>
          </div>
        </div>
      </div>

      <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
        <h3 className="text-lg font-semibold text-white mb-4">สภาพที่นั่งทั้งหมด</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="flex items-center justify-between p-4 bg-slate-700/50 rounded-lg">
            <span className="text-slate-300">สภาพดีเยี่ยม</span>
            <div className="flex items-center gap-2">
              <div className="w-16 bg-slate-600 rounded-full h-2">
                <div className="bg-green-500 h-2 rounded-full" style={{ width: `${(excellentCondition / totalSeats) * 100}%` }}></div>
              </div>
              <span className="text-green-400 font-semibold">{excellentCondition}</span>
            </div>
          </div>
          <div className="flex items-center justify-between p-4 bg-slate-700/50 rounded-lg">
            <span className="text-slate-300">สภาพดี</span>
            <div className="flex items-center gap-2">
              <div className="w-16 bg-slate-600 rounded-full h-2">
                <div className="bg-blue-500 h-2 rounded-full" style={{ width: `${(goodCondition / totalSeats) * 100}%` }}></div>
              </div>
              <span className="text-blue-400 font-semibold">{goodCondition}</span>
            </div>
          </div>
          <div className="flex items-center justify-between p-4 bg-slate-700/50 rounded-lg">
            <span className="text-slate-300">ต้องซ่อม</span>
            <div className="flex items-center gap-2">
              <div className="w-16 bg-slate-600 rounded-full h-2">
                <div className="bg-red-500 h-2 rounded-full" style={{ width: `${(needRepair / totalSeats) * 100}%` }}></div>
              </div>
              <span className="text-red-400 font-semibold">{needRepair}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="flex gap-4 items-center">
        <div>
          <label className="text-slate-300 text-sm mb-2 block">กรองตามโซน:</label>
          <select
            value={selectedZone}
            onChange={(e) => setSelectedZone(e.target.value)}
            className="px-4 py-2 bg-slate-800 border border-slate-600 rounded-lg text-white focus:border-blue-400 focus:outline-none"
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
          <label className="text-slate-300 text-sm mb-2 block">กรองตามสภาพ:</label>
          <select
            value={selectedCondition}
            onChange={(e) => setSelectedCondition(e.target.value)}
            className="px-4 py-2 bg-slate-800 border border-slate-600 rounded-lg text-white focus:border-blue-400 focus:outline-none"
          >
            <option value="ทั้งหมด">ทั้งหมด</option>
            <option value="ดีเยี่ยม">ดีเยี่ยม</option>
            <option value="ดี">ดี</option>
            <option value="ต้องซ่อม">ต้องซ่อม</option>
          </select>
        </div>
        <div className="ml-auto text-slate-400">
          แสดง: <span className="text-white font-semibold">{filteredSeats.length}</span> ที่นั่ง
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-4">
        {filteredSeats.map((seat) => (
          <div
            key={seat.id}
            className={`rounded-xl p-4 border transition-all duration-200 hover:scale-105 ${
              seat.status === 'ว่าง'
                ? 'bg-green-900/20 border-green-500/50'
                : seat.status === 'ไม่ว่าง'
                ? 'bg-red-900/20 border-red-500/50'
                : 'bg-orange-900/20 border-orange-500/50'
            }`}
          >
            <div className="flex justify-between items-start mb-3">
              <h3
                className={`text-lg font-bold ${
                  seat.zone === 'VIP' ? 'text-yellow-400' : seat.zone === 'Room' ? 'text-purple-400' : 'text-blue-400'
                }`}
              >
                {seat.id}
              </h3>
              <div className="flex items-center gap-1">
                {seat.zone === 'VIP' && <Crown className="text-yellow-400" size={16} />}
                {seat.zone === 'Room' && <UsersIcon className="text-purple-400" size={16} />}
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
                    seat.status === 'ว่าง' ? 'text-green-400' : seat.status === 'ไม่ว่าง' ? 'text-red-400' : 'text-orange-400'
                  }`}
                >
                  {seat.status}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">สภาพ:</span>
                <span
                  className={`font-semibold ${
                    seat.condition === 'ดีเยี่ยม' ? 'text-green-400' : seat.condition === 'ดี' ? 'text-blue-400' : 'text-red-400'
                  }`}
                >
                  {seat.condition}
                </span>
              </div>
            </div>

            <div className="mt-4 flex gap-2">
              <button className="flex-1 bg-blue-600 hover:bg-blue-700 px-3 py-2 rounded text-sm transition-colors">รายละเอียด</button>
              {seat.condition === 'ต้องซ่อม' && (
                <button className="bg-orange-600 hover:bg-orange-700 px-3 py-2 rounded text-sm transition-colors">ซ่อมแซม</button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SeatManagementView;

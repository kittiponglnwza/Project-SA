import React from 'react';
import SeatCard from './SeatCard';

const BookingsView = ({
  zones,
  seatStatus,
  currentZone,
  zoneLoading,
  onZoneChange,
  getZoneStats,
  bookings,
}) => {
  const stats = getZoneStats(currentZone);

  const handleSeatClick = (seat) => {
    alert(`คลิกที่นั่ง: ${seat}\nสถานะ: ${seatStatus[seat]}`);
  };

  return (
    <div className="space-y-8">
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-2">
          <span className="text-2xl lg:text-3xl" aria-hidden="true">🎮</span>
          <h2 className="text-2xl lg:text-3xl font-bold bg-gradient-to-r from-blue-400 to-purple-600 bg-clip-text text-transparent">
            จองโต๊ะ
          </h2>
        </div>
        <div className="w-20 h-1 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"></div>
      </div>

      <div className="flex flex-wrap gap-3 mb-8">
        {Object.keys(zones).map((zone) => (
          <button
            key={zone}
            onClick={() => onZoneChange(zone)}
            className={`
              px-6 py-3 rounded-full font-medium transition-all duration-300 relative overflow-hidden
              ${
                currentZone === zone
                  ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg shadow-blue-500/25'
                  : 'bg-slate-800 text-slate-300 border border-slate-600 hover:border-blue-400 hover:text-blue-400 hover:-translate-y-1'
              }
            `}
          >
            Zone {zone}
          </button>
        ))}
      </div>

      <div className="bg-slate-800/60 backdrop-blur-sm rounded-2xl p-6 mb-8 border border-slate-700">
        <div className="flex justify-between items-center">
          <div className="text-lg">
            <span className="font-medium">Zone {currentZone}</span>
            <span className="mx-2">-</span>
            <span className="text-blue-400 font-medium">{stats.total} โต๊ะ</span>
          </div>
          <div className="text-green-400 font-medium">✅ ว่าง {stats.available} โต๊ะ</div>
        </div>
      </div>

      <div className="relative">
        {zoneLoading && (
          <div className="absolute inset-0 bg-slate-900/80 backdrop-blur-sm rounded-3xl flex items-center justify-center z-10">
            <div className="flex items-center space-x-3 text-blue-400">
              <div className="w-8 h-8 border-4 border-blue-400 border-t-transparent rounded-full animate-spin"></div>
              <span className="text-lg">กำลังโหลด...</span>
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {zones[currentZone]?.map((seat) => (
            <SeatCard key={seat} seat={seat} status={seatStatus[seat]} handleSeatClick={handleSeatClick} />
          ))}
        </div>
      </div>

      {/* ตารางข้อมูลการจอง */}
      <div className="bg-slate-800 rounded-xl border border-slate-700 overflow-hidden mt-12">
        <div className="p-6 border-b border-slate-700">
          <h3 className="text-lg font-semibold text-white">รายการการจองทั้งหมด</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-slate-700">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-300 uppercase tracking-wider">ผู้ใช้งาน</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-300 uppercase tracking-wider">ที่นั่ง</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-300 uppercase tracking-wider">วันที่และเวลา</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-300 uppercase tracking-wider">ระยะเวลา</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-300 uppercase tracking-wider">ราคา</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-300 uppercase tracking-wider">สถานะ</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-700">
              {bookings?.map((booking) => (
                <tr key={booking.id} className="hover:bg-slate-700/50">
                  <td className="px-6 py-4 whitespace-nowrap text-white">{booking.user}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-white">{booking.seat}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-slate-300">
                    {booking.date}
                    <br />
                    <span className="text-sm text-slate-400">
                      {booking.startTime} - {booking.endTime}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-slate-300">{booking.duration} ชม.</td>
                  <td className="px-6 py-4 whitespace-nowrap text-green-400">฿{booking.price}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-semibold ${
                        booking.status === 'active'
                          ? 'bg-green-500/20 text-green-400'
                          : booking.status === 'completed'
                          ? 'bg-blue-500/20 text-blue-400'
                          : 'bg-red-500/20 text-red-400'
                      }`}
                    >
                      {booking.status === 'active' ? 'กำลังใช้งาน' : booking.status === 'completed' ? 'เสร็จสิ้น' : 'ยกเลิก'}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default BookingsView;

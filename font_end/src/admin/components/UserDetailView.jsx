import React from 'react';

const UserDetailView = ({ selectedUser, onBack }) => (
  <div className="space-y-6">
    <div className="flex items-center gap-4 mb-6">
      <button
        onClick={onBack}
        className="bg-slate-700 hover:bg-slate-600 px-4 py-2 rounded-lg flex items-center gap-2 transition-colors"
      >
        ← กลับ
      </button>
      <h2 className="text-3xl font-bold text-white">ข้อมูลสมาชิก: {selectedUser?.name}</h2>
    </div>

    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
        <h3 className="text-lg font-semibold text-white mb-4">ข้อมูลส่วนตัว</h3>
        <div className="space-y-3">
          <div>
            <p className="text-slate-400 text-sm">ชื่อ</p>
            <p className="text-white">{selectedUser?.name}</p>
          </div>
          <div>
            <p className="text-slate-400 text-sm">อีเมล</p>
            <p className="text-white">{selectedUser?.email}</p>
          </div>
          <div>
            <p className="text-slate-400 text-sm">โทรศัพท์</p>
            <p className="text-white">{selectedUser?.phone}</p>
          </div>
          <div>
            <p className="text-slate-400 text-sm">เข้าร่วมเมื่อ</p>
            <p className="text-white">{selectedUser?.joinDate}</p>
          </div>
          <div>
            <p className="text-slate-400 text-sm">สถานะ</p>
            <span className="bg-green-500/20 text-green-400 px-2 py-1 rounded-full text-xs font-semibold">ใช้งานอยู่</span>
          </div>
        </div>
      </div>

      <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
        <h3 className="text-lg font-semibold text-white mb-4">สถิติการใช้งาน</h3>
        <div className="space-y-3">
          <div>
            <p className="text-slate-400 text-sm">จำนวนการจองทั้งหมด</p>
            <p className="text-2xl font-bold text-white">{selectedUser?.totalBookings}</p>
          </div>
          <div>
            <p className="text-slate-400 text-sm">ยอดใช้จ่ายรวม</p>
            <p className="text-2xl font-bold text-green-400">฿{selectedUser?.totalSpent.toLocaleString()}</p>
          </div>
          <div>
            <p className="text-slate-400 text-sm">เข้าใช้ครั้งล่าสุด</p>
            <p className="text-white">{selectedUser?.lastVisit}</p>
          </div>
        </div>
      </div>

      <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
        <h3 className="text-lg font-semibold text-white mb-4">ค่าเฉลี่ย</h3>
        <div className="space-y-3">
          <div>
            <p className="text-slate-400 text-sm">ค่าเฉลี่ยต่อครั้ง</p>
            <p className="text-xl font-bold text-blue-400">
              ฿{Math.round(selectedUser?.totalSpent / selectedUser?.totalBookings).toLocaleString()}
            </p>
          </div>
          <div>
            <p className="text-slate-400 text-sm">จำนวนออร์เดอร์อาหาร</p>
            <p className="text-xl font-bold text-orange-400">{selectedUser?.foodHistory?.length} ครั้ง</p>
          </div>
          <div>
            <p className="text-slate-400 text-sm">ระยะเวลาเล่นเฉลี่ย</p>
            <p className="text-xl font-bold text-purple-400">
              {Math.round(
                selectedUser?.bookingHistory?.reduce((acc, booking) => acc + booking.duration, 0) /
                  selectedUser?.bookingHistory?.length
              )}{' '}
              ชม.
            </p>
          </div>
        </div>
      </div>
    </div>

    <div className="bg-slate-800 rounded-xl border border-slate-700 overflow-hidden">
      <div className="p-6 border-b border-slate-700">
        <h3 className="text-lg font-semibold text-white">ประวัติการจอง</h3>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-slate-700">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-slate-300 uppercase tracking-wider">ที่นั่ง</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-slate-300 uppercase tracking-wider">วันที่</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-slate-300 uppercase tracking-wider">ระยะเวลา</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-slate-300 uppercase tracking-wider">ราคา</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-slate-300 uppercase tracking-wider">สถานะ</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-700">
            {selectedUser?.bookingHistory?.map((booking) => (
              <tr key={booking.id} className="hover:bg-slate-700/50">
                <td className="px-6 py-4 whitespace-nowrap text-white">{booking.seat}</td>
                <td className="px-6 py-4 whitespace-nowrap text-slate-300">{booking.date}</td>
                <td className="px-6 py-4 whitespace-nowrap text-slate-300">{booking.duration} ชม.</td>
                <td className="px-6 py-4 whitespace-nowrap text-green-400">฿{booking.price}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="bg-blue-500/20 text-blue-400 px-2 py-1 rounded-full text-xs font-semibold">เสร็จสิ้น</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>

    <div className="bg-slate-800 rounded-xl border border-slate-700 overflow-hidden">
      <div className="p-6 border-b border-slate-700">
        <h3 className="text-lg font-semibold text-white">ประวัติการสั่งอาหาร</h3>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-slate-700">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-slate-300 uppercase tracking-wider">รายการ</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-slate-300 uppercase tracking-wider">วันที่</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-slate-300 uppercase tracking-wider">ยอดรวม</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-700">
            {selectedUser?.foodHistory?.map((order) => (
              <tr key={order.id} className="hover:bg-slate-700/50">
                <td className="px-6 py-4 text-white">{order.items}</td>
                <td className="px-6 py-4 whitespace-nowrap text-slate-300">{order.date}</td>
                <td className="px-6 py-4 whitespace-nowrap text-green-400">฿{order.total}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  </div>
);

export default UserDetailView;


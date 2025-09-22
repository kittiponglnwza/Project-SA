import React, { useEffect, useState } from 'react';
import axios from 'axios';

const UserDetailView = ({ selectedUser, onBack }) => {
  const [userDetail, setUserDetail] = useState(null);

  useEffect(() => {
    const fetchUserDetail = async () => {
      try {
        const res = await axios.get(`http://localhost:3000/users/${selectedUser.id}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        setUserDetail(res.data);
      } catch (err) {
        console.error("Error fetching user detail:", err);
      }
    };

    if (selectedUser) {
      fetchUserDetail();
    }
  }, [selectedUser]);

  if (!userDetail) {
    return <p className="text-white">กำลังโหลดข้อมูล...</p>;
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4 mb-6">
        <button
          onClick={onBack}
          className="bg-slate-700 hover:bg-slate-600 px-4 py-2 rounded-lg flex items-center gap-2 transition-colors"
        >
          ← กลับ
        </button>
        <h2 className="text-3xl font-bold text-white">
          ข้อมูลสมาชิก: {userDetail.name}
        </h2>
      </div>

      {/* ✅ ใช้ userDetail แทน selectedUser */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
          <h3 className="text-lg font-semibold text-white mb-4">ข้อมูลส่วนตัว</h3>
          <div className="space-y-3">
            <p className="text-slate-400 text-sm">ชื่อ</p>
            <p className="text-white">{userDetail.name}</p>
            <p className="text-slate-400 text-sm">อีเมล</p>
            <p className="text-white">{userDetail.email}</p>
            <p className="text-slate-400 text-sm">โทรศัพท์</p>
            <p className="text-white">{userDetail.phone || '-'}</p>
            <p className="text-slate-400 text-sm">เข้าร่วมเมื่อ</p>
            <p className="text-white">{userDetail.joinDate || '-'}</p>
          </div>
        </div>

        {/* …โค้ดอื่นเหมือนเดิม แต่เปลี่ยนเป็น userDetail */}
      </div>

      <div className="bg-slate-800 rounded-xl border border-slate-700 overflow-hidden">
        <div className="p-6 border-b border-slate-700">
          <h3 className="text-lg font-semibold text-white">ประวัติการจอง</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-slate-700">
              <tr>
                <th className="px-6 py-3 text-left text-slate-300">ที่นั่ง</th>
                <th className="px-6 py-3 text-left text-slate-300">วันที่</th>
                <th className="px-6 py-3 text-left text-slate-300">ระยะเวลา</th>
                <th className="px-6 py-3 text-left text-slate-300">ราคา</th>
                <th className="px-6 py-3 text-left text-slate-300">สถานะ</th>
              </tr>
            </thead>
            <tbody>
              {userDetail.bookingHistory?.map((booking) => (
                <tr key={booking.id}>
                  <td className="px-6 py-4 text-white">{booking.seat}</td>
                  <td className="px-6 py-4 text-slate-300">{booking.date}</td>
                  <td className="px-6 py-4 text-slate-300">{booking.duration} ชม.</td>
                  <td className="px-6 py-4 text-green-400">฿{booking.price}</td>
                  <td className="px-6 py-4 text-blue-400">เสร็จสิ้น</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* ✅ ส่วนประวัติการสั่งอาหารก็เปลี่ยนเป็น userDetail.foodHistory */}
    </div>
  );
};

export default UserDetailView;

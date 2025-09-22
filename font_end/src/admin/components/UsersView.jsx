import React from 'react';
import { Edit, Trash2 } from 'lucide-react';
import UserDetailView from './UserDetailView';

const UsersView = ({ users, selectedUser, showUserDetail, onSelectUser, onBack }) => (
  <div className="space-y-6">
    {!showUserDetail ? (
      <>
        <div className="flex justify-between items-center">
          <h2 className="text-3xl font-bold text-white">จัดการผู้ใช้งาน</h2>
          <button className="bg-green-600 hover:bg-green-700 px-4 py-2 rounded-lg flex items-center gap-2 transition-colors">
            เพิ่มผู้ใช้งาน
          </button>
        </div>

        <div className="bg-slate-800 rounded-xl border border-slate-700 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-slate-700">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-slate-300 uppercase tracking-wider">ชื่อ</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-slate-300 uppercase tracking-wider">อีเมล</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-slate-300 uppercase tracking-wider">โทรศัพท์</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-slate-300 uppercase tracking-wider">จำนวนการจอง</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-slate-300 uppercase tracking-wider">ยอดใช้จ่าย</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-slate-300 uppercase tracking-wider">เข้าใช้ครั้งล่าสุด</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-slate-300 uppercase tracking-wider">จัดการ</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-700">
                {users.map((user) => (
                  <tr key={user.id} className="hover:bg-slate-700/50">
                    <td className="px-6 py-4 whitespace-nowrap text-white">{user.name}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-slate-300">{user.email}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-slate-300">{user.phone}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-slate-300">{user.totalBookings}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-green-400">฿{user.totalSpent.toLocaleString()}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-slate-300">{user.lastVisit}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex space-x-2">
                        <button
                          onClick={() => onSelectUser(user)}
                          className="text-blue-400 hover:text-blue-300 bg-blue-500/10 px-2 py-1 rounded text-sm"
                        >
                          ดูรายละเอียด
                        </button>
                        <button className="text-yellow-400 hover:text-yellow-300">
                          <Edit size={16} />
                        </button>
                        <button className="text-red-400 hover:text-red-300">
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </>
    ) : (
      <UserDetailView selectedUser={selectedUser} onBack={onBack} />
    )}
  </div>
);

export default UsersView;


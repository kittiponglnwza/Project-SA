import React, { useState, useEffect } from "react";
import axios from "axios";
import { Edit, Trash2 } from "lucide-react";
import UserDetailView from "./UserDetailView";

const UsersView = () => {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [showUserDetail, setShowUserDetail] = useState(false);

  // ✅ โหลด users จาก backend
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await axios.get("http://localhost:3000/users", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        setUsers(res.data);
      } catch (err) {
        console.error("Error fetching users:", err);
      }
    };
    fetchUsers();
  }, []);

  const onSelectUser = (user) => {
    setSelectedUser(user);
    setShowUserDetail(true);
  };

  const onBack = () => {
    setShowUserDetail(false);
    setSelectedUser(null);
  };

  // ✅ ลบ user
  const deleteUser = async (id) => {
    try {
      await axios.delete(`http://localhost:3000/users/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      setUsers(users.filter((u) => u.id !== id));
    } catch (err) {
      console.error("Error deleting user:", err);
    }
  };

  return (
    <div className="space-y-6">
      {!showUserDetail ? (
        <>
          <h2 className="text-3xl font-bold text-white">จัดการผู้ใช้งาน</h2>
          <div className="bg-slate-800 rounded-xl border border-slate-700 overflow-hidden">
            <table className="w-full">
              <thead className="bg-slate-700">
                <tr>
                  <th className="px-6 py-3 text-left text-slate-300">ชื่อ</th>
                  <th className="px-6 py-3 text-left text-slate-300">อีเมล</th>
                  <th className="px-6 py-3 text-left text-slate-300">จัดการ</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user) => (
                  <tr key={user.id} className="hover:bg-slate-700/50">
                    <td className="px-6 py-4 text-white">{user.name}</td>
                    <td className="px-6 py-4 text-slate-300">{user.email}</td>
                    <td className="px-6 py-4">
                      <button
                        onClick={() => onSelectUser(user)}
                        className="text-blue-400 mr-2"
                      >
                        ดูรายละเอียด
                      </button>
                      <button className="text-yellow-400 mr-2">
                        <Edit size={16} />
                      </button>
                      <button
                        onClick={() => deleteUser(user.id)}
                        className="text-red-400"
                      >
                        <Trash2 size={16} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      ) : (
        <UserDetailView selectedUser={selectedUser} onBack={onBack} />
      )}
    </div>
  );
};

export default UsersView;

// SeatManagementView.jsx
import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  CheckCircle,
  XCircle,
  Settings,
  Crown,
  Users as UsersIcon,
  MoreVertical,
} from "lucide-react";

const SeatManagementView = () => {
  const [seatManagement, setSeatManagement] = useState([]);
  const [selectedZone, setSelectedZone] = useState("ทั้งหมด");
  const [selectedStatus, setSelectedStatus] = useState("ทั้งหมด");

  // modal states
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editSeat, setEditSeat] = useState(null);
  const [formSeat, setFormSeat] = useState({
    zone: "A",
    type: "",
    status: "AVAILABLE",
  });

  const [openMenuId, setOpenMenuId] = useState(null); // track open dropdown

  const statusMap = {
    AVAILABLE: "ใช้งานได้",
    UNAVAILABLE: "ใช้งานไม่ได้",
    MAINTENANCE: "ซ่อมแซม",
  };

  // โหลดข้อมูล
  const fetchSeats = async () => {
    try {
      const res = await axios.get("http://localhost:3000/seats");
      setSeatManagement(res.data);
    } catch (err) {
      console.error("Error fetching seats:", err);
    }
  };

  useEffect(() => {
    fetchSeats();
  }, []);

  // เพิ่มที่นั่ง
  const addSeat = async () => {
    try {
      await axios.post("http://localhost:3000/seats", formSeat);
      fetchSeats();
      setShowAddModal(false);
    } catch (err) {
      console.error("Error adding seat:", err);
    }
  };

  // แก้ไขที่นั่ง
  const updateSeat = async () => {
    try {
      await axios.put(`http://localhost:3000/seats/${editSeat.id}`, formSeat);
      fetchSeats();
      setShowEditModal(false);
    } catch (err) {
      console.error("Error updating seat:", err);
    }
  };

  // ลบที่นั่ง
  const deleteSeat = async (id) => {
    try {
      if (window.confirm(`คุณแน่ใจหรือไม่ที่จะลบที่นั่ง #${id}?`)) {
        await axios.delete(`http://localhost:3000/seats/${id}`);
        fetchSeats();
      }
    } catch (err) {
      console.error("Error deleting seat:", err);
    }
  };

  // เปลี่ยนสถานะ
  const updateSeatStatus = async (id, status) => {
    try {
      await axios.patch(`http://localhost:3000/seats/${id}`, { status });
      fetchSeats();
    } catch (err) {
      console.error("Error updating seat:", err);
    }
  };

  // Filter
  const filteredSeats = seatManagement.filter((seat) => {
    const zoneMatch = selectedZone === "ทั้งหมด" || seat.zone === selectedZone;
    const statusMatch =
      selectedStatus === "ทั้งหมด" || statusMap[seat.status] === selectedStatus;
    return zoneMatch && statusMatch;
  });

  // Stats
  const totalSeats = seatManagement.length;
  const availableSeats = seatManagement.filter(
    (s) => s.status === "AVAILABLE"
  ).length;
  const unavailableSeats = seatManagement.filter(
    (s) => s.status === "UNAVAILABLE"
  ).length;
  const maintenanceSeats = seatManagement.filter(
    (s) => s.status === "MAINTENANCE"
  ).length;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-bold text-white">จัดการที่นั่ง</h2>
        <div className="flex gap-4 items-center">
          <div className="text-slate-300">
            รวมทั้งหมด:{" "}
            <span className="text-blue-400 font-bold">{totalSeats}</span> ที่นั่ง
          </div>
          <button
            onClick={() => {
              setFormSeat({ zone: "A", type: "", status: "AVAILABLE" });
              setShowAddModal(true);
            }}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
          >
            ➕ เพิ่มที่นั่ง
          </button>
        </div>
      </div>

      {/* Summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-green-800 rounded-xl p-6 border border-green-600">
          <p className="text-green-200 text-sm">ใช้งานได้</p>
          <p className="text-3xl font-bold text-white">{availableSeats}</p>
        </div>
        <div className="bg-red-800 rounded-xl p-6 border border-red-600">
          <p className="text-red-200 text-sm">ใช้งานไม่ได้</p>
          <p className="text-3xl font-bold text-white">{unavailableSeats}</p>
        </div>
        <div className="bg-orange-800 rounded-xl p-6 border border-orange-600">
          <p className="text-orange-200 text-sm">ซ่อมแซม</p>
          <p className="text-3xl font-bold text-white">{maintenanceSeats}</p>
        </div>
      </div>

      {/* Filter */}
      <div className="flex gap-4 items-center">
        <div>
          <label className="text-slate-300 text-sm">กรองตามโซน:</label>
          <select
            value={selectedZone}
            onChange={(e) => setSelectedZone(e.target.value)}
            className="ml-2 px-3 py-2 bg-slate-800 border border-slate-600 rounded text-white"
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
          <label className="text-slate-300 text-sm">กรองตามสถานะ:</label>
          <select
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
            className="ml-2 px-3 py-2 bg-slate-800 border border-slate-600 rounded text-white"
          >
            <option value="ทั้งหมด">ทั้งหมด</option>
            <option value="ใช้งานได้">ใช้งานได้</option>
            <option value="ใช้งานไม่ได้">ใช้งานไม่ได้</option>
            <option value="ซ่อมแซม">ซ่อมแซม</option>
          </select>
        </div>
      </div>

      {/* Seat Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {filteredSeats.map((seat) => (
          <div
            key={seat.id}
            className={`rounded-xl p-4 border flex flex-col justify-between ${
              seat.status === "AVAILABLE"
                ? "bg-green-900/20 border-green-500/50"
                : seat.status === "UNAVAILABLE"
                ? "bg-red-900/20 border-red-500/50"
                : "bg-orange-900/20 border-orange-500/50"
            }`}
          >
            {/* Header */}
            <div className="flex justify-between items-center mb-2">
              <h3 className="text-lg font-bold text-yellow-400">{seat.id}</h3>
              <div className="flex items-center gap-1">
                {seat.zone === "VIP" && (
                  <Crown className="text-yellow-400" size={18} />
                )}
                {seat.zone === "Room" && (
                  <UsersIcon className="text-purple-400" size={18} />
                )}
              </div>
            </div>

            {/* Content */}
            <div className="flex-1 text-sm space-y-1 mb-3">
              <div className="flex justify-between">
                <span className="text-slate-400">โซน:</span>
                <span className="text-white">Zone {seat.zone}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">ประเภท:</span>
                <span className="text-white">{seat.type}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">สถานะ:</span>
                <span
                  className={`font-semibold ${
                    seat.status === "AVAILABLE"
                      ? "text-green-400"
                      : seat.status === "UNAVAILABLE"
                      ? "text-red-400"
                      : "text-orange-400"
                  }`}
                >
                  {statusMap[seat.status]}
                </span>
              </div>
            </div>

            {/* Footer (Manage button) */}
            <div className="mt-3 relative">
              <button
                onClick={() =>
                  setOpenMenuId(openMenuId === seat.id ? null : seat.id)
                }
                className="w-full bg-blue-600 hover:bg-blue-700 text-white px-3 py-2 rounded"
              >
                จัดการที่นั่ง
              </button>

              {openMenuId === seat.id && (
                <div className="absolute left-0 right-0 top-full mt-2 bg-slate-800 border border-slate-700 rounded shadow-lg z-20">
                  <button
                    onClick={() => {
                      setEditSeat(seat);
                      setFormSeat(seat);
                      setShowEditModal(true);
                      setOpenMenuId(null);
                    }}
                    className="flex items-center gap-2 w-full text-left px-4 py-2 hover:bg-slate-700 text-white"
                  >
                    ✏️ แก้ไขที่นั่ง
                  </button>
                  <button
                    onClick={() => {
                      deleteSeat(seat.id);
                      setOpenMenuId(null);
                    }}
                    className="flex items-center gap-2 w-full text-left px-4 py-2 hover:bg-slate-700 text-white"
                  >
                    🗑️ ลบที่นั่ง
                  </button>
                  <button
                    onClick={() => {
                      updateSeatStatus(seat.id, "AVAILABLE");
                      setOpenMenuId(null);
                    }}
                    className="flex items-center gap-2 w-full text-left px-4 py-2 hover:bg-slate-700 text-white"
                  >
                    ✅ ตั้งเป็นใช้งานได้
                  </button>
                  <button
                    onClick={() => {
                      updateSeatStatus(seat.id, "UNAVAILABLE");
                      setOpenMenuId(null);
                    }}
                    className="flex items-center gap-2 w-full text-left px-4 py-2 hover:bg-slate-700 text-white"
                  >
                    ❌ ตั้งเป็นใช้งานไม่ได้
                  </button>
                  <button
                    onClick={() => {
                      updateSeatStatus(seat.id, "MAINTENANCE");
                      setOpenMenuId(null);
                    }}
                    className="flex items-center gap-2 w-full text-left px-4 py-2 hover:bg-slate-700 text-white"
                  >
                    🔧 ตั้งเป็นซ่อมแซม
                  </button>
                </div>
              )}
            </div>

          </div>
        ))}
      </div>

      {/* Add Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center">
          <div className="bg-slate-800 p-6 rounded-xl w-96">
            <h3 className="text-lg text-white mb-4">เพิ่มที่นั่ง</h3>
            <input
              placeholder="ประเภท"
              value={formSeat.type}
              onChange={(e) => setFormSeat({ ...formSeat, type: e.target.value })}
              className="w-full mb-3 p-2 rounded bg-slate-700 text-white"
            />
            <select
              value={formSeat.zone}
              onChange={(e) => setFormSeat({ ...formSeat, zone: e.target.value })}
              className="w-full mb-3 p-2 rounded bg-slate-700 text-white"
            >
              <option value="A">Zone A</option>
              <option value="B">Zone B</option>
              <option value="C">Zone C</option>
              <option value="VIP">Zone VIP</option>
              <option value="Room">Zone Room</option>
            </select>
            <select
              value={formSeat.status}
              onChange={(e) =>
                setFormSeat({ ...formSeat, status: e.target.value })
              }
              className="w-full mb-3 p-2 rounded bg-slate-700 text-white"
            >
              <option value="AVAILABLE">ใช้งานได้</option>
              <option value="UNAVAILABLE">ใช้งานไม่ได้</option>
              <option value="MAINTENANCE">ซ่อมแซม</option>
            </select>
            <div className="flex justify-end gap-2">
              <button
                onClick={() => setShowAddModal(false)}
                className="bg-gray-600 px-4 py-2 rounded text-white"
              >
                ยกเลิก
              </button>
              <button
                onClick={addSeat}
                className="bg-blue-600 px-4 py-2 rounded text-white"
              >
                บันทึก
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Edit Modal */}
      {showEditModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center">
          <div className="bg-slate-800 p-6 rounded-xl w-96">
            <h3 className="text-lg text-white mb-4">
              แก้ไขที่นั่ง #{editSeat?.id}
            </h3>
            <input
              placeholder="ประเภท"
              value={formSeat.type}
              onChange={(e) => setFormSeat({ ...formSeat, type: e.target.value })}
              className="w-full mb-3 p-2 rounded bg-slate-700 text-white"
            />
            <select
              value={formSeat.zone}
              onChange={(e) => setFormSeat({ ...formSeat, zone: e.target.value })}
              className="w-full mb-3 p-2 rounded bg-slate-700 text-white"
            >
              <option value="A">Zone A</option>
              <option value="B">Zone B</option>
              <option value="C">Zone C</option>
              <option value="VIP">Zone VIP</option>
              <option value="Room">Zone Room</option>
            </select>
            <select
              value={formSeat.status}
              onChange={(e) =>
                setFormSeat({ ...formSeat, status: e.target.value })
              }
              className="w-full mb-3 p-2 rounded bg-slate-700 text-white"
            >
              <option value="AVAILABLE">ใช้งานได้</option>
              <option value="UNAVAILABLE">ใช้งานไม่ได้</option>
              <option value="MAINTENANCE">ซ่อมแซม</option>
            </select>
            <div className="flex justify-end gap-2">
              <button
                onClick={() => setShowEditModal(false)}
                className="bg-gray-600 px-4 py-2 rounded text-white"
              >
                ยกเลิก
              </button>
              <button
                onClick={updateSeat}
                className="bg-green-600 px-4 py-2 rounded text-white"
              >
                บันทึก
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SeatManagementView;

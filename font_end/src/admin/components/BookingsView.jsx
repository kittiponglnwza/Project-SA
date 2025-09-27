// src/components/MenuManagement.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Plus, Edit3, Trash2, Save, X, Gift, Percent, Tag, Clock } from "lucide-react";

const API_URL = "http://localhost:3000"; // 👈 เปลี่ยนตาม backend

const MenuManagement = () => {
  const [menus, setMenus] = useState([]);
  const [promotions, setPromotions] = useState([]);
  const [activeTab, setActiveTab] = useState("menus");
  const [loading, setLoading] = useState(false);

  const [newMenu, setNewMenu] = useState({ name: "", price: "", category: "ขนม", image: "" });
  const [editingMenu, setEditingMenu] = useState(null);

  const [newPromotion, setNewPromotion] = useState({ name: "", discount: "", type: "combo", icon: "🎁" });
  const [editingPromotion, setEditingPromotion] = useState(null);

  const categories = ["ขนม", "เครื่องดื่ม", "อาหารสำเร็จรูป", "ของหวาน"];

  useEffect(() => {
    fetchMenus();
    fetchPromotions();
  }, []);

  const fetchMenus = async () => {
    setLoading(true);
    try {
      const res = await axios.get(`${API_URL}/menus`);
      setMenus(res.data);
    } catch (err) {
      console.error("Error fetching menus", err);
    } finally {
      setLoading(false);
    }
  };

  const fetchPromotions = async () => {
    try {
      const res = await axios.get(`${API_URL}/promotions`);
      setPromotions(res.data);
    } catch (err) {
      console.error("Error fetching promotions", err);
    }
  };

  // CRUD MENU
  const handleAddMenu = async () => {
    if (!newMenu.name || !newMenu.price) return alert("กรอกชื่อและราคา");
    if (!window.confirm("ยืนยันเพิ่มเมนูนี้?")) return;
    try {
      await axios.post(`${API_URL}/menus`, { ...newMenu, price: parseFloat(newMenu.price) });
      fetchMenus();
      setNewMenu({ name: "", price: "", category: "ขนม", image: "" });
    } catch (err) {
      console.error("Error adding menu", err);
    }
  };

  const handleUpdateMenu = async () => {
    if (!editingMenu) return;
    if (!window.confirm("ยืนยันแก้ไขเมนูนี้?")) return;
    try {
      await axios.put(`${API_URL}/menus/${editingMenu.id}`, {
        ...editingMenu,
        price: parseFloat(editingMenu.price),
      });
      fetchMenus();
      setEditingMenu(null);
    } catch (err) {
      console.error("Error updating menu", err);
    }
  };

  const handleDeleteMenu = async (id) => {
    if (!window.confirm("คุณแน่ใจว่าต้องการลบเมนูนี้?")) return;
    try {
      await axios.delete(`${API_URL}/menus/${id}`);
      fetchMenus();
    } catch (err) {
      console.error("Error deleting menu", err);
    }
  };

  // CRUD PROMOTION
  const handleAddPromotion = async () => {
    if (!newPromotion.name || !newPromotion.discount) return alert("กรอกชื่อและส่วนลด");
    if (!window.confirm("ยืนยันเพิ่มโปรโมชั่นนี้?")) return;
    try {
      await axios.post(`${API_URL}/promotions`, { ...newPromotion, discount: parseFloat(newPromotion.discount) });
      fetchPromotions();
      setNewPromotion({ name: "", discount: "", type: "combo", icon: "🎁" });
    } catch (err) {
      console.error("Error adding promotion", err);
    }
  };

  const handleUpdatePromotion = async () => {
    if (!editingPromotion) return;
    if (!window.confirm("ยืนยันแก้ไขโปรโมชั่นนี้?")) return;
    try {
      await axios.put(`${API_URL}/promotions/${editingPromotion.id}`, {
        ...editingPromotion,
        discount: parseFloat(editingPromotion.discount),
      });
      fetchPromotions();
      setEditingPromotion(null);
    } catch (err) {
      console.error("Error updating promotion", err);
    }
  };

  const handleDeletePromotion = async (id) => {
    if (!window.confirm("คุณแน่ใจว่าต้องการลบโปรโมชั่นนี้?")) return;
    try {
      await axios.delete(`${API_URL}/promotions/${id}`);
      fetchPromotions();
    } catch (err) {
      console.error("Error deleting promotion", err);
    }
  };

  // UI
  const isHappyHour = () => {
    const h = new Date().getHours();
    return h >= 14 && h < 17;
  };
  const isWeekend = () => {
    const d = new Date().getDay();
    return d === 0 || d === 6;
  };

  return (
    <div className="p-6 bg-slate-900 min-h-screen text-white">
      {/* PROMO STATUS */}
      <div className="bg-slate-800 rounded-xl p-4 mb-6">
        <h2 className="text-xl font-bold mb-3">🎁 สถานะโปรโมชั่นปัจจุบัน</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {isHappyHour() && (
            <div className="bg-slate-700 rounded-lg p-3 border border-slate-600">
              <Clock className="inline-block text-yellow-400 mr-2" /> Happy Hour 🔥
              <p className="text-sm text-slate-300">เครื่องดื่มลด 20% (14:00-17:00)</p>
            </div>
          )}
          {isWeekend() && (
            <div className="bg-slate-700 rounded-lg p-3 border border-slate-600">
              <Tag className="inline-block text-green-400 mr-2" /> Weekend Special 🎊
              <p className="text-sm text-slate-300">ซื้อ 2 ชิ้น ลด 25บ</p>
            </div>
          )}
          <div className="bg-slate-700 rounded-lg p-3 border border-slate-600">
            <Percent className="inline-block text-orange-400 mr-2" /> เซ็ตคอมโบ 🎁
            <p className="text-sm text-slate-300">ป๊อปคอร์น + โค้ก ลด 10บ</p>
          </div>
        </div>
      </div>

      {/* TABS */}
      <div className="flex gap-3 mb-6">
        <button
          className={`px-4 py-2 rounded-lg ${activeTab === "menus" ? "bg-gradient-to-r from-purple-500 to-pink-500" : "bg-slate-700"}`}
          onClick={() => setActiveTab("menus")}
        >
          🍽️ จัดการเมนู
        </button>
        <button
          className={`px-4 py-2 rounded-lg ${activeTab === "promotions" ? "bg-gradient-to-r from-orange-500 to-red-500" : "bg-slate-700"}`}
          onClick={() => setActiveTab("promotions")}
        >
          🎁 จัดการโปรโมชั่น
        </button>
      </div>

      {/* ADD MENU FORM */}
      {activeTab === "menus" && (
        <div className="mb-6">
          <input
            type="text"
            placeholder="ชื่อเมนู"
            value={newMenu.name}
            onChange={(e) => setNewMenu({ ...newMenu, name: e.target.value })}
            className="px-3 py-2 rounded bg-slate-700 mr-2"
          />
          <input
            type="number"
            placeholder="ราคา"
            value={newMenu.price}
            onChange={(e) => setNewMenu({ ...newMenu, price: e.target.value })}
            className="px-3 py-2 rounded bg-slate-700 mr-2"
          />
          <select
            value={newMenu.category}
            onChange={(e) => setNewMenu({ ...newMenu, category: e.target.value })}
            className="px-3 py-2 rounded bg-slate-700 mr-2"
          >
            {categories.map((c) => (
              <option key={c}>{c}</option>
            ))}
          </select>
          <input
            type="text"
            placeholder="URL รูป"
            value={newMenu.image}
            onChange={(e) => setNewMenu({ ...newMenu, image: e.target.value })}
            className="px-3 py-2 rounded bg-slate-700 mr-2"
          />
          <button onClick={handleAddMenu} className="bg-green-500 px-4 py-2 rounded">
            ➕ เพิ่มเมนู
          </button>
        </div>
      )}

      {/* LIST MENUS */}
      {activeTab === "menus" &&
        menus.map((m) => (
          <div key={m.id} className="bg-slate-800 rounded-lg p-4 mb-3 flex justify-between">
            {editingMenu?.id === m.id ? (
              <>
                <input
                  type="text"
                  value={editingMenu.name}
                  onChange={(e) => setEditingMenu({ ...editingMenu, name: e.target.value })}
                  className="px-2 py-1 rounded bg-slate-700 mr-2"
                />
                <input
                  type="number"
                  value={editingMenu.price}
                  onChange={(e) => setEditingMenu({ ...editingMenu, price: e.target.value })}
                  className="px-2 py-1 rounded bg-slate-700 mr-2"
                />
                <button onClick={handleUpdateMenu} className="bg-green-500 px-3 py-1 rounded">
                  บันทึก
                </button>
                <button onClick={() => setEditingMenu(null)} className="bg-gray-500 px-3 py-1 rounded">
                  ยกเลิก
                </button>
              </>
            ) : (
              <>
                <div>
                  <img
                    src={m.image || "/photo/default.jpg"}
                    alt={m.name}
                    className="w-16 h-16 object-cover rounded inline-block mr-3"
                  />
                  <span className="font-bold">{m.name}</span> - {m.price} บ
                </div>
                <div className="space-x-2">
                  <button onClick={() => setEditingMenu(m)} className="bg-blue-500 px-3 py-1 rounded">
                    <Edit3 size={16} />
                  </button>
                  <button onClick={() => handleDeleteMenu(m.id)} className="bg-red-500 px-3 py-1 rounded">
                    <Trash2 size={16} />
                  </button>
                </div>
              </>
            )}
          </div>
        ))}

      {/* ADD PROMO FORM */}
      {activeTab === "promotions" && (
        <div className="mb-6">
          <input
            type="text"
            placeholder="ชื่อโปรโมชั่น"
            value={newPromotion.name}
            onChange={(e) => setNewPromotion({ ...newPromotion, name: e.target.value })}
            className="px-3 py-2 rounded bg-slate-700 mr-2"
          />
          <input
            type="number"
            placeholder="ส่วนลด"
            value={newPromotion.discount}
            onChange={(e) => setNewPromotion({ ...newPromotion, discount: e.target.value })}
            className="px-3 py-2 rounded bg-slate-700 mr-2"
          />
          <button onClick={handleAddPromotion} className="bg-green-500 px-4 py-2 rounded">
            ➕ เพิ่มโปรโมชั่น
          </button>
        </div>
      )}

      {/* LIST PROMOS */}
      {activeTab === "promotions" &&
        promotions.map((p) => (
          <div key={p.id} className="bg-slate-800 rounded-lg p-4 mb-3 flex justify-between">
            {editingPromotion?.id === p.id ? (
              <>
                <input
                  type="text"
                  value={editingPromotion.name}
                  onChange={(e) => setEditingPromotion({ ...editingPromotion, name: e.target.value })}
                  className="px-2 py-1 rounded bg-slate-700 mr-2"
                />
                <input
                  type="number"
                  value={editingPromotion.discount}
                  onChange={(e) => setEditingPromotion({ ...editingPromotion, discount: e.target.value })}
                  className="px-2 py-1 rounded bg-slate-700 mr-2"
                />
                <button onClick={handleUpdatePromotion} className="bg-green-500 px-3 py-1 rounded">
                  บันทึก
                </button>
                <button onClick={() => setEditingPromotion(null)} className="bg-gray-500 px-3 py-1 rounded">
                  ยกเลิก
                </button>
              </>
            ) : (
              <>
                <div>
                  <span className="font-bold">{p.icon} {p.name}</span> - ลด {p.discount}
                </div>
                <div className="space-x-2">
                  <button onClick={() => setEditingPromotion(p)} className="bg-blue-500 px-3 py-1 rounded">
                    <Edit3 size={16} />
                  </button>
                  <button onClick={() => handleDeletePromotion(p.id)} className="bg-red-500 px-3 py-1 rounded">
                    <Trash2 size={16} />
                  </button>
                </div>
              </>
            )}
          </div>
        ))}
    </div>
  );
};

export default MenuManagement;

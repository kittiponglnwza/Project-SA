// src/pages/FoodPage.jsx
import React, { useState, useEffect } from "react";
import axios from "axios";
import { Plus, Minus, ShoppingCart, Gift } from "lucide-react";

const API_URL = "http://localhost:3000"; // backend ของคุณ

const FoodPage = () => {
  const [menus, setMenus] = useState([]);
  const [promotions, setPromotions] = useState([]);
  const [cart, setCart] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("ขนม");
  const [paymentMethod, setPaymentMethod] = useState("cash");
  const [showPaymentModal, setShowPaymentModal] = useState(false);

  // 👉 state ใหม่
  const [nickname, setNickname] = useState("");
  const [seatNumber, setSeatNumber] = useState("");

  const categories = ["ขนม", "เครื่องดื่ม", "อาหารสำเร็จรูป", "ของหวาน", "โปรโมชั่น"];

  useEffect(() => {
    fetchMenus();
    fetchPromotions();
  }, []);

  const fetchMenus = async () => {
    try {
      const res = await axios.get(`${API_URL}/menus`);
      setMenus(res.data);
    } catch (err) {
      console.error("Error fetching menus", err);
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

  // Helpers
  const isHappyHour = () => {
    const now = new Date();
    const h = now.getHours();
    return h >= 14 && h < 17;
  };

  const isWeekend = () => {
    const d = new Date().getDay();
    return d === 0 || d === 6;
  };

  const addToCart = (menu) => {
    const exist = cart.find((c) => c.id === menu.id);
    if (exist) {
      setCart(
        cart.map((c) =>
          c.id === menu.id ? { ...c, quantity: c.quantity + 1 } : c
        )
      );
    } else {
      setCart([...cart, { ...menu, quantity: 1 }]);
    }
  };

  const removeFromCart = (id) => {
    const exist = cart.find((c) => c.id === id);
    if (exist.quantity > 1) {
      setCart(
        cart.map((c) =>
          c.id === id ? { ...c, quantity: c.quantity - 1 } : c
        )
      );
    } else {
      setCart(cart.filter((c) => c.id !== id));
    }
  };

  const getSubtotal = () =>
    cart.reduce((sum, i) => sum + i.price * i.quantity, 0);

  const calculateDiscounts = () => {
    let discounts = [];

    // Happy Hour
    if (isHappyHour()) {
      const drinkDiscount = cart
        .filter((i) => i.category === "เครื่องดื่ม")
        .reduce((sum, i) => sum + i.price * i.quantity * 0.2, 0);
      if (drinkDiscount > 0)
        discounts.push({
          name: "Happy Hour -20%",
          amount: Math.round(drinkDiscount),
        });
    }

    // Weekend Special
    const totalQty = cart.reduce((sum, i) => sum + i.quantity, 0);
    if (isWeekend() && totalQty >= 2) {
      discounts.push({ name: "Weekend Special", amount: 25 });
    }

    // Bulk
    if (getSubtotal() >= 150) {
      discounts.push({ name: "Bulk Discount", amount: 20 });
    }

    return discounts;
  };

  const getTotalDiscount = () =>
    calculateDiscounts().reduce((sum, d) => sum + d.amount, 0);

  const getTotalPrice = () => getSubtotal() - getTotalDiscount();

  // ✅ กดสั่งซื้อ
  const handleOrder = async () => {
    if (cart.length === 0) return alert("🛒 กรุณาเลือกอาหารก่อน");
    if (!nickname || !seatNumber) return alert("⚠️ กรุณากรอกชื่อเล่นและหมายเลขโต๊ะ");

    const token = localStorage.getItem("token");
    const userId = localStorage.getItem("userId");

    try {
      await axios.post(
        `${API_URL}/orders`,
        {
          userId: userId ? parseInt(userId, 10) : null,
          seatId: parseInt(seatNumber, 10), // 👈 เก็บเป็น int
          customerName: nickname, // 👈 ชื่อเล่น
          paymentMethod,
          total: getTotalPrice(),
          items: cart.map((i) => ({
            menuId: i.id,
            quantity: i.quantity,
            price: i.price,
          })),
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      alert("✅ สั่งอาหารสำเร็จ");
      setCart([]);
      setShowPaymentModal(false);
      setNickname("");
      setSeatNumber("");
    } catch (err) {
      console.error("Error ordering", err.response?.data || err.message);
      alert("❌ สั่งอาหารไม่สำเร็จ");
    }
  };

  return (
    <div className="p-6 bg-slate-900 min-h-screen text-white space-y-8">
      {/* Header */}
      <div className="mb-4">
        <div className="flex items-center gap-3 mb-2">
          <span className="text-2xl">🍕</span>
          <h2 className="text-2xl font-bold bg-gradient-to-r from-orange-400 to-red-600 bg-clip-text text-transparent">
            สั่งอาหาร
          </h2>
        </div>
        <div className="w-20 h-1 bg-gradient-to-r from-orange-500 to-red-500 rounded-full"></div>
      </div>

      {/* Active Promotions Banner */}
      <div className="bg-gradient-to-r from-slate-700 via-slate-600 to-slate-800 rounded-2xl p-6 border border-slate-500 shadow-xl">
        <div className="flex items-center gap-3 mb-4">
          <Gift className="text-yellow-400" size={32} />
          <h3 className="text-2xl font-bold text-white">🎉 โปรโมชั่นพิเศษ</h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {promotions.map((promo) => (
            <div
              key={promo.id}
              className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20"
            >
              <div className="flex items-center gap-2 mb-2">
                <span className="text-xl">{promo.icon || "🏷️"}</span>
                <span className="font-bold text-orange-300">{promo.name}</span>
              </div>
              <p className="text-white text-sm">{promo.description}</p>
              {promo.startTime && (
                <p className="text-yellow-300 text-xs">
                  {promo.startTime} - {promo.endTime}
                </p>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Category Tabs */}
      <div className="flex flex-wrap gap-3 mb-8">
        {categories.map((c) => (
          <button
            key={c}
            onClick={() => setSelectedCategory(c)}
            className={`px-6 py-3 rounded-full font-medium transition-all duration-300 ${
              selectedCategory === c
                ? "bg-gradient-to-r from-orange-500 to-red-600 text-white shadow-lg"
                : "bg-slate-800 text-slate-300 border border-slate-600 hover:border-orange-400"
            }`}
          >
            {c === "โปรโมชั่น" && <Gift size={18} className="inline mr-1" />}
            {c}
          </button>
        ))}
      </div>

      <div className="grid lg:grid-cols-4 gap-8">
        {/* Menu Items */}
        <div className="lg:col-span-3">
          {selectedCategory === "โปรโมชั่น" ? (
            <div>
              <h3 className="text-2xl font-bold mb-4">🎁 โปรโมชั่นทั้งหมด</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {promotions.map((promo) => (
                  <div
                    key={promo.id}
                    className="bg-slate-800 rounded-xl p-4 border border-slate-700"
                  >
                    <h4 className="font-bold text-lg mb-2">
                      {promo.icon} {promo.name}
                    </h4>
                    <p className="text-slate-300 text-sm">{promo.description}</p>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {menus
                .filter((m) => m.category === selectedCategory)
                .map((m) => {
                  const qty = cart.find((c) => c.id === m.id)?.quantity || 0;
                  return (
                    <div
                      key={m.id}
                      className="bg-slate-800/60 rounded-xl p-4 border border-slate-700 hover:border-orange-400 transition"
                    >
                      <img
                        src={m.image || "/photo/default.jpg"}
                        alt={m.name}
                        className="w-full h-40 object-cover rounded mb-2"
                      />
                      <h3 className="font-bold">{m.name}</h3>
                      <p className="text-slate-400 text-sm">{m.description}</p>
                      <p className="text-orange-400 font-bold">{m.price}฿</p>

                      {qty === 0 ? (
                        <button
                          onClick={() => addToCart(m)}
                          className="w-full bg-gradient-to-r from-orange-500 to-red-600 mt-2 py-2 rounded-lg"
                        >
                          ➕ เพิ่มลงตะกร้า
                        </button>
                      ) : (
                        <div className="flex justify-between items-center mt-2">
                          <button
                            onClick={() => removeFromCart(m.id)}
                            className="bg-red-500 px-3 py-1 rounded"
                          >
                            <Minus size={16} />
                          </button>
                          <span>{qty}</span>
                          <button
                            onClick={() => addToCart(m)}
                            className="bg-green-500 px-3 py-1 rounded"
                          >
                            <Plus size={16} />
                          </button>
                        </div>
                      )}
                    </div>
                  );
                })}
            </div>
          )}
        </div>

        {/* Cart */}
        <div className="lg:col-span-1 bg-slate-800 rounded-xl p-4 border border-slate-700">
          <h3 className="font-bold mb-3 flex items-center gap-2">
            <ShoppingCart /> ตะกร้า
          </h3>
          {cart.length === 0 ? (
            <p className="text-slate-400">ยังไม่มีสินค้า</p>
          ) : (
            <>
              {cart.map((c) => (
                <div
                  key={c.id}
                  className="flex justify-between border-b border-slate-700 py-1"
                >
                  <span>
                    {c.name} x{c.quantity}
                  </span>
                  <span>{c.price * c.quantity}฿</span>
                </div>
              ))}
              <div className="mt-2">
                <p>ยอดรวม: {getSubtotal()}฿</p>
                {calculateDiscounts().map((d, i) => (
                  <p key={i} className="text-green-400">
                    {d.name}: -{d.amount}฿
                  </p>
                ))}
                <p className="font-bold text-orange-400">
                  สุทธิ: {getTotalPrice()}฿
                </p>
              </div>

              <button
                onClick={() => setShowPaymentModal(true)}
                className="w-full bg-gradient-to-r from-orange-500 to-red-500 mt-4 py-2 rounded-lg"
              >
                🛒 สั่งอาหาร
              </button>
            </>
          )}
        </div>
      </div>

      {/* Payment Modal */}
      {showPaymentModal && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center">
          <div className="bg-slate-800 p-6 rounded-xl w-96">
            <h3 className="font-bold mb-4">💳 เลือกวิธีชำระเงิน</h3>

            {/* ชื่อเล่น */}
            <input
              type="text"
              placeholder="ชื่อเล่น"
              value={nickname}
              onChange={(e) => setNickname(e.target.value)}
              className="w-full mb-3 p-2 rounded bg-slate-700 text-white"
            />

            {/* หมายเลขโต๊ะ */}
            <input
              type="number"
              placeholder="หมายเลขโต๊ะ"
              value={seatNumber}
              onChange={(e) => setSeatNumber(e.target.value)}
              className="w-full mb-3 p-2 rounded bg-slate-700 text-white"
            />

            {/* วิธีจ่าย */}
            <div className="flex gap-3 mb-4">
              <button
                onClick={() => setPaymentMethod("cash")}
                className={`flex-1 p-2 rounded ${
                  paymentMethod === "cash" ? "bg-green-500" : "bg-slate-700"
                }`}
              >
                เงินสด
              </button>
              <button
                onClick={() => setPaymentMethod("qr")}
                className={`flex-1 p-2 rounded ${
                  paymentMethod === "qr" ? "bg-blue-500" : "bg-slate-700"
                }`}
              >
                QR Code
              </button>
            </div>

            <button
              onClick={handleOrder}
              className="w-full bg-orange-500 py-2 rounded-lg"
            >
              ✅ ยืนยันสั่งซื้อ
            </button>
            <button
              onClick={() => setShowPaymentModal(false)}
              className="w-full mt-2 bg-slate-600 py-2 rounded-lg"
            >
              ❌ ยกเลิก
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default FoodPage;

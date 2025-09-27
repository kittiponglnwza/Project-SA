import React, { useEffect, useState } from 'react';
import { Plus, Edit3, Trash2, Save, X, User, ArrowLeft, Gift, Tag, Clock, Percent, Star, ShoppingCart } from 'lucide-react';

const MenuManagement = () => {
  const [menus, setMenus] = useState([]);
  const [promotions, setPromotions] = useState({});
  const [loading, setLoading] = useState(false);
  const [isAddingMenu, setIsAddingMenu] = useState(false);
  const [isAddingPromotion, setIsAddingPromotion] = useState(false);
  const [editingMenu, setEditingMenu] = useState(null);
  const [editingPromotion, setEditingPromotion] = useState(null);
  const [categories] = useState(['ขนม', 'เครื่องดื่ม', 'อาหารสำเร็จรูป', 'ของหวาน']);
  const [activeTab, setActiveTab] = useState('menus');
  
  const [newMenu, setNewMenu] = useState({
    name: '',
    price: '',
    category: 'ขนม',
    description: '',
    image: '/photo/bread.jpg',
    rating: 4.0,
    hasPromo: false,
    hasHappyHour: false
  });

  const [newPromotion, setNewPromotion] = useState({
    name: '',
    description: '',
    type: 'combo',
    discount: '',
    category: '',
    startTime: '',
    endTime: '',
    minQuantity: '',
    minAmount: '',
    validDays: [],
    items: [],
    requiredCategory: '',
    icon: '🎁'
  });

  const promotionTypes = {
    combo: 'เซ็ตคอมโบ',
    category: 'ลดตามหมวดหมู่', 
    quantity: 'ลดตามจำนวน',
    amount: 'ลดตามยอดซื้อ',
    happyhour: 'Happy Hour'
  };

  const promotionIcons = ['🎁', '🎉', '🔥', '⭐', '💰', '🍿', '🍔', '☕', '⏰', '🏷️', '🍚', '🥤'];
  const weekDays = ['อาทิตย์', 'จันทร์', 'อังคาร', 'พุธ', 'พฤหัสบดี', 'ศุกร์', 'เสาร์'];

  // Sample menu data matching FoodPage.jsx
  useEffect(() => {
    fetchMenus();
    fetchPromotions();
  }, []);

  const fetchMenus = async () => {
    setLoading(true);
    try {
      setTimeout(() => {
        setMenus([
          // ขนม (snacks)
          { id: 1, name: 'ขนมปังมาม่า', price: 25, category: 'ขนม', description: 'ขนมปังกรอบ รสชาติเข้มข้น', image: '/photo/bread.jpg', rating: 4.5, hasPromo: false },
          { id: 2, name: 'มันฝรั่งทอด', price: 35, category: 'ขนม', description: 'มันฝรั่งทอดกรอบ เสิร์ฟร้อน', image: '/photo/fries.jpg', rating: 4.8, hasPromo: false },
          { id: 3, name: 'ป๊อปคอร์น', price: 20, category: 'ขนม', description: 'ป๊อปคอร์นหวาน กรอบอร่อย', image: '/photo/popcorn.jpg', rating: 4.2, hasPromo: true },
          { id: 4, name: 'ขนมจีบทอด', price: 30, category: 'ขนม', description: 'ขนมจีบทอดกรอบ ไส้แน่น', image: '/photo/dumpling.jpg', rating: 4.6, hasPromo: false },
          
          // เครื่องดื่ม (drinks)
          { id: 5, name: 'โค้ก', price: 15, category: 'เครื่องดื่ม', description: 'โค้กเย็นๆ สดชื่น', image: '/photo/coke.jpg', rating: 4.7, hasPromo: true, hasHappyHour: true },
          { id: 6, name: 'กาแฟเย็น', price: 25, category: 'เครื่องดื่ม', description: 'กาแฟเย็นหอมกรุ่น', image: '/photo/iced-coffee.jpg', rating: 4.4, hasHappyHour: true },
          { id: 7, name: 'น้ำส้ม', price: 20, category: 'เครื่องดื่ม', description: 'น้ำส้มคั้นสด เปรี้ยวหวาน', image: '/photo/orange-juice.jpg', rating: 4.3, hasHappyHour: true },
          { id: 8, name: 'เรดบูล', price: 30, category: 'เครื่องดื่ม', description: 'เรดบูล เพิ่มพลัง', image: '/photo/redbull.jpg', rating: 4.9, hasHappyHour: true },
          
          // อาหารสำเร็จรูป (instant)
          { id: 9, name: 'มาม่า', price: 15, category: 'อาหารสำเร็จรูป', description: 'บะหมี่กึ่งสำเร็จรูป รสต้มยำ', image: '/photo/mama.jpg', rating: 4.1, hasPromo: false },
          { id: 10, name: 'ข้าวผัดไข่', price: 45, category: 'อาหารสำเร็จรูป', description: 'ข้าวผัดไข่ อร่อยเหมือนทำเอง', image: '/photo/fried-rice.jpg', rating: 4.5, hasPromo: true },
          { id: 11, name: 'แซนวิช', price: 35, category: 'อาหารสำเร็จรูป', description: 'แซนวิชไข่ ผักสลัด', image: '/photo/sandwich.jpg', rating: 4.0, hasPromo: false },
          { id: 12, name: 'ข้าวกล่อง', price: 50, category: 'อาหารสำเร็จรูป', description: 'ข้าวกล่อง กับข้าวหลากหลาย', image: '/photo/lunchbox.jpg', rating: 4.3, hasPromo: false },
          
          // ของหวาน (desserts)
          { id: 13, name: 'ไอศกรีม', price: 20, category: 'ของหวาน', description: 'ไอศกรีมหลากหลายรส', image: '/photo/ice-cream.jpg', rating: 4.6, hasPromo: false },
          { id: 14, name: 'เค้กช็อกโกแลต', price: 40, category: 'ของหวาน', description: 'เค้กช็อกโกแลต หวานมัน', image: '/photo/chocolate-cake.jpg', rating: 4.8, hasPromo: false },
          { id: 15, name: 'โดนัท', price: 25, category: 'ของหวาน', description: 'โดนัทนุ่ม หวานหอม', image: '/photo/donut.jpg', rating: 4.4, hasPromo: false },
          { id: 16, name: 'คุกกี้', price: 30, category: 'ของหวาน', description: 'คุกกี้กรอب รสชาติดี', image: '/photo/cookies.jpg', rating: 4.2, hasPromo: false }
        ]);
        setLoading(false);
      }, 500);
    } catch (err) {
      console.error("Error fetching menus:", err);
      setLoading(false);
    }
  };

  const fetchPromotions = async () => {
    try {
      setTimeout(() => {
        setPromotions({
          happyHour: {
            id: 'happy-hour',
            name: 'Happy Hour',
            description: '14:00-17:00 น. ลด 20% ทุกเครื่องดื่ม',
            discount: 20,
            type: 'category',
            category: 'เครื่องดื่ม',
            startTime: '14:00',
            endTime: '17:00',
            icon: '⏰',
            isActive: true
          },
          combo1: {
            id: 'combo-snack',
            name: 'เซ็ตขนมครบครัน',
            description: 'ซื้อ ป๊อปคอร์น + โค้ก ลด 10บ',
            items: [3, 5], // popcorn + coke
            discount: 10,
            type: 'combo',
            icon: '🍿',
            isActive: true
          },
          combo2: {
            id: 'combo-meal',
            name: 'เซ็ตอิ่มท้อง',
            description: 'ซื้อ ข้าวผัดไข่ + เครื่องดื่ม ลด 15บ',
            items: [10], // fried rice
            requiredCategory: 'เครื่องดื่ม',
            discount: 15,
            type: 'combo',
            icon: '🍚',
            isActive: true
          },
          weekendSpecial: {
            id: 'weekend-special',
            name: 'วันหยุดสุดคุ้ม',
            description: 'เสาร์-อาทิตย์ ซื้อ 2 ชิ้น ลด 25บ',
            minQuantity: 2,
            discount: 25,
            type: 'quantity',
            validDays: [0, 6], // Sunday, Saturday
            icon: '🎉',
            isActive: true
          },
          bulkDiscount: {
            id: 'bulk-discount',
            name: 'ซื้อมากลดมาก',
            description: 'ซื้อครบ 150บ ลด 20บ',
            minAmount: 150,
            discount: 20,
            type: 'amount',
            icon: '💰',
            isActive: true
          }
        });
      }, 300);
    } catch (err) {
      console.error("Error fetching promotions:", err);
    }
  };

  // Check if it's currently Happy Hour (14:00-17:00)
  const isHappyHour = () => {
    const now = new Date();
    const currentHour = now.getHours();
    return currentHour >= 14 && currentHour < 17;
  };

  // Check if it's weekend
  const isWeekend = () => {
    const today = new Date().getDay();
    return today === 0 || today === 6;
  };

  const handleAddMenu = async () => {
    if (!newMenu.name || !newMenu.price) {
      alert('กรุณากรอกชื่อเมนูและราคา');
      return;
    }

    try {
      const menuToAdd = {
        ...newMenu,
        id: Date.now(),
        price: parseFloat(newMenu.price),
        rating: parseFloat(newMenu.rating)
      };
      setMenus(prev => [...prev, menuToAdd]);
      
      setNewMenu({
        name: '',
        price: '',
        category: 'ขนม',
        description: '',
        image: '/photo/bread.jpg',
        rating: 4.0,
        hasPromo: false,
        hasHappyHour: false
      });
      setIsAddingMenu(false);
      
    } catch (err) {
      console.error("Error adding menu:", err);
    }
  };

  const handleAddPromotion = async () => {
    if (!newPromotion.name || !newPromotion.description) {
      alert('กรุณากรอกชื่อและรายละเอียดโปรโมชั่น');
      return;
    }

    try {
      const promoToAdd = {
        ...newPromotion,
        id: Date.now().toString(),
        discount: parseFloat(newPromotion.discount) || 0,
        minQuantity: parseInt(newPromotion.minQuantity) || 0,
        minAmount: parseFloat(newPromotion.minAmount) || 0,
        isActive: true
      };
      
      setPromotions(prev => ({
        ...prev,
        [promoToAdd.id]: promoToAdd
      }));
      
      setNewPromotion({
        name: '',
        description: '',
        type: 'combo',
        discount: '',
        category: '',
        startTime: '',
        endTime: '',
        minQuantity: '',
        minAmount: '',
        validDays: [],
        items: [],
        requiredCategory: '',
        icon: '🎁'
      });
      setIsAddingPromotion(false);
      
    } catch (err) {
      console.error("Error adding promotion:", err);
    }
  };

  const handleEditMenu = async (updatedMenu) => {
    try {
      setMenus(prev => prev.map(menu => 
        menu.id === updatedMenu.id ? { ...updatedMenu, price: parseFloat(updatedMenu.price), rating: parseFloat(updatedMenu.rating) } : menu
      ));
      setEditingMenu(null);
    } catch (err) {
      console.error("Error updating menu:", err);
    }
  };

  const handleEditPromotion = async (updatedPromo) => {
    try {
      setPromotions(prev => ({
        ...prev,
        [updatedPromo.id]: {
          ...updatedPromo,
          discount: parseFloat(updatedPromo.discount) || 0,
          minQuantity: parseInt(updatedPromo.minQuantity) || 0,
          minAmount: parseFloat(updatedPromo.minAmount) || 0
        }
      }));
      setEditingPromotion(null);
    } catch (err) {
      console.error("Error updating promotion:", err);
    }
  };

  const handleDeleteMenu = async (menuId) => {
    if (window.confirm('คุณต้องการลบเมนูนี้หรือไม่?')) {
      try {
        setMenus(prev => prev.filter(menu => menu.id !== menuId));
      } catch (err) {
        console.error("Error deleting menu:", err);
      }
    }
  };

  const handleDeletePromotion = async (promoId) => {
    if (window.confirm('คุณต้องการลบโปรโมชั่นนี้หรือไม่?')) {
      try {
        setPromotions(prev => {
          const newPromotions = { ...prev };
          delete newPromotions[promoId];
          return newPromotions;
        });
      } catch (err) {
        console.error("Error deleting promotion:", err);
      }
    }
  };

  const togglePromotionStatus = (promoId) => {
    setPromotions(prev => ({
      ...prev,
      [promoId]: {
        ...prev[promoId],
        isActive: !prev[promoId].isActive
      }
    }));
  };

  const MenuCard = ({ menu }) => {
    const isEditing = editingMenu?.id === menu.id;
    const [editData, setEditData] = useState(menu);

    return (
      <div className="bg-slate-800 rounded-2xl overflow-hidden shadow-xl border border-slate-700 hover:border-orange-500/50 transition-all duration-300 relative">
        {/* Promotion Badge */}
        {(menu.hasPromo || menu.hasHappyHour) && (
          <div className="absolute top-2 left-2 z-10">
            <div className="bg-gradient-to-r from-orange-500 to-red-500 text-white text-xs font-bold px-2 py-1 rounded-full">
              {menu.hasHappyHour && isHappyHour() ? '⏰ -20%' : '🔥 โปรโมชั่น'}
            </div>
          </div>
        )}

        <div className="relative h-48">
          <img
            src={editData.image}
            alt={editData.name}
            className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
            onError={(e) => {
              e.target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgdmlld0JveD0iMCAwIDIwMCAyMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIyMDAiIGhlaWdodD0iMjAwIiBmaWxsPSIjNEI1NTYzIi8+CjxwYXRoIGQ9Ik0xMDAgNzBDMTEwLjQ5MyA3MCA4MCA3OSA4MCA3OSA4MCA3OSA4MCA4OSA4MCA4OUw4MCA4OTODODE2IDg5IDg5IDgwIDg5IDgwSDgwSDgwSDgwLz4KPHA+PC9wPgo8L3N2Zz4K';
            }}
          />
          <div className="absolute top-2 right-2 flex gap-2">
            {!isEditing ? (
              <>
                <button
                  onClick={() => setEditingMenu(menu)}
                  className="bg-blue-500/80 hover:bg-blue-500 p-2 rounded-full transition text-white"
                >
                  <Edit3 className="w-4 h-4" />
                </button>
                <button
                  onClick={() => handleDeleteMenu(menu.id)}
                  className="bg-red-500/80 hover:bg-red-500 p-2 rounded-full transition text-white"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </>
            ) : (
              <>
                <button
                  onClick={() => handleEditMenu(editData)}
                  className="bg-green-500/80 hover:bg-green-500 p-2 rounded-full transition text-white"
                >
                  <Save className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setEditingMenu(null)}
                  className="bg-gray-500/80 hover:bg-gray-500 p-2 rounded-full transition text-white"
                >
                  <X className="w-4 h-4" />
                </button>
              </>
            )}
          </div>
        </div>

        <div className="p-4">
          {isEditing ? (
            <div className="space-y-3">
              <input
                type="text"
                value={editData.name}
                onChange={(e) => setEditData(prev => ({ ...prev, name: e.target.value }))}
                className="w-full bg-slate-700 border border-slate-600 rounded-lg px-3 py-2 text-white"
                placeholder="ชื่อเมนู"
              />
              <div className="flex gap-2">
                <input
                  type="number"
                  value={editData.price}
                  onChange={(e) => setEditData(prev => ({ ...prev, price: e.target.value }))}
                  className="flex-1 bg-slate-700 border border-slate-600 rounded-lg px-3 py-2 text-white"
                  placeholder="ราคา"
                />
                <input
                  type="number"
                  step="0.1"
                  min="1"
                  max="5"
                  value={editData.rating}
                  onChange={(e) => setEditData(prev => ({ ...prev, rating: e.target.value }))}
                  className="w-20 bg-slate-700 border border-slate-600 rounded-lg px-3 py-2 text-white"
                  placeholder="คะแนน"
                />
              </div>
              <select
                value={editData.category}
                onChange={(e) => setEditData(prev => ({ ...prev, category: e.target.value }))}
                className="w-full bg-slate-700 border border-slate-600 rounded-lg px-3 py-2 text-white"
              >
                {categories.map(cat => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
              <input
                type="text"
                value={editData.image}
                onChange={(e) => setEditData(prev => ({ ...prev, image: e.target.value }))}
                className="w-full bg-slate-700 border border-slate-600 rounded-lg px-3 py-2 text-white"
                placeholder="URL รูปภาพ"
              />
              <textarea
                value={editData.description}
                onChange={(e) => setEditData(prev => ({ ...prev, description: e.target.value }))}
                className="w-full bg-slate-700 border border-slate-600 rounded-lg px-3 py-2 text-white h-20 resize-none"
                placeholder="รายละเอียด"
              />
              <div className="flex gap-4">
                <label className="flex items-center gap-2 text-white">
                  <input
                    type="checkbox"
                    checked={editData.hasPromo}
                    onChange={(e) => setEditData(prev => ({ ...prev, hasPromo: e.target.checked }))}
                    className="rounded"
                  />
                  มีโปรโมชั่น
                </label>
                <label className="flex items-center gap-2 text-white">
                  <input
                    type="checkbox"
                    checked={editData.hasHappyHour}
                    onChange={(e) => setEditData(prev => ({ ...prev, hasHappyHour: e.target.checked }))}
                    className="rounded"
                  />
                  รองรับ Happy Hour
                </label>
              </div>
            </div>
          ) : (
            <>
              <div className="text-center mb-4">
                <h3 className="text-xl font-bold text-white mb-2">{menu.name}</h3>
                <p className="text-slate-400 text-sm mb-3">{menu.description}</p>
                
                {/* Rating */}
                <div className="flex items-center justify-center gap-2 mb-3">
                  <Star className="w-4 h-4 text-yellow-400 fill-current" />
                  <span className="text-yellow-400 font-medium">{menu.rating}</span>
                </div>

                {/* Category Badge */}
                <div className="flex justify-center mb-3">
                  <span className="bg-gradient-to-r from-blue-400 to-purple-400 text-white px-3 py-1 rounded-full text-sm font-medium">
                    {menu.category}
                  </span>
                </div>

                {/* Price */}
                <div className="text-2xl font-bold text-orange-400 mb-3">
                  {menu.price}บ
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    );
  };

  const PromotionCard = ({ promo }) => {
    const isEditing = editingPromotion?.id === promo.id;
    const [editData, setEditData] = useState(promo);

    const getRelatedMenuNames = () => {
      if (!promo.items || promo.items.length === 0) return '';
      return promo.items.map(id => {
        const menu = menus.find(m => m.id === id);
        return menu ? menu.name : '';
      }).filter(name => name).join(', ');
    };

    return (
      <div className="bg-gradient-to-br from-slate-700/80 to-slate-800/80 rounded-2xl p-6 border border-slate-600 shadow-xl relative">
        <div className="absolute top-4 right-4 flex gap-2">
          {!isEditing ? (
            <>
              <button
                onClick={() => togglePromotionStatus(promo.id)}
                className={`px-3 py-1 rounded-full text-xs font-bold transition ${
                  promo.isActive 
                    ? 'bg-green-500 text-white' 
                    : 'bg-gray-500 text-white'
                }`}
              >
                {promo.isActive ? 'เปิดใช้งาน' : 'ปิดใช้งาน'}
              </button>
              <button
                onClick={() => setEditingPromotion(promo)}
                className="bg-blue-500/80 hover:bg-blue-500 p-2 rounded-full transition text-white"
              >
                <Edit3 className="w-4 h-4" />
              </button>
              <button
                onClick={() => handleDeletePromotion(promo.id)}
                className="bg-red-500/80 hover:bg-red-500 p-2 rounded-full transition text-white"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </>
          ) : (
            <>
              <button
                onClick={() => handleEditPromotion(editData)}
                className="bg-green-500/80 hover:bg-green-500 p-2 rounded-full transition text-white"
              >
                <Save className="w-4 h-4" />
              </button>
              <button
                onClick={() => setEditingPromotion(null)}
                className="bg-gray-500/80 hover:bg-gray-500 p-2 rounded-full transition text-white"
              >
                <X className="w-4 h-4" />
              </button>
            </>
          )}
        </div>

        {isEditing ? (
          <div className="space-y-4">
            <div className="flex items-center gap-3 mb-4">
              <select
                value={editData.icon}
                onChange={(e) => setEditData(prev => ({ ...prev, icon: e.target.value }))}
                className="bg-slate-600 border border-slate-500 rounded-lg px-3 py-2 text-white text-lg"
              >
                {promotionIcons.map(icon => (
                  <option key={icon} value={icon}>{icon}</option>
                ))}
              </select>
              <input
                type="text"
                value={editData.name}
                onChange={(e) => setEditData(prev => ({ ...prev, name: e.target.value }))}
                className="flex-1 bg-slate-600 border border-slate-500 rounded-lg px-3 py-2 text-white"
                placeholder="ชื่อโปรโมชั่น"
              />
            </div>
            
            <textarea
              value={editData.description}
              onChange={(e) => setEditData(prev => ({ ...prev, description: e.target.value }))}
              className="w-full bg-slate-600 border border-slate-500 rounded-lg px-3 py-2 text-white h-20 resize-none"
              placeholder="รายละเอียดโปรโมชั่น"
            />

            <div className="grid grid-cols-2 gap-3">
              <select
                value={editData.type}
                onChange={(e) => setEditData(prev => ({ ...prev, type: e.target.value }))}
                className="bg-slate-600 border border-slate-500 rounded-lg px-3 py-2 text-white"
              >
                {Object.entries(promotionTypes).map(([key, label]) => (
                  <option key={key} value={key}>{label}</option>
                ))}
              </select>
              <input
                type="number"
                value={editData.discount}
                onChange={(e) => setEditData(prev => ({ ...prev, discount: e.target.value }))}
                className="bg-slate-600 border border-slate-500 rounded-lg px-3 py-2 text-white"
                placeholder="จำนวนส่วนลด"
              />
            </div>

            {editData.type === 'category' && (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                <select
                  value={editData.category || ''}
                  onChange={(e) => setEditData(prev => ({ ...prev, category: e.target.value }))}
                  className="bg-slate-600 border border-slate-500 rounded-lg px-3 py-2 text-white"
                >
                  <option value="">เลือกหมวดหมู่</option>
                  {categories.map(cat => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
                <input
                  type="time"
                  value={editData.startTime || ''}
                  onChange={(e) => setEditData(prev => ({ ...prev, startTime: e.target.value }))}
                  className="bg-slate-600 border border-slate-500 rounded-lg px-3 py-2 text-white"
                  placeholder="เวลาเริ่ม"
                />
                <input
                  type="time"
                  value={editData.endTime || ''}
                  onChange={(e) => setEditData(prev => ({ ...prev, endTime: e.target.value }))}
                  className="bg-slate-600 border border-slate-500 rounded-lg px-3 py-2 text-white"
                  placeholder="เวลาสิ้นสุด"
                />
              </div>
            )}

            {editData.type === 'quantity' && (
              <div className="space-y-3">
                <input
                  type="number"
                  value={editData.minQuantity || ''}
                  onChange={(e) => setEditData(prev => ({ ...prev, minQuantity: e.target.value }))}
                  className="w-full bg-slate-600 border border-slate-500 rounded-lg px-3 py-2 text-white"
                  placeholder="จำนวนขั้นต่ำ"
                />
                <div className="text-white">
                  <label className="block text-sm text-slate-300 mb-2">วันที่ใช้ได้</label>
                  <div className="grid grid-cols-4 gap-2">
                    {weekDays.map((day, index) => (
                      <label key={index} className="flex items-center gap-1 text-sm">
                        <input
                          type="checkbox"
                          checked={editData.validDays?.includes(index) || false}
                          onChange={(e) => {
                            if (e.target.checked) {
                              setEditData(prev => ({
                                ...prev,
                                validDays: [...(prev.validDays || []), index]
                              }));
                            } else {
                              setEditData(prev => ({
                                ...prev,
                                validDays: (prev.validDays || []).filter(d => d !== index)
                              }));
                            }
                          }}
                          className="rounded"
                        />
                        {day}
                      </label>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {editData.type === 'amount' && (
              <input
                type="number"
                value={editData.minAmount || ''}
                onChange={(e) => setEditData(prev => ({ ...prev, minAmount: e.target.value }))}
                className="w-full bg-slate-600 border border-slate-500 rounded-lg px-3 py-2 text-white"
                placeholder="ยอดซื้อขั้นต่ำ (บาท)"
              />
            )}

            {editData.type === 'combo' && (
              <div className="space-y-3">
                <div>
                  <label className="block text-slate-300 mb-2">เลือกเมนูสำหรับคอมโบ</label>
                  <div className="grid grid-cols-2 gap-2 max-h-32 overflow-y-auto bg-slate-700/50 p-3 rounded-lg border border-slate-600">
                    {menus.map(menu => (
                      <label key={menu.id} className="flex items-center gap-2 text-white text-sm">
                        <input
                          type="checkbox"
                          checked={editData.items?.includes(menu.id) || false}
                          onChange={(e) => {
                            if (e.target.checked) {
                              setEditData(prev => ({
                                ...prev,
                                items: [...(prev.items || []), menu.id]
                              }));
                            } else {
                              setEditData(prev => ({
                                ...prev,
                                items: (prev.items || []).filter(id => id !== menu.id)
                              }));
                            }
                          }}
                          className="rounded"
                        />
                        {menu.name}
                      </label>
                    ))}
                  </div>
                </div>
                
                {editData.requiredCategory && (
                  <select
                    value={editData.requiredCategory || ''}
                    onChange={(e) => setEditData(prev => ({ ...prev, requiredCategory: e.target.value }))}
                    className="w-full bg-slate-600 border border-slate-500 rounded-lg px-3 py-2 text-white"
                  >
                    <option value="">หมวดหมู่เสริม (ไม่บังคับ)</option>
                    {categories.map(cat => (
                      <option key={cat} value={cat}>{cat}</option>
                    ))}
                  </select>
                )}
              </div>
            )}
          </div>
        ) : (
          <>
            <div className="flex items-center gap-3 mb-4">
              <div className="text-3xl">{promo.icon}</div>
              <div>
                <h4 className="text-xl font-bold text-white">{promo.name}</h4>
                <p className="text-slate-300 text-sm">{promo.description}</p>
              </div>
            </div>
            
            <div className="bg-black/20 rounded-xl p-4 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-slate-300">ประเภท</span>
                <span className="text-white font-medium">{promotionTypes[promo.type]}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-300">ส่วนลด</span>
                <span className="text-green-400 font-bold">
                  {promo.discount}{promo.type === 'category' ? '%' : 'บ'}
                </span>
              </div>
              
              {promo.category && (
                <div className="flex items-center justify-between">
                  <span className="text-slate-300">หมวดหมู่</span>
                  <span className="text-blue-400">{promo.category}</span>
                </div>
              )}
              
              {promo.startTime && promo.endTime && (
                <div className="flex items-center justify-between">
                  <span className="text-slate-300">เวลา</span>
                  <span className="text-blue-400 text-sm">{promo.startTime} - {promo.endTime}</span>
                </div>
              )}
              
              {promo.minQuantity && (
                <div className="flex items-center justify-between">
                  <span className="text-slate-300">จำนวนขั้นต่ำ</span>
                  <span className="text-yellow-400">{promo.minQuantity} ชิ้น</span>
                </div>
              )}
              
              {promo.minAmount && (
                <div className="flex items-center justify-between">
                  <span className="text-slate-300">ยอดซื้อขั้นต่ำ</span>
                  <span className="text-yellow-400">{promo.minAmount}บ</span>
                </div>
              )}
              
              {promo.items && promo.items.length > 0 && (
                <div className="flex items-center justify-between">
                  <span className="text-slate-300">เมนูในเซ็ต</span>
                  <span className="text-purple-400 text-sm max-w-32 truncate" title={getRelatedMenuNames()}>
                    {getRelatedMenuNames()}
                  </span>
                </div>
              )}
              
              {promo.validDays && promo.validDays.length > 0 && (
                <div className="flex items-center justify-between">
                  <span className="text-slate-300">วันที่ใช้ได้</span>
                  <span className="text-pink-400 text-sm">
                    {promo.validDays.map(d => weekDays[d]).join(', ')}
                  </span>
                </div>
              )}
            </div>
            
            <div className="mt-4 flex justify-between items-center">
              <div className={`text-center ${promo.isActive ? 'text-green-400' : 'text-gray-400'}`}>
                {promo.isActive ? '✅ เปิดใช้งาน' : '❌ ปิดใช้งาน'}
              </div>
              
              {/* Current Status Indicator */}
              <div className="text-xs">
                {promo.type === 'category' && promo.category === 'เครื่องดื่ม' && promo.startTime && promo.endTime && (
                  <span className={`px-2 py-1 rounded-full ${
                    isHappyHour() ? 'bg-green-500/20 text-green-400' : 'bg-gray-500/20 text-gray-400'
                  }`}>
                    {isHappyHour() ? '🟢 ใช้ได้ตอนนี้' : '🔴 ยังไม่ถึงเวลา'}
                  </span>
                )}
                {promo.validDays && (
                  <span className={`px-2 py-1 rounded-full ${
                    promo.validDays.includes(new Date().getDay()) 
                      ? 'bg-green-500/20 text-green-400' 
                      : 'bg-gray-500/20 text-gray-400'
                  }`}>
                    {promo.validDays.includes(new Date().getDay()) ? '🟢 วันนี้ใช้ได้' : '🔴 วันนี้ใช้ไม่ได้'}
                  </span>
                )}
              </div>
            </div>
          </>
        )}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              จัดการเมนูและโปรโมชั่น
            </h1>
            <p className="text-slate-400 mt-1">ระบบจัดการเมนูอาหารและโปรโมชั่นสำหรับ Gaming Cafe</p>
          </div>
        </div>

        {/* Live Status Banner */}
        <div className="bg-gradient-to-r from-slate-700 via-slate-600 to-slate-800 rounded-2xl p-6 border border-slate-500 shadow-xl mb-8">
          <div className="flex items-center gap-3 mb-4">
            <Gift className="text-yellow-400" size={32} />
            <h3 className="text-2xl font-bold text-white">🎉 สถานะโปรโมชั่นปัจจุบัน</h3>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {isHappyHour() && (
              <div className="bg-white/20 backdrop-blur-sm rounded-xl p-4 border border-white/30">
                <div className="flex items-center gap-2 mb-2">
                  <Clock className="text-yellow-400" size={20} />
                  <span className="text-yellow-400 font-bold">Happy Hour 🔥</span>
                </div>
                <p className="text-white text-sm">เครื่องดื่มทุกชนิด ลด 20%</p>
                <p className="text-yellow-300 text-xs">14:00-17:00 น. (กำลังใช้งาน)</p>
              </div>
            )}
            
            {isWeekend() && (
              <div className="bg-white/20 backdrop-blur-sm rounded-xl p-4 border border-white/30">
                <div className="flex items-center gap-2 mb-2">
                  <Tag className="text-green-400" size={20} />
                  <span className="text-green-400 font-bold">Weekend Special 🎊</span>
                </div>
                <p className="text-white text-sm">ซื้อ 2 ชิ้น ลด 25บ</p>
                <p className="text-green-300 text-xs">เสาร์-อาทิตย์ (กำลังใช้งาน)</p>
              </div>
            )}
            
            <div className="bg-white/20 backdrop-blur-sm rounded-xl p-4 border border-white/30">
              <div className="flex items-center gap-2 mb-2">
                <Percent className="text-orange-400" size={20} />
                <span className="text-orange-400 font-bold">เซ็ตคอมโบ 🍿</span>
              </div>
              <p className="text-white text-sm">ป๊อปคอร์น + โค้ก ลด 10บ</p>
              <p className="text-orange-300 text-xs">ทุกวัน (ใช้งานได้)</p>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex gap-4 mb-8">
          <button
            onClick={() => setActiveTab('menus')}
            className={`flex items-center gap-2 px-6 py-3 rounded-xl font-medium transition ${
              activeTab === 'menus'
                ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg'
                : 'bg-slate-700 text-slate-300 hover:bg-slate-600 border border-slate-600'
            }`}
          >
            🍽️ จัดการเมนู ({menus.length})
          </button>
          <button
            onClick={() => setActiveTab('promotions')}
            className={`flex items-center gap-2 px-6 py-3 rounded-xl font-medium transition ${
              activeTab === 'promotions'
                ? 'bg-gradient-to-r from-orange-500 to-red-600 text-white shadow-lg'
                : 'bg-slate-700 text-slate-300 hover:bg-slate-600 border border-slate-600'
            }`}
          >
            <Gift className="w-5 h-5" />
            จัดการโปรโมชั่น ({Object.keys(promotions).length})
          </button>
        </div>

        {/* Add Button */}
        <div className="mb-6">
          {activeTab === 'menus' ? (
            <button
              onClick={() => setIsAddingMenu(true)}
              className="flex items-center gap-2 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 px-6 py-3 rounded-lg text-white font-medium transition-all duration-200 shadow-lg hover:shadow-xl"
            >
              <Plus className="w-5 h-5" />
              เพิ่มเมนูใหม่
            </button>
          ) : (
            <button
              onClick={() => setIsAddingPromotion(true)}
              className="flex items-center gap-2 bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700 px-6 py-3 rounded-lg text-white font-medium transition-all duration-200 shadow-lg hover:shadow-xl"
            >
              <Gift className="w-5 h-5" />
              เพิ่มโปรโมชั่นใหม่
            </button>
          )}
        </div>

        {/* Add Menu Form */}
        {isAddingMenu && (
          <div className="bg-slate-800 rounded-2xl p-6 mb-8 border border-slate-700 shadow-xl">
            <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
              <Plus className="w-5 h-5" />
              เพิ่มเมนูใหม่
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                type="text"
                placeholder="ชื่อเมนู"
                value={newMenu.name}
                onChange={(e) => setNewMenu(prev => ({ ...prev, name: e.target.value }))}
                className="bg-slate-700 border border-slate-600 rounded-lg px-4 py-3 text-white placeholder-slate-400 focus:border-blue-500 focus:outline-none transition"
              />
              <input
                type="number"
                placeholder="ราคา (บาท)"
                value={newMenu.price}
                onChange={(e) => setNewMenu(prev => ({ ...prev, price: e.target.value }))}
                className="bg-slate-700 border border-slate-600 rounded-lg px-4 py-3 text-white placeholder-slate-400 focus:border-blue-500 focus:outline-none transition"
              />
              <select
                value={newMenu.category}
                onChange={(e) => setNewMenu(prev => ({ ...prev, category: e.target.value }))}
                className="bg-slate-700 border border-slate-600 rounded-lg px-4 py-3 text-white focus:border-blue-500 focus:outline-none transition"
              >
                {categories.map(cat => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
              <input
                type="number"
                step="0.1"
                min="1"
                max="5"
                placeholder="คะแนน (1-5)"
                value={newMenu.rating}
                onChange={(e) => setNewMenu(prev => ({ ...prev, rating: e.target.value }))}
                className="bg-slate-700 border border-slate-600 rounded-lg px-4 py-3 text-white placeholder-slate-400 focus:border-blue-500 focus:outline-none transition"
              />
              <input
                type="text"
                placeholder="URL รูปภาพ"
                value={newMenu.image}
                onChange={(e) => setNewMenu(prev => ({ ...prev, image: e.target.value }))}
                className="bg-slate-700 border border-slate-600 rounded-lg px-4 py-3 text-white placeholder-slate-400 focus:border-blue-500 focus:outline-none transition"
              />
            </div>
            <textarea
              placeholder="รายละเอียดเมนู"
              value={newMenu.description}
              onChange={(e) => setNewMenu(prev => ({ ...prev, description: e.target.value }))}
              className="w-full bg-slate-700 border border-slate-600 rounded-lg px-4 py-3 text-white placeholder-slate-400 mt-4 h-24 resize-none focus:border-blue-500 focus:outline-none transition"
            />
            <div className="flex gap-6 mt-4">
              <label className="flex items-center gap-2 text-white cursor-pointer">
                <input
                  type="checkbox"
                  checked={newMenu.hasPromo}
                  onChange={(e) => setNewMenu(prev => ({ ...prev, hasPromo: e.target.checked }))}
                  className="rounded text-blue-500 focus:ring-blue-500"
                />
                มีโปรโมชั่น
              </label>
              <label className="flex items-center gap-2 text-white cursor-pointer">
                <input
                  type="checkbox"
                  checked={newMenu.hasHappyHour}
                  onChange={(e) => setNewMenu(prev => ({ ...prev, hasHappyHour: e.target.checked }))}
                  className="rounded text-blue-500 focus:ring-blue-500"
                />
                รองรับ Happy Hour
              </label>
            </div>
            <div className="flex gap-3 mt-6">
              <button
                onClick={handleAddMenu}
                className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 px-6 py-3 rounded-lg text-white font-medium transition shadow-lg hover:shadow-xl"
              >
                บันทึกเมนู
              </button>
              <button
                onClick={() => {
                  setIsAddingMenu(false);
                  setNewMenu({
                    name: '',
                    price: '',
                    category: 'ขนม',
                    description: '',
                    image: '/photo/bread.jpg',
                    rating: 4.0,
                    hasPromo: false,
                    hasHappyHour: false
                  });
                }}
                className="bg-slate-600 hover:bg-slate-500 px-6 py-3 rounded-lg text-white font-medium transition"
              >
                ยกเลิก
              </button>
            </div>
          </div>
        )}

        {/* Add Promotion Form */}
        {isAddingPromotion && (
          <div className="bg-slate-800 rounded-2xl p-6 mb-8 border border-slate-700 shadow-xl">
            <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
              <Gift className="w-5 h-5" />
              เพิ่มโปรโมชั่นใหม่
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div className="flex gap-3">
                <select
                  value={newPromotion.icon}
                  onChange={(e) => setNewPromotion(prev => ({ ...prev, icon: e.target.value }))}
                  className="w-20 bg-slate-700 border border-slate-600 rounded-lg px-3 py-3 text-white text-center text-lg focus:border-orange-500 focus:outline-none transition"
                >
                  {promotionIcons.map(icon => (
                    <option key={icon} value={icon}>{icon}</option>
                  ))}
                </select>
                <input
                  type="text"
                  placeholder="ชื่อโปรโมชั่น"
                  value={newPromotion.name}
                  onChange={(e) => setNewPromotion(prev => ({ ...prev, name: e.target.value }))}
                  className="flex-1 bg-slate-700 border border-slate-600 rounded-lg px-4 py-3 text-white placeholder-slate-400 focus:border-orange-500 focus:outline-none transition"
                />
              </div>
              
              <div className="flex gap-3">
                <select
                  value={newPromotion.type}
                  onChange={(e) => setNewPromotion(prev => ({ ...prev, type: e.target.value }))}
                  className="flex-1 bg-slate-700 border border-slate-600 rounded-lg px-4 py-3 text-white focus:border-orange-500 focus:outline-none transition"
                >
                  {Object.entries(promotionTypes).map(([key, label]) => (
                    <option key={key} value={key}>{label}</option>
                  ))}
                </select>
                <input
                  type="number"
                  placeholder="ส่วนลด"
                  value={newPromotion.discount}
                  onChange={(e) => setNewPromotion(prev => ({ ...prev, discount: e.target.value }))}
                  className="w-32 bg-slate-700 border border-slate-600 rounded-lg px-4 py-3 text-white placeholder-slate-400 focus:border-orange-500 focus:outline-none transition"
                />
              </div>
            </div>

            <textarea
              placeholder="รายละเอียดโปรโมชั่น"
              value={newPromotion.description}
              onChange={(e) => setNewPromotion(prev => ({ ...prev, description: e.target.value }))}
              className="w-full bg-slate-700 border border-slate-600 rounded-lg px-4 py-3 text-white placeholder-slate-400 mb-4 h-20 resize-none focus:border-orange-500 focus:outline-none transition"
            />

            {/* Conditional Fields */}
            {newPromotion.type === 'category' && (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                <select
                  value={newPromotion.category}
                  onChange={(e) => setNewPromotion(prev => ({ ...prev, category: e.target.value }))}
                  className="bg-slate-700 border border-slate-600 rounded-lg px-4 py-3 text-white focus:border-orange-500 focus:outline-none transition"
                >
                  <option value="">เลือกหมวดหมู่</option>
                  {categories.map(cat => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
                <input
                  type="time"
                  placeholder="เวลาเริ่ม"
                  value={newPromotion.startTime}
                  onChange={(e) => setNewPromotion(prev => ({ ...prev, startTime: e.target.value }))}
                  className="bg-slate-700 border border-slate-600 rounded-lg px-4 py-3 text-white focus:border-orange-500 focus:outline-none transition"
                />
                <input
                  type="time"
                  placeholder="เวลาสิ้นสุด"
                  value={newPromotion.endTime}
                  onChange={(e) => setNewPromotion(prev => ({ ...prev, endTime: e.target.value }))}
                  className="bg-slate-700 border border-slate-600 rounded-lg px-4 py-3 text-white focus:border-orange-500 focus:outline-none transition"
                />
              </div>
            )}

            {newPromotion.type === 'quantity' && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <input
                  type="number"
                  placeholder="จำนวนขั้นต่ำ"
                  value={newPromotion.minQuantity}
                  onChange={(e) => setNewPromotion(prev => ({ ...prev, minQuantity: e.target.value }))}
                  className="bg-slate-700 border border-slate-600 rounded-lg px-4 py-3 text-white placeholder-slate-400 focus:border-orange-500 focus:outline-none transition"
                />
                <div className="text-white">
                  <label className="block text-sm text-slate-300 mb-2">วันที่ใช้ได้</label>
                  <div className="grid grid-cols-4 gap-2">
                    {weekDays.map((day, index) => (
                      <label key={index} className="flex items-center gap-1 text-sm cursor-pointer">
                        <input
                          type="checkbox"
                          checked={newPromotion.validDays.includes(index)}
                          onChange={(e) => {
                            if (e.target.checked) {
                              setNewPromotion(prev => ({
                                ...prev,
                                validDays: [...prev.validDays, index]
                              }));
                            } else {
                              setNewPromotion(prev => ({
                                ...prev,
                                validDays: prev.validDays.filter(d => d !== index)
                              }));
                            }
                          }}
                          className="rounded text-orange-500 focus:ring-orange-500"
                        />
                        {day}
                      </label>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {newPromotion.type === 'amount' && (
              <input
                type="number"
                placeholder="ยอดซื้อขั้นต่ำ (บาท)"
                value={newPromotion.minAmount}
                onChange={(e) => setNewPromotion(prev => ({ ...prev, minAmount: e.target.value }))}
                className="w-full bg-slate-700 border border-slate-600 rounded-lg px-4 py-3 text-white placeholder-slate-400 mb-4 focus:border-orange-500 focus:outline-none transition"
              />
            )}

            {newPromotion.type === 'combo' && (
              <div className="mb-4">
                <label className="block text-slate-300 mb-2">เลือกเมนูสำหรับคอมโบ</label>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-2 max-h-32 overflow-y-auto bg-slate-700/50 p-3 rounded-lg border border-slate-600">
                  {menus.map(menu => (
                    <label key={menu.id} className="flex items-center gap-2 text-white text-sm cursor-pointer">
                      <input
                        type="checkbox"
                        checked={newPromotion.items.includes(menu.id)}
                        onChange={(e) => {
                          if (e.target.checked) {
                            setNewPromotion(prev => ({
                              ...prev,
                              items: [...prev.items, menu.id]
                            }));
                          } else {
                            setNewPromotion(prev => ({
                              ...prev,
                              items: prev.items.filter(id => id !== menu.id)
                            }));
                          }
                        }}
                        className="rounded text-orange-500 focus:ring-orange-500"
                      />
                      {menu.name} ({menu.category})
                    </label>
                  ))}
                </div>
                
                <div className="mt-3">
                  <label className="block text-slate-300 mb-2">หมวดหมู่เสริม (ไม่บังคับ)</label>
                  <select
                    value={newPromotion.requiredCategory}
                    onChange={(e) => setNewPromotion(prev => ({ ...prev, requiredCategory: e.target.value }))}
                    className="w-full bg-slate-700 border border-slate-600 rounded-lg px-4 py-3 text-white focus:border-orange-500 focus:outline-none transition"
                  >
                    <option value="">ไม่มีหมวดหมู่เสริม</option>
                    {categories.map(cat => (
                      <option key={cat} value={cat}>{cat}</option>
                    ))}
                  </select>
                </div>
              </div>
            )}

            <div className="flex gap-3">
              <button
                onClick={handleAddPromotion}
                className="bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700 px-6 py-3 rounded-lg text-white font-medium transition shadow-lg hover:shadow-xl"
              >
                บันทึกโปรโมชั่น
              </button>
              <button
                onClick={() => {
                  setIsAddingPromotion(false);
                  setNewPromotion({
                    name: '',
                    description: '',
                    type: 'combo',
                    discount: '',
                    category: '',
                    startTime: '',
                    endTime: '',
                    minQuantity: '',
                    minAmount: '',
                    validDays: [],
                    items: [],
                    requiredCategory: '',
                    icon: '🎁'
                  });
                }}
                className="bg-slate-600 hover:bg-slate-500 px-6 py-3 rounded-lg text-white font-medium transition"
              >
                ยกเลิก
              </button>
            </div>
          </div>
        )}

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          {activeTab === 'menus' ? (
            <>
              <div className="bg-slate-800/60 p-6 rounded-2xl border border-slate-700">
                <div className="text-2xl font-bold text-blue-400">{menus.length}</div>
                <div className="text-slate-300">เมนูทั้งหมด</div>
              </div>
              {categories.map(category => (
                <div key={category} className="bg-slate-800/60 p-6 rounded-2xl border border-slate-700">
                  <div className="text-2xl font-bold text-green-400">
                    {menus.filter(menu => menu.category === category).length}
                  </div>
                  <div className="text-slate-300">{category}</div>
                </div>
              ))}
            </>
          ) : (
            <>
              <div className="bg-slate-800/60 p-6 rounded-2xl border border-slate-700">
                <div className="text-2xl font-bold text-orange-400">{Object.keys(promotions).length}</div>
                <div className="text-slate-300">โปรโมชั่นทั้งหมด</div>
              </div>
              <div className="bg-slate-800/60 p-6 rounded-2xl border border-slate-700">
                <div className="text-2xl font-bold text-green-400">
                  {Object.values(promotions).filter(promo => promo.isActive).length}
                </div>
                <div className="text-slate-300">เปิดใช้งาน</div>
              </div>
              <div className="bg-slate-800/60 p-6 rounded-2xl border border-slate-700">
                <div className="text-2xl font-bold text-red-400">
                  {Object.values(promotions).filter(promo => !promo.isActive).length}
                </div>
                <div className="text-slate-300">ปิดใช้งาน</div>
              </div>
              <div className="bg-slate-800/60 p-6 rounded-2xl border border-slate-700">
                <div className="text-2xl font-bold text-purple-400">
                  {Object.values(promotions).filter(promo => promo.type === 'combo').length}
                </div>
                <div className="text-slate-300">เซ็ตคอมโบ</div>
              </div>
            </>
          )}
        </div>

        {/* Content */}
        {loading ? (
          <div className="text-center text-blue-400 py-12">
            <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-400 mx-auto mb-4"></div>
            กำลังโหลดข้อมูล...
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {activeTab === 'menus' ? (
              menus.map(menu => <MenuCard key={menu.id} menu={menu} />)
            ) : (
              Object.values(promotions).map(promo => <PromotionCard key={promo.id} promo={promo} />)
            )}
          </div>
        )}

        {((activeTab === 'menus' && menus.length === 0) || (activeTab === 'promotions' && Object.keys(promotions).length === 0)) && !loading && (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">{activeTab === 'menus' ? '🍽️' : '🎁'}</div>
            <h3 className="text-xl font-bold text-slate-300 mb-2">
              {activeTab === 'menus' ? 'ยังไม่มีเมนู' : 'ยังไม่มีโปรโมชั่น'}
            </h3>
            <p className="text-slate-500">
              {activeTab === 'menus' 
                ? 'เริ่มต้นด้วยการเพิ่มเมนูแรกของคุณ คลิกปุ่ม "เพิ่มเมนูใหม่" เพื่อเริ่มต้น' 
                : 'สร้างโปรโมชั่นเพื่อเพิ่มยอดขายและดึงดูดลูกค้า คลิกปุ่ม "เพิ่มโปรโมชั่นใหม่"'
              }
            </p>
          </div>
        )}

        {/* Quick Actions Panel */}
        <div className="fixed bottom-6 right-6 flex flex-col gap-3">
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="bg-slate-700 hover:bg-slate-600 p-3 rounded-full shadow-lg border border-slate-600 text-white transition-all duration-200 hover:scale-110"
          >
            <ArrowLeft className="w-5 h-5 rotate-90" />
          </button>
          
          <button
            onClick={() => {
              const activeCount = Object.values(promotions).filter(p => p.isActive).length;
              const menuCount = menus.length;
              alert(`📊 สรุปสถิติ:\n\n🍽️ เมนูทั้งหมด: ${menuCount} รายการ\n🎁 โปรโมชั่น: ${Object.keys(promotions).length} รายการ\n✅ เปิดใช้งาน: ${activeCount} รายการ\n\n${isHappyHour() ? '⏰ กำลัง Happy Hour!' : ''}${isWeekend() ? ' 🎉 วันหยุดสุดคุ้ม!' : ''}`);
            }}
            className="bg-blue-500 hover:bg-blue-600 p-3 rounded-full shadow-lg text-white transition-all duration-200 hover:scale-110"
          >
            📊
          </button>
        </div>

        {/* Preview Mode Toggle */}
        <div className="mt-8 p-4 bg-slate-800/40 rounded-2xl border border-slate-700">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-white font-bold">💡 เคล็ดลับการใช้งาน</h3>
              <p className="text-slate-400 text-sm">
                • ใช้ Happy Hour สำหรับเครื่องดื่มในช่วง 14:00-17:00<br/>
                • สร้างเซ็ตคอมโบเพื่อเพิ่มยอดขาย<br/>
                • ตั้งโปรโมชั่นวันหยุดเพื่อดึงดูดลูกค้า<br/>
                • อัปเดตเมนูและราคาตามฤดูกาล
              </p>
            </div>
            <ShoppingCart className="text-slate-500 w-8 h-8" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MenuManagement;
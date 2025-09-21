// pages/FoodPage.jsx
import React, { useState } from 'react';
import { Plus, Minus, ShoppingCart, Star } from 'lucide-react';

const FoodPage = () => {
  const [cart, setCart] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('snacks');

  const categories = {
    snacks: 'ขนม',
    drinks: 'เครื่องดื่ม',
    instant: 'อาหารสำเร็จรูป',
    desserts: 'ของหวาน'
  };

  const menuItems = {
    snacks: [
      { id: 1, name: 'ขนมปังมากม่า', price: 25, image: '🍞', rating: 4.5, description: 'ขนมปังกรอบ รสชาติเข้มข้น' },
      { id: 2, name: 'มันฝรั่งทอด', price: 35, image: '🍟', rating: 4.8, description: 'มันฝรั่งทอดกรอบ เสิร์ฟร้อน' },
      { id: 3, name: 'ป๊อปคอร์น', price: 20, image: '🍿', rating: 4.2, description: 'ป๊อปคอร์นหวาน กรอบอร่อย' },
      { id: 4, name: 'ขนมจีบทอด', price: 30, image: '🥟', rating: 4.6, description: 'ขนมจีบทอดกรอบ ไส้แน่น' }
    ],
    drinks: [
      { id: 5, name: 'โค้ก', price: 15, image: '🥤', rating: 4.7, description: 'โค้กเย็นๆ สดชื่น' },
      { id: 6, name: 'กาแฟเย็น', price: 25, image: '☕', rating: 4.4, description: 'กาแฟเย็นหอมกรุ่น' },
      { id: 7, name: 'น้ำส้ม', price: 20, image: '🧃', rating: 4.3, description: 'น้ำส้มคั้นสด เปรี้ยวหวาน' },
      { id: 8, name: 'เรดบูล', price: 30, image: '🥤', rating: 4.9, description: 'เรดบูล เพิ่มพลัง' }
    ],
    instant: [
      { id: 9, name: 'มาม่า', price: 15, image: '🍜', rating: 4.1, description: 'บะหมี่กึ่งสำเร็จรูป รสต้มยำ' },
      { id: 10, name: 'ข้าวผัดไข่', price: 45, image: '🍳', rating: 4.5, description: 'ข้าวผัดไข่ อร่อยเหมือนทำเอง' },
      { id: 11, name: 'แซนวิช', price: 35, image: '🥪', rating: 4.0, description: 'แซนวิชไข่ ผักสลัด' },
      { id: 12, name: 'ข้าวกล่อง', price: 50, image: '🍱', rating: 4.3, description: 'ข้าวกล่อง กับข้าวหลากหลาย' }
    ],
    desserts: [
      { id: 13, name: 'ไอศกรีม', price: 20, image: '🍦', rating: 4.6, description: 'ไอศกรีมหลากหลายรส' },
      { id: 14, name: 'เค้กช็อกโกแลต', price: 40, image: '🍰', rating: 4.8, description: 'เค้กช็อกโกแลต หวานมัน' },
      { id: 15, name: 'โดนัท', price: 25, image: '🍩', rating: 4.4, description: 'โดนัทนุ่ม หวานหอม' },
      { id: 16, name: 'คุกกี้', price: 30, image: '🍪', rating: 4.2, description: 'คุกกี้กรอบ รสชาติดี' }
    ]
  };

  const addToCart = (item) => {
    const existingItem = cart.find(cartItem => cartItem.id === item.id);
    if (existingItem) {
      setCart(cart.map(cartItem => 
        cartItem.id === item.id 
          ? { ...cartItem, quantity: cartItem.quantity + 1 }
          : cartItem
      ));
    } else {
      setCart([...cart, { ...item, quantity: 1 }]);
    }
  };

  const removeFromCart = (itemId) => {
    const existingItem = cart.find(cartItem => cartItem.id === itemId);
    if (existingItem && existingItem.quantity > 1) {
      setCart(cart.map(cartItem => 
        cartItem.id === itemId 
          ? { ...cartItem, quantity: cartItem.quantity - 1 }
          : cartItem
      ));
    } else {
      setCart(cart.filter(cartItem => cartItem.id !== itemId));
    }
  };

  const getTotalPrice = () => {
    return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  const getItemQuantity = (itemId) => {
    const item = cart.find(cartItem => cartItem.id === itemId);
    return item ? item.quantity : 0;
  };

  const handleOrder = () => {
    if (cart.length === 0) {
      alert('กรุณาเลือกสินค้าก่อนสั่งซื้อ');
      return;
    }
    
    const orderSummary = cart.map(item => 
      `${item.name} x${item.quantity} = ${item.price * item.quantity}฿`
    ).join('\n');
    
    alert(`✅ สั่งอาหารสำเร็จ!\n\n${orderSummary}\n\nรวมทั้งสิ้น: ${getTotalPrice()}฿\n\nอาหารจะพร้อมเสิร์ฟใน 10-15 นาที`);
    setCart([]);
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="mb-8">
        <h2 className="text-4xl lg:text-5xl font-bold mb-2 bg-gradient-to-r from-orange-400 to-red-600 bg-clip-text text-transparent">
          🍕 สั่งอาหาร
        </h2>
        <div className="w-20 h-1 bg-gradient-to-r from-orange-500 to-red-500 rounded-full"></div>
      </div>

      {/* Category Tabs */}
      <div className="flex flex-wrap gap-3 mb-8">
        {Object.entries(categories).map(([key, label]) => (
          <button
            key={key}
            onClick={() => setSelectedCategory(key)}
            className={`
              px-6 py-3 rounded-full font-medium transition-all duration-300
              ${selectedCategory === key
                ? 'bg-gradient-to-r from-orange-500 to-red-600 text-white shadow-lg shadow-orange-500/25'
                : 'bg-slate-800 text-slate-300 border border-slate-600 hover:border-orange-400 hover:text-orange-400 hover:-translate-y-1'
              }
            `}
          >
            {label}
          </button>
        ))}
      </div>

      <div className="grid lg:grid-cols-4 gap-8">
        {/* Menu Items */}
        <div className="lg:col-span-3">
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {menuItems[selectedCategory].map((item) => {
              const quantity = getItemQuantity(item.id);
              return (
                <div key={item.id} className="bg-slate-800/60 backdrop-blur-sm rounded-2xl p-6 border border-slate-700 hover:border-orange-400/50 transition-all duration-300 hover:-translate-y-1">
                  {/* Item Image */}
                  <div className="text-6xl text-center mb-4">
                    {item.image}
                  </div>

                  {/* Item Info */}
                  <div className="text-center mb-4">
                    <h3 className="text-xl font-bold text-white mb-2">{item.name}</h3>
                    <p className="text-slate-400 text-sm mb-3">{item.description}</p>
                    
                    {/* Rating */}
                    <div className="flex items-center justify-center gap-2 mb-3">
                      <Star className="w-4 h-4 text-yellow-400 fill-current" />
                      <span className="text-yellow-400 font-medium">{item.rating}</span>
                    </div>

                    <div className="text-2xl font-bold text-orange-400 mb-4">
                      {item.price}฿
                    </div>
                  </div>

                  {/* Add to Cart Controls */}
                  {quantity === 0 ? (
                    <button
                      onClick={() => addToCart(item)}
                      className="w-full bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700 text-white py-3 px-4 rounded-xl font-medium transition-all duration-300 flex items-center justify-center gap-2"
                    >
                      <Plus size={20} />
                      เพิ่มลงตะกร้า
                    </button>
                  ) : (
                    <div className="flex items-center justify-between bg-slate-700 rounded-xl p-2">
                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="bg-red-500 hover:bg-red-600 text-white w-10 h-10 rounded-lg flex items-center justify-center transition-colors"
                      >
                        <Minus size={18} />
                      </button>
                      <span className="text-white font-bold text-lg mx-4">{quantity}</span>
                      <button
                        onClick={() => addToCart(item)}
                        className="bg-green-500 hover:bg-green-600 text-white w-10 h-10 rounded-lg flex items-center justify-center transition-colors"
                      >
                        <Plus size={18} />
                      </button>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Shopping Cart */}
        <div className="lg:col-span-1">
          <div className="sticky top-8">
            <div className="bg-slate-800/60 backdrop-blur-sm rounded-2xl p-6 border border-slate-700">
              <div className="flex items-center gap-3 mb-6">
                <ShoppingCart className="text-orange-400" size={24} />
                <h3 className="text-xl font-bold text-white">ตะกร้าสินค้า</h3>
              </div>

              {cart.length === 0 ? (
                <div className="text-center py-8">
                  <div className="text-4xl mb-4">🛒</div>
                  <p className="text-slate-400">ตะกร้าว่างเปล่า</p>
                  <p className="text-slate-500 text-sm mt-2">เลือกสินค้าที่ต้องการสั่งซื้อ</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {/* Cart Items */}
                  <div className="space-y-3 max-h-64 overflow-y-auto">
                    {cart.map((item) => (
                      <div key={item.id} className="flex items-center justify-between bg-slate-700/50 rounded-xl p-3">
                        <div className="flex-1">
                          <h4 className="text-white font-medium text-sm">{item.name}</h4>
                          <p className="text-orange-400 text-sm">{item.price}฿ x {item.quantity}</p>
                        </div>
                        <div className="text-white font-bold">
                          {item.price * item.quantity}฿
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Total */}
                  <div className="border-t border-slate-600 pt-4">
                    <div className="flex justify-between items-center text-lg font-bold mb-4">
                      <span className="text-slate-300">รวมทั้งสิ้น</span>
                      <span className="text-orange-400">{getTotalPrice()}฿</span>
                    </div>

                    {/* Order Button */}
                    <button
                      onClick={handleOrder}
                      className="w-full bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white py-3 px-4 rounded-xl font-bold transition-all duration-300 flex items-center justify-center gap-2"
                    >
                      <ShoppingCart size={20} />
                      สั่งอาหาร
                    </button>

                    {/* Clear Cart */}
                    <button
                      onClick={() => setCart([])}
                      className="w-full mt-3 bg-slate-600 hover:bg-slate-700 text-white py-2 px-4 rounded-xl font-medium transition-colors text-sm"
                    >
                      ล้างตะกร้า
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Order Info */}
            <div className="mt-6 bg-blue-500/10 border border-blue-400/30 rounded-2xl p-4">
              <h4 className="text-blue-400 font-bold mb-2">📋 ข้อมูลการสั่งซื้อ</h4>
              <div className="text-slate-300 text-sm space-y-1">
                <p>• เวลาเตรียม: 10-15 นาที</p>
                <p>• จัดส่งถึงโต๊ะ: ฟรี</p>
                <p>• ชำระเงิน: หน้าร้าน</p>
                <p>• ติดต่อ: เรียกพนักงาน</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FoodPage;
import React, { useState } from 'react';
import { Plus, Minus, ShoppingCart, Star, Gift, Tag, Percent, Clock } from 'lucide-react';

// Import images - แก้ path จาก ../photo/ เป็น ../../photo/
import breadImg from '/photo/bread.jpg';
import friesImg from '/photo/fries.jpg';
import popcornImg from '/photo/popcorn.jpg';
import dumplingImg from '/photo/dumpling.jpg';
import cokeImg from '/photo/coke.jpg';
import icedCoffeeImg from '/photo/iced-coffee.jpg';
import orangeJuiceImg from '/photo/orange-juice.jpg';
import redbullImg from '/photo/redbull.jpg';
import mamaImg from '/photo/mama.jpg';
import friedRiceImg from '/photo/fried-rice.jpg';
import sandwichImg from '/photo/sandwich.jpg';
import lunchboxImg from '/photo/lunchbox.jpg';
import iceCreamImg from '/photo/ice-cream.jpg';
import chocolateCakeImg from '/photo/chocolate-cake.jpg';
import donutImg from '/photo/donut.jpg';
import cookiesImg from '/photo/cookies.jpg';

const FoodPage = () => {
  const [cart, setCart] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('snacks');
  const [showPromotions, setShowPromotions] = useState(false);

  const categories = {
    snacks: 'ขนม',
    drinks: 'เครื่องดื่ม',
    instant: 'อาหารสำเร็จรูป',
    desserts: 'ของหวาน',
    promotions: 'โปรโมชั่น'
  };

  // โปรโมชั่นและส่วนลดต่างๆ
  const promotions = {
    happyHour: {
      name: 'Happy Hour',
      description: '14:00-17:00 น. ลด 20% ทุกเครื่องดื่ม',
      discount: 20,
      type: 'category',
      category: 'drinks',
      startTime: '14:00',
      endTime: '17:00',
      icon: '⏰'
    },
    combo1: {
      name: 'เซ็ตขนมครบครัน',
      description: 'ซื้อ ป๊อปคอร์น + โค้ก ลด 10฿',
      items: [3, 5], // popcorn + coke
      discount: 10,
      type: 'combo',
      icon: '🍿'
    },
    combo2: {
      name: 'เซ็ตอิ่มท้อง',
      description: 'ซื้อ ข้าวผัดไข่ + เครื่องดื่ม ลด 15฿',
      items: [10], // fried rice + any drink
      requiredCategory: 'drinks',
      discount: 15,
      type: 'combo',
      icon: '🍚'
    },
    weekendSpecial: {
      name: 'วันหยุดสุดคุ้ม',
      description: 'เสาร์-อาทิตย์ ซื้อ 2 ชิ้น ลด 25฿',
      minQuantity: 2,
      discount: 25,
      type: 'quantity',
      validDays: [0, 6], // Sunday, Saturday
      icon: '🎉'
    },
    bulkDiscount: {
      name: 'ซื้อมากลดมาก',
      description: 'ซื้อครบ 150฿ ลด 20฿',
      minAmount: 150,
      discount: 20,
      type: 'amount',
      icon: '💰'
    }
  };

  const menuItems = {
    snacks: [
      { id: 1, name: 'ขนมปังมากม่า', price: 25, image: breadImg, rating: 4.5, description: 'ขนมปังกรอบ รสชาติเข้มข้น' },
      { id: 2, name: 'มันฝรั่งทอด', price: 35, image: friesImg, rating: 4.8, description: 'มันฝรั่งทอดกรอบ เสิร์ฟร้อน' },
      { id: 3, name: 'ป๊อปคอร์น', price: 20, image: popcornImg, rating: 4.2, description: 'ป๊อปคอร์นหวาน กรอบอร่อย', hasPromo: true },
      { id: 4, name: 'ขนมจีบทอด', price: 30, image: dumplingImg, rating: 4.6, description: 'ขนมจีบทอดกรอบ ไส้แน่น' }
    ],
    drinks: [
      { id: 5, name: 'โค้ก', price: 15, image: cokeImg, rating: 4.7, description: 'โค้กเย็นๆ สดชื่น', hasPromo: true },
      { id: 6, name: 'กาแฟเย็น', price: 25, image: icedCoffeeImg, rating: 4.4, description: 'กาแฟเย็นหอมกรุ่น', hasHappyHour: true },
      { id: 7, name: 'น้ำส้ม', price: 20, image: orangeJuiceImg, rating: 4.3, description: 'น้ำส้มคั้นสด เปรี้ยวหวาน', hasHappyHour: true },
      { id: 8, name: 'เรดบูล', price: 30, image: redbullImg, rating: 4.9, description: 'เรดบูล เพิ่มพลัง', hasHappyHour: true }
    ],
    instant: [
      { id: 9, name: 'มาม่า', price: 15, image: mamaImg, rating: 4.1, description: 'บะหมี่กึ่งสำเร็จรูป รสต้มยำ' },
      { id: 10, name: 'ข้าวผัดไข่', price: 45, image: friedRiceImg, rating: 4.5, description: 'ข้าวผัดไข่ อร่อยเหมือนทำเอง', hasPromo: true },
      { id: 11, name: 'แซนวิช', price: 35, image: sandwichImg, rating: 4.0, description: 'แซนวิชไข่ ผักสลัด' },
      { id: 12, name: 'ข้าวกล่อง', price: 50, image: lunchboxImg, rating: 4.3, description: 'ข้าวกล่อง กับข้าวหลากหลาย' }
    ],
    desserts: [
      { id: 13, name: 'ไอศกรีม', price: 20, image: iceCreamImg, rating: 4.6, description: 'ไอศกรีมหลากหลายรส' },
      { id: 14, name: 'เค้กช็อกโกแลต', price: 40, image: chocolateCakeImg, rating: 4.8, description: 'เค้กช็อกโกแลต หวานมัน' },
      { id: 15, name: 'โดนัท', price: 25, image: donutImg, rating: 4.4, description: 'โดนัทนุ่ม หวานหอม' },
      { id: 16, name: 'คุกกี้', price: 30, image: cookiesImg, rating: 4.2, description: 'คุกกี้กรอบ รสชาติดี' }
    ]
  };

  // ตรวจสอบว่าเป็น Happy Hour หรือไม่
  const isHappyHour = () => {
    const now = new Date();
    const currentHour = now.getHours();
    return currentHour >= 14 && currentHour < 17;
  };

  // ตรวจสอบว่าเป็นวันหยุดหรือไม่
  const isWeekend = () => {
    const today = new Date().getDay();
    return today === 0 || today === 6;
  };

  // คำนวณราคาหลังโปรโมชั่น
  const calculateItemPrice = (item, category) => {
    let price = item.price;
    
    // Happy Hour สำหรับเครื่องดื่ม
    if (category === 'drinks' && isHappyHour()) {
      price = Math.round(price * 0.8); // ลด 20%
    }
    
    return price;
  };

  // คำนวณส่วนลดทั้งหมด
  const calculateDiscounts = () => {
    let discounts = [];
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    const subtotal = cart.reduce((total, item) => total + (item.price * item.quantity), 0);

    // Happy Hour Discount
    if (isHappyHour()) {
      const drinkDiscount = cart.reduce((discount, item) => {
        const menuItem = findMenuItem(item.id);
        if (menuItem && item.category === 'drinks') {
          return discount + (item.price * item.quantity * 0.2);
        }
        return discount;
      }, 0);
      
      if (drinkDiscount > 0) {
        discounts.push({
          name: 'Happy Hour (เครื่องดื่ม -20%)',
          amount: Math.round(drinkDiscount),
          type: 'happyHour'
        });
      }
    }

    // Combo Discounts
    // เซ็ตขนมครบครัน (ป๊อปคอร์น + โค้ก)
    const hasPopcorn = cart.find(item => item.id === 3);
    const hasCoke = cart.find(item => item.id === 5);
    if (hasPopcorn && hasCoke) {
      const comboSets = Math.min(hasPopcorn.quantity, hasCoke.quantity);
      discounts.push({
        name: 'เซ็ตขนมครบครัน',
        amount: comboSets * 10,
        type: 'combo'
      });
    }

    // เซ็ตอิ่มท้อง (ข้าวผัด + เครื่องดื่ม)
    const hasFriedRice = cart.find(item => item.id === 10);
    const hasDrinks = cart.filter(item => item.category === 'drinks').reduce((sum, item) => sum + item.quantity, 0);
    if (hasFriedRice && hasDrinks > 0) {
      const comboSets = Math.min(hasFriedRice.quantity, hasDrinks);
      discounts.push({
        name: 'เซ็ตอิ่มท้อง',
        amount: comboSets * 15,
        type: 'combo'
      });
    }

    // Weekend Special
    if (isWeekend() && totalItems >= 2) {
      discounts.push({
        name: 'วันหยุดสุดคุ้ม (ซื้อ 2 ชิ้น)',
        amount: 25,
        type: 'weekend'
      });
    }

    // Bulk Discount
    if (subtotal >= 150) {
      discounts.push({
        name: 'ซื้อมากลดมาก (ซื้อครบ 150฿)',
        amount: 20,
        type: 'bulk'
      });
    }

    return discounts;
  };

  const findMenuItem = (id) => {
    for (const category in menuItems) {
      const item = menuItems[category].find(item => item.id === id);
      if (item) return item;
    }
    return null;
  };

  const addToCart = (item, category) => {
    const price = calculateItemPrice(item, category);
    const existingItem = cart.find(cartItem => cartItem.id === item.id);
    
    if (existingItem) {
      setCart(cart.map(cartItem => 
        cartItem.id === item.id 
          ? { ...cartItem, quantity: cartItem.quantity + 1 }
          : cartItem
      ));
    } else {
      setCart([...cart, { ...item, price, originalPrice: item.price, quantity: 1, category }]);
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

  const getSubtotal = () => {
    return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  const getTotalDiscount = () => {
    const discounts = calculateDiscounts();
    return discounts.reduce((total, discount) => total + discount.amount, 0);
  };

  const getTotalPrice = () => {
    return getSubtotal() - getTotalDiscount();
  };

  const getItemQuantity = (itemId) => {
    const item = cart.find(cartItem => cartItem.id === itemId);
    return item ? item.quantity : 0;
  };

  const [paymentMethod, setPaymentMethod] = useState('cash');
  const [showPaymentModal, setShowPaymentModal] = useState(false);

  const handleOrder = () => {
    if (cart.length === 0) {
      alert('กรุณาเลือกสินค้าก่อนสั่งซื้อ');
      return;
    }
    
    setShowPaymentModal(true);
  };

  const handlePaymentConfirm = () => {
    const orderSummary = cart.map(item => 
      `${item.name} x${item.quantity} = ${item.price * item.quantity}฿`
    ).join('\n');
    
    const discounts = calculateDiscounts();
    const discountSummary = discounts.length > 0 
      ? '\n\nส่วนลด:\n' + discounts.map(d => `${d.name} -${d.amount}฿`).join('\n')
      : '';
    
    const paymentText = paymentMethod === 'qr' 
      ? 'ชำระผ่าน QR Code' 
      : 'ชำระเงินสดหน้าร้าน';
    
    alert(`✅ สั่งอาหารสำเร็จ!\n\n${orderSummary}${discountSummary}\n\nรวมทั้งสิ้น: ${getTotalPrice()}฿\nวิธีชำระ: ${paymentText}\n\nอาหารจะพร้อมเสิร์ฟใน 10-15 นาที`);
    
    setCart([]);
    setShowPaymentModal(false);
    setPaymentMethod('cash');
  };

  // Promotion Items สำหรับแท็บโปรโมชั่น
  const getPromotionItems = () => {
    return Object.values(promotions).map((promo, index) => ({
      id: `promo-${index}`,
      name: promo.name,
      description: promo.description,
      icon: promo.icon,
      isPromo: true,
      ...promo
    }));
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-2">
          <span className="text-2xl" aria-hidden="true">🍕</span>
          <h2 className="text-2xl lg:text-2xl font-bold bg-gradient-to-r from-orange-400 to-red-600 bg-clip-text text-transparent">
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
          {isHappyHour() && (
            <div className="bg-white/20 backdrop-blur-sm rounded-xl p-4 border border-white/30">
              <div className="flex items-center gap-2 mb-2">
                <Clock className="text-yellow-400" size={20} />
                <span className="text-yellow-400 font-bold">Happy Hour</span>
              </div>
              <p className="text-white text-sm">เครื่องดื่มทุกชนิด ลด 20%</p>
              <p className="text-yellow-300 text-xs">14:00-17:00 น.</p>
            </div>
          )}
          
          {isWeekend() && (
            <div className="bg-white/20 backdrop-blur-sm rounded-xl p-4 border border-white/30">
              <div className="flex items-center gap-2 mb-2">
                <Tag className="text-green-400" size={20} />
                <span className="text-green-400 font-bold">Weekend Special</span>
              </div>
              <p className="text-white text-sm">ซื้อ 2 ชิ้น ลด 25฿</p>
              <p className="text-green-300 text-xs">เสาร์-อาทิตย์</p>
            </div>
          )}
          
          <div className="bg-white/20 backdrop-blur-sm rounded-xl p-4 border border-white/30">
            <div className="flex items-center gap-2 mb-2">
              <Percent className="text-orange-400" size={20} />
              <span className="text-orange-400 font-bold">เซ็ตคอมโบ</span>
            </div>
            <p className="text-white text-sm">ป๊อปคอร์น + โค้ก ลด 10฿</p>
            <p className="text-orange-300 text-xs">ทุกวัน</p>
          </div>
        </div>
      </div>

      {/* Category Tabs */}
      <div className="flex flex-wrap gap-3 mb-8">
        {Object.entries(categories).map(([key, label]) => (
          <button
            key={key}
            onClick={() => setSelectedCategory(key)}
            className={`
              px-6 py-3 rounded-full font-medium transition-all duration-300 flex items-center gap-2
              ${selectedCategory === key
                ? 'bg-gradient-to-r from-orange-500 to-red-600 text-white shadow-lg shadow-orange-500/25'
                : 'bg-slate-800 text-slate-300 border border-slate-600 hover:border-orange-400 hover:text-orange-400 hover:-translate-y-1'
              }
            `}
          >
            {key === 'promotions' && <Gift size={18} />}
            {label}
          </button>
        ))}
      </div>

      <div className="grid lg:grid-cols-4 gap-8">
        {/* Menu Items */}
        <div className="lg:col-span-3">
          {selectedCategory === 'promotions' ? (
            // Promotions Display
            <div className="space-y-6">
              <div className="text-center mb-8">
                <h3 className="text-3xl font-bold text-white mb-2">🎁 โปรโมชั่นทั้งหมด</h3>
                <p className="text-slate-400">รวมโปรโมชั่นและส่วนลดพิเศษทั้งหมด</p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {Object.values(promotions).map((promo, index) => (
                  <div key={index} className="bg-gradient-to-br from-slate-700/80 to-slate-800/80 rounded-2xl p-6 border border-slate-600 shadow-xl">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="text-3xl">{promo.icon}</div>
                      <div>
                        <h4 className="text-xl font-bold text-white">{promo.name}</h4>
                        <p className="text-slate-300 text-sm">{promo.description}</p>
                      </div>
                    </div>
                    
                    <div className="bg-black/20 rounded-xl p-4">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-slate-300">ประเภท</span>
                        <span className="text-white font-medium">
                          {promo.type === 'category' && 'ลดตามหมวดหมู่'}
                          {promo.type === 'combo' && 'เซ็ตคอมโบ'}
                          {promo.type === 'quantity' && 'ลดตามจำนวน'}
                          {promo.type === 'amount' && 'ลดตามยอดซื้อ'}
                        </span>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <span className="text-slate-300">ส่วนลด</span>
                        <span className="text-green-400 font-bold">
                          {promo.discount}฿
                          {promo.type === 'category' && ' (20%)'}
                        </span>
                      </div>
                      
                      {promo.validDays && (
                        <div className="flex items-center justify-between mt-2">
                          <span className="text-slate-300">เงื่อนไข</span>
                          <span className="text-yellow-400 text-sm">เฉพาะวันหยุด</span>
                        </div>
                      )}
                      
                      {promo.startTime && (
                        <div className="flex items-center justify-between mt-2">
                          <span className="text-slate-300">เวลา</span>
                          <span className="text-blue-400 text-sm">{promo.startTime} - {promo.endTime}</span>
                        </div>
                      )}
                    </div>
                    
                    <div className={`mt-4 text-center ${
                      (promo.type === 'category' && promo.category === 'drinks' && isHappyHour()) ||
                      (promo.validDays && isWeekend()) ||
                      (!promo.validDays && !promo.startTime)
                        ? 'text-green-400' : 'text-slate-400'
                    }`}>
                      {(promo.type === 'category' && promo.category === 'drinks' && isHappyHour()) ||
                       (promo.validDays && isWeekend()) ||
                       (!promo.validDays && !promo.startTime)
                        ? '✅ ใช้ได้ตอนนี้' : '⏰ ยังไม่ถึงเวลา'}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            // Regular Menu Items
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {menuItems[selectedCategory].map((item) => {
                const quantity = getItemQuantity(item.id);
                const currentPrice = calculateItemPrice(item, selectedCategory);
                const hasDiscount = currentPrice < item.price;
                
                return (
                  <div key={item.id} className="bg-slate-800/60 backdrop-blur-sm rounded-2xl p-6 border border-slate-700 hover:border-orange-400/50 transition-all duration-300 hover:-translate-y-1 relative">
                    {/* Promotion Badge */}
                    {(item.hasPromo || item.hasHappyHour || hasDiscount) && (
                      <div className="absolute -top-2 -right-2 bg-gradient-to-r from-orange-500 to-red-500 text-white text-xs font-bold px-2 py-1 rounded-full shadow-lg">
                        {item.hasHappyHour && isHappyHour() ? '⏰ -20%' : '🔥 โปรโมชั่น'}
                      </div>
                    )}

                    {/* Item Image */}
                    <div className="w-full h-40 mb-4 overflow-hidden rounded-xl">
                      <img 
                        src={item.image} 
                        alt={item.name}
                        className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                        onError={(e) => {
                          e.target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgdmlld0JveD0iMCAwIDIwMCAyMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIyMDAiIGhlaWdodD0iMjAwIiBmaWxsPSIjNEI1NTYzIi8+CjxwYXRoIGQ9Ik0xMDAgNzBDMTEwLjQ5MyA3MCAuNzEuNCEzIDc5IDEyMC40OTMgNzlDMTMwIDc5IDEzMCA4OSAxMzAgMTAwQzEzMCAxMTEgMTIwIDEyMSAxMDAgMTIxQzgwIDEyMSA3MCAxMTEgNzAgMTAwQzcwIDg5IDgwIDc5IDkwIDc5Qzk5LjI5IDc5IDEwMCA3MFoiIGZpbGw9IiM2QjczODAiLz4KPHA+PC9wPgo8L3N2Zz4K';
                        }}
                      />
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

                      {/* Price */}
                      <div className="flex items-center justify-center gap-2 mb-4">
                        {hasDiscount ? (
                          <>
                            <span className="text-lg text-slate-400 line-through">{item.price}฿</span>
                            <span className="text-2xl font-bold text-green-400">{currentPrice}฿</span>
                          </>
                        ) : (
                          <span className="text-2xl font-bold text-orange-400">{currentPrice}฿</span>
                        )}
                      </div>
                    </div>

                    {/* Add to Cart Controls */}
                    {quantity === 0 ? (
                      <button
                        onClick={() => addToCart(item, selectedCategory)}
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
                          onClick={() => addToCart(item, selectedCategory)}
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
          )}
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
                          <div className="flex items-center gap-2">
                            <p className="text-orange-400 text-sm">{item.price}฿ x {item.quantity}</p>
                            {item.price < item.originalPrice && (
                              <span className="text-xs bg-green-500/20 text-green-400 px-2 py-1 rounded-full">
                                ลด {item.originalPrice - item.price}฿
                              </span>
                            )}
                          </div>
                        </div>
                        <div className="text-white font-bold">
                          {item.price * item.quantity}฿
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Price Breakdown */}
                  <div className="border-t border-slate-600 pt-4 space-y-2">
                    {/* Subtotal */}
                    <div className="flex justify-between items-center text-sm">
                      <span className="text-slate-300">ยอดรวม</span>
                      <span className="text-slate-300">{getSubtotal()}฿</span>
                    </div>

                    {/* Discounts */}
                    {calculateDiscounts().map((discount, index) => (
                      <div key={index} className="flex justify-between items-center text-sm">
                        <span className="text-green-400 flex items-center gap-1">
                          <Tag size={12} />
                          {discount.name}
                        </span>
                        <span className="text-green-400">-{discount.amount}฿</span>
                      </div>
                    ))}

                    {/* Total */}
                    <div className="flex justify-between items-center text-lg font-bold pt-2 border-t border-slate-600">
                      <span className="text-slate-300">รวมทั้งสิ้น</span>
                      <span className="text-orange-400">{getTotalPrice()}฿</span>
                    </div>

                    {/* Savings Display */}
                    {getTotalDiscount() > 0 && (
                      <div className="bg-green-500/20 border border-green-400/30 rounded-lg p-3 text-center">
                        <div className="text-green-400 font-bold text-sm">
                          🎉 คุณประหยัดได้ {getTotalDiscount()}฿
                        </div>
                      </div>
                    )}

                    {/* Order Button */}
                    <button
                      onClick={handleOrder}
                      className="w-full bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white py-3 px-4 rounded-xl font-bold transition-all duration-300 flex items-center justify-center gap-2 mt-4"
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

            {/* Promotion Info */}
            <div className="mt-6 bg-gradient-to-r from-slate-700/50 to-slate-600/50 border border-slate-500 rounded-2xl p-4">
              <h4 className="text-orange-400 font-bold mb-3 flex items-center gap-2">
                <Gift size={16} />
                🎁 โปรโมชั่นที่ใช้ได้
              </h4>
              <div className="text-slate-300 text-sm space-y-2">
                {isHappyHour() && (
                  <div className="flex items-center justify-between bg-yellow-500/20 rounded-lg p-2">
                    <span>⏰ Happy Hour</span>
                    <span className="text-yellow-400 font-bold">-20%</span>
                  </div>
                )}
                {isWeekend() && (
                  <div className="flex items-center justify-between bg-green-500/20 rounded-lg p-2">
                    <span>🎉 Weekend Special</span>
                    <span className="text-green-400 font-bold">-25฿</span>
                  </div>
                )}
                <div className="flex items-center justify-between bg-blue-500/20 rounded-lg p-2">
                  <span>🍿 เซ็ตคอมโบ</span>
                  <span className="text-blue-400 font-bold">-10฿</span>
                </div>
                <div className="flex items-center justify-between bg-orange-500/20 rounded-lg p-2">
                  <span>💰 ซื้อครบ 150฿</span>
                  <span className="text-orange-400 font-bold">-20฿</span>
                </div>
              </div>
            </div>

            {/* Order Info */}
            <div className="mt-6 bg-blue-500/10 border border-blue-400/30 rounded-2xl p-4">
              <h4 className="text-blue-400 font-bold mb-2">📋 ข้อมูลการสั่งซื้อ</h4>
              <div className="text-slate-300 text-sm space-y-1">
                <p>• เวลาเตรียม: 10-15 นาที</p>
                <p>• จัดส่งถึงโต๊ะ: ฟรี</p>
                <p>• ชำระเงิน: เงินสด/QR Code</p>
                <p>• ติดต่อ: เรียกพนักงาน</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Payment Modal */}
      {showPaymentModal && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
          <div className="bg-slate-800 rounded-3xl p-8 max-w-md w-full max-h-[90vh] overflow-y-auto border border-slate-600 shadow-2xl">
            {/* Header */}
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-2xl font-bold bg-gradient-to-r from-orange-400 to-red-600 bg-clip-text text-transparent">
                🍕 ยืนยันการสั่งอาหาร
              </h3>
              <button
                onClick={() => setShowPaymentModal(false)}
                className="text-slate-400 hover:text-white p-2 rounded-full hover:bg-slate-700 transition-colors"
              >
                ✕
              </button>
            </div>

            {/* Order Summary */}
            <div className="bg-slate-700/50 rounded-2xl p-4 mb-6">
              <h4 className="text-lg font-semibold text-orange-400 mb-3">📋 รายการสั่งซื้อ</h4>
              <div className="space-y-2 max-h-32 overflow-y-auto">
                {cart.map((item, index) => (
                  <div key={index} className="flex justify-between text-sm">
                    <span className="text-slate-300">{item.name} x{item.quantity}</span>
                    <span className="text-orange-400">{item.price * item.quantity}฿</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Discount Summary */}
            {calculateDiscounts().length > 0 && (
              <div className="bg-green-500/10 rounded-2xl p-4 mb-6 border border-green-400/30">
                <h4 className="text-lg font-semibold text-green-400 mb-3 flex items-center gap-2">
                  <Tag size={18} />
                  🎁 ส่วนลดที่ได้รับ
                </h4>
                <div className="space-y-2">
                  {calculateDiscounts().map((discount, index) => (
                    <div key={index} className="flex justify-between text-sm">
                      <span className="text-slate-300">{discount.name}</span>
                      <span className="text-green-400 font-bold">-{discount.amount}฿</span>
                    </div>
                  ))}
                </div>
                <div className="mt-3 pt-2 border-t border-green-400/30 text-center">
                  <span className="text-green-400 font-bold">
                    รวมส่วนลด: -{getTotalDiscount()}฿
                  </span>
                </div>
              </div>
            )}

            {/* Payment Method Selection */}
            <div className="mb-6">
              <label className="block text-slate-300 mb-2 font-medium">💳 วิธีการชำระเงิน</label>
              <div className="grid grid-cols-2 gap-3">
                <button
                  onClick={() => setPaymentMethod('cash')}
                  className={`p-4 rounded-xl border-2 transition-all duration-300 flex flex-col items-center ${
                    paymentMethod === 'cash'
                      ? 'border-green-400 bg-green-500/20 text-green-400'
                      : 'border-slate-600 hover:border-green-400 hover:bg-slate-700'
                  }`}
                >
                  <div className="text-2xl mb-2">💰</div>
                  <div className="font-medium">เงินสด</div>
                  <div className="text-xs text-center">ชำระหน้าร้าน</div>
                </button>
                <button
                  onClick={() => setPaymentMethod('qr')}
                  className={`p-4 rounded-xl border-2 transition-all duration-300 flex flex-col items-center ${
                    paymentMethod === 'qr'
                      ? 'border-blue-400 bg-blue-500/20 text-blue-400'
                      : 'border-slate-600 hover:border-blue-400 hover:bg-slate-700'
                  }`}
                >
                  <div className="text-2xl mb-2">📱</div>
                  <div className="font-medium">QR Code</div>
                  <div className="text-xs text-center">ชำระทันที</div>
                </button>
              </div>
            </div>

            {/* Price Summary */}
            <div className="bg-gradient-to-r from-orange-500/10 to-red-500/10 rounded-2xl p-4 mb-6 border border-orange-400/30">
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-slate-300">ยอดรวม</span>
                  <span className="text-slate-300">{getSubtotal()}฿</span>
                </div>
                {getTotalDiscount() > 0 && (
                  <div className="flex justify-between items-center">
                    <span className="text-green-400">ส่วนลดรวม</span>
                    <span className="text-green-400">-{getTotalDiscount()}฿</span>
                  </div>
                )}
                <div className="border-t border-orange-400/30 pt-2">
                  <div className="flex justify-between items-center text-lg font-bold">
                    <span className="text-slate-300">💰 รวมทั้งสิ้น</span>
                    <span className="text-orange-400">{getTotalPrice()} บาท</span>
                  </div>
                </div>
              </div>
              <div className="text-sm text-slate-400 mt-1 text-center">
                {cart.length} รายการ
                {getTotalDiscount() > 0 && (
                  <span className="text-green-400 ml-2">
                    • ประหยัด {getTotalDiscount()}฿
                  </span>
                )}
              </div>
            </div>

            {/* QR Code Display */}
            {paymentMethod === 'qr' && (
              <div className="bg-white rounded-2xl p-4 mb-6 text-center">
                <div className="text-slate-800 font-bold mb-2">สแกน QR Code เพื่อชำระเงิน</div>
                <div className="bg-slate-200 w-32 h-32 mx-auto rounded-xl flex items-center justify-center">
                  <div className="text-4xl">📱</div>
                </div>
                <div className="text-slate-600 text-sm mt-2">PromptPay: 0XX-XXX-XXXX</div>
                <div className="text-orange-600 font-bold">{getTotalPrice()} บาท</div>
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex gap-3">
              <button
                onClick={() => setShowPaymentModal(false)}
                className="flex-1 px-6 py-3 bg-slate-600 hover:bg-slate-700 text-white rounded-xl transition-colors"
              >
                ยกเลิก
              </button>
              <button
                onClick={handlePaymentConfirm}
                className="flex-2 px-6 py-3 bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700 text-white rounded-xl font-bold transition-all"
              >
                {paymentMethod === 'qr' ? '✅ ชำระและสั่งซื้อ' : '📝 ยืนยันการสั่งซื้อ'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default FoodPage;
import React, { useState, useEffect } from 'react';
import { Menu, X, Settings, LogOut, Crown, Users, Home, Calendar, UtensilsCrossed, History, Gamepad2, Clock, Monitor, Trophy, Zap } from 'lucide-react';

// Import รูปภาพ
import EldenRingImg from "./photo/elden.jpg";
import FifaImg from "./photo/fifa.jpg";
import ValoImg from "./photo/valo.jpg";
import RobloxImg from "./photo/roblox.jpg";
import LolImg from "./photo/lol.jpg";
import CsgoImg from "./photo/csgo.jpg";
import MinecraftImg from "./photo/minecraft.jpg";
import LogoImg from "./photo/logo.jpg";
import TableImg from "./photo/table.jpg"; 
import RoomImg from "./photo/room.jpg";
import PromoImg from "./photo/promo.jpg";

const GamingBookingSystem = () => {
  const [currentZone, setCurrentZone] = useState('A');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [seatStatus, setSeatStatus] = useState({});
  const [currentPage, setCurrentPage] = useState('home');
  const [availableSeats, setAvailableSeats] = useState(24);
  const [selectedGame, setSelectedGame] = useState(null);
  const [showBookingModal, setShowBookingModal] = useState(false);
  const [selectedSeat, setSelectedSeat] = useState(null);
  const [bookingDetails, setBookingDetails] = useState({
    date: '',
    startTime: '',
    duration: 1,
    paymentMethod: 'cash'
  });

  // รูปภาพ
  const images = {
    logo: LogoImg,
    table: TableImg,
    room: RoomImg,
    promo: PromoImg
  };

  // Games data
  const games = [
    { name: 'Elden Ring', players: '12 คนกำลังเล่น', icon: '🎮', image: EldenRingImg },
    { name: 'FIFA 24', players: '8 คนกำลังเล่น', icon: '⚽', image: FifaImg },
    { name: 'Valorant', players: '15 คนกำลังเล่น', icon: '🔫', image: ValoImg },
    { name: 'Roblox', players: '20 คนกำลังเล่น', icon: '🧱', image: RobloxImg },
    { name: 'League of Legends', players: '18 คนกำลังเล่น', icon: '⚔️', image: LolImg },
    { name: 'Counter Strike 2', players: '10 คนกำลังเล่น', icon: '💣', image: CsgoImg },
    { name: 'Minecraft', players: '25 คนกำลังเล่น', icon: '⛏️', image: MinecraftImg },
  ];

  // Zone data
  const zones = {
    A: ["A1", "A2", "A3", "A4", "A5", "A6"],
    B: ["B1", "B2", "B3", "B4", "B5", "B6", "B7", "B8", "B9", "B10", "B11", "B12", "B13", "B14", "B15", "B16", "B17", "B18"],
    C: ["C1", "C2", "C3", "C4", "C5", "C6"],
    D: ["D1", "D2", "D3", "D4", "D5", "D6", "D7", "D8"],
    Room: ["Room1", "Room2", "Room3"]
  };

  // Initialize seat status and update available seats
  useEffect(() => {
    const initStatus = {};
    Object.values(zones).flat().forEach(seat => {
      initStatus[seat] = Math.random() > 0.3 ? 'available' : 'occupied';
    });
    setSeatStatus(initStatus);

    // Update available seats periodically
    const interval = setInterval(() => {
      setAvailableSeats(prev => {
        const change = Math.random() > 0.5 ? 1 : -1;
        return Math.max(0, Math.min(30, prev + change));
      });
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  // Particle system
  const createParticles = () => {
    return Array.from({ length: 50 }, (_, i) => (
      <div
        key={i}
        className="particle"
        style={{
          left: `${Math.random() * 100}%`,
          animationDelay: `${Math.random() * 6}s`,
          animationDuration: `${Math.random() * 3 + 3}s`
        }}
      />
    ));
  };

  // Handle zone change
  const handleZoneChange = (zone) => {
    setLoading(true);
    setTimeout(() => {
      setCurrentZone(zone);
      setLoading(false);
    }, 300);
  };

  // Get zone statistics
  const getZoneStats = (zone) => {
    const zoneSeats = zones[zone] || [];
    const availableCount = zoneSeats.filter(seat => seatStatus[seat] === 'available').length;
    return { total: zoneSeats.length, available: availableCount };
  };

  // Handle page navigation
  const handleNavigation = (page) => {
    setCurrentPage(page);
    setSidebarOpen(false);
  };

  // Handle seat click
  const handleSeatClick = (seat) => {
    if (seatStatus[seat] === 'available') {
      setSelectedSeat(seat);
      setShowBookingModal(true);
      // Set default date to today
      const today = new Date().toISOString().split('T')[0];
      setBookingDetails(prev => ({
        ...prev,
        date: today
      }));
    }
  };

  // Calculate price based on duration
  const calculatePrice = (duration) => {
    const hourlyRate = 50;
    if (duration === 1) return 50;
    if (duration === 3) return 100; // ลด 50 บาท
    if (duration === 5) return 230; // ลด 20 บาท
    return duration * hourlyRate;
  };

  // Handle booking confirmation
  const handleBookingConfirm = () => {
    if (!bookingDetails.date || !bookingDetails.startTime) {
      alert('กรุณาเลือกวันที่และเวลาที่ต้องการจอง');
      return;
    }

    // Update seat status to occupied
    setSeatStatus(prev => ({
      ...prev,
      [selectedSeat]: 'occupied'
    }));

    // Show confirmation
    const price = calculatePrice(bookingDetails.duration);
    const paymentText = bookingDetails.paymentMethod === 'qr' 
      ? 'ชำระผ่าน QR Code' 
      : 'ชำระเงินสดหน้าร้าน';

    alert(`✅ จองสำเร็จ!\n\nโต๊ะ: ${selectedSeat}\nวันที่: ${bookingDetails.date}\nเวลา: ${bookingDetails.startTime}\nระยะเวลา: ${bookingDetails.duration} ชั่วโมง\nราคา: ${price} บาท\nวิธีชำระ: ${paymentText}`);

    // Reset modal
    setShowBookingModal(false);
    setSelectedSeat(null);
    setBookingDetails({
      date: '',
      startTime: '',
      duration: 1,
      paymentMethod: 'cash'
    });
  };

  // Handle game select
  const handleGameSelect = (gameName) => {
    setSelectedGame(gameName);
    setTimeout(() => {
      setSelectedGame(null);
      alert(`🎮 เลือกเกม: ${gameName}\n\nคลิก "จองโต๊ะ" เพื่อเริ่มเล่น!`);
    }, 200);
  };

  const SeatCard = ({ seat, status }) => {
    const isVIP = seat.includes("VIP");
    const isRoom = seat.includes("Room");
    const isAvailable = status === 'available';

    return (
      <div
        onClick={() => handleSeatClick(seat)}
        className={`
          relative cursor-pointer transform transition-all duration-300 hover:scale-105 hover:-translate-y-2
          rounded-2xl overflow-hidden shadow-xl border-2
          ${isAvailable ? 'hover:shadow-blue-500/20' : 'cursor-not-allowed opacity-75'}
          ${isVIP ? 'border-yellow-400 bg-gradient-to-br from-slate-800 to-slate-700' : ''}
          ${isRoom ? 'border-purple-400 bg-gradient-to-br from-purple-900/20 to-indigo-900/20' : ''}
          ${!isVIP && !isRoom ? 'border-slate-600 bg-slate-800' : ''}
          backdrop-blur-sm
        `}
      >
        {/* VIP Crown Icon */}
        {isVIP && (
          <Crown className="absolute top-3 right-3 w-6 h-6 text-yellow-400 z-10 drop-shadow-lg" />
        )}

        {/* Room Icon */}
        {isRoom && (
          <Users className="absolute top-3 right-3 w-6 h-6 text-purple-400 z-10 drop-shadow-lg" />
        )}

        {/* Seat Image */}
        <div className="relative h-48 bg-gradient-to-br from-slate-700 to-slate-800">
          <img 
            src={isRoom ? images.room : images.table}
            alt={seat}
            className="w-full h-full object-cover"
            onError={(e) => {
              e.target.style.display = 'none';
              e.target.nextSibling.style.display = 'flex';
            }}
          />
          <div className="absolute inset-0 items-center justify-center hidden">
            <div className="w-32 h-24 bg-blue-500/20 rounded-lg border-2 border-blue-500/30 flex items-center justify-center">
              <div className="w-8 h-6 bg-blue-500 rounded"></div>
            </div>
          </div>
          <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 text-slate-400 text-sm bg-black/50 px-2 py-1 rounded">
            {isRoom ? 'Gaming Room' : 'Gaming Setup'}
          </div>
        </div>

        {/* Seat Info */}
        <div className="p-5 relative z-20">
          <div className="flex justify-between items-center">
            <h3 className="text-xl font-bold bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent">
              {seat}
            </h3>
            <span
              className={`
                px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wide
                ${isAvailable
                  ? 'bg-green-500 text-white shadow-green-500/30 animate-pulse'
                  : 'bg-red-500 text-white shadow-red-500/30'
                }
                shadow-lg
              `}
            >
              {isAvailable ? 'Available' : 'Occupied'}
            </span>
          </div>
        </div>

        {/* Hover overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-purple-500/10 opacity-0 hover:opacity-100 transition-opacity duration-300"></div>
      </div>
    );
  };

  // Booking Modal Component
  const BookingModal = () => {
    if (!showBookingModal || !selectedSeat) return null;

    const price = calculatePrice(bookingDetails.duration);
    const timeSlots = [];
    for (let hour = 9; hour <= 23; hour++) {
      timeSlots.push(`${hour.toString().padStart(2, '0')}:00`);
    }

    return (
      <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
        <div className="bg-slate-800 rounded-3xl p-8 max-w-md w-full max-h-[90vh] overflow-y-auto border border-slate-600 shadow-2xl">
          {/* Header */}
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-600 bg-clip-text text-transparent">
              📅 จองโต๊ะ {selectedSeat}
            </h3>
            <button
              onClick={() => setShowBookingModal(false)}
              className="text-slate-400 hover:text-white p-2 rounded-full hover:bg-slate-700 transition-colors"
            >
              <X size={24} />
            </button>
          </div>

          {/* Seat Info */}
          <div className="bg-slate-700/50 rounded-2xl p-4 mb-6">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="text-lg font-semibold text-blue-400">{selectedSeat}</h4>
                <p className="text-slate-300 text-sm">
                  {selectedSeat.includes('Room') ? 'Gaming Room - ห้องส่วนตัว' : 'Gaming Station - โต๊ะเดี่ยว'}
                </p>
              </div>
              <div className="text-green-400 font-bold">
                ✅ Available
              </div>
            </div>
          </div>

          {/* Date Selection */}
          <div className="mb-6">
            <label className="block text-slate-300 mb-2 font-medium">📅 เลือกวันที่</label>
            <input
              type="date"
              value={bookingDetails.date}
              min={new Date().toISOString().split('T')[0]}
              onChange={(e) => setBookingDetails(prev => ({ ...prev, date: e.target.value }))}
              className="w-full p-3 bg-slate-700 border border-slate-600 rounded-xl text-white focus:border-blue-400 focus:outline-none transition-colors"
            />
          </div>

          {/* Time Selection */}
          <div className="mb-6">
            <label className="block text-slate-300 mb-2 font-medium">🕒 เลือกเวลาเริ่มต้น</label>
            <select
              value={bookingDetails.startTime}
              onChange={(e) => setBookingDetails(prev => ({ ...prev, startTime: e.target.value }))}
              className="w-full p-3 bg-slate-700 border border-slate-600 rounded-xl text-white focus:border-blue-400 focus:outline-none transition-colors"
            >
              <option value="">-- เลือกเวลา --</option>
              {timeSlots.map(time => (
                <option key={time} value={time}>{time}</option>
              ))}
            </select>
          </div>

          {/* Duration Selection */}
          <div className="mb-6">
            <label className="block text-slate-300 mb-2 font-medium">⏱️ ระยะเวลาการใช้งาน</label>
            <div className="grid grid-cols-3 gap-3">
              {[
                { hours: 1, price: 50, label: '1 ชม.', discount: '' },
                { hours: 3, price: 100, label: '3 ชม.', discount: 'ประหยัด 50฿' },
                { hours: 5, price: 230, label: '5 ชม.', discount: 'ประหยัด 20฿' }
              ].map(option => (
                <button
                  key={option.hours}
                  onClick={() => setBookingDetails(prev => ({ ...prev, duration: option.hours }))}
                  className={`p-3 rounded-xl border-2 transition-all duration-300 ${
                    bookingDetails.duration === option.hours
                      ? 'border-blue-400 bg-blue-500/20 text-blue-400'
                      : 'border-slate-600 hover:border-blue-400 hover:bg-slate-700'
                  }`}
                >
                  <div className="font-bold">{option.label}</div>
                  <div className="text-sm text-green-400">{option.price}฿</div>
                  {option.discount && (
                    <div className="text-xs text-orange-400">{option.discount}</div>
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Payment Method */}
          <div className="mb-6">
            <label className="block text-slate-300 mb-2 font-medium">💳 วิธีการชำระเงิน</label>
            <div className="grid grid-cols-2 gap-3">
              <button
                onClick={() => setBookingDetails(prev => ({ ...prev, paymentMethod: 'cash' }))}
                className={`p-4 rounded-xl border-2 transition-all duration-300 flex flex-col items-center ${
                  bookingDetails.paymentMethod === 'cash'
                    ? 'border-green-400 bg-green-500/20 text-green-400'
                    : 'border-slate-600 hover:border-green-400 hover:bg-slate-700'
                }`}
              >
                <div className="text-2xl mb-2">💰</div>
                <div className="font-medium">เงินสด</div>
                <div className="text-xs text-center">ชำระหน้าร้าน</div>
              </button>
              <button
                onClick={() => setBookingDetails(prev => ({ ...prev, paymentMethod: 'qr' }))}
                className={`p-4 rounded-xl border-2 transition-all duration-300 flex flex-col items-center ${
                  bookingDetails.paymentMethod === 'qr'
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
          <div className="bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-2xl p-4 mb-6 border border-blue-400/30">
            <div className="flex justify-between items-center text-lg font-bold">
              <span className="text-slate-300">💰 รวมทั้งสิ้น</span>
              <span className="text-blue-400">{price} บาท</span>
            </div>
            <div className="text-sm text-slate-400 mt-1">
              {bookingDetails.duration} ชั่วโมง × ราคาพิเศษ
            </div>
          </div>

          {/* QR Code Display */}
          {bookingDetails.paymentMethod === 'qr' && (
            <div className="bg-white rounded-2xl p-4 mb-6 text-center">
              <div className="text-slate-800 font-bold mb-2">สแกน QR Code เพื่อชำระเงิน</div>
              <div className="bg-slate-200 w-32 h-32 mx-auto rounded-xl flex items-center justify-center">
                <div className="text-4xl">📱</div>
              </div>
              <div className="text-slate-600 text-sm mt-2">PromptPay: 0XX-XXX-XXXX</div>
              <div className="text-blue-600 font-bold">{price} บาท</div>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex gap-3">
            <button
              onClick={() => setShowBookingModal(false)}
              className="flex-1 px-6 py-3 bg-slate-600 hover:bg-slate-700 text-white rounded-xl transition-colors"
            >
              ยกเลิก
            </button>
            <button
              onClick={handleBookingConfirm}
              disabled={!bookingDetails.date || !bookingDetails.startTime}
              className="flex-2 px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white rounded-xl font-bold transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {bookingDetails.paymentMethod === 'qr' ? '✅ ชำระและจอง' : '📝 ยืนยันการจอง'}
            </button>
          </div>
        </div>
      </div>
    );
  };

  // Home Page Component
  const HomePage = () => (
    <div className="min-h-screen relative overflow-hidden">
      <style jsx>{`
        .particle {
          position: fixed;
          width: 2px;
          height: 2px;
          background: #4299e1;
          border-radius: 50%;
          opacity: 0.3;
          pointer-events: none;
          z-index: 0;
          animation: float 6s infinite linear;
        }
        
        @keyframes float {
          0% {
            transform: translateY(100vh) translateX(0);
            opacity: 0;
          }
          10% {
            opacity: 0.3;
          }
          90% {
            opacity: 0.3;
          }
          100% {
            transform: translateY(-100px) translateX(100px);
            opacity: 0;
          }
        }
        
        .fade-in {
          animation: fadeInUp 0.6s ease forwards;
        }
        
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .game-overlay {
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          background: linear-gradient(transparent, rgba(0,0,0,0.8));
          color: white;
          padding: 20px;
          transform: translateY(100%);
          transition: transform 0.3s ease;
        }
        
        .game:hover .game-overlay {
          transform: translateY(0);
        }
        
        .shimmer {
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent);
          transition: left 0.5s;
        }
        
        .hover\\:shimmer:hover .shimmer {
          left: 100%;
        }
      `}</style>

      {/* Particles */}
      <div className="fixed inset-0 pointer-events-none z-0">
        {createParticles()}
      </div>

      <div className="relative z-10">
        {/* Welcome Section */}
        <div className="bg-slate-700/60 backdrop-blur-sm p-8 rounded-2xl mb-8 border border-white/10 text-center fade-in">
          <h1 className="text-3xl font-bold mb-3 bg-gradient-to-r from-blue-400 to-green-400 bg-clip-text text-transparent">
            🎮 ยินดีต้อนรับสู่ Easy Game
          </h1>
          <p className="text-slate-300 text-lg">
            เพลิดเพลินกับการเล่นเกมในสภาพแวดล้อมที่สมบูรณ์แบบ
          </p>
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-5 mb-8 fade-in">
          {[
            { number: availableSeats, label: 'โต๊ะว่าง', icon: <Users className="text-blue-400" size={24} /> },
            { number: '50+', label: 'เกมยอดนิยม', icon: <Gamepad2 className="text-green-400" size={24} /> },
            { number: '24/7', label: 'เปิดบริการ', icon: <Clock className="text-purple-400" size={24} /> },
            { number: '144Hz', label: 'จอเกมมิ่ง', icon: <Monitor className="text-orange-400" size={24} /> }
          ].map((stat, index) => (
            <div key={index} className="bg-slate-700/80 backdrop-blur-sm p-6 rounded-2xl border border-white/10 text-center transition-all duration-300 hover:transform hover:-translate-y-2 hover:shadow-xl hover:shadow-blue-500/20">
              <div className="flex justify-center mb-2">
                {stat.icon}
              </div>
              <div className="text-3xl font-bold text-blue-400 mb-1">{stat.number}</div>
              <div className="text-slate-400 text-sm">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* News Section */}
        <section className="mb-12 fade-in">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-1 h-8 bg-gradient-to-b from-blue-400 to-blue-600 rounded-full"></div>
            <h2 className="text-3xl font-bold text-white">📢 ข่าวสาร / โปรโมชั่น</h2>
          </div>

          <div className="bg-slate-700/95 backdrop-blur-lg rounded-3xl p-8 border border-white/10 shadow-2xl transition-all duration-300 hover:transform hover:-translate-y-2 hover:shadow-blue-500/20 hover:shimmer relative overflow-hidden">
            <div className="shimmer"></div>
            <div className="grid lg:grid-cols-2 gap-8 items-center">
              <div className="relative group">
                <img
                  src={images.promo}
                  alt="Promotion"
                  className="w-full h-48 object-cover rounded-2xl shadow-lg transition-transform duration-300 group-hover:scale-105"
                  onError={(e) => {
                    e.target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAwIiBoZWlnaHQ9IjIwMCIgdmlld0JveD0iMCAwIDMwMCAyMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIzMDAiIGhlaWdodD0iMjAwIiBmaWxsPSIjMmQzNzQ4Ii8+CjxyZWN0IHg9IjUwIiB5PSI1MCIgd2lkdGg9IjIwMCIgaGVpZ2h0PSIxMDAiIGZpbGw9IiM0Mjk5ZTEiIHJ4PSIxMCIgZmlsbC1vcGFjaXR5PSIwLjMiLz4KPHN2ZyB4PSIxMjUiIHk9Ijg1IiB3aWR0aD0iNTAiIGhlaWdodD0iMzAiIGZpbGw9IiM0Mjk5ZTEiPgogIDxwYXRoIGQ9Ik0yNSAxNVY3LjVINVYxNUgyMEwyMi41IDE3LjVMMjUgMTVaIi8+Cjwvc3ZnPgo8dGV4dCB4PSIxNTAiIHk9IjE3MCIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZmlsbD0iIzRhNWU2OCIgZm9udC1mYW1pbHk9IkFyaWFsIiBmb250LXNpemU9IjE2Ij5Qcm9tb3Rpb248L3RleHQ+Cjwvc3ZnPg==';
                  }}
                />
              </div>

              <div>
                <h3 className="text-2xl font-bold mb-6 bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent">
                  💰 ราคาเล่นต่อชั่วโมง
                </h3>
                <div className="space-y-4">
                  {[
                    { time: '🕕 1 ชั่วโมง', price: '50 บาท' },
                    { time: '🕘 3 ชั่วโมง', price: '100 บาท (ประหยัด 50฿)' },
                    { time: '🕔 5 ชั่วโมง', price: '230 บาท (ประหยัด 20฿)' }
                  ].map((item, index) => (
                    <div key={index} className="bg-blue-500/10 border border-blue-400/30 border-l-4 border-l-blue-400 p-4 rounded-xl text-slate-200 transition-all duration-300 hover:bg-blue-500/15 hover:translate-x-2">
                      <span className="font-medium">{item.time} : {item.price}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Games Section */}
        <section className="fade-in">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-1 h-8 bg-gradient-to-b from-green-400 to-green-600 rounded-full"></div>
            <h2 className="text-3xl font-bold text-white">🎯 เกมยอดนิยม</h2>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
            {games.map((game, index) => (
              <div
                key={index}
                onClick={() => handleGameSelect(game.name)}
                className="relative cursor-pointer overflow-hidden rounded-2xl border border-white/20 bg-slate-800/60 shadow-md transition-all duration-300 hover:shadow-xl hover:scale-105 hover:-translate-y-1"
              >
                {/* Image */}
                <img
                  src={game.image}
                  alt={game.name}
                  className="w-full h-48 sm:h-56 md:h-48 lg:h-52 object-cover transition-transform duration-300"
                  onError={(e) => {
                    e.target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjE4MCIgdmlld0JveD0iMCAwIDIwMCAxODAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIyMDAiIGhlaWdodD0iMTgwIiBmaWxsPSIjMmQzNzQ4Ii8+CjxyZWN0IHg9IjIwIiB5PSIyMCIgd2lkdGg9IjE2MCIgaGVpZ2h0PSIxNDAiIGZpbGw9IiM0OGJiNzgiIHJ4PSIxMCIgZmlsbC1vcGFjaXR5PSIwLjMiLz4KPHN2ZyB4PSI4NSIgeT0iNzUiIHdpZHRoPSIzMCIgaGVpZ2h0PSIzMCIgZmlsbD0iIzQ4YmI3OCI+CiAgPGNpcmNsZSBjeD0iMTUiIGN5PSIxNSIgcj0iMTAiLz4KPC9zdmc+Cjx0ZXh0IHg9IjEwMCIgeT0iMTYwIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmaWxsPSIjZTJlOGYwIiBmb250LWZhbWlseT0iQXJpYWwiIGZvbnQtc2l6ZT0iMTQiPkdhbWU8L3RleHQ+Cjwvc3ZnPg==';
                  }}
                />

                {/* Overlay */}
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4 text-white transition-opacity duration-300 opacity-0 hover:opacity-100">
                  <div className="font-bold text-lg">{game.name}</div>
                  <div className="text-sm opacity-80">{game.players}</div>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );

  // Booking Page Component
  const BookingPage = () => {
    const stats = getZoneStats(currentZone);

    return (
      <div className="space-y-8">
        {/* Header */}
        <div className="mb-8">
          <h2 className="text-4xl lg:text-5xl font-bold mb-2 bg-gradient-to-r from-blue-400 to-purple-600 bg-clip-text text-transparent">
            🎮 จองโต๊ะ
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"></div>
        </div>

        {/* Zone Tabs */}
        <div className="flex flex-wrap gap-3 mb-8">
          {Object.keys(zones).map((zone) => (
            <button
              key={zone}
              onClick={() => handleZoneChange(zone)}
              className={`
                px-6 py-3 rounded-full font-medium transition-all duration-300 relative overflow-hidden
                ${currentZone === zone
                  ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg shadow-blue-500/25'
                  : 'bg-slate-800 text-slate-300 border border-slate-600 hover:border-blue-400 hover:text-blue-400 hover:-translate-y-1'
                }
              `}
            >
              Zone {zone}
            </button>
          ))}
        </div>

        {/* Zone Info */}
        <div className="bg-slate-800/60 backdrop-blur-sm rounded-2xl p-6 mb-8 border border-slate-700">
          <div className="flex justify-between items-center">
            <div className="text-lg">
              <span className="font-medium">Zone {currentZone}</span>
              <span className="mx-2">-</span>
              <span className="text-blue-400 font-medium">{stats.total} โต๊ะ</span>
            </div>
            <div className="text-green-400 font-medium">
              ✅ ว่าง {stats.available} โต๊ะ
            </div>
          </div>
        </div>

        {/* Booking Grid */}
        <div className="relative">
          {loading && (
            <div className="absolute inset-0 bg-slate-900/80 backdrop-blur-sm rounded-3xl flex items-center justify-center z-10">
              <div className="flex items-center space-x-3 text-blue-400">
                <div className="w-8 h-8 border-4 border-blue-400 border-t-transparent rounded-full animate-spin"></div>
                <span className="text-lg">กำลังโหลด...</span>
              </div>
            </div>
          )}
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 animate-in slide-in-from-bottom-4 duration-500">
            {zones[currentZone]?.map((seat) => (
              <SeatCard
                key={seat}
                seat={seat}
                status={seatStatus[seat]}
              />
            ))}
          </div>
        </div>
      </div>
    );
  };

  // Placeholder สำหรับหน้าอื่นๆ ที่ยังไม่ได้สร้างไฟล์
  const PlaceholderPage = ({ title, icon }) => (
    <div className="flex flex-col items-center justify-center h-96 space-y-6">
      <div className="text-6xl">{icon}</div>
      <h2 className="text-3xl font-bold text-slate-400">{title}</h2>
      <p className="text-slate-500 text-center max-w-md">
        หน้านี้ยังไม่ได้พัฒนา สามารถสร้างไฟล์แยกและ import เข้ามาได้
      </p>
    </div>
  );

  // Function สำหรับ render เนื้อหาแต่ละหน้า
  const renderContent = () => {
    switch(currentPage) {
      case 'home':
        return <HomePage />;
      case 'booking':
        return <BookingPage />;
      case 'food':
        return <PlaceholderPage title="สั่งอาหาร" icon="🍕" />;
      case 'history':
        return <PlaceholderPage title="ประวัติการใช้งาน" icon="📊" />;
      default:
        return <HomePage />;
    }
  };

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-slate-100">
      {/* Mobile menu button */}
      <button
        onClick={() => setSidebarOpen(!sidebarOpen)}
        className="fixed top-4 left-4 z-50 lg:hidden bg-blue-500 hover:bg-blue-600 p-3 rounded-xl shadow-lg transition-colors"
      >
        {sidebarOpen ? <X size={20} /> : <Menu size={20} />}
      </button>

      {/* Sidebar */}
      <aside
        className={`
          fixed lg:static inset-y-0 left-0 z-40 w-80 
          bg-slate-900/95 backdrop-blur-xl border-r border-slate-700
          transform transition-transform duration-300 ease-in-out
          ${sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
          shadow-2xl
        `}
      >
        {/* Logo */}
        <div className="p-8 border-b border-slate-700 text-center">
          <img 
            src={images.logo} 
            alt="Easy Game Logo" 
            className="w-44 h-44 mx-auto rounded-2xl shadow-xl shadow-blue-500/20 mb-4 object-cover"
            onError={(e) => {
              e.target.style.display = 'none';
              e.target.nextSibling.style.display = 'flex';
            }}
          />
          <div className="w-44 h-44 mx-auto bg-gradient-to-br from-blue-500 to-blue-700 rounded-2xl shadow-xl shadow-blue-500/20 mb-4 items-center justify-center hidden">
            <div className="text-4xl">🎮</div>
          </div>
          <h1 className="text-xl font-bold text-blue-400">Easy Game</h1>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-6 space-y-2">
          <button 
            onClick={() => handleNavigation('home')}
            className={`w-full text-left flex items-center p-4 rounded-r-3xl transition-all duration-300 ${
              currentPage === 'home' 
                ? 'bg-gradient-to-r from-blue-500 to-blue-600 text-white translate-x-2 shadow-lg shadow-blue-500/20'
                : 'text-slate-300 hover:text-white hover:bg-gradient-to-r hover:from-blue-500 hover:to-blue-600 hover:translate-x-2'
            }`}
          >
            <Home size={20} className="mr-3" />
            หน้าหลัก
          </button>
          <button 
            onClick={() => handleNavigation('booking')}
            className={`w-full text-left flex items-center p-4 rounded-r-3xl transition-all duration-300 ${
              currentPage === 'booking' 
                ? 'bg-gradient-to-r from-blue-500 to-blue-600 text-white translate-x-2 shadow-lg shadow-blue-500/20'
                : 'text-slate-300 hover:text-white hover:bg-gradient-to-r hover:from-blue-500 hover:to-blue-600 hover:translate-x-2'
            }`}
          >
            <Calendar size={20} className="mr-3" />
            จองโต๊ะ
          </button>
          <button 
            onClick={() => handleNavigation('food')}
            className={`w-full text-left flex items-center p-4 rounded-r-3xl transition-all duration-300 ${
              currentPage === 'food' 
                ? 'bg-gradient-to-r from-blue-500 to-blue-600 text-white translate-x-2 shadow-lg shadow-blue-500/20'
                : 'text-slate-300 hover:text-white hover:bg-gradient-to-r hover:from-blue-500 hover:to-blue-600 hover:translate-x-2'
            }`}
          >
            <UtensilsCrossed size={20} className="mr-3" />
            สั่งอาหาร
          </button>
          <button 
            onClick={() => handleNavigation('history')}
            className={`w-full text-left flex items-center p-4 rounded-r-3xl transition-all duration-300 ${
              currentPage === 'history' 
                ? 'bg-gradient-to-r from-blue-500 to-blue-600 text-white translate-x-2 shadow-lg shadow-blue-500/20'
                : 'text-slate-300 hover:text-white hover:bg-gradient-to-r hover:from-blue-500 hover:to-blue-600 hover:translate-x-2'
            }`}
          >
            <History size={20} className="mr-3" />
            ประวัติการใช้งาน
          </button>
        </nav>

        {/* Bottom menu */}
        <div className="p-6 border-t border-slate-700 space-y-2">
          <a href="#" className="flex items-center p-3 rounded-xl text-slate-400 hover:text-blue-400 hover:bg-slate-800 transition-all">
            <Settings size={16} className="mr-3" />
            Settings
          </a>
          <a href="#" className="flex items-center p-3 rounded-xl text-slate-400 hover:text-red-400 hover:bg-slate-800 transition-all">
            <LogOut size={16} className="mr-3" />
            Log out
          </a>
        </div>
      </aside>

      {/* Overlay for mobile */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-30 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Main Content */}
      <main className="flex-1 lg:ml-0 p-8 lg:p-12">
        {renderContent()}
      </main>

      {/* Booking Modal */}
      <BookingModal />
    </div>
  );
};

export default GamingBookingSystem;
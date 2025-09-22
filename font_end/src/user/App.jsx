// App.jsx - Main Application Component
import React, { useState, useEffect } from 'react';
import { Menu, X, Settings, LogOut } from 'lucide-react';
import GamingAuth from './pages/login_and_register.jsx';
import Sidebar from './components/Sidebar';
import HomePage from './pages/HomePage';
import BookingPage from './pages/BookingPage';
import FoodPage from './pages/FoodPage';
import HistoryPage from './pages/HistoryPage';
import BookingModal from './components/BookingModal';
import AdminIndex from '../admin/index.jsx';

// Import รูปภาพ
import LogoImg from "/photo/logo.jpg";

const App = () => {
  const [currentPage, setCurrentPage] = useState('home');
  const [isAuthenticated, setIsAuthenticated] = useState(() => !!localStorage.getItem('auth'));
  const [isAdmin, setIsAdmin] = useState(() => !!localStorage.getItem('isAdmin'));
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [seatStatus, setSeatStatus] = useState({});
  const [availableSeats, setAvailableSeats] = useState(24);
  const [showBookingModal, setShowBookingModal] = useState(false);
  const [selectedSeat, setSelectedSeat] = useState(null);
  const [bookingDetails, setBookingDetails] = useState({
    date: '',
    startTime: '',
    duration: 1,
    paymentMethod: 'cash'
  });

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

  // Handle page navigation
  const handleNavigation = (page) => {
    setCurrentPage(page);
    setSidebarOpen(false);
  };

  const handleLoginSuccess = () => {
    localStorage.setItem('auth', '1');
    setIsAuthenticated(true);
  };

  const handleAdminLogin = () => {
    localStorage.setItem('isAdmin', '1');
    localStorage.setItem('auth', '1');
    setIsAdmin(true);
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    localStorage.removeItem('auth');
    localStorage.removeItem('isAdmin');
    setIsAuthenticated(false);
    setIsAdmin(false);
  };

  // Handle seat click
  const handleSeatClick = (seat) => {
    if (seatStatus[seat] === 'available') {
      setSelectedSeat(seat);
      setShowBookingModal(true);
      const today = new Date().toISOString().split('T')[0];
      setBookingDetails(prev => ({
        ...prev,
        date: today
      }));
    }
  };

  // Handle booking confirmation
  const handleBookingConfirm = () => {
    if (!bookingDetails.date || !bookingDetails.startTime) {
      alert('กรุณาเลือกวันที่และเวลาที่ต้องการจอง');
      return;
    }

    setSeatStatus(prev => ({
      ...prev,
      [selectedSeat]: 'occupied'
    }));

    const price = calculatePrice(bookingDetails.duration);
    const paymentText = bookingDetails.paymentMethod === 'qr' 
      ? 'ชำระผ่าน QR Code' 
      : 'ชำระเงินสดหน้าร้าน';

    alert(`✅ จองสำเร็จ!\n\nโต๊ะ: ${selectedSeat}\nวันที่: ${bookingDetails.date}\nเวลา: ${bookingDetails.startTime}\nระยะเวลา: ${bookingDetails.duration} ชั่วโมง\nราคา: ${price} บาท\nวิธีชำระ: ${paymentText}`);

    setShowBookingModal(false);
    setSelectedSeat(null);
    setBookingDetails({
      date: '',
      startTime: '',
      duration: 1,
      paymentMethod: 'cash'
    });
  };

  // Calculate price
  const calculatePrice = (duration) => {
    if (duration === 1) return 50;
    if (duration === 3) return 100;
    if (duration === 5) return 230;
    return duration * 50;
  };

  // Get zone statistics
  const getZoneStats = (zone) => {
    const zoneSeats = zones[zone] || [];
    const availableCount = zoneSeats.filter(seat => seatStatus[seat] === 'available').length;
    return { total: zoneSeats.length, available: availableCount };
  };

  // Function สำหรับ render เนื้อหาแต่ละหน้า
  const renderContent = () => {
    const sharedProps = {
      seatStatus,
      setSeatStatus,
      availableSeats,
      zones,
      getZoneStats,
      handleSeatClick
    };

    switch(currentPage) {
      case 'home':
        return <HomePage availableSeats={availableSeats} />;
      case 'booking':
        return <BookingPage {...sharedProps} />;
      case 'food':
        return <FoodPage />;
      case 'history':
        return <HistoryPage />;
      default:
        return <HomePage availableSeats={availableSeats} />;
    }
  };

  // If user not authenticated, show login/register screen
  if (!isAuthenticated) {
    return <GamingAuth onLoginSuccess={handleLoginSuccess} onAdminLogin={handleAdminLogin} />;
  }

  // If admin user, show admin index
  if (isAdmin) {
    return <AdminIndex onLogout={handleLogout} />;
  }

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
      <Sidebar 
        currentPage={currentPage}
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
        handleNavigation={handleNavigation}
        logoImg={LogoImg}
        onLogout={handleLogout}
      />

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
      <BookingModal 
        showBookingModal={showBookingModal}
        setShowBookingModal={setShowBookingModal}
        selectedSeat={selectedSeat}
        bookingDetails={bookingDetails}
        setBookingDetails={setBookingDetails}
        handleBookingConfirm={handleBookingConfirm}
        calculatePrice={calculatePrice}
      />
    </div>
  );
};

export default App;
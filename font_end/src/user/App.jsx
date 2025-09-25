// App.jsx - Main Application Component
import React, { useState } from "react";
import { Menu, X } from "lucide-react";
import GamingAuth from "./pages/login_and_register.jsx";
import Sidebar from "./components/Sidebar";
import HomePage from "./pages/HomePage";
import BookingPage from "./pages/BookingPage";
import FoodPage from "./pages/FoodPage";
import HistoryPage from "./pages/HistoryPage";
import BookingModal from "./components/BookingModal";
import AdminIndex from "../admin/index.jsx";

// Import รูปภาพ
import LogoImg from "/photo/logo.jpg";

const App = () => {
  const [currentPage, setCurrentPage] = useState("home");
  const [isAuthenticated, setIsAuthenticated] = useState(
    () => !!localStorage.getItem("auth")
  );
  const [isAdmin, setIsAdmin] = useState(
    () => !!localStorage.getItem("isAdmin")
  );
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const [showBookingModal, setShowBookingModal] = useState(false);
  const [selectedSeat, setSelectedSeat] = useState(null);
  const [bookingDetails, setBookingDetails] = useState({
    date: "",
    startTime: "",
    duration: 1,
    paymentMethod: "cash",
  });

  // Handle page navigation
  const handleNavigation = (page) => {
    setCurrentPage(page);
    setSidebarOpen(false);
  };

  const handleLoginSuccess = () => {
    localStorage.setItem("auth", "1");
    setIsAuthenticated(true);
  };

  const handleAdminLogin = () => {
    localStorage.setItem("isAdmin", "1");
    localStorage.setItem("auth", "1");
    setIsAdmin(true);
    setIsAuthenticated(true);
  };

const handleLogout = () => {
  localStorage.removeItem("auth");
  localStorage.removeItem("isAdmin");
  localStorage.removeItem("token");
  localStorage.removeItem("userId");
  localStorage.removeItem("userName");
  localStorage.removeItem("userEmail");

  setIsAuthenticated(false);
  setIsAdmin(false);
};

  // ✅ เปิด popup เมื่อกดที่ seat
  const handleOpenModal = (seat) => {
    setSelectedSeat(seat);
    setShowBookingModal(true);
    setBookingDetails((prev) => ({
      ...prev,
      date: new Date().toISOString().split("T")[0], // set ค่า default วันนี้
    }));
  };

  // ✅ callback เวลาจองเสร็จ
  const handleBookingSuccess = () => {
    console.log("Booking completed, refresh seats here...");
    // 👉 สามารถสั่ง refresh seats ได้
    // เช่น เรียก API หรือ set state ใหม่
  };

  // Function สำหรับ render เนื้อหาแต่ละหน้า
  const renderContent = () => {
    switch (currentPage) {
      case "home":
        return <HomePage />;
      case "booking":
        return <BookingPage handleOpenModal={handleOpenModal} />; // ✅ ส่งฟังก์ชันไป
      case "food":
        return <FoodPage />;
      case "history":
        return <HistoryPage />;
      default:
        return <HomePage />;
    }
  };

  // If user not authenticated, show login/register screen
  if (!isAuthenticated) {
    return (
      <GamingAuth
        onLoginSuccess={handleLoginSuccess}
        onAdminLogin={handleAdminLogin}
      />
    );
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
      <main className="flex-1 lg:ml-0 p-8 lg:p-12">{renderContent()}</main>

      {/* Booking Modal */}
      <BookingModal
        showBookingModal={showBookingModal}
        setShowBookingModal={setShowBookingModal}
        selectedSeat={selectedSeat}
        bookingDetails={bookingDetails}
        setBookingDetails={setBookingDetails}
        onBookingSuccess={handleBookingSuccess} // ✅ ส่ง callback เข้าไป
      />
    </div>
  );
};

export default App;

// components/BookingModal.jsx
import React from "react";
import { X } from "lucide-react";
import axios from "axios";

const BookingModal = ({
  showBookingModal,
  setShowBookingModal,
  selectedSeat,
  bookingDetails,
  setBookingDetails,
  onBookingSuccess, // ✅ callback จาก App
}) => {
  if (!showBookingModal || !selectedSeat) return null;

  const calculatePrice = (duration) => {
    if (duration === 1) return 50;
    if (duration === 3) return 100;
    if (duration === 5) return 230;
    return duration * 50;
  };

  const price = calculatePrice(bookingDetails.duration);

  // ✅ helper คำนวณเวลาเลิก
  const calculateEndTime = (startTime, duration) => {
    if (!startTime) return null;
    const [hour, minute] = startTime.split(":").map(Number);
    const endHour = hour + duration;
    return `${String(endHour).padStart(2, "0")}:${String(minute).padStart(2, "0")}`;
  };

  // ✅ confirm booking
  const handleBookingConfirm = async () => {
    try {
      const token = localStorage.getItem("token");
      const userId = localStorage.getItem("userId");

      if (!userId) {
        alert("กรุณาเข้าสู่ระบบก่อนทำการจอง");
        return;
      }

      const endTime = calculateEndTime(
        bookingDetails.startTime,
        bookingDetails.duration
      );

      await axios.post(
        "http://localhost:3000/bookings",
        {
          userId: Number(userId),
          seatId: selectedSeat.id,
          duration: bookingDetails.duration,
          price,
          startTime: bookingDetails.startTime,
          endTime,
          paymentMethod: bookingDetails.paymentMethod || "cash",
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      await axios.patch(
        `http://localhost:3000/seats/${selectedSeat.id}/book`
      );

      if (onBookingSuccess) onBookingSuccess(); // ✅ refresh seats ผ่าน App
      alert(`✅ จองโต๊ะ ${selectedSeat.zone}${selectedSeat.id} สำเร็จ!`);
      setShowBookingModal(false);
    } catch (err) {
      console.error("Booking error:", err);
      alert("❌ จองไม่สำเร็จ");
    }
  };

  // ✅ สร้าง time slots
  const timeSlots = [];
  for (let hour = 9; hour <= 23; hour++) {
    timeSlots.push(`${hour.toString().padStart(2, "0")}:00`);
  }

  // ✅ กรองเวลาถ้าวันที่ที่เลือก = วันนี้
  const filterTimeSlots = () => {
    if (!bookingDetails.date) return timeSlots;

    const today = new Date().toISOString().split("T")[0];
    if (bookingDetails.date !== today) {
      return timeSlots; // ถ้าเลือกวันอื่น ให้โชว์ทุกเวลา
    }

    const now = new Date();
    const currentHour = now.getHours();

    return timeSlots.filter((time) => {
      const [h] = time.split(":").map(Number);
      return h > currentHour; // เลือกได้เฉพาะเวลาที่มากกว่าปัจจุบัน
    });
  };

  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
      <div className="bg-slate-800 rounded-3xl p-8 max-w-md w-full">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-2xl font-bold text-blue-400">
            📅 จองโต๊ะ {selectedSeat.zone}{selectedSeat.id}
          </h3>
          <button onClick={() => setShowBookingModal(false)}>
            <X size={24} className="text-slate-400 hover:text-white" />
          </button>
        </div>

        {/* Date */}
        <label className="block mb-2 text-slate-300">📅 เลือกวันที่</label>
        <input
          type="date"
          value={bookingDetails.date}
          min={new Date().toISOString().split("T")[0]}
          onChange={(e) =>
            setBookingDetails((prev) => ({ ...prev, date: e.target.value }))
          }
          className="w-full mb-4 p-3 rounded-lg bg-slate-700 text-white"
        />

        {/* Start Time */}
        <label className="block mb-2 text-slate-300">🕒 เวลาเริ่มต้น</label>
        <select
          value={bookingDetails.startTime}
          onChange={(e) =>
            setBookingDetails((prev) => ({
              ...prev,
              startTime: e.target.value,
            }))
          }
          className="w-full mb-4 p-3 rounded-lg bg-slate-700 text-white"
        >
          <option value="">-- เลือกเวลา --</option>
          {filterTimeSlots().map((time) => (
            <option key={time} value={time}>
              {time}
            </option>
          ))}
        </select>

        {/* Duration */}
        <div className="mb-6">
          <label className="block text-slate-300 mb-2">⏱️ ระยะเวลา</label>
          <div className="flex gap-2">
            {[1, 3, 5].map((h) => (
              <button
                key={h}
                onClick={() =>
                  setBookingDetails((prev) => ({ ...prev, duration: h }))
                }
                className={`flex-1 p-3 rounded-lg border ${
                  bookingDetails.duration === h
                    ? "bg-blue-500/20 border-blue-400 text-blue-400"
                    : "bg-slate-700 border-slate-600 text-white"
                }`}
              >
                {h} ชม. ({calculatePrice(h)}฿)
              </button>
            ))}
          </div>
        </div>

        {/* Payment Method */}
        <div className="mb-6">
          <label className="block text-slate-300 mb-2">💳 วิธีชำระเงิน</label>
          <div className="flex gap-3">
            <button
              onClick={() =>
                setBookingDetails((prev) => ({
                  ...prev,
                  paymentMethod: "cash",
                }))
              }
              className={`flex-1 p-3 rounded-lg border ${
                bookingDetails.paymentMethod === "cash"
                  ? "bg-green-500/20 border-green-400 text-green-400"
                  : "bg-slate-700 border-slate-600 text-white"
              }`}
            >
              เงินสด
            </button>
            <button
              onClick={() =>
                setBookingDetails((prev) => ({
                  ...prev,
                  paymentMethod: "qr",
                }))
              }
              className={`flex-1 p-3 rounded-lg border ${
                bookingDetails.paymentMethod === "qr"
                  ? "bg-purple-500/20 border-purple-400 text-purple-400"
                  : "bg-slate-700 border-slate-600 text-white"
              }`}
            >
              QR Code
            </button>
          </div>
        </div>

        {/* Price */}
        <div className="mb-6 text-lg text-blue-400">💰 รวม {price} บาท</div>

        {/* Actions */}
        <div className="flex gap-3">
          <button
            onClick={() => setShowBookingModal(false)}
            className="flex-1 bg-slate-600 py-2 rounded-lg"
          >
            ❌ ยกเลิก
          </button>
          <button
            onClick={handleBookingConfirm}
            disabled={!bookingDetails.date || !bookingDetails.startTime}
            className="flex-1 bg-gradient-to-r from-blue-500 to-purple-600 py-2 rounded-lg text-white font-bold"
          >
            📝 ยืนยัน
          </button>
        </div>
      </div>
    </div>
  );
};

export default BookingModal;

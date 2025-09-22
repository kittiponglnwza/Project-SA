// components/BookingModal.jsx
import React from 'react';
import { X } from 'lucide-react';

const BookingModal = ({ 
  showBookingModal, 
  setShowBookingModal, 
  selectedSeat, 
  bookingDetails, 
  setBookingDetails, 
  handleBookingConfirm, 
  calculatePrice 
}) => {
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

export default BookingModal;
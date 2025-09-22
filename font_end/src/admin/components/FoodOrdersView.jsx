import React from 'react';

const FoodOrdersView = ({ foodOrders }) => (
  <div className="space-y-6">
    <div className="flex justify-between items-center">
      <h2 className="text-3xl font-bold text-white">คำสั่งซื้ออาหาร</h2>
      <div className="flex gap-3">
        <select className="px-4 py-2 bg-slate-800 border border-slate-600 rounded-lg text-white">
          <option value="">ทุกสถานะ</option>
          <option value="preparing">กำลังเตรียม</option>
          <option value="ready">พร้อมเสิร์ฟ</option>
          <option value="delivered">ส่งแล้ว</option>
        </select>
      </div>
    </div>

    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {foodOrders.map((order) => (
        <div key={order.id} className="bg-slate-800 rounded-xl p-6 border border-slate-700 hover:shadow-lg transition-shadow">
          <div className="flex justify-between items-start mb-4">
            <div>
              <h3 className="text-lg font-bold text-white">คำสั่งซื้อ #{order.orderNumber}</h3>
              <p className="text-slate-300">{order.customer}</p>
              <p className="text-sm text-slate-400">ที่นั่ง: {order.seat}</p>
            </div>
            <span
              className={`px-2 py-1 rounded-full text-xs font-semibold ${
                order.status === 'preparing'
                  ? 'bg-yellow-500/20 text-yellow-400'
                  : order.status === 'ready'
                  ? 'bg-blue-500/20 text-blue-400'
                  : 'bg-green-500/20 text-green-400'
              }`}
            >
              {order.status === 'preparing' ? 'กำลังเตรียม' : order.status === 'ready' ? 'พร้อมเสิร์ฟ' : 'ส่งแล้ว'}
            </span>
          </div>
          <div className="space-y-2 mb-4">
            {order.items.map((item, index) => (
              <div key={index} className="flex justify-between text-sm">
                <span className="text-slate-300">
                  {item.name} x{item.quantity}
                </span>
                <span className="text-white">฿{item.price * item.quantity}</span>
              </div>
            ))}
          </div>
          <div className="border-t border-slate-700 pt-3 flex justify-between items-center">
            <div>
              <p className="text-slate-400 text-sm">
                รวม: <span className="text-green-400 font-bold">฿{order.total}</span>
              </p>
              <p className="text-slate-400 text-xs">เวลา: {order.orderTime}</p>
            </div>
            <div className="flex space-x-2">
              <button className="bg-blue-600 hover:bg-blue-700 px-3 py-1 rounded text-sm transition-colors">อัปเดต</button>
            </div>
          </div>
        </div>
      ))}
    </div>
  </div>
);

export default FoodOrdersView;


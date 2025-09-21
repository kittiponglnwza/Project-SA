import React, { useState, useEffect } from 'react';
import { 
  Users, 
  Monitor, 
  DollarSign, 
  TrendingUp, 
  Calendar, 
  Settings,
  BarChart3,
  PieChart,
  UserCheck,
  Clock,
  UtensilsCrossed,
  Eye,
  Edit,
  Trash2,
  Plus,
  Search,
  Filter,
  Download,
  RefreshCw,
  AlertTriangle,
  CheckCircle,
  XCircle
} from 'lucide-react';

const AdminPanel = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [loading, setLoading] = useState(false);

  // Mock data - ในการใช้งานจริงจะดึงจากฐานข้อมูล
  const [dashboardData, setDashboardData] = useState({
    totalUsers: 245,
    activeBookings: 18,
    todayRevenue: 12500,
    availableSeats: 24,
    totalSeats: 45,
    monthlyRevenue: 385000,
    foodOrders: 32
  });

  const [bookings, setBookings] = useState([
    {
      id: 1,
      user: 'John Doe',
      seat: 'A1',
      date: '2024-12-15',
      startTime: '14:00',
      endTime: '17:00',
      duration: 3,
      price: 100,
      status: 'active',
      paymentMethod: 'cash'
    },
    {
      id: 2,
      user: 'Jane Smith',
      seat: 'Room1',
      date: '2024-12-15',
      startTime: '19:00',
      endTime: '24:00',
      duration: 5,
      price: 230,
      status: 'completed',
      paymentMethod: 'qr'
    },
    {
      id: 3,
      user: 'Mike Johnson',
      seat: 'B5',
      date: '2024-12-15',
      startTime: '10:00',
      endTime: '13:00',
      duration: 3,
      price: 100,
      status: 'cancelled',
      paymentMethod: 'cash'
    }
  ]);

  const [users, setUsers] = useState([
    {
      id: 1,
      name: 'John Doe',
      email: 'john@example.com',
      phone: '081-234-5678',
      totalBookings: 15,
      totalSpent: 2500,
      lastVisit: '2024-12-15',
      status: 'active'
    },
    {
      id: 2,
      name: 'Jane Smith',
      email: 'jane@example.com',
      phone: '089-876-5432',
      totalBookings: 8,
      totalSpent: 1200,
      lastVisit: '2024-12-14',
      status: 'active'
    }
  ]);

  const [seatManagement, setSeatManagement] = useState([
    { id: 'A1', zone: 'A', type: 'regular', status: 'available', condition: 'good' },
    { id: 'A2', zone: 'A', type: 'regular', status: 'occupied', condition: 'good' },
    { id: 'Room1', zone: 'Room', type: 'vip', status: 'maintenance', condition: 'repair' },
    { id: 'B1', zone: 'B', type: 'regular', status: 'available', condition: 'excellent' }
  ]);

  const [foodOrders, setFoodOrders] = useState([
    {
      id: 1,
      orderNumber: 'F001',
      customer: 'John Doe',
      seat: 'A1',
      items: [
        { name: 'มันฝรั่งทอด', quantity: 1, price: 35 },
        { name: 'โค้ก', quantity: 2, price: 15 }
      ],
      total: 65,
      status: 'preparing',
      orderTime: '15:30'
    },
    {
      id: 2,
      orderNumber: 'F002',
      customer: 'Jane Smith',
      seat: 'Room1',
      items: [
        { name: 'ข้าวผัดไข่', quantity: 1, price: 45 }
      ],
      total: 45,
      status: 'delivered',
      orderTime: '14:15'
    }
  ]);

  // Dashboard Component
  const DashboardView = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-bold text-white">Dashboard Overview</h2>
        <button 
          onClick={() => setLoading(true)}
          className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg flex items-center gap-2 transition-colors"
        >
          <RefreshCw size={16} />
          Refresh
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-slate-400 text-sm">Total Users</p>
              <p className="text-2xl font-bold text-white">{dashboardData.totalUsers}</p>
            </div>
            <Users className="text-blue-400" size={32} />
          </div>
        </div>

        <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-slate-400 text-sm">Active Bookings</p>
              <p className="text-2xl font-bold text-white">{dashboardData.activeBookings}</p>
            </div>
            <Monitor className="text-green-400" size={32} />
          </div>
        </div>

        <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-slate-400 text-sm">Today Revenue</p>
              <p className="text-2xl font-bold text-white">{dashboardData.todayRevenue.toLocaleString()}฿</p>
            </div>
            <DollarSign className="text-yellow-400" size={32} />
          </div>
        </div>

        <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-slate-400 text-sm">Available Seats</p>
              <p className="text-2xl font-bold text-white">{dashboardData.availableSeats}/{dashboardData.totalSeats}</p>
            </div>
            <Monitor className="text-purple-400" size={32} />
          </div>
        </div>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
          <h3 className="text-lg font-semibold text-white mb-4">Revenue Trend</h3>
          <div className="h-64 flex items-end justify-center space-x-2">
            {[40, 65, 80, 45, 90, 75, 85].map((height, index) => (
              <div
                key={index}
                className="bg-blue-500 rounded-t w-8 transition-all duration-300"
                style={{ height: `${height}%` }}
              />
            ))}
          </div>
        </div>

        <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
          <h3 className="text-lg font-semibold text-white mb-4">Seat Usage</h3>
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-slate-300">Zone A</span>
              <div className="w-32 bg-slate-700 rounded-full h-2">
                <div className="bg-green-500 h-2 rounded-full" style={{ width: '70%' }}></div>
              </div>
              <span className="text-slate-400">70%</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-slate-300">Zone B</span>
              <div className="w-32 bg-slate-700 rounded-full h-2">
                <div className="bg-yellow-500 h-2 rounded-full" style={{ width: '45%' }}></div>
              </div>
              <span className="text-slate-400">45%</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-slate-300">Rooms</span>
              <div className="w-32 bg-slate-700 rounded-full h-2">
                <div className="bg-purple-500 h-2 rounded-full" style={{ width: '90%' }}></div>
              </div>
              <span className="text-slate-400">90%</span>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
        <h3 className="text-lg font-semibold text-white mb-4">Recent Activity</h3>
        <div className="space-y-3">
          {[
            { user: 'John Doe', action: 'booked seat A1', time: '2 minutes ago', icon: Calendar },
            { user: 'Jane Smith', action: 'ordered food', time: '5 minutes ago', icon: UtensilsCrossed },
            { user: 'Mike Johnson', action: 'completed session', time: '10 minutes ago', icon: CheckCircle }
          ].map((activity, index) => (
            <div key={index} className="flex items-center space-x-3 p-3 bg-slate-700/50 rounded-lg">
              <activity.icon className="text-blue-400" size={20} />
              <div className="flex-1">
                <p className="text-white">{activity.user} {activity.action}</p>
                <p className="text-slate-400 text-sm">{activity.time}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  // Bookings Management Component
  const BookingsView = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-bold text-white">Bookings Management</h2>
        <div className="flex gap-3">
          <button className="bg-green-600 hover:bg-green-700 px-4 py-2 rounded-lg flex items-center gap-2 transition-colors">
            <Plus size={16} />
            New Booking
          </button>
          <button className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg flex items-center gap-2 transition-colors">
            <Download size={16} />
            Export
          </button>
        </div>
      </div>

      {/* Search and Filter */}
      <div className="flex gap-4 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" size={20} />
          <input
            type="text"
            placeholder="Search bookings..."
            className="w-full pl-10 pr-4 py-2 bg-slate-800 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:border-blue-400 focus:outline-none"
          />
        </div>
        <select className="px-4 py-2 bg-slate-800 border border-slate-600 rounded-lg text-white focus:border-blue-400 focus:outline-none">
          <option value="">All Status</option>
          <option value="active">Active</option>
          <option value="completed">Completed</option>
          <option value="cancelled">Cancelled</option>
        </select>
      </div>

      {/* Bookings Table */}
      <div className="bg-slate-800 rounded-xl border border-slate-700 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-slate-700">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-300 uppercase tracking-wider">User</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-300 uppercase tracking-wider">Seat</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-300 uppercase tracking-wider">Date & Time</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-300 uppercase tracking-wider">Duration</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-300 uppercase tracking-wider">Price</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-300 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-300 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-700">
              {bookings.map((booking) => (
                <tr key={booking.id} className="hover:bg-slate-700/50">
                  <td className="px-6 py-4 whitespace-nowrap text-white">{booking.user}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-white">{booking.seat}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-slate-300">
                    {booking.date}<br/>
                    <span className="text-sm text-slate-400">{booking.startTime} - {booking.endTime}</span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-slate-300">{booking.duration}h</td>
                  <td className="px-6 py-4 whitespace-nowrap text-green-400">฿{booking.price}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                      booking.status === 'active' ? 'bg-green-500/20 text-green-400' :
                      booking.status === 'completed' ? 'bg-blue-500/20 text-blue-400' :
                      'bg-red-500/20 text-red-400'
                    }`}>
                      {booking.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex space-x-2">
                      <button className="text-blue-400 hover:text-blue-300">
                        <Eye size={16} />
                      </button>
                      <button className="text-yellow-400 hover:text-yellow-300">
                        <Edit size={16} />
                      </button>
                      <button className="text-red-400 hover:text-red-300">
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

  // Users Management Component
  const UsersView = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-bold text-white">Users Management</h2>
        <button className="bg-green-600 hover:bg-green-700 px-4 py-2 rounded-lg flex items-center gap-2 transition-colors">
          <Plus size={16} />
          Add User
        </button>
      </div>

      {/* Users Table */}
      <div className="bg-slate-800 rounded-xl border border-slate-700 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-slate-700">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-300 uppercase tracking-wider">Name</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-300 uppercase tracking-wider">Email</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-300 uppercase tracking-wider">Phone</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-300 uppercase tracking-wider">Total Bookings</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-300 uppercase tracking-wider">Total Spent</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-300 uppercase tracking-wider">Last Visit</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-300 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-700">
              {users.map((user) => (
                <tr key={user.id} className="hover:bg-slate-700/50">
                  <td className="px-6 py-4 whitespace-nowrap text-white">{user.name}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-slate-300">{user.email}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-slate-300">{user.phone}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-slate-300">{user.totalBookings}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-green-400">฿{user.totalSpent.toLocaleString()}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-slate-300">{user.lastVisit}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex space-x-2">
                      <button className="text-blue-400 hover:text-blue-300">
                        <Eye size={16} />
                      </button>
                      <button className="text-yellow-400 hover:text-yellow-300">
                        <Edit size={16} />
                      </button>
                      <button className="text-red-400 hover:text-red-300">
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

  // Seat Management Component
  const SeatManagementView = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-bold text-white">Seat Management</h2>
        <button className="bg-green-600 hover:bg-green-700 px-4 py-2 rounded-lg flex items-center gap-2 transition-colors">
          <Plus size={16} />
          Add Seat
        </button>
      </div>

      {/* Seat Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {seatManagement.map((seat) => (
          <div key={seat.id} className="bg-slate-800 rounded-xl p-6 border border-slate-700">
            <div className="flex justify-between items-start mb-4">
              <h3 className="text-xl font-bold text-white">{seat.id}</h3>
              <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                seat.status === 'available' ? 'bg-green-500/20 text-green-400' :
                seat.status === 'occupied' ? 'bg-red-500/20 text-red-400' :
                'bg-yellow-500/20 text-yellow-400'
              }`}>
                {seat.status}
              </span>
            </div>
            <div className="space-y-2 text-sm">
              <p className="text-slate-300">Zone: <span className="text-white">{seat.zone}</span></p>
              <p className="text-slate-300">Type: <span className="text-white">{seat.type}</span></p>
              <p className="text-slate-300">Condition: 
                <span className={`ml-1 ${
                  seat.condition === 'excellent' ? 'text-green-400' :
                  seat.condition === 'good' ? 'text-blue-400' :
                  'text-red-400'
                }`}>
                  {seat.condition}
                </span>
              </p>
            </div>
            <div className="flex space-x-2 mt-4">
              <button className="flex-1 bg-blue-600 hover:bg-blue-700 px-3 py-2 rounded text-sm transition-colors">
                Edit
              </button>
              <button className="px-3 py-2 bg-red-600 hover:bg-red-700 rounded text-sm transition-colors">
                <Trash2 size={14} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  // Food Orders Component
  const FoodOrdersView = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-bold text-white">Food Orders</h2>
        <div className="flex gap-3">
          <select className="px-4 py-2 bg-slate-800 border border-slate-600 rounded-lg text-white">
            <option value="">All Status</option>
            <option value="preparing">Preparing</option>
            <option value="ready">Ready</option>
            <option value="delivered">Delivered</option>
          </select>
        </div>
      </div>

      {/* Orders Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {foodOrders.map((order) => (
          <div key={order.id} className="bg-slate-800 rounded-xl p-6 border border-slate-700">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="text-lg font-bold text-white">Order #{order.orderNumber}</h3>
                <p className="text-slate-300">{order.customer}</p>
                <p className="text-sm text-slate-400">Seat: {order.seat}</p>
              </div>
              <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                order.status === 'preparing' ? 'bg-yellow-500/20 text-yellow-400' :
                order.status === 'ready' ? 'bg-blue-500/20 text-blue-400' :
                'bg-green-500/20 text-green-400'
              }`}>
                {order.status}
              </span>
            </div>
            <div className="space-y-2 mb-4">
              {order.items.map((item, index) => (
                <div key={index} className="flex justify-between text-sm">
                  <span className="text-slate-300">{item.name} x{item.quantity}</span>
                  <span className="text-white">฿{item.price * item.quantity}</span>
                </div>
              ))}
            </div>
            <div className="border-t border-slate-700 pt-3 flex justify-between items-center">
              <div>
                <p className="text-slate-400 text-sm">Total: <span className="text-green-400 font-bold">฿{order.total}</span></p>
                <p className="text-slate-400 text-xs">Time: {order.orderTime}</p>
              </div>
              <div className="flex space-x-2">
                <button className="bg-blue-600 hover:bg-blue-700 px-3 py-1 rounded text-sm transition-colors">
                  Update
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderContent = () => {
    switch(activeTab) {
      case 'dashboard':
        return <DashboardView />;
      case 'bookings':
        return <BookingsView />;
      case 'users':
        return <UsersView />;
      case 'seats':
        return <SeatManagementView />;
      case 'food':
        return <FoodOrdersView />;
      default:
        return <DashboardView />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      {/* Header */}
      <div className="bg-slate-800/95 backdrop-blur border-b border-slate-700 sticky top-0 z-40">
        <div className="px-6 py-4">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-600 bg-clip-text text-transparent">
              Easy Game Admin Panel
            </h1>
            <div className="flex items-center space-x-4">
              <span className="text-slate-300">Welcome, Admin</span>
              <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                <span className="text-white font-bold">A</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="flex">
        {/* Sidebar */}
        <div className="w-64 bg-slate-800/60 backdrop-blur border-r border-slate-700 min-h-screen">
          <nav className="p-6 space-y-2">
            {[
              { id: 'dashboard', label: 'Dashboard', icon: BarChart3 },
              { id: 'bookings', label: 'Bookings', icon: Calendar },
              { id: 'users', label: 'Users', icon: Users },
              { id: 'seats', label: 'Seat Management', icon: Monitor },
              { id: 'food', label: 'Food Orders', icon: UtensilsCrossed },
              { id: 'settings', label: 'Settings', icon: Settings }
            ].map((item) => (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`w-full text-left flex items-center p-3 rounded-lg transition-all duration-200 ${
                  activeTab === item.id
                    ? 'bg-blue-600 text-white'
                    : 'text-slate-300 hover:text-white hover:bg-slate-700'
                }`}
              >
                <item.icon size={20} className="mr-3" />
                {item.label}
              </button>
            ))}
          </nav>
        </div>

        {/* Main Content */}
        <div className="flex-1 p-8">
          {renderContent()}
        </div>
      </div>
    </div>
  );
};

export default AdminPanel;
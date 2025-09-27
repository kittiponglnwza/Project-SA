import React, { useState, useEffect } from 'react';
import axios from 'axios';
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
    XCircle,
    Home,
    CreditCard,
    Bell,
    LogOut,
    Crown
} from 'lucide-react';

// Extracted components
import DashboardViewComp from './components/DashboardView';
import BookingsViewComp from './components/BookingsView';
import UsersViewComp from './components/UsersView';
import SeatManagementViewComp from './components/SeatManagementView';
import FoodOrdersViewComp from './components/FoodOrdersView';

const AdminPanel = ({ onLogout }) => {
    const [activeTab, setActiveTab] = useState('dashboard');
    const [loading, setLoading] = useState(false);
    const [selectedUser, setSelectedUser] = useState(null);
    const [showUserDetail, setShowUserDetail] = useState(false);

    // State for backend data
    const [dashboardData, setDashboardData] = useState({
        totalUsers: 0,
        activeBookings: 0,
        todayRevenue: 0,
        availableSeats: 0,
        totalSeats: 0,
        monthlyRevenue: 0,
        foodOrders: 0,
        activities: []
    });

    const [zones, setZones] = useState({});
    const [seatStatus, setSeatStatus] = useState({});
    const [currentZone, setCurrentZone] = useState('A');
    const [zoneLoading, setZoneLoading] = useState(false);
    const [bookings, setBookings] = useState([]);
    const [users, setUsers] = useState([]);
    const [seatManagement, setSeatManagement] = useState([]);
    const [foodOrders, setFoodOrders] = useState([]);

    // API Base URL
    const API_BASE_URL = 'http://localhost:3000';

    // Auth headers for API calls
    const getAuthHeaders = () => ({
        headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
            'Content-Type': 'application/json'
        }
    });

    // Fetch dashboard summary data
    const fetchDashboardData = async () => {
        try {
            const [usersRes, seatsRes, bookingsRes, ordersRes] = await Promise.all([
                axios.get(`${API_BASE_URL}/users`, getAuthHeaders()),
                axios.get(`${API_BASE_URL}/seats`, getAuthHeaders()),
                axios.get(`${API_BASE_URL}/bookings`, getAuthHeaders()),
                axios.get(`${API_BASE_URL}/orders`, getAuthHeaders()).catch(() => ({ data: [] }))
            ]);

            const users = usersRes.data;
            const seats = seatsRes.data;
            const bookings = bookingsRes.data;
            const orders = ordersRes.data;

            // Calculate metrics
            const totalUsers = users.length;
            const totalSeats = seats.length;
            const availableSeats = seats.filter(s => s.status === 'AVAILABLE').length;
            const activeBookings = bookings.filter(b => b.status === 'active').length;

            // Calculate revenue
            const today = new Date();
            const startOfDay = new Date(today.setHours(0, 0, 0, 0));
            const startOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);

            const todayBookings = bookings.filter(b => new Date(b.date) >= startOfDay);
            const monthBookings = bookings.filter(b => new Date(b.date) >= startOfMonth);

            const todayRevenue = todayBookings.reduce((sum, b) => sum + (b.totalPrice || 0), 0);
            const monthlyRevenue = monthBookings.reduce((sum, b) => sum + (b.totalPrice || 0), 0);

            // Recent activities
            const activities = bookings
                .map(b => ({
                    user: b.user?.name || 'ไม่ทราบชื่อ',
                    action: `จองโต๊ะ ${b.seat?.zone}${b.seat?.id}`,
                    time: new Date(b.date).toLocaleString('th-TH'),
                    icon: Calendar
                }))
                .reverse()
                .slice(0, 3);

            setDashboardData({
                totalUsers,
                activeBookings,
                todayRevenue,
                availableSeats,
                totalSeats,
                monthlyRevenue,
                foodOrders: orders.length,
                activities
            });

        } catch (error) {
            console.error('Error fetching dashboard data:', error);
        }
    };

    // Fetch seats data and organize by zones
    const fetchSeatsData = async () => {
        try {
            const response = await axios.get(`${API_BASE_URL}/seats`, getAuthHeaders());
            const seats = response.data;

            // Group seats by zone
            const grouped = seats.reduce((acc, seat) => {
                if (!acc[seat.zone]) acc[seat.zone] = [];
                acc[seat.zone].push(seat);
                return acc;
            }, {});

            setZones(grouped);

            // Map seat status
            const statusMap = {};
            seats.forEach(seat => {
                statusMap[seat.id] = seat.status.toLowerCase();
            });
            setSeatStatus(statusMap);
            setSeatManagement(seats);

        } catch (error) {
            console.error('Error fetching seats data:', error);
        }
    };

    // Fetch bookings data
    const fetchBookingsData = async () => {
        try {
            const response = await axios.get(`${API_BASE_URL}/bookings`, getAuthHeaders());
            setBookings(response.data);
        } catch (error) {
            console.error('Error fetching bookings data:', error);
        }
    };

    // Fetch users data
    const fetchUsersData = async () => {
        try {
            const response = await axios.get(`${API_BASE_URL}/users`, getAuthHeaders());
            setUsers(response.data);
        } catch (error) {
            console.error('Error fetching users data:', error);
        }
    };

    // Fetch food orders data
    const fetchFoodOrdersData = async () => {
        try {
            const response = await axios.get(`${API_BASE_URL}/orders`, getAuthHeaders());
            setFoodOrders(response.data);
        } catch (error) {
            console.error('Error fetching food orders data:', error);
            // Use fallback data if API not available
            setFoodOrders([]);
        }
    };

    // Initial data load
    useEffect(() => {
        const loadAllData = async () => {
            setLoading(true);
            try {
                await Promise.all([
                    fetchDashboardData(),
                    fetchSeatsData(),
                    fetchBookingsData(),
                    fetchUsersData(),
                    fetchFoodOrdersData()
                ]);
            } catch (error) {
                console.error('Error loading initial data:', error);
            } finally {
                setLoading(false);
            }
        };

        loadAllData();
    }, []);

    // Zone stats calculation
    const getZoneStats = (zone) => {
        const zoneSeats = zones[zone] || [];
        const available = zoneSeats.filter(seat => seat.status === 'AVAILABLE').length;
        return { total: zoneSeats.length, available };
    };

    // Handlers
    const handleZoneChange = async (zone) => {
        setZoneLoading(true);
        setTimeout(() => {
            setCurrentZone(zone);
            setZoneLoading(false);
        }, 300);
    };

    const handleRefresh = async () => {
        setLoading(true);
        try {
            await Promise.all([
                fetchDashboardData(),
                fetchSeatsData(),
                fetchBookingsData(),
                fetchUsersData(),
                fetchFoodOrdersData()
            ]);
        } catch (error) {
            console.error('Error refreshing data:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleSelectUser = (user) => {
        setSelectedUser(user);
        setShowUserDetail(true);
    };

    const handleBackFromUser = () => {
        setShowUserDetail(false);
        setSelectedUser(null);
    };

    // Update seat status
    const updateSeatStatus = async (seatId, newStatus) => {
        try {
            await axios.patch(`${API_BASE_URL}/seats/${seatId}`, 
                { status: newStatus }, 
                getAuthHeaders()
            );
            await fetchSeatsData();
            await fetchDashboardData();
        } catch (error) {
            console.error('Error updating seat status:', error);
        }
    };

    // Update food order status
    const updateFoodOrderStatus = async (orderId, newStatus) => {
        try {
            await axios.patch(`${API_BASE_URL}/orders/${orderId}`, 
                { status: newStatus }, 
                getAuthHeaders()
            );
            await fetchFoodOrdersData();
        } catch (error) {
            console.error('Error updating order status:', error);
        }
    };

    // Render content based on active tab
    const renderContent = () => {
        if (loading && activeTab === 'dashboard') {
            return (
                <div className="flex items-center justify-center h-64">
                    <div className="flex items-center space-x-3 text-blue-400">
                        <div className="w-8 h-8 border-4 border-blue-400 border-t-transparent rounded-full animate-spin"></div>
                        <span className="text-lg">กำลังโหลดข้อมูล...</span>
                    </div>
                </div>
            );
        }

        switch (activeTab) {
            case 'dashboard':
                return (
                    <DashboardViewComp
                        dashboardData={dashboardData}
                        onRefresh={handleRefresh}
                    />
                );
            case 'bookings':
                return (
                    <BookingsViewComp
                        zones={zones}
                        seatStatus={seatStatus}
                        currentZone={currentZone}
                        zoneLoading={zoneLoading}
                        onZoneChange={handleZoneChange}
                        getZoneStats={getZoneStats}
                        bookings={bookings}
                        onUpdateSeatStatus={updateSeatStatus}
                        onRefresh={fetchBookingsData}
                    />
                );
            case 'users':
                return (
                    <UsersViewComp
                        users={users}
                        selectedUser={selectedUser}
                        showUserDetail={showUserDetail}
                        onSelectUser={handleSelectUser}
                        onBack={handleBackFromUser}
                        onRefresh={fetchUsersData}
                    />
                );
            case 'seats':
                return (
                    <SeatManagementViewComp 
                        seatManagement={seatManagement}
                        onRefresh={fetchSeatsData}
                        onUpdateSeat={updateSeatStatus}
                    />
                );
            case 'food':
                return (
                    <FoodOrdersViewComp 
                        foodOrders={foodOrders}
                        onUpdateOrderStatus={updateFoodOrderStatus}
                        onRefresh={fetchFoodOrdersData}
                    />
                );
            default:
                return (
                    <DashboardViewComp
                        dashboardData={dashboardData}
                        onRefresh={handleRefresh}
                    />
                );
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
            {/* Header */}
            <div className="bg-slate-800/95 backdrop-blur border-b border-slate-700 sticky top-0 z-40">
                <div className="px-6 py-4">
                    <div className="flex justify-between items-center">
                        <div className="flex items-center gap-4">
                            <div className="bg-gradient-to-r from-blue-500 to-purple-600 p-2 rounded-xl">
                                <Monitor className="text-white" size={28} />
                            </div>
                            <div>
                                <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-600 bg-clip-text text-transparent">
                                    Easy Game
                                </h1>
                                <p className="text-slate-400 text-sm">ระบบจัดการร้านเกม</p>
                            </div>
                        </div>
                        <div className="flex items-center space-x-4">
                            <div className="bg-slate-700 p-2 rounded-lg">
                                <Bell className="text-slate-300" size={20} />
                            </div>
                            <div className="flex items-center gap-3">
                                <div className="text-right">
                                    <p className="text-white font-medium">ผู้ดูแลระบบ</p>
                                    <p className="text-slate-400 text-sm">Admin</p>
                                </div>
                                <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                                    <span className="text-white font-bold">A</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="flex">
                {/* Sidebar */}
                <div className="w-72 bg-slate-800/80 backdrop-blur border-r border-slate-700 min-h-screen">
                    <nav className="p-6 space-y-2">
                        {[
                            { id: 'dashboard', label: 'หน้าหลัก', icon: Home },
                            { id: 'bookings', label: 'จัดการอาหาร', icon: Calendar },
                            { id: 'users', label: 'สมาชิก', icon: Users },
                            { id: 'seats', label: 'จัดการที่นั่ง', icon: Monitor },
                            { id: 'food', label: 'ประวัติสั่งซื้อ', icon: UtensilsCrossed }
                        ].map((item) => (
                            <button
                                key={item.id}
                                onClick={() => setActiveTab(item.id)}
                                className={`w-full text-left flex items-center p-4 rounded-xl transition-all duration-200 ${
                                    activeTab === item.id
                                        ? 'bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-lg'
                                        : 'text-slate-300 hover:text-white hover:bg-slate-700/60'
                                }`}
                            >
                                <item.icon size={22} className="mr-4" />
                                <span className="font-medium">{item.label}</span>
                            </button>
                        ))}

                        <div className="pt-4 mt-4 border-t border-slate-700">
                            <button
                                onClick={() => {
                                    if (typeof onLogout === 'function') {
                                        onLogout();
                                    } else {
                                        localStorage.removeItem('auth');
                                        localStorage.removeItem('isAdmin');
                                        localStorage.removeItem('token');
                                        window.location.reload();
                                    }
                                }}
                                className="w-full text-left flex items-center p-4 rounded-xl text-red-400 hover:text-red-300 hover:bg-red-500/10 transition-all duration-200"
                            >
                                <LogOut size={22} className="mr-4" />
                                <span className="font-medium">ออกจากระบบ</span>
                            </button>
                        </div>
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
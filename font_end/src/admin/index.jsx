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

    // ข้อมูลจำลอง - ในการใช้งานจริงจะดึงจากฐานข้อมูล
    const [dashboardData, setDashboardData] = useState({
        totalUsers: 245,
        activeBookings: 18,
        todayRevenue: 12500,
        availableSeats: 28,
        totalSeats: 41,
        monthlyRevenue: 385000,
        foodOrders: 32
    });

    // ข้อมูลโซนและที่นั่ง
    const [zones] = useState({
        A: ['A1', 'A2', 'A3', 'A4', 'A5', 'A6'],
        B: [
            'B1', 'B2', 'B3', 'B4', 'B5', 'B6', 'B7', 'B8', 'B9', 'B10',
            'B11', 'B12', 'B13', 'B14', 'B15', 'B16', 'B17', 'B18'
        ],
        C: ['C1', 'C2', 'C3', 'C4', 'C5', 'C6'],
        D: ['D1', 'D2', 'D3', 'D4', 'D5', 'D6', 'D7', 'D8'],
        Room: ['Room1', 'Room2', 'Room3']
    });

    // สถานะที่นั่ง (แก้ให้ตรงกับ zones)
    const [seatStatus, setSeatStatus] = useState({
        // Zone A
        A1: 'occupied', A2: 'available', A3: 'available',
        A4: 'occupied', A5: 'available', A6: 'available',

        // Zone B  
        B1: 'available', B2: 'occupied', B3: 'available', B4: 'available',
        B5: 'occupied', B6: 'available', B7: 'occupied', B8: 'available',
        B9: 'available', B10: 'occupied', B11: 'available', B12: 'occupied',
        B13: 'available', B14: 'occupied', B15: 'available',
        B16: 'available', B17: 'occupied', B18: 'available',

        // Zone C
        C1: 'available', C2: 'available', C3: 'occupied',
        C4: 'available', C5: 'occupied', C6: 'available',

        // Zone D
        D1: 'available', D2: 'occupied', D3: 'available', D4: 'available',
        D5: 'occupied', D6: 'available', D7: 'available', D8: 'occupied',

        // Room Zone
        Room1: 'occupied', Room2: 'available', Room3: 'available',
    });

    const [currentZone, setCurrentZone] = useState('A');
    const [zoneLoading, setZoneLoading] = useState(false);

    // คำนวณสถิติของแต่ละโซน
    const getZoneStats = (zone) => {
        const seats = zones[zone] || [];
        const available = seats.filter(seat => seatStatus[seat] === 'available').length;
        return { total: seats.length, available };
    };

    const [bookings, setBookings] = useState([
        {
            id: 1,
            user: 'นิรันดร์ ใจดี',
            seat: 'A1',
            date: '2024-12-15',
            startTime: '14:00',
            endTime: '17:00',
            duration: 3,
            price: 150,
            status: 'active',
            paymentMethod: 'เงินสด'
        },
        {
            id: 2,
            user: 'สุภาพร สมมติ',
            seat: 'Room1',
            date: '2024-12-15',
            startTime: '19:00',
            endTime: '24:00',
            duration: 5,
            price: 450,
            status: 'active',
            paymentMethod: 'QR Code'
        },
        {
            id: 3,
            user: 'อานนท์ เล่นเกม',
            seat: 'B5',
            date: '2024-12-15',
            startTime: '10:00',
            endTime: '13:00',
            duration: 3,
            price: 150,
            status: 'completed',
            paymentMethod: 'เงินสด'
        },
        {
            id: 4,
            user: 'สมชาย เกมเมอร์',
            seat: 'VIP2',
            date: '2024-12-15',
            startTime: '16:00',
            endTime: '20:00',
            duration: 4,
            price: 320,
            status: 'active',
            paymentMethod: 'QR Code'
        },
        {
            id: 5,
            user: 'รัตนา ชอบเล่น',
            seat: 'C3',
            date: '2024-12-14',
            startTime: '12:00',
            endTime: '15:00',
            duration: 3,
            price: 150,
            status: 'completed',
            paymentMethod: 'เงินสด'
        },
        {
            id: 6,
            user: 'ปิยะ โปรเกมเมอร์',
            seat: 'Room2',
            date: '2024-12-14',
            startTime: '20:00',
            endTime: '02:00',
            duration: 6,
            price: 540,
            status: 'completed',
            paymentMethod: 'QR Code'
        }
    ]);

    const [users, setUsers] = useState([
        {
            id: 1,
            name: 'นิรันดร์ ใจดี',
            email: 'nirand@example.com',
            phone: '081-234-5678',
            totalBookings: 15,
            totalSpent: 2500,
            lastVisit: '2024-12-15',
            status: 'active',
            joinDate: '2024-01-15',
            bookingHistory: [
                { id: 1, seat: 'A1', date: '2024-12-15', duration: 3, price: 150, status: 'completed' },
                { id: 2, seat: 'VIP2', date: '2024-12-10', duration: 5, price: 400, status: 'completed' },
                { id: 3, seat: 'B3', date: '2024-12-05', duration: 2, price: 100, status: 'completed' }
            ],
            foodHistory: [
                { id: 1, items: 'มันฝรั่งทอด, โค้ก', total: 65, date: '2024-12-15' },
                { id: 2, items: 'ข้าวผัดไข่', total: 45, date: '2024-12-10' }
            ]
        },
        {
            id: 2,
            name: 'สุภาพร สมมติ',
            email: 'suphapon@example.com',
            phone: '089-876-5432',
            totalBookings: 8,
            totalSpent: 1200,
            lastVisit: '2024-12-14',
            status: 'active',
            joinDate: '2024-03-20',
            bookingHistory: [
                { id: 4, seat: 'Room1', date: '2024-12-14', duration: 4, price: 360, status: 'completed' },
                { id: 5, seat: 'VIP5', date: '2024-12-08', duration: 3, price: 240, status: 'completed' }
            ],
            foodHistory: [
                { id: 3, items: 'ส้มตำ, น้ำแข็ง', total: 80, date: '2024-12-14' }
            ]
        }
    ]);

    const [seatManagement, setSeatManagement] = useState([
        // Zone A
        { id: 'A1', zone: 'A', type: 'ที่นั่งธรรมดา', status: 'ไม่ว่าง', condition: 'ดี' },
        { id: 'A2', zone: 'A', type: 'ที่นั่งธรรมดา', status: 'ว่าง', condition: 'ดี' },
        { id: 'A3', zone: 'A', type: 'ที่นั่งธรรมดา', status: 'ว่าง', condition: 'ดีเยี่ยม' },
        { id: 'A4', zone: 'A', type: 'ที่นั่งธรรมดา', status: 'ไม่ว่าง', condition: 'ดี' },
        { id: 'A5', zone: 'A', type: 'ที่นั่งธรรมดา', status: 'ว่าง', condition: 'ดี' },
        { id: 'A6', zone: 'A', type: 'ที่นั่งธรรมดา', status: 'ว่าง', condition: 'ดีเยี่ยม' },
        { id: 'A7', zone: 'A', type: 'ที่นั่งธรรมดา', status: 'ไม่ว่าง', condition: 'ดี' },
        { id: 'A8', zone: 'A', type: 'ที่นั่งธรรมดา', status: 'ว่าง', condition: 'ดี' },
        { id: 'A9', zone: 'A', type: 'ที่นั่งธรรมดา', status: 'ว่าง', condition: 'ดีเยี่ยม' },
        { id: 'A10', zone: 'A', type: 'ที่นั่งธรรมดา', status: 'ไม่ว่าง', condition: 'ต้องซ่อม' },
        { id: 'A11', zone: 'A', type: 'ที่นั่งธรรมดา', status: 'ว่าง', condition: 'ดี' },
        { id: 'A12', zone: 'A', type: 'ที่นั่งธรรมดา', status: 'ไม่ว่าง', condition: 'ดี' },

        // Zone B
        { id: 'B1', zone: 'B', type: 'ที่นั่งธรรมดา', status: 'ว่าง', condition: 'ดี' },
        { id: 'B2', zone: 'B', type: 'ที่นั่งธรรมดา', status: 'ไม่ว่าง', condition: 'ดี' },
        { id: 'B3', zone: 'B', type: 'ที่นั่งธรรมดา', status: 'ว่าง', condition: 'ดีเยี่ยม' },
        { id: 'B4', zone: 'B', type: 'ที่นั่งธรรมดา', status: 'ว่าง', condition: 'ดี' },
        { id: 'B5', zone: 'B', type: 'ที่นั่งธรรมดา', status: 'ไม่ว่าง', condition: 'ดี' },
        { id: 'B6', zone: 'B', type: 'ที่นั่งธรรมดา', status: 'ว่าง', condition: 'ต้องซ่อม' },
        { id: 'B7', zone: 'B', type: 'ที่นั่งธรรมดา', status: 'ไม่ว่าง', condition: 'ดี' },
        { id: 'B8', zone: 'B', type: 'ที่นั่งธรรมดา', status: 'ว่าง', condition: 'ดี' },
        { id: 'B9', zone: 'B', type: 'ที่นั่งธรรมดา', status: 'ว่าง', condition: 'ดีเยี่ยม' },
        { id: 'B10', zone: 'B', type: 'ที่นั่งธรรมดา', status: 'ไม่ว่าง', condition: 'ดี' },

        // Zone C
        { id: 'C1', zone: 'C', type: 'ที่นั่งธรรมดา', status: 'ว่าง', condition: 'ดี' },
        { id: 'C2', zone: 'C', type: 'ที่นั่งธรรมดา', status: 'ว่าง', condition: 'ดีเยี่ยม' },
        { id: 'C3', zone: 'C', type: 'ที่นั่งธรรมดา', status: 'ไม่ว่าง', condition: 'ดี' },
        { id: 'C4', zone: 'C', type: 'ที่นั่งธรรมดา', status: 'ว่าง', condition: 'ดี' },
        { id: 'C5', zone: 'C', type: 'ที่นั่งธรรมดา', status: 'ไม่ว่าง', condition: 'ดี' },
        { id: 'C6', zone: 'C', type: 'ที่นั่งธรรมดา', status: 'ว่าง', condition: 'ดีเยี่ยม' },
        { id: 'C7', zone: 'C', type: 'ที่นั่งธรรมดา', status: 'ว่าง', condition: 'ดี' },
        { id: 'C8', zone: 'C', type: 'ที่นั่งธรรมดา', status: 'ซ่อมบำรุง', condition: 'ต้องซ่อม' },

        // Zone VIP
        { id: 'VIP1', zone: 'VIP', type: 'ที่นั่ง VIP', status: 'ไม่ว่าง', condition: 'ดีเยี่ยม' },
        { id: 'VIP2', zone: 'VIP', type: 'ที่นั่ง VIP', status: 'ว่าง', condition: 'ดีเยี่ยม' },
        { id: 'VIP3', zone: 'VIP', type: 'ที่นั่ง VIP', status: 'ว่าง', condition: 'ดี' },
        { id: 'VIP4', zone: 'VIP', type: 'ที่นั่ง VIP', status: 'ไม่ว่าง', condition: 'ดีเยี่ยม' },
        { id: 'VIP5', zone: 'VIP', type: 'ที่นั่ง VIP', status: 'ว่าง', condition: 'ดี' },
        { id: 'VIP6', zone: 'VIP', type: 'ที่นั่ง VIP', status: 'ซ่อมบำรุง', condition: 'ต้องซ่อม' },

        // Zone Room
        { id: 'Room1', zone: 'Room', type: 'ห้องส่วนตัว', status: 'ไม่ว่าง', condition: 'ดีเยี่ยม' },
        { id: 'Room2', zone: 'Room', type: 'ห้องส่วนตัว', status: 'ว่าง', condition: 'ดี' },
        { id: 'Room3', zone: 'Room', type: 'ห้องส่วนตัว', status: 'ว่าง', condition: 'ดีเยี่ยม' },
        { id: 'Room4', zone: 'Room', type: 'ห้องส่วนตัว', status: 'ซ่อมบำรุง', condition: 'ต้องซ่อม' },
        { id: 'Room5', zone: 'Room', type: 'ห้องส่วนตัว', status: 'ว่าง', condition: 'ดี' }
    ]);

    const [foodOrders, setFoodOrders] = useState([
        {
            id: 1,
            orderNumber: 'F001',
            customer: 'นิรันดร์ ใจดี',
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
            customer: 'สุภาพร สมมติ',
            seat: 'ห้องพิเศษ 1',
            items: [
                { name: 'ข้าวผัดไข่', quantity: 1, price: 45 }
            ],
            total: 45,
            status: 'delivered',
            orderTime: '14:15'
        }
    ]);

    // Handlers for extracted views
    const handleZoneChange = (zone) => {
        setZoneLoading(true);
        setTimeout(() => {
            setCurrentZone(zone);
            setZoneLoading(false);
        }, 300);
    };

    const handleRefresh = () => setLoading(true);
    const handleSelectUser = (user) => {
        setSelectedUser(user);
        setShowUserDetail(true);
    };
    const handleBackFromUser = () => setShowUserDetail(false);

    // หน้า Dashboard
    const DashboardView = () => (
        <div className="space-y-8">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-4xl font-bold text-white mb-2">ยินดีต้อนรับสู่ Easy Game</h1>
                    <p className="text-slate-300">เพลิดเพลินกับการเล่นเกมในบรรยากาศที่ดีที่สุด</p>
                </div>


                <button
                    onClick={() => setLoading(true)}
                    className="bg-blue-600 hover:bg-blue-700 px-6 py-3 rounded-xl flex items-center gap-3 transition-all duration-200 shadow-lg hover:shadow-xl"
                >
                    <RefreshCw size={20} />
                    รีเฟรช
                </button>
            </div>

            {/* สถิติการใช้งาน */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="bg-gradient-to-br from-slate-800 to-slate-700 rounded-2xl p-6 border border-slate-600 shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-slate-400 text-sm font-medium">ผู้ใช้งาน</p>
                            <p className="text-3xl font-bold text-white">{dashboardData.totalUsers}</p>
                            <p className="text-blue-400 text-sm">คน</p>
                        </div>
                        <div className="bg-blue-500/20 p-3 rounded-full">
                            <Users className="text-blue-400" size={32} />
                        </div>
                    </div>
                </div>

                <div className="bg-gradient-to-br from-slate-800 to-slate-700 rounded-2xl p-6 border border-slate-600 shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-slate-400 text-sm font-medium">เกมยอดนิยม</p>
                            <p className="text-3xl font-bold text-white">50+</p>
                            <p className="text-green-400 text-sm">เกม</p>
                        </div>
                        <div className="bg-green-500/20 p-3 rounded-full">
                            <Monitor className="text-green-400" size={32} />
                        </div>
                    </div>
                </div>

                <div className="bg-gradient-to-br from-slate-800 to-slate-700 rounded-2xl p-6 border border-slate-600 shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-slate-400 text-sm font-medium">เปิดบริการ</p>
                            <p className="text-3xl font-bold text-white">24/7</p>
                            <p className="text-purple-400 text-sm">ชั่วโมง</p>
                        </div>
                        <div className="bg-purple-500/20 p-3 rounded-full">
                            <Clock className="text-purple-400" size={32} />
                        </div>
                    </div>
                </div>

                <div className="bg-gradient-to-br from-slate-800 to-slate-700 rounded-2xl p-6 border border-slate-600 shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-slate-400 text-sm font-medium">ราคาเริ่มต้น</p>
                            <p className="text-3xl font-bold text-white">144Hz</p>
                            <p className="text-yellow-400 text-sm">จอภาพ</p>
                        </div>
                        <div className="bg-yellow-500/20 p-3 rounded-full">
                            <Monitor className="text-yellow-400" size={32} />
                        </div>
                    </div>
                </div>
            </div>

            {/* ข่าวสาร / โปรโมชั่น */}
            <div className="bg-gradient-to-br from-slate-800 to-slate-700 rounded-2xl p-8 border border-slate-600 shadow-xl">
                <div className="flex items-center gap-3 mb-6">
                    <div className="bg-red-500/20 p-2 rounded-lg">
                        <Bell className="text-red-400" size={24} />
                    </div>
                    <h3 className="text-2xl font-bold text-white">📢 ข่าวสาร / โปรโมชั่น</h3>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    <div className="relative">
                        <div className="w-full h-64 rounded-xl overflow-hidden">
                            <img
                                src="/img/promo.jpg"   // 👈 เก็บรูปไว้ใน public/images/
                                alt="Gaming Setup"
                                className="w-full h-full object-cover"
                            />
                        </div>
                        <div className="absolute bottom-4 left-4 bg-black/60 px-4 py-2 rounded-lg">
                            <h4 className="font-bold text-lg text-white">เซ็ตอัพเกมมิ่งใหม่!</h4>
                            <p className="text-slate-200 text-sm">อัพเกรดเครื่องใหม่ล่าสุด</p>
                        </div>
                    </div>

                    <div className="space-y-4">
                        <div className="bg-blue-500/10 border-l-4 border-blue-400 p-4 rounded-lg">
                            <h4 className="text-blue-400 font-bold">💰 ราคาเล่นต่อชั่วโมง</h4>
                            <div className="space-y-2 mt-3">
                                <div className="flex items-center justify-between">
                                    <span className="text-slate-300">🕐 1 ชั่วโมง</span>
                                    <span className="text-white font-bold">50 บาท</span>
                                </div>
                                <div className="flex items-center justify-between">
                                    <span className="text-slate-300">🕒 3 ชั่วโมง</span>
                                    <span className="text-white font-bold">100 บาท <span className="text-green-400 text-sm">(ประหยัด 50฿)</span></span>
                                </div>
                                <div className="flex items-center justify-between">
                                    <span className="text-slate-300">🕔 5 ชั่วโมง</span>
                                    <span className="text-white font-bold">230 บาท <span className="text-green-400 text-sm">(ประหยัด 20฿)</span></span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* เกมยอดนิยม */}
            <div className="bg-gradient-to-br from-slate-800 to-slate-700 rounded-2xl p-8 border border-slate-600 shadow-xl">
                <div className="flex items-center gap-3 mb-6">
                    <div className="bg-pink-500/20 p-2 rounded-lg">
                        <TrendingUp className="text-pink-400" size={24} />
                    </div>
                    <h3 className="text-2xl font-bold text-white">🎮 เกมยอดนิยม</h3>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                    {[
                        { name: 'Roblox', img: '/img/roblox1.jpg' },
                        { name: 'Valorant', img: '/img/valo.jpg' },
                        { name: 'League of Legends', img: '/img/lol.jpg' },
                        { name: 'Counter-Strike', img: '/img/csgo.jpg' }
                    ].map((game, index) => (
                        <div key={index} className="group cursor-pointer transform hover:scale-105 transition-all duration-300">
                            <div className="bg-slate-700 rounded-xl p-4 hover:bg-slate-600 transition-colors">

                                {/* ใช้รูปแทน icon */}
                                <div className="w-full h-24 rounded-lg mb-3 overflow-hidden">
                                    <img
                                        src={game.img}
                                        alt={game.name}
                                        className="w-full h-full object-cover"
                                    />
                                </div>

                                <h4 className="text-white font-semibold text-center">{game.name}</h4>
                            </div>
                        </div>
                    ))}
                </div>

            </div>

            {/* กิจกรรมล่าสุด */}
            <div className="bg-gradient-to-br from-slate-800 to-slate-700 rounded-2xl p-8 border border-slate-600 shadow-xl">
                <h3 className="text-xl font-bold text-white mb-6">กิจกรรมล่าสุด</h3>
                <div className="space-y-4">
                    {[
                        { user: 'นิรันดร์ ใจดี', action: 'จองที่นั่ง A1', time: '2 นาทีที่แล้ว', icon: Calendar },
                        { user: 'สุภาพร สมมติ', action: 'สั่งอาหาร', time: '5 นาทีที่แล้ว', icon: UtensilsCrossed },
                        { user: 'อานนท์ เล่นเกม', action: 'เล่นเกมเสร็จสิ้น', time: '10 นาทีที่แล้ว', icon: CheckCircle }
                    ].map((activity, index) => (
                        <div key={index} className="flex items-center space-x-4 p-4 bg-slate-700/50 rounded-xl hover:bg-slate-700 transition-colors">
                            <div className="bg-blue-500/20 p-2 rounded-full">
                                <activity.icon className="text-blue-400" size={20} />
                            </div>
                            <div className="flex-1">
                                <p className="text-white font-medium">{activity.user} {activity.action}</p>
                                <p className="text-slate-400 text-sm">{activity.time}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );

    // การจัดการการจอง
    const BookingsView = () => {
        const handleZoneChange = (zone) => {
            setZoneLoading(true);
            setTimeout(() => {
                setCurrentZone(zone);
                setZoneLoading(false);
            }, 300);
        };

        const handleSeatClick = (seat) => {
            alert(`คลิกที่นั่ง: ${seat}\nสถานะ: ${seatStatus[seat]}`);
        };

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
                    {zoneLoading && (
                        <div className="absolute inset-0 bg-slate-900/80 backdrop-blur-sm rounded-3xl flex items-center justify-center z-10">
                            <div className="flex items-center space-x-3 text-blue-400">
                                <div className="w-8 h-8 border-4 border-blue-400 border-t-transparent rounded-full animate-spin"></div>
                                <span className="text-lg">กำลังโหลด...</span>
                            </div>
                        </div>
                    )}

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                        {zones[currentZone]?.map((seat) => (
                            <SeatCard
                                key={seat}
                                seat={seat}
                                status={seatStatus[seat]}
                                handleSeatClick={handleSeatClick}
                            />
                        ))}
                    </div>
                </div>

                {/* ตารางข้อมูลการจอง */}
                <div className="bg-slate-800 rounded-xl border border-slate-700 overflow-hidden mt-12">
                    <div className="p-6 border-b border-slate-700">
                        <h3 className="text-lg font-semibold text-white">รายการการจองทั้งหมด</h3>
                    </div>
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead className="bg-slate-700">
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-slate-300 uppercase tracking-wider">ผู้ใช้งาน</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-slate-300 uppercase tracking-wider">ที่นั่ง</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-slate-300 uppercase tracking-wider">วันที่และเวลา</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-slate-300 uppercase tracking-wider">ระยะเวลา</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-slate-300 uppercase tracking-wider">ราคา</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-slate-300 uppercase tracking-wider">สถานะ</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-slate-300 uppercase tracking-wider">จัดการ</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-700">
                                {bookings.map((booking) => (
                                    <tr key={booking.id} className="hover:bg-slate-700/50">
                                        <td className="px-6 py-4 whitespace-nowrap text-white">{booking.user}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-white">{booking.seat}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-slate-300">
                                            {booking.date}<br />
                                            <span className="text-sm text-slate-400">{booking.startTime} - {booking.endTime}</span>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-slate-300">{booking.duration} ชม.</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-green-400">฿{booking.price}</td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <span className={`px-2 py-1 rounded-full text-xs font-semibold ${booking.status === 'active' ? 'bg-green-500/20 text-green-400' :
                                                booking.status === 'completed' ? 'bg-blue-500/20 text-blue-400' :
                                                    'bg-red-500/20 text-red-400'
                                                }`}>
                                                {booking.status === 'active' ? 'กำลังใช้งาน' :
                                                    booking.status === 'completed' ? 'เสร็จสิ้น' : 'ยกเลิก'}
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
    };

// SeatCard Component
const SeatCard = ({ seat, status, handleSeatClick }) => {
    const isVIP = seat.includes("VIP");
    const isRoom = seat.includes("Room");
    const isAvailable = status === 'available';
    const isMaintenance = status === 'maintenance';

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
                ${isMaintenance ? 'border-orange-400 bg-gradient-to-br from-orange-900/20 to-red-900/20' : ''}
                backdrop-blur-sm
            `}
        >
            {/* VIP Crown Icon */}
            {isVIP && (
                <div className="absolute top-3 right-3 bg-yellow-400/20 p-1 rounded-full z-20">
                    <Users className="w-5 h-5 text-yellow-400 drop-shadow-lg" />
                </div>
            )}

            {/* Room Icon */}
            {isRoom && (
                <div className="absolute top-3 right-3 bg-purple-400/20 p-1 rounded-full z-20">
                    <Users className="w-5 h-5 text-purple-400 drop-shadow-lg" />
                </div>
            )}

            {/* Seat Image */}
            <div className="relative h-48 bg-slate-900">
                <img
                    src={
                        isRoom
                            ? "/img/room.jpg"      // รูปห้องส่วนตัว
                            : isVIP
                            ? "/images/vip.jpg"       // รูป VIP
                            : "/img/table1.jpg"  // รูปที่นั่งธรรมดา
                    }
                    alt={seat}
                    className="w-full h-full object-cover"
                />

                {/* Label ด้านล่างรูป */}
                <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 text-slate-200 text-sm bg-black/60 px-2 py-1 rounded">
                    {isRoom ? 'Gaming Room' : isVIP ? 'VIP Gaming' : 'Gaming Setup'}
                </div>
            </div>

            {/* Seat Info */}
            <div className="p-5 relative z-20">
                <div className="flex justify-between items-center">
                    <h3
                        className={`text-xl font-bold bg-gradient-to-r bg-clip-text text-transparent ${
                            isVIP
                                ? 'from-yellow-400 to-yellow-600'
                                : isRoom
                                ? 'from-purple-400 to-purple-600'
                                : 'from-blue-400 to-blue-600'
                        }`}
                    >
                        {seat}
                    </h3>
                    <span
                        className={`
                            px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wide
                            ${
                                isAvailable
                                    ? 'bg-green-500 text-white shadow-green-500/30 animate-pulse'
                                    : isMaintenance
                                    ? 'bg-orange-500 text-white shadow-orange-500/30'
                                    : 'bg-red-500 text-white shadow-red-500/30'
                            }
                            shadow-lg
                        `}
                    >
                        {isAvailable ? 'ว่าง' : isMaintenance ? 'ซ่อมแซม' : 'ไม่ว่าง'}
                    </span>
                </div>
            </div>

            {/* Hover overlay */}
            <div
                className={`absolute inset-0 opacity-0 hover:opacity-100 transition-opacity duration-300 ${
                    isVIP
                        ? 'bg-gradient-to-br from-yellow-500/10 to-orange-500/10'
                        : isRoom
                        ? 'bg-gradient-to-br from-purple-500/10 to-indigo-500/10'
                        : 'bg-gradient-to-br from-blue-500/10 to-purple-500/10'
                }`}
            ></div>
        </div>
    );
};


    // การจัดการผู้ใช้งาน
    const UsersView = () => (
        <div className="space-y-6">
            {!showUserDetail ? (
                <>
                    <div className="flex justify-between items-center">
                        <h2 className="text-3xl font-bold text-white">จัดการผู้ใช้งาน</h2>
                        <button className="bg-green-600 hover:bg-green-700 px-4 py-2 rounded-lg flex items-center gap-2 transition-colors">
                            <Plus size={16} />
                            เพิ่มผู้ใช้งาน
                        </button>
                    </div>

                    {/* ตารางผู้ใช้งาน */}
                    <div className="bg-slate-800 rounded-xl border border-slate-700 overflow-hidden">
                        <div className="overflow-x-auto">
                            <table className="w-full">
                                <thead className="bg-slate-700">
                                    <tr>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-slate-300 uppercase tracking-wider">ชื่อ</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-slate-300 uppercase tracking-wider">อีเมล</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-slate-300 uppercase tracking-wider">โทรศัพท์</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-slate-300 uppercase tracking-wider">จำนวนการจอง</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-slate-300 uppercase tracking-wider">ยอดใช้จ่าย</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-slate-300 uppercase tracking-wider">เข้าใช้ครั้งล่าสุด</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-slate-300 uppercase tracking-wider">จัดการ</th>
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
                                                    <button
                                                        onClick={() => {
                                                            setSelectedUser(user);
                                                            setShowUserDetail(true);
                                                        }}
                                                        className="text-blue-400 hover:text-blue-300 bg-blue-500/10 px-2 py-1 rounded text-sm"
                                                    >
                                                        ดูรายละเอียด
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
                </>
            ) : (
                <UserDetailView />
            )}
        </div>
    );

    // หน้ารายละเอียดสมาชิก
    const UserDetailView = () => (
        <div className="space-y-6">
            <div className="flex items-center gap-4 mb-6">
                <button
                    onClick={() => setShowUserDetail(false)}
                    className="bg-slate-700 hover:bg-slate-600 px-4 py-2 rounded-lg flex items-center gap-2 transition-colors"
                >
                    ← กลับ
                </button>
                <h2 className="text-3xl font-bold text-white">ข้อมูลสมาชิก: {selectedUser?.name}</h2>
            </div>

            {/* ข้อมูลส่วนตัว */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
                    <h3 className="text-lg font-semibold text-white mb-4">ข้อมูลส่วนตัว</h3>
                    <div className="space-y-3">
                        <div>
                            <p className="text-slate-400 text-sm">ชื่อ</p>
                            <p className="text-white">{selectedUser?.name}</p>
                        </div>
                        <div>
                            <p className="text-slate-400 text-sm">อีเมล</p>
                            <p className="text-white">{selectedUser?.email}</p>
                        </div>
                        <div>
                            <p className="text-slate-400 text-sm">โทรศัพท์</p>
                            <p className="text-white">{selectedUser?.phone}</p>
                        </div>
                        <div>
                            <p className="text-slate-400 text-sm">เข้าร่วมเมื่อ</p>
                            <p className="text-white">{selectedUser?.joinDate}</p>
                        </div>
                        <div>
                            <p className="text-slate-400 text-sm">สถานะ</p>
                            <span className="bg-green-500/20 text-green-400 px-2 py-1 rounded-full text-xs font-semibold">
                                ใช้งานอยู่
                            </span>
                        </div>
                    </div>
                </div>

                <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
                    <h3 className="text-lg font-semibold text-white mb-4">สถิติการใช้งาน</h3>
                    <div className="space-y-3">
                        <div>
                            <p className="text-slate-400 text-sm">จำนวนการจองทั้งหมด</p>
                            <p className="text-2xl font-bold text-white">{selectedUser?.totalBookings}</p>
                        </div>
                        <div>
                            <p className="text-slate-400 text-sm">ยอดใช้จ่ายรวม</p>
                            <p className="text-2xl font-bold text-green-400">฿{selectedUser?.totalSpent.toLocaleString()}</p>
                        </div>
                        <div>
                            <p className="text-slate-400 text-sm">เข้าใช้ครั้งล่าสุด</p>
                            <p className="text-white">{selectedUser?.lastVisit}</p>
                        </div>
                    </div>
                </div>

                <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
                    <h3 className="text-lg font-semibold text-white mb-4">ค่าเฉลี่ย</h3>
                    <div className="space-y-3">
                        <div>
                            <p className="text-slate-400 text-sm">ค่าเฉลี่ยต่อครั้ง</p>
                            <p className="text-xl font-bold text-blue-400">
                                ฿{Math.round(selectedUser?.totalSpent / selectedUser?.totalBookings).toLocaleString()}
                            </p>
                        </div>
                        <div>
                            <p className="text-slate-400 text-sm">จำนวนออร์เดอร์อาหาร</p>
                            <p className="text-xl font-bold text-orange-400">{selectedUser?.foodHistory?.length} ครั้ง</p>
                        </div>
                        <div>
                            <p className="text-slate-400 text-sm">ระยะเวลาเล่นเฉลี่ย</p>
                            <p className="text-xl font-bold text-purple-400">
                                {Math.round(selectedUser?.bookingHistory?.reduce((acc, booking) => acc + booking.duration, 0) / selectedUser?.bookingHistory?.length)} ชม.
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* ประวัติการจอง */}
            <div className="bg-slate-800 rounded-xl border border-slate-700 overflow-hidden">
                <div className="p-6 border-b border-slate-700">
                    <h3 className="text-lg font-semibold text-white">ประวัติการจอง</h3>
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead className="bg-slate-700">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-slate-300 uppercase tracking-wider">ที่นั่ง</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-slate-300 uppercase tracking-wider">วันที่</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-slate-300 uppercase tracking-wider">ระยะเวลา</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-slate-300 uppercase tracking-wider">ราคา</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-slate-300 uppercase tracking-wider">สถานะ</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-700">
                            {selectedUser?.bookingHistory?.map((booking) => (
                                <tr key={booking.id} className="hover:bg-slate-700/50">
                                    <td className="px-6 py-4 whitespace-nowrap text-white">{booking.seat}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-slate-300">{booking.date}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-slate-300">{booking.duration} ชม.</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-green-400">฿{booking.price}</td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <span className="bg-blue-500/20 text-blue-400 px-2 py-1 rounded-full text-xs font-semibold">
                                            เสร็จสิ้น
                                        </span>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* ประวัติการสั่งอาหาร */}
            <div className="bg-slate-800 rounded-xl border border-slate-700 overflow-hidden">
                <div className="p-6 border-b border-slate-700">
                    <h3 className="text-lg font-semibold text-white">ประวัติการสั่งอาหาร</h3>
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead className="bg-slate-700">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-slate-300 uppercase tracking-wider">รายการ</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-slate-300 uppercase tracking-wider">วันที่</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-slate-300 uppercase tracking-wider">ยอดรวม</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-700">
                            {selectedUser?.foodHistory?.map((order) => (
                                <tr key={order.id} className="hover:bg-slate-700/50">
                                    <td className="px-6 py-4 text-white">{order.items}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-slate-300">{order.date}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-green-400">฿{order.total}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );

    // การตรวจสอบสถานะที่นั่ง
    const SeatManagementView = () => {
        const [selectedZone, setSelectedZone] = useState('ทั้งหมด');
        const [selectedCondition, setSelectedCondition] = useState('ทั้งหมด');

        // กรองข้อมูลตามโซนและสภาพ
        const filteredSeats = seatManagement.filter(seat => {
            const zoneMatch = selectedZone === 'ทั้งหมด' || seat.zone === selectedZone;
            const conditionMatch = selectedCondition === 'ทั้งหมด' || seat.condition === selectedCondition;
            return zoneMatch && conditionMatch;
        });

        // คำนวณสถิติ
        const totalSeats = seatManagement.length;
        const availableSeats = seatManagement.filter(s => s.status === 'ว่าง').length;
        const occupiedSeats = seatManagement.filter(s => s.status === 'ไม่ว่าง').length;
        const maintenanceSeats = seatManagement.filter(s => s.status === 'ซ่อมบำรุง').length;
        const excellentCondition = seatManagement.filter(s => s.condition === 'ดีเยี่ยม').length;
        const goodCondition = seatManagement.filter(s => s.condition === 'ดี').length;
        const needRepair = seatManagement.filter(s => s.condition === 'ต้องซ่อม').length;

        return (
            <div className="space-y-6">
                <div className="flex justify-between items-center">
                    <h2 className="text-3xl font-bold text-white">ตรวจสอบสถานะที่นั่ง</h2>
                    <div className="text-slate-300">
                        รวมทั้งหมด: <span className="text-blue-400 font-bold">{totalSeats}</span> ที่นั่ง
                    </div>
                </div>

                {/* สถิติภาพรวม */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    <div className="bg-gradient-to-br from-green-800 to-green-700 rounded-xl p-6 border border-green-600">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-green-200 text-sm font-medium">ที่นั่งว่าง</p>
                                <p className="text-3xl font-bold text-white">{availableSeats}</p>
                                <p className="text-green-300 text-sm">พร้อมใช้งาน</p>
                            </div>
                            <div className="bg-green-500/20 p-3 rounded-full">
                                <CheckCircle className="text-green-400" size={32} />
                            </div>
                        </div>
                    </div>

                    <div className="bg-gradient-to-br from-red-800 to-red-700 rounded-xl p-6 border border-red-600">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-red-200 text-sm font-medium">ที่นั่งไม่ว่าง</p>
                                <p className="text-3xl font-bold text-white">{occupiedSeats}</p>
                                <p className="text-red-300 text-sm">กำลังใช้งาน</p>
                            </div>
                            <div className="bg-red-500/20 p-3 rounded-full">
                                <XCircle className="text-red-400" size={32} />
                            </div>
                        </div>
                    </div>

                    <div className="bg-gradient-to-br from-orange-800 to-orange-700 rounded-xl p-6 border border-orange-600">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-orange-200 text-sm font-medium">ซ่อมบำรุง</p>
                                <p className="text-3xl font-bold text-white">{maintenanceSeats}</p>
                                <p className="text-orange-300 text-sm">ไม่พร้อมใช้</p>
                            </div>
                            <div className="bg-orange-500/20 p-3 rounded-full">
                                <Settings className="text-orange-400" size={32} />
                            </div>
                        </div>
                    </div>

                    <div className="bg-gradient-to-br from-blue-800 to-blue-700 rounded-xl p-6 border border-blue-600">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-blue-200 text-sm font-medium">อัตราการใช้งาน</p>
                                <p className="text-3xl font-bold text-white">{Math.round((occupiedSeats / (totalSeats - maintenanceSeats)) * 100)}%</p>
                                <p className="text-blue-300 text-sm">ของที่ใช้ได้</p>
                            </div>
                            <div className="bg-blue-500/20 p-3 rounded-full">
                                <BarChart3 className="text-blue-400" size={32} />
                            </div>
                        </div>
                    </div>
                </div>

                {/* สถิติสภาพที่นั่ง */}
                <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
                    <h3 className="text-lg font-semibold text-white mb-4">สภาพที่นั่งทั้งหมด</h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="flex items-center justify-between p-4 bg-slate-700/50 rounded-lg">
                            <span className="text-slate-300">สภาพดีเยี่ยม</span>
                            <div className="flex items-center gap-2">
                                <div className="w-16 bg-slate-600 rounded-full h-2">
                                    <div className="bg-green-500 h-2 rounded-full" style={{ width: `${(excellentCondition / totalSeats) * 100}%` }}></div>
                                </div>
                                <span className="text-green-400 font-semibold">{excellentCondition}</span>
                            </div>
                        </div>
                        <div className="flex items-center justify-between p-4 bg-slate-700/50 rounded-lg">
                            <span className="text-slate-300">สภาพดี</span>
                            <div className="flex items-center gap-2">
                                <div className="w-16 bg-slate-600 rounded-full h-2">
                                    <div className="bg-blue-500 h-2 rounded-full" style={{ width: `${(goodCondition / totalSeats) * 100}%` }}></div>
                                </div>
                                <span className="text-blue-400 font-semibold">{goodCondition}</span>
                            </div>
                        </div>
                        <div className="flex items-center justify-between p-4 bg-slate-700/50 rounded-lg">
                            <span className="text-slate-300">ต้องซ่อม</span>
                            <div className="flex items-center gap-2">
                                <div className="w-16 bg-slate-600 rounded-full h-2">
                                    <div className="bg-red-500 h-2 rounded-full" style={{ width: `${(needRepair / totalSeats) * 100}%` }}></div>
                                </div>
                                <span className="text-red-400 font-semibold">{needRepair}</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* ตัวกรอง */}
                <div className="flex gap-4 items-center">
                    <div>
                        <label className="text-slate-300 text-sm mb-2 block">กรองตามโซน:</label>
                        <select
                            value={selectedZone}
                            onChange={(e) => setSelectedZone(e.target.value)}
                            className="px-4 py-2 bg-slate-800 border border-slate-600 rounded-lg text-white focus:border-blue-400 focus:outline-none"
                        >
                            <option value="ทั้งหมด">ทั้งหมด</option>
                            <option value="A">Zone A</option>
                            <option value="B">Zone B</option>
                            <option value="C">Zone C</option>
                            <option value="VIP">Zone VIP</option>
                            <option value="Room">Zone Room</option>
                        </select>
                    </div>
                    <div>
                        <label className="text-slate-300 text-sm mb-2 block">กรองตามสภาพ:</label>
                        <select
                            value={selectedCondition}
                            onChange={(e) => setSelectedCondition(e.target.value)}
                            className="px-4 py-2 bg-slate-800 border border-slate-600 rounded-lg text-white focus:border-blue-400 focus:outline-none"
                        >
                            <option value="ทั้งหมด">ทั้งหมด</option>
                            <option value="ดีเยี่ยม">ดีเยี่ยม</option>
                            <option value="ดี">ดี</option>
                            <option value="ต้องซ่อม">ต้องซ่อม</option>
                        </select>
                    </div>
                    <div className="ml-auto text-slate-400">
                        แสดง: <span className="text-white font-semibold">{filteredSeats.length}</span> ที่นั่ง
                    </div>
                </div>

                {/* แสดงที่นั่งทั้งหมด */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-4">
                    {filteredSeats.map((seat) => (
                        <div key={seat.id} className={`rounded-xl p-4 border transition-all duration-200 hover:scale-105 ${seat.status === 'ว่าง' ? 'bg-green-900/20 border-green-500/50' :
                            seat.status === 'ไม่ว่าง' ? 'bg-red-900/20 border-red-500/50' :
                                'bg-orange-900/20 border-orange-500/50'
                            }`}>
                            <div className="flex justify-between items-start mb-3">
                                <h3 className={`text-lg font-bold ${seat.zone === 'VIP' ? 'text-yellow-400' :
                                    seat.zone === 'Room' ? 'text-purple-400' :
                                        'text-blue-400'
                                    }`}>
                                    {seat.id}
                                </h3>
                                <div className="flex items-center gap-1">
                                    {seat.zone === 'VIP' && <Crown className="text-yellow-400" size={16} />}
                                    {seat.zone === 'Room' && <Users className="text-purple-400" size={16} />}
                                </div>
                            </div>

                            <div className="space-y-2 text-sm">
                                <div className="flex justify-between">
                                    <span className="text-slate-400">โซน:</span>
                                    <span className="text-white font-medium">Zone {seat.zone}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-slate-400">ประเภท:</span>
                                    <span className="text-white">{seat.type}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-slate-400">สถานะ:</span>
                                    <span className={`font-semibold ${seat.status === 'ว่าง' ? 'text-green-400' :
                                        seat.status === 'ไม่ว่าง' ? 'text-red-400' :
                                            'text-orange-400'
                                        }`}>
                                        {seat.status}
                                    </span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-slate-400">สภาพ:</span>
                                    <span className={`font-semibold ${seat.condition === 'ดีเยี่ยม' ? 'text-green-400' :
                                        seat.condition === 'ดี' ? 'text-blue-400' :
                                            'text-red-400'
                                        }`}>
                                        {seat.condition}
                                    </span>
                                </div>
                            </div>

                            {/* ปุ่มจัดการ */}
                            <div className="mt-4 flex gap-2">
                                <button className="flex-1 bg-blue-600 hover:bg-blue-700 px-3 py-2 rounded text-sm transition-colors">
                                    รายละเอียด
                                </button>
                                {seat.condition === 'ต้องซ่อม' && (
                                    <button className="bg-orange-600 hover:bg-orange-700 px-3 py-2 rounded text-sm transition-colors">
                                        ซ่อมแซม
                                    </button>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        );
    };

    // การจัดการคำสั่งซื้ออาหาร
    const FoodOrdersView = () => (
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

            {/* แสดงคำสั่งซื้อ */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {foodOrders.map((order) => (
                    <div key={order.id} className="bg-slate-800 rounded-xl p-6 border border-slate-700 hover:shadow-lg transition-shadow">
                        <div className="flex justify-between items-start mb-4">
                            <div>
                                <h3 className="text-lg font-bold text-white">คำสั่งซื้อ #{order.orderNumber}</h3>
                                <p className="text-slate-300">{order.customer}</p>
                                <p className="text-sm text-slate-400">ที่นั่ง: {order.seat}</p>
                            </div>
                            <span className={`px-2 py-1 rounded-full text-xs font-semibold ${order.status === 'preparing' ? 'bg-yellow-500/20 text-yellow-400' :
                                order.status === 'ready' ? 'bg-blue-500/20 text-blue-400' :
                                    'bg-green-500/20 text-green-400'
                                }`}>
                                {order.status === 'preparing' ? 'กำลังเตรียม' :
                                    order.status === 'ready' ? 'พร้อมเสิร์ฟ' : 'ส่งแล้ว'}
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
                                <p className="text-slate-400 text-sm">รวม: <span className="text-green-400 font-bold">฿{order.total}</span></p>
                                <p className="text-slate-400 text-xs">เวลา: {order.orderTime}</p>
                            </div>
                            <div className="flex space-x-2">
                                <button className="bg-blue-600 hover:bg-blue-700 px-3 py-1 rounded text-sm transition-colors">
                                    อัปเดต
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );

    // หน้าตั้งค่า
    

    const renderContent = () => {
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
                    />
                );
            case 'seats':
                return <SeatManagementViewComp seatManagement={seatManagement} />;
            case 'food':
                return <FoodOrdersViewComp foodOrders={foodOrders} />;
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
                            { id: 'bookings', label: 'จองที่ใช้', icon: Calendar },
                            { id: 'users', label: 'สมาชิก', icon: Users },
                            { id: 'seats', label: 'จัดการที่นั่ง', icon: Monitor },
                            { id: 'food', label: 'ประวัติสั่งซื้อ', icon: UtensilsCrossed }
                        ].map((item) => (
                            <button
                                key={item.id}
                                onClick={() => setActiveTab(item.id)}
                                className={`w-full text-left flex items-center p-4 rounded-xl transition-all duration-200 ${activeTab === item.id
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
                                        // fallback: clear auth and reload to show login
                                        localStorage.removeItem('auth');
                                        localStorage.removeItem('isAdmin');
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

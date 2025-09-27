import React, { useState, useEffect } from 'react';
import axios from "axios";

const GamingAuth = ({ onLoginSuccess, onAdminLogin }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [alert, setAlert] = useState({ type: '', message: '', show: false });
  const [loading, setLoading] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  
  // Form states
  const [loginForm, setLoginForm] = useState({
    username: '',
    password: ''
  });
  
  const [registerForm, setRegisterForm] = useState({
    email: '',
    name: '',
    password: '',
    confirmPassword: ''
  });

  // Mouse tracking
  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    document.addEventListener('mousemove', handleMouseMove);
    return () => document.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Alert system
  const showAlert = (type, message) => {
    setAlert({ type, message, show: true });
    setTimeout(() => {
      setAlert(prev => ({ ...prev, show: false }));
    }, 5000);
  };

  // ----------------------------
  // Login
  // ----------------------------
  const handleLogin = async (e) => {
    e.preventDefault();
    if (!loginForm.username || !loginForm.password) {
      showAlert('error', 'กรุณากรอก Username และ Password');
      return;
    }

    // // offline mock
    // if (loginForm.username === "admin@game.com" && loginForm.password === "515") {
    //   showAlert("success", "เข้าสู่ระบบผู้ดูแลระบบ (mock)");
    //   onAdminLogin();
    //   return;
    // }

    // //offline test
    //  if (loginForm.username === "Nomojuro@gmail.com" && loginForm.password === "1234") {
    //    showAlert("success", "เข้าสู่ระบบ(mock)");
    //    onLoginSuccess()
    //    return;
    //  }

    setLoading(true);
    try {
      const res = await axios.post("http://localhost:3000/auth/login", {
        email: loginForm.username,
        password: loginForm.password,
      });

      const { token, isAdmin, user } = res.data;

      // save user info
      localStorage.setItem("token", token);
      localStorage.setItem("userId", user.id);
      localStorage.setItem("userName", user.name);
      localStorage.setItem("userEmail", user.email);

      if (isAdmin) {
        showAlert('success', 'เข้าสู่ระบบผู้ดูแลระบบสำเร็จ!');
        if (typeof onAdminLogin === "function") onAdminLogin();
      } else {
        showAlert('success', `ยินดีต้อนรับ ${user.name}`);
        if (typeof onLoginSuccess === "function") onLoginSuccess();
      }
    } catch (err) {
      showAlert('error', err.response?.data?.message || 'เข้าสู่ระบบไม่สำเร็จ');
    } finally {
      setLoading(false);
    }
  };

  // ----------------------------
  // Register
  // ----------------------------
  const handleRegister = async (e) => {
    e.preventDefault();
    const { email, name, password, confirmPassword } = registerForm;

    if (password !== confirmPassword) {
      showAlert('error', 'รหัสผ่านไม่ตรงกัน');
      return;
    }

    setLoading(true);
    try {
      const res = await axios.post("http://localhost:3000/auth/register", {
        email,
        name,
        password,
      });

      const { token, isAdmin, user } = res.data;

      // save user info
      localStorage.setItem("token", token);
      localStorage.setItem("userId", user.id);
      localStorage.setItem("userName", user.name);
      localStorage.setItem("userEmail", user.email);

      if (isAdmin) {
        showAlert('success', 'สมัครเป็นผู้ดูแลระบบสำเร็จ!');
        if (typeof onAdminLogin === "function") onAdminLogin();
      } else {
        showAlert('success', `สมัครสมาชิกสำเร็จ! ยินดีต้อนรับ ${user.name}`);
        if (typeof onLoginSuccess === "function") onLoginSuccess();
      }

      setRegisterForm({ email: '', name: '', password: '', confirmPassword: '' });
    } catch (err) {
      showAlert('error', err.response?.data?.message || 'สมัครสมาชิกไม่สำเร็จ');
    } finally {
      setLoading(false);
    }
  };

  // floating bg
  const FloatingElement = ({ delay = 0, size = 'w-2 h-2', position = 'top-20 left-20' }) => (
    <div 
      className={`absolute ${position} ${size} bg-blue-400/20 rounded-full animate-pulse`}
      style={{ animationDelay: `${delay}s`, animationDuration: '4s' }}
    />
  );

  const windowTransform = `translate(${mousePosition.x * 0.01}px, ${mousePosition.y * 0.01}px)`;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-blue-950 to-slate-900 overflow-hidden relative">
      {/* Animated Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-950/30 via-slate-900/20 to-blue-900/30 animate-pulse" />

      {/* Floating */}
      <FloatingElement delay={0} size="w-3 h-3" position="top-20 left-20" />
      <FloatingElement delay={1} size="w-2 h-2" position="top-40 right-32" />
      <FloatingElement delay={2} size="w-4 h-4" position="bottom-32 left-16" />
      <FloatingElement delay={3} size="w-2 h-2" position="bottom-20 right-20" />

      <div className="flex items-center justify-center min-h-screen p-4 relative z-10">
        {/* Auth Window */}
        <div 
          className="bg-slate-900/40 backdrop-blur-xl border border-blue-500/20 rounded-3xl p-8 w-full max-w-md shadow-2xl transform transition-all duration-300 hover:scale-105 hover:shadow-blue-500/25"
          style={{ transform: windowTransform }}
        >
          {/* Header */}
          <div className="flex items-center justify-between mb-8 pb-4 border-b border-blue-500/20">
            <h1 className="text-blue-100 text-xl font-bold">
              Desktop - {isLogin ? 'Login' : 'Register'}
            </h1>
            <div className="flex gap-2">
              <div className="w-3 h-3 bg-red-500 rounded-full" />
              <div className="w-3 h-3 bg-yellow-500 rounded-full" />
              <div className="w-3 h-3 bg-green-500 rounded-full" />
            </div>
          </div>

          {/* Alert */}
          {alert.show && (
            <div className={`mb-6 p-4 rounded-xl border ${
              alert.type === 'success' 
                ? 'bg-green-500/20 border-green-500/30 text-green-400' 
                : 'bg-red-500/20 border-red-500/30 text-red-400'
            }`}>
              {alert.message}
            </div>
          )}

          {/* Forms */}
          {isLogin ? (
            // ---------- Login ----------
            <form onSubmit={handleLogin} className="space-y-6">
              <h2 className="text-2xl font-bold text-blue-100 text-center mb-8">Login</h2>

              <div>
                <label className="block text-blue-200/80 text-sm font-medium">Username or Email</label>
                <input
                  type="text"
                  value={loginForm.username}
                  onChange={(e) => setLoginForm(prev => ({ ...prev, username: e.target.value }))}
                  className="w-full px-4 py-3 bg-slate-900/50 border border-blue-500/30 rounded-xl text-blue-100"
                  placeholder="Enter your username or email"
                  required
                />
              </div>

              <div>
                <label className="block text-blue-200/80 text-sm font-medium">Password</label>
                <input
                  type="password"
                  value={loginForm.password}
                  onChange={(e) => setLoginForm(prev => ({ ...prev, password: e.target.value }))}
                  className="w-full px-4 py-3 bg-slate-900/50 border border-blue-500/30 rounded-xl text-blue-100"
                  placeholder="Enter your password"
                  required
                />
              </div>

              <button type="submit" disabled={loading}
                className="w-full py-3 bg-gradient-to-r from-blue-700 to-blue-900 text-white font-bold rounded-xl">
                {loading ? "กำลังเข้าสู่ระบบ..." : "Login"}
              </button>

              <div className="text-center text-blue-200/70">
                Don't have an account?{" "}
                <button type="button" onClick={() => setIsLogin(false)} className="text-blue-400 underline">
                  Register here
                </button>
              </div>
            </form>
          ) : (
            // ---------- Register ----------
            <form onSubmit={handleRegister} className="space-y-6">
              <h2 className="text-2xl font-bold text-blue-100 text-center mb-8">Register</h2>

              <div>
                <label className="block text-blue-200/80 text-sm font-medium">Email</label>
                <input
                  type="email"
                  value={registerForm.email}
                  onChange={(e) => setRegisterForm(prev => ({ ...prev, email: e.target.value }))}
                  className="w-full px-4 py-3 bg-slate-900/50 border border-blue-500/30 rounded-xl text-blue-100"
                  placeholder="Enter your email"
                  required
                />
              </div>

              <div>
                <label className="block text-blue-200/80 text-sm font-medium">Name</label>
                <input
                  type="text"
                  value={registerForm.name}
                  onChange={(e) => setRegisterForm(prev => ({ ...prev, name: e.target.value }))}
                  className="w-full px-4 py-3 bg-slate-900/50 border border-blue-500/30 rounded-xl text-blue-100"
                  placeholder="Enter your full name"
                  required
                />
              </div>

              <div>
                <label className="block text-blue-200/80 text-sm font-medium">Password</label>
                <input
                  type="password"
                  value={registerForm.password}
                  onChange={(e) => setRegisterForm(prev => ({ ...prev, password: e.target.value }))}
                  className="w-full px-4 py-3 bg-slate-900/50 border border-blue-500/30 rounded-xl text-blue-100"
                  placeholder="Create a password"
                  required
                />
              </div>

              <div>
                <label className="block text-blue-200/80 text-sm font-medium">Confirm Password</label>
                <input
                  type="password"
                  value={registerForm.confirmPassword}
                  onChange={(e) => setRegisterForm(prev => ({ ...prev, confirmPassword: e.target.value }))}
                  className="w-full px-4 py-3 bg-slate-900/50 border border-blue-500/30 rounded-xl text-blue-100"
                  placeholder="Confirm your password"
                  required
                />
              </div>

              <button type="submit" disabled={loading}
                className="w-full py-3 bg-gradient-to-r from-blue-600 to-slate-800 text-white font-bold rounded-xl">
                {loading ? "กำลังสมัครสมาชิก..." : "Register"}
              </button>

              <div className="text-center text-blue-200/70">
                Already have an account?{" "}
                <button type="button" onClick={() => setIsLogin(true)} className="text-blue-400 underline">
                  Login here
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default GamingAuth;

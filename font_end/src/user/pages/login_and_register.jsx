import React, { useState, useEffect } from 'react';

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

  // Mouse tracking for floating animation
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

  // Validation functions
  const validateEmail = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const validatePassword = (password) => {
    return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(password);
  };

  // Handle login
  const handleLogin = async (e) => {
    e.preventDefault();
    
    if (!loginForm.username || !loginForm.password) {
      showAlert('error', 'กรุณากรอก Username และ Password');
      return;
    }

    setLoading(true);
    
    // Simulate API call
    try {
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Special admin code: username/email = 515 and password = 515
      if (loginForm.username === '515' && loginForm.password === '515') {
        showAlert('success', 'เข้าสู่ระบบผู้ดูแลระบบสำเร็จ! กำลังเปลี่ยนหน้า...');
        setTimeout(() => {
          if (typeof onAdminLogin === 'function') onAdminLogin();
        }, 700);
        setLoading(false);
        return;
      }

      // Mock validation - replace with actual API call
      if (loginForm.username === '123' && loginForm.password === '123') {
        showAlert('success', 'เข้าสู่ระบบสำเร็จ! กำลังเปลี่ยนหน้า...');
        setTimeout(() => {
          // Call parent handler to switch to app
          if (typeof onLoginSuccess === 'function') onLoginSuccess();
        }, 700);
      } else {
        showAlert('error', 'ชื่อผู้ใช้หรือรหัสผ่านไม่ถูกต้อง');
      }
    } catch (error) {
      showAlert('error', 'เกิดข้อผิดพลาดในการเชื่อมต่อ กรุณาลองใหม่อีกครั้ง');
    } finally {
      setLoading(false);
    }
  };

  // Handle register
  const handleRegister = async (e) => {
    e.preventDefault();
    
    const { email, name, password, confirmPassword } = registerForm;
    
    if (!email || !name || !password || !confirmPassword) {
      showAlert('error', 'กรุณากรอกข้อมูลให้ครบถ้วน');
      return;
    }

    if (!validateEmail(email)) {
      showAlert('error', 'รูปแบบอีเมลไม่ถูกต้อง');
      return;
    }

    if (password !== confirmPassword) {
      showAlert('error', 'รหัสผ่านไม่ตรงกัน');
      return;
    }

    if (password.length < 6) {
      showAlert('error', 'รหัสผ่านต้องมีความยาวอย่างน้อย 6 ตัวอักษร');
      return;
    }

    if (!validatePassword(password)) {
      showAlert('error', 'รหัสผ่านต้องมีตัวพิมพ์เล็ก ตัวพิมพ์ใหญ่ และตัวเลข');
      return;
    }

    setLoading(true);
    
    try {
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Simulate successful registration
      showAlert('success', 'ลงทะเบียนสำเร็จ! กำลังเปลี่ยนไปหน้าเข้าสู่ระบบ...');
      setTimeout(() => {
        setIsLogin(true);
        setRegisterForm({ email: '', name: '', password: '', confirmPassword: '' });
      }, 2000);
    } catch (error) {
      showAlert('error', 'เกิดข้อผิดพลาดในระบบ กรุณาลองใหม่อีกครั้ง');
    } finally {
      setLoading(false);
    }
  };

  const FloatingElement = ({ delay = 0, size = 'w-2 h-2', position = 'top-20 left-20' }) => (
    <div 
      className={`absolute ${position} ${size} bg-blue-400/20 rounded-full animate-pulse`}
      style={{
        animationDelay: `${delay}s`,
        animationDuration: '4s'
      }}
    />
  );

  const windowTransform = `translate(${mousePosition.x * 0.01}px, ${mousePosition.y * 0.01}px)`;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-blue-950 to-slate-900 overflow-hidden relative">
      {/* Animated Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-950/30 via-slate-900/20 to-blue-900/30 animate-pulse" />
      
      {/* Floating Elements */}
      <FloatingElement delay={0} size="w-3 h-3" position="top-20 left-20" />
      <FloatingElement delay={1} size="w-2 h-2" position="top-40 right-32" />
      <FloatingElement delay={2} size="w-4 h-4" position="bottom-32 left-16" />
      <FloatingElement delay={3} size="w-2 h-2" position="bottom-20 right-20" />
      
      {/* Rotating Gaming Elements */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-32 h-32 border border-blue-400/20 rotate-45 animate-spin" style={{ animationDuration: '20s' }} />
        <div className="absolute bottom-1/4 right-1/4 w-24 h-24 border border-blue-300/20 rotate-12 animate-spin" style={{ animationDuration: '25s' }} />
      </div>

      <div className="flex items-center justify-center min-h-screen p-4 relative z-10">
        {/* Main Auth Window */}
        <div 
          className="bg-slate-900/40 backdrop-blur-xl border border-blue-500/20 rounded-3xl p-8 w-full max-w-md shadow-2xl transform transition-all duration-300 hover:scale-105 hover:shadow-blue-500/25"
          style={{ transform: windowTransform }}
        >
          {/* Window Header */}
          <div className="flex items-center justify-between mb-8 pb-4 border-b border-blue-500/20">
            <h1 className="text-blue-100 text-xl font-bold">
              Desktop - {isLogin ? 'Login' : 'Register'}
            </h1>
            <div className="flex gap-2">
              <div className="w-3 h-3 bg-red-500 rounded-full cursor-pointer hover:bg-red-400 transition-colors" />
              <div className="w-3 h-3 bg-yellow-500 rounded-full cursor-pointer hover:bg-yellow-400 transition-colors" />
              <div className="w-3 h-3 bg-green-500 rounded-full cursor-pointer hover:bg-green-400 transition-colors" />
            </div>
          </div>

          {/* Alert */}
          {alert.show && (
            <div className={`mb-6 p-4 rounded-xl border animate-in slide-in-from-top duration-300 ${
              alert.type === 'success' 
                ? 'bg-green-500/20 border-green-500/30 text-green-400' 
                : 'bg-red-500/20 border-red-500/30 text-red-400'
            }`}>
              {alert.message}
            </div>
          )}

          {isLogin ? (
            /* Login Form */
            <form onSubmit={handleLogin} className="space-y-6">
              <h2 className="text-2xl font-bold text-blue-100 text-center mb-8">Login</h2>
              
              <div className="space-y-2">
                <label className="block text-blue-200/80 text-sm font-medium">
                  Username or Email
                </label>
                <input
                  type="text"
                  value={loginForm.username}
                  onChange={(e) => setLoginForm(prev => ({ ...prev, username: e.target.value }))}
                  className="w-full px-4 py-3 bg-slate-900/50 border border-blue-500/30 rounded-xl text-blue-100 placeholder-blue-300/50 focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-500/20 transition-all duration-300"
                  placeholder="Enter your username or email"
                  required
                />
              </div>

              <div className="space-y-2">
                <label className="block text-blue-200/80 text-sm font-medium">
                  Password
                </label>
                <input
                  type="password"
                  value={loginForm.password}
                  onChange={(e) => setLoginForm(prev => ({ ...prev, password: e.target.value }))}
                  className="w-full px-4 py-3 bg-slate-900/50 border border-blue-500/30 rounded-xl text-blue-100 placeholder-blue-300/50 focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-500/20 transition-all duration-300"
                  placeholder="Enter your password"
                  required
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 bg-gradient-to-r from-blue-700 to-blue-900 hover:from-blue-600 hover:to-blue-800 text-white font-bold rounded-xl transition-all duration-300 transform hover:scale-105 hover:shadow-lg hover:shadow-blue-500/25 disabled:opacity-70 disabled:cursor-not-allowed relative overflow-hidden group"
              >
                <span className={`${loading ? 'opacity-0' : 'opacity-100'} transition-opacity`}>
                  Login
                </span>
                {loading && (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    <span className="ml-2">กำลังเข้าสู่ระบบ...</span>
                  </div>
                )}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent transform -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
              </button>

              <div className="relative text-center">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-blue-500/30" />
                </div>
                <div className="relative bg-transparent px-4">
                  <span className="text-blue-200/60 bg-gradient-to-r from-transparent via-slate-900/80 to-transparent px-4">Or</span>
                </div>
              </div>

              <button
                type="button"
                onClick={() => showAlert('error', 'Google login ยังไม่เปิดใช้งาน')}
                className="w-full py-3 bg-gradient-to-r from-blue-600 via-slate-700 to-blue-800 hover:from-blue-700 hover:via-slate-600 hover:to-blue-700 text-white font-bold rounded-xl transition-all duration-300 transform hover:scale-105 hover:shadow-lg relative overflow-hidden group"
              >
                Sign in with Google
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent transform -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
              </button>

              <div className="text-center text-blue-200/70">
                Don't have an account?{' '}
                <button
                  type="button"
                  onClick={() => setIsLogin(false)}
                  className="text-blue-400 hover:text-blue-300 font-bold transition-colors underline"
                >
                  Register here
                </button>
              </div>
            </form>
          ) : (
            /* Register Form */
            <form onSubmit={handleRegister} className="space-y-6">
              <h2 className="text-2xl font-bold text-blue-100 text-center mb-8">Register</h2>
              
              <div className="space-y-2">
                <label className="block text-blue-200/80 text-sm font-medium">
                  Email
                </label>
                <input
                  type="email"
                  value={registerForm.email}
                  onChange={(e) => setRegisterForm(prev => ({ ...prev, email: e.target.value }))}
                  className="w-full px-4 py-3 bg-slate-900/50 border border-blue-500/30 rounded-xl text-blue-100 placeholder-blue-300/50 focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-500/20 transition-all duration-300"
                  placeholder="Enter your email"
                  required
                />
              </div>

              <div className="space-y-2">
                <label className="block text-blue-200/80 text-sm font-medium">
                  Name
                </label>
                <input
                  type="text"
                  value={registerForm.name}
                  onChange={(e) => setRegisterForm(prev => ({ ...prev, name: e.target.value }))}
                  className="w-full px-4 py-3 bg-slate-900/50 border border-blue-500/30 rounded-xl text-blue-100 placeholder-blue-300/50 focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-500/20 transition-all duration-300"
                  placeholder="Enter your full name"
                  required
                />
              </div>

              <div className="space-y-2">
                <label className="block text-blue-200/80 text-sm font-medium">
                  Password
                </label>
                <input
                  type="password"
                  value={registerForm.password}
                  onChange={(e) => setRegisterForm(prev => ({ ...prev, password: e.target.value }))}
                  className="w-full px-4 py-3 bg-slate-900/50 border border-blue-500/30 rounded-xl text-blue-100 placeholder-blue-300/50 focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-500/20 transition-all duration-300"
                  placeholder="Create a password"
                  required
                />
              </div>

              <div className="space-y-2">
                <label className="block text-blue-200/80 text-sm font-medium">
                  Confirm Password
                </label>
                <input
                  type="password"
                  value={registerForm.confirmPassword}
                  onChange={(e) => setRegisterForm(prev => ({ ...prev, confirmPassword: e.target.value }))}
                  className="w-full px-4 py-3 bg-slate-900/50 border border-blue-500/30 rounded-xl text-blue-100 placeholder-blue-300/50 focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-500/20 transition-all duration-300"
                  placeholder="Confirm your password"
                  required
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 bg-gradient-to-r from-blue-600 to-slate-800 hover:from-blue-500 hover:to-slate-700 text-white font-bold rounded-xl transition-all duration-300 transform hover:scale-105 hover:shadow-lg hover:shadow-blue-500/25 disabled:opacity-70 disabled:cursor-not-allowed relative overflow-hidden group"
              >
                <span className={`${loading ? 'opacity-0' : 'opacity-100'} transition-opacity`}>
                  Register
                </span>
                {loading && (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    <span className="ml-2">กำลังลงทะเบียน...</span>
                  </div>
                )}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent transform -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
              </button>

              <div className="text-center text-blue-200/70">
                Already have an account?{' '}
                <button
                  type="button"
                  onClick={() => setIsLogin(true)}
                  className="text-blue-400 hover:text-blue-300 font-bold transition-colors underline"
                >
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
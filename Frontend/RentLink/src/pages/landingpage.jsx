import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Login from './Login';
import Register from './Register';
import houseImg from '../assets/house.jpg';
import { useAuth } from '../context/AuthContext';

const LandingPage = () => {
  const [mode, setMode] = useState('login');
  const { auth } = useAuth();
  const navigate = useNavigate(); // ✅ called at top level

  // ✅ redirect if already logged in
  useEffect(() => {
    if (auth.user && auth.accessToken) {
      navigate('/dashboard');
    }
  }, [auth, navigate]);

  return (
    <div
      className="min-h-screen bg-cover bg-center flex items-center justify-center"
      style={{ backgroundImage: `url(${houseImg})` }}
    >
      <div className="w-full max-w-md mx-auto p-8 rounded-xl bg-white/20 backdrop-blur-md shadow-xl">
        <h1 className="text-3xl font-bold text-center text-black mb-6">🏠 RentLink</h1>

        {/* Toggle */}
        <div className="flex justify-center gap-4 mb-6">
          <button
            onClick={() => setMode('login')}
            className={`px-4 py-2 rounded ${
              mode === 'login'
                ? 'bg-gray-600 text-white'
                : 'bg-white/40 text-white'
            }`}
          >
            Login
          </button>
          <button
            onClick={() => setMode('register')}
            className={`px-4 py-2 rounded ${
              mode === 'register'
                ? 'bg-gray-600 text-white'
                : 'bg-white/40 text-white'
            }`}
          >
            Register
          </button>
        </div>

        {/* Auth Form */}
        <div>{mode === 'login' ? <Login /> : <Register />}</div>
      </div>
    </div>
  );
};

export default LandingPage;

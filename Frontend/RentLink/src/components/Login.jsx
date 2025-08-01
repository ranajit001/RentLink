import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import baseApi from '../utils/baseApi';

const Login = () => {
  const [form, setForm] = useState({ email: '', password: '', role: '' });
  const [error, setError] = useState('');
  const { loginOrRegister } = useAuth(); // Fixed typo: was 'loginOrlogin'
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const res = await fetch(`${baseApi}/api/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.message || 'Login failed');
        return;
      }

      loginOrRegister({ user: data.user, accessToken: data.accessToken });
      navigate('/dashboard');
    } catch (err) {
      console.log(err);
      setError('Something went wrong');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="login-form">
      <h1>Login</h1>

      <input
        type="email"
        name="email"
        placeholder="Email"
        value={form.email}
        onChange={handleChange}
        required
      />

      <input
        type="password"
        name="password"
        placeholder="Password"
        value={form.password}
        onChange={handleChange}
        required
      />

      <select name="role" value={form.role} onChange={handleChange}>
        <option value="">Select Role</option>
        <option value="tenant">Tenant</option>
        <option value="landlord">Landlord</option>
      </select>

      {error && <p className="error">{error}</p>}

      <button type="submit">Login</button>

      <style>{`
        .login-form {
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
          align-items: stretch;
          width: 100%;
        }

        .login-form h1 {
          font-size: 1.5rem;
          font-weight: 600;
          color: #333;
          margin: 0 0 0.5rem 0;
          text-align: center;
        }

        .login-form input,
        .login-form select {
          padding: 0.75rem;
          border: 2px solid #e2e8f0;
          border-radius: 8px;
          font-size: 0.9rem;
          transition: border-color 0.2s ease;
          background: #f8fafc;
          width: 100%;
          box-sizing: border-box;
        }

        .login-form input:focus,
        .login-form select:focus {
          outline: none;
          border-color: #667eea;
          background: white;
        }

        .login-form select {
          cursor: pointer;
        }

        .login-form .error {
          color: #e53e3e;
          font-size: 0.8rem;
          background: #fed7d7;
          padding: 0.5rem;
          border-radius: 6px;
          margin: 0;
          text-align: center;
        }

        .login-form button {
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          color: white;
          padding: 0.75rem;
          border: none;
          border-radius: 8px;
          font-weight: 600;
          cursor: pointer;
          transition: transform 0.2s ease;
          width: 100%;
        }

        .login-form button:hover {
          transform: translateY(-1px);
        }
      `}</style>
    </form>
  );
};

export default Login;

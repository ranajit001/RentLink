import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import baseApi from '../utils/baseApi';

const Register = () => {
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    role: 'tenant',
    contactInfo: '',
    language: 'en',
  });

  const [error, setError] = useState('');
  const { loginOrRegister } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const res = await fetch(`${baseApi}/api/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.message || 'Registration failed');
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
    <form onSubmit={handleSubmit} className="max-w-md mx-auto p-4">
      <h2 className="text-2xl font-semibold mb-4">Register</h2>

      <input
        type="text"
        name="name"
        placeholder="Name"
        value={form.name}
        onChange={handleChange}
        required
        className="w-full border p-2 mb-2"
      />

      <input
        type="email"
        name="email"
        placeholder="Email"
        value={form.email}
        onChange={handleChange}
        required
        className="w-full border p-2 mb-2"
      />

      <input
        type="password"
        name="password"
        placeholder="Password"
        value={form.password}
        onChange={handleChange}
        required
        className="w-full border p-2 mb-2"
      />

      <input
        type="text"
        name="contactInfo"
        placeholder="Contact Info"
        value={form.contactInfo}
        onChange={handleChange}
        required
        className="w-full border p-2 mb-2"
      />

      <select
        name="role"
        value={form.role}
        onChange={handleChange}
        className="w-full border p-2 mb-2"
      >
        <option value="tenant">Tenant</option>
        <option value="landlord">Landlord</option>
      </select>

      <input
        type="text"
        name="language"
        placeholder="Language"
        value={form.language}
        onChange={handleChange}
        className="w-full border p-2 mb-2"
      />

      {error && <p className="text-red-600 mb-2">{error}</p>}

      <button type="submit" className="w-full bg-gray-600 text-white p-2">
        Register
      </button>
    </form>
  );
};

export default Register;

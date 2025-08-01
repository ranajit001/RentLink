import { useState } from 'react';
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
    } catch (err) {
      console.log(err);
      setError(err.message || 'Something went wrong');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="register-form">
      <h1>Register</h1>
      <input
        type="text"
        name="name"
        id='name'
        placeholder="Full Name"
        value={form.name}
        onChange={handleChange}
        required
      />
  

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

      <input
        type="text"
        name="contactInfo"
        placeholder="Phone Number"
        value={form.contactInfo}
        onChange={handleChange}
        required
      />

      <select name="role" value={form.role} onChange={handleChange}>
        <option value="tenant">Tenant</option>
        <option value="landlord">Landlord</option>
      </select>

      <input
        type="text"
        name="language"
        placeholder="Language (e.g., en)"
        value={form.language}
        onChange={handleChange}
      />

      {error && <p className="error">{error}</p>}

      <button type="submit">Register</button>

      <style>{`
        .register-form {
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
          align-items: stretch;
          width: 100%;
        }

        .register-form h1 {
          font-size: 1.5rem;
          font-weight: 600;
          color: #333;
          margin: 0 0 0.5rem 0;
          text-align: center;
        }

        .register-form input,
        .register-form select {
          padding: 0.75rem;
          border: 2px solid #e2e8f0;
          border-radius: 8px;
          font-size: 0.9rem;
          transition: border-color 0.2s ease;
          background: #f8fafc;
        }

        .register-form input:focus,
        .register-form select:focus {
          outline: none;
          border-color: #667eea;
          background: white;
        }

        .register-form select {
          cursor: pointer;
        }

        .register-form .error {
          color: #e53e3e;
          font-size: 0.8rem;
          background: #fed7d7;
          padding: 0.5rem;
          border-radius: 6px;
          margin: 0;
          text-align: center;
        }

        .register-form button {
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          color: white;
          padding: 0.75rem;
          border: none;
          border-radius: 8px;
          font-weight: 600;
          cursor: pointer;
          transition: transform 0.2s ease;
        }

        .register-form button:hover {
          transform: translateY(-1px);
        }
      `}</style>
    </form>
  );
};

export default Register;

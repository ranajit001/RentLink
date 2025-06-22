import { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import baseApi from '../../utils/baseApi';

const AddProperty = () => {
  const { auth } = useAuth();
  const [form, setForm] = useState({
    name: '',
    address: '',
    amount: '', //rent
  });
  const [msg, setMsg] = useState('');
  const [error, setError] = useState('');

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMsg('');
    setError('');

    try {
      const res = await fetch(`${baseApi}/api/property/landlord/add`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${auth.accessToken}`,
        },
        body: JSON.stringify(form),
      });

      const data = await res.json(); 
      

      if (!res.ok) {
        setError(data.message || 'Failed to add property');
        return;
      }

      setMsg('Property added successfully!');
      setForm({ name: '', address: '', amount: '' });
    } catch (err) {
        console.log(err);
        
      setError('Something went wrong');
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-4">
      <h2 className="text-2xl font-semibold mb-4">Add Property</h2>
      <form onSubmit={handleSubmit} className="space-y-3">
        <input
          type="text"
          name="name"
          value={form.title}
          onChange={handleChange}
          placeholder="Property Title"
          className="w-full border p-2"
          required
        />
        <input
          type="text"
          name="address"
          value={form.address}
          onChange={handleChange}
          placeholder="Address"
          className="w-full border p-2"
          required
        />
        <input
          type="number"
          name="amount"
          value={form.rent}
          onChange={handleChange}
          placeholder="Monthly Rent"
          className="w-full border p-2"
          required
        />
        {msg && <p className="text-green-600">{msg}</p>}
        {error && <p className="text-red-600">{error}</p>}
        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">
          Submit
        </button>
      </form>
    </div>
  );
};

export default AddProperty;

import { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import baseApi from '../../utils/baseApi';

const AssignTenant = () => {
  const { auth } = useAuth();

  const [formData, setFormData] = useState({
    propertyId: '',
    tenantEmail: '',
  });

  const [status, setStatus] = useState({
    loading: false,
    message: '',
    error: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleAssign = async (e) => {
    e.preventDefault();
    setStatus({ loading: true, message: '', error: '' });

    try {
      const res = await fetch(`${baseApi}/api/property/landlord/assign-tenant`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${auth.accessToken}`,
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data.message || 'Assignment failed');

      setStatus({
        loading: false,
        message: 'Tenant assigned successfully!',
        error: '',
      });

      // reset form
      setFormData({ propertyId: '', tenantEmail: '' });
    } catch (err) {
      setStatus({
        loading: false,
        message: '',
        error: err.message,
      });
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 bg-white p-6 rounded shadow-md">
      <h2 className="text-xl font-semibold mb-4">🔗 Assign Tenant</h2>

      <form onSubmit={handleAssign} className="space-y-4">
        <div>
          <label className="block font-medium">Property ID</label>
          <input
            type="text"
            name="propertyId"
            value={formData.propertyId}
            onChange={handleChange}
            required
            className="w-full border border-gray-300 p-2 rounded"
          />
        </div>

        <div>
          <label className="block font-medium">Tenant Email</label>
          <input
            type="email"
            name="tenantEmail"
            value={formData.tenantEmail}
            onChange={handleChange}
            required
            className="w-full border border-gray-300 p-2 rounded"
          />
        </div>

        <button
          type="submit"
          disabled={status.loading}
          className="w-full bg-purple-600 hover:bg-purple-700 text-white py-2 rounded"
        >
          {status.loading ? 'Assigning...' : 'Assign Tenant'}
        </button>
      </form>

      {status.message && (
        <p className="mt-4 text-green-600 font-medium">{status.message}</p>
      )}
      {status.error && (
        <p className="mt-4 text-red-600 font-medium">{status.error}</p>
      )}
    </div>
  );
};

export default AssignTenant;

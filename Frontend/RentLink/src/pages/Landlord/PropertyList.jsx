import { useEffect, useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import baseApi from '../../utils/baseApi';

const PropertyList = () => {
  const { auth } = useAuth();
  const [properties, setProperties] = useState([]);
  const [error, setError] = useState('');
  const [assigning, setAssigning] = useState({}); // { [propertyId]: email }

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const res = await fetch(`${baseApi}/api/property/landlord/my-properties`, {
          headers: {
            Authorization: `Bearer ${auth.accessToken}`,
          },
        });

        const data = await res.json();
        if (!res.ok) {
          setError(data.message || 'Could not load properties');
          return;
        }

        setProperties(data.properties || []);
      } catch (err) {
        console.error(err);
        setError(err.message || 'Something went wrong');
      }
    };

    fetchProperties();
  }, [auth.accessToken]);

  const handleToggle = (id) => {
    setAssigning((prev) => ({
      ...prev,
      [id]: prev[id] ? null : '',
    }));
  };

  const handleEmailChange = (id, email) => {
    setAssigning((prev) => ({
      ...prev,
      [id]: email,
    }));
  };

  const handleAssign = async (id) => {
    try {
      const email = assigning[id];
      const res = await fetch(`${baseApi}/api/property/landlord/assign-tenant`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${auth.accessToken}`,
        },
        body: JSON.stringify({ propertyId: id, email }),
      });

      const data = await res.json(); console.log(data);
      
       if (!res.ok) {
          setError(data.message || 'Could not load properties');
          return;
        }
      alert('Tenant assigned successfully');
      setAssigning((prev) => ({ ...prev, [id]: null }));
    } catch (err) { console.log(err);
    
      alert(err.message || 'Assignment failed');
    }
  };

  return (
    <div className="max-w-4xl mx-auto mt-10 p-4">
      <h2 className="text-2xl font-semibold mb-6">🏠 My Properties</h2>
      {error && <p className="text-red-600">{error}</p>}

      {properties.length === 0 ? (
        <p className="text-gray-600">No properties found.</p>
      ) : (
        <div className="space-y-6">
          {properties.map((prop) => (
            <div
              key={prop._id}
              className="border rounded shadow p-4 bg-white flex flex-col gap-2"
            >
              <h3 className="text-lg font-bold text-gray-800">{prop.title}</h3>
              <p><strong>Name:</strong> {prop.name}</p>
              <p><strong>Address:</strong> {prop.address}</p>
              <p><strong>Rent:</strong> ₹{prop.amount}</p>
              <p><strong>Total Tenants:</strong> {prop.tenantIds?.length || 0}</p>

              {assigning[prop._id] === null ? null : assigning[prop._id] !== undefined ? (
                <div className="flex flex-col sm:flex-row gap-2 mt-3">
                  <input
                    type="email"
                    placeholder="Tenant email"
                    value={assigning[prop._id]}
                    onChange={(e) => handleEmailChange(prop._id, e.target.value)}
                    className="border px-3 py-2 rounded w-full sm:w-auto"
                  />
                  <button
                    onClick={() => handleAssign(prop._id)}
                    className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded"
                  >
                    ✅ Submit
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => handleToggle(prop._id)}
                  className="mt-4 bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded w-max"
                >
                  ➕ Assign New Tenant
                </button>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default PropertyList;

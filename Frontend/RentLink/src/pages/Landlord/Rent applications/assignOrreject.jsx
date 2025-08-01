import React, { useEffect, useState } from 'react';
import axios from 'axios';

const MyProperties = () => {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchProperties = async () => {
    try {
      const { data } = await axios.get('/api/properties/mine');
      setProperties(data.properties);
    } catch (err) {
      console.error(err);
      alert('Failed to load properties');
    } finally {
      setLoading(false);
    }
  };

  const handleAction = async (propertyId, userId, action) => {
    try {
      await axios.patch('/api/properties/tenant-action', {
        propertyId,
        userId,
        action,
      });
      fetchProperties(); // reload after action
    } catch (err) {
      console.error(err);
      alert('Action failed');
    }
  };

  useEffect(() => {
    fetchProperties();
  }, []);

  if (loading) return <p>Loading properties...</p>;

  return (
    <div>
      <h2>My Properties</h2>
      {properties.length === 0 ? (
        <p>No properties found.</p>
      ) : (
        properties.map((prop) => (
          <div key={prop._id} style={{ border: '1px solid #ccc', margin: '20px 0', padding: '10px' }}>
            <h3>{prop.title}</h3>
            <p>{prop.address}</p>

            <strong>✅ Assigned Tenants:</strong>
            <ul>
              {prop.tenantIds.map((user) => (
                <li key={user._id}>{user.name || user.email}</li>
              ))}
            </ul>

            <strong>⏳ Pending Users:</strong>
            <ul>
              {prop.pending.map((user) => (
                <li key={user._id}>
                  {user.name || user.email}{' '}
                  <button onClick={() => handleAction(prop._id, user._id, 'assign')}>Assign</button>{' '}
                  <button onClick={() => handleAction(prop._id, user._id, 'reject')}>Reject</button>
                </li>
              ))}
            </ul>

            <strong>❌ Rejected Users:</strong>
            <ul>
              {prop.rejected.map((user) => (
                <li key={user._id}>{user.name || user.email}</li>
              ))}
            </ul>
          </div>
        ))
      )}
    </div>
  );
};

export default MyProperties;

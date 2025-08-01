import { useAuth } from '../../../context/AuthContext';
import baseApi from '../../../utils/baseApi';
import { Home, CheckCircle, UserPlus, User, Mail, Phone, Languages } from 'lucide-react';
import React, { useEffect, useState } from 'react';


export const PropertyList = () => {
  const { auth } = useAuth();
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(false);
  const [emailInputs, setEmailInputs] = useState({});

  const fetchProperties = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${baseApi}/api/property/landlord/my-properties`, {
        headers: {
          Authorization: `Bearer ${auth.accessToken}`,
        },
      });
      const data = await res.json();
      console.log(data);
      
      setProperties(data.properties || []);
    } catch (err) {
      console.error('Failed to fetch properties:', err);
    }
    setLoading(false);
  };

  const handleAction = async ({ propertyId, userId, email, action }) => {
    try {
      const res = await fetch(`${baseApi}/api/property/landlord/assign-reject-tenant`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${auth.accessToken}`,
        },
        body: JSON.stringify({ propertyId, userId, email, action }),
      });

      const result = await res.json();
      if (res.ok) {
        fetchProperties();
        setEmailInputs((prev) => ({ ...prev, [propertyId]: '' }));
      } else {
        alert(result.message || 'Failed to update');
      }
    } catch (error) {
      console.error('Action failed:', error);
    }
  };

  useEffect(() => {
    fetchProperties();
  }, []);

  if (loading) return <div className="loading-container"><p className="loading-text">Loading properties...</p></div>;

  return (
    <div className="property-list-container">
      <div className="property-list-header">
        <Home className="header-icon" size={32} />
        <h2 className="main-title">My Properties</h2>
        <div className="properties-count">{properties.length} Properties</div>
      </div>
      
      {properties.length === 0 ? (
        <div className="no-properties">
          <p className="no-properties-text">No properties found.</p>
        </div>
      ) : (
        properties.map((prop) => (
          <div key={prop._id} className="property-card">
            <div className="property-image-section">
              <img src={prop.medias[0]} alt="property" className="property-image" />
              <div className="rent-overlay">₹{prop.rent.toLocaleString()}/month</div>
            </div>
            
            <div className="property-info">
              <h3 className="property-title">{prop.title}</h3>
              <p className="property-address"><strong>Address:</strong> {prop.address}</p>
              <p className="property-description"><strong>Description:</strong> {prop.description}</p>
              <p className="property-rent"><strong>Rent:</strong> ₹{prop.rent}</p>
            </div>

            {/* Pending Requests */}
            <div className="section pending-section">
              <h4 className="section-title pending-title">
                <UserPlus size={20} />
                Pending Requests
                {prop.pendingDetails?.length > 0 && (
                  <span className="count-badge">{prop.pendingDetails.length}</span>
                )}
              </h4>
              <div className="section-content">
                {prop.pendingDetails?.length > 0 ? (
                  prop.pendingDetails.map((user) => (
                    <div key={user._id} className="user-card pending-user">
                      <div className="user-info">
                        <p className="user-detail">
                          <User size={16} />
                          <strong>Name:</strong> {user.name}
                        </p>
                        <p className="user-detail">
                          <Mail size={16} />
                          <strong>Email:</strong> {user.email}
                        </p>
                        <p className="user-detail">
                          <Phone size={16} />
                          <strong>Phone:</strong> {user.contactInfo || 'N/A'}
                        </p>
                        <p className="user-detail">
                          <Languages size={16} />
                          <strong>Language:</strong> {user.language}
                        </p>
                      </div>
                      <div className="action-buttons">
                        <button 
                          className="btn accept-btn"
                          onClick={() => handleAction({ propertyId: prop._id, userId: user._id, action: 'assign' })}
                        >
                          <CheckCircle size={16} />
                          Accept
                        </button>
                        <button
                          className="btn reject-btn"
                          onClick={() => handleAction({ propertyId: prop._id, userId: user._id, action: 'reject' })}
                        >
                          Reject
                        </button>
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="empty-state">No pending requests.</p>
                )}
              </div>
            </div>

            {/* Add Tenant by Email */}
            <div className="section manual-assign-section">
              <h4 className="section-title manual-title">
                <Mail size={20} />
                Assign by Email (Manual)
              </h4>
              <div className="manual-assign-form">
                <input
                  type="email"
                  placeholder="Enter user email"
                  value={emailInputs[prop._id] || ''}
                  onChange={(e) => setEmailInputs((prev) => ({ ...prev, [prop._id]: e.target.value }))}
                  className="email-input"
                />
                <button
                  className="btn assign-btn"
                  onClick={() =>
                    handleAction({
                      propertyId: prop._id,
                      email: emailInputs[prop._id],
                      action: 'assign',
                    })
                  }
                >
                  Assign
                </button>
              </div>
            </div>

            {/* Approved Tenants */}
            <div className="section approved-section">
              <h4 className="section-title approved-title">
                <CheckCircle size={20} />
                Approved Tenants
                {prop.tenantDetails?.length > 0 && (
                  <span className="count-badge approved-badge">{prop.tenantDetails.length}</span>
                )}
              </h4>
              <div className="section-content">
                {prop.tenantDetails?.length > 0 ? (
                  prop.tenantDetails.map((user) => (
                    <div key={user._id} className="user-card approved-user">
                      <div className="user-info">
                        <p className="user-detail">
                          <User size={16} />
                          <strong>Name:</strong> {user.name}
                        </p>
                        <p className="user-detail">
                          <Mail size={16} />
                          <strong>Email:</strong> {user.email}
                        </p>
                        <p className="user-detail">
                          <Phone size={16} />
                          <strong>Phone:</strong> {user.contactInfo || 'N/A'}
                        </p>
                        <p className="user-detail">
                          <Languages size={16} />
                          <strong>Language:</strong> {user.language}
                        </p>
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="empty-state">No tenants assigned yet.</p>
                )}
              </div>
            </div>

            {/* Rejected Users */}
            <div className="section rejected-section">
              <h4 className="section-title rejected-title">
                <User size={20} />
                Rejected Applicants
                {prop.rejectedDetails?.length > 0 && (
                  <span className="count-badge rejected-badge">{prop.rejectedDetails.length}</span>
                )}
              </h4>
              <div className="section-content">
                {prop.rejectedDetails?.length > 0 ? (
                  prop.rejectedDetails.map((user) => (
                    <div key={user._id} className="user-card rejected-user">
                      <div className="user-info">
                        <p className="user-detail">
                          <User size={16} />
                          <strong>Name:</strong> {user.name}
                        </p>
                        <p className="user-detail">
                          <Mail size={16} />
                          <strong>Email:</strong> {user.email}
                        </p>
                        <p className="user-detail">
                          <Phone size={16} />
                          <strong>Phone:</strong> {user.contactInfo || 'N/A'}
                        </p>
                        <p className="user-detail">
                          <Languages size={16} />
                          <strong>Language:</strong> {user.language}
                        </p>
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="empty-state">No rejections.</p>
                )}
              </div>
            </div>
          </div>
        ))
      )}
      <style>{`
  .property-list-container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 1rem;
    font-family: 'Segoe UI', system-ui, sans-serif;
  }

  .property-list-header {
    display: flex;
    align-items: center;
    gap: 1rem;
    margin-bottom: 1.5rem;
    padding-bottom: 0.5rem;
    border-bottom: 1px solid #e2e8f0;
  }

  .header-icon {
    color: #4f46e5;
  }

  .main-title {
    font-size: 1.5rem;
    font-weight: 600;
    color: #1a202c;
    margin: 0;
  }

  .properties-count {
    background: #e2e8f0;
    color: #4a5568;
    padding: 0.25rem 0.75rem;
    border-radius: 9999px;
    font-size: 0.875rem;
    font-weight: 500;
  }

  .no-properties {
    text-align: center;
    padding: 2rem;
    background: #f8fafc;
    border-radius: 0.5rem;
    color: #64748b;
  }

  .property-card {
  border:2px solid;
    display: grid;
    grid-template-columns: 300px 1fr;
    gap: 1.5rem;
    background: white;
    border-radius: 0.75rem;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
    padding: 1.5rem;
    margin-bottom: 1.5rem;
    transition: transform 0.2s;
  }

  .property-card:hover {
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  }

  .property-image-section {
    position: relative;
    height: 200px;
    border-radius: 0.5rem;
    overflow: hidden;
  }

  .property-image {
    width: 100%;
    height: 100%;
    object-fit: cover;
    border:1px solid gray;
  }

  .rent-overlay {
    position: absolute;
    bottom: 0;
    left: 0;
    background: rgba(0, 0, 0, 0.7);
    color: white;
    padding: 0.5rem 1rem;
    border-top-right-radius: 0.5rem;
    font-weight: 600;
  }

  .property-info {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  }

  .property-title {
    font-size: 1.25rem;
    font-weight: 600;
    margin: 0;
    color: #1e293b;
  }

  .property-address,
  .property-description,
  .property-rent {
    margin: 0;
    font-size: 0.875rem;
    color: #475569;
  }

  .property-rent {
    font-weight: 600;
    color: #4f46e5;
  }

  .section {
    grid-column: span 2;
    background: #f8fafc;
    border-radius: 0.5rem;
    padding: 1rem;
  }

  .section-title {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    font-size: 1rem;
    font-weight: 600;
    margin: 0 0 0.75rem 0;
    color: #1e293b;
  }

  .count-badge {
    background: #e2e8f0;
    color: #4a5568;
    font-size: 0.75rem;
    padding: 0.15rem 0.5rem;
    border-radius: 9999px;
    margin-left: 0.5rem;
  }

  .approved-badge {
    background: #dcfce7;
    color: #166534;
  }

  .rejected-badge {
    background: #fee2e2;
    color: #991b1b;
  }

  .section-content {
    max-height: 200px;
    overflow-y: auto;
    padding-right: 0.5rem;
  }

  .section-content::-webkit-scrollbar {
    width: 4px;
  }

  .section-content::-webkit-scrollbar-track {
    background: #f1f1f1;
  }

  .section-content::-webkit-scrollbar-thumb {
    background: #cbd5e1;
    border-radius: 4px;
  }

  .user-card {
    display: grid;
    grid-template-columns: 1fr auto;
    gap: 1rem;
    padding: 0.75rem;
    margin-bottom: 0.75rem;
    background: white;
    border-radius: 0.5rem;
    box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
  }

  .pending-user {
    border-left: 3px solid #f59e0b;
  }

  .approved-user {
    border-left: 3px solid #10b981;
  }

  .rejected-user {
    border-left: 3px solid #ef4444;
  }

  .user-info {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 0.5rem;
  }

  .user-detail {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    margin: 0;
    font-size: 0.8125rem;
    color: #475569;
  }

  .action-buttons {
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }

  .btn {
    padding: 0.375rem 0.75rem;
    border-radius: 0.375rem;
    font-size: 0.8125rem;
    font-weight: 500;
    cursor: pointer;
    display: flex;
    align-items: center;
    gap: 0.25rem;
    border: none;
    transition: all 0.2s;
  }

  .accept-btn {
    background: #10b981;
    color: white;
  }

  .accept-btn:hover {
    background: #059669;
  }

  .reject-btn {
    background: #ef4444;
    color: white;
  }

  .reject-btn:hover {
    background: #dc2626;
  }

  .assign-btn {
    background: #4f46e5;
    color: white;
  }

  .assign-btn:hover {
    background: #4338ca;
  }

  .manual-assign-form {
    display: flex;
    gap: 0.5rem;
  }

  .email-input {
    flex: 1;
    padding: 0.5rem;
    border: 1px solid #cbd5e1;
    border-radius: 0.375rem;
    font-size: 0.875rem;
  }

  .email-input:focus {
    outline: none;
    border-color: #4f46e5;
    box-shadow: 0 0 0 1px #4f46e5;
  }

  .empty-state {
    margin: 0;
    padding: 0.5rem;
    font-size: 0.875rem;
    color: #64748b;
    text-align: center;
  }

  @media (max-width: 768px) {
    .property-card {
      grid-template-columns: 1fr;
    }

    .property-image-section {
      height: 180px;
    }

    .user-info {
      grid-template-columns: 1fr;
    }

    .action-buttons {
      flex-direction: column;
      align-items: flex-end;
    }
  }

  @media (max-width: 480px) {
    .manual-assign-form {
      flex-direction: column;
    }
  }
`}</style>
    </div>
  );
};

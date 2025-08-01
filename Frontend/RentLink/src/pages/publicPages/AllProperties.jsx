import React, { useEffect, useState } from 'react';
import baseApi from '../../utils/baseApi';
import { useAuth } from '../../context/AuthContext';
import { MapPin, CheckCircle, Loader2 } from 'lucide-react';


export const AllProperties = () => {
  const { auth } = useAuth();
  const [properties, setProperties] = useState([]);
  const [appliedIds, setAppliedIds] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchAllProperties = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${baseApi}/api/property/`);
      const data = await res.json();
      setProperties(data || []);
    } catch (err) {
      console.error('Failed to fetch properties:', err);
    }
    setLoading(false);
  };

  const applyForRent = async (propertyId) => {
    try {
      if (!auth || !auth.accessToken) {
        alert('please login as tenant');
        return;
      }
      const res = await fetch(`${baseApi}/api/property/tenant/apply-rent/${propertyId}`, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${auth.accessToken}`,
        },
      });

      const data = await res.json();
      if (res.ok) {
        alert('Applied successfully');
        setAppliedIds((prev) => [...prev, propertyId]);
      } else {
        alert(data.message || 'Could not apply');
      }
    } catch (err) {
      console.error('Apply failed:', err);
    }
  };

  useEffect(() => {
    fetchAllProperties();
  }, []);

  if (loading) return (
    <div className="loading">
      <Loader2 className="loading-icon" />
      Loading properties...
    </div>
  );

  return (
    <div className="properties-container">
      <div className="properties-header">
        <h2>Available Properties</h2>
        <div className="properties-count">
          {properties.filter((prop) => !prop.isRented).length} properties available
        </div>
      </div>
      
      {properties.length === 0 ? (
        <div className="no-properties">
          <p>No properties available.</p>
        </div>
      ) : (
        <div className="properties-grid">
          {properties
            .filter((prop) => !prop.isRented)
            .map((prop) => (
              <div key={prop._id} className="property-card">
                <div className="property-image-container">
                  <img
                    src={prop.medias?.[0]}
                    alt="property"
                    className="property-image"
                  />
                  <div className="rent-badge">₹{prop.rent}/month</div>
                </div>
                
                <div className="property-content">
                  <h3 className="property-title">{prop.title}</h3>
                  <p className="property-address">
                    <MapPin className="address-icon" size={16} />
                    {prop.address}
                  </p>
                  <p className="property-description">{prop.description}</p>
                  
                  <div className="property-footer">
                    <button
                      onClick={() => applyForRent(prop._id)}
                      disabled={appliedIds.includes(prop._id)}
                      className={`apply-btn ${appliedIds.includes(prop._id) ? 'applied' : ''}`}
                    >
                      {appliedIds.includes(prop._id) ? (
                        <>
                          <CheckCircle size={16} />
                          Applied
                        </>
                      ) : (
                        'Apply to Rent'
                      )}
                    </button>
                  </div>
                </div>
              </div>
            ))}
        </div>
      )}
      <style>{`/* Properties Container */
.properties-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
}

/* Header */
.properties-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
  padding-bottom: 16px;
  border-bottom: 1px solid #e5e5e5;
}

.properties-header h2 {
  font-size: 28px;
  font-weight: 700;
  color: #1a1a1a;
  margin: 0;
}

.properties-count {
  font-size: 14px;
  color: #666;
  background: #f8f9fa;
  padding: 6px 12px;
  border-radius: 20px;
}

/* Loading */
.loading {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 40px;
  color: #666;
  font-size: 16px;
}

.loading-icon {
  margin-right: 8px;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}

/* No Properties */
.no-properties {
  text-align: center;
  padding: 60px 20px;
  color: #666;
  font-size: 16px;
}

/* Properties Grid */
.properties-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  gap: 20px;
}

/* Property Card */
.property-card {
  background: #fff;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
  overflow: hidden;
  transition: all 0.3s ease;
  border: 1px solid #f0f0f0;
}

.property-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.12);
}

/* Property Image */
.property-image-container {
  position: relative;
  height: 200px;
  overflow: hidden;
}

.property-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s ease;
}

.property-card:hover .property-image {
  transform: scale(1.05);
}

.rent-badge {
  position: absolute;
  top: 12px;
  right: 12px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  padding: 6px 12px;
  border-radius: 20px;
  font-weight: 600;
  font-size: 14px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
}

/* Property Content */
.property-content {
  padding: 20px;
}

.property-title {
  font-size: 18px;
  font-weight: 600;
  color: #1a1a1a;
  margin: 0 0 8px 0;
  line-height: 1.3;
}

.property-address {
  display: flex;
  align-items: center;
  color: #666;
  font-size: 14px;
  margin: 0 0 12px 0;
}

.address-icon {
  margin-right: 6px;
  color: #999;
}

.property-description {
  color: #555;
  font-size: 14px;
  line-height: 1.5;
  margin: 0 0 20px 0;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

/* Property Footer */
.property-footer {
  display: flex;
  justify-content: flex-end;
}

/* Apply Button */
.apply-btn {
  display: flex;
  align-items: center;
  gap: 6px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  min-width: 120px;
  justify-content: center;
}

.apply-btn:hover:not(:disabled) {
  transform: translateY(-1px);
  box-shadow: 0 4px 12px rgba(102, 126, 234, 0.4);
}

.apply-btn:active:not(:disabled) {
  transform: translateY(0);
}

.apply-btn.applied {
  background: linear-gradient(135deg, #4ade80 0%, #22c55e 100%);
  cursor: default;
}

.apply-btn:disabled {
  opacity: 0.9;
}

/* Responsive Design */
@media (max-width: 768px) {
  .properties-container {
    padding: 16px;
  }
  
  .properties-header {
    flex-direction: column;
    align-items: flex-start;
    gap: 12px;
  }
  
  .properties-header h2 {
    font-size: 24px;
  }
  
  .properties-grid {
    grid-template-columns: 1fr;
    gap: 16px;
  }
  
  .property-content {
    padding: 16px;
  }
}`}</style>
    </div>
  );
};

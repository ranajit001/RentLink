import { useEffect, useState } from "react";
import baseApi from "../../utils/baseApi";
import { useAuth } from "../../context/AuthContext";

export const RejectedAndPendingProperties = () => {
  const { auth } = useAuth();
  const [state, setState] = useState({
    rejected: [],
    pending: [],
    loading: false,
    error: null,
  });

  useEffect(() => {
    const fetchProps = async () => {
      try {
        setState((prev) => ({ ...prev, loading: true }));
        const res = await fetch(`${baseApi}/api/property/tenant/pending-or-rejected-applications`, {
          headers: {
            Authorization: `Bearer ${auth.accessToken}`,
          },
        });
        const data = await res.json();
        setState({ ...state, ...data.properties, loading: false });
      } catch (error) {
        setState({ ...state, error: error.message, loading: false });
      }
    };

    fetchProps();
  }, [auth.accessToken]);

  if (state.loading) return <h2 className="loading">Loading...</h2>;
  if (state.error) return <h2 className="error">{state.error}</h2>;

  // Updated renderCard with classNames and badge
  const renderCard = (el, type) => (
    <div className={`property-card ${type}`} key={el._id}>
      <img src={el.medias[0]} alt={el.title} />
      <div className="card-body">
        <h3>{el.title}</h3>
        <p><strong>Address:</strong> {el.address}</p>
        <p><strong>Rent:</strong> ₹{el.rent}</p>
        <h4>Landlord Info</h4>
        <p><strong>Name:</strong> {el.landlordId?.name}</p>
        <p><strong>Contact:</strong> {el.landlordId?.contactInfo}</p>
      </div>
      <div className={`status-badge ${type}`}>
        {type === 'pending' ? 'Pending' : 'Rejected'}
      </div>
    </div>
  );

  return (
    <div className="property-section">
      <h2>Pending Applications</h2>
      <div className="property-grid">
        {state.pending.length === 0 ? (
          <p className="empty-msg">No pending applications.</p>
        ) : (
          state.pending.map((el) => renderCard(el, 'pending'))
        )}
      </div>

      <h2>Rejected Applications</h2>
      <div className="property-grid">
        {state.rejected.length === 0 ? (
          <p className="empty-msg">No rejected applications.</p>
        ) : (
          state.rejected.map((el) => renderCard(el, 'rejected'))
        )}
      </div>
      <style>{`
       .property-section {
  padding: 1.5rem 2rem;
  font-family: 'Segoe UI', sans-serif;
  background-color: #f4f6f8;
}

/* Section Titles */
.property-section > h2 {
  color: #2c3e50;
  margin-top: 2rem;
  font-weight: 700;
  border-bottom: 2px solid #ddd;
  padding-bottom: 0.25rem;
}

/* Loading and error */
.loading, .error {
  text-align: center;
  color: #555;
  font-size: 1.5rem;
}

/* Empty messages */
.empty-msg {
  padding: 1rem;
  text-align: center;
  color: #888;
  font-style: italic;
}

/* Grid layout - more compact */
.property-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
  gap: 1rem;
  margin-top: 1rem;
}

/* Base styles for property cards */
.property-card {
  background-color: #fff;
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 0 1.5px 10px rgba(0,0,0,0.07);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  max-width: 260px;
  margin: 0 auto;
  cursor: default;
  display: flex;
  flex-direction: column;
  height: 250px; /* Reduced height for compactness */
  position: relative;
}

.property-card:hover {
  transform: translateY(-6px);
  box-shadow: 0 8px 20px rgba(0,0,0,0.2);
}

/* Image styling */
.property-card img {
  width: 100%;
  height: 130px;  /* Reduced image height */
  object-fit: cover;
  border-bottom: 1px solid #eee;
}

/* Body padding and typography */
.card-body {
  flex: 1;
  padding: 0.75rem 1rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.card-body h3 {
  font-size: 1.1rem;
  color: #34495e;
  margin: 0 0 0.3rem 0;
  font-weight: 700;
  line-height: 1.2;
}

.card-body h4 {
  font-size: 0.95rem;
  margin: 0.8rem 0 0.35rem 0;
  color: #2980b9;
  font-weight: 600;
  letter-spacing: 0.02em;
}

.card-body p {
  font-size: 0.85rem;
  color: #555;
  margin: 0.22rem 0;
  line-height: 1.3;
  word-wrap: break-word;
}

.card-body p strong {
  color: #2c3e50;
  font-weight: 600;
}

/* Distinguish between pending and rejected */

/* Pending card highlight */
.property-card.pending {
  border-left: 5px solid #3498db; /* Bright blue side border */
  background-color: #eaf4fc;
}

.property-card.pending .card-body h4 {
  color: #2980b9;
}

/* Rejected card highlight */
.property-card.rejected {
  border-left: 5px solid #e74c3c; /* Bright red side border */
  background-color: #fdecea;
}

.property-card.rejected .card-body h4 {
  color: #c0392b;
}

/* Status badge (top-right corner) */
.status-badge {
  position: absolute;
  top: 12px;
  right: 12px;
  padding: 4px 9px;
  border-radius: 12px;
  font-size: 0.75rem;
  font-weight: 700;
  color: white;
  user-select: none;
  box-shadow: 0 2px 6px rgba(0,0,0,0.2);
  text-transform: uppercase;
}

/* Different badge colors */
.status-badge.pending {
  background: #3498db;
}

.status-badge.rejected {
  background: #e74c3c;
}

/* Responsive tweaks */
@media (max-width: 480px) {
  .property-grid {
    grid-template-columns: repeat(auto-fill, minmax(160px, 1fr));
    gap: 0.8rem;
  }

  .property-card {
    max-width: 180px;
    height: 210px;
  }

  .property-card img {
    height: 110px;
  }

  .card-body h3 {
    font-size: 1rem;
  }

  .card-body h4 {
    font-size: 0.85rem;
  }

  .card-body p {
    font-size: 0.75rem;
  }

  .status-badge {
    padding: 3px 7px;
    font-size: 0.65rem;
  }
}
      `}</style>
    </div>
  );
};

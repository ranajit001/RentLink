import React, { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import baseApi from "../../utils/baseApi";
import {
  Home,
  MapPin,
  X,
  Plus,
  MessageCircle,
  Paperclip,
  Eye,
  EyeOff,
  Wrench,
} from "lucide-react";

export const MaintenanceRequests = () => {
  const { auth } = useAuth();
  const [rents, setRents] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showFormFor, setShowFormFor] = useState(null);
  const [showListFor, setShowListFor] = useState(null);
  const [formInputs, setFormInputs] = useState({
    category: "general",
    urgency: "medium",
    description: "",
    medias: [],
  });
  const [pastRequests, setPastRequests] = useState({});

  useEffect(() => {
    fetchRents();
  }, []);

  async function fetchRents() {
    try {
      setLoading(true);
      const res = await fetch(`${baseApi}/api/rent/tenant`, {
        headers: { Authorization: `Bearer ${auth.accessToken}` },
      });
      const data = await res.json();
      setRents(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  function openForm(propertyId) {
    setFormInputs({ category: "general", urgency: "medium", description: "", medias: [] });
    setShowFormFor(propertyId);
  }

  async function submitRequest(e) {
    e.preventDefault();
    const propertyId = showFormFor;
    const formData = new FormData();
    formData.append("propertyId", propertyId);
    formData.append("category", formInputs.category);
    formData.append("urgency", formInputs.urgency);
    formData.append("description", formInputs.description);
    formInputs.medias.forEach((file) => formData.append("medias", file));

    try {
      const res = await fetch(`${baseApi}/api/maintenance/tenant/create`, {
        method: "POST",
        headers: { Authorization: `Bearer ${auth.accessToken}` },
        body: formData,
      });
      const data = await res.json();
      if (res.ok) {
        if (showListFor === propertyId) fetchRequests(propertyId);
        setShowFormFor(null);
      }
      alert(data.message);
    } catch (err) {
      console.error(err);
      alert("Error submitting request");
    }
  }

  async function fetchRequests(propertyId) {
    try {
      const res = await fetch(`${baseApi}/api/maintenance/tenant/${propertyId}`, {
        headers: { Authorization: `Bearer ${auth.accessToken}` },
      });
      const data = await res.json();
      const list = data.requests?.[0]?.requests || [];
      setPastRequests((p) => ({ ...p, [propertyId]: list }));
      setShowListFor(propertyId);
    } catch (err) {
      console.error(err);
      alert("Error fetching past requests");
    }
  }

  if (loading) return <div className="loading">Loading...</div>;

  return (
    <div className="container">
      <h1>Maintenance Requests</h1>
      
      <div className="properties">
        {rents.map((rent) => {
          const pid = rent.propertyId._id;
          const requestCount = pastRequests[pid]?.length || 0;
          
          return (
            <div key={rent._id} className="property">
              <div className="property-info">
                <h3><Home size={16} /> {rent.propertyId.title}</h3>
                <p><MapPin size={14} /> {rent.propertyId.address}</p>
                <span className="rent">₹{rent.rent}</span>
              </div>
              
              <div className="actions">
                <button className="btn primary" onClick={() => openForm(pid)}>
                  <Plus size={14} /> New
                </button>
                <button 
                  className="btn secondary"
                  onClick={() => showListFor === pid ? setShowListFor(null) : fetchRequests(pid)}
                >
                  {showListFor === pid ? <EyeOff size={14} /> : <Eye size={14} />}
                  {showListFor === pid ? 'Hide' : `View (${requestCount})`}
                </button>
              </div>

              {/* Requests List */}
              {showListFor === pid && (
                <div className="requests">
                  {pastRequests[pid]?.length > 0 ? (
                    pastRequests[pid].map((r) => (
                      <div key={r._id} className="request">
                        <div className="request-header">
                          <span className="category">{r.category}</span>
                          <span className={`status ${r.status}`}>{r.status}</span>
                        </div>
                        <p>{r.description}</p>
                        <div className="meta">
                          {r.medias && r.medias.length > 0 && (
                            <span><Paperclip size={12} /> {r.medias.length} files</span>
                          )}
                          {r.messages && r.messages.length > 0 && (
                            <span><MessageCircle size={12} /> {r.messages.length} messages</span>
                          )}
                          <small>{new Date(r.createdAt).toLocaleDateString()}</small>
                        </div>
                        
                        {/* Messages */}
                        {r.messages && r.messages.length > 0 && (
                          <div className="messages">
                            <strong>Messages:</strong>
                            {r.messages.map((msg, idx) => (
                              <div key={idx} className={`message ${msg.split(' ')[0]}`}>
                                <strong>{msg.split(' ')[0] == 'tenant' ? 'You' : 'Landlord'}:</strong>
                                <span>{msg.split(' ')[1]}</span>
                                <small>{new Date(msg.timestamp).toLocaleString()}</small>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    ))
                  ) : (
                    <p className="empty">No requests yet</p>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Form Modal */}
      {showFormFor && (
        <div className="modal">
          <div className="modal-content">
            <div className="modal-header">
              <h3>New Request</h3>
              <button onClick={() => setShowFormFor(null)}><X size={18} /></button>
            </div>
            
            <form onSubmit={submitRequest}>
              <div className="form-row">
                <select
                  value={formInputs.category}
                  onChange={(e) => setFormInputs(f => ({ ...f, category: e.target.value }))}
                >
                  <option value="plumbing">Plumbing</option>
                  <option value="electrical">Electrical</option>
                  <option value="general">General</option>
                  <option value="other">Other</option>
                </select>
                
                <select
                  value={formInputs.urgency}
                  onChange={(e) => setFormInputs(f => ({ ...f, urgency: e.target.value }))}
                >
                  <option value="low">Low</option>
                  <option value="medium">Medium</option>
                  <option value="high">High</option>
                </select>
              </div>

              <textarea
                required
                placeholder="Describe the issue..."
                value={formInputs.description}
                onChange={(e) => setFormInputs(f => ({ ...f, description: e.target.value }))}
              />

              <input
                type="file"
                multiple
                accept="image/*,video/*"
                onChange={(e) => setFormInputs(f => ({ ...f, medias: Array.from(e.target.files) }))}
              />

              <button type="submit" className="btn primary full">
                <Plus size={16} /> Submit Request
              </button>
            </form>
          </div>
        </div>
      )}

      <style>{`
        .container {
          max-width: 900px;
          margin: 0 auto;
          padding: 20px;
        }

        h1 {
          text-align: center;
          margin-bottom: 30px;
          color: #333;
        }

        .loading {
          text-align: center;
          padding: 50px;
          color: #666;
        }

        .properties {
          display: flex;
          flex-direction: column;
          gap: 20px;
        }

        .property {
          background: white;
          border: 1px solid #ddd;
          border-radius: 8px;
          padding: 20px;
        }

        .property-info {
          margin-bottom: 15px;
        }

        .property-info h3 {
          display: flex;
          align-items: center;
          gap: 8px;
          margin: 0 0 5px 0;
          color: #333;
        }

        .property-info p {
          display: flex;
          align-items: center;
          gap: 6px;
          margin: 0 0 5px 0;
          color: #666;
        }

        .rent {
          font-weight: bold;
          color: #007bff;
        }

        .actions {
          display: flex;
          gap: 10px;
          margin-bottom: 15px;
        }

        .btn {
          display: flex;
          align-items: center;
          gap: 6px;
          padding: 8px 16px;
          border: none;
          border-radius: 4px;
          cursor: pointer;
          font-size: 14px;
        }

        .btn.primary {
          background: #007bff;
          color: white;
        }

        .btn.secondary {
          background: #6c757d;
          color: white;
        }

        .btn.full {
          width: 100%;
          justify-content: center;
        }

        .btn:hover {
          opacity: 0.9;
        }

        .requests {
          border-top: 1px solid #eee;
          padding-top: 15px;
        }

        .request {
          background: #f8f9fa;
          border: 1px solid #dee2e6;
          border-radius: 4px;
          padding: 15px;
          margin-bottom: 10px;
        }

        .request-header {
          display: flex;
          justify-content: space-between;
          margin-bottom: 8px;
        }

        .category {
          background: #e9ecef;
          padding: 2px 6px;
          border-radius: 3px;
          font-size: 12px;
          text-transform: uppercase;
        }

        .status {
          padding: 2px 6px;
          border-radius: 3px;
          font-size: 12px;
          text-transform: uppercase;
        }

        .status.pending { background: #fff3cd; color: #856404; }
        .status.completed { background: #d1edff; color: #0c5460; }
        .status.in-progress { background: #cce5ff; color: #004085; }

        .meta {
          display: flex;
          gap: 15px;
          margin-top: 8px;
          font-size: 12px;
          color: #666;
        }

        .meta span {
          display: flex;
          align-items: center;
          gap: 4px;
        }

        .messages {
          margin-top: 10px;
          padding-top: 10px;
          border-top: 1px solid #dee2e6;
        }

        .message {
          background: white;
          padding: 8px;
          margin: 5px 0;
          border-radius: 4px;
          border-left: 3px solid #007bff;
        }

        .message.landlord {
          border-left-color: #28a745;
        }

        .message strong {
          display: block;
          font-size: 11px;
          color: #666;
          text-transform: uppercase;
        }

        .message small {
          display: block;
          color: #999;
          margin-top: 4px;
        }

        .empty {
          text-align: center;
          color: #666;
          padding: 20px;
        }

        .modal {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0,0,0,0.5);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 1000;
        }

        .modal-content {
          background: white;
          border-radius: 8px;
          padding: 20px;
          width: 90%;
          max-width: 500px;
        }

        .modal-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 20px;
        }

        .modal-header button {
          background: none;
          border: none;
          cursor: pointer;
        }

        .form-row {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 10px;
          margin-bottom: 15px;
        }

        select, textarea, input {
          padding: 10px;
          border: 1px solid #ddd;
          border-radius: 4px;
          margin-bottom: 15px;
        }

        textarea {
          min-height: 80px;
          resize: vertical;
        }

        @media (max-width: 768px) {
          .container {
            padding: 15px;
          }
          
          .actions {
            flex-direction: column;
          }
          
          .form-row {
            grid-template-columns: 1fr;
          }
          
          .meta {
            flex-direction: column;
            gap: 5px;
          }
        }
      `}</style>
    </div>
  );
};



























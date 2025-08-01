import React, { useEffect, useState } from "react";
import { useAuth } from "../../../context/AuthContext";
import baseApi from "../../../utils/baseApi";
import {
  Image,
  Home,
  MapPin,
  Clock,
  AlertTriangle,
  CheckCircle,
  User,
  Phone,
  Mail,
  Calendar,
  MessageCircle,
  Paperclip,
  Filter,
  Search,
  Eye,
  EyeOff,
  Settings,
  Zap,
  Axe,
  Wrench,
  TrendingUp,
  AlertCircle,
  X,
  Edit3,
  Send,
  Save,
} from "lucide-react";

export const LandlordMaintenanceHub = () => {
  const { auth } = useAuth();
  const [propertiesData, setPropertiesData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [expandedProperty, setExpandedProperty] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [filterUrgency, setFilterUrgency] = useState("all");
  
  // Update request modal states
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [updateForm, setUpdateForm] = useState({
    status: "",
    message: ""
  });
  const [updating, setUpdating] = useState(false);

  useEffect(() => {
    fetchMaintenanceRequests();
  }, []);

  async function fetchMaintenanceRequests() {
    try {
      setLoading(true);
      const res = await fetch(`${baseApi}/api/maintenance/landlord`, {
        headers: { Authorization: `Bearer ${auth.accessToken}` },
      });
      const data = await res.json();
      setPropertiesData(data.data || []);
    } catch (err) {
      console.error("Error fetching maintenance requests:", err);
    } finally {
      setLoading(false);
    }
  }

  const openUpdateModal = (request) => {
    setSelectedRequest(request);
    setUpdateForm({
      status: request.status,
      message: ""
    });
    setShowUpdateModal(true);
  };

  const closeUpdateModal = () => {
    setShowUpdateModal(false);
    setSelectedRequest(null);
    setUpdateForm({ status: "", message: "" });
  };

  const handleUpdateRequest = async (e) => {
    e.preventDefault();
    if (!selectedRequest) return;

    try {
      setUpdating(true);
      const res = await fetch(`${baseApi}/api/maintenance/landlord/update/${selectedRequest._id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${auth.accessToken}`,
        },
        body: JSON.stringify(updateForm),
      });

      const data = await res.json();
      
      if (res.ok) {
        // Refresh the data
        await fetchMaintenanceRequests();
        closeUpdateModal();
        alert("Request updated successfully!");
      } else {
        alert(data.message || "Failed to update request");
      }
    } catch (err) {
      console.error("Error updating request:", err);
      alert("Error updating request");
    } finally {
      setUpdating(false);
    }
  };

  const getCategoryIcon = (category) => {
    switch (category.toLowerCase()) {
      case 'plumbing': return <Axe size={16} className="text-blue-600" />;
      case 'electrical': return <Zap size={16} className="text-yellow-600" />;
      case 'general': return <Settings size={16} className="text-gray-600" />;
      default: return <Wrench size={16} className="text-purple-600" />;
    }
  };

  const getStatusIcon = (status) => {
    switch (status.toLowerCase()) {
      case 'completed': return <CheckCircle size={14} className="text-green-600" />;
      case 'in progress': return <Clock size={14} className="text-blue-600" />;
      case 'pending': return <AlertCircle size={14} className="text-yellow-600" />;
      default: return <Clock size={14} className="text-gray-600" />;
    }
  };

  const getPriorityColor = (urgency) => {
    switch (urgency.toLowerCase()) {
      case 'high': return 'bg-red-100 text-red-800 border-red-200';
      case 'medium': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'low': return 'bg-green-100 text-green-800 border-green-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case 'completed': return 'bg-green-100 text-green-800 border-green-200';
      case 'in progress': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'pending': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  // Filter and search logic
  const filteredProperties = propertiesData.filter(property => {
    const matchesSearch = property.property.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         property.property.address.toLowerCase().includes(searchTerm.toLowerCase());
    
    if (!matchesSearch) return false;

    if (filterStatus === "all" && filterUrgency === "all") return true;

    const hasMatchingRequest = property.requests.some(request => {
      const statusMatch = filterStatus === "all" || request.status === filterStatus;
      const urgencyMatch = filterUrgency === "all" || request.urgency === filterUrgency;
      return statusMatch && urgencyMatch;
    });

    return hasMatchingRequest;
  });

  const totalRequests = propertiesData.reduce((sum, prop) => sum + prop.summary.totalRequests, 0);
  const totalPending = propertiesData.reduce((sum, prop) => sum + prop.summary.pendingRequests, 0);
  const totalInProgress = propertiesData.reduce((sum, prop) => sum + prop.summary.inProgressRequests, 0);
  const totalCompleted = propertiesData.reduce((sum, prop) => sum + prop.summary.completedRequests, 0);

  return (
    <div className="landlord-maintenance">
      {/* Header Section */}
      <div className="header-section">
        <div className="header-content">
          <div className="title-section">
            <h1><Wrench size={24} /> Maintenance Dashboard</h1>
            <p>Manage all property maintenance requests</p>
          </div>

          {/* Stats Cards */}
          <div className="stats-grid">
            <div className="stat-card total">
              <div className="stat-icon">
                <TrendingUp size={20} />
              </div>
              <div className="stat-content">
                <span className="stat-number">{totalRequests}</span>
                <span className="stat-label">Total Requests</span>
              </div>
            </div>

            <div className="stat-card pending">
              <div className="stat-icon">
                <AlertTriangle size={20} />
              </div>
              <div className="stat-content">
                <span className="stat-number">{totalPending}</span>
                <span className="stat-label">Pending</span>
              </div>
            </div>

            <div className="stat-card progress">
              <div className="stat-icon">
                <Clock size={20} />
              </div>
              <div className="stat-content">
                <span className="stat-number">{totalInProgress}</span>
                <span className="stat-label">In Progress</span>
              </div>
            </div>

            <div className="stat-card completed">
              <div className="stat-icon">
                <CheckCircle size={20} />
              </div>
              <div className="stat-content">
                <span className="stat-number">{totalCompleted}</span>
                <span className="stat-label">Completed</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Filters Section */}
      <div className="filters-section">
        <div className="search-bar">
          <Search size={18} />
          <input
            type="text"
            placeholder="Search properties..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="filter-controls">
          <div className="filter-group">
            <Filter size={16} />
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
            >
              <option value="all">All Status</option>
              <option value="pending">Pending</option>
              <option value="in progress">In Progress</option>
              <option value="completed">Completed</option>
            </select>
          </div>

          <div className="filter-group">
            <AlertTriangle size={16} />
            <select
              value={filterUrgency}
              onChange={(e) => setFilterUrgency(e.target.value)}
            >
              <option value="all">All Priority</option>
              <option value="high">High</option>
              <option value="medium">Medium</option>
              <option value="low">Low</option>
            </select>
          </div>
        </div>
      </div>

      {/* Main Content */}
      {loading ? (
        <div className="loading-container">
          <div className="spinner"></div>
          <p>Loading maintenance requests...</p>
        </div>
      ) : (
        <div className="properties-container">
          {filteredProperties.length > 0 ? (
            filteredProperties.map((propertyData) => (
              <div key={propertyData.propertyId} className="property-section">
                {/* Property Header */}
                <div className="property-header">
                  <div className="property-main-info">
                    <div className="property-image">
                      {propertyData.property.medias?.length > 0 ? (
                        <img src={propertyData.property.medias[0]} alt="Property" />
                      ) : (
                        <div className="no-image">
                          <Home size={24} />
                        </div>
                      )}
                    </div>

                    <div className="property-details">
                      <h2>{propertyData.property.title}</h2>
                      <p className="property-address">
                        <MapPin size={14} />
                        {propertyData.property.address}
                      </p>
                      <p className="last-update">
                        <Calendar size={14} />
                        Last request: {new Date(propertyData.latestRequest).toLocaleDateString('en-IN')}
                      </p>
                    </div>
                  </div>

                  <div className="property-summary">
                    <div className="summary-stats">
                      <div className="summary-item">
                        <span className="summary-number">{propertyData.summary.totalRequests}</span>
                        <span className="summary-label">Total</span>
                      </div>
                      <div className="summary-item pending">
                        <span className="summary-number">{propertyData.summary.pendingRequests}</span>
                        <span className="summary-label">Pending</span>
                      </div>
                      <div className="summary-item progress">
                        <span className="summary-number">{propertyData.summary.inProgressRequests}</span>
                        <span className="summary-label">In Progress</span>
                      </div>
                      <div className="summary-item completed">
                        <span className="summary-number">{propertyData.summary.completedRequests}</span>
                        <span className="summary-label">Completed</span>
                      </div>
                    </div>

                    <button
                      className={`expand-btn ${expandedProperty === propertyData.propertyId ? 'active' : ''}`}
                      onClick={() =>
                        setExpandedProperty(
                          expandedProperty === propertyData.propertyId 
                            ? null 
                            : propertyData.propertyId
                        )
                      }
                    >
                      {expandedProperty === propertyData.propertyId ? (
                        <>
                          <EyeOff size={16} /> Hide Requests
                        </>
                      ) : (
                        <>
                          <Eye size={16} /> View Requests ({propertyData.summary.totalRequests})
                        </>
                      )}
                    </button>
                  </div>
                </div>

                {/* Requests List */}
                {expandedProperty === propertyData.propertyId && (
                  <div className="requests-section">
                    <div className="requests-header">
                      <h3>Maintenance Requests</h3>
                      <span className="requests-count">
                        {propertyData.requests.length} total requests
                      </span>
                    </div>

                    <div className="requests-grid">
                      {propertyData.requests.map((request) => (
                        <div key={request._id} className="request-card">
                          <div className="request-header">
                            <div className="request-category">
                              {getCategoryIcon(request.category)}
                              <span className="category-name">{request.category}</span>
                            </div>
                            
                            <div className="request-badges">
                              <span className={`priority-badge ${getPriorityColor(request.urgency)}`}>
                                {request.urgency}
                              </span>
                              <span className={`status-badge ${getStatusColor(request.status)}`}>
                                {getStatusIcon(request.status)}
                                {request.status}
                              </span>
                            </div>
                          </div>

                          <div className="request-description">
                            {request.description}
                          </div>

                          <div className="tenant-info">
                            <div className="tenant-header">
                              <User size={14} />
                              <span>Tenant Information</span>
                            </div>
                            <div className="tenant-details">
                              <div className="tenant-item">
                                <strong>{request.tenant.name}</strong>
                              </div>
                              <div className="tenant-item">
                                <Mail size={12} />
                                <span>{request.tenant.email}</span>
                              </div>
                              {request.tenant.phone && (
                                <div className="tenant-item">
                                  <Phone size={12} />
                                  <span>{request.tenant.phone}</span>
                                </div>
                              )}
                            </div>
                          </div>

                          <div className="request-meta">
                            <div className="meta-items">
                              {request.medias && request.medias.length > 0 && (
                                <div className="meta-item">
                                  <Paperclip size={12} />
                                  <span>{request.medias.length} attachments</span>
                                </div>
                              )}
                              {request.messages && request.messages.length > 0 && (
                                <div className="meta-item">
                                  <MessageCircle size={12} />
                                  <span>{request.messages.length} messages</span>
                                </div>
                              )}
                            </div>
                            <div className="request-date">
                              <Calendar size={12} />
                              <span>{new Date(request.createdAt).toLocaleDateString('en-IN')}</span>
                            </div>
                          </div>

                          {/* Action Button */}
                          <div className="request-actions">
                            <button 
                              className="update-btn"
                              onClick={() => openUpdateModal(request)}
                            >
                              <Edit3 size={14} />
                              Update Status
                            </button>
                          </div>

                          {/* Messages Section */}
                          {request.messages && request.messages.length > 0 && (
                            <div className="messages-section">
                              <div className="messages-header">
                                <MessageCircle size={14} />
                                <span>Conversation ({request.messages.length})</span>
                              </div>
                              <div className="messages-list">
                                {request.messages.slice(-3).map((message, idx) => (
                                  <div key={idx} className="message-item">
                                    <span className="message-text">{message}</span>
                                  </div>
                                ))}
                                {request.messages.length > 3 && (
                                  <div className="more-messages">
                                    <small>... and {request.messages.length - 3} more messages</small>
                                  </div>
                                )}
                              </div>
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))
          ) : (
            <div className="empty-state">
              <Wrench size={48} />
              <h3>No maintenance requests found</h3>
              <p>No requests match your current filters.</p>
            </div>
          )}
        </div>
      )}

      {/* Update Status Modal */}
      {showUpdateModal && selectedRequest && (
        <div className="modal-overlay">
          <div className="modal-container">
            <div className="modal-header">
              <div className="modal-title">
                <Edit3 size={18} />
                <span>Update Request Status</span>
              </div>
              <button className="modal-close" onClick={closeUpdateModal}>
                <X size={18} />
              </button>
            </div>

            <div className="modal-content">
              {/* Request Summary */}
              <div className="request-summary">
                <div className="summary-header">
                  <div className="summary-category">
                    {getCategoryIcon(selectedRequest.category)}
                    <span>{selectedRequest.category}</span>
                  </div>
                  <span className={`priority-badge ${getPriorityColor(selectedRequest.urgency)}`}>
                    {selectedRequest.urgency} priority
                  </span>
                </div>
                <p className="summary-description">{selectedRequest.description}</p>
                <div className="summary-tenant">
                  <User size={14} />
                  <span>Tenant: {selectedRequest.tenant.name}</span>
                </div>
              </div>

              {/* Update Form */}
              <form onSubmit={handleUpdateRequest} className="update-form">
                <div className="form-group">
                  <label>Status</label>
                  <select
                    value={updateForm.status}
                    onChange={(e) => setUpdateForm(prev => ({ ...prev, status: e.target.value }))}
                    required
                  >
                    <option value="">Select Status</option>
                    <option value="pending">Pending</option>
                    <option value="in progress">In Progress</option>
                    <option value="completed">Completed</option>
                  </select>
                </div>

                <div className="form-group">
                  <label>Message to Tenant (Optional)</label>
                  <textarea
                    rows="4"
                    value={updateForm.message}
                    onChange={(e) => setUpdateForm(prev => ({ ...prev, message: e.target.value }))}
                    placeholder="Add a message for the tenant..."
                  />
                </div>

                <div className="form-actions">
                  <button type="button" className="cancel-btn" onClick={closeUpdateModal}>
                    Cancel
                  </button>
                  <button type="submit" className="submit-btn" disabled={updating}>
                    {updating ? (
                      <>
                        <div className="mini-spinner"></div>
                        Updating...
                      </>
                    ) : (
                      <>
                        <Save size={16} />
                        Update Request
                      </>
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      <style>{`
        .landlord-maintenance {
          max-width: 1400px;
          margin: 0 auto;
          padding: 20px;
          background: #f8fafc;
          min-height: 100vh;
        }

        /* Header Section */
        .header-section {
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          border-radius: 16px;
          padding: 24px;
          margin-bottom: 24px;
          color: white;
        }

        .header-content {
          display: flex;
          flex-direction: column;
          gap: 20px;
        }

        .title-section h1 {
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: 2rem;
          font-weight: 700;
          margin: 0 0 4px 0;
        }

        .title-section p {
          margin: 0;
          opacity: 0.9;
          font-size: 1.1rem;
        }

        .stats-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: 16px;
        }

        .stat-card {
          background: rgba(255, 255, 255, 0.1);
          backdrop-filter: blur(10px);
          border-radius: 12px;
          padding: 16px;
          display: flex;
          align-items: center;
          gap: 12px;
          border: 1px solid rgba(255, 255, 255, 0.2);
        }

        .stat-icon {
          padding: 8px;
          border-radius: 8px;
          background: rgba(255, 255, 255, 0.2);
        }

        .stat-content {
          display: flex;
          flex-direction: column;
        }

        .stat-number {
          font-size: 1.5rem;
          font-weight: 700;
        }

        .stat-label {
          font-size: 0.85rem;
          opacity: 0.9;
        }

        /* Filters Section */
        .filters-section {
          background: white;
          border-radius: 12px;
          padding: 16px;
          margin-bottom: 20px;
          display: flex;
          gap: 16px;
          align-items: center;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
          flex-wrap: wrap;
        }

        .search-bar {
          display: flex;
          align-items: center;
          gap: 8px;
          background: #f8fafc;
          border: 1px solid #e2e8f0;
          border-radius: 8px;
          padding: 8px 12px;
          flex: 1;
          min-width: 250px;
        }

        .search-bar input {
          border: none;
          background: none;
          outline: none;
          flex: 1;
          font-size: 0.9rem;
        }

        .filter-controls {
          display: flex;
          gap: 12px;
          flex-wrap: wrap;
        }

        .filter-group {
          display: flex;
          align-items: center;
          gap: 6px;
          background: #f8fafc;
          border: 1px solid #e2e8f0;
          border-radius: 8px;
          padding: 8px 12px;
        }

        .filter-group select {
          border: none;
          background: none;
          outline: none;
          font-size: 0.85rem;
          cursor: pointer;
        }

        /* Loading */
        .loading-container {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          padding: 48px;
          color: #64748b;
        }

        .spinner {
          width: 40px;
          height: 40px;
          border: 4px solid #e2e8f0;
          border-top: 4px solid #3b82f6;
          border-radius: 50%;
          animation: spin 1s linear infinite;
          margin-bottom: 16px;
        }

        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }

        /* Properties Container */
        .properties-container {
          display: flex;
          flex-direction: column;
          gap: 20px;
        }

        .property-section {
          background: white;
          border-radius: 12px;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
          overflow: hidden;
          transition: all 0.3s ease;
        }

        .property-section:hover {
          box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
        }

        /* Property Header */
        .property-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 20px;
          border-bottom: 1px solid #e2e8f0;
          gap: 20px;
        }

        .property-main-info {
          display: flex;
          gap: 16px;
          flex: 1;
        }

        .property-image {
          width: 80px;
          height: 80px;
          border-radius: 10px;
          overflow: hidden;
          flex-shrink: 0;
        }

        .property-image img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .no-image {
          width: 100%;
          height: 100%;
          background: #f1f5f9;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #94a3b8;
        }

        .property-details h2 {
          font-size: 1.25rem;
          font-weight: 600;
          color: #1e293b;
          margin: 0 0 8px 0;
        }

        .property-address {
          display: flex;
          align-items: center;
          gap: 6px;
          color: #64748b;
          font-size: 0.9rem;
          margin: 0 0 4px 0;
        }

        .last-update {
          display: flex;
          align-items: center;
          gap: 6px;
          color: #94a3b8;
          font-size: 0.8rem;
          margin: 0;
        }

        .property-summary {
          display: flex;
          flex-direction: column;
          gap: 12px;
          align-items: flex-end;
        }

        .summary-stats {
          display: flex;
          gap: 16px;
        }

        .summary-item {
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
        }

        .summary-number {
          font-size: 1.25rem;
          font-weight: 700;
          color: #1e293b;
        }

        .summary-item.pending .summary-number {
          color: #d97706;
        }

        .summary-item.progress .summary-number {
          color: #2563eb;
        }

        .summary-item.completed .summary-number {
          color: #059669;
        }

        .summary-label {
          font-size: 0.75rem;
          color: #64748b;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }

        .expand-btn {
          display: flex;
          align-items: center;
          gap: 6px;
          padding: 8px 16px;
          background: #3b82f6;
          color: white;
          border: none;
          border-radius: 6px;
          font-size: 0.85rem;
          font-weight: 500;
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .expand-btn:hover {
          background: #2563eb;
        }

        .expand-btn.active {
          background: #dc2626;
        }

        .expand-btn.active:hover {
          background: #b91c1c;
        }

        /* Requests Section */
        .requests-section {
          border-top: 1px solid #e2e8f0;
          background: #f8fafc;
        }

        .requests-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 16px 20px;
          border-bottom: 1px solid #e2e8f0;
          background: white;
        }

        .requests-header h3 {
          font-size: 1.1rem;
          font-weight: 600;
          color: #1e293b;
          margin: 0;
        }

        .requests-count {
          font-size: 0.8rem;
          color: #64748b;
          background: #f1f5f9;
          padding: 4px 12px;
          border-radius: 12px;
        }

        .requests-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(400px, 1fr));
          gap: 16px;
          padding: 16px 20px;
        }

        /* Request Card */
        .request-card {
          background: white;
          border-radius: 10px;
          padding: 16px;
          border: 1px solid #e2e8f0;
          transition: all 0.2s ease;
        }

        .request-card:hover {
          border-color: #cbd5e1;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
        }

        .request-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 12px;
        }

        .request-category {
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .category-name {
          font-size: 0.9rem;
          font-weight: 600;
          color: #374151;
          text-transform: capitalize;
        }

        .request-badges {
          display: flex;
          gap: 6px;
        }

        .priority-badge,
        .status-badge {
          display: flex;
          align-items: center;
          gap: 4px;
          padding: 3px 8px;
          border-radius: 4px;
          font-size: 0.7rem;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.5px;
          border: 1px solid;
        }

        .request-description {
          font-size: 0.9rem;
          color: #475569;
          line-height: 1.5;
          margin-bottom: 12px;
          background: #f8fafc;
          padding: 12px;
          border-radius: 6px;
        }

        .tenant-info {
          background: #f0f9ff;
          border: 1px solid #e0f2fe;
          border-radius: 6px;
          padding: 12px;
          margin-bottom: 12px;
        }

        .tenant-header {
          display: flex;
          align-items: center;
          gap: 6px;
          font-size: 0.8rem;
          font-weight: 600;
          color: #0369a1;
          margin-bottom: 8px;
        }

        .tenant-details {
          display: flex;
          flex-direction: column;
          gap: 4px;
        }

        .tenant-item {
          display: flex;
          align-items: center;
          gap: 6px;
          font-size: 0.8rem;
          color: #374151;
        }

        .request-meta {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 12px;
        }

        .meta-items {
          display: flex;
          gap: 12px;
        }

        .meta-item {
          display: flex;
          align-items: center;
          gap: 4px;
          font-size: 0.75rem;
          color: #64748b;
        }

        .request-date {
          display: flex;
          align-items: center;
          gap: 4px;
          font-size: 0.75rem;
          color: #94a3b8;
        }

        /* Request Actions */
        .request-actions {
          margin-bottom: 12px;
        }

        .update-btn {
          display: flex;
          align-items: center;
          gap: 6px;
          padding: 8px 16px;
          background: #059669;
          color: white;
          border: none;
          border-radius: 6px;
          font-size: 0.8rem;
          font-weight: 500;
          cursor: pointer;
          transition: all 0.2s ease;
          width: 100%;
          justify-content: center;
        }

        .update-btn:hover {
          background: #047857;
          transform: translateY(-1px);
        }

        .messages-section {
          border-top: 1px solid #e2e8f0;
          padding-top: 12px;
          margin-top: 8px;
        }

        .messages-header {
          display: flex;
          align-items: center;
          gap: 6px;
          font-size: 0.8rem;
          font-weight: 600;
          color: #475569;
          margin-bottom: 8px;
        }

        .messages-list {
          display: flex;
          flex-direction: column;
          gap: 6px;
        }

        .message-item {
          background: #f1f5f9;
          padding: 6px 10px;
          border-radius: 4px;
          border-left: 3px solid #3b82f6;
        }

        .message-text {
          font-size: 0.8rem;
          color: #374151;
          line-height: 1.4;
        }

        .more-messages {
          text-align: center;
          padding: 4px;
          color: #64748b;
          font-style: italic;
        }

        /* Modal Styles */
        .modal-overlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0, 0, 0, 0.6);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 1000;
          padding: 16px;
        }

        .modal-container {
          background: white;
          border-radius: 12px;
          width: 100%;
          max-width: 600px;
          max-height: 90vh;
          overflow: hidden;
          box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1);
        }

        .modal-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 20px;
          border-bottom: 1px solid #e2e8f0;
          background: #f8fafc;
        }

        .modal-title {
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: 1.1rem;
          font-weight: 600;
          color: #1e293b;
        }

        .modal-close {
          background: none;
          border: none;
          padding: 6px;
          cursor: pointer;
          color: #64748b;
          border-radius: 6px;
          transition: all 0.2s ease;
        }

        .modal-close:hover {
          background: #e2e8f0;
          color: #374151;
        }

        .modal-content {
          padding: 20px;
          max-height: calc(90vh - 80px);
          overflow-y: auto;
        }

        .request-summary {
          background: #f8fafc;
          border: 1px solid #e2e8f0;
          border-radius: 8px;
          padding: 16px;
          margin-bottom: 20px;
        }

        .summary-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 8px;
        }

        .summary-category {
          display: flex;
          align-items: center;
          gap: 8px;
          font-weight: 600;
          color: #374151;
          text-transform: capitalize;
        }

        .summary-description {
          margin: 8px 0;
          color: #475569;
          line-height: 1.5;
        }

        .summary-tenant {
          display: flex;
          align-items: center;
          gap: 6px;
          font-size: 0.85rem;
          color: #64748b;
        }

        .update-form {
          display: flex;
          flex-direction: column;
          gap: 16px;
        }

        .form-group {
          display: flex;
          flex-direction: column;
          gap: 6px;
        }

        .form-group label {
          font-size: 0.85rem;
          font-weight: 600;
          color: #374151;
        }

        .form-group select,
        .form-group textarea {
          padding: 10px 12px;
          border: 1px solid #d1d5db;
          border-radius: 8px;
          font-size: 0.9rem;
          transition: all 0.2s ease;
          background: white;
        }

        .form-group select:focus,
        .form-group textarea:focus {
          outline: none;
          border-color: #3b82f6;
          box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
        }

        .form-group textarea {
          resize: vertical;
          font-family: inherit;
        }

        .form-actions {
          display: flex;
          gap: 12px;
          justify-content: flex-end;
        }

        .cancel-btn {
          padding: 10px 20px;
          background: #e5e7eb;
          color: #374151;
          border: none;
          border-radius: 6px;
          font-size: 0.9rem;
          font-weight: 500;
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .cancel-btn:hover {
          background: #d1d5db;
        }

        .submit-btn {
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 10px 20px;
          background: #059669;
          color: white;
          border: none;
          border-radius: 6px;
          font-size: 0.9rem;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .submit-btn:hover:not(:disabled) {
          background: #047857;
          transform: translateY(-1px);
        }

        .submit-btn:disabled {
          opacity: 0.7;
          cursor: not-allowed;
          transform: none;
        }

        .mini-spinner {
          width: 16px;
          height: 16px;
          border: 2px solid rgba(255, 255, 255, 0.3);
          border-top: 2px solid white;
          border-radius: 50%;
          animation: spin 1s linear infinite;
        }

        /* Empty State */
        .empty-state {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          padding: 64px 20px;
          color: #94a3b8;
          text-align: center;
        }

        .empty-state h3 {
          margin: 16px 0 8px 0;
          color: #64748b;
        }

        .empty-state p {
          margin: 0;
          font-size: 0.9rem;
        }

        /* Responsive Design */
        @media (max-width: 768px) {
          .landlord-maintenance {
            padding: 12px;
          }

          .header-content {
            gap: 16px;
          }

          .stats-grid {
            grid-template-columns: repeat(2, 1fr);
          }

          .filters-section {
            flex-direction: column;
            align-items: stretch;
          }

          .search-bar {
            min-width: 100%;
          }

          .filter-controls {
            justify-content: space-between;
          }

          .property-header {
            flex-direction: column;
            align-items: stretch;
            gap: 16px;
          }

          .property-summary {
            align-items: stretch;
          }

          .summary-stats {
            justify-content: space-around;
          }

          .requests-grid {
            grid-template-columns: 1fr;
            padding: 12px;
          }

          .request-header {
            flex-direction: column;
            align-items: stretch;
            gap: 8px;
          }

          .request-badges {
            justify-content: flex-start;
          }

          .modal-container {
            margin: 8px;
          }

          .form-actions {
            flex-direction: column;
          }
        }

        @media (max-width: 480px) {
          .stats-grid {
            grid-template-columns: 1fr;
          }

          .property-main-info {
            flex-direction: column;
            gap: 12px;
          }

          .property-image {
            align-self: center;
          }

          .summary-stats {
            gap: 8px;
          }

          .filter-controls {
            flex-direction: column;
            gap: 8px;
          }
        }
      `}</style>
    </div>
  );
};

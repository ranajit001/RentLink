import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Outlet } from 'react-router-dom';
import { 
  Home, 
  Search, 
  Building, 
  Users, 
  MessageSquare, 
  Heart, 
  FileText, 
  Settings, 
  User, 
  PlusCircle,
  Eye,
  Calendar,
  TrendingUp,
  Bell,
  House,
  CircleX,
  HelpCircle,
  LogOut,
  ChevronDown,
  ChevronRight,
  Menu,
  X
} from 'lucide-react';

import { useAuth } from '../../context/AuthContext';
import './Dashboard.css';
import { landlordOptions, tenantOptions } from '../../utils/SidebarOptions';    

export const Dashboard = () => {
  const navigate = useNavigate();
  const { auth, logout } = useAuth();
  const user = auth.user;
  const [expandedMenus, setExpandedMenus] = useState({});
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
      if (window.innerWidth > 768) {
        setSidebarOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const toggleMenu = (menuKey) => {
    setExpandedMenus(prev => ({
      ...prev,
      [menuKey]: !prev[menuKey]
    }));
  };

  const handleLogout = () => {
    logout();
  };

  const handleMenuItemClick = (path) => {
    if (path) {
      navigate(path);
    }
    // Close sidebar on mobile after navigation
    if (isMobile) {
      setSidebarOpen(false);
    }
  };

  const renderMenuItem = (item) => (
    <div key={item.key} className="menu-item-wrapper">
      <div 
        className={`menu-item ${item.submenu ? 'has-submenu' : ''}`}
        onClick={() => {
          if (item.submenu) {
            toggleMenu(item.key);
          } else if (item.path) {
            handleMenuItemClick(item.path);
          }
        }}
      >
        <div className="menu-item-content">
          <span className="menu-icon">{item.icon}</span>
          <span className="menu-label">{item.label}</span>
          {item.badge && <span className="menu-badge">{item.badge}</span>}
        </div>
        {item.submenu && (
          <span className="menu-chevron">
            {expandedMenus[item.key] ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
          </span>
        )}
      </div>
      
      {item.submenu && expandedMenus[item.key] && (
        <div className="submenu">
          {item.submenu.map((subItem, index) => (
            <div 
              key={index} 
              className="submenu-item" 
              onClick={() => handleMenuItemClick(subItem.path)}
            >
              <span className="submenu-label">{subItem.label}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );

  const roleBasedMenuItems = () => {
    return user?.role === 'landlord' ? landlordOptions :
      user?.role === 'tenant' ? tenantOptions : [
        {
          key: 'properties',
          icon: <House size={20} />,
          label: 'Manage Properties',
          path: 'properties',
          submenu: [
            { label: 'Search Properties', path: 'properties/search-properties' }
          ]
        },
      ]
  }

  return (
    <div className='dashboard-container'>
      {/* Mobile Header with Hamburger */}
      {isMobile && (
        <div className="mobile-header">
          <button className="hamburger-btn" onClick={toggleSidebar}>
            <Menu size={24} />
          </button>
          <h2 className="mobile-title">Dashboard</h2>
        </div>
      )}

      {/* Overlay for mobile */}
      {isMobile && sidebarOpen && (
        <div className="sidebar-overlay" onClick={toggleSidebar}></div>
      )}

      {/* Sidebar */}
      <div className={`sidebar ${sidebarOpen ? 'sidebar-open' : ''}`}>
        {/* Mobile close button */}
        {isMobile && (
          <div className="mobile-sidebar-header">
            <h3>Menu</h3>
            <button className="close-btn" onClick={toggleSidebar}>
              <X size={24} />
            </button>
          </div>
        )}

        {/* User Profile Section */}
        <div className="user-profile">
          <div className="user-avatar">
            {user?.name?.charAt(0).toUpperCase() || <CircleX/>}
          </div>
          <div className="user-info">
            <h3>{user?.name || 'User'}</h3>
            <span className="user-role">
              {user?.role === 'landlord' ? 'Landlord' : user?.role === 'tenant' ? 'Tenant' : 'Sign in'}
            </span>
          </div>
        </div>

        {/* Navigation Menu */}
        <nav className="sidebar-nav">
          <div className="menu-section">
            <div className="section-title">
              {user?.role === 'landlord' ? 'Property Management' : 'Find Properties'}
            </div>
            {roleBasedMenuItems().map(renderMenuItem)}
          </div>

          {/* Bottom Items */}
          <div className="menu-section">
            <div className="menu-item logout-item" onClick={handleLogout}>
              <div className="menu-item-content">
                <span className="menu-icon"><LogOut size={20} /></span>
                <span className="menu-label">Logout</span>
              </div>
            </div>
          </div>
        </nav>
      </div>

      {/* Main Content Area */}
      <div className="main-content">
        <Outlet />
      </div>
    </div>
  );
};

import React, { useState } from 'react';
import { landlordOptions,tenantOptions } from '../../utils/SidebarOptions';
import { useAuth } from '../../context/AuthContext';
import { LogOut } from 'lucide-react';


//not imported to anywhere just for rebuilding the dasbboard puropse


export const Sidebar = () => {
  const { auth, logout } = useAuth(); 
  const user = auth?.user;

  const selectOptions = user && user.role === 'landlord' ? landlordOptions : tenantOptions;

  // Optionally add expand/collapse state for submenus
  const [expanded, setExpanded] = useState(null);
  const handleExpand = (key) => setExpanded(expanded === key ? null : key);

  const renderSubOptions = (subOptions) => (
    <div>
      {subOptions.map((item, idx) => (
        <div className="sub-menu-item" key={item.label || idx}>
          <span className="sub-menu-label">{item.label}</span>
        </div>
      ))}
    </div>
  );

  if (!user) return null;

  return (
    <aside className="sidebar">
      <div className='user-profile'>
        <div className='user-avatar'>{user.name?.[0].toUpperCase() || 'U'}</div>
        <div>
          <h3>{user.name || 'User'}</h3>
          <span>{user.role}</span>
        </div>
      </div>
      <nav className="sidebar-nav">
        {selectOptions.map((item) => (
          <div className="menu-item" key={item.key} onClick={() => item.submenu && handleExpand(item.key)}>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <span className="menu-icon">{item.icon}</span>
              <span className="menu-label">{item.label}</span>
            </div>
            {item.submenu && (
              <span style={{ marginLeft: 'auto', fontSize: 18 }}>{expanded === item.key ? '▼' : '▶'}</span>
            )}
            {item.submenu && expanded === item.key && renderSubOptions(item.submenu)}
          </div>
        ))}
        <div className="menu-item" onClick={logout} style={{ color: '#dc2626' }}>
          <span className="menu-icon"><LogOut size={20} /></span>
          <span className="menu-label">Logout</span>
        </div>
      </nav>

    </aside>
  );
};



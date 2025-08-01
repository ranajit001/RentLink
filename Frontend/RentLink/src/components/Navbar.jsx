import React, { useState } from 'react';

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="navbar">
      <div className="navbar-container">
        {/* Logo */}
        <div className="navbar-logo">
          <a href="/">Brand</a>
        </div>

        {/* Desktop Menu */}
        <ul className={`navbar-menu ${isOpen ? 'active' : ''}`}>
          <li className="navbar-item">
            <a href="/" className="navbar-link">Home</a>
          </li>
          <li className="navbar-item">
            <a href="#" className="navbar-link">About</a>
          </li>
          <li className="navbar-item">
            <a href="/services" className="navbar-link">Services</a>
          </li>
          <li className="navbar-item">
            <a href="/contact" className="navbar-link">Contact</a>
          </li>
            <li className="navbar-item">
            <a href="/contact" className="navbar-link">Account</a>
          </li>
        </ul>

        {/* Mobile Menu Toggle */}
        <div 
          className={`navbar-toggle ${isOpen ? 'active' : ''}`}
          onClick={() => setIsOpen(!isOpen)}
        >
          <span className="bar"></span>
          <span className="bar"></span>
          <span className="bar"></span>
        </div>
      </div>
      <style>{`
      .navbar {
  background-color: #ffffff;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  position: fixed;
  top: 0;
  width: 100%;
  z-index: 1000;
  transition: all 0.3s ease;
  padding:0.5rem;
}

.navbar-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 60px;
}

.navbar-logo a {
  font-size: 1.5rem;
  font-weight: 700;
  color: #333;
  text-decoration: none;
  letter-spacing: -0.5px;
}

.navbar-menu {
  display: flex;
  align-items: center;
  list-style: none;
  margin: 0;
  padding: 0;
  gap: 2rem;
}

.navbar-item {
  position: relative;
}

.navbar-link {
  color: #666;
  text-decoration: none;
  font-weight: 500;
  font-size: 0.95rem;
  transition: color 0.3s ease;
  position: relative;
}

.navbar-link:hover {
  color: #333;
}

.navbar-link::after {
  content: '';
  position: absolute;
  width: 0;
  height: 2px;
  bottom: -5px;
  left: 0;
  background-color: #333;
  transition: width 0.3s ease;
}

.navbar-link:hover::after {
  width: 100%;
}

/* Mobile Menu Toggle */
.navbar-toggle {
  display: none;
  flex-direction: column;
  cursor: pointer;
}

.bar {
  width: 25px;
  height: 3px;
  background-color: #333;
  margin: 3px 0;
  transition: 0.3s;
  border-radius: 2px;
}

/* Mobile Styles */
@media screen and (max-width: 768px) {
  .navbar-menu {
    position: fixed;
    left: -100%;
    top: 60px;
    flex-direction: column;
    background-color: #ffffff;
    width: 100%;
    text-align: center;
    transition: 0.3s;
    box-shadow: 0 10px 27px rgba(0, 0, 0, 0.05);
    padding: 2rem 0;
    gap: 1.5rem;
  }

  .navbar-menu.active {
    left: 0;
  }

  .navbar-toggle {
    display: flex;
  }

  .navbar-toggle.active .bar:nth-child(2) {
    opacity: 0;
  }

  .navbar-toggle.active .bar:nth-child(1) {
    transform: translateY(8px) rotate(45deg);
  }

  .navbar-toggle.active .bar:nth-child(3) {
    transform: translateY(-8px) rotate(-45deg);
  }
}
`}</style>
    </nav>
  );
};



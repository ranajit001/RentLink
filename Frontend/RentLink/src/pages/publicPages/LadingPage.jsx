import React from 'react';
import { Home, CheckCircle, MessageCircle, Users, Search, UserPlus, LogIn,Rocket  } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Navbar } from '../../components/Navbar';

export const LandingPage = () => {

  const navigate =useNavigate();

  return (
    <div className="landing-page">

<Navbar/>

      {/* Hero Section */}
      <section className="hero">
        <div className="hero-container">
          <div className="hero-content">
            <h1 className="hero-title">
              Find Your Perfect <span className="highlight">Rental Match</span>
            </h1>
            <p className="hero-subtitle">
              Connect landlords and tenants seamlessly. Find quality properties or reliable tenants with our trusted platform.
            </p>
            
            <div className="hero-actions">
              <button className="cta-button primary" onClick={() => navigate('/dashboard')}>
                <Rocket size={20} /> 
                Get Started
              </button>
              <button className="cta-button secondary" onClick={() => navigate('/auth')}>
                <UserPlus size={20} />
                Quick Signup
              </button>
              <button className="cta-button outline" onClick={() => navigate('/auth')}>
                <LogIn size={20} />
                Login
              </button>
            </div>

            <div className="quick-stats">
              <div className="stat">
                <span className="stat-number">10,000+</span>
                <span className="stat-label">Properties Listed</span>
              </div>
              <div className="stat">
                <span className="stat-number">25,000+</span>
                <span className="stat-label">Happy Users</span>
              </div>
              <div className="stat">
                <span className="stat-number">98%</span>
                <span className="stat-label">Success Rate</span>
              </div>
            </div>
          </div>
          
          <div className="hero-image">
            <img 
              src="https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
              alt="Modern apartment building"
              className="hero-main-image"
            />
            <div className="property-overlay">
              <h3>Modern Apartment</h3>
              <p>$1,200/month</p>
              <span className="property-status">
                <CheckCircle size={16} />
                Available
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Search Section */}
      <section className="quick-search">
        <h3>Start Your Search Now</h3>
        <div className="search-options">
          <button className="search-option">
            <Home size={24} />
            <span>Find Apartments</span>
          </button>
          <button className="search-option">
            <Users size={24} />
            <span>Find Roommates</span>
          </button>
          <button className="search-option">
            <MessageCircle size={24} />
            <span>List Property</span>
          </button>
        </div>
      </section>

      {/* Features Section */}
      <section className="features">
        <h2>Why Choose Our Platform?</h2>
        <div className="features-grid">
          <div className="feature-card">
            <Home size={48} />
            <h3>Quality Properties</h3>
            <p>Verified listings from trusted landlords with detailed property information and photos.</p>
          </div>
          <div className="feature-card">
            <CheckCircle size={48} />
            <h3>Verified Users</h3>
            <p>All landlords and tenants go through our verification process for your safety and peace of mind.</p>
          </div>
          <div className="feature-card">
            <MessageCircle size={48} />
            <h3>Direct Communication</h3>
            <p>Message landlords or tenants directly through our secure messaging system.</p>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="how-it-works">
        <h2>How It Works</h2>
        <div className="steps-container">
          <div className="step">
            <div className="step-icon">
              <Users size={24} />
            </div>
            <h3>Sign Up</h3>
            <p>Create your free account as a tenant or landlord</p>
          </div>
          <div className="step">
            <div className="step-icon">
              <Home size={24} />
            </div>
            <h3>Browse or List</h3>
            <p>Search properties or list your rental with photos</p>
          </div>
          <div className="step">
            <div className="step-icon">
              <MessageCircle size={24} />
            </div>
            <h3>Connect</h3>
            <p>Message and schedule viewings with interested parties</p>
          </div>
          <div className="step">
            <div className="step-icon">
              <CheckCircle size={24} />
            </div>
            <h3>Move In</h3>
            <p>Complete the rental process and move into your new home</p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="final-cta">
        <h2>Ready to Find Your Match?</h2>
        <p>Join thousands of landlords and tenants who trust our platform</p>
        <div className="cta-buttons">
          <button className="cta-button large primary" onClick={() => navigate('/auth')}>Get Started Now</button>
          <button className="cta-button large outline" onClick={() => navigate('/dashboard/properties')}>Browse Properties</button>
        </div>
      </section>

      <style>{`
        .landing-page {
          padding-top: 60px;
        }

        /* Hero Section */
        .hero {
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          color: white;
          padding: 80px 2rem;
          min-height: 700px;
          display: flex;
          align-items: center;
        }

        .hero-container {
          max-width: 1200px;
          margin: 0 auto;
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 4rem;
          align-items: center;
        }

        .hero-title {
          font-size: 3.5rem;
          font-weight: 700;
          line-height: 1.2;
          margin-bottom: 1.5rem;
        }

        .highlight {
          color: #ffd700;
        }

        .hero-subtitle {
          font-size: 1.25rem;
          line-height: 1.6;
          margin-bottom: 2rem;
          opacity: 0.9;
        }

        .hero-actions {
          display: flex;
          gap: 1rem;
          margin-bottom: 3rem;
          flex-wrap: wrap;
        }

        .cta-button {
          border: none;
          padding: 1rem 1.5rem;
          font-size: 1rem;
          font-weight: 600;
          border-radius: 12px;
          cursor: pointer;
          transition: all 0.3s ease;
          display: flex;
          align-items: center;
          gap: 0.5rem;
          text-decoration: none;
        }

        .cta-button.primary {
          background: #ff6b6b;
          color: white;
        }

        .cta-button.primary:hover {
          background: #ff5252;
          transform: translateY(-2px);
          box-shadow: 0 8px 25px rgba(255, 107, 107, 0.4);
        }

        .cta-button.secondary {
          background: #4caf50;
          color: white;
        }

        .cta-button.secondary:hover {
          background: #45a049;
          transform: translateY(-2px);
          box-shadow: 0 8px 25px rgba(76, 175, 80, 0.4);
        }

        .cta-button.outline {
          background: transparent;
          color: white;
          border: 2px solid white;
        }

        .cta-button.outline:hover {
          background: white;
          color: #667eea;
          transform: translateY(-2px);
        }

        .cta-button.large {
          padding: 1.25rem 2rem;
          font-size: 1.1rem;
        }

        .quick-stats {
          display: flex;
          gap: 2rem;
          margin-top: 2rem;
        }

        .stat {
          text-align: center;
        }

        .stat-number {
          display: block;
          font-size: 2rem;
          font-weight: 700;
          color: #ffd700;
        }

        .stat-label {
          font-size: 0.9rem;
          opacity: 0.8;
        }

        /* Hero Image */
        .hero-image {
          position: relative;
          display: flex;
          justify-content: center;
          align-items: center;
        }

        .hero-main-image {
          width: 400px;
          height: 500px;
          object-fit: cover;
          border-radius: 16px;
          box-shadow: 0 20px 50px rgba(0, 0, 0, 0.2);
          transform: rotate(3deg);
        }

        .property-overlay {
          position: absolute;
          bottom: -20px;
          right: -20px;
          background: white;
          border-radius: 16px;
          padding: 1.5rem;
          box-shadow: 0 15px 40px rgba(0, 0, 0, 0.15);
          transform: rotate(-5deg);
          min-width: 200px;
          color: #333;
        }

        .property-overlay h3 {
          margin: 0 0 0.5rem 0;
          font-size: 1.25rem;
          font-weight: 600;
        }

        .property-overlay p {
          margin: 0 0 1rem 0;
          font-size: 1.5rem;
          font-weight: 700;
          color: #667eea;
        }

        .property-status {
          background: #4caf50;
          color: white;
          padding: 0.5rem 0.75rem;
          border-radius: 20px;
          font-size: 0.85rem;
          font-weight: 500;
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
        }

        /* Quick Search Section */
        .quick-search {
          padding: 60px 2rem;
          background: white;
          text-align: center;
          margin-top: -40px;
          position: relative;
          z-index: 10;
          max-width: 800px;
          margin-left: auto;
          margin-right: auto;
          border-radius: 16px;
          box-shadow: 0 15px 40px rgba(0, 0, 0, 0.1);
        }

        .quick-search h3 {
          font-size: 1.5rem;
          font-weight: 600;
          color: #333;
          margin-bottom: 2rem;
        }

        .search-options {
          display: flex;
          gap: 1rem;
          justify-content: center;
          flex-wrap: wrap;
        }

        .search-option {
          background: #f8f9fa;
          border: 2px solid #e9ecef;
          padding: 1.5rem;
          border-radius: 12px;
          cursor: pointer;
          transition: all 0.3s ease;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 0.75rem;
          min-width: 150px;
          color: #333;
        }

        .search-option:hover {
          border-color: #667eea;
          background: #667eea;
          color: white;
          transform: translateY(-3px);
          box-shadow: 0 10px 25px rgba(102, 126, 234, 0.3);
        }

        .search-option span {
          font-weight: 500;
        }

        /* Features Section */
        .features {
          padding: 80px 2rem;
          background: #f8f9fa;
          text-align: center;
        }

        .features h2 {
          font-size: 2.5rem;
          font-weight: 700;
          color: #333;
          margin-bottom: 3rem;
        }

        .features-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: 2rem;
          max-width: 1200px;
          margin: 0 auto;
        }

        .feature-card {
          background: white;
          padding: 2.5rem;
          border-radius: 16px;
          transition: all 0.3s ease;
          border: 1px solid rgba(0, 0, 0, 0.05);
        }

        .feature-card:hover {
          transform: translateY(-8px);
          box-shadow: 0 20px 50px rgba(0, 0, 0, 0.15);
        }

        .feature-card svg {
          color: #667eea;
          margin-bottom: 1.5rem;
        }

        .feature-card h3 {
          font-size: 1.5rem;
          font-weight: 600;
          color: #333;
          margin-bottom: 1rem;
        }

        .feature-card p {
          color: #666;
          line-height: 1.6;
        }

        /* How It Works Section */
        .how-it-works {
          padding: 80px 2rem;
          background: white;
          text-align: center;
        }

        .how-it-works h2 {
          font-size: 2.5rem;
          font-weight: 700;
          color: #333;
          margin-bottom: 3rem;
        }

        .steps-container {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: 2rem;
          max-width: 1200px;
          margin: 0 auto;
        }

        .step-icon {
          width: 80px;
          height: 80px;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          color: white;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          margin: 0 auto 1.5rem;
          box-shadow: 0 8px 25px rgba(102, 126, 234, 0.3);
        }

        .step h3 {
          font-size: 1.25rem;
          font-weight: 600;
          color: #333;
          margin-bottom: 0.75rem;
        }

        .step p {
          color: #666;
          line-height: 1.6;
        }

        /* Final CTA Section */
        .final-cta {
          background: linear-gradient(135deg, #764ba2 0%, #667eea 100%);
          color: white;
          padding: 80px 2rem;
          text-align: center;
        }

        .final-cta h2 {
          font-size: 2.5rem;
          font-weight: 700;
          margin-bottom: 1rem;
        }

        .final-cta p {
          font-size: 1.25rem;
          margin-bottom: 2rem;
          opacity: 0.9;
        }

        .cta-buttons {
          display: flex;
          gap: 1rem;
          justify-content: center;
          flex-wrap: wrap;
        }

        /* Responsive Design */
        @media (max-width: 768px) {
          .hero-container {
            grid-template-columns: 1fr;
            gap: 2rem;
            text-align: center;
          }
          
          .hero-title {
            font-size: 2.5rem;
          }
          
          .hero-main-image {
            width: 300px;
            height: 400px;
            transform: none;
          }
          
          .property-overlay {
            position: static;
            transform: none;
            margin-top: 1rem;
          }
          
          .features h2, .how-it-works h2 {
            font-size: 2rem;
          }

          .hero-actions {
            justify-content: center;
          }

          .quick-stats {
            justify-content: center;
          }

          .search-options {
            flex-direction: column;
            align-items: center;
          }

          .cta-buttons {
            flex-direction: column;
            align-items: center;
          }

          .steps-container {
            grid-template-columns: 1fr;
          }
        }

        @media (max-width: 480px) {
          .hero {
            padding: 60px 1rem;
          }
          
          .hero-title {
            font-size: 2rem;
          }
          
          .hero-subtitle {
            font-size: 1.1rem;
          }
          
          .hero-main-image {
            width: 250px;
            height: 300px;
          }

          .hero-actions {
            flex-direction: column;
          }

          .cta-button {
            width: 100%;
            justify-content: center;
          }

          .quick-stats {
            gap: 1rem;
          }

          .stat-number {
            font-size: 1.5rem;
          }

          .quick-search, .features, .how-it-works, .final-cta {
            padding: 60px 1rem;
          }
        }
      `}</style>
    </div>
  );
};

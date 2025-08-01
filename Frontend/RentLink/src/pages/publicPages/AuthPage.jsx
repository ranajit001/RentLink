import { useState,useEffect } from "react";
import { LogIn, UserPlus,House, } from "lucide-react";
import Login from "../../components/Login";
import Register from "../../components/Register";

import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";

export const AuthPage = () => {
  const [mode, setMode] = useState("login");

  const navigate = useNavigate()

  const{auth} = useAuth();
useEffect(() => {
  if (auth?.accessToken) {
    navigate('/dashboard');
  }
}, [auth, navigate]); 

  

  return (
    <div className="auth-page">
      <div className="auth-container">
        <div className="auth-left">
          <h1 className="auth-title"> <House size={50} /> RentLink</h1>
          
          <div className="mode-toggle">
            <button
              className={`toggle-btn ${mode === "login" ? "active" : ""}`}
              onClick={() => setMode("login")}
            >
              <LogIn size={18} />
              Login
            </button>
            <button
              className={`toggle-btn ${mode === "register" ? "active" : ""}`}
              onClick={() => setMode("register")}
            >
              <UserPlus size={18} />
              Register
            </button>
          </div>
        </div>

        <div className="auth-right">
          {mode === "login" ? <Login /> : <Register />}
        </div>
      </div>

      <style>{`
        .auth-page {
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 1rem;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        }

        .auth-container {
          width: 100%;
          max-width: 800px;
          background: white;
          border-radius: 12px;
          display: flex;
          box-shadow: 0 10px 30px rgba(0,0,0,0.1);
          overflow: hidden;
        }

        .auth-left {
          flex: 1;
          padding: 2rem 1.5rem;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          color: white;
          display: flex;
          flex-direction: column;
          justify-content: center;
        }

        .auth-title {
          margin: 0 0 1.5rem 0;
          font-size: 2.5rem;
          font-weight: 700;
          text-align: center;
          color: white;
          display: flex;
          align-items: center; /* vertically center icon and text */
          gap: 10px;           /* space between icon and text */
          font-size: 32px;     /* optional: control text size */

        }

        .mode-toggle {
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
        }

        .toggle-btn {
          padding: 0.75rem 1rem;
          border: 2px solid rgba(255, 255, 255, 0.3);
          background: rgba(255, 255, 255, 0.1);
          color: white;
          font-weight: 500;
          cursor: pointer;
          border-radius: 8px;
          transition: all 0.2s ease;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.5rem;
        }

        .toggle-btn:hover {
          background: rgba(255, 255, 255, 0.2);
          border-color: rgba(255, 255, 255, 0.5);
        }

        .toggle-btn.active {
          background: white;
          color: #667eea;
          border-color: white;
        }

        .auth-right {
          flex: 1;
          padding: 2rem 1.5rem;
          display: flex;
          align-items: center;
        }

        @media (max-width: 768px) {
          .auth-container {
            flex-direction: column;
            max-width: 400px;
          }
          
          .auth-left {
            padding: 1.5rem 1rem;
          }
          
          .auth-title {
            font-size: 2rem;
          }
          
          .mode-toggle {
            flex-direction: row;
            gap: 0.5rem;
          }
          
          .auth-right {
            padding: 1.5rem 1rem;
          }
        }

        @media (max-width: 480px) {
          .auth-page {
            padding: 0.5rem;
          }
          
          .auth-left {
            padding: 1rem;
          }
          
          .auth-right {
            padding: 1rem;
          }
          
          .auth-title {
            font-size: 1.75rem;
          }
        }
      `}</style>
    </div>
  );
};

import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';
import { AuthProvider } from './context/AuthContext.jsx'; // 👈 Add this

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider> {/*  Wrap App */}
      <App />
    </AuthProvider>
  </StrictMode>
);

import React, { createContext, useContext, useEffect, useState } from 'react';
import baseApi from '../utils/baseApi';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {

const saved = JSON.parse(localStorage.getItem('auth'))

  const [auth, setAuth] = useState({
     user:  saved?.user|| null,
    accessToken:saved?.accessToken || null,
  });


  useEffect(() => {
    localStorage.setItem('auth', JSON.stringify(auth));
  }, [auth]);


  //imported to login.jsx and register.jsx
  const loginOrRegister = ({ user, accessToken }) => {
    setAuth({ user, accessToken });
  };


  

  const logout = async () => {
    await fetch(`${baseApi}/api/auth/logout`, {
      method: 'POST',
      credentials: 'include',
    });

    localStorage.removeItem('auth');
    setAuth({ user: null, accessToken: null });
  };

  const refreshAccessToken = async () => {
    try {
      const res = await fetch(`${baseApi}/api/auth/refresh`, {
        method: 'POST',
        credentials: 'include',
      });

      if (!res.ok) throw new Error('Refresh failed');

      const data = await res.json();
      setAuth((prev) => ({ ...prev, accessToken: data.accessToken }));
      return data.accessToken;
    } catch (err) {
        console.log(err);
        
      logout();
      return null;
    }
  };

  return (
    <AuthContext.Provider value={{ auth, loginOrRegister, logout, refreshAccessToken }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);

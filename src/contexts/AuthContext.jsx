// src/contexts/AuthContext.jsx
import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(() => {
    // Load from localStorage if exists
    const user = localStorage.getItem('mentoraUser');
    return user ? JSON.parse(user) : null;
  });

  const login = (userData) => {
    setCurrentUser(userData);
    localStorage.setItem('mentoraUser', JSON.stringify(userData));
  };

  const logout = () => {
    setCurrentUser(null);
    localStorage.removeItem('mentoraUser');
  };

  return (
    <AuthContext.Provider value={{ currentUser, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook
export const useAuth = () => useContext(AuthContext);

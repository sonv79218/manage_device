// AuthContext.jsx
import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(() => localStorage.getItem('token'));
  const [user, setUser] = useState(() => {
    const userJson = localStorage.getItem('user');
    return userJson ? JSON.parse(userJson) : null;
  });

  const updateUser = (newUserData) => {
  localStorage.setItem('user', JSON.stringify(newUserData));
  setUser(newUserData);
};

  const login = (newToken, userPayload) => {
    // lưu token + user
    localStorage.setItem('token', newToken);
    localStorage.setItem('user', JSON.stringify(userPayload));

    setToken(newToken);
    setUser(userPayload);
  };

  const logout = () => {
  const confirmed = window.confirm("Bạn có chắc muốn đăng xuất?");
  if (!confirmed) return;
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setToken(null);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ token, user, login, logout,updateUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);

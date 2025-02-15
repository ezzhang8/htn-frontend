'use client'

import React, { createContext, useContext } from 'react';
import useAuthHook from './useAuth';
// Define the context
const AuthContext = createContext();

// Create a provider component
export const AuthProvider = ({ children }) => {
  const { logged_in, login, logout } = useAuthHook();

  return (
    <AuthContext.Provider value={{ logged_in, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Hook to use the auth context
export const useAuth = () => useContext(AuthContext);
import React, { createContext, useContext, useState, useEffect } from 'react';
import { jwtDecode } from 'jwt-decode';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  // Initialize state by immediately checking token validity
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    const token = localStorage.getItem('token');
    return token && isValidToken(token);
  });

  // Verify if the token is valid and not expired
  function isValidToken(token) {
    try {
      const decodedToken = jwtDecode(token);
      const currentTime = Date.now() / 1000;
      return decodedToken.exp > currentTime;
    } catch (error) {
      return false;
    }
  }

  // Periodically check token validity
  useEffect(() => {
    const checkToken = () => {
      const token = localStorage.getItem('token');
      if (token) {
        if (!isValidToken(token)) {
          // If token is invalid or expired, clear authentication
          setIsAuthenticated(false);
          localStorage.removeItem('token');
        }
      } else {
        // If no token exists, ensure authentication is false
        setIsAuthenticated(false);
      }
    };

    // Check token every 5 minutes
    const interval = setInterval(checkToken, 300000);     
    // Cleanup interval on component unmount
    return () => clearInterval(interval);
  }, []);

  return (
    <AuthContext.Provider value={{ isAuthenticated, setIsAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
import { createContext, useState, useEffect } from 'react';
import api from '../services/api';

// Named exports (no default export)
export const AuthContext = createContext();

// Create the provider component
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const initializeAuth = async () => {
      const token = localStorage.getItem('authToken');
      const userId = localStorage.getItem('userId');
      
      if (token && userId) {
        setIsAuthenticated(true);
        // Try to fetch full user data including role
        try {
          const response = await api.get('/users/profile');
          console.log('AuthContext - Profile API response:', response.data);
          // Handle response structure: { user: {...}, bids: [...] }
          let userData = null;
          if (response.data?.user) {
            // Structure: { user: {...}, bids: [...] } - matches backend format
            userData = response.data.user;
          } else if (response.data?.role || response.data?.email) {
            // Fallback: user data is directly in response.data
            userData = response.data;
          } else {
            // Fallback to basic user data if profile structure is different
            userData = { id: userId };
          }
          console.log('AuthContext - Setting user data:', userData);
          setUser(userData);
        } catch (error) {
          console.error('Error fetching user profile:', error);
          // Fallback to basic user data if API call fails
          setUser({ id: userId });
        }
      }
      setLoading(false);
    };

    initializeAuth();
  }, []);

  const login = async (token, userData) => {
    try {
      console.log('AuthContext - Login userData:', userData);
      localStorage.setItem("authToken", token);
      localStorage.setItem("userId", userData.id);
      setUser(userData);
      setIsAuthenticated(true);
      return true;
    } catch (error) {
      console.error("Login error:", error);
      return false;
    }
  };

  const logout = () => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('userId');
    setIsAuthenticated(false);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// No default export - we're only using named exports
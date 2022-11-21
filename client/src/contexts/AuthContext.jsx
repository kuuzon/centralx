import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import jwtDecode from 'jwt-decode';
import { setHeaderToken } from '../services/api';

// Create our AuthContext [CREATES the WRAPPER]
const AuthContext = React.createContext();

// Create our basic AuthProvider, to allow access to context values [DEFINES the WRAPPER]
export function AuthProvider({ children }) {
  // User State, Mount Request & Variables
  const [user, setUser] = useState(null);
  let navigate = useNavigate();

  useEffect(() => {
    const userData = getCurrentUser();
    setUser(userData);
  }, []);

  // 1. Signup & Login Function
  const loginSaveUser = async (data) => {
    const { token } = data;
    localStorage.setItem("token", token);
    setUser(jwtDecode(token));
    setHeaderToken();
  };

  // 2. Get Current User Function
  function getCurrentUser() {
    try {
      const token = localStorage.getItem("token");
      const savedUser = jwtDecode(token);
      return savedUser;
    } catch (error) {
      return null;
    }
  }
  
  // 3. Logout Function
  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
    setHeaderToken();
    navigate("/login");
  }

  // Passed to Provider as sub-props
  const value = {
    user,
    getCurrentUser,
    loginSaveUser,
    logout
  }

  // The Provider takes a "value" attribute
  return (
    <AuthContext.Provider value={value}>
      { children }
    </AuthContext.Provider>
  )
}

export default AuthContext;
import React, { createContext, useState, useContext } from "react";

// Create a context
const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem("token"));

  const login = (newToken) => {
    console.log("SKKRT");
    localStorage.setItem("token", JSON.stringify(newToken));
    setToken(newToken);
  };

  const logout = () => {
    localStorage.removeItem("token");
    setToken(null);
    console.log("YEET");

    const token = localStorage.getItem("token");
    console.log("Token: ");
    console.log(token);
  };

  return (
    <AuthContext.Provider value={{ token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use the AuthContext
const useAuth = () => useContext(AuthContext);

export { AuthProvider, useAuth };

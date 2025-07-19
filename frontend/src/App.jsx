import { useEffect, useState } from "react";
import "./App.css";
import Signup from "./pages/Signup";
import Login from "./pages/Login.jsx";
import Home from "./pages/Home.jsx";
import { Routes, Route, Navigate } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { checkAuthStatus } from "./lib/axios";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const { isAuthenticated: authStatus } = await checkAuthStatus();
        setIsAuthenticated(authStatus);
      } catch (error) {
        console.error("Auth check failed:", error);
        setIsAuthenticated(false);
      } finally {
        setIsLoading(false);
      }
    };

    checkAuth();
  }, []);

  // Listen for login/signup success and logout
  useEffect(() => {
    const handleAuthSuccess = () => {
      setIsAuthenticated(true);
    };
    
    const handleAuthLogout = () => {
      setIsAuthenticated(false);
    };
    
    window.addEventListener("authSuccess", handleAuthSuccess);
    window.addEventListener("authLogout", handleAuthLogout);
    
    return () => {
      window.removeEventListener("authSuccess", handleAuthSuccess);
      window.removeEventListener("authLogout", handleAuthLogout);
    };
  }, []);
  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-[#101014]">
        <div className="text-white text-xl">Loading...</div>
      </div>
    );
  }

  return (
    <>
      <div>
        <Toaster position="top-center" reverseOrder={false} />
        <Routes>
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route
            path="/"
            element={isAuthenticated ? <Home /> : <Navigate to={"/login"} />}
          />
        </Routes>
      </div>
    </>
  );
}

export default App;

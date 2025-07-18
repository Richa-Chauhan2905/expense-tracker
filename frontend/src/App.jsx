import { useEffect, useState } from "react";
import "./App.css";
import Signup from "./pages/Signup";
import Login from "./pages/Login.jsx";
import Home from "./pages/Home.jsx";
import { Routes, Route, Navigate } from "react-router-dom";
import { Toaster } from "react-hot-toast";

function App() {
  const [token, setToken] = useState(localStorage.getItem("jwt"));

  useEffect(() => {
    const handleStorageChange = () => {
      setToken(localStorage.getItem("jwt"));
    };
    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);
  return (
    <>
      <div>
        <Toaster position="top-center" reverseOrder={false} />
        <Routes>
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route
            path="/"
            element={token ? <Home /> : <Navigate to={"/login"} />}
          />
        </Routes>
      </div>
    </>
  );
}

export default App;

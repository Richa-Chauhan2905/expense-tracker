import { useState } from "react";
import "./App.css";
import Signup from "./pages/Signup";
import Login from "./pages/Login.jsx";
import Home from "./pages/Home.jsx";
import { Routes, Route, Navigate } from "react-router-dom";

function App() {
  const token = localStorage.getItem("jwt");

  return (
    <Routes>
      <Route path="/signup" element={<Signup />} />
      <Route path="/login" element={<Login />} />
      <Route path="/" element={token ? <Home /> : <Navigate to={"/login"} />} />
    </Routes>
  );
}

export default App;

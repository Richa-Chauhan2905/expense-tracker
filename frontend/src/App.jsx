import { useState } from "react";
import "./App.css";
import Signup from "./pages/Signup";
import { useAuthStore } from "./store/useAuthStore.js";
import { Routes, Route, Navigate } from "react-router-dom";

function App() {
  const { authUser } = useAuthStore();

  return (
    <Routes>
      <Route
        path="/signup"
        element={!authUser ? <Signup /> : <Navigate to="/" />}
      />
    </Routes>
  );
}

export default App;

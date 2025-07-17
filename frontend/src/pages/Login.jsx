import React, { useState } from "react";
import piggyBank from "../assets/piggy_bank.png";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useAuth } from "../App";
import axiosInstance from "../components/lib/axios";

const ACCENT = "#fbbf24"; // amber
const SECONDARY = "#64748b"; // slate

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { setIsLoggedIn } = useAuth();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await axiosInstance.post("/user/login", { email, password });
      toast.success("Login successful!");
      localStorage.setItem("spendwise_logged_in", "true");
      setIsLoggedIn(true);
      navigate("/home");
    } catch (err) {
      toast.error(err.response?.data?.message || "Login failed");
      console.log(err);
      localStorage.removeItem("spendwise_logged_in");
      setIsLoggedIn(false);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-[#101014]">
      <div className="flex flex-col items-center mb-8">
        <img
          src={piggyBank}
          alt="SpendWise Logo"
          className="w-20 h-20 rounded-full shadow-lg mb-2 border-4 border-[#222] bg-[#18181b]"
        />
        <h1
          className="text-3xl font-extrabold tracking-wide text-white font-mono"
          style={{ letterSpacing: "0.08em" }}
        >
          SpendWise
        </h1>
      </div>
      <form
        onSubmit={handleLogin}
        className="w-full max-w-md bg-[#18181b] rounded-2xl shadow-2xl p-8 flex flex-col gap-6 border"
        style={{ borderColor: SECONDARY }}
      >
        <h2 className="text-2xl font-bold text-center text-white mb-2">
          Login
        </h2>
        <input
          type="email"
          placeholder="Email"
          className="rounded px-4 py-3 bg-[#232336] text-white focus:outline-none focus:ring-2 focus:ring-amber-400 placeholder-gray-400 shadow border-none"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          className="rounded px-4 py-3 bg-[#232336] text-white focus:outline-none focus:ring-2 focus:ring-amber-400 placeholder-gray-400 shadow border-none"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button
          type="submit"
          disabled={loading}
          className="bg-amber-400 text-[#18181b] py-3 rounded-lg font-semibold shadow hover:bg-amber-500 transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
        >
          {loading ? "Logging in..." : "Login"}
        </button>
        <p className="text-center text-sm mt-2" style={{ color: SECONDARY }}>
          Don't have an account?{" "}
          <a href="/signup" className="text-amber-400 hover:underline">
            Sign up
          </a>
        </p>
      </form>
    </div>
  );
};

export default Login;

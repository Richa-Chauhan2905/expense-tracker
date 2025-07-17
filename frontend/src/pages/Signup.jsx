import React, { useState } from "react";
import piggyBank from "../assets/piggy_bank.png";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import axiosInstance from "../components/lib/axios";

const ACCENT = "#fbbf24"; // amber
const SECONDARY = "#64748b"; // slate

const Signup = () => {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigateTo = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { data } = await axiosInstance.post("/user/signup", {
        fullName,
        email,
        password,
      });

      console.log(data);
      toast.success("Signup successful");
      navigateTo("/home");
      localStorage.setItem("jwt", data.token);

      setFullName("");
      setEmail("");
      setPassword("");
    } catch (error) {
      console.log("Full error response:", error.response?.data);
      console.log(error);
      toast.error(error.response.data.errors || "User registration failed");
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
        onSubmit={handleSignup}
        className="w-full max-w-md bg-[#18181b] rounded-2xl shadow-2xl p-8 flex flex-col gap-6 border"
        style={{ borderColor: SECONDARY }}
      >
        <h2 className="text-2xl font-bold text-center text-white mb-2">
          Sign Up
        </h2>
        <input
          type="text"
          placeholder="Full Name"
          className="rounded px-4 py-3 bg-[#232336] text-white focus:outline-none focus:ring-2 focus:ring-amber-400 placeholder-gray-400 shadow border-none"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
          required
        />
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
          {loading ? "Signing up..." : "Sign Up"}
        </button>
        <p className="text-center text-sm mt-2" style={{ color: SECONDARY }}>
          Already have an account?{" "}
          <a href="/login" className="text-amber-400 hover:underline">
            Login
          </a>
        </p>
      </form>
    </div>
  );
};

export default Signup;

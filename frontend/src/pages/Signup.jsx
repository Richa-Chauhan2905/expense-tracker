import React, { useState } from "react";
import { useAuthStore } from "../store/useAuthStore";
import toast from "react-hot-toast";
import piggyBank from "../assets/piggy_bank.png";

const Signup = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
  });

  const { signup, isSigningUp } = useAuthStore();

  const validateForm = () => {
    if (!formData.fullName.trim()) return toast.error("Full Name is required");
    if (!formData.email.trim()) return toast.error("Email is required");
    if (!/\S+@\S+\.\S+/.test(formData.email))
      return toast.error("Invalid email format");
    if (!formData.password.trim()) return toast.error("Password is required");
    if (formData.password.length < 6)
      return toast.error("Password must be at least 6 characters");
    return true;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const success = validateForm();
    if (success === true) signup(formData);
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
        onSubmit={handleSubmit}
        className="w-full max-w-md bg-[#18181b] rounded-2xl shadow-2xl p-8 flex flex-col gap-6 border border-gray-400"
      >
        <h2 className="text-2xl font-bold text-center text-white mb-2">
          Sign Up
        </h2>

        <input
          type="text"
          placeholder="Full Name"
          className="rounded px-4 py-3 bg-[#232336] text-white focus:outline-none focus:ring-2 focus:ring-amber-400 placeholder-gray-400 shadow border-none"
          value={formData.fullName}
          onChange={(e) =>
            setFormData({ ...formData, fullName: e.target.value })
          }
          required
        />

        <input
          type="email"
          placeholder="Email"
          className="rounded px-4 py-3 bg-[#232336] text-white focus:outline-none focus:ring-2 focus:ring-amber-400 placeholder-gray-400 shadow border-none"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          required
        />

        <input
          type="password"
          placeholder="Password"
          className="rounded px-4 py-3 bg-[#232336] text-white focus:outline-none focus:ring-2 focus:ring-amber-400 placeholder-gray-400 shadow border-none"
          value={formData.password}
          onChange={(e) =>
            setFormData({ ...formData, password: e.target.value })
          }
          required
        />

        <button
          type="submit"
          disabled={isSigningUp}
          className="bg-amber-400 text-[#18181b] py-3 rounded-lg font-semibold shadow hover:bg-amber-500 transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
        >
          {isSigningUp ? "Signing up..." : "Sign Up"}
        </button>

        <p className="text-center text-sm mt-2" style={{ color: "#999999" }}>
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

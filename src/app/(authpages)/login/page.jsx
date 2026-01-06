"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";

const Login = () => {
  const router = useRouter();
  const [user, setUser] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async (event) => {
    event.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: 'include',  // <--- this is crucial
        body: JSON.stringify(user),
        credentials: 'include'
      });   

      const data = await res.json();

      if (res.ok && data.success) {
        console.log("Login successful");
        window.location.href = "/profile";
      } else {
        setError(data.message || "Login failed");
      }

    } catch (err) {
      console.error("Login failed", err);
      setError("Network error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center">
      <div className="w-full max-w-sm p-8 bg-[#0a0a0a] rounded-lg shadow-lg">
        <h2 className="text-2xl font-semibold text-center text-gray-300 mb-6">
          Login to Your Account
        </h2>
        
        {error && (
          <div className="mb-4 p-3 bg-red-900/50 border border-red-500 rounded text-red-300 text-sm">
            {error}
          </div>
        )}
        
        <form className="space-y-4" onSubmit={handleLogin}>
          <input
            type="email"
            placeholder="Email"
            value={user.email}
            onChange={(e) => setUser({ ...user, email: e.target.value })}
            className="w-full px-4 py-3 rounded-md bg-[#1a1a1a] text-white placeholder-gray-400 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-600"
            required
            disabled={loading}
          />
          <input
            type="password"
            placeholder="Password"
            value={user.password}
            onChange={(e) => setUser({ ...user, password: e.target.value })}
            className="w-full px-4 py-3 rounded-md bg-[#1a1a1a] text-white placeholder-gray-400 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-600"
            required
            disabled={loading}
          />
          <button 
            type="submit" 
            disabled={loading}
            className="w-full py-3 rounded-md bg-gradient-to-r from-gray-600 to-gray-800 text-white font-semibold hover:from-gray-500 hover:to-gray-700 transition active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;

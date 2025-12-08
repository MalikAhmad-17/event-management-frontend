import React, { useState } from "react";

const LoginPage = () => {
  const [activeTab, setActiveTab] = useState("login");
  const [role, setRole] = useState("user");

  // Form states
  const [fullname, setFullname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // =====================
  //  HANDLE SIGNUP
  // =====================
  const handleSignup = async () => {
    if (!fullname || !email || !password) {
      alert("All fields are required!");
      return;
    }

    if (role === "admin") {
      alert("Admin signup not allowed.");
      return;
    }

    try {
      const res = await fetch("http://localhost:5000/api/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fullname,
          email,
          password,
          role, // user OR organizer
        }),
      });

      const data = await res.json();

      if (res.ok) {
        alert("Signup successful! Please login.");
        setActiveTab("login");
      } else {
        alert(data.message || "Signup failed");
      }
    } catch (err) {
      console.log(err);
      alert("Server error");
    }
  };

  // =====================
  //  HANDLE LOGIN
  // =====================
  const handleLogin = async () => {
    if (!email || !password) {
      alert("Email & Password required!");
      return;
    }

    try {
      const res = await fetch("http://localhost:5000/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          password,
          role, // user / organizer / admin
        }),
      });

      const data = await res.json();

      if (res.ok) {
        localStorage.setItem("token", data.token);
        localStorage.setItem("user", JSON.stringify(data.user));

        alert(`Logged in as ${data.user.role}`);

        // Redirect based on role
        if (data.user.role === "user") window.location.href = "/user";
        if (data.user.role === "organizer") window.location.href = "/organizer-dashboard";
        if (data.user.role === "admin") window.location.href = "/admin";
      } else {
        alert(data.message || "Invalid login");
      }
    } catch (err) {
      console.log(err);
      alert("Server error");
    }
  };

  // Decide which button should call which function
  const handleSubmit = () => {
    if (activeTab === "login") {
      handleLogin();
    } else {
      handleSignup();
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0A3D91] px-4">

      {/* CARD */}
      <div className="bg-white w-full max-w-md rounded-2xl shadow-lg p-8">

        {/* Logo */}
        <div className="text-center mb-6">
          <h1 className="text-3xl font-semibold text-[#0A3D91] flex justify-center items-center gap-2">
            <span className="text-4xl">📅</span> EventHub
          </h1>
        </div>

        {/* Tabs */}
        <div className="flex bg-gray-100 rounded-full p-1 mb-8">
          <button
            onClick={() => setActiveTab("login")}
            className={`flex-1 py-2 rounded-full text-sm font-medium ${
              activeTab === "login"
                ? "bg-white shadow text-black"
                : "text-gray-500"
            }`}
          >
            Login
          </button>
          <button
            onClick={() => setActiveTab("signup")}
            className={`flex-1 py-2 rounded-full text-sm font-medium ${
              activeTab === "signup"
                ? "bg-white shadow text-black"
                : "text-gray-500"
            }`}
          >
            Sign Up
          </button>
        </div>

        {/* Subtitle */}
        <p className="text-center text-sm text-gray-600 mb-4">
          {activeTab === "login"
            ? "Sign in to your account"
            : "Create a new account"}
        </p>

        {/* ROLE SELECTOR */}
        <div className="flex gap-2 mb-6">
          {["user", "organizer", "admin"].map((r) => (
            <button
              key={r}
              onClick={() => setRole(r)}
              className={`flex-1 text-sm py-2 rounded-lg border ${
                role === r
                  ? "bg-green-600 text-white border-green-600"
                  : "bg-white text-gray-600 border-gray-300"
              }`}
            >
              {r.charAt(0).toUpperCase() + r.slice(1)}
            </button>
          ))}
        </div>

        {/* Fullname for Signup */}
        {activeTab === "signup" && (
          <div className="mb-4">
            <label className="text-sm text-gray-700">Full Name</label>
            <input
              type="text"
              placeholder="John Doe"
              value={fullname}
              onChange={(e) => setFullname(e.target.value)}
              className="w-full mt-1 px-4 py-2 rounded-lg bg-gray-100 focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>
        )}

        {/* Email */}
        <div className="mb-4">
          <label className="text-sm text-gray-700">Email</label>
          <input
            type="email"
            placeholder="you@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full mt-1 px-4 py-2 rounded-lg bg-gray-100 focus:ring-2 focus:ring-blue-500 outline-none"
          />
        </div>

        {/* Password */}
        <div className="mb-6">
          <label className="text-sm text-gray-700">Password</label>
          <input
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full mt-1 px-4 py-2 rounded-lg bg-gray-100 focus:ring-2 focus:ring-blue-500 outline-none"
          />
        </div>

        {/* Button */}
        <button
          onClick={handleSubmit}
          className="w-full bg-green-600 hover:bg-green-700 transition text-white py-3 rounded-lg text-sm font-semibold"
        >
          {activeTab === "login" ? "Login" : "Create Account"}
        </button>

        <p className="text-center text-xs text-gray-500 mt-3">
          Demo: Use any email/password to login
        </p>
      </div>
    </div>
  );
};

export default LoginPage;

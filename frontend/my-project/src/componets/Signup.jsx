import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

export const Signup = () => {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");

  async function createAc() {
    try {
      const res = await axios.post(
        "https://story-app-backend-hlrp.onrender.com/signup",
        {
          name: name,
          password: password,
        }
      );

      console.log(res.data);
      toast.success("Account created successfully");
    } catch (error) {
      console.log(error.response?.data || error.message);
      toast.error("Signup failed");
    }
  }

  return (
    <div className="min-h-screen bg-slate-900 text-white flex items-center justify-center px-4">

      <div className="w-full max-w-md bg-white text-black rounded-2xl p-8 shadow-2xl">

        {/* Heading */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold tracking-tight">
            Create Account
          </h1>

          <p className="text-gray-500 mt-2 text-sm">
            Create your account to continue
          </p>
        </div>

        {/* Name */}
        <div className="mb-5">
          <label className="block text-sm font-semibold mb-2">
            Name
          </label>

          <input
            type="text"
            placeholder="Enter your name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:border-black focus:ring-1 focus:ring-black transition"
          />
        </div>

        {/* Password */}
        <div className="mb-6">
          <label className="block text-sm font-semibold mb-2">
            Password
          </label>

          <input
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:border-black focus:ring-1 focus:ring-black transition"
          />
        </div>

        {/* Button */}
        <button
          onClick={createAc}
          className="w-full bg-purple-600 hover:bg-purple-700
      text-white font-semibold py-3 rounded-lg
      transition duration-200"
        >
          Create Account
        </button>

        {/* Bottom text */}
        <p className="text-center text-gray-500 text-sm mt-6">
          By creating an account, you agree to continue.
        </p>

      </div>
    </div>
  );
};
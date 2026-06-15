import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
const API_URL = import.meta.env.VITE_API_URL;

const SignInPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();

    if (!email || !password) {
      setMessage("All fields are required");
      return;
    }

    try {
      setLoading(true);
      setMessage("");

      const response = await axios.post(`${API_URL}/api/auth/login`, {
        email,
        password
      });

      setMessage("User signed in successfully");

      if (response.data.token) {
        localStorage.setItem("token", response.data.token);
      }

      navigate("/");
    } catch (error) {
      console.error(error);

      if (error.response) {
        setMessage(error.response.data.message || "Sign in failed");
      } else if (error.request) {
        setMessage("Server not responding");
      } else {
        setMessage("Something went wrong");
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">Sign In</h2>

        {message && (
          <p className={`text-center text-sm mb-4 ${message === "User signed in successfully" ? "text-green-500" : "text-red-500"}`}>
            {message}
          </p>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 text-white font-semibold py-2 px-4 rounded-md hover:bg-blue-700 transition duration-300 disabled:bg-gray-400"
          >
            {loading ? "Signing In..." : "Sign In"}
          </button>

          <p className="text-center mt-4">
            Don't have an account?{" "}
            <Link to="/signup" className="text-blue-600 hover:underline">
              Sign Up
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default SignInPage;
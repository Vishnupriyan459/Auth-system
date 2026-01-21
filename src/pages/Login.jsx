import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../api/axios";
import useAuthStore from "../store/useAuthStore";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const response = await login(username, password);
    
      useAuthStore.getState().loginSuccess(response);
      navigate("/");
    } catch (error) {
      console.error("Login failed:", error);
      setError(
        typeof error.message === "string" ? error.message : "Login failed",
      );
    } finally {
      setLoading(false);
    }
  };
  return (
    <section className="w-screen min-h-screen flex items-center justify-center bg-gray-100">
      <div className="mx-4 p-9 bg-white rounded shadow-md w-full max-w-sm space-y-5">
        <h1 className="text-center text-3xl">Login</h1>
        <p className="text-center text-md">
          Please enter your credentials to login.
        </p>
        {error && (
          <div className="bg-red-100 text-red-700 p-3 rounded">{error}</div>
        )}
        <form
          onSubmit={handleLogin}
          className="flex flex-col gap-4 max-w-sm mx-auto"
        >
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            id="username"
            name="username"
            placeholder="Enter your username"
            className="bg-gray-100 border border-gray-300 rounded px-3 py-2"
            value={username}
            onChange={(e) => {
              setUsername(e.target.value);
              setError(null);
            }}
            required
          />

          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            name="password"
            placeholder="Enter your password"
            className="bg-gray-100 border border-gray-300 rounded px-3 py-2"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
              setError(null);
            }}
            required
          />

          <input
            type="submit"
            value={loading ? "Logging in..." : "Login"}
            disabled={loading}
            className="bg-blue-800 text-white px-4 py-2 rounded"
          />
        </form>
      </div>
    </section>
  );
}

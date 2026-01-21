import { Routes, Route } from "react-router-dom";
import { useEffect } from "react";
import axios from "axios";
import Cookies from "js-cookie";

import useAuthStore from "./store/useAuthStore";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import ProtectedRoute from "./components/ProtectedRoute";

export default function App() {
  const { restoreSessionSuccess, logout } = useAuthStore();

  useEffect(() => {
    const restoreSession = async () => {
      const token = Cookies.get("token");

      
      if (!token) {
        logout();
        return;
      }

      try {
        
        const res = await axios.get(
          "https://dummyjson.com/auth/me",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

       
        restoreSessionSuccess(res.data);
      } catch (error) {
        
        logout();
      }
    };

    restoreSession();
  }, [restoreSessionSuccess, logout]);

  return (
    <Routes>
      <Route
        path="/"
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        }
      />
      <Route path="/login" element={<Login />} />
    </Routes>
  );
}

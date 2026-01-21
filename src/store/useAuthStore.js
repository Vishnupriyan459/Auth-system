import { create } from "zustand";
import Cookies from "js-cookie";

let accessToken = null;

const useAuthStore = create((set) => ({
  user: null,
  isAuthenticated: false,
  isLoading: true,

  // ✅ Called after successful login
  loginSuccess: (data) => {
    accessToken = data.accessToken;

    // store token in cookies (PERSISTENCE)
    Cookies.set("token", data.accessToken);

    set({
      user: {
        id: data.id,
        username: data.username,
        email: data.email,
        firstName: data.firstName,
        lastName: data.lastName,
        image: data.image,
      },
      isAuthenticated: true,
      isLoading: false,
    });
  },

  // ✅ Called on app load after /auth/me success
  restoreSessionSuccess: (userData) => {
    const token = Cookies.get("token");
    accessToken = token || null;

    set({
      user: userData,
      isAuthenticated: true,
      isLoading: false,
    });
  },

  // ✅ Logout clears everything
  logout: () => {
    accessToken = null;
    Cookies.remove("token");

    set({
      user: null,
      isAuthenticated: false,
      isLoading: false,
    });
  },

  // ✅ Used by Axios interceptor
  getAccessToken: () => accessToken,
}));

export default useAuthStore;

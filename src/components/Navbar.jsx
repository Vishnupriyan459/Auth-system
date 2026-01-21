import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useAuthStore from "../store/useAuthStore";
import { IoPersonCircle } from "react-icons/io5";
import { CiLogout } from "react-icons/ci";
export default function Navbar() {
  const navigate = useNavigate();
  const { user, logout } = useAuthStore();
  const [open, setOpen] = useState(false);
  const menuRef = useRef(null);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <nav className="w-full px-6 py-4 bg-blue-900 text-white flex items-center justify-between px-8">
      {/* App Name */}
      <div className="text-2xl font-semibold">Auth Dashboard</div>

      {/* Profile Dropdown */}
      {user && (
        <div className="relative" ref={menuRef}>
          <div
            onClick={() => setOpen((prev) => !prev)}
            className="p-0 bg-transparent border-none outline-none focus:outline-none focus:ring-0"
          >
            <IoPersonCircle className="text-3xl text-white cursor-pointer" />
          </div>

          {open && (
            <div className="absolute right-0 mt-2 w-40 bg-white text-black rounded shadow-md">
              <div className="px-4 py-2 ">
                <p className="text-sm font-medium">
                  Are you want to logout, <span className="font-bold">{user.username}</span>?
                </p>
              </div>

              <div
                onClick={handleLogout}
                className="w-full text-left px-4 py-2 hover:text-red-600 cursor-pointer flex items-center gap-2"
              >
                Logout
                
                <CiLogout />
              </div>
            </div>
          )}
        </div>
      )}
    </nav>
  );
}

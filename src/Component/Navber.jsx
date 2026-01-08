import React, { useContext, useEffect, useState } from "react";
import { NavLink, useLocation } from "react-router";
import { FaHome, FaBoxOpen, FaUserCircle, FaMoon, FaSun, FaBars, FaTimes } from "react-icons/fa";
import { MdDashboard, MdContactSupport, MdInfo } from "react-icons/md";
import { IoLogIn, IoLogOutOutline } from "react-icons/io5";
import { AuthContext } from "../Context/AuthContext";
import toast from "react-hot-toast";
import Logo from "./logo/Logo";
import { motion, AnimatePresence } from "framer-motion";

const Navbar = () => {
  const { user, signOutUser } = useContext(AuthContext);
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  useEffect(() => setIsMenuOpen(false), [location.pathname]);

  const handleLogout = () => {
    signOutUser()
      .then(() => {
        toast.success("Logged out successfully");
        setIsMenuOpen(false);
      })
      .catch((err) => toast.error(err.message));
  };

  // Desktop nav link style
  const desktopLinkClass = ({ isActive }) =>
    isActive
      ? "flex items-center gap-1 text-blue-600 font-semibold hover:text-blue-700 transition-colors"
      : "flex items-center gap-1 text-gray-700 dark:text-gray-300 hover:text-blue-500 transition-colors";

  // Mobile sidebar link style
  const mobileLinkClass = ({ isActive }) =>
    `flex items-center gap-3 px-5 py-3 rounded-2xl transition-all duration-300 w-full ${
      isActive
        ? "bg-blue-600 text-white shadow-md font-bold"
        : "text-gray-800 dark:text-gray-100 hover:bg-gray-100 dark:hover:bg-gray-800 font-semibold"
    }`;

  return (
    <nav className="sticky top-0 z-[1000] bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 h-16 md:h-20 flex items-center justify-between">
        {/* Left: Logo & Mobile Toggle */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => setIsMenuOpen(true)}
            className="lg:hidden p-2.5 text-gray-700 dark:text-white bg-gray-50 dark:bg-gray-800 rounded-xl"
          >
            <FaBars size={22} />
          </button>

          <div className="flex items-center gap-2">
            <Logo theme={theme} />
            <span className="text-xl md:text-2xl font-black bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600 tracking-tighter hidden sm:block">
              IMPORT HUB
            </span>
          </div>
        </div>

        {/* ===== Desktop Links ===== */}
        <ul className="hidden lg:flex items-center gap-6 font-medium">
          <NavLink to="/" className={desktopLinkClass}><FaHome className="inline-block" /> Home</NavLink>
          <NavLink to="/all-products" className={desktopLinkClass}><FaBoxOpen className="inline-block" /> Explore</NavLink>
          <NavLink to="/about" className={desktopLinkClass}><MdInfo className="inline-block" /> About</NavLink>
          <NavLink to="/contact" className={desktopLinkClass}><MdContactSupport className="inline-block" /> Contact</NavLink>
          {user && <NavLink to="/dashboard" className={desktopLinkClass}><MdDashboard className="inline-block" /> Dashboard</NavLink>}
        </ul>

        {/* ===== Right: Theme & User ===== */}
        <div className="flex items-center gap-3">
          {/* Theme toggle */}
          <button
            onClick={() => setTheme(theme === "light" ? "dark" : "light")}
            className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
          >
            {theme === "dark" ? <FaSun className="text-yellow-400 text-lg" /> : <FaMoon className="text-blue-600 text-lg" />}
          </button>

          {/* User / Auth */}
          {user ? (
            <div className="dropdown dropdown-end relative">
              <label tabIndex={0} className="cursor-pointer flex items-center">
                {user.photoURL ? (
                  <img src={user.photoURL} alt="user" className="w-10 h-10 rounded-full border-2 border-blue-500 object-cover" />
                ) : (
                  <FaUserCircle className="text-3xl text-blue-600" />
                )}
              </label>
              <ul tabIndex={0} className="dropdown-content absolute mt-3 p-4 shadow-2xl bg-white dark:bg-gray-800 rounded-xl w-60 border border-gray-100 dark:border-gray-700">
                <div className="p-3 bg-gray-50 dark:bg-gray-800 rounded-xl mb-1 text-center">
                  <p className="font-bold text-gray-900 dark:text-white text-sm truncate">{user.displayName || "User"}</p>
                  <p className="text-xs text-gray-500 truncate">{user.email}</p>
                </div>
                <li>
                  <NavLink to="/dashboard" className="flex items-center gap-2 p-3 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-xl text-gray-700 dark:text-gray-200">
                    <MdDashboard className="inline-block" /> Dashboard
                  </NavLink>
                </li>
                <button onClick={handleLogout} className="w-full flex items-center gap-2 p-3 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-xl font-bold">
                  <IoLogOutOutline size={20} /> Logout
                </button>
              </ul>
            </div>
          ) : (
            <NavLink to="/login" className="px-5 py-2.5 bg-blue-600 text-white font-bold rounded-xl shadow-md active:scale-95 transition-all flex items-center gap-2">
              <IoLogIn size={20} /> Login
            </NavLink>
          )}
        </div>
      </div>

      {/* ===== Mobile Sidebar ===== */}
      <AnimatePresence>
        {isMenuOpen && (
          <div className="fixed inset-0 z-[2000] lg:hidden">
            {/* Overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMenuOpen(false)}
              className="absolute inset-0 bg-black/70 backdrop-blur-sm"
            />

            {/* Sidebar */}
            <motion.div
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "tween", duration: 0.3 }}
              className="absolute top-0 left-0 bottom-0 w-[85%] max-w-[320px] bg-white dark:bg-gray-900 shadow-2xl flex flex-col overflow-hidden"
            >
              {/* Header */}
              <div className="flex items-center justify-between p-5 border-b dark:border-gray-800 bg-gray-50 dark:bg-gray-800/50">
                <div className="flex items-center gap-2">
                  <Logo theme={theme} />
                  <span className="font-bold text-lg dark:text-white">IMPORT HUB</span>
                </div>
                <button
                  onClick={() => setIsMenuOpen(false)}
                  className="p-2.5 bg-white dark:bg-gray-900 shadow rounded-xl text-gray-600 dark:text-gray-300 border dark:border-gray-700"
                >
                  <FaTimes size={20} />
                </button>
              </div>

              {/* Links */}
              <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-2 bg-white dark:bg-gray-900">
                <p className="text-[11px] font-bold text-gray-400 uppercase tracking-widest ml-4 mb-2 mt-2">Main Navigation</p>
                <NavLink onClick={() => setIsMenuOpen(false)} to="/" className={mobileLinkClass}><FaHome className="inline-block" /> Home</NavLink>
                <NavLink onClick={() => setIsMenuOpen(false)} to="/all-products" className={mobileLinkClass}><FaBoxOpen className="inline-block" /> Explore Products</NavLink>
                <NavLink onClick={() => setIsMenuOpen(false)} to="/about" className={mobileLinkClass}><MdInfo className="inline-block" /> About Us</NavLink>
                <NavLink onClick={() => setIsMenuOpen(false)} to="/contact" className={mobileLinkClass}><MdContactSupport className="inline-block" /> Contact Support</NavLink>
                {user && <NavLink onClick={() => setIsMenuOpen(false)} to="/dashboard" className={mobileLinkClass}><MdDashboard className="inline-block" /> Dashboard</NavLink>}
              </div>

              {/* Footer */}
              <div className="p-6 border-t dark:border-gray-800 bg-gray-50 dark:bg-gray-900">
                {user ? (
                  <button
                    onClick={handleLogout}
                    className="w-full flex items-center justify-center gap-3 p-4 bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 rounded-2xl font-bold border border-red-100 dark:border-red-900/30"
                  >
                    <IoLogOutOutline size={22} /> Logout Account
                  </button>
                ) : (
                  <NavLink
                    onClick={() => setIsMenuOpen(false)}
                    to="/login"
                    className="flex items-center justify-center gap-3 p-4 bg-blue-600 text-white rounded-2xl font-bold shadow-lg shadow-blue-500/20"
                  >
                    <IoLogIn size={22} /> Login / Register
                  </NavLink>
                )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;

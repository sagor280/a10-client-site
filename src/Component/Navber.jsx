import React, { useContext } from "react";
import { Link, NavLink } from "react-router";
import { FaGlobe, FaBoxOpen, FaUserCircle } from "react-icons/fa";
import { MdImportExport, MdAddBox } from "react-icons/md";
import { IoLogIn } from "react-icons/io5";
import { AuthContext } from "../Context/AuthContext";
import toast from "react-hot-toast";

const Navbar = () => {
  const authContext = useContext(AuthContext);
  const { user, signOutUser } = authContext;

  const handleLogout = () => {
    signOutUser()
      .then(() => {
        toast.success("Logged out successfully!");
      })
      .catch((error) => toast.error(error.message));
  };

  return (
    <div className="sticky top-0 z-50 navbar py-3 min-h-16 rounded-2xl shadow-lg bg-white/70 backdrop-blur-xl border border-white/20 max-w-7xl mx-auto px-4 ">
      <div className="navbar-start">
        {/* Mobile Dropdown */}
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 text-gray-700"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-white/90 backdrop-blur-md rounded-xl z-10 mt-3 w-56 p-2 shadow-xl border border-gray-200"
          >
            <li>
              <NavLink to="/" className="nav-link">
                <FaBoxOpen /> Home
              </NavLink>
            </li>
            <li>
              <NavLink to="/all-products" className="nav-link">
                <FaBoxOpen /> All Products
              </NavLink>
            </li>
            <li>
              <NavLink to="/my-exports" className="nav-link">
                <MdImportExport /> My Exports
              </NavLink>
            </li>
            <li>
              <NavLink to="/my-imports" className="nav-link">
                <MdImportExport /> My Imports
              </NavLink>
            </li>
            <li>
              <NavLink to="/add-export" className="nav-link">
                <MdAddBox /> Add Export
              </NavLink>
            </li>
          </ul>
        </div>

        {/* Logo */}
        <Link
          to="/"
          className="flex items-center gap-2 text-2xl font-extrabold tracking-tight bg-clip-text text-transparent bg-linear-to-r from-blue-500 to-indigo-600"
        >
          <FaGlobe className="text-3xl text-primary" />
          Import Export Hub
        </Link>
      </div>

      {/* Desktop Menu */}
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1 gap-2 font-medium text-gray-700">
          <li>
            <NavLink to="/" className="nav-link">
              <FaBoxOpen /> Home
            </NavLink>
          </li>
          <li>
            <NavLink to="/all-products" className="nav-link">
              <FaBoxOpen /> All Products
            </NavLink>
          </li>
          <li>
            <NavLink to="/my-exports" className="nav-link">
              <MdImportExport /> My Exports
            </NavLink>
          </li>
          <li>
            <NavLink to="/my-imports" className="nav-link">
              <MdImportExport /> My Imports
            </NavLink>
          </li>
          <li>
            <NavLink to="/add-export" className="nav-link">
              <MdAddBox /> Add Export
            </NavLink>
          </li>
        </ul>
      </div>

      {/* Right Side (Auth Buttons) */}
      <div className="navbar-end flex items-center gap-3">
        {user ? (
          <>
            {/* Profile Image */}
            {user.photoURL ? (
              <img
                src={user.photoURL}
                alt="User"
                className="w-10 h-10 rounded-full border-2 border-blue-500"
                title={user.displayName || "User"}
              />
            ) : (
              <FaUserCircle className="text-3xl text-gray-600" title="User" />
            )}

            {/* Logout Button */}
            <button
              onClick={handleLogout}
              className="btn btn-sm rounded-full bg-linear-to-r from-blue-500 to-indigo-600 text-white border-none shadow-md hover:shadow-lg hover:scale-105 transition-transform duration-300"
            >
              Logout
            </button>
          </>
        ) : (
          <Link
            to="/login"
            className="btn btn-sm rounded-full bg-linear-to-r from-blue-500 to-indigo-600 text-white border-none shadow-md hover:shadow-lg hover:scale-105 transition-transform duration-300"
          >
            <IoLogIn className="text-lg" />
            Login / Register
          </Link>
        )}
      </div>
    </div>
  );
};

export default Navbar;
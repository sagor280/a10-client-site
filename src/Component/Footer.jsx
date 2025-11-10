import React from "react";
import { Link } from "react-router";
import { FaGlobe, FaFacebook, FaXTwitter, FaLinkedin } from "react-icons/fa6";

const Footer = () => {
     const currentYear = new Date().getFullYear();
  return (
    <footer className="bg-white/70 backdrop-blur-xl border-t border-white/20 mt-16">
      <div className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-1 md:grid-cols-4 gap-10 text-gray-700">
        
        {/* 🌍 Brand Section */}
        <div>
          <div className="flex items-center gap-2 mb-4">
            <div className="p-2 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-lg shadow-md">
              <FaGlobe className="text-white text-lg" />
            </div>
            <span className="text-xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-indigo-600">
              Import Export Hub
            </span>
          </div>
          <p className="text-gray-600 leading-relaxed">
            Your trusted global partner for import and export operations — connecting businesses across borders with ease and security.
          </p>
        </div>

        <div>
          <h3 className="font-semibold text-lg mb-4 text-gray-800">Quick Links</h3>
          <ul className="space-y-2">
            <li>
              <Link
                to="/all-products"
                className="text-gray-600 hover:text-blue-600 transition-colors duration-300"
              >
                All Products
              </Link>
            </li>
            <li>
              <Link
                to="/my-exports"
                className="text-gray-600 hover:text-blue-600 transition-colors duration-300"
              >
                My Exports
              </Link>
            </li>
            <li>
              <Link
                to="/add-export"
                className="text-gray-600 hover:text-blue-600 transition-colors duration-300"
              >
                Add Export
              </Link>
            </li>
            <li>
              <Link
                to="/login"
                className="text-gray-600 hover:text-blue-600 transition-colors duration-300"
              >
                Login / Register
              </Link>
            </li>
          </ul>
        </div>

        
        <div>
          <h3 className="font-semibold text-lg mb-4 text-gray-800">Contact</h3>
          <ul className="space-y-2 text-gray-600">
            <li>✉ info@importhub.com</li>
            <li> +1 (555) 123-4567</li>
            <li> 123 Trade Street, New York, USA</li>
          </ul>
        </div>

        {/* 🌐 Social Media */}
        <div>
          <h3 className="font-semibold text-lg mb-4 text-gray-800">Follow Us</h3>
          <div className="flex gap-3">
            <a
              href="#"
              className="w-10 h-10 flex items-center justify-center rounded-full bg-blue-100 text-blue-600 hover:bg-gradient-to-r hover:from-blue-500 hover:to-indigo-600 hover:text-white transition-all duration-300 hover:scale-110 shadow-sm"
            >
              <FaFacebook className="text-lg" />
            </a>
            <a
              href="#"
              className="w-10 h-10 flex items-center justify-center rounded-full bg-blue-100 text-blue-600 hover:bg-gradient-to-r hover:from-blue-500 hover:to-indigo-600 hover:text-white transition-all duration-300 hover:scale-110 shadow-sm"
            >
              <FaXTwitter className="text-lg" />
            </a>
            <a
              href="#"
              className="w-10 h-10 flex items-center justify-center rounded-full bg-blue-100 text-blue-600 hover:bg-gradient-to-r hover:from-blue-500 hover:to-indigo-600 hover:text-white transition-all duration-300 hover:scale-110 shadow-sm"
            >
              <FaLinkedin className="text-lg" />
            </a>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="border-t border-white/30 py-6 text-center text-gray-500 text-sm backdrop-blur-md">
        © {currentYear} <span className="font-semibold text-gray-800">Import Export Hub</span>. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;

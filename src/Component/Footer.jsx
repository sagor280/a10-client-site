import React from "react";
import { Link } from "react-router";
import { FaGlobe, FaFacebook, FaXTwitter, FaLinkedin } from "react-icons/fa6";

const Footer = () => {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="bg-white/70 dark:bg-gray-900/80 backdrop-blur-xl border-t border-white/20 dark:border-gray-700 mt-16 transition-colors duration-500">
            <div className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-1 md:grid-cols-4 gap-10 text-gray-700 dark:text-gray-300 transition-colors duration-500">
                
              {/*  Brand Section */}
                <div>
                    <div className="flex items-center gap-2 mb-4">
                        <div className="p-2 bg-linear-to-r from-blue-500 to-indigo-600 rounded-lg shadow-md">
                            <FaGlobe className="text-white text-lg" />
                        </div>
                        <span className="text-xl font-extrabold bg-clip-text text-transparent bg-linear-to-r from-blue-500 to-indigo-600">
                            Import Export Hub
                        </span>
                    </div>
                    <p className="leading-relaxed text-gray-600 dark:text-gray-400">
                        Your trusted global partner for import and export operations — connecting businesses across borders with ease and security.
                    </p>
                </div>

                {/* Quick Links */}
                <div>
                    <h3 className="font-semibold text-lg mb-4 text-gray-800 dark:text-gray-200">Quick Links</h3>
                    <ul className="space-y-2">
                        <li>
                            <Link
                                to="/all-products"
                                className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-300"
                            >
                                All Products
                            </Link>
                        </li>
                        <li>
                            <Link
                                to="/my-exports"
                                className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-300"
                            >
                                My Exports
                            </Link>
                        </li>
                        <li>
                            <Link
                                to="/add-export"
                                className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-300"
                            >
                                Add Export
                            </Link>
                        </li>
                        <li>
                            <Link
                                to="/login"
                                className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-300"
                            >
                                Login / Register
                            </Link>
                        </li>
                    </ul>
                </div>

                {/* Contact */}
                <div>
                    <h3 className="font-semibold text-lg mb-4 text-gray-800 dark:text-gray-200">Contact</h3>
                    <ul className="space-y-2 text-gray-600 dark:text-gray-400">
                        <li>✉ info@importhub.com</li>
                        <li>+1 (555) 123-4567</li>
                        <li>123 Trade Street, New York, USA</li>
                    </ul>
                </div>

                {/*  Social Media */}
                <div>
                    <h3 className="font-semibold text-lg mb-4 text-gray-800 dark:text-gray-200">Follow Us</h3>
                    <div className="flex gap-3">
                        <a
                            href="#"
                            className="w-10 h-10 flex items-center justify-center rounded-full bg-blue-100 dark:bg-gray-700 text-blue-600 dark:text-blue-400 hover:bg-linear-to-r hover:from-blue-500 hover:to-indigo-600 hover:text-white transition-all duration-300 hover:scale-110 shadow-sm"
                        >
                            <FaFacebook className="text-lg" />
                        </a>
                        <a
                            href="#"
                            className="w-10 h-10 flex items-center justify-center rounded-full bg-blue-100 dark:bg-gray-700 text-blue-600 dark:text-blue-400 hover:bg-linear-to-r hover:from-blue-500 hover:to-indigo-600 hover:text-white transition-all duration-300 hover:scale-110 shadow-sm"
                        >
                            <FaXTwitter className="text-lg" />
                        </a>
                        <a
                            href="#"
                            className="w-10 h-10 flex items-center justify-center rounded-full bg-blue-100 dark:bg-gray-700 text-blue-600 dark:text-blue-400 hover:bg-linear-to-r hover:from-blue-500 hover:to-indigo-600 hover:text-white transition-all duration-300 hover:scale-110 shadow-sm"
                        >
                            <FaLinkedin className="text-lg" />
                        </a>
                    </div>
                </div>
            </div>

            {/* Copyright */}
            <div className="border-t border-white/30 dark:border-gray-700 py-6 text-center text-gray-500 dark:text-gray-400 text-sm backdrop-blur-md transition-colors duration-500">
                © {currentYear} <span className="font-semibold text-gray-800 dark:text-gray-200">Import Export Hub</span>. All rights reserved.
            </div>
        </footer>
    );
};

export default Footer;

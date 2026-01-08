import React from "react";
import { Link } from "react-router";
import { FaFacebook, FaXTwitter, FaLinkedin, FaEnvelope, FaPhone, FaLocationDot } from "react-icons/fa6";
import Logo from "../Component/logo/Logo";

const Footer = () => {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="bg-white dark:bg-[#0b0f1a] border-t border-gray-100 dark:border-gray-800 mt-20 transition-colors duration-500">
            <div className="max-w-7xl mx-auto px-6 py-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 text-gray-700 dark:text-gray-300">
                
                {/* Brand Section */}
                <div className="space-y-6">
                    <div className="transition-transform duration-500 hover:scale-105 inline-block">
                        <Logo />
                    </div>
                    <p className="leading-relaxed text-gray-500 dark:text-gray-400 text-sm font-medium max-w-xs">
                        Connecting global markets through seamless import and export solutions. Your trust, our commitment to excellence.
                    </p>
                    <div className="flex gap-4">
                        {[
                            { icon: <FaFacebook />, link: "#" },
                            { icon: <FaXTwitter />, link: "#" },
                            { icon: <FaLinkedin />, link: "#" }
                        ].map((social, index) => (
                            <a
                                key={index}
                                href={social.link}
                                className="w-9 h-9 flex items-center justify-center rounded-xl bg-gray-50 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-blue-600 hover:text-white dark:hover:bg-blue-600 transition-all duration-300 shadow-sm"
                            >
                                {social.icon}
                            </a>
                        ))}
                    </div>
                </div>

                {/* Quick Links */}
                <div>
                    <h3 className="font-bold text-gray-900 dark:text-white uppercase tracking-widest text-xs mb-6">Marketplace</h3>
                    <ul className="space-y-4 text-sm font-medium">
                        {[
                            { name: "All Products", path: "/all-products" },
                            { name: "Trade Map", path: "/trade-map" },
                            { name: "My Exports", path: "/my-exports" },
                            { name: "Add Export", path: "/add-export" }
                        ].map((link) => (
                            <li key={link.name}>
                                <Link
                                    to={link.path}
                                    className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-300 flex items-center gap-1 group"
                                >
                                    <span className="w-0 group-hover:w-2 h-0.5 bg-blue-600 transition-all duration-300"></span>
                                    {link.name}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Support & Legal */}
                <div>
                    <h3 className="font-bold text-gray-900 dark:text-white uppercase tracking-widest text-xs mb-6">Resources</h3>
                    <ul className="space-y-4 text-sm font-medium">
                        <li><Link to="/help" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-300">Help Center</Link></li>
                        <li><Link to="/terms" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-300">Terms of Service</Link></li>
                        <li><Link to="/privacy" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-300">Privacy Policy</Link></li>
                        <li><Link to="/login" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-300 font-bold text-blue-600">Merchant Portal</Link></li>
                    </ul>
                </div>

                {/* Contact Info */}
                <div>
                    <h3 className="font-bold text-gray-900 dark:text-white uppercase tracking-widest text-xs mb-6">Get in Touch</h3>
                    <ul className="space-y-4 text-sm">
                        <li className="flex items-start gap-3">
                            <FaEnvelope className="mt-1 text-blue-600" />
                            <span className="text-gray-500 dark:text-gray-400">support@importhub.com</span>
                        </li>
                        <li className="flex items-start gap-3">
                            <FaPhone className="mt-1 text-blue-600" />
                            <span className="text-gray-500 dark:text-gray-400">+1 (555) 000-1234</span>
                        </li>
                        <li className="flex items-start gap-3">
                            <FaLocationDot className="mt-1 text-blue-600" />
                            <span className="text-gray-500 dark:text-gray-400">Global Trade Tower, Level 42, NY</span>
                        </li>
                    </ul>
                </div>
            </div>

            {/* Bottom Bar */}
            <div className="bg-gray-50/50 dark:bg-black/20 border-t border-gray-100 dark:border-gray-800 transition-colors duration-500">
                <div className="max-w-7xl mx-auto px-6 py-8 flex flex-col md:flex-row justify-between items-center gap-4">
                    <p className="text-gray-500 dark:text-gray-400 text-xs font-medium">
                        © {currentYear} <span className="text-gray-900 dark:text-white font-bold">Import Export Hub</span>. Global Solutions.
                    </p>
                    <div className="flex gap-6 text-xs font-bold text-gray-400">
                        <span className="cursor-pointer hover:text-blue-600 transition-colors">English (US)</span>
                        <span className="cursor-pointer hover:text-blue-600 transition-colors">USD ($)</span>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
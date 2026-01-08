import React from 'react';
import { Link } from 'react-router';
import logo from "../../assets/import.png"

const Logo = () => {
    return (
        <Link
      to="/"
      className="flex items-center justify-center select-none"
      aria-label="Import Export Hub"
    >
      <img
        src={logo}
        alt="Import Export Hub Logo"
        className="w-25 h-25 rounded-full hover:scale-105 transition-transform"
      />
    </Link>
    );
};

export default Logo;
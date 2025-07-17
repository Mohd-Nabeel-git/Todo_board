import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="w-full bg-white/80 shadow-lg backdrop-blur-md px-6 py-4 flex items-center justify-between sticky top-0 z-50">
      {/* Logo/Brand */}
      <div className="flex items-center gap-3">
        <svg className="w-9 h-9" viewBox="0 0 24 24" fill="none" stroke="currentColor">
          <rect x="3" y="3" width="7" height="7" rx="2" className="fill-blue-300" />
          <rect x="14" y="3" width="7" height="7" rx="2" className="fill-purple-300" />
          <rect x="3" y="14" width="7" height="7" rx="2" className="fill-green-300" />
          <rect x="14" y="14" width="7" height="7" rx="2" className="fill-yellow-300" />
        </svg>
        <span className="text-2xl font-extrabold text-blue-700 tracking-tight drop-shadow-sm">
          CollaboBoard
        </span>
      </div>

      {/* Navigation Links */}
      <div className="hidden md:flex gap-8 text-base">
        <Link
          to="/"
          className="text-gray-700 hover:text-blue-700 hover:font-semibold transition-colors"
        >
          Home
        </Link>
        <Link
          to="/board"
          className="text-gray-700 hover:text-blue-700 hover:font-semibold transition-colors"
        >
          Board
        </Link>
        <Link
          to="/activity"
          className="text-gray-700 hover:text-blue-700 hover:font-semibold transition-colors"
        >
          Activity
        </Link>
      </div>

      {/* Auth Buttons */}
      <div className="flex gap-2">
        <Link
          to="/login"
          className="px-5 py-2 rounded-lg bg-gradient-to-r from-blue-500 to-indigo-600 text-white font-semibold shadow hover:scale-105 transition-transform"
        >
          Login
        </Link>
        <Link
          to="/register"
          className="px-5 py-2 rounded-lg bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold shadow hover:scale-105 transition-transform"
        >
          Register
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;

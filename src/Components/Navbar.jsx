import React from 'react';
import { NavLink } from 'react-router-dom';
import { FaShoppingCart, FaBell, FaUserCircle } from 'react-icons/fa';
import logo from '/logo1.png';
import { useFirebase } from '../context/firebase';

function Navbar() {
  const { isLoggedIn, signOut } = useFirebase();

  return (
    <header className="flex justify-between items-center bg-gray-100 border-b border-gray-300 h-16 px-5 md:px-10">
      <div className="h-full">
        <img src={logo} alt="Logo" className="max-h-14 w-auto" />
      </div>
      <div className="hidden md:flex space-x-6 text-gray-800 font-semibold">
        <NavLink to="/" className={({ isActive }) => isActive ? "text-blue-600 font-bold" : "hover:text-blue-500"}>
          Home
        </NavLink>
        <NavLink to="/market" className={({ isActive }) => isActive ? "text-blue-600 font-bold" : "hover:text-blue-500"}>
          Market
        </NavLink>
        <NavLink to="/education" className={({ isActive }) => isActive ? "text-blue-600 font-bold" : "hover:text-blue-500"}>
          Education
        </NavLink>
        <NavLink to="/services" className={({ isActive }) => isActive ? "text-blue-600 font-bold" : "hover:text-blue-500"}>
          Services
        </NavLink>
        <NavLink to="/dashboard" className={({ isActive }) => isActive ? "text-blue-600 font-bold" : "hover:text-blue-500"}>
          Dashboard
        </NavLink>
        <NavLink to="/aboutus" className={({ isActive }) => isActive ? "text-blue-600 font-bold" : "hover:text-blue-500"}>
          About Us
        </NavLink>
      </div>
      <div className="flex items-center space-x-6">
        <FaShoppingCart className="text-2xl text-gray-800 hover:text-blue-500 cursor-pointer" />
        <FaBell className="text-2xl text-gray-800 hover:text-blue-500 cursor-pointer" />
        <FaUserCircle className="text-2xl text-gray-800 hover:text-blue-500 cursor-pointer" />
        {!isLoggedIn && (
          <>
            <a href="/signin" className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600">
              Login
            </a>
          </>
        )}
        {isLoggedIn && (
          <button
            onClick={signOut}
            className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition duration-300"
          >
            Logout
          </button>
        )}
      </div>
    </header>
  );
}

export default Navbar;

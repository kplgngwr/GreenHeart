import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { FaShoppingCart, FaBell, FaUserCircle, FaBars, FaTimes } from 'react-icons/fa';
import logo from '/logo1.png';

function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="flex flex-wrap justify-between items-center bg-gray-100 border-b border-gray-300 h-auto min-h-16 px-5 md:px-10 relative">
      <div className="h-full py-2">
        <img src={logo} alt="Logo" className="max-h-14 w-auto" />
      </div>

      {/* Mobile menu button */}
      <button onClick={toggleMenu} className="md:hidden text-gray-800 text-2xl">
        {isMenuOpen ? <FaTimes /> : <FaBars />}
      </button>

      {/* Navigation links - desktop */}
      <div className="hidden md:flex space-x-6 text-gray-800 font-semibold">
        <NavLink to="/" className={({ isActive }) => isActive ? "text-blue-600 font-bold" : "hover:text-blue-500"}>Home</NavLink>
        <NavLink to="/market" className={({ isActive }) => isActive ? "text-blue-600 font-bold" : "hover:text-blue-500"}>Market</NavLink>
        <NavLink to="/education" className={({ isActive }) => isActive ? "text-blue-600 font-bold" : "hover:text-blue-500"}>Education</NavLink>
        <NavLink to="/services" className={({ isActive }) => isActive ? "text-blue-600 font-bold" : "hover:text-blue-500"}>Services</NavLink>
        <NavLink to="/dashboard" className={({ isActive }) => isActive ? "text-blue-600 font-bold" : "hover:text-blue-500"}>Dashboard</NavLink>
        <NavLink to="/aboutus" className={({ isActive }) => isActive ? "text-blue-600 font-bold" : "hover:text-blue-500"}>About Us</NavLink>
      </div>

      {/* Navigation links - mobile */}
      <div className={`${isMenuOpen ? 'flex' : 'hidden'} md:hidden flex-col w-full py-4 space-y-4 text-center text-gray-800 font-semibold`}>
        <NavLink to="/" className={({ isActive }) => isActive ? "text-blue-600 font-bold" : "hover:text-blue-500"} onClick={toggleMenu}>Home</NavLink>
        <NavLink to="/market" className={({ isActive }) => isActive ? "text-blue-600 font-bold" : "hover:text-blue-500"} onClick={toggleMenu}>Market</NavLink>
        <NavLink to="/education" className={({ isActive }) => isActive ? "text-blue-600 font-bold" : "hover:text-blue-500"} onClick={toggleMenu}>Education</NavLink>
        <NavLink to="/services" className={({ isActive }) => isActive ? "text-blue-600 font-bold" : "hover:text-blue-500"} onClick={toggleMenu}>Services</NavLink>
        <NavLink to="/dashboard" className={({ isActive }) => isActive ? "text-blue-600 font-bold" : "hover:text-blue-500"} onClick={toggleMenu}>Dashboard</NavLink>
        <NavLink to="/aboutus" className={({ isActive }) => isActive ? "text-blue-600 font-bold" : "hover:text-blue-500"} onClick={toggleMenu}>About Us</NavLink>
      </div>

      <div className="flex items-center space-x-2 md:space-x-6 ml-auto md:ml-0">
        <FaShoppingCart className="text-xl md:text-2xl text-gray-800 hover:text-blue-500 cursor-pointer" />
        <FaBell className="text-xl md:text-2xl text-gray-800 hover:text-blue-500 cursor-pointer" />
        <FaUserCircle className="text-xl md:text-2xl text-gray-800 hover:text-blue-500 cursor-pointer" />
        <button className="px-2 py-1 md:px-4 md:py-2 text-sm md:text-base bg-blue-500 text-white rounded-lg hover:bg-blue-600">Sign Up</button>
        <button className="px-2 py-1 md:px-4 md:py-2 text-sm md:text-base bg-green-500 text-white rounded-lg hover:bg-green-600">Login</button>
      </div>
    </header>
  );
}

export default Navbar;
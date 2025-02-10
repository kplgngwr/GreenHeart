import React from 'react';
import { Link } from 'react-router-dom';
import { FaShoppingCart, FaBell, FaUserCircle } from 'react-icons/fa'; // Importing icons
import './Navbar.css';
import logo from './media/logo1.png'; // Import the logo

function Navbar() {
  return (
    <header>
      <div className="logo">
        <img src={logo} alt="Logo" />
      </div>
      <div className="items">
        <div className="items-links">
          <Link to="/home">Home</Link>
          <Link to="/market">Market</Link>
          <Link to="/educational">Educational</Link>
          <Link to="/services">Services</Link>
          <Link to="/aboutus">About Us</Link>
        </div>
        <FaShoppingCart className="icon" alt="Cart" />
        <FaBell className="icon" alt="Notifications" />
        <FaUserCircle className="icon" alt="Profile" />
        <button className="buts">Sign Up</button>
        <button id="buts2" className="buts">Login</button>
      </div>
    </header>
  );
}

export default Navbar; 
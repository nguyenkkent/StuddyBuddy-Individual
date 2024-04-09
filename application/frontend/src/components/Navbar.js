import React from 'react';
import { Link } from 'react-router-dom';
import '../css/Navbar.css';

function Navbar() {
  return (
    <nav className='navbar'>
      <Link to="/">Home</Link>
      <Link to="/api/register">Register</Link>
      <Link to="/api/login">Login</Link>
      <Link to="/api/aboutus">About Us</Link>
      <Link to="/api/dashboard">Dashboard</Link>
    </nav>
  );
}

export default Navbar;
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import '../css/Navbar.css';

function Navbar() {
  const location = useLocation();
  const isLoginPage = location.pathname === "/login";

  return (
    <nav className="navbar">
      <Link to="/aboutus">About Us</Link>

      <h1 className="navbar-header">
        <Link to="/">Study Buddy</Link>
      </h1>

      {!isLoginPage && <Link to="/login">Login</Link>}
      {isLoginPage && <Link to="/register">Register</Link>}
    </nav>
  );
}
export default Navbar;
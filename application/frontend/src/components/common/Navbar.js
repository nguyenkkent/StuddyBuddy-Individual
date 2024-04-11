import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import '../../css/Navbar.css';

function Navbar() {
  const location = useLocation();
  const isLoginPage = location.pathname === "/login";

  return (
    <nav className="navbar">
      <div className="navbar-component navbar-component-left">
        <Link to="/aboutus">About Us</Link>
      </div>

      <h1 className="navbar-header">
        <Link to="/">Study Buddy</Link>
      </h1>

      <div className="navbar-component navbar-component-right">
        {!isLoginPage && <Link to="/login">Login</Link>}
        {isLoginPage && <Link to="/register">Register</Link>}
      </div>
    </nav>
  );
}
export default Navbar;
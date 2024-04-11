import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import '../../css/Navbar.css';

function Navbar() {
    const location = useLocation();
    const showProfilePages = ["/dashboard", "/chats", "/mygroups", "/myfriends", "/settings"];
    const isLoginPage = location.pathname === "/login";
    const isRegisterPage = location.pathname === "/register";
    const isHomePage = location.pathname === "/";
    const isAboutUsPage = location.pathname === "/aboutus";

    const showProfile = showProfilePages.includes(location.pathname);
    const showLogin = isHomePage || isAboutUsPage || isRegisterPage;
    const showRegister = isLoginPage;

  return (
    <div className="navbar-wrapper">
      <nav className="navbar">
        <div className="navbar-component navbar-component-left">
          <Link to="/aboutus">About Us</Link>
        </div>

        <h1 className="navbar-header">
          <Link to="/">Study Buddy</Link>
        </h1>


      <div className="navbar-component navbar-component-right">
        {showLogin && <Link to="/login">Login</Link>}
        {showRegister && <Link to="/register">Register</Link>}
        {showProfile && <Link to="/profile">Profile</Link>}
      </div>
    </nav>
    </div>
  );
}
export default Navbar;
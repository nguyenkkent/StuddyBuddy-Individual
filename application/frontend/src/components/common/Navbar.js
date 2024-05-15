import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import '../../css/Navbar.css';
import { useAuthContext } from '../../hooks/useAuthContext';

function Navbar() {
  const { user } = useAuthContext();
  const location = useLocation();

  const showProfilePages = ["/dashboard", "/my-friends", "/my-groups", "/chats", "/groupchat", "/settings", "/add-friend", "/create-group"];
  const isLoginPage = location.pathname === "/login";
  const isRegisterPage = location.pathname === "/register";
  const isHomePage = location.pathname === "/";
  const isAboutUsPage = location.pathname === "/aboutus";

  const showProfile = showProfilePages.includes(location.pathname);
  const showLogin = !user && (isHomePage || isAboutUsPage || isRegisterPage);
  const showRegister =  !user && isLoginPage;
  const showDashboard = user && (isHomePage || isAboutUsPage);

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
        {showDashboard && <Link to="/dashboard">Dashboard</Link>}
      </div>
    </nav>
    </div>
  );
}
export default Navbar;
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import '../css/Navbar.css';

function Navbar() {
    const location = useLocation();
    const isLoginPage = location.pathname === '/login';
    const isRegistrationPage = location.pathname === '/register';
  
    return (
        <nav className='navbar'>
            <Link to="/aboutus">About Us</Link>
  
        <div className="navbar-center">
            <Link to="/">Study Buddy</Link>
        </div>

        <div className="navbar-right">
            {!isLoginPage && !isRegistrationPage && <Link to="/login">Login</Link>}
            {isLoginPage && <Link to="/register">Register</Link>}
        </div>
        </nav>
    );
}
export default Navbar;
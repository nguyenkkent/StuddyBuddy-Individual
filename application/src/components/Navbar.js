import React from 'react';
import { Link } from 'react-router-dom';
import '../css/Navbar.css';

function Navbar() {
  return (
    <nav className='navbar'>
      <Link to="/">Home</Link>
    </nav>
  );
}

export default Navbar;
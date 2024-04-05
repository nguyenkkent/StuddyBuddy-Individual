import React from 'react';
import { NavLink } from 'react-router-dom';
import '../css/Sidebar.css';

const Sidebar = () => {
  return (
    <div className="sidebar">
      <NavLink activeClassName="active" to="/dashboard">Dashboard</NavLink>
      <NavLink activeClassName="active" to="/my-friends">My Friends</NavLink>
      <NavLink activeClassName="active" to="/my-groups">My Groups</NavLink>
      <NavLink activeClassName="active" to="/chats">Chats</NavLink>
      <NavLink activeClassName="active" to="/settings">Settings</NavLink>
      <div className="logout-divider"></div>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );

  function handleLogout() {
    console.log('User logged out');
  }
};

export default Sidebar;
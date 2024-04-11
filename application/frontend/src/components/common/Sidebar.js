import React from 'react';
import { NavLink } from 'react-router-dom';
import '../../css/Sidebar.css';

const Sidebar = () => {
  return (
    <div className="sidebar">
      <NavLink activeclassname="active" to="/dashboard">Dashboard</NavLink>
      <NavLink activeclassname="active" to="/my-friends">My Friends</NavLink>
      <NavLink activeclassname="active" to="/my-groups">My Groups</NavLink>
      <NavLink activeclassname="active" to="/chats">Chats</NavLink>
      <NavLink activeclassname="active" to="/settings">Settings</NavLink>
      <div className="logout-divider"></div>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );

  function handleLogout() {
    console.log('User logged out');
  }
};

export default Sidebar;
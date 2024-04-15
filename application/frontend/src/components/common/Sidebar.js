import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import '../../css/Sidebar.css';

const Sidebar = () => {
  const navigate = useNavigate();

  function handleLogout() {
    navigate("/login");
    
  }

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
};

export default Sidebar;
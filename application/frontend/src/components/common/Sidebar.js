import React from 'react';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import '../../css/Sidebar.css';

const Sidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const whitelistPages = ["/dashboard", "/chats", "/my-groups", "/my-friends", "/settings", "/profile"]
  const showSideBar = whitelistPages.includes(location.pathname);       

  function handleLogout() {
    navigate("/login");
  }

  return (
    <>
      {showSideBar && <div className="sidebar">
        <NavLink activeclassname="active" to="/dashboard">Dashboard</NavLink>
        <NavLink activeclassname="active" to="/my-friends">My Friends</NavLink>
        <NavLink activeclassname="active" to="/my-groups">My Groups</NavLink>
        <NavLink activeclassname="active" to="/chats">Chats</NavLink>
        <NavLink activeclassname="active" to="/settings">Settings</NavLink>
        <div className="logout-divider"></div>
        <button onClick={handleLogout}>Logout</button>
      </div>}
    </>
  );
};

export default Sidebar;
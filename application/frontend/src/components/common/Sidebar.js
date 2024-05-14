import React from 'react';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import { useAuthContext } from '../../hooks/useAuthContext';
import '../../css/Sidebar.css';

const Sidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { dispatch } = useAuthContext();

  const whitelistPages = ["/dashboard", "/chats", "/my-groups", "/my-friends", "/settings", "/profile", "/add-friend", "/create-group"]
  const showSideBar = whitelistPages.includes(location.pathname.split("/", 2).join("/"));

  function handleLogout() {
    //delete json web token from browser storage
    localStorage.removeItem("user");
    //change dispatch function to logout state
    dispatch({type: "LOGOUT"})

    navigate("/login");
  }

  return (
    <>
      {showSideBar && <div className="sidebar">
        <NavLink activeclassname="active" to="/dashboard">Dashboard</NavLink>
        <NavLink activeclassname="active" className={location.pathname === "/add-friend" && "active"} to="/my-friends">My Friends</NavLink>
        <NavLink activeclassname="active" className={location.pathname === "/create-group" && "active"} to="/my-groups">My Groups</NavLink>
        <NavLink activeclassname="active" to="/chats">Chats</NavLink>
        <NavLink activeclassname="active" to="/groupchat">Groupchat</NavLink>
        <NavLink activeclassname="active" to="/settings">Settings</NavLink>
        <div className="logout-divider"></div>
        <button onClick={handleLogout}>Logout</button>
      </div>}
    </>
  );
};

export default Sidebar;
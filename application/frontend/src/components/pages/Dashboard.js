import React, { useState, useEffect } from "react";
import SideNavbar from '../common/Sidebar';
import "../../css/Dashboard.css";
import axiosClient from "../../axiosClient";
import { Link } from "react-router-dom";
import Select from 'react-select'

function Dashboard() {
  const [searchTerm, setSearchTerm] = useState("");
  const [allUsers, setAllUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);

  const handleChange = (event) => {
    setSearchTerm(event.target.value);
  };
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axiosClient.get("/api/dashboard");
        setAllUsers(response.data.userData);
        setFilteredUsers(response.data.userData);
      } catch (error) {
        console.error("Error fetching users:", error);
        setAllUsers([]);
        setFilteredUsers([]);
      }
    };
    fetchUsers();
  }, []);

  useEffect(() => {
    const filtered = allUsers && allUsers.filter(user =>
      user.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredUsers(filtered);
  }, [searchTerm, allUsers]);

  // tag options
  const options = [
    { value: 'mathematics', label: 'Mathematics' },
    { value: 'physics', label: 'Physics' },
    { value: 'political science', label: 'Political Science' },
    { value: 'english', label: 'English' },
    { value: 'computer engineering', label: 'Computer Engineering' },
    { value: 'computer science', label: 'Computer Science' }
  ]

  return (
    <div className="dashboard-container">
      <SideNavbar />
      <div className="dashboard-content">
        <h1>Welcome back!</h1>
        <div className="dashboard-search">
          <input
            type="text"
            className="dashboard-search-bar"
            placeholder="Search for Users Here"
            value={searchTerm}
            onChange={handleChange}
          />
          <svg fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="dashboard-search-button">
            <path stroke-linecap="round" stroke-linejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
          </svg>
        </div>
        <Select
          className="dashboard-filter"
          placeholder="Filter Tags"
          options={options}
          isMulti
          />
        <div className="user-results">
          {filteredUsers && filteredUsers.map(user => (
            <div key={user._id} className='user-entry'>
              <div className="user-container">
                <div>
                  <div className='username'>{user.username}</div>
                  <div>Tags: {user.tags.join(", ") || "N/A"}</div>
                </div>
                <Link to="#" onClick={() => {
                  alert("WIP");
                }}>Chat</Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Dashboard;

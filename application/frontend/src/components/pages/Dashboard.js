import React, { useState, useEffect } from "react";
import "../../css/Dashboard.css";
import axiosClient from "../../axiosClient";
import { Link } from "react-router-dom";
import Select from 'react-select'
import { useAuthContext } from "../../hooks/useAuthContext";

function Dashboard() {
  const { user } = useAuthContext();
  const [searchTerm, setSearchTerm] = useState("");
  const [allUsers, setAllUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [tags, setTags] = useState([]);

  const handleChange = (event) => {
    setSearchTerm(event.target.value);
  };
  useEffect(() => {
    //handles when user is not loaded property from the AuthContext
    if (!user){
      console.log("User not loaded")
      return;
    }
    const fetchUsers = async () => {
      try {
        // FIXME: do not return sensitive information like email and password
        const response = await axiosClient.get("/api/dashboard", {
          //send authorization header for middleware to intercept
          headers: {
            'Authorization': `Bearer ${user.token}`
          }
        }); 
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
    let filtered = allUsers && allUsers.filter(user =>
      user.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase())
    );
    if (tags.length) {
      filtered = filtered.filter(user =>
        user.tags.some(t => tags.includes(t))
      );
    }
    setFilteredUsers(filtered);
  }, [searchTerm, allUsers, tags]);

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
          <svg fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="dashboard-search-button">
            <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
          </svg>
        </div>
        <Select
          className="dashboard-filter"
          placeholder="Filter Tags"
          options={options}
          onChange={(t) => {
            setTags(t.map(v => v.label));
          }}
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
                <Link to="/chats">Chat</Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Dashboard;

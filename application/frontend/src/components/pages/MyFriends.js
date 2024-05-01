import React, { useState, useEffect } from "react";
import "../../css/Dashboard.css";
import axiosClient from "../../axiosClient";
import { Link } from "react-router-dom";
import { useAuthContext } from "../../hooks/useAuthContext";

function MyFriends() {
  const [searchTerm, setSearchTerm] = useState("");
  const [allUsers, setAllUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [tags, setTags] = useState([]);
  const { user } = useAuthContext();

  const handleChange = (event) => {
    setSearchTerm(event.target.value);
  };
  useEffect(() => {
    if (!user){
      console.log("A user is not loaded");
      return;
    }
    const fetchUsers = async () => {
      try {
        // FIXME: do not return sensitive information like email and password
        const response = await axiosClient.get("/api/dashboard", {
          headers: {
            //send authorization header for middleware to intercept
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

  return (
    <div className="dashboard-container">
      <div className="dashboard-content">
        <h1>Your Friends</h1>
        <div className="dashboard-search">
          <input
            type="text"
            className="dashboard-search-bar"
            placeholder="Search Your Friend Here"
            value={searchTerm}
            onChange={handleChange}
          />
          <svg fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="dashboard-search-button">
            <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
          </svg>
          <button><Link to="/add-friend">Add friend</Link></button>
        </div>

        <div className="user-results">
          {filteredUsers && filteredUsers.map(user => (
            <div key={user._id} className='user-entry'>
              <div className="user-container">
                <div>
                  <div className='username'>{user.username}</div>
                  <div>Tags: {user.tags.join(", ") || "N/A"}</div>
                </div>
                <Link to="/profile">Profile</Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default MyFriends;

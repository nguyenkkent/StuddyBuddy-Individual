import React, { useState, useEffect } from "react";
import "../../css/Dashboard.css";
import axiosClient from "../../axiosClient";
import { Link } from "react-router-dom";
import Select from 'react-select'
import { useAuthContext } from "../../hooks/useAuthContext";
import UserCard from "../common/UserCard";

function MyFriends() {
  const [searchTerm, setSearchTerm] = useState("");
  const [allUsers, setAllUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
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
        const response = await axiosClient.get("/api/my-friends", {
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
      <div className="dashboard-content">
        <h1>My Friends</h1>
        <div className="dashboard-search">
          <input
            type="text"
            className="dashboard-search-bar"
            placeholder="Search My Friends Here"
            value={searchTerm}
            onChange={handleChange}
          />
          <svg fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="dashboard-search-button">
            <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
          </svg>
          <Link className="add-create-button" to="/add-friend">Add Friend</Link>
        </div>

        <div className="user-results">
          {filteredUsers && filteredUsers.map(user => (
            <UserCard
              user={user}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default MyFriends;

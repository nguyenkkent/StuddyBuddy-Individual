import React, { useState, useEffect } from "react";
import "../../css/Dashboard.css";
import axiosClient from "../../axiosClient";
import Select from 'react-select'
import { useAuthContext } from "../../hooks/useAuthContext";
import UserCard from "../common/UserCard";

const CreateNewGroup = () => {
  const { user } = useAuthContext();
  const [searchTerm, setSearchTerm] = useState("");
  const [allUsers, setAllUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [tags, setTags] = useState([]);
  const [members, setMembers] =useState([]);

  const handleChange = async (event) => {
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
            'Authorization': `Bearer ${user.token}`,
            'searchTerm': searchTerm
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
    let filtered = allUsers && allUsers.filter(u =>
      user.objectId !== u._id && u.email &&
      u.username.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredUsers(filtered);
  }, [searchTerm, allUsers, tags]);

  return (
    <div className="dashboard-container">
      <div className="dashboard-content">
        <h1>Create Group</h1>
        <div className="group-name">
          <p>Group Name:</p>
          <input type="text" />
        </div>
        <div className="dashboard-search">
          <input
            type="text"
            className="dashboard-search-bar"
            placeholder="Search Friend by username"
            value={searchTerm}
            onChange={handleChange}
          />
          <svg fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="dashboard-search-button">
            <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
          </svg>
        </div>
        <div className="user-results">
          {filteredUsers && filteredUsers.map(user => (
            <UserCard
              user={user}
              members={members}
              setMembers={setMembers}
              group
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default CreateNewGroup;
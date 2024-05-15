import React, { useEffect, useState } from "react";
import axiosClient from "../../axiosClient";
import "../../css/Dashboard.css";
import { useAuthContext } from "../../hooks/useAuthContext";
import Overlay from "../common/Overlay";
import UserCard from "../common/UserCard";

const AddFriend = () => {
  const { user } = useAuthContext();
  const [searchTerm, setSearchTerm] = useState("");
  const [allUsers, setAllUsers] = useState([]);
  const [friends, setFriends] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [tags, setTags] = useState([]);

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
        const res = await axiosClient.get("/api/my-friends", {
          headers: {
            //send authorization header for middleware to intercept
            'Authorization': `Bearer ${user.token}`
          }        
        }); 
        setFriends(res.data.friendDataArray);

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
      !friends.includes(u.username) &&
      u.username.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredUsers(filtered);
  }, [searchTerm, allUsers, tags, friends]);

  return (
    <div className="dashboard-container">
      <Overlay />
      <div className="dashboard-content">
        <h1>Add Friend</h1>
        <div className="dashboard-search">
          <input
            type="text"
            className="dashboard-search-bar"
            placeholder="Search For New Friends by username"
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
              friend
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default AddFriend;
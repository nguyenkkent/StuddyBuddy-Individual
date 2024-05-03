import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import "../../css/Dashboard.css";
import GroupCard from '../common/GroupCard';
import { useAuthContext } from "../../hooks/useAuthContext";
import axiosClient from '../../axiosClient';

const MyGroups = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [allGroups, setAllGroups] = useState([]);
  const [filteredGroups, setFilteredGroups] = useState([]);
  const { user } = useAuthContext();

  const [searchQuery, setSearchQuery] = useState('');

  const handleChange = (event) => {
    setSearchTerm(event.target.value);
  };

  //api call to grab all groups that user is a member of
  useEffect(() => {
    if (!user){
      console.log("A user is not loaded");
      return;      
    }
    try{
    const fetchGroups = async () => {
      const response = await axiosClient.get("/api/my-groups", {
        //send authorization header for middleware to intercept
        'Authorization': `Bearer ${user.token}`
      })
    };

    //change allGroups state
    fetchGroups().then(fetchedGroups => {
      setAllGroups(fetchedGroups);
    });

    } catch(error){
      console.error("Error fetching groups:", error);
    }

  }, []);


  useEffect(() => {
    setFilteredGroups(allGroups.filter(group =>
      group.name.toLowerCase().includes(searchTerm.toLowerCase())
    ));
  }, [searchTerm, allGroups]);

  const handleSearch = (event) => {
    setSearchQuery(event.target.value);
  };

  return (
    <div className="dashboard-container">
      <div className="dashboard-content">
        <h1>My Groups</h1>
        <div className="dashboard-search">
          <input
            type="text"
            className="dashboard-search-bar"
            placeholder="Search My Groups Here"
            value={searchTerm}
            onChange={handleChange}
          />
          <svg fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="dashboard-search-button">
            <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
          </svg>
        </div>
        <div className="group-results">
          {filteredGroups && filteredGroups.map(group => (
            <GroupCard
              group={group}
            />
          ))}
        </div>
      </div>
    </div>
    // <div>
    //   <input type="text" value={searchQuery} onChange={handleSearch} placeholder="Search Your Group Here" />
    //   <ul>
    //     {filteredGroups.map(group => (
    //       <li key={group._id}>{group.name} {/* If there are more details - add it here */}</li>
    //     ))}
    //   </ul>
    //   <Link to="/create-group">Create New Group</Link>
    // </div>
  );
};

// THIS IS FOR TESTING PURPOSES - REMOVE WHEN ACTUAL BACKEND IS SET UP -yq (or I am dumb and didn't see it)
// Fetch list of groups and populates the page
const fetchGroups = async () => {
    // Can put API call here
    return [
    // An example for testing
    { _id: '1', name: 'Study Group Math', participants: ["player2", "player3", "pizza", "bcrypt", "UserDemo"] },
    { _id: '2', name: 'Study Group Not Math', participants: ["jwt", "asd", "UserDemo"] },
    { _id: '3', name: 'Study Group Something', participants: ["pizza", "tuoi", "asd", "UserDemo"] },
    { _id: '4', name: 'Study Group Other', participants: ["player2", "player3", "tui", "asd", "UserDemo"] },
    { _id: '5', name: 'Lazy Study Group', participants: ["player2", "player3", "UserDemo"] },
  ];
};

export default MyGroups;

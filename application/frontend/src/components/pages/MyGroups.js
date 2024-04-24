import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const MyGroups = () => {
  const [groups, setGroups] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    // REPLACE WITH THE ACTUAL API CALL - I don't want to put in something that isn't set up -yq
    fetchGroups().then(fetchedGroups => {
      setGroups(fetchedGroups);
    });
  }, []);

  const handleSearch = (event) => {
    setSearchQuery(event.target.value);
  };

  const filteredGroups = groups.filter(group =>
    group.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div>
      <input type="text" value={searchQuery} onChange={handleSearch} placeholder="Search Your Group Here" />
      <ul>
        {filteredGroups.map(group => (
          <li key={group._id}>{group.name} {/* If there are more details - add it here */}</li>
        ))}
      </ul>
      <Link to="/create-group">Create New Group</Link>
    </div>
  );
};

// THIS IS FOR TESTING PURPOSES - REMOVE WHEN ACTUAL BACKEND IS SET UP -yq (or I am dumb and didn't see it)
// Fetch list of groups and populates the page
const fetchGroups = async () => {
    // Can put API call here
    return [
    // An example for testing
    { _id: '1', name: 'Study Group Math' },
  ];
};

export default MyGroups;

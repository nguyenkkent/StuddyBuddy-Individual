import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const CreateNewGroup = () => {
    const [groupName, setGroupName] = useState('');
    const [friends, setFriends] = useState([]); // Change this to the actual list of friends
    const [selectedFriends, setSelectedFriends] = useState(new Set());
    const navigate = useNavigate();

    const handleGroupNameChange = (event) => {
        setGroupName(event.target.value);
    };

    const handleSearchFriends = (searchTerm) => {
        // REPLACE WITH THE ACTUAL API CALL - I don't want to put in something that isn't set up -yq
        // Should return the friendlist that match the search term
    };

    const handleSelectFriend = (friendId) => {
        setSelectedFriends(prevSelectedFriends => {
        const newSelectedFriends = new Set(prevSelectedFriends);
        if (newSelectedFriends.has(friendId)) {
        newSelectedFriends.delete(friendId);
        } else {
            newSelectedFriends.add(friendId);
        }
        return newSelectedFriends;
        });
    };

    const handleCreateGroup = () => {
        const group = {
        name: groupName,
        members: Array.from(selectedFriends),
        };
        // REPLACE WITH THE ACTUAL API CALL - I don't want to put in something that isn't set up -yq
        console.log('Creating group with:', group);
        // Not sure if you want the form to reset or redirect the user
    };

  return (
    <div>
      <input type="text" value={groupName} onChange={handleGroupNameChange} placeholder="Group Name" />
      {friends.map(friend => (
        <div
          key={friend._id}
          className={`friend-item ${selectedFriends.has(friend._id) ? 'selected' : ''}`}
          onClick={() => handleSelectFriend(friend._id)}
        >
          {friend.name} {/* Some cool styles can be added here */}
        </div>
      ))}
      <button onClick={handleCreateGroup}>Add</button>
      <button onClick={() => navigate(-1)}>Go Back</button>
    </div>
  );
};

export default CreateNewGroup;

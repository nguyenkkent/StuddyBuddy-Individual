import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axiosClient from "../../axiosClient";
import { useAuthContext } from '../../hooks/useAuthContext';

const CreateNewGroup = () => {
    const { user } = useAuthContext(); 
    const [groupName, setGroupName] = useState('');
    const [friends, setFriends] = useState([]); // Change this to the actual list of friends
    const [selectedFriends, setSelectedFriends] = useState(new Set());
    const navigate = useNavigate();

    const handleGroupNameChange = async (event) => {
        setGroupName(event.target.value);
    };
    
    const handleSearchFriends = async (searchTerm) => {
        try{
          const response = await axiosClient.get("/api/my-groups/search-friend-list", 
            {
              searchTerm
            },
            {
              headers: {
                'Authorization': `Bearer ${user.token}`
              }      
            });
        }catch(error){
          console.log("handleSearchFriends error: ", error);
        }
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

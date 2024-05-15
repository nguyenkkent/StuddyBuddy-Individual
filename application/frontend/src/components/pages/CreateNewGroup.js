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

    //returns a list of friends that matches searchTerm
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
            console.log(response);
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
    //need to also send all the usernames that will be in the group to back as well.
    //the membersId will be how to locate the individual User documents.
    //I made a blank "members" array for now as a placeholder(no need to add the current user's Id) -Kent
    const handleCreateGroup = async () => {
      const group = {
      groupName: groupName,
      membersId: Array.from(selectedFriends),
      members: []
      };
      console.log(group);
      const response = await axiosClient.post("/api/my-groups/add-group/",
        {
          group
        },
        {
          headers: {
            'Authorization': `Bearer ${user.token}`
          }    
        }
      );
      console.log('Creating group with:', group);
      navigate("/my-groups/");
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

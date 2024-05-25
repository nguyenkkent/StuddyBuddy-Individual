import React, { useEffect, useState } from "react";
import Sidebar from "../common/Sidebar";
import Select from 'react-select'
import "../../css/Profile.css"
import { useAuthContext } from "../../hooks/useAuthContext";
import { useParams } from "react-router-dom";
import axiosClient from "../../axiosClient";

function Profile() {
  const params = useParams();

  const { user } = useAuthContext()

  const [tags, setTags] = useState([]);
  const [data, setData] = useState(params.id ? null : user);

  useEffect(() => {
    if (data){
      return;
    }
    const fetchUser = async () => {
      try {
        // FIXME: do not return sensitive information like email and password
        const response = await axiosClient.get("/api/my-friends/search-for-users", {
          //send authorization header for middleware to intercept
          headers: {
            'Authorization': `Bearer ${user.token}`,
            'searchTerm': params.id
          }
        });
        setData(response.data.potentialFriends[0]); 
      } catch (error) {
        console.error("Error fetching user:", error);
      }
    };
    fetchUser();
  });

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
    <div className="profile-container">
      <div className="profile-content">
        <h1>Profile</h1>
        <div className="profile-info">
          <div className="profile-detail">
            <div className="profile-detail-main">
              <p>Name: {data === null ? "Loading..." : (data?.name || "???")}</p>
              <p>Username: {data === null ? "Loading..." : (data?.username || "???")}</p>
              <p>Email: {data === null ? "Loading..." : (data?.email || "???")}</p>
            </div>
            <div className="profile-detail-verify">
              <p>Verified: {data === null ? "Loading..." : (data?.isVerified ? "YES" : "NO")}</p>
            </div>
          </div>
          <svg fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="profile-img">
            <path strokeLinecap="round" strokeLinejoin="round" d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
          </svg>
        </div>
        <div className="profile-tags">
          Tags:
          <Select
            className="profile-tags-selector"
            placeholder="None"
            options={options}
            value={tags}
            onChange={setTags}
            isMulti
          />
        </div>
        <div className="profile-save">
          {
            data?.email && (user === data ?
            <div
              className="profile-save-button"
              onClick={() => {
                alert("WIP");
              }}
            >
              Save
            </div> :
            <div
              className="profile-add-button"
              onClick={() => {
                alert("WIP");
              }}
            >
              Add Friend
            </div>)
          }
        </div>
      </div>
    </div>
  );
}

export default Profile;
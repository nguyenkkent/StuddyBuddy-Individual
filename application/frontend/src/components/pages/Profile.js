import React, { useState } from "react";
import Sidebar from "../common/Sidebar";
import Select from 'react-select'
import "../../css/Profile.css"

function Profile() {
  const [tags, setTags] = useState([]);

  // tag options
  const options = [
    { value: 'mathematics', label: 'Mathematics' },
    { value: 'physics', label: 'Physics' },
    { value: 'political science', label: 'Political Science' },
    { value: 'english', label: 'English' },
    { value: 'computer engineering', label: 'Computer Engineering' },
    { value: 'computer science', label: 'Computer Science' }
  ]

  // FIXME: Create user.name field
  // TODO: Get user.username
  // TODO: Get user.email
  // TODO: Get user.tags
  // TODO: Get user.isVerified
  const user = {
    name: "Jane Doe",
    username: "janedoe",
    email: "janedoe@sfsu.edu",
    isVerified: false
  }

  return (
    <div className="profile-container">
      <Sidebar />
      <div className="profile-content">
        <h1>Profile</h1>
        <div className="profile-info">
          <div className="profile-detail">
            <div className="profile-detail-main">
              <p>Name: {user.name}</p>
              <p>Username: {user.username}</p>
              <p>School Email: {user.email}</p>
            </div>
            <div className="profile-detail-verify">
              <p>Verified: {user.isVerified ? "YES" : "NO"}</p>
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
      </div>
    </div>
  );
}

export default Profile;
import React, { useState } from "react";
import Sidebar from "../common/Sidebar";
import "../../css/Dashboard.css";
// import "../../css/MyFriends.css";

function MyFriends() {
  const [searchTerm, setSearchTerm] = useState("");

  const handleChange = (event) => {
    setSearchTerm(event.target.value);
  };

  return (
    <div className="dashboard-container">
      <Sidebar />
      <div className="dashboard-content">
        <br></br>
        <div className="dashboard-search">
          <input
            type="text"
            className="dashboard-search-bar"
            placeholder="Search for Friends Here"
            value={searchTerm}
            onChange={handleChange}
          />
          <svg
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="dashboard-search-button"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
            />
          </svg>
          <button>Add Friend</button>
        </div>
      </div>
    </div>
  );
}

export default MyFriends;

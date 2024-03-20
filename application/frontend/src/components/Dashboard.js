import React, { useState, useEffect } from "react";
import "../css/Home.css";
import axios from 'axios';

function Dashboard(){
    const [searchTerm, setSearchTerm] = useState("");
    const [users, setUsers] = useState([]);

    const handleChange = (event) => {
        setSearchTerm(event.target.value);
    };
    // If search term is empty, this is not going to display any users 
    // till you type something that matches with register users/ in the db
    const fetchSearch = async () => {
        if (searchTerm.trim() === '') {
            setUsers([]);
            return;
    }
    try {
        // Can replace the backend APIIII here
        const response = await axios.get("http://localhost:3000/dashboard", {
            params: { searchTerm } // Can change in the future to match the backend
        });
        setUsers(response.data.userData); // From the db
    } catch (error) {
        console.error("Error fetching search results:", error);
        setUsers([]); // If there is an error, set users to an empty array for cleaning
    }
};

    // useEffect for reducing the # of API calls, less lag and probably performance up
    useEffect(() => {
        const delayDebounceFn = setTimeout(() => {
            fetchSearch();
        }, 300); // 300ms delay before the API call is made
        // Cleans up for timeout if value changes
        return () => clearTimeout(delayDebounceFn);
    }, [searchTerm]);

    return (
        <div className="dashboard">
            <h1>Welcome back!</h1>
            <div>
                <input
                    type="text"
                    placeholder="Search for Users Here"
                    value={searchTerm}
                    onChange={handleChange}
                />
                <button onClick={fetchSearch}>Search</button>
            </div>
            <div className="user-results">
                {users.map(user => (
                    <div key={user._id} className='user-entry'>
                        <div className='username'>Username: {user.username}</div>
                        <div className='email'>Email: {user.email}</div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Dashboard;
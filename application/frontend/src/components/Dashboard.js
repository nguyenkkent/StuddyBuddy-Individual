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
    // till you type something that matches with register users
    const fetchSearch = async () => {
        if (searchTerm.trim() === '') {
            setUsers([]);
            return;
    }
    try {
        // Replace the backend api here
        const response = await axios.get("http://localhost:3000/dashboard", {
            params: { searchTerm } // might change this to username: serachTerm
        });
        setUsers(response.data.userData); // I hope this is the correct response
    } catch (error) {
        console.error("Error fetching search results:", error);
        setUsers([]);
    }
};

    // Run fetchSearch when searchTerm changes
    useEffect(() => {
        const delayDebounceFn = setTimeout(() => {
            fetchSearch();
        }, 300);

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
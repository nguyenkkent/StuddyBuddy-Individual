import React, { useState, useEffect } from "react";
import SideNavbar from '../components/Sidebar';
import "../css/Home.css";
import axios from 'axios';

function Dashboard() {
    const [searchTerm, setSearchTerm] = useState("");
    const [allUsers, setAllUsers] = useState([]);
    const [filteredUsers, setFilteredUsers] = useState([]);

    const handleChange = (event) => {
        setSearchTerm(event.target.value);
    };
    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await axios.get("/api/dashboard");
                setAllUsers(response.data.userData);
                setFilteredUsers(response.data.userData);
            } catch (error) {
                console.error("Error fetching users:", error);
                setAllUsers([]);
                setFilteredUsers([]);
            }
        };
        fetchUsers();
    }, []);

    useEffect(() => {
        const filtered = allUsers && allUsers.filter(user =>
            user.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
            user.email.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setFilteredUsers(filtered);
    }, [searchTerm, allUsers]);

    return (
        <div className="dashboard-container"> 
            <SideNavbar />
            <div className="dashboard-content">
            <h1>Welcome back!</h1>
            <div>
                <input
                    type="text"
                    placeholder="Search for Users Here"
                    value={searchTerm}
                    onChange={handleChange}
                />
            </div>
            <div className="user-results">
                {filteredUsers && filteredUsers.map(user => (
                    <div key={user._id} className='user-entry'>
                        <div className='username'>Username: {user.username}</div>
                        <div className='email'>Email: {user.email}</div>
                    </div>
                ))}
            </div>
        </div>
    </div>
    );
}

export default Dashboard;

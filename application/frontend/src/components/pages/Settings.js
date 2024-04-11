import React, { useState } from 'react';
import SideNavbar from '../common/Sidebar';
import '../../css/Settings.css';

function Settings() {
    // Example state for a profile setting, add more as needed
    const [email, setEmail] = useState('');
  
    // Handler for email change, create more handlers for other inputs
    const handleEmailChange = (e) => {
      setEmail(e.target.value);
    };
  
    // Example submission handler
    const handleSubmit = (e) => {
      e.preventDefault();
      // Process the changes here, such as sending to an API
      alert('Settings Saved!');
    };
  
    return (
      <div className="settings-container">
        <SideNavbar />
        <form onSubmit={handleSubmit} className="settings-form">
          <h2>Profile Settings</h2>
          <label>Email:</label>
          <input type="email" value={email} onChange={handleEmailChange} />
          
          {/* Add more input fields for profile settings here */}
  
          <h2>Notification Settings</h2>
          {/* Add checkboxes for notifications */}
  
          <h2>Study Preferences</h2>
          {/* Add inputs/selectors for study preferences */}
  
          <h2>Account Management</h2>
          {/* Add buttons/links for account management */}
  
          <button type="submit">Save Changes</button>
        </form>
      </div>
    );
  }

export default Settings;
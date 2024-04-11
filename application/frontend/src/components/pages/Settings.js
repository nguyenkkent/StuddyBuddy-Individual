import React, { useState } from 'react';
import SideNavbar from '../common/Sidebar';
import '../../css/Settings.css';

function Settings() {
    // MOST OF THESE ARE SUBJECT TO CHANGE IN THE FUTURE, IT JUST LOOKS OK FOR NOW
    const [email, setEmail] = useState('');
    const [emailNotifications, setEmailNotifications] = useState(false);
    const [studyReminders, setStudyReminders] = useState(false);
    const [accountVisibility, setAccountVisibility] = useState(false);

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    };

    const handleEmailNotificationsChange = (e) => {
        setEmailNotifications(e.target.checked);
    };

    const handleStudyRemindersChange = (e) => {
        setStudyReminders(e.target.checked);
    };

    const handleAccountVisibilityChange = (e) => {
        setAccountVisibility(e.target.checked);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        alert('Settings Saved!');
    };

    // MOST OF THESE ARE SUBJECT TO CHANGE IN THE FUTURE, IT JUST LOOKS OK FOR NOW
    return (
        <div className="settings-container">
            <SideNavbar />
            <form onSubmit={handleSubmit} className="settings-form">
                <h2>Profile Settings</h2>
                <label>Email:</label>
                <input type="email" value={email} onChange={handleEmailChange} />
            
                <h2>Notification Settings</h2>
                <label>
                    <input
                        type="checkbox"
                        checked={emailNotifications}
                        onChange={handleEmailNotificationsChange}
                    />
                    Email Notifications
                </label>

                <h2>Study Preferences</h2>
                <label>
                    <input
                        type="checkbox"
                        checked={studyReminders}
                        onChange={handleStudyRemindersChange}
                    />
                    Study Reminders
                </label>

                <h2>Account Management</h2>
                <label>
                    <input
                        type="checkbox"
                        checked={accountVisibility}
                        onChange={handleAccountVisibilityChange}
                    />
                    Make Account Private
                </label>
                <button type="submit">Save Changes</button>
            </form>
        </div>
    );
}

export default Settings;
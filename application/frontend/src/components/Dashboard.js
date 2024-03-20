import React, { useState, useEffect } from "react";
import "../css/Home.css"; // Ensure your CSS file is properly linked to style these components

function Dashboard() {
  const [userName, setUserName] = useState("Student");
  const [sessions, setSessions] = useState([
    { id: 1, subject: "Mathematics", time: "10:00 AM" },
    { id: 2, subject: "Physics", time: "1:00 PM" },
  ]);
  const [quote, setQuote] = useState("");

  // Simulate fetching user name and quote from an API on component mount
  useEffect(() => {
    // This is a placeholder for your fetch calls to get user data and daily quotes
    setUserName("Alex"); // Assume we fetched this from user's profile
    setQuote(
      "Learning is a treasure that will follow its owner everywhere. — Chinese Proverb"
    );
  }, []);

  return (
    <div className="dashboard">
      <h1>Welcome back, {userName}!</h1>
      <p>Ready to conquer your study goals today?</p>

      <div className="sessions">
        <h2>Upcoming Study Sessions</h2>
        <ul>
          {sessions.length > 0 ? (
            sessions.map((session) => (
              <li key={session.id}>
                <strong>{session.subject}</strong> at {session.time}
                <button onClick={() => joinSession(session.id)}>Join</button>
              </li>
            ))
          ) : (
            <p>No upcoming sessions. Create or join a new one!</p>
          )}
        </ul>
      </div>

      <div className="quick-join">
        <h2>Quick Join a Study Group</h2>
        {/* This is a simplified example; you might have a search or selection component here */}
        <button onClick={() => joinRandomGroup()}>Join a Random Group</button>
      </div>

      <div className="motivation">
        <h2>Quote of the Day</h2>
        <p>{quote}</p>
      </div>
    </div>
  );
}

function joinSession(sessionId) {
  // Placeholder function for joining a session
  console.log(`Joining session ${sessionId}`);
  // Implement actual join logic here, possibly redirecting to the session page or using WebSocket to connect
}

function joinRandomGroup() {
  // Placeholder function for quick-join feature
  console.log("Joining a random study group...");
  // Implement the logic to select and join a random group, perhaps by calling an API endpoint
}

export default Dashboard;

import React from 'react';
import "../../css/Home.css"
import { Link } from 'react-router-dom';
import { useAuthContext } from '../../hooks/useAuthContext';

// Current is only a skeleton
function Home() {
  const { user } = useAuthContext();

  return (
    <div className="home-main-wrapper">
      <div className="home-main">
        <div className="home-content">
          <h1>Welcome to Our Website</h1>
          <p>This is a platform where you can connect with your friends, share updates, and much more. Get started now!</p>
          <h2>Connect with friends and the knowledge around you.</h2>
          <div className="home-start">
            {user ?
              <Link to="/dashboard">Welcome Back</Link> :
              <Link to="/register" className="get-started-btn">Get Started</Link>
            }
          </div>
        </div>
      </div>
    </div>
  );
}
  
  export default Home;

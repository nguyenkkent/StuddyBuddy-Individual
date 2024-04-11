import React from 'react';
import "../../css/Home.css"
import { Link } from 'react-router-dom';

// Current is only a skeleton
function Home() {
    return (
      <div>
        <div className="home-main">
          <h1>Welcome to Our Website</h1>
          <p>This is a platform where you can connect with your friends, share updates, and much more. Get started now!</p>
          <div className="home-phrase">
            <h2>Connect with friends and the knowledge around you.</h2>
          </div>
          <div className="home-start">
            <Link to="/register" className="get-started-btn">Get Started</Link>
          </div>
        </div>
      </div>
    );
  }
  
  export default Home;

import React from 'react';
import "../../css/Home.css"
import { Link } from 'react-router-dom';

// Current is only a skeleton
function Home() {
    return (
      <div>
        <div className="home-main">
          <div className="home-phrase">
            <h1>Welcome</h1>
          </div>
          <div className="home-start">
            <Link to="/register">Get Started</Link>
          </div>
        </div>
      </div>
    );
  }
  
  export default Home;

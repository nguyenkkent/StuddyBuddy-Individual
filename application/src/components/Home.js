import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css';

function Home() {
  return (
    <div className='Home'>
      <h1 className='home-header1'>Software Engineering Class SFSU</h1>
      <h2 className='home-header2'>Section 04</h2>
      <h3 className='home-header3'>Team 06 - Check With Manuel</h3>
      
      <div className="home-buttons">
        <Link to="/ashley"><button className="button">Ashley</button></Link>
        <Link to="/brenden"><button className="button">Brenden</button></Link>
        <Link to="/kent"><button className="button">Kent</button></Link>
        <Link to="/nhan"><button className="button">Nhan</button></Link>
        <Link to="/pierre"><button className="button">Pierre</button></Link>
        <Link to="/yuquan"><button className="button">Yuquan</button></Link>
      </div>
    </div>
  );
}

export default Home;

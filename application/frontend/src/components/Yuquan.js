import React from 'react';
import '../css/AboutUs.css';

function Yuquan() {
  return (
    <div className="team-member-container">
        <h1 className='team-member-name'>
            Yuquan Xu
        </h1>
        <h2 className='team-member-role'>
            Front-End Lead
        </h2>
            <img className="team-member-image" src="/yuquan.png" alt="Yuquan Xu" />
        <p className='team-member-bio'>
        I have made grave mistakes trying to cook meat balls before. I am also a student.
        </p>
    </div>
  );
}

export default Yuquan;
import React from 'react';

function Nhan() {
  return (
    <div>
        <h1 className='team-member-name'>
            Nhan Nguyen
        </h1>
        <h2 className='team-member-role'>
            Git Master
        </h2>
            <img className='team-member-image' src="/nhan-profile.jpg" alt="Nhan" />
        <p className='team-member-bio'>
            Computer Science senior at SFSU. Love playing soccer and listening to
        music.
        </p>
    </div>
  );
}

export default Nhan;
import React from 'react';

function Pierre() {
  return (
    <div>
        <h1 className='team-member-name'>
            Pierre Harbin
        </h1>
        <h2 className='team-member-role'>
            Team Member
        </h2>
            <img className='team-member-image' src="/test.jpg" alt="Pierre" />
        <p className='team-member-bio'>
            Small bio
        </p>
    </div>
  );
}

export default Pierre;
import React from 'react';
import '../../css/Team.css';

function AboutMe(props) {
  return (
    <div>
        <h1 className='team-member-name'>
            {props.name}
        </h1>
        <h2 className='team-member-role'>
            {props.role}
        </h2>
            <img className='team-member-image' src={props.img} alt={props.name} />
        <p className='team-member-bio'>
            {props.bio}
        </p>
    </div>
  );
}

export default AboutMe;
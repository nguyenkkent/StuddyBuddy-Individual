import React from 'react';

function TextField(props) {
  return (
    <div>
      <label className="formlabel">
        {props.label}
        </label>
      <input type={props.type} name={props.name} value={props.value} onChange={props.onChange}/>
      {props.errors && Array.isArray(props.errors) ? 
        props.errors.map((error) => 
          <div className="error">{error}</div>
        ) :
        <div className="error">{props.errors}</div>
      }
    </div>
  );
}

export default TextField;
import { Link, useNavigate } from "react-router-dom";
import "../../css/Dashboard.css";

function UserCard(props) {
  const navigate = useNavigate();

  return (
    <div key={props.user._id} className='user-entry'>
      <div className="user-container">
        <div>
          <div
            className='username'
            onClick={() => {
              navigate(`/profile/${props.user._id}`);
            }}
          >
            {props.user.username}
          </div>
          <div>Tags: {props.user.tags.join(", ") || "N/A"}</div>
        </div>
        {
          props.friend ?
          <button
            onClick={() => {
              alert("WIP");
            }}
          >
            Add Friend
          </button> :
          <Link to="/chats">Chat</Link>
        }
      </div>
    </div>
  );
}

export default UserCard;
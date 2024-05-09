import { Link } from "react-router-dom";
import "../../css/Dashboard.css";

function UserCard(props) {
  return (
    <div key={props.user._id} className='user-entry'>
      <div className="user-container">
        <div>
          <div className='username'>{props.user.username}</div>
          <div>Tags: {props.user.tags.join(", ") || "N/A"}</div>
        </div>
        {
          props.profile ?
          <Link to={`/profile/${props.user._id}`}>Profile</Link> :
          <Link to="/chats">Chat</Link>
        }
      </div>
    </div>
  );
}

export default UserCard;
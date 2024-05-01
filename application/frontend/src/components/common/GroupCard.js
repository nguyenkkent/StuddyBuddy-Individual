import { Link } from "react-router-dom";
import "../../css/Dashboard.css";

function GroupCard(props) {
  return (
    <div key={props.group._id} className='group-entry'>
      <div className="group-container">
        <div className='group-name'>{props.group.name}</div>
        <div className='group-participants'>{props.group.participants.join(", ") || "N/A"}</div>
        <div className="group-button-wrapper">
          <Link to="/chats">Chat</Link>
        </div>
      </div>
    </div>
  );
}

export default GroupCard;
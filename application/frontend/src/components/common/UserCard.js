import { Link, useNavigate } from "react-router-dom";
import axiosClient from "../../axiosClient";
import "../../css/Dashboard.css";
import { useAuthContext } from "../../hooks/useAuthContext";


function UserCard(props) {
  const navigate = useNavigate();
  const { user } = useAuthContext();
  const handleChatClick = async () => {

    //grab the message recipient's email
    const messageRecipientEmail = props.user.email;
    // console.log(currentUserEmail);
    // console.log(messageRecipientEmail);

    //send info for both parties to back
    const response =  await axiosClient.post("/api/chats/start-chat", {
      //send authorization header for middleware to intercept
      headers: {
        'Authorization': `Bearer ${user.token}`, 
        'recipient': messageRecipientEmail
      }
    }); 
  }


  return (
    <div key={props.user._id || props.user} className='user-entry'>
      <div className="user-container">
        <div>
          <div
            className='username'
            onClick={() => {
              navigate(`/profile/${props.user._id}`);
            }}
          >
            {props.user.username || props.user}
          </div>
          {
            props.user.tags &&
            <div>Tags: {props.user.tags.join(", ") || "N/A"}</div>
          }
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
          <div onClick={handleChatClick}>
          <Link to="/chats">Chat</Link>
        </div>
        }
      </div>
    </div>
  );
}

export default UserCard;
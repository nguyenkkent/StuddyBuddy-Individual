import { Link , useNavigate } from "react-router-dom";
import "../../css/Dashboard.css";
import { useAuthContext } from "../../hooks/useAuthContext";
import axiosClient from "../../axiosClient";

function GroupCard(props) {
  const navigate = useNavigate();
  const { user } = useAuthContext();

  const handleChatClick = async () => {
    console.log(props.group.membersId);
    //array of _id of all members in the groupchat 
    const recipientEmails = props.group.membersId; 

    try {
      //send info for both parties to backend
      const response = await axiosClient.post("/api/chats/start-chat/", {
        recipients: recipientEmails
      }, {
        headers: {
          'Authorization': `Bearer ${user.token}`,
        }
      });
      navigate("/chats");
    } catch (error) {
      console.log('Error initiating chat:', error.response ? error.response.data : error.message);
      if (error.response && error.response.status === 409) {
        alert("Chat with this user already exists.");
        navigate("/chats");
      } 
      else {
        alert("An error occurred while starting the chat.");
      }
    }
  };

  return (
    <div key={props.group._id} className='group-entry'>
      <div className="group-container">
        <div className='group-name'>{props.group.name}</div>
        <div className='group-participants'>{props.group.members.join(", ") || "N/A"}</div>
        <div className="group-button-wrapper">
          <button onClick={handleChatClick}>chat</button>
          {/* <Link to="/groupchat">Chat</Link> */}
        </div>
      </div>
    </div>
  );
}

export default GroupCard;
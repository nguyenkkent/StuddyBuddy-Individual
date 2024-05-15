import { Link, useNavigate } from "react-router-dom";
import axiosClient from "../../axiosClient";
import "../../css/Dashboard.css";
import { useAuthContext } from "../../hooks/useAuthContext";
import { useState } from "react"; // Import useState hook

function UserCard(props) {
  const navigate = useNavigate();
  const { user } = useAuthContext();
  const [showInputBox, setShowInputBox] = useState(false); 
  const [message, setMessage] = useState(""); 


  //handles starting the empty chat document
  const handleChatClick = async () => {
    //grab the message recipient's email
    const recipientEmail = props.user.email;

    //send info for both parties to backend
    const response = await axiosClient.post("/api/chats/start-chat/", {
      recipient: recipientEmail
    }, {
      headers: {
        'Authorization': `Bearer ${user.token}`,
      }
    });

    //once the chat is initiated, show the input box
    setShowInputBox(true);
  }

  const handleSendMessage = async () => {
    //send the message using axiosClient
    await axiosClient.post("/api/chats/send-message/", {
      recipient: props.user.email,
      message: message
    }, {
      headers: {
        'Authorization': `Bearer ${user.token}`,
      }
    });
    //clear the message input box after sending
    setMessage("");
    //send user to /chats
    navigate('/chats');
  }

  const handleKeyDown = (event) => {
    //if the "Enter" key is pressed (key code 13)
    if (event.keyCode === 13) {
      handleSendMessage();
    }
  }
  const handleAddFriendClick = async () => {
    //console.log(props);
    const futureFriendEmail = props.user.email;
    const response = await axiosClient.post("/api/my-friends/add-friend/", {
      addFriendEmail : futureFriendEmail
    }, {
      headers: {
        'Authorization': `Bearer ${user.token}`,
      }
    });
    navigate("/my-friends");
  };
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
          <button onClick={handleAddFriendClick}>Add Friend</button> :
          <div>
            {
              // Show the "Chat" button if the input box is not visible
              !showInputBox &&
              <button onClick={handleChatClick}>Chat</button>
            }
            {
              // Show the input box if it's visible
              showInputBox &&
              <div>
                <input 
                  type="text" 
                  placeholder="Type your message..." 
                  value={message} 
                  onChange={(e) => setMessage(e.target.value)} 
                  onKeyDown={handleKeyDown} 
                />
                <button onClick={handleSendMessage}>Send</button>
              </div>
            }
          </div>
        }
      </div>
    </div>
  );
}

export default UserCard;



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
    console.log(props);
    //grab the message recipient's email
    const recipientEmail = props.user.email; // FIXME: null -> friend list returns a list of strings | user is the username (a string)

    try {
      //send info for both parties to backend
      const response = await axiosClient.post("/api/chats/start-chat/", {
        recipient: recipientEmail
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
  };

  const handleKeyDown = (event) => {
    //if the "Enter" key is pressed (key code 13)
    if (event.keyCode === 13) {
      handleSendMessage();
    }
  };

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

  const addFriendHandler = async () => {
    try {
      const response = await axiosClient.post("/api/add-friend", {
        "addfriendemail": props.user.email
      }, {
        headers: {
          "Authorization": `Bearer ${user.token}`,
        }
      });

      console.log(response.data);
      navigate("/my-friends");
    } catch (error) {
      console.error("Error adding friend: ", error);
    }
  }

  return (
    <div key={props.user._id || props.user} className='user-entry'>
      <div className={`user-container ${props.group && "group-picker"}`}>
        {props.group &&
          <div
            className={`group-selector ${(props.membersId.includes(props.user._id) || props.membersId.includes(props.user)) && "group-selected"}`}
            onClick={() => {
              if (props.membersId.includes(props.user._id) || props.membersId.includes(props.user)) {
                props.membersId.splice(props.membersId.indexOf(props.user._id || props.user), 1);
                props.members.splice(props.members.indexOf(props.user.username || props.user), 1);
                props.setMembersId([...props.membersId]);
                props.setMembers(props.members);
              } else {
                props.setMembersId([...props.membersId, (props.user._id || props.user)]);
                props.setMembers([...props.members, (props.user.username || props.user)]);
              }
            }}
          />
        }
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
        {props.friend &&
          <button
            onClick={addFriendHandler}
          >
            Add Friend
          </button>

        }
        {!props.friend && !props.group &&
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



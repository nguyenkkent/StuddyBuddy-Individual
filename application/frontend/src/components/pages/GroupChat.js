import SideNavbar from '../common/Sidebar';
import io from "socket.io-client";
import { useEffect, useState, useRef } from 'react';
import "../../css/Chats.css"
import Sidebar from '../common/Sidebar';
import Webcam from "react-webcam"; 
import { useAuthContext } from "../../hooks/useAuthContext";

const socket = io(process.env.NODE_ENV == 'production' ? '/' : 'http://localhost:3001/');

function GroupChat() {
  const {user} = useAuthContext();

  const webcamRef = useRef(null);
  const [webcamEnabled, setWebcamEnabled] = useState(false); 

  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);

  const [roomId, setRoomId] = useState(null);
  const [users, setUsers] = useState(null);
  const [loading, setLoading] = useState(true);
  console.log(users);

//update the users array whenever a new user joins the groupchat endpoint
useEffect(() => {
  if (user) {
    const token = JSON.parse(localStorage.getItem("user"));
    if (token) {
      socket.emit("joinGroupChat", { userId: token._id, username: token.username });
    }
  }
}, [user]);

  //handles receiving when socketIO emits from backend
  useEffect(() => {

    //listen for incoming messages from the backend
    socket.on("receiveMessage", (data) => {
      setMessages(prevMessages => [...prevMessages, data.message]);
    });

    //listen for updated user list from the backend
    // socket.on("updateUserList", (data) => {
    //   const uniqueUsers = Array.from(new Set(data.users.map(user => user.userId)))
    //     .map(id => data.users.find(user => user.userId === id));
    //   setUsers(uniqueUsers, ...uniqueUsers);
    //   setLoading(false);
    // });
    // socket.on("updateUserList", (data) => {
    //   setUsers(data.users);
    // setLoading(false);
    // });

    socket.on("updateUserList", (data) => {
      // Use a Map to filter out duplicates based on socketId
      const uniqueUsersMap = new Map();
      data.users.forEach(user => uniqueUsersMap.set(user.socketId, user));
      const uniqueUsers = Array.from(uniqueUsersMap.values());

      setUsers(uniqueUsers);
      setLoading(false); // Set loading to false once users are fetched
    });
    
    //clean up event listener when component unmounts
    return () => {
      socket.off("receiveMessage");
      socket.off("updateUserList");
    };
  }, []);


  //sending message to the backend
  const sendMessage = () => {
    //grab token from browser
    const token = JSON.parse(localStorage.getItem("user"));
    if (!token) {
      console.log("No token found");
      return;
    }

    const username = token.username;
    const email = token.email;
    //emit the message to the backend
    socket.emit("sendMessage", { message, username, email });
    setMessage("");
  }

  //toggle for webcam
  const toggleWebcam = () => {
    setWebcamEnabled(!webcamEnabled);
  };

  return (
    <div className="communications-container"> {/* Container for both */}
    <div className="webcam-container">
      <button onClick={toggleWebcam}>
        {webcamEnabled ? "I don't want to see my face" : "I want to see my face"}
      </button>
      {webcamEnabled && (
        <Webcam
          audio={true}
          ref={webcamRef}
          screenshotFormat="image/jpeg"
        />
      )} 
    </div>

    <div className="chat-container"> {/* Chat container */}
      <div className="chat-content">
        {/* <h1>Chatting with &lt;Placeholder&gt;</h1> */}

        <div className="user-list">
          <h2>Users in Chat</h2>
          {loading ? (
            <p>Loading users...</p>
          ) : (
            <l>
              {users.map((user, index) => (
                <li key={index}>{user.username}</li>
              ))}
            </l>
          )}
        </div>

        <div className="chat-box">
          {/* Display all received messages into each individual divs */}
          {messages.map((msg, index) => (
            <div key={index}>{msg}</div>
          ))}
        </div>
        <div className="chat-send">
          <input 
            placeholder='Message...' 
            value={message} 
            onChange={(event) => setMessage(event.target.value)} 
          />
          <button onClick={sendMessage}>Send</button>
        </div>
      </div>
    </div>
  </div> 
);
}

export default GroupChat;
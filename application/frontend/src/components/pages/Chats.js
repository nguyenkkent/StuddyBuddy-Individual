import SideNavbar from '../common/Sidebar';
import io from "socket.io-client";
import { useEffect, useState } from 'react';
import "../../css/Chats.css"
import Sidebar from '../common/Sidebar';
import axiosClient from '../../axiosClient';
import jwt_decode from "jwt-decode";

const socket = io(process.env.NODE_ENV == 'production' ? '/' : 'http://localhost:3001/'); // FIXME: edit paths as needed

function Chats() {

  // const [inputField, setInputField] = useState("");
  const [message, setMessage] = useState("");
  const [messageReceived, setMessageReceived] = useState("");
  const [username, setUsername] = useState(""); 

  //receiving the emit from the backend
  useEffect(() => {
    //grab token from browser
    const token = JSON.parse(localStorage.getItem("user"));
    if (!token) {
      console.log("No token found");
      return;
    }
    setUsername(token.username);

    socket.on("receiveMessage", (data) => {
      setMessageReceived(data.message);
    });
  }, []);

  //sending message to the backend
  const sendMessage = () => {

    //send the username of who sent message to backend
    
    socket.emit("sendMessage", { message, username });
    setMessage("");
  }
  return (
    <div className="chat-container">
      <div className="chat-content">
        <h1>Chatting with &lt;Placeholder&gt;</h1>
        <div className="chat-box">
          <div>
            <i>You epic chat starts here...</i>
            {messageReceived}
          </div>
        </div>
        <div className="chat-send">
          <input placeholder='Message...' value={message} onChange={(event) => {
            setMessage(event.target.value);
          }} />
          <button onClick={sendMessage}>Send</button>
        </div>
      </div>
    </div>

  );
}

export default Chats;
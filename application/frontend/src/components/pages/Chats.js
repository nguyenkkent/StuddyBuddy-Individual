import SideNavbar from '../common/Sidebar';
import io from "socket.io-client";
import { useEffect, useState } from 'react';
import "../../css/Chats.css"
import Sidebar from '../common/Sidebar';
import axiosClient from '../../axiosClient';
import jwt_decode from "jwt-decode";

const socket = io(process.env.NODE_ENV == 'production' ? '/' : 'http://localhost:3001/'); // FIXME: edit paths as needed

function Chats() {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    //listen for incoming messages from the backend
    socket.on("receiveMessage", (data) => {
      //spreads the 'messages' array into a new array and appending 'data.message' to the end
      //of the new array
      setMessages(prevMessages => [...prevMessages, data.message]);
    });
    //Clean up event listener when component unmounts
    return () => {
      socket.off("receiveMessage");
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
    //emit the message to the backend
    socket.emit("sendMessage", { message, username });
    setMessage("");
  }

  return (
    <div className="chat-container">
      <div className="chat-content">
        <h1>Chatting with &lt;Placeholder&gt;</h1>
        <div className="chat-box" style={{ display: "flex", flexDirection: "column" }}>
          {/* Display all received messages into each individual divs */}
          {messages.map((msg, index) => (
            <div key={index}>{msg}</div>
          ))}
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
import SideNavbar from '../common/Sidebar';
import io from "socket.io-client";
import { useEffect, useState } from 'react';
import "../../css/Chats.css"

const socket = io(process.env.NODE_ENV == 'production' ? '/' : 'http://localhost:3001/');

function Chats() {

  // const [inputField, setInputField] = useState("");
  const [message, setMessage] = useState("");
  const [messageReceived, setMessageReceived] = useState("");

  //receiving the emit from the backend
  useEffect(() => {
    socket.on("receiveMessage", (data) => {
      console.log(data)
      console.log("From the frontend: " + data.message);
      setMessageReceived(data.message);
    });
  }, [socket]);

  //sending message to the backend
  const sendMessage = () => {
    socket.emit("sendMessage", { message });
    setMessage("");
  }
  return (
    <div className="Chats">
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

  );
}

export default Chats;
import SideNavbar from '../common/Sidebar';
import io from "socket.io-client";
import { useEffect, useState, useRef } from 'react';
import "../../css/Chats.css"
import Sidebar from '../common/Sidebar';
import Webcam from "react-webcam"; 
import { useAuthContext } from '../../hooks/useAuthContext';
import axiosClient from '../../axiosClient';

const socket = io(process.env.NODE_ENV == 'production' ? '/' : 'http://localhost:3001/');

function Chats() {
  const { user } = useAuthContext();
  const webcamRef = useRef(null);
  const [webcamEnabled, setWebcamEnabled] = useState(false); 

  const [message, setMessage] = useState(""); //tracks the message we're emitting out
  const [messageDocuments, setMessageDocuments] = useState([]); //tracks all active chats open with current user
  const [recipient, setRecipient] = useState(""); //tracks name of who we're talking to
  const [recipientId, setRecipientId] = useState(""); //tracks the mongoDB ObjectId of who we're talking to
  const [messageContents, setMessageContents] = useState([]); //tracks the chat contents between two people

  //get all messages when component loads
  useEffect(() => {
    const fetchMessages = async () => {
      try {
        if (!user) {
          console.log("User not loaded");
          return;
        }

        //get all Messages document where current user is a participant
        const response = await axiosClient.get("/api/chats/get-all-messages", {
          // Send authorization header for middleware to intercept
          headers: {
            'Authorization': `Bearer ${user.token}`
          }
        }); 
        //render the Messages documents as clickables
        setMessageDocuments(response.data.messages);

      } catch (error) {
        console.error("Error fetching messages:", error);
      }
    };
    fetchMessages();
  }, []); 

  //handles receiving messages from socket.io server
  useEffect(() => {
    if(!user){
    console.log("User not loaded")
    return;
  }
    socket.on("receiveMessageDB", async (data) => {
      try {
        const token = JSON.parse(localStorage.getItem("user"));
        if (!token) {
          console.log("No token found");
          return;
        }
        //query database whenever to check for new activities
        const response = await axiosClient.get("/api/chats/get-all-messages", {
          headers: {
            'Authorization': `Bearer ${user.token}`
          }
        }); 
        setMessageDocuments(response.data.messages);

      } catch (error) {
        console.error("Error fetching messages:", error);
      }
    });
    return () => {
      // socket.off("receiveMessageDB");
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

    /*
    1. who is sending the message - email + username
    2. who is receiving the message - recipientId
    3. the message itself - message
    */
   
    const username = token.username;
    const email = token.email;
    //emit the message to the backend
    socket.emit("sendMessageDB", { message, username, email, recipientId });
    setMessage("");
  }


//toggle between chats with other users and keeps track who the message's receipient is
const handleMessageDocumentClick = (msg) => {
  //set the name of the person the current user is talking to
  setRecipient(msg.participants[0]===user.username? msg.participants[1] : msg.participants[0])

  //load the contents of conversation between current user and recipient
  setMessageContents(msg.contents);

  //set the recipient's ObjectId
  setRecipientId(msg.participantsId[0]===user.objectId? msg.participantsId[1] : msg.participantsId[0])
  //console.log(recipientId);
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

    <div>
      {/*render clickable buttons for each Messages document */}
      {messageDocuments.map((msg) => (
      // <button key={msg._id} onClick={() => handleMessageClick(msg)}> {msg.contents[0]}
      <button key={msg._id} onClick={() => handleMessageDocumentClick(msg)}> {msg.participants[0]===user.username? msg.participants[1] : msg.participants[0]}
      </button>))}
    </div>
    
    <div className="chat-container"> {/* Chat container */}
      <div className="chat-content">
        <h1>Chatting with &lt;{recipient}&gt;</h1>
        <div className="chat-box" style={{ display: "flex", flexDirection: "column" }}>
          {/*display all received messages into each individual divs */}
          {messageContents.map((msg, index) => (
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

export default Chats;
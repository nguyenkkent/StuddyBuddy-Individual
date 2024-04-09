import SideNavbar from '../components/Sidebar';
import io from "socket.io-client";
import { useEffect, useState } from 'react';

const socket = io('http://localhost:3001');

function Chats(){

    // const [inputField, setInputField] = useState("");
    const [message, setMessage] = useState("");
    const [messageReceived, setMessageReceived] = useState("");

    //receiving the emit from the backend
    useEffect(()=>{
        socket.on("receiveMessage", (data) =>{
            console.log("From the frontend: " + data.message);
            setMessageReceived(data.message);
        });
    }, [socket]);

    //sending message to the backend
    const sendMessage = () =>{
        socket.emit("sendMessage", {message});
        setMessage("");
    }
    return (
        <div className="Chats">
            <input placeholder='Message...' value={message} onChange={(event)=>{
                setMessage(event.target.value);
            }}/>
            <button onClick={sendMessage}>Send</button>
            <h1></h1>
            {messageReceived}
        </div>

    );
}

export default Chats;
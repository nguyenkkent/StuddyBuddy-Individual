import SideNavbar from '../components/Sidebar';
import io from "socket.io-client";

const socket = io('http://localhost:3001');

function Chats(){

    const sendMessage = () =>{
        socket.emit()
    }
    return (
        <div>
            <input placeholder='Message...'/>
            <button>Send</button>
        </div>
    );
}

export default Chats;
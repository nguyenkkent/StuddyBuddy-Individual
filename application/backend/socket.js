import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";
import cors from "cors";
import {Messages} from "../backend/models/messageSchema.js"


//create an instance of the application object
const app = express();
app.use(cors());
//create an http server instance from the express application
const server = createServer(app);

//create a new instance of socket from htttp server. the SocketIOServer class
//from socketIO and binds it the same HTTP server created from express
const io = new Server(server, {
	cors: {
		origin: "\*",
		methods: ["GET", "POST", "PUT", "DELETE"],
	},
});

io.on('connection', (socket) => {

  // console.log(`User connected: ${socket.id}`);

  socket.on('disconnect', () => {
    // console.log('user disconnected');
  });

  socket.on('joinRoom', ({ roomId }) => {
  // Join the Socket.IO room with the specified roomId
  console.log("roomId: " + roomId);
  socket.join(roomId);
  });

  //getting data from the front end and sending it back
  socket.on("sendMessage", data => {
    const { username, message } = data;
    //console.log(data);
    // Process message and username and concatenate them
    const result = username.concat(": ", message)
    // console.log({message : result});

    // Broadcast the message to other users
    io.emit("receiveMessage", {message : result} );
  });

});


export {app, io, server};


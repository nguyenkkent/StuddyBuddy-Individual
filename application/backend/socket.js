import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";
import cors from "cors";
// import {Messages} from "../models/messageSchema.js";

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
		methods: ["GET", "POST"],
	},
});

io.on('connection', (socket) => {
    // console.log(`User connected: ${socket.id}`);

    socket.on('disconnect', () => {
      console.log('user disconnected');
    });
    
    //getting data from the front end and sending it back
    socket.on("sendMessage", data=>{
        //send the message to all but the sender
        console.log(data);
        socket.broadcast.emit("receiveMessage", data);
    })
  });


export {app, io, server};


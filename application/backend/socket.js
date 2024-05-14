import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";
import cors from "cors";
import { Messages } from "../backend/models/messageSchema.js"
import { Users } from "./models/userSchema.js";
import { ObjectId } from "mongodb";


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

  //handles public groupchat
  socket.on("sendMessage", data => {
    const { username, message } = data;
    // Process message and username and concatenate them
    const result = username.concat(": ", message)

    // Broadcast the message to other users
    io.emit("receiveMessage", {message : result} );
  });


  //handles chats between two registered users
  socket.on("sendMessageDB", async (data) => {
    const {message, username, email, recipientId} = data;
    //console.log(data);
    try{

      //locate current user
      const currentUserDocument = await Users.findOne({email : email});
      //console.log(currentUserDocument);
      const userId = currentUserDocument._id


      const existingMessage = await Messages.findOne({
        participantsId: {
          $all: [userId, recipientId]
        }
      });
  
      io.emit("receiveMessageDB", { message: `${username}: ${message}` });
      if (existingMessage) {
        //update the contents of the existing Message document
        existingMessage.contents.push(`${username}: ${message}`);
        await existingMessage.save();
      } 
      else {
        const newMessage = new Messages({
          participantsId: [userId, recipientId],
          participants: [username, recipientId],
          contents: [`${username}: ${message}`],
          isGroupMessage: false
        });
        await newMessage.save();
      }

      
    }catch(error){
      console.error("Error: ", error);
    }
  });

});


export {app, io, server};


import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";

//create an instance of the application object
const app = express();
//create an http server instance from the express application
const httpServer = createServer(app);
//create a new instance of socket from htttp server. the SocketIOServer class
//from socketIO and binds it the same HTTP server created from express
const io = new Server(httpServer);
const router = express.Router();




export default router;  

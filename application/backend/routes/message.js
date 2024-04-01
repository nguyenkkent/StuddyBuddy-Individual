import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";
import cors from "cors";

//create an instance of the application object
const app = express();
app.use(cors());

//create an http server instance from the express application
const httpServer = createServer(app);

//create a new instance of socket from htttp server. the SocketIOServer class
//from socketIO and binds it the same HTTP server created from express
const io = new Server(httpServer, {
    origin : "*",
    methods: ["GET", "POST"],
});

const router = express.Router();




export default router;  

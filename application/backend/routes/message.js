import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";
const router = express.Router();
const httpServer = createServer();

const io = new Server(httpServer);

export default router;  

import express from "express";
import requireAuth from "../middleware/requireAuth.js"
import { handleStartChats } from "../handlers/chats/handleStartChat.js"
import { handleSendMessage } from "../handlers/chats/handleSendMessage.js";
import { handleGetAllMessages } from "../handlers/chats/handleGetAllMessages.js";
import { handleStartGroupChat } from "../handlers/chats/handleStartGroupChat.js";

const router = express.Router();
router.use(requireAuth);

router.post("/start-chat", handleStartChats);
router.post("/send-message/", handleSendMessage);
router.post("/start-group-chat", handleStartGroupChat);

router.get("/get-all-messages", handleGetAllMessages);



export default router;
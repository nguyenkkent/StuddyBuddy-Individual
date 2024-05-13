import express from "express";
import requireAuth from "../middleware/requireAuth.js"
import { handleStartChats } from "../handlers/chats/handleStartChat.js"
import { handleSendMessage } from "../handlers/chats/handleSendMessage.js";

const router = express.Router();
router.use(requireAuth);

router.post("/start-chat", handleStartChats);
router.post("/send-message/", handleSendMessage);

export default router;
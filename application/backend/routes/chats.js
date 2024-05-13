import express from "express";
import requireAuth from "../middleware/requireAuth.js"
import { handleStartChats } from "../handlers/chats/handleStartChat.js"
router.use(requireAuth);

router = express.Router();

router.post("/chats/start-chat", handleStartChats);

export default router;
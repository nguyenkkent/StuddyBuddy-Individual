import express from "express";
import requireAuth from "../middleware/requireAuth.js"
import { handleStartChats } from "../handlers/chats/handleStartChat.js"

const router = express.Router();
// router.use(requireAuth);

router.post("/start-chat", handleStartChats);

export default router;
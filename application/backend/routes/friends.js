import express from "express";
import requireAuth from "../middleware/requireAuth.js"
import { handleDisplayAllFriends } from "../handlers/friends/handleDisplayAllFriends.js";


const router = express.Router();
router.use(requireAuth);

router.get("/", handleDisplayAllFriends);

export default router;
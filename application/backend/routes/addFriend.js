import express from "express";
import requireAuth from "../middleware/requireAuth.js"
import { handleSearchForUsers } from "../handlers/friends/handleSearchForUser.js";
import { handleAddFriend } from "../handlers/friends/handleAddFriend.js";

const router = express.Router();
router.use(requireAuth);

router.get("/", handleSearchForUsers);
router.post("/", handleAddFriend);

export default router;


import express from "express";
import requireAuth from "../middleware/requireAuth.js"
import { handleDisplayAllFriends } from "../handlers/friends/handleDisplayAllFriends.js";
import { handleSearchForUsers } from "../handlers/friends/handleSearchForUser.js";
import { handleAddFriend } from "../handlers/friends/handleAddFriend.js";


const router = express.Router();
router.use(requireAuth);

router.get("/", handleDisplayAllFriends);
router.get("/search-for-users", handleSearchForUsers);
router.post("/add-friend", handleAddFriend);

export default router;
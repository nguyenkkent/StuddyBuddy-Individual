import express from "express";
import requireAuth from "../middleware/requireAuth.js"
import { handleSearchForUsers } from "../handlers/handleSearchForUser.js";
import { handleAddFriend } from "../handlers/handleAddFriend.js";

const router = express.Router();
router.use(requireAuth);

router.get("/", handleSearchForUsers);
router.post("/", handleAddFriend);

export default router;


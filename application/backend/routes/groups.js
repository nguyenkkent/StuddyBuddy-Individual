import express from "express";
import requireAuth from "../middleware/requireAuth.js"
import { handleDisplayAllGroups } from "../handlers/groups/handleDisplayAllGroups.js";
import { handleSearchFriendList} from "../handlers/groups/handleSearchFriendList.js";

const router = express.Router();
router.use(requireAuth);

router.get("/", handleDisplayAllGroups);
router.get("/search-friend-list", handleSearchFriendList);


export default router;
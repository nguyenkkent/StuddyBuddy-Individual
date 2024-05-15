import express from "express";
import requireAuth from "../middleware/requireAuth.js"
import { handleDisplayAllGroups } from "../handlers/groups/handleDisplayAllGroups.js";
import { handleSearchFriendList} from "../handlers/groups/handleSearchFriendList.js";
import { handleAddGroup } from "../handlers/groups/handleAddGroup.js";
import { handleAddMemberToGroup } from "../handlers/groups/handleAddMemberToGroup.js";

const router = express.Router();
router.use(requireAuth);

router.get("/", handleDisplayAllGroups);
router.get("/search-friend-list", handleSearchFriendList);
router.post("/add-group", handleAddGroup);
router.post("/add-member", handleAddMemberToGroup);


export default router;
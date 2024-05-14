import express from "express";
import requireAuth from "../middleware/requireAuth.js"
import { handleAddGroup } from "../handlers/handleAddGroup.js";
import { handleAddMemberToGroup } from "../handlers/handleAddMemberToGroup.js";
const router = express.Router();
router.use(requireAuth);

router.post("/", handleAddGroup);
router.post("/add-member", handleAddMemberToGroup);

export default router;
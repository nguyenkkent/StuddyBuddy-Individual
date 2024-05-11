import express from "express";
import requireAuth from "../middleware/requireAuth.js"
import { handleAddGroup } from "../handlers/handleAddGroup.js";
const router = express.Router();
router.use(requireAuth);

router.post("/", handleAddGroup);

export default router;
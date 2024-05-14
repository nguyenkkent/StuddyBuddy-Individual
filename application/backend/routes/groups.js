import express from "express";
import requireAuth from "../middleware/requireAuth.js"
import { handleDisplayAllGroups } from "../handlers/handleDisplayAllGroups.js";

const router = express.Router();
router.use(requireAuth);

router.get("/", handleDisplayAllGroups);


export default router;
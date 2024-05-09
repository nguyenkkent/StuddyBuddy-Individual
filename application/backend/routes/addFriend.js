import express from "express";
import requireAuth from "../middleware/requireAuth.js"
import { handleSearchForUsers } from "../handlers/handleSearchForUser.js";

const router = express.Router();
router.use(requireAuth);

router.get("/", handleSearchForUsers);
router.post("/", );

export default router;


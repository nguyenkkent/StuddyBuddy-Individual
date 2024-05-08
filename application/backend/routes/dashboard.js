import express from "express";
import {Users} from "../models/userSchema.js";
import requireAuth from "../middleware/requireAuth.js"
import { handleDashboard } from "../handlers/handleDashboard.js";

const router = express.Router();
router.use(requireAuth);

router.get("/", handleDashboard);

export default router;  


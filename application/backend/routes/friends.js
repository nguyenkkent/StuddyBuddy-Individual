import express from "express";
import { Users } from "../models/userSchema";
import requireAuth from "../middleware/requireAuth.js"

const router = express.router();
router.use(requireAuth);

router.get("/", async (request, response) => {

});

export default router;
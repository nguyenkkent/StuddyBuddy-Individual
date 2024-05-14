import express from "express";
import { handleLogin } from "../handlers/login/handleLogin.js";

const router = express.Router();

router.post("/", handleLogin)

export default router;
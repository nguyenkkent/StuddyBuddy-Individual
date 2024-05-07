import express from "express";
//import {Users} from "../models/userSchema.js";
// import "dotenv/config";
import { handleRegistration } from "../handlers/handleRegisterUser.js";
import { handleGuestUser } from "../handlers/handleGuessUser.js";

const router = express.Router();

router.post('/', handleRegistration);

router.post('/guest', handleGuestUser)

export default router;
import express from "express";
//import {Users} from "../models/userSchema.js";
// import "dotenv/config";
import { handleRegistration } from "../handlers/register/handleRegisterUser.js";
import { handleGuestUser } from "../handlers/register/handleGuessUser.js";

const router = express.Router();

router.post('/', handleRegistration);

router.post('/guest', handleGuestUser)

export default router;
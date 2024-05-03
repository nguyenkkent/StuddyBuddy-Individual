import express from "express";
import mongoose from "mongoose";
import { Groups } from "../models/groupSchema.js";
import requireAuth from "../middleware/requireAuth.js"
import {ObjectId} from "mongodb";

const router = express.Router();
router.use(requireAuth);


export default router;
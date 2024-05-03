import express from "express";
import mongoose from "mongoose";
import { Groups } from "../models/groupSchema.js";
import requireAuth from "../middleware/requireAuth.js"
import {ObjectId} from "mongodb";

const router = express.Router();
router.use(requireAuth);

router.get("/", async (request, response) => {
    try{
        //Grab the _id to identify the user's friend list
        //turn _id from string to mongoDB ObjectId class
        const userId = new ObjectId(request.user._id); 
        console.log("User ID:", userId);    

        //Query MongoDB to find the user's document
        const user = await Groups.collection.findOne({ _id: userId });
        if (!user) {
            console.log("User not found in the database.");
            return response.status(404).json({ error: "User not found" });
        }
        //assertion : user exists in the database

    }catch(error){
        console.log("Error:", error);
        return response.status(500).send({ message: error.message });        
    }
});


export default router;
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

        //Query MongoDB to find the all message documents that user is a participant in
        const Groups = await Groups.collection.find({ participantsId: userId }).toArray();
        if (!Groups  || Groups .length === 0) {
            console.log("User is not a participant in any groups");
            return response.status(404).json({ error: "User is not a participant in any groups" });
        }
        return response.status(200).json(Groups );

    }catch(error){
        console.log("Error:", error);
        return response.status(500).send({ message: error.message });        
    }
});


export default router;
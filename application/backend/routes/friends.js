import express from "express";
import {Users} from "../models/userSchema.js";
import requireAuth from "../middleware/requireAuth.js"
import {ObjectId} from "mongodb";

const router = express.Router();
router.use(requireAuth);

router.get("/", async (request, response) => {
    try {
        //Grab the _id to identify the user's friend list
        //turn _id from string to mongoDB ObjectId class
        const userId = new ObjectId(request.user._id); 
        console.log("User ID:", userId);

        //Query MongoDB to find the user's document
        const user = await Users.collection.findOne({ _id: userId });
        if (!user) {
            console.log("User not found in the database.");
            return response.status(404).json({ error: "User not found" });
        }

        //Retrieve the friend data from the user document
        const friendDataArray = user.friends;
        console.log("Friend Data:", friendDataArray);

        //set to json and return 
        const jsonData = { friendDataArray };
        console.log(jsonData);
        return response.status(200).json(jsonData);

    } catch (error) {
        console.log("Error:", error);
        return response.status(500).send({ message: error.message });
    }
});

export default router;
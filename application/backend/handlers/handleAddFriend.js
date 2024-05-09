import { Users } from "../models/userSchema.js";
import {ObjectId} from "mongodb";
import {Users} from "../models/userSchema.js";


export async function handleAddFriend(request, response){
    try{
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
        
        //find the searchTerm and add that user to the auth user's friendlist


    }catch(error){
        console.log("Error:", error);
        return response.status(500).send({ message: error.message });

    }

}

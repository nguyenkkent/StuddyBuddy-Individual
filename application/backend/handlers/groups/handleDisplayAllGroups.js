import { Groups } from "../../models/groupSchema.js";

import {ObjectId} from "mongodb";
export async function handleDisplayAllGroups(request, response){
    try{
        //Grab the _id to identify the user's friend list
        //turn _id from string to mongoDB ObjectId class
        const userId = new ObjectId(request.user._id); 
        console.log("User ID:", userId);    
        
        //Query MongoDB to find the all message documents that user is a participant in
        const GroupsArray = await Groups.collection.find({ membersId: userId }).toArray();

        console.log(GroupsArray);
        return response.status(200).json(GroupsArray );

    }catch(error){
        console.log("Error:", error);
        return response.status(500).send({ message: error.message });        
    }
};
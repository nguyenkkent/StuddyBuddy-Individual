import { Messages } from "../../models/messageSchema.js";
import { Users } from "../../models/userSchema.js";
import {ObjectId} from "mongodb";

export async function handleStartChats(request, response){
    try{
        console.log("handleStartChats was called");

        //find the current user
        const userId = new ObjectId(request.user._id); 
        const currentUser = await Users.findById(userId);

        //find the recipient
        const recipient = request.body.recipient;


        return response.status(200).json({ message: "Route ok" });
    }catch(error){
        console.log("Error:", error);
        return response.status(500).send({ message: error.message });
    }

}
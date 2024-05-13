import { Messages } from "../../models/messageSchema.js";
import { Users } from "../../models/userSchema.js";
import {ObjectId} from "mongodb";

export async function handleStartChats(request, response){
    try{
        console.log("handleStartChats was called");

        //find the current user
        const userId = new ObjectId(request.user._id); 
        const currentUserDocument = await Users.findById(userId);

        //find the recipient
        const recipientEmail = request.body.recipient;
        const recipientDocument = await Users.collection.findOne({email: recipientEmail});
        
        const newMessage = new Messages({
            participantsId : [userId, recipientDocument._id],
            participants : [currentUserDocument.username, recipientDocument.username],
            isGroupMEssage: false
        })
        //console.log(newMessage);
        await newMessage.save();


        return response.status(200).json({ message: "Route ok" });
    }catch(error){
        console.log("Error:", error);
        return response.status(500).send({ message: error.message });
    }

}
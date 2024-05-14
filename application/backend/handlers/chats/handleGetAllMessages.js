import { Messages } from "../../models/messageSchema.js";
import { ObjectId } from "mongodb";

export async function handleGetAllMessages(request, response){
    try{
        console.log("handleGetAllMessages was called @ ", Date.now());

        //find the current user
        const userId = new ObjectId(request.user._id);
        // console.log("userID: ", userId); 

        //find all documents where the user is a participant of
        const messages = await Messages.find({ participantsId: userId });

        return response.status(200).json({ messages });

    }catch(error){
        console.log("Error:", error);
        return response.status(500).send({ message: error.message });
    }

};
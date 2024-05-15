import { Messages } from "../../models/messageSchema.js";
import { Users } from "../../models/userSchema.js";
import { ObjectId } from "mongodb";
import { io } from "../../socket.js";

export async function handleStartChats(request, response){
    try{
        console.log("handleStartChats was called @ ", Date.now());

        //find the current user
        const userId = new ObjectId(request.user._id); 
        const currentUserDocument = await Users.findById(userId);

        //find the recipient
        const recipientEmail = request.body.recipient;
        const recipientDocument = await Users.collection.findOne({email: recipientEmail});

        //check if both parties have a previous message document
        const existingMessage = await Messages.findOne({
            participantsId: {
                $all: [userId, recipientDocument._id]
            }
        });

        if (existingMessage) {
            return response.status(409).json({ message: "Chat between both user already exists" }); 
        }
        else{
            const newMessage = new Messages({
            participantsId : [userId, recipientDocument._id],
            participants : [currentUserDocument.username, recipientDocument.username],
            isGroupMEssage: false
        })
            //console.log(newMessage);
            await newMessage.save();
            return response.status(200).json({ message: "Chat started successfully" });
        }

    }catch(error){
        console.log("Error:", error);
        return response.status(500).send({ message: error.message });
    }

}
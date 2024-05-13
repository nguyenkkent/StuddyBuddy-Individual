import { Users } from "../../models/userSchema.js";
import { Messages } from "../../models/messageSchema.js";
import { ObjectId } from "mongodb";

export async function handleSendMessage(request, response){
    try{
        console.log("handleSendMessage was called");

        //find the current user
        const userId = new ObjectId(request.user._id); 
        const currentUserDocument = await Users.findById(userId);

        //find the recipient
        const recipientEmail = request.body.recipient;
        const recipientDocument = await Users.collection.findOne({email: recipientEmail});
        
        //find the message document that both ObjectIds are apart of
        //update document
        const messageDocument = await Messages.findOne({
            participantsId: { $all: [userId, recipientDocument._id] }
        });

        //console.log(messageDocument);
        // Update document
        if (messageDocument) {
            const updatedMessage = `${currentUserDocument.username}: ${request.body.message}`;
            messageDocument.contents.push(updatedMessage);
            await messageDocument.save();
            return response.status(200).send({ message: "Message sent successfully" });
        } 
        else {
            return response.status(404).send({ message: "Message document not found" });
        }        
            

    }catch(error){
        console.log("Error:", error);
        return response.status(500).send({ message: error.message });
    }
}
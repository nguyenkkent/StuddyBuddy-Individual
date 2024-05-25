import { Messages } from "../../models/messageSchema.js";
import { Users } from "../../models/userSchema.js";
import { ObjectId } from "mongodb";
import { io } from "../../socket.js";

export async function handleStartGroupChat(request, response){
    try{
        console.log("handleStartGroupChat was called @ ", Date.now());
        console.log(request.body);

        //find the current user
        const userId = new ObjectId(request.user._id); 
        const currentUserDocument = await Users.findById(userId);

        //retreive the recipients
        const recipientIds = request.body.recipients.map( id => new ObjectId(id));
        const recipients = await Users.find({ _id: { $in: recipientIds } });        
        if (recipients.length !== recipientIds.length) {
            return response.status(404).json({ message: "Some recipients not found" });
        }

        const allMemberIds = recipients.map(member => member._id);
        const allMemberUsernames = recipients.map(member => member.username);

        //check if groupchat between all members exists
        const existingGroupChat = await Messages.findOne({ participantsId: { $all: allMemberIds } });

        // if (existingGroupChat) {
        //     return response.status(409).json({ message: "Group chat with these members already exists" });
        // }

        //create new groupchat
        const newGroupChat = new Messages({
            participants: allMemberUsernames,
            participantsId: allMemberIds,
            isGroupMessage: true
        });
        console.log(newGroupChat);
        await newGroupChat.save();

        return response.status(200).json({ message: "Group chat started successfully", groupId: newGroupChat._id });        
        
    }catch(error){
        console.log("Error:", error);
        return response.status(500).send({ message: error.message });
    }

}
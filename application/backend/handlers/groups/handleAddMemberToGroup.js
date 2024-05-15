import { ObjectId } from "mongodb";
import { Groups } from "../../models/groupSchema.js";
import { Users } from "../../models/userSchema.js";


export async function handleAddMemberToGroup(request, response){
    try{
        console.log("handleAddMemberToGroup was called @ ", Date.now());
        //console.log(request.headers);
        //search for current user document to get the username
        const userId = new ObjectId(request.user._id); 
        const user = await Users.findById(userId);
        if (!user) {
            console.log("User not found in the database.");
            return response.status(404).json({ error: "current User not found" });
        }

        //locate the group document in database that the current user is also in
        const groupName = request.headers.groupname;
        //const groupName = request.body.groupname;
        const group = await Groups.findOne({
            name: groupName,
            // Check if membersId array contains the current user's userId
            membersId: userId 
        });
        const newMemberEmail = request.headers.email;
        //const newMemberEmail = request.body.email;
        //find new member's document in database
        const newMember = await Users.findOne({email: newMemberEmail});

        //add new member into the group
        group.membersId.push(newMember._id);
        group.members.push(newMember.username);
        await group.save();

        return response.status(200).json({ message: "Member added to group successfully" });

    }catch(error){
        console.log("Error:", error);
        return response.status(500).send({ message: error.message });
    }

};
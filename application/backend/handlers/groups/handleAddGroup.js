import { ObjectId } from "mongodb";
import { Groups } from "../../models/groupSchema.js";
import { Users } from "../../models/userSchema.js";

export async function handleAddGroup(request, response){
    try {
        //mongoDb ObjectId type
        const userId = new ObjectId(request.user._id); 

        //search for current user document to get the username
        const user = await Users.findById(userId);
        if (!user) {
            console.log("User not found in the database.");
            return response.status(404).json({ error: "User not found" });
        }

        //grab the group name from headers
        // const newGroupName = request.headers.groupname;
        const newGroupName = request.body.groupname;
        //create the new group document
        const newGroup = {
            name: newGroupName,
            membersId: [userId],
            members: [user.username], 
        };

        const result = await Groups.collection.insertOne(newGroup);

        return response.status(200).json({ message: "Group created successfully" }); 
    } catch(error) {
        console.log("Error:", error);
        return response.status(500).send({ message: error.message });
    }
}
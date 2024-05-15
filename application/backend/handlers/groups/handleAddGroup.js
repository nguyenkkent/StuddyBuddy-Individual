import { ObjectId } from "mongodb";
import { Groups } from "../../models/groupSchema.js";
import { Users } from "../../models/userSchema.js";

export async function handleAddGroup(request, response){
    try {
        console.log("handleAddGroup was callled @ ", Date.now());
        //mongoDb ObjectId type
        const userId = new ObjectId(request.user._id); 

        //search for current user document to get the username
        const user = await Users.findById(userId);
        if (!user) {
            console.log("User not found in the database.");
            return response.status(404).json({ error: "User not found" });
        }

        //create the new group from request body parser
        //const newGroupName = request.body.groupname;
        //create the new group document
        // const newGroup = {
        //     name: request.headers.group.groupName,
        //     membersId: [userId],
        //     members: [user.username], 
        // };
        console.log(request.body.group);
        //retrieve variables from request body parser and create new group document
        const newGroup = {
            name: request.body.groupName,
            //create new mongoDB ObjectId out of the Id strings
            membersId: [userId, ...request.body.membersId.map(id => new ObjectId(id))],
            members: [user.username, ...request.body.members],
        };
        const result = await Groups.collection.insertOne(newGroup);

        return response.status(200).json({ message: "Group created successfully" }); 
    } catch(error) {
        console.log("Error:", error);
        return response.status(500).send({ message: error.message });
    }
}
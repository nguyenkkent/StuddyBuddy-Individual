import { Users } from "../../models/userSchema.js";

export async function handleSearchForUsers(request, response){
    try{
        console.log("hadleSearchForUsers was called @ ", Date.now());
        const searchTerm = request.headers.searchterm;
        //const searchTerm = request.body.researchterm;

        //query MongoDB to find the user's document
        // const potentialFriends = await Users.find({ email: searchTerm });
        const potentialFriends = await Users.find(
            { _id: searchTerm },
            { username: 1, email: 1, _id: 0 } // Projection to include only username and email fields
        );
        
        if (!potentialFriends) {
            console.log("No documents found with email");
            return response.status(404).json({ error: "No documents found with email" });
        }

        return response.status(200).json({ potentialFriends });

    }catch(error){
        console.log("handleSearchForUsers error: ", error);
        return response.status(500).send({ message: error.message });
    }

}

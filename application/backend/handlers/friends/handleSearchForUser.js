import { Users } from "../../models/userSchema.js";

export async function handleSearchForUsers(request, response){
    try{
       // const searchTerm = request.headers.searchterm;
       searchTerm = request.body.researchterm;

        //Query MongoDB to find the user's document
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
        console.log("Error:", error);
        return response.status(500).send({ message: error.message });
    }

}

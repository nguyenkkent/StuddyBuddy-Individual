import { Users } from "../models/userSchema.js";

export async function handleSearchForUsers(request, response){
    try{
        const searchTerm = request.headers.searchterm; // Corrected header name

        //Query MongoDB to find the user's document
        const potentialFriends = await Users.find({ email: searchTerm });
        if (!potentialFriends) {
            console.log("No documents found with email");
            return response.status(404).json({ error: "UNo documents found with email" });
        }

        return response.status(200).json({ potentialFriends });

    }catch(error){
        console.log("Error:", error);
        return response.status(500).send({ message: error.message });
    }

}

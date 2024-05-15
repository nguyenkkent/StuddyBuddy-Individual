import { Users } from "../../models/userSchema.js";
import { ObjectId } from "mongodb";

export async function handleSearchFriendList(request, response){
    try{
        console.log("handleSearchFriendList was called @ ", Date.now());
        //locate current user's document
        //const searchTerm = request.headers.searchterm;
        const searchTerm = request.body.searchTerm;
        //query MongoDB to find the user's document
        const userId = new ObjectId(request.user._id); 
        const currentUserDocument = await Users.findById(userId);

        //search their friends array and friendsIds for searchTerm
        //console.log(currentUserDocument);
        const result = currentUserDocument.friends.filter(friend => {
            return friend.includes(searchTerm);
        })

        //return list of items who match searchTerm
        return response.status(200).json(result);
    }catch(error){
        console.log("handleSearchFriendList error: ", error);
        return response.status(500).send({ message: error.message})
    }

}
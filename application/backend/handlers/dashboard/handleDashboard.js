import { Users } from "../../models/userSchema.js";

export async function handleDashboard(request, response) {
    try{
        const userData = await Users.collection.find(request.body.username).toArray();
        var jsonData = {};
        jsonData.userData = userData;

        return response.status(200).json(jsonData);
    }
    catch(error){
        console.log("Error: ", error.message);
        response.status(500).send({message: error.message})
    }
}
import { Users } from "../../models/userSchema.js";

export async function handleDashboard(request, response) {
    try{
        console.log("handleDashboard was called @ ", Date.now());
        const userData = await Users.collection.find(request.body.username).toArray();
        var jsonData = {};
        jsonData.userData = userData;

        return response.status(200).json(jsonData);

        // const filteredUserData = userData.map(user => ({
        //     _id: user._id,
        //     username: user.username,
        //     email: user.email
        // }));

        // const jsonData = { userData: filteredUserData };

        // return response.status(200).json(jsonData);        
    }
    catch(error){
        console.log("Error: ", error.message);
        response.status(500).send({message: error.message})
    }
}
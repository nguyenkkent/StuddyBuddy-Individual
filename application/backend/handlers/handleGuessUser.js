import { Users } from "../models/userSchema.js";
import jwt from "jsonwebtoken";

const createToken = (_id) => {
    return jwt.sign({_id}, process.env.SECRET, {expiresIn: '3d'});
}

export async function handleGuestUser(request, response) {
    try{
        const newUser = {
            username : request.body.username,
            tags: [],
            history:[],
            isVerified: false,
            isGuess: true
            }
        const result = await Users.collection.insertOne(newUser);
        //append the last 6 character of document's _id to guest username
        const objectId = result.insertedId;  
        const suffix = objectId.toString().slice(-6);
        newUser.username += suffix;

        // Update the user in the database with the new username
        await Users.collection.updateOne({ _id: objectId }, { $set: { username: newUser.username } });

        //create variables for json return
        const username = newUser.username;
        const token = createToken(result.insertedId);

        console.log(`A guest was inserted with the _id: ${result.insertedId}`);
        return response.status(200).json({username, token});
    }
catch(error){
    console.log("Error: ", error.message);
    response.status(500).send({message: error.message})
}
};
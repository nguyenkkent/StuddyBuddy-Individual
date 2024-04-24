import express from "express";
import {Users} from "../models/userSchema.js";
import bcrypt from "bcrypt";
import "dotenv/config";
import jwt from "jsonwebtoken";


const router = express.Router();

const createToken = (_id) => {
    return jwt.sign({_id}, process.env.SECRET, {expiresIn: '3d'});
}

router.post('/', async (request, response)=>{
    try{
        const user = await Users.findOne({email: request.body.email});
        if (user){
            // return response.status(409).json({ message: "Email is already in use" });  
            return response.status(409).json({message:"Email is already in use"});    
        }
        else{
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(request.body.password, salt);
            const newUser = {
                username : request.body.username,
                password: hashedPassword,
                email: request.body.email,
                tags: [],
                history:[],
                friends:[],
                isVerified: false,
                isGuess: request.body.username==="Guest",
                }
            const result = await Users.collection.insertOne(newUser);
            const objectId = result.insertedId;
            const username = newUser.username;
            const email = newUser.email;
            const token = createToken(result.insertedId);

            console.log(`A document was inserted with the _id: ${result.insertedId}`);
            return response.status(200).json({username, email, objectId, token});
        }
    }
    catch(error){
        console.log("Error: ", error.message);
        response.status(500).send({message: error.message})
    }
})


router.post('/guest', async (request, response)=>{
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
})

export default router;
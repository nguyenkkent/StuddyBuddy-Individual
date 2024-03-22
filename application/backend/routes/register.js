import express from "express";
import {Users} from "../models/userSchema.js";
const router = express.Router();
import bcrypt from "bcryptjs";

router.post('/', async (request, response)=>{

    try{
        console.log(request.body.email);
        const item = await Users.findOne({email: request.body.email});
        if (item){
            console.log("email is in used");
            return response.status(400).send("Email is already in used")         
        }
        else{
            const newUser = {
                username : request.body.username,
                password: request.body.password,
                email: request.body.email,
                tags: [],
                history:[],
                isVerified: false,
                isGuess: false
                }
                const result = await Users.collection.insertOne(newUser);
                console.log(`A document was inserted with the _id: ${result.insertedId}`);
                return response.status(200);
        }
    }
    catch(error){
        console.log("Error: ", error.message);
        response.status(500).send({message: error.message})
    }
})

export default router;
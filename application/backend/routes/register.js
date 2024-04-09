import express from "express";
import {Users} from "../models/userSchema.js";
const router = express.Router();
import bcrypt from "bcrypt";

router.post('/', async (request, response)=>{
    try{
        const item = await Users.findOne({email: request.body.email});
        if (item){
            alert("Email is already in used");
            response.status(409).send("Email is already in used")         
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
                isVerified: false,
                isGuess: false
                }
                const result = await Users.collection.insertOne(newUser);
                console.log(`A document was inserted with the _id: ${result.insertedId}`);
                response.status(200);
        }
    }
    catch(error){
        console.log("Error: ", error.message);
        response.status(500).send({message: error.message})
    }
})

export default router;
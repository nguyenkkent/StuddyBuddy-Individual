import express from "express";
import {Users} from "../models/userSchema.js";
import bcrypt from "bcrypt";
import "dotenv/config";
import jwt from "jsonwebtoken";


const router = express.Router();

const createToken = (_id) => {
    return jwt.sign({_id}, process.env.SECRET, {expiresIn: '3d'});
}

//handles when a user registers for an account
router.post('/', async (request, response)=>{
    try{
        const user = await Users.findOne({email: request.body.email});
        if (user){
            return response.status(409).json("Email is already in use");         
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
            //handles when user opt to continue as guess
            if (newUser.username==="Guest"){
                newUser.isGuess = true;
            }
            const result = await Users.collection.insertOne(newUser);
            const username = newUser.username;
            const email = newUser.email;
            const token = createToken(result.insertedId);
            console.log(`A document was inserted with the _id: ${result.insertedId}`);
            return response.status(200).json({username, email, token});
        }
    }
    catch(error){
        console.log("Error: ", error.message);
        response.status(500).send({message: error.message})
    }
})

export default router;
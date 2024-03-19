import express from "express";
import {Users} from "../models/userSchema.js";
const router = express.Router();

router.post('/', async (request, response)=>{

    try{
        const item = Users.findOne({email: request.body.email})
        if (item==null){
            console.log("email is in used");
        }
        else{
            console.log("User does not exists");

            const newUser = {
            username : request.body.username,
            password: request.body.password,
            email: request.body.email,
            tags: [],
            history:[],
            isVerified: false,
            isGuess: false
            }

            Users.collection.insertOne(newUser);
        }
    }
    catch(error){
        console.log("Error: ", error.message);
        response.status(500).send({message: error.message})
    }



})

    





//router.get

export default router;
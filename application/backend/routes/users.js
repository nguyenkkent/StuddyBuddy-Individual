import express from "express";
import {Users} from "../models/userSchema.js";
const router = express.Router();

router.post('/', async (request, response)=>{
try{
    console.log(request.body);
    const newUser = {
        username : request.body.username,
        password: request.body.password,
        email: request.body.email,
        tags: [],
        history:[],
        isVerified: false,
        isGuess: false
    }
    const user = await Users.create()
    

    //placeholder
    return response.status(200).send("Received data from backend")
}catch(error){
    console.log("Error: ", error.message);
    response.status(500).send({message: error.message})
}
});

//router.get

export default router;
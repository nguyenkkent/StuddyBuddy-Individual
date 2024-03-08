import express from "express";
import {User} from "../models/userSchema.js";
const router = express.Router();

router.post('/', async (request, response)=>{
try{
    console.log(request.body);
    const {username, password, email} = request.body;
    console.log(username);
    console.log(password);
    console.log(email);
    

    //placeholder
    return response.status(200).send("Received data from backend")
}catch(error){
    console.log("Error: ", error.message);
    response.status(500).send({message: error.message})
}
});

//router.get

export default router;
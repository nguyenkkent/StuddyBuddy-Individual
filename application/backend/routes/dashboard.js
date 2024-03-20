import express from "express";
import {Users} from "../models/userSchema.js";
import {Groups} from "../models/groupSchema.js";
import {Messages} from "../models/MessageSchema.js";
const router = express.Router();

// const app = express();
// app.use(express.json());
router.get("/", async (request, response) =>{
    try{
        const userData = await Users.collection.find({}).toArray();
        // const groupData = Groups.find({});
        // const messageData = Messages.find({});

        console.log(userData);
        // console.log(groupData);  
        // console.log(messageData);
        return response.status(200);

    }
    catch(error){
        console.log("Error: ", error.message);
        response.status(500).send({message: error.message})
    }
})

export default router;  
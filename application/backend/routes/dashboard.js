import express from "express";
import {Users} from "../models/userSchema.js";
import {Groups} from "../models/groupSchema.js";
import {Messages} from "../models/messageSchema.js";
const router = express.Router();

// const app = express();
// app.use(express.json());
router.get("/", async (request, response) =>{
    try{
        const userData = await Users.collection.find(request.body.username).toArray();
        // const groupData = await Groups.collection.find({}).toArray();
        // const messageData = await Messages.collection.find({}).toArray();
        var jsonData = {};
        jsonData.userData = userData;
        // jsonData.groupData = groupData;
        // jsonData.messageData = messageData;

        return response.status(200).json(jsonData);
    }
    catch(error){
        console.log("Error: ", error.message);
        response.status(500).send({message: error.message})
    }
})

export default router;  

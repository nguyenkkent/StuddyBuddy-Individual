import express from "express";
import {Users} from "../models/userSchema.js";
import requireAuth from "../middleware/requireAuth.js"

const router = express.Router();
router.use(requireAuth);

router.get("/", async (request, response) => {
    try{
    //grab the _id to identity which the user's friendlist
    const userId = request.user._id; // Access _id directly from the user object

    //query mongoDb
    //const friendData = await Users.collection.find({ _id: userId }).project({ friends: 1 }).toArray();
    const friendData = await Users.collection.find({ _id: userId }).toArray();
    const jsonData = { friendData };
    return response.status(200).json(jsonData);
    //send response
    // return response.status(200).json(friendData);

    }
    catch(error){
        console.log(error);
        return response.status(500).send({message: error.message})
    }
});

export default router;
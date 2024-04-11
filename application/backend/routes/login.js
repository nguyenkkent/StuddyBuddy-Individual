import express from "express";
import {Users} from "../models/userSchema.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const router = express.Router();

const createToken = (_id) => {
    return jwt.sign({_id}, process.env.SECRET, {expiresIn: '3d'});
}

router.post("", async (request, response) =>{
    try{
        const user = await Users.findOne({email: request.body.email});
        console.log("user: ", user);
        //if email exists in database
        if (user){
            //validate hashed password
            const match = await bcrypt.compare(request.body.password, user.password);
            if (match){
                const token = createToken(user._id);
                return response.status(200).json({token});
            }
        }
        //not exists or if password does not match
        return response.status(401).json({message:"Invalid credentials"});
    }
    catch (error){
        console.log("Error: ", error.message);
        response.status(500).send({message: error.message})        
    }
    //check if email exists, if so check the hashed password

})

export default router;
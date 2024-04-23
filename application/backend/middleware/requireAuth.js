import jwt from "jsonwebtoken";
import {Users} from "../models/userSchema.js";

const requireAuth = async (request, response, next) => {

    //get the authorization property from the request header
    const { authorization } = request.headers;
    //alternatively can just check to see if jwt exists
    
    if (!authorization){
        return response.status(401).json({error: "Authorization token required"});
    }
    //split the authorization and grab the second portion after the space delimiter
    const token = authorization.split(" ")[1];
    try{
        //verify that the token on browser has not been tampered with
        // const {_id} = await jwt.verify(token, process.env.SECRET);
        const user = await jwt.verify(token, process.env.SECRET);
        if (!user) {
            return response.status(404).json({ error: "User not found" });
        }
        //add a user property to the request object to pass onto the route
        // request.user = Users.findOne({_id}).select("_id");
        request.user = user; //set the user object to request.user
        next();
    }
    catch(error){
        console.log(error);
        response.status(401).json({error: "Request is not authorized"});
    }
}

export default requireAuth;
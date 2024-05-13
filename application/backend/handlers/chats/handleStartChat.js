import { Messages } from "../../models/messageSchema.js";

export async function handleStartChats(request, response){
    console.log("handleStartChats was called");
    console.log(request.headers);
    return response.status(200).json({ message: "Route ok" });
}
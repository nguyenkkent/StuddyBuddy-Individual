import { Messages } from "../../models/messageSchema.js";

export async function handleStartChats(response, request){
    console.log(request.headers.sender);
    console.log(request.headers.recipient);
}
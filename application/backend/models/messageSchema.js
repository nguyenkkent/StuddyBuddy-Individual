import mongoose from "mongoose";
const Schema = mongoose.Schema;

const messageSchema = new mongoose.Schema({
    participants: [String],
    contents: [String]
})
 
export const Messages = mongoose.model("Messages", messageSchema);

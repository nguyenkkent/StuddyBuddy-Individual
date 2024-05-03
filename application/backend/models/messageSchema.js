import mongoose from "mongoose";
const Schema = mongoose.Schema;
import {ObjectId} from "mongodb";

const messageSchema = new mongoose.Schema({
    participantsId: [ObjectId],
    participants: [String],
    contents: [String],
    isGroupMessage: {
        type: Boolean,
        require: true,
    }
})
 
export const Messages = mongoose.model("Messages", messageSchema);

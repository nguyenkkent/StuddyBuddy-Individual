import mongoose from "mongoose";
const Schema = mongoose.Schema;

const messageSchema = new mongoose.Schema({
    participants: [String],
    contents: [String],
    isGroupMessage: {
        type: Boolean,
        require: true,
    }

})
 
export const Messages = mongoose.model("Messages", messageSchema);

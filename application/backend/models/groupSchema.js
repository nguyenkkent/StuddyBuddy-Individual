import mongoose from "mongoose";
const Schema = mongoose.Schema;
import {ObjectId} from "mongodb";

const groupSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    GroupsId: [ObjectId],
    members: [String],

})
 
export const Groups = mongoose.model("Groups", groupSchema);

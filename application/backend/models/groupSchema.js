import mongoose from "mongoose";
const Schema = mongoose.Schema;

const groupSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    members: [String],

})
 
export const Groups = mongoose.model("Groups", groupSchema);
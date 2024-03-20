import mongoose from "mongoose";
const Schema = mongoose.Schema;

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    tags: [String],
    history: [String],  
    isVerified: {
        type: Boolean,
        require: true,
    },
    isGuess: {
        type: Boolean,
        require: true,
    }
})

// module.exports = User =  mongoose.model('User',userSchema)   
export const Users = mongoose.model("Users", userSchema);

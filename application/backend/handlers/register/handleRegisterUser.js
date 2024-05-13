import { Users } from "../../models/userSchema.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const createToken = (_id) => {
    return jwt.sign({_id}, process.env.SECRET, {expiresIn: '3d'});
}

export async function handleRegistration(request, response) {
    try {
        const user = await Users.findOne({ email: request.body.email });
        if (user) {
            return response.status(409).json({ message: "Email is already in use" });
        } else {
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(request.body.password, salt);
            const newUser = {
                username: request.body.username,
                password: hashedPassword,
                email: request.body.email,
                tags: [],
                history: [],
                friends: [],
                isVerified: false,
                isGuess: request.body.username === "Guest",
            };
            const result = await Users.collection.insertOne(newUser);
            const objectId = result.insertedId;
            const username = newUser.username;
            const email = newUser.email;
            const token = createToken(result.insertedId);

            console.log(`A document was inserted with the _id: ${result.insertedId}`);
            return response.status(200).json({ username, email, objectId, token });
        }
    } catch (error) {
        console.log("Error: ", error.message);
        response.status(500).send({ message: error.message });
    }
}
import express from "express";
import mongoose from "mongoose";
import {PORT, mongoURL} from "./config.js";

const app = express();
app.use(express.json());

//temp homepage router
app.get('/', (request, response)=>{
    return response.status(200).send("Hi this is a backend");
});

//connect to mongoDB
mongoose
    .connect(mongoURL)
    .then(()=> {    
        console.log('App successfully connected to database');
        app.listen(PORT, () => {
            console.log(`App is listening on port: ${PORT}`);//use backquotes for template literals
        });        
    })
    .catch((error)=>{
        console.log(error);
    });

app.post('/register', (request, response)=>{
    const{username, password, email} = request.body;
    console.log(request.body);
    return response.status(200).send("Received data from backend")
});


import express from "express";
import mongoose from "mongoose";
import {PORT, mongoURL} from "./config.js";
import userRouter from "./routes/users.js"
import dashboardRouter from "./routes/dashboard.js"

const app = express();
app.use(express.json());
app.use('/api/register', userRouter);
app.use('/api/dashboard', dashboardRouter);

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



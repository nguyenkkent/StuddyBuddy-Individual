import express from "express";
import mongoose from "mongoose";
import cors from "cors";

import {PORT, mongoURL} from "./config.js";
import registerRouter from "./routes/register.js"
import dashboardRouter from "./routes/dashboard.js";
import messageRouter from "./routes/message.js";

const app = express();

app.use(express.json());
app.use(cors);

app.use('/register', registerRouter);
app.use('/dashboard', dashboardRouter);
app.use('/message', messageRouter);

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



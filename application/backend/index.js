import express from "express";
import mongoose from "mongoose";

import {PORT, mongoURL} from "./config.js";
import registerRouter from "./routes/register.js"
import dashboardRouter from "./routes/dashboard.js";
import messageRouter from "./routes/message.js";

const app = express();

//middleware
app.use(express.json());


//routes
app.use('/api/register', registerRouter);
app.use('/api/dashboard', dashboardRouter);
app.use('api/message', messageRouter);


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



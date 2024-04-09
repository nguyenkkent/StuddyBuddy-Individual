import express from "express";
import mongoose from "mongoose";
import {app, server} from "./socket.js";
// import {PORT, mongoURL} from "./config.js";
import "dotenv/config";
import registerRouter from "./routes/register.js"
import dashboardRouter from "./routes/dashboard.js";


//middleware
app.use(express.json());

//routes
app.use('/api/register', registerRouter);
app.use('/api/dashboard', dashboardRouter);


//connect to mongoDB
mongoose
    .connect(process.env.mongoURL)
    .then(()=> {    
        console.log('App successfully connected to database');
        server.listen(process.env.PORT, () => {
            console.log(`App is listening on port: ${process.env.PORT}`);//use backquotes for template literals
        });        
    })
    .catch((error)=>{
        console.log(error);
    });



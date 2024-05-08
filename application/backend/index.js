import express from "express";
import mongoose from "mongoose";
import {app, server} from "./socket.js";
import "dotenv/config";
import registerRouter from "./routes/register.js"
import dashboardRouter from "./routes/dashboard.js";
import loginRouter from "./routes/login.js";
import friendsRouter from "./routes/friends.js"
import groupsRouter from "./routes/groups.js"

//middleware
app.use(express.json());

//routes
app.use('/api/register', registerRouter);
app.use('/api/dashboard', dashboardRouter);
app.use('/api/login', loginRouter);
app.use('/api/my-friends', friendsRouter);
app.use('/api/my-groups', groupsRouter)


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



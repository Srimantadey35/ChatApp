import express, { urlencoded } from "express";
import dotenv from "dotenv";
import userRoute from "./route/user.route.js"
import messageRoute from "./route/message.route.js"
import path from "path"
import cors from "cors"
import cookieParser from "cookie-parser";
import { server,app } from "./socketIo/server.js";
app.use(cors())

app.use(express.json())
app.use(cookieParser())
import mongoose from "mongoose";
dotenv.config()
const PORT = process.env.PORT || 5000;
const URI = process.env.MONGODB_URI;
try {
    mongoose.connect(URI)
    console.log("mongoDb connected");
    
} catch (error) {
    console.log(error);
    
}
app.use('/api/user',userRoute)
app.use('/api/message',messageRoute)

// code for deployment

if(process.env.NODE_ENV === 'production'){
    const dirpath = path.resolve();
    app.use(express.static('./frontend/dist'))
    app.get("*",(req,res)=>{
        res.sendFile(path.resolve(dirpath,"./frontend/dist",'index.html'))
    })
}

server.listen(PORT,()=>{
    console.log(`example app running on port localhost:${PORT}`)
})
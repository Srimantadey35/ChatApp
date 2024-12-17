import {Server} from "socket.io"
import http from "http"
import express from "express"

const app = express()
const server = http.createServer(app)
const io = new Server(server,{
    cors:{
        origin:"https://chatapp-1-k5lq.onrender.com",
        methods:["GET","POST"]
    }
});

//real time message code
export const getReceiverSocketId = (receiverId)=>{
  return users[receiverId]
}
const users = {}
io.on("connection",(socket)=>{
   //console.log("client connected",socket.id)
   const userId = socket.handshake.query.userId
   if(userId){
    users[userId] = socket.id
    //console.log("hello",users)
   }
  io.emit("getOnline",Object.keys(users))
   socket.on("disconnect",()=>{
    //console.log("client disconnected",socket.id)
    delete users[userId]
    io.emit("getOnline",Object.keys(users))
   })
})

export {app,io,server}

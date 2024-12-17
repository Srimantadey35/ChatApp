import Conversation from "../models/conversation.model.js";
import Message from "../models/message.model.js";
import { getReceiverSocketId, io } from "../socketIo/server.js";
import ApiError from "../utils/ApiError.js";
import asyncHandler from "../utils/asyncHandler.js";

export const sendMessage = asyncHandler(async(req,res)=>{
    try {
        const {message} = req.body
        const {id:receiverId} = req.params
        const senderId = req.user._id
    
        let conversation = await Conversation.findOne({
            participants:{$all:[senderId,receiverId]},
        })
       
    
        if(!conversation){
            conversation = await Conversation.create({
                participants : [senderId,receiverId],
            })
        }
            const newMessage =  new Message({
                senderId:senderId,
                receiverId:receiverId,
                message:message
            })

            if(newMessage){
                await Conversation.updateOne(
                    {_id:conversation._id},
                    {$push:{messages:[newMessage._id]}}
                )
            }
        
            await Promise.all([conversation.save(),newMessage.save()])
            const receiverSocketId = getReceiverSocketId(receiverId)
            if(receiverSocketId){
                io.to(receiverSocketId).emit("newMessage",newMessage)
            }
            res.status(201).json({message:"message sent successfully",newMessage})
           
        
    } catch (error) {
        console.log("error in sending message",error);
        
    }
})

export const getMessage = asyncHandler(async(req,res)=>{
    try {
       const {id:receiverId} = req.params
       const senderId = req.user._id
       
       let conversation = await Conversation.findOne(
        {
            participants:{ $all: [senderId,receiverId] }
        }
       ).populate("messages")
       
       if(!conversation){
        return res.status(201).json([])
       }

       const message =   conversation.messages;
       res.status(201).json(message)
       
    } catch (error) {
        console.log("error in get messsege",error)
    }
})
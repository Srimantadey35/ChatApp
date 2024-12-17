import React, { useEffect } from 'react'
import { useSocketContext } from './SocketContext.jsx'
import useConversation from '../stateManage/useConversation.js'
import sound from "../assets/freefire.mp3"

function UseGetSocketMessage() {
    const {socket} = useSocketContext()
    const {messages,setMessages} = useConversation();
    useEffect(()=>{
        socket.on("newMessage",(newMessage)=>{
            const notification = new Audio(sound)
            notification.play()

            setMessages([...messages,newMessage])
        })
        return ()=> socket.off("newMessage")
    },[socket,messages,setMessages])
  
}

export default UseGetSocketMessage
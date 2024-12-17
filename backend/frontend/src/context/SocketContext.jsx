import { useContext, useEffect, useState } from "react"
import { createContext } from "react"
import { useSelector } from "react-redux"
import io from "socket.io-client"
const socketContext = createContext()

export const useSocketContext = ()=>{
    return useContext(socketContext)
}

export const SocketProvider = ({children})=>{
    const user  = useSelector((state)=>state.user)
    const [socket,setSocket] = useState(null)
    const [onlineUsers,setOnlineUsers] = useState()

    useEffect(()=>{
        if(user.token){
            const socket = io("https://chatapp-1-k5lq.onrender.com",{
                query:{
                    userId: user._id
                }
            });
            setSocket(socket)
            socket.on("getOnline",(users)=>{
              setOnlineUsers(users)
            });
            return ()=> socket.close()
        }
        else{
            if(socket){
                socket.close();
                setSocket(null)
            }
        }
    },[user])
    return (
        <socketContext.Provider value={{socket,onlineUsers}}>
          {children}
        </socketContext.Provider>
    )

}

import React from 'react'
import useConversation from '../../stateManage/useConversation.js'
import { useSocketContext } from '../../context/SocketContext.jsx';

function User({ item }) {
    const {selectedConversation,setSelectedConversation} = useConversation()
     const isSelected = selectedConversation?._id === item._id;
     const {socket,onlineUsers} = useSocketContext()
     const isOnline = onlineUsers.includes(item._id)
    return (
        <div className= {`hover:bg-slate-600 duration-300 ${isSelected? "bg-green-400 hover:bg-green-400":""}`} onClick={()=>setSelectedConversation(item)}>

            <div className='flex space-x-4 px-6 py-5 '>
                <div className={`avatar ${isOnline? "online":""}`}>
                    <div className="w-14 rounded-full">
                        <img src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
                    </div>
                </div>
                <div>
                    <h1 className='font-bold'>{item.name}</h1>
                    <span>{item.email}</span>
                </div>
            </div>

        </div>
    )
}

export default User
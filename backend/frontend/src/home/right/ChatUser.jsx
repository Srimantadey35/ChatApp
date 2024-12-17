import React from 'react'
import useConversation from '../../stateManage/useConversation.js'
import NoChat from '../../components1/NoChat.jsx'
import { useSocketContext } from '../../context/SocketContext.jsx'

function ChatUser() {
   const {selectedConversation} = useConversation()
   const {socket,onlineUsers} = useSocketContext()

   const isOnline = onlineUsers.includes(selectedConversation._id)
   
    return (
        <>
          <div className='pl-5 pt-5 pb-3 flex space-x-4 h-[12vh] bg-gray-700 hover:bg-gray-500 duration-300'>
            <div>
            <div className={`avatar ${isOnline? "online":""}`}>
                    <div className="w-14 rounded-full">
                        <img src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
                    </div>
                </div>
            </div>

            <div>
                <h1 className='text-xl'>{selectedConversation?.name}</h1>
                <span className='text-sm'>{isOnline? "Online":"Offline"}</span>
            </div>
            </div>
        </>
    )
}

export default ChatUser
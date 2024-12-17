import React from 'react'

function Messege({message}) {

    const authUser = JSON.parse(localStorage.getItem("loggedInUser"))
    const itsMe = authUser._id === message.senderId

    const chatName = itsMe? "chat-end":"chat-start";
    const ChatColor = itsMe? "chat-bubble-info":"bg-green-400"
    const createdAt = new Date(message.createdAt)
    const formatedTime = createdAt.toLocaleTimeString([],{
        hour:"2-digit",
        minute:"2-digit"
    })
    return (
        <>
            <div className='p-4'>
                <div className={`chat ${chatName}`} >
                    <div className={`chat-bubble text-white ${ChatColor} ` }>{message.message}
                        <div className='text-sm '>{formatedTime}</div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Messege
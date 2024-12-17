import React, { useState } from 'react'
import { IoSend } from "react-icons/io5";
import useSendMessage from '../../components/useSendMessage.js';


function Type() {
    const {loading,sendMessages} = useSendMessage()
    const [message,setMessage] = useState("")
    const handleSubmit = async(e)=>{
     e.preventDefault()
     await sendMessages(message)
     setMessage("")
    }
    return (
        <> 
          <form onSubmit={handleSubmit}>
          <div className='flex space-x-3 text-center h-[8vh] bg-gray-600'>
            <div className='w-[70%] mx-4'>
                <input type="text" value={message} onChange={(e)=>{setMessage(e.target.value)}} placeholder="Type here" className="mt-1 px-3 py-3 border-[1px] border-gray-700 bg-slate-800 rounded-lg flex items-center w-full grow outline-none" />
            </div>

            <button className='text-3xl'>
                 <IoSend/>
            </button>
            </div>
          </form>
        </>
    )
}

export default Type
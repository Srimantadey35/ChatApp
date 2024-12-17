import React from 'react'
import ChatUser from './ChatUser'
import Messeges from './Messeges'
import Type from './Type'
import useConversation from '../../stateManage/useConversation.js'
import NoChat from '../../components1/NoChat.jsx'

function Right() {
  const {selectedConversation} = useConversation()

  return (
    <>
      {
        selectedConversation?(
          <div className='w-[70%] bg-slate-900 text-white'>
        
        <ChatUser/>
        <div style={{maxHeight: "calc(88vh - 8vh)"}} className='py-2 flex-srimanta overflow-y-auto' >
          <Messeges/>
        </div>
        <Type/>
      </div>
        ):(<NoChat/>)
      }
      
    </>
  )
}

export default Right
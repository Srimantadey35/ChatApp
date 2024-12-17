import React, { useEffect, useRef } from 'react'
import Messege from './Messege.jsx'
import useGetMessage from '../../components/useGetMessage.js'
import Loading from '../../components1/Loading.jsx'
import UseGetSocketMessage from '../../context/UseGetSocketMessage.jsx'

function Messeges() {

    const { messages,loading} = useGetMessage()
    UseGetSocketMessage()
    const lastMessageRef = useRef()
    useEffect(()=>{
        setTimeout(()=>{
          if(lastMessageRef.current){
            lastMessageRef.current.scrollIntoView({behaviour: 'smooth',block:"end"});
          }
        },100);
    },[messages])
    return (
        <>

         {loading? (<Loading/>):(messages.length>0 && messages.map((message)=>
            <div key={message._id} ref={lastMessageRef}>
                <Messege  message={message}/>
            </div>
         ))}


            <div style={{minHeight: "calc(88vh - 8vh)"}} className=''>
               {!loading && messages.length === 0 && <div><p className='text-center text-3xl font-bold mt-[20%]'>Say Hi!</p></div>}
            </div>
        </>
    )
}

export default Messeges
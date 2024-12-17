import axios from 'axios';
import React, { useState } from 'react'
import { IoLogOutOutline } from "react-icons/io5";
import { useDispatch } from 'react-redux';
import { setToken, setUser } from '../../store/userSlice';
import {toast} from "react-hot-toast"


function Logout() {
    const [loading,setLoading] = useState(false)
    const dispatch = useDispatch()
    const onClick =async (e)=>{
      e.preventDefault()
      setLoading(true)
     try {
         const response = await axios.post("/api/user/logout")
         if(response.data.success){
         localStorage.clear()
        // Cookies.remove("jwt")
         dispatch(setUser({_id:"",name:"",email:""}))
         dispatch(setToken({token:""}))
         setLoading(false)
         toast.success(response.data.message)
         }
     } catch (error) {
        console.log("logout error",error);
        
     }
    }

    return (
        <>
            <div className='w-[4%] bg-slate-900 text-white flex flex-col justify-end'>
                <div className='p-3 align-bottom'>
                    <form action="">
                        <div className='flex space-x-3'>
                           
                            <button onClick={onClick}><IoLogOutOutline className='text-5xl p-2 hover:bg-gray-600 rounded-lg duration-300' /></button>
                        </div>
                    </form>
                </div>


            </div>

        </>
    )
}

export default Logout
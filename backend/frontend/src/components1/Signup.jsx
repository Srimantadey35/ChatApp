import React, { useState } from 'react'
import {Link} from "react-router-dom"
import axios from "axios"
import toast from "react-hot-toast"
import { useNavigate } from 'react-router-dom'
import {useSelector,useDispatch} from "react-redux"
import { setUser } from '../store/userSlice'
function Signup() {
  const navigate = useNavigate()
  const [data,setData]= useState({
    name:"",
    email:"",
    password:"",
    ConfirmPassword:"",
})
  const onChange =(e)=>{
    const {name,value} = e.target
   setData((prev)=>
   {
   return {
    ...prev,
    [name] : value
   }
  }
  )
  }

  const onSubmit = async(e)=>{
    e.preventDefault()
    const response = await axios.post("/api/user/signup",data)
    console.log(response)
   
    if(response.data.success){
      toast.success(response.data.data)
      localStorage.setItem("UserDetails",JSON.stringify(response.data))
      navigate("/login")
    }
  }
  return (
    <div className='m-3 w-full mt-11'>
      <div className='w-full bg-white p-6 max-w-md mx-auto shadow-md rounded-md'>

        <p className='text-center text-3xl text-orange-600 font-bold'>CHATAPP</p>
        <h2 className='font-semibold text-center mt-4'>Create your <span className='text-blue-600'>Account</span></h2>

        <form className='grid gap-3 py-4' onSubmit={onSubmit}>
          <div className='grid gap-1'>
            <label htmlFor='name'>Name</label>
            <input
              type="text"
              id='name' name='name'
              placeholder='enter your name'
              onChange={onChange}
              className='bg-slate-300 p-1 px-2 rounded'
              required
            />
          </div>

          <div className='grid gap-1'>
            <label htmlFor='email'>Email</label>
            <input
              type="email"
              id='email' name='email'
              placeholder='enter your email'
              onChange={onChange}
              className='bg-slate-300 p-1 px-2 rounded'
              required
            />
          </div>

          <div className='grid gap-1'>
            <label htmlFor='password'>Password</label>
            <input
              type="password"
              id='password' name='password'
              placeholder='enter your password'
              onChange={onChange}
              className='bg-slate-300 p-1 px-2 rounded'
              required
            />
          </div>

          <div className='grid gap-1'>
            <label htmlFor='ConfirmPassword'>Confirm Password</label>
            <input
              type="password"
              id='ConfirmPassword' name='ConfirmPassword'
              placeholder='enter your password'
              onChange={onChange}
              className='bg-slate-300 p-1 px-2 rounded'
              required
            />
            {data.ConfirmPassword !== data.password ?<p className='text-red-500'>Password and confirm password must be same</p>:<p></p>}
          </div>
          <button className='w-full mt-3 p-2 bg-orange-600 text-white font-semibold rounded hover:bg-orange-700'>Signup</button>
        </form>

         <p>
           Already have account? <Link to={"/login"} className='text-orange-600 cursor-pointer font-semibold'>Login</Link>

         </p>

      </div>
    </div>
  )
}

export default Signup
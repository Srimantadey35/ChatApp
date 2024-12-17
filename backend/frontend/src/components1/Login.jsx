import React, { useState } from 'react'
import axios from 'axios'
import toast from 'react-hot-toast'
import { useDispatch, useSelector } from 'react-redux'
import { setToken, setUser } from '../store/userSlice.js'
import { Link, useNavigate } from 'react-router-dom'

function Login() {
  const user = useSelector((state)=>state.user)
      console.log("hello",user)
   const dispatch = useDispatch()
   const [data,setData] = useState({
    email:"",
    password:""
   })
   const navigate = useNavigate()
   const onChange =(e)=>{
     const{name,value} = e.target
     setData((prev)=>{
      return{
        ...prev,
        [name] : value
      }
     })
   }

   const onSubmit = async(e)=>{
    e.preventDefault()
    
    const response = await axios.post("/api/user/login",data)
    console.log("login",response)
   
    if(response.data.success){
      toast.success(response.data.data)
      localStorage.setItem("loggedInUser",JSON.stringify(response.data.message))
      localStorage.setItem("jwtToken",response.data.message.token)
      dispatch(setUser(response.data.message))
      dispatch(setToken({token:response.data.message.token}))
      navigate("/")
    }
   }


  return (
    <div className=' w-full mt-20 p-6'>
      <div className='w-full bg-white p-4 max-w-md mx-auto shadow-md rounded-md'>
        <p className='text-2xl font-bold text-blue-600 text-center'>CHATAPP</p>

        <form className='grid gap-3 py-4' onSubmit={onSubmit}>
          <div className='grid gap-1'>
            <label htmlFor='email'>Email</label>
            <input
              type="email"
              id='email' name='email'
              placeholder='enter your email'
              className='bg-slate-300 p-1 px-2 rounded'
              onChange={onChange}
              required
            />
          </div>

          <div className='grid gap-1'>
            <label htmlFor='password'>Password</label>
            <input
              type="password"
              id='email' name='password'
              placeholder='enter your password'
              className='bg-slate-300 p-1 px-2 rounded'
              onChange={onChange}
              required
            />
          </div>
          <button className='w-full mt-3 p-2 bg-orange-600 text-white font-semibold rounded hover:bg-orange-700'>Login</button>
        </form>

        <p>
          Don't have account ? <Link to={"/signup"} className='text-orange-600 font-semibold cursor-pointer'>Signup</Link>

        </p>

      </div>
    </div>
  )
}

export default Login
import React, { useEffect, useState } from 'react'
import Left from './home/left/Left'
import Right from './home/right/Right'
import Logout from './home/left1/Logout'
import Signup from './components1/Signup'
import Login from './components1/Login'
import { Toaster } from 'react-hot-toast'
import { Routes, Route, Navigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'
import { setUser } from './store/userSlice.js'

function App() {
  const dispatch = useDispatch()
  const user = useSelector((state) => state.user)
  const fetchLoggedInUser = async () => {
    const response = await axios.get("/api/user/fetchLoggedInUser")
    if (response.data.success) {
      dispatch(setUser(response.data.message.data))
    }
  }

  useEffect(() => {
    fetchLoggedInUser()
  }, [user.token])

  return (
    <>
      <Toaster />
      <Routes>
        <Route path='/'
          element={
            user.token ? (<div className='flex h-screen'>
              <Logout/>
          <Left/>
          <Right/>
              
            </div>) : (
              <Navigate to={"/login"} />
            )
          } />
        <Route path='/login' element={user.token ? <Navigate to={"/"} /> : <Login />} />
        <Route path='/signup' element={user.token ? <Navigate to={"/"} /> : <Signup />} />
      </Routes>

    </>
  )
}

export default App
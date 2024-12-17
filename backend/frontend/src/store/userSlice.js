import { createSlice } from "@reduxjs/toolkit";
import Cookies from "js-cookie"
 const token = Cookies.get("jwt") || localStorage.getItem("jwtToken")
  //const {_id,name,email} = JSON.parse(localStorage.getItem("loggedInUser"))
const initialState = {
    _id:"",
    name:"",
    email:"",
    token:token,
    

}

const userSlice = createSlice({
   name:"user",
   initialState,
   reducers:{
      setUser:(state,action)=>{
          state._id  =  action.payload._id
          state.name = action.payload.name
          state.email =  action.payload.email;
      },
      setToken:(state,action)=>{
        state.token = action.payload.token
      },
      
   }
})


export const {setUser,setToken} = userSlice.actions

export default userSlice.reducer
import React, { useEffect, useState } from 'react'
import axios from "axios"
import Cookies from 'js-cookie'

function GetAllUser() {
   
    const [allUser,setAllUser] = useState([])
    const [loading,setLoading] = useState([])
    useEffect(()=>{
        const allUserDetails = async()=>{
            setLoading(true)
          try {
            const token = Cookies.get("jwt") || localStorage.getItem("jwtToken")
            const response = await axios.get("/api/user/getUserDetails",
              {
                Credentials:"include",
                headers:{
                  Authorization: `Bearer ${token}`
                }
              }
            )
            setAllUser(response.data.allUsers)
            setLoading(false)
            
          } catch (error) {
            console.log("error in GetAllUser",error)
          }
        }
        allUserDetails()
    },[])
    return [allUser,loading]
 
}

export default GetAllUser
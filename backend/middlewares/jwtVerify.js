import jwt from "jsonwebtoken"
import ApiError from "../utils/ApiError.js"
import { User } from "../models/user.model.js"
import asyncHandler from "../utils/asyncHandler.js"

const jwtVerify =asyncHandler(async(req,_,next)=>{
   try {
      const token = req.cookies?.jwt
      if(!token){
       throw new ApiError(400,"token not found")
      }
      const decodedToken = jwt.verify(token,process.env.JWT_TOKEN)
      if(!decodedToken){
       throw new ApiError("401","token verification failed")
      }
   
      const user = await User.findById(decodedToken?.userId).select("-passwoed -confirmpassword")
      if(!user){
         throw new ApiError("500","jwt user not found")
      }
      req.user = user
      next()
   } catch (error) {
      console.log("error",error)
   }
})

export {jwtVerify}
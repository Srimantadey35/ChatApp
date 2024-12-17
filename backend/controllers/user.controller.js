import ApiError from "../utils/ApiError.js"
import ApiResponse from "../utils/ApiResponse.js"
import asyncHandler from "../utils/asyncHandler.js"
import {User} from "../models/user.model.js"
import bcrypt from "bcrypt"
import createTokenAndSaveCookie  from "../jwt/generateToken.js"


export const signUp = asyncHandler(async (req,res)=>{
  const{name,email,password,ConfirmPassword} = req.body
  // if([name,email,password,confirmpassword].some((field)=>field.trim() == "")){
  //   throw new ApiError(402,"all fields are required")
  // }
  
  if(password !== ConfirmPassword){
    throw new ApiError(400,"password doesn't matching")
  }
const existedUser = await User.findOne({email})
  if(existedUser){
    throw new ApiError(400,"user already exists")
  }
  const hashPassword = await bcrypt.hash(password,10)

  const user = await  User.create({
    name,
    email,
    password:hashPassword,
    confirmpassword : ConfirmPassword
  }) 
  const registeredUser = await User.findById(user._id).select("-confirmpassword -password")
  if(user){
    createTokenAndSaveCookie(user._id,res)
    res.status(201).json(
      new ApiResponse(200, registeredUser, "User registered Successfully")
    )
  }
})

export const login = asyncHandler(async(req,res)=>{

  const {email,password} = req.body
  if(!email && !password){
    throw new ApiError(401,"both email and password required")
  }

  const user = await User.findOne({email})

  if(!user){
    throw new ApiError(401,"register first")
  }

  const loggedInUser = await bcrypt.compare(password,user.password)
  if(!loggedInUser){
     
     throw new ApiError(402,"Incorrect password")
  }

  const token = createTokenAndSaveCookie(user._id,res)

  return res.status(201).json(
    new ApiResponse (200,{_id:user._id,name:user.name,email:user.email,token:token},"user loggedIn successfully")
  )

})

export const logout = asyncHandler(async(req,res)=>{
  res.clearCookie('jwt')
  res.status(200).json(
    new ApiResponse("200","user loggedout successfully")
  )
})

export const fetchLoggedInUser = asyncHandler(async(req,res)=>{
  res.status(200).json(
    new ApiResponse(200,{
      data:req.user
    })
  )
})


export const getUserDetails = asyncHandler(async(req,res)=>{
  const loggedInUser = req.user._id
  const allUsers = await User.find({_id:{$ne:loggedInUser}}).select("-password -confirmpassword")
  res.status(201).json({allUsers})
})
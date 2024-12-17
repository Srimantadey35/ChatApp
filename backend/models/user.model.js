import mongoose from "mongoose"

const userSchema = new mongoose.Schema({
    name:{
        type: String,
        require: true
    },
    email:{
        type: String,
        require: true,
        unique: true,
        lowerCase: true
    },
    password:{
        type: String,
        require: true
    },
    confirmpassword:{
        type: String,
        require: true
    }
},{timestamps:true})

export const User = mongoose.model("User",userSchema);

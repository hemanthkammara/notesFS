const mongoose=require("mongoose");

const userSchma=mongoose.Schema({
    username:String,
    email:String,
    pass:String
},{versionKey:false})

const userModel=mongoose.model("user",userSchma)

module.exports={userModel}
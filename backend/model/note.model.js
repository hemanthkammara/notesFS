const mongoose=require("mongoose");

const noteSchma=mongoose.Schema({
  
    title:String,
    body:String,
    userId:String,
    username:String
},{versionKey:false})

const noteModel=mongoose.model("note",noteSchma)

module.exports={noteModel}
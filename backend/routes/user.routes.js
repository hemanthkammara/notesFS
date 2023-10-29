const express=require("express");

const {userModel}=require("../model/user.model")
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const userRouter=express.Router();



userRouter.post("/register",(req,res)=>{
    const{username,email,pass}=req.body
    try{
        bcrypt.hash(pass, 1, async(err, hash)=>{
         
            if(err){
                res.status(200).send({"msg":"not able to generate the hash","err":err})
            }
            else{
                
                const user=new userModel({username,email,pass:hash})
                await user.save()
                res.status(200).send({"msg":"the new user has been registered","new_user":req.body})
            }
        });
    }
    catch(err){
          res.status(400).send({"error":err})
    }
})


userRouter.post("/login",async(req,res)=>{
    const {email,pass}=req.body
     try{
        const user=await userModel.findOne({email})
        if(user){
            bcrypt.compare(pass, user.pass, (err, result)=> {
                if(result){
                   const token=jwt.sign({username:user.username,userId:user._id},"masai")
                  res.status(200).send({"msg":"login successful","token":token})
               }
               else{
                   res.status(200).send({"msg":"wrong credentials!"})
               }
           });
        }else{
           res.status(400).send({"msg":"user does not exists"})
        }
   
     }catch(err){
        res.status(400).send({"error":err})
     }
   })





module.exports={userRouter}
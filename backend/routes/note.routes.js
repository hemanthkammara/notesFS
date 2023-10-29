const express=require("express");

const {noteModel}=require("../model/note.model")
const {auth}=require("../middleware/auth.middleware")

const noteRouter=express.Router();

noteRouter.use(auth)
noteRouter.post("/create",async(req,res)=>{
    try{
        const note = new noteModel(req.body);
            await note.save()
            res.status(200).send({"msg":"a new notes has been registered"})
    }
    catch(err){
        res.status(400).send({"err":err})
    }
})



noteRouter.get("/",async(req,res)=>{
    try{
     const notes= await noteModel.find({username:req.body.username})
     res.status(200).send(notes)
    }
    catch(err){
        res.status(400).send({"err":err})
    }
})



noteRouter.patch("/update/:noteID",async(req,res)=>{
    const {noteID}=req.params
    const note=await noteModel.findOne({_id:noteID})
    try{
        console.log(req.body,"ids",note)
        if(req.body.userID==note.userID){
            await noteModel.findByIdAndUpdate({_id:noteID},req.body)
            res.status(200).send({"msg":`the note with ID:${noteID} has been updated`})
        }
        else{
                res.status(200).send({"msg":"you are not authorised"})
        }

    }
    catch(err){
             res. status(400).send({"err":err})
    }
})


noteRouter.delete("/delete/:noteID",async(req,res)=>{
    const {noteID}=req.params
    const note=await noteModel.findOne({_id:noteID})
    try{
        
        if(req.body.userID==note.userID){
            await noteModel.findByIdAndDelete({_id:noteID})
            res.status(200).send({"msg":`the note with ID:${noteID} has been deleted`})
        }
        else{
                res.status(200).send({"msg":"you are not authorised"})
        }

    }
    catch(err){
             res. status(400).send({"err":err})
    }
})

module.exports={noteRouter}
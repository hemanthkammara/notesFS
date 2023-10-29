const express=require("express");
const app=express();
app.use(express.json());

const {connection}=require("./db")


const {userRouter}=require("./routes/user.routes")
const {noteRouter}=require("./routes/note.routes")


app.use("/user",userRouter)
app.use("/note",noteRouter)

app.get("/",(req,res)=>{
res.send({"msg":"testing server express"})
})

app.listen(4500,async(req,res)=>{
    try{
        await connection
        console.log("db connected");
        console.log("server running at port 4500")

    }
    catch(err){
  console.log(err)
    }
    
})
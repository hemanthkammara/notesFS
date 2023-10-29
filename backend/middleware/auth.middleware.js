
const jwt = require('jsonwebtoken');

const auth=(req,res,next)=>{
    const token=req.headers.authorization?.split(" ")[1]
    if(token){
        jwt.verify(token,"masai",(err,decoded)=>{
            if(decoded){
                req.body.username=decoded.username,
                req.body.userId=decoded.userId
                console.log(decoded)
                next()
            }else{
                res.send({"msg":"you are not autherised"})
            }
        })
    }else{
        res.send({"msg":"please login first"})
    }
}
module.exports={auth}
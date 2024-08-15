const messageModel =require("../model/msgmodel")
const bycrypt=require("bcrypt")
module.exports.addmessage=async(req,res,next)=>{
    try{
        const {from,to,message}=req.body;
        const u=[from,to];
        const data=await messageModel.create({
            message:{text:message},
            users:u,
            sender:from,
        })
        if(data)return res.json({msg:"message enter succesfully into database"});
        return res.json({msg:"Failed to enter data into data base!"});
    }
    catch(ex){
        next(ex);
    }
};
module.exports.getallmessage=async(req,res,next)=>{ 
    try{
        const {from,to}=req.body;
         const data =await messageModel.find({users:{$all:[from,to]}}).sort({updatedAt:1});
         const projectedData=data.map((msg)=>{
            return{
                fromSelf:msg.sender.toString()===from,
                data:msg.message.text,
            }
         })
       
         return res.json(projectedData);
    }
    catch(err)
    {
        next(err);
    }
};
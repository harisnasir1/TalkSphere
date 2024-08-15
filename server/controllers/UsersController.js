const Users =require("../model/usermodel.js")
const bycrypt=require("bcrypt")
module.exports.register=async(req,res,next)=>{
    try{
        
        const{UserName, Email,Password,}=req.body;
        const usernamecheck=await Users.findOne({UserName});
        const emailnamecheck=await Users.findOne({Email});
   
        if(usernamecheck){
          return  res.json({msg:"UserName Already Exists ",status:false});
        }
        else if(emailnamecheck){
          return  res.json({msg:"Email  Already Exists ",status:false});
        }
else{

 
        const hashedpass=await bycrypt.hash(Password,13);
        const user=await Users.create({
            UserName,
             Email,
             Password:hashedpass,
        })
       
        delete user.Password;
        return res.json({status:true,user});
}
    }
    catch(err){
        next(err);
    }
};


module.exports.Login=async(req,res,next)=>{
    try{
        
        const{UserName,Password,}=req.body;
        const user=await Users.findOne({UserName});
       
        if(!user){
           return  res.json({msg:"Incorrect User Name or password",status:false});
        }
        const passhashcheck=await bycrypt.compare(Password,user.Password);
        if(!passhashcheck)
        {
       return res.json({msg:"Incorrect  password",status:false});

        }
   
        delete user;
        return res.json({status:true,user});

      
        

    }
    catch(err){
        next(err);
    }
};
module.exports.setAvatar=async(req,res,next)=>{
    try{
       const userId=req.params.id;
       const avatarImg=req.body.img;
       
       const userData=await Users.findByIdAndUpdate(userId,{
        isAvatarImgSet:true,
        AvatarImg: avatarImg
       })
       return res.json({isSet:userData.isAvatarImgSet,image:userData.AvatarImg})
    }
    catch(ex)
    {
        next(ex);
    }
};
module.exports.allUsers=async(req,res,next)=>{
    try{
        const userId=req.params.id;
        const users=await Users.find({_id:{$ne:userId}}).select([
            "Email","UserName","AvatarImg","_id",
        ]);
        console.log(res.json(users));

    }
    catch(ex)
    {
        next(ex);
    }
};

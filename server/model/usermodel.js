const mongoose= require("mongoose")
 
const userschema= new mongoose.Schema({
UserName:{
    type:String,
    required:true,
    min:3,
    max:20,
    unique:true,
},
Email:{
type:String,
required:true,
max:50,
},
Password:{
type:String,
required:true,
min:8,

},
isAvatarImgSet:{
type:Boolean,
default:false,
},
AvatarImg:{
type:String,
default:"",
}
})
module.exports=mongoose.model("Users",userschema);
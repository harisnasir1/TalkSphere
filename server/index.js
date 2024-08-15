const express=require("express")
const cors=require("cors")
const mongoose=require("mongoose")
const dotenv=require("dotenv")
const socket =require("socket.io")
const UserRoutes=require('./routes/UserRoutes')
const MsgRoutes=require('./routes/MsgRoutes')

const app=express();
dotenv.config();
app.use(express.json());
app.use(cors());
app.use("/api/auth",UserRoutes)
app.use("/api/message",MsgRoutes)
mongoose.connect(process.env.MONGO_URL)
.then(()=>console.log("mongodb connected Successfully"))
.catch((err)=>console.log(`mongo throw an exception: ${err}`));

const server=app.listen(process.env.PORT,()=>{
    console.log(`server start on port = ${process.env.PORT}`)
})
const io=socket(server,{
    cors:{
        origin:"http://localhost:3000",
        Credential:true,
    }
})
global.onlineUsers=new Map();

  io.on("connection",(socket)=>{
    console.log("connnected to socket")
      global.ChatSocket=socket;
      socket.on("add-user",(UserId)=>{
        onlineUsers.set(UserId,socket.id)
        console.log("user added",UserId)
        console.log("online",onlineUsers)
    });
   

  socket.on("send-msg",(data)=>{
    const sendUserSocket=onlineUsers.get(data.to);
    if(sendUserSocket)
    {
        console.log(data)
        socket.to(sendUserSocket).emit("msg-recieve",data.message)
    }
  })
})
import React,{useEffect,useState,useRef} from 'react'
import styled from 'styled-components'
import LogOut from './LogOut';
import Chatinput from './Input'
import {v4 as uuidv4} from "uuid"
import axios from "axios"
import {SendMessageRoute} from '../Utils/APIROUTE'
import {getallMessageRoute} from '../Utils/APIROUTE'

const ChatContainer = ({currentChat,currentuser,socket}) => {
const [message,setmessage]=useState([]);
const [arrivalmessage,setarrivalmessage]=useState(null);
const scrollRef=useRef();
const handlesendmessage=async(msg)=>{
const data=await axios.post(SendMessageRoute,{
  from:currentuser._id,
  to:currentChat._id,
  message:msg,

});
socket.current.emit("send-msg",{
  to:currentChat._id,
  from:currentuser._id,
  message:msg,
});
const msgss=[...message]
msgss.push({fromSelf:true,data:msg});
setmessage(msgss);

}


async function getmsg (){
    if(currentChat)
  {const messages=await axios.post(getallMessageRoute,{
    from:currentuser._id,
    to:currentChat._id,
  });
 
  setmessage(messages.data);
   console.log(message)}
}

useEffect(()=>{
  
  getmsg();
},[currentChat])



useEffect(()=>{
  if(socket.current)
  {
    socket.current.on("msg-recieve",(msg)=>{
      console.log(msg)
      setarrivalmessage({fromSelf:false,data:msg});
    })
    
  }
},[])

useEffect(()=>{
  arrivalmessage&& setmessage((prev)=>[...prev,arrivalmessage]);
 
},[arrivalmessage])


useEffect(()=>{
  scrollRef.current?.scrollIntoView({ behavior: "smooth" });
},[message])


  return (
    <>
    <Conatainer>
  <div className="chat-header">
    <div className="user-details">
        <div className="avatar">
        <img src={`data:image/svg+xml;base64,${currentChat.AvatarImg}`} alt="avatar" />
        </div>
        <div className="Username">
            <h3>{currentChat.UserName}</h3>
        </div>
    </div>
    <LogOut/>
  </div>
  <div className="chat-messages">
    
     {
      message.map((msg,index)=>{
           return(
            <div ref={scrollRef} key={index} >
              <div className={`message ${msg.fromSelf?"sended":"recive"}`}>
                <div className="content">
                  <p>
                  {msg.data}

                  </p>
                </div>
              </div>
            </div>
           )
      })
     }
  </div>
  <div className="chat-input">
  <Chatinput handlesendmessage={handlesendmessage}/>
  </div>
    </Conatainer>
    </>
  )
}



const Conatainer=styled.div`
padding-top:1rem;
display:grid;
grid-template-rows:10% 80% 1%;
gap:0.1rem;
overflow:hidden;
@media screen and (min-width: 720px) and (max-width: 1080px) {
  grid-template-rows: 15% 70% 15%;
}
.chat-header{
    display:flex;
    justify-content:space-between;
    align-items:center;
    padding:0 2rem;
    .user-details{
        display:flex;
        align-items:center;
        gap:1rem;
        .avatar{
            img{
                height:3rem;
            }
        }
        .Username{
            h3{
                color:white;
            }
        }
    }
    
}
.chat-messages{
padding:1rem 2rem;
display:flex;
flex-direction:column;
gap:1rem;
overflow:auto;
.message{
  display:flex;
  align-items:center;
.content{
  max-width:40%;
  overflow-wrap:break-word;
  padding:1rem;
  font-size:1.1rem;
  border-radius:1rem;
  color:#d1d1d1;

  }
        }
  .sended{
    justify-content:flex-end;
    .content{
      background-color:#4f04ff21;
    }

  }
  .recive{
    justify-content:flex-start;
    .content{
      background-color:#9900ff20;
    }

  }

}
`;
export default ChatContainer
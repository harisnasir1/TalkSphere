import React,{useState,useEffect,useRef} from 'react'
import axios from "axios"
import {useNavigate} from 'react-router-dom';
import styled from 'styled-components'
import {allUsersRoute,host} from '../Utils/APIROUTE'
import Contacts from '../Components/Contacts'
import Welcome from '../Components/Welcome'
import ChatContainer from '../Components/ChatContainer'
import {io} from "socket.io-client"
const Chat = () => {
  const socket=useRef();
  const navigate=useNavigate();
  const [contacts,setcontacts]=useState([]);
  const [currentuser,setcurrentuser]=useState(() => {
    // getting stored value
    const saved =  localStorage.getItem('chat-app-users');
    const initialValue = JSON.parse(saved);
    return initialValue || "";
  });
  const [currentChat,setcurrentChat]=useState(undefined);
  useEffect(()=>{
  
    if(!localStorage.getItem("chat-app-users"))
    {
      navigate("/Login");
    }
   
},[])
  useEffect(()=>{
    if(currentuser)
    {
      socket.current=io(host);
      socket.current.emit("add-user",currentuser._id)
    }
  },[currentChat])
  useEffect(()=>{
    const fun=async()=>{
      try{
       if(currentuser!=undefined)
       {
       
         if(currentuser.isAvatarImgSet)
         {
         
           const res=await axios.get(`${allUsersRoute}/${currentuser._id}`);
   
          if(res.data)
          {
          
           setcontacts(()=>res.data);
          }
         }
         else{
           navigate('/SetAvatar');
         }
       }
      }
      catch(error)
      {
       console.log(error);
      }
         }
fun();
  },[currentuser])
  const HandleCurrentChat=(chat)=>{
    setcurrentChat(chat)
    
  }
   
  return (
    <>
    <Container>
     <div className="container">
    <Contacts contacts={contacts} changechat={HandleCurrentChat}/>
   { currentChat===undefined?
   <Welcome user={currentuser}/>
   :
   <ChatContainer currentChat={currentChat} currentuser={currentuser} socket={socket}/>
   }
     </div>
     <div className="chat-messages"></div>
     <div className="chat-input"></div>
    </Container>
    </>
  )
}
const Container=styled.div`
height:100vh;
width:100vw;
display:flex;
flex-direction:column;
gap:1rem;
justify-content:center;
align-items:center;
background-color:#131324;
.container{
  height:85vh;
  width:85vw;
  background-color:#00000076;
  display:grid;
  grid-template-columns:25% 75%;
  @media screen and(min-width:720px) and(max-width:1080px)
  {
    grid-template-columns:35% 65%;

  }
h1{
  
}

}
`;
export default Chat
import React,{useEffect,useState} from 'react'
import styled from "styled-components";
import Logo from "../assets/logo.svg";
export default function Contacts({contacts,changechat}) {
    const[allcontacts,setallcontacts]=useState([]);
    const[currentuserName,setcurrentuserName]=useState(undefined);
    const[currentuserImg,setcurrentuserImg]=useState(undefined);
    const[currentSelected,setcurrentSelected]=useState(undefined);
    useEffect(()=>{       
            setallcontacts(contacts);
           console.log(allcontacts);         
    },[ localStorage.getItem('chat-app-users')])
    useEffect(()=>{
    const f=async()=>{
        const user= await JSON.parse( localStorage.getItem('chat-app-users'));
        if(user)
        {
            setcurrentuserImg(user.AvatarImg);
            setcurrentuserName(user.UserName);
        }
       
        
    }
    f();
    },[])
    const ChangeCurrentChat=(index,contact)=>{
      setcurrentSelected(index);
      changechat(contact)
    }
  return (
   <>
   {
   currentuserImg && currentuserName ?(
        <Container>
        <div className="brand">
            <img src={Logo} alt="" />
            <h2>TalkSphere</h2>
        </div>
        <div className="current-user">
            <div className="avatar">
            <img src={`data:image/svg+xml;base64,${currentuserImg}`} alt="avatar" />

            </div>
            <div className="username">
              <h2>{currentuserName}</h2>
            </div>
        </div>
        <div className="contacts">
            {
                contacts.map((contact,index)=>{
                   
                    return(
                        <div className={`contact ${index===currentSelected?"selected":""}`} key={index} onClick={()=>ChangeCurrentChat(index,contact)}>
                            <div className="avatar">
                                <img src={`data:image/svg+xml;base64,${contact.AvatarImg}`} alt="avatar" />
                            </div>
                            <div className="username">
                                <h3>{contact.UserName}</h3>
                            </div>
                        </div>

                    )
                })

            }
            
        </div>
        
        </Container>
    ):(<h1>hello</h1>)

   }
   </>
  )
}
const Container =styled.div`
display: grid;
grid-template-rows: 10% 15% 75%;
overflow: hidden;
grid-gap:2rem
background-color: #080420;
.brand{
    display:flex;
    align-items:center;
    justify-content:center;
    gap:2rem;
    img{
        height:3.4rem;
    }
    h2{
        color:white;
        text-transformation:uppercase;
    }
}

.contacts {
    display: flex;
    flex-direction: column;
    align-items: center;
    overflow: auto;
    gap: 0.8rem;
    margin-top:1.2rem;
    &::-webkit-scrollbar {
      width: 0.2rem;
      &-thumb {
        background-color: #ffffff39;
        width: 0.1rem;
        border-radius: 1rem;
      }
    }
    .contact {
      background-color: #ffffff34;
      min-height: 5rem;
      cursor: pointer;
      width: 90%;
      border-radius: 0.2rem;
      padding: 0.4rem;
      display: flex;
      gap: 3rem;
      align-items: center;
      justify-content:flex-start;
      transition: 0.5s ease-in-out;
      .avatar {
        img {
          height: 3.6rem;
        }
      }
      .username {
        text-transform:Capitalize;
        h3 {
          color: white;
        }
      }
    }
    .selected {
      background-color: #9a86f3;
    }
  }

  .current-user {
    background-color: #0d0d30;
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 2rem;
    .avatar {
      img {
        height: 4rem;
        max-inline-size: 100%;
      }
    }
    .username {
        text-transform:Capitalize;
      h2 {
        color: white;
      }
    }
    @media screen and (min-width: 720px) and (max-width: 1080px) {
      gap: 0.5rem;
      .username {
        h2 {
          font-size: 1rem;
        }
      }
    }
  }`;
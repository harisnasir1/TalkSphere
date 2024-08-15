import React,{useEffect,useState,useRef} from 'react'
import styled from 'styled-components'
import Picker from 'emoji-picker-react'
import {IoMdSend} from 'react-icons/io'
import {BsEmojiSmileFill} from 'react-icons/bs'
import { useNavigate } from 'react-router-dom'

const Input = ({handlesendmessage}) => {
    const navigate=useNavigate();
     const[ShowEmojis,SetShowEmojis]=useState(false);
     const emojiPickerRef = useRef(null);
     const[msg,setmsg]=useState("");
     //emojis Functionality 
     const Emoji_toggler=()=>{
        SetShowEmojis(!ShowEmojis);
     }
     const Emoji_click=(emoji,e)=>{
      let message=msg;
     message+=emoji.emoji;
     setmsg(message);
     }
     useEffect(() => {
      const handleClickOutside = (event) => {
        if (emojiPickerRef.current && !emojiPickerRef.current.contains(event.target)) {
         SetShowEmojis(false);
        }
      };
  
      document.addEventListener('click', handleClickOutside);
  
      return () => {
        document.removeEventListener('click', handleClickOutside);
      };
    }, []);
   //send functionality
   const sendChat=(event)=>{

    event.preventDefault();
    if(msg.length>0){
      handlesendmessage(msg);
      setmsg('');
    }
   }
      return (
     <Container>
      <div className="button-container">
          <div className="emoji" ref={emojiPickerRef}>
              <BsEmojiSmileFill onClick={Emoji_toggler}/>
              {
                ShowEmojis&& <Picker theme='dark' onEmojiClick={Emoji_click}

                />
              }
          </div>
      </div>
      <form className='input-container' onSubmit={(e)=>sendChat(e)}>
        <input type="text" placeholder='Type your message' value={msg} onChange={(e)=>setmsg(e.target.value)} />
        <button className='submit'>
            <IoMdSend/>
        </button>
      </form>
     </Container>
    )
  }
  const Container=styled.div`
  display: grid;
  align-items: center;
  grid-template-columns: 5% 95%;
  background-color: #080420;
  padding: 0 2rem;
  .button-container{
    display: flex;
    align-items: center;
    color: white;
        gap:1rem;
    .emoji{
        cursor:pointer;
        position:relative;
        svg{
            font-size:1.5rem;
            color:#ffff00c8;
            cursor:pointer;
        }
        .EmojiPickerReact{
          position: absolute;
          top: -450px;
          background-color: #080420;
          searchBackgroundColor:red;
          box-shadow: 0 5px 10px #9a86f3;
          border-color: #9a86f3;
          .emoji-scroll-wrapper::-webkit-scrollbar {
            background-color: #080420;
            width: 5px;
            &-thumb {
              background-color: #9a86f3;
            }
          }
          .emoji-categories {
            button {
              filter: contrast(0);
            }
          }
          .emoji-search {
            background-color:transparent;
            border-color: #9a86f3;
          }
          .emoji-group:before {
            background-color: #080420;
          }
        }
      }
    }
  .input-container{
    width:100%;
    border-radius:2rem;
    display: flex;
    align-items: center;
    gap:2rem;
    background-color:#ffffff34;
    input{
        width: 90%;
        height: 60%;
        background-color: transparent;
        color: white;
        border: none;
        padding-left: 1rem;
        font-size: 1.2rem;
        &::selection {
            background-color: #9a86f3;
          }
          &:focus {
            outline: none;
          }
    }
    button{
        padding:0.3rem 2rem;
        border-radius:2rem;
        display:flex;
        align-items:center;
        justify-content:center;
        background-color:#9a86f3;
        border:none;
        cursor:pointer;
        svg{
            font-size:2rem;
            color:white;
        }
    }
    }
  `;

export default Input
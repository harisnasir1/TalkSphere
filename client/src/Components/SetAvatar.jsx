import React,{useState,useEffect} from 'react';
import styled from "styled-components";
import {useNavigate} from 'react-router-dom';
import {ToastContainer,toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';
import loader from '../assets/loader.gif'
import axios from 'axios'
import { Buffer } from 'buffer';
import {setAvatar, setAvatarRoute} from '../Utils/APIROUTE';
const SetAvatar = () => {
    const avatarapi="https://api.multiavatar.com";
    const navigate=useNavigate();
    const [avatars,setavatars]=useState([]);
    const [isloading,setisloading]=useState(true);
    const[selected,setselectedavatar]=useState(undefined);
    const set_profile_pic=async()=>{
      if(selected===undefined)
      {
         toast("Please Select Avatar first");
      }
      else{
        const user= await JSON.parse( localStorage.getItem('chat-app-users'));
       
        const {data}=await axios.post(`${setAvatarRoute}/${user._id}`,{
          img:avatars[selected],
        });
        if(data.isSet)
        {
          user.isAvatarImgSet=true;
          user.AvatarImg=data.image;
          localStorage.setItem("chat-app-users",JSON.stringify(user));
          navigate('/');
        }
        else{
          toast("Please Select Avatar first");
        }
        
      }

    };
    useEffect(()=>{
      const f=async()=>{
        const user= await JSON.parse( localStorage.getItem('chat-app-users'));
       
        if(!localStorage.getItem("chat-app-users"))
        {
          navigate("/Login");
        }
        else if(user.isAvatarImgSet)
        {
          navigate("/");
        }
      }
      f();
    },[])
      useEffect(() => {
        const  fetchData=async()=> {
          try {
            const data = [];
            for (let i = 0; i < 4; i++) {
              const img = await axios.get(`${avatarapi}/${Math.round(Math.random() * 1000)}.svg?viUsJbQpyr7q43`);
            
              const buffer =new  Buffer(img.data);
              data.push(buffer.toString("base64"));
            }
            setavatars(data);
            setisloading(false);
          } catch (error) {
            
          }
        }
        fetchData();
      }, []);
  return (
   <>
   {
    isloading?<Container>
<img src={loader} alt="loader" className='loader' />
    </Container>
    
    :(   <Container>
      <div className="title-container">
          <h1>Pick an Avatar for your profile</h1>
      </div>
      <div className="avatars">
          {
            avatars.map((avatar,index)=>{
                   return (
                    <div key={index} className={`avatar ${selected===index?"selected":""}`}>
                    <img src={`data:image/svg+xml;base64,${avatar}`} alt="avatar" onClick={()=>setselectedavatar(index)} />
                   </div>
                   )
            })
          }
      </div>
      <button onClick={set_profile_pic} className="submit-btn">
              Set as Profile Picture
            </button>
     </Container>
  )
   }
   <ToastContainer draggable={true} position={'bottom-right'} autoClose={8000} theme='dark' pauseOnHover={false}/>
   </>
  )
}
const Container=styled.div`
display: flex;
justify-content: center;
align-items: center;
flex-direction: column;
gap: 3rem;
background-color: #131324;
height: 100vh;
width: 100vw;

.loader {
  max-inline-size: 100%;
}

.title-container {
  h1 {
    color: white;
  }
}
.avatars {
  display: flex;
  gap: 2rem;

  .avatar {
    border: 0.4rem solid transparent;
    padding: 0.4rem;
    border-radius: 5rem;
    display: flex;
    justify-content: center;
    align-items: center;
    transition: 0.5s ease-in-out;
    img {
      height: 6rem;
      transition: 0.5s ease-in-out;
    }
  }
  .selected {
    border: 0.4rem solid #4e0eff;
  }
}
.submit-btn {
  background-color: #4e0eff;
  color: white;
  padding: 1rem 2rem;
  border: none;
  font-weight: bold;
  cursor: pointer;
  border-radius: 0.4rem;
  font-size: 1rem;
  text-transform: uppercase;
  &:hover {
    background-color: #4e0eff;
  }
}
`;
export default SetAvatar
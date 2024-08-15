import React,{useState,useEffect} from 'react';
import styled from "styled-components";
import {Link,useNavigate} from 'react-router-dom';
import Logo from "../assets/logo.svg";
import {ToastContainer,toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';
import axios from 'axios'
import {RegisterRoute} from '../Utils/APIROUTE';
const Register = () => {
  const navigate=useNavigate();
  const [values,setValue]=useState({
    UserName:"",
    Email:"",
    Password:"",
    ConfirmPassword:""
  })
  useEffect(()=>{
    if(localStorage.getItem("chat-app-users"))
    {
      navigate("/");
    }
  
  },[])
  const handleSubmit=async(event)=>{
     event.preventDefault();
    
    if (handleValidation()){
      const{UserName,Email,Password}=values;
      const {data}= await axios.post(RegisterRoute,{
        UserName,
        Email,
        Password,
      });
      console.log(data);
      if(data.status===false)
      {
        toast(data.msg);
      }
      if(data.status===true)
      {
      localStorage.setItem("chat-app-users",JSON.stringify(data.user));
      navigate("/");
      }
    }

  }
  const handleChange=(event)=>{
   setValue({...values,[event.target.name]:event.target.value})
      }
    
   const handleValidation=()=>{
    const{UserName,Email,Password,ConfirmPassword}=values;
    if(Password!=ConfirmPassword)
    {
      toast.error("password and confirm password should be same!")
      return false;
    }else if(UserName.length<3)
    {
      toast.error("UserName Length Should be greater then 3 Characters!")
      return false;
    }
    else if(Password.length<8)
    {
      toast.error("password should be equal or greater then 8 Characters!")
      return false;
    }
    
    else{
      return true;
    }
   }
  return (
   <>
   <FormContainer>
    <form onSubmit={(event)=>handleSubmit(event)}>
      <div className="brand">
    <img alt='' src={Logo}/>
    <h1>TalkSphere</h1>
    </div>
    <input type="text"  placeholder='UserName' name='UserName' onChange={(e)=>handleChange(e)} required={true} />
    <input type="email"  placeholder='Email' name='Email' onChange={(e)=>handleChange(e)} required={true}/>
    <input type="password" placeholder='Password' name='Password' onChange={(e)=>handleChange(e)}required={true} />
    <input type="Password" placeholder='Confirm Password' name='ConfirmPassword' onChange={(e)=>handleChange(e)}required={true} />
    <button type='submit'>Register</button>
    <span>already have account ? <Link to="/Login">Login</Link></span>
    </form>
   </FormContainer>
   <ToastContainer draggable={true} position={'bottom-right'} autoClose={8000} theme='dark' pauseOnHover={false}/>

   </>
  )
}
const FormContainer=styled.div`
height:100vh;
width:100vw;
display:flex;
flex-direction:column;
justify-content:center;
gap:1rem;
align-items:center;
background-color:#131324;
.brand{
  display:flex;
  alien-items:center;
  justify-content:center;
  align-items:center;
  gap:1rem;
  img{
    height:5rem
  }
  h1{
    color:white;
    text-transform:upercase
  }

}
form{
  display:flex;
  flex-direction:column;
  background-color:#00000076;
  gap:2rem;
  border-radius:2rem;
  padding:3rem 5rem;
  input{
    background-color:transparent;
    padding:1rem;
    border:0.1rem solid #4e0eff;
    border-radius:0.4rem;
    color:white;
    width:100%;
    font-size:1rem;
    &:focus{
      border:#0.1rem solid #007af0;
      outline:none;
    }
  }
  button{
    background-color:#997af0;
    color:white;
    padding:1rem 2rem;
    border:none;
    font-weight:bold;
    cursor:pointer;
    border-radius:0.4rem;
    font-size:1rem;
    text-transform:uppercase;
    &:hover{
      background-color:#4e0eff;
    }
  }
  span{
    color:white;
    text-transform:uppercase;
    a{
      color:#4e0ef;
      text-decoration:none;
      font-weight:bold;
    }
  }
}
`;

export default Register
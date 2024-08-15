import React from 'react'
import styled from 'styled-components'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import {BiPowerOff} from 'react-icons/bi'
const LogOut = () => {
    const navigate=useNavigate();
    const handleClick=async()=>{
      localStorage.clear();
      navigate("/Login");
    }
  return (
   <Button>
    <BiPowerOff onClick={handleClick}/>
   </Button>
  )
}
const Button=styled.div`
display:flex;
justify-content:space-between;
align-items:center;
padding: 0.5rem;
border-radius:0.5rem;
background-color:#9a86f3;
boder:none;
cursor:pointer;
svg{
    font-size:1.3rem;
    color:#ebe7ff;
}
`;
export default LogOut
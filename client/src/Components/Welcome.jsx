import React,{useEffect} from 'react'
import styled from 'styled-components'
import Robot from '../assets/robot.gif'
const Welcome = ({user}) => {

  return (
   <>
   <Container>
    <img src={Robot} alt="" />
    <h1>
        Welocme, <span>   {user.UserName}</span>
    </h1>
    <h2>please Select the chat to begin!</h2>
   </Container>
   </>
  )
}
const Container=styled.div`
display:flex;
align-items:center;
justify-content:center;
flex-direction:column;
color:white;
gap:0.7rem;
img{
    height:20rem;
}
span{
    color:#4e0eff
}


`;
export default Welcome
import React from 'react'
import Register from "./Pages/Register"
import Login from './Pages/Login'
import Chat from './Pages/Chat'
import SetAvatar from './Components/SetAvatar'
import {BrowserRouter,Routes,Route} from "react-router-dom"
const App = () => {
  return (
  <BrowserRouter>
  <Routes>
    <Route path='/Register' element={<Register/>} />
    <Route path='/Login' element={<Login/>} />
    <Route path='/SetAvatar' element={<SetAvatar/>} />
    <Route path='/' element={<Chat/>} />

  </Routes>
  </BrowserRouter>
  )
}

export default App
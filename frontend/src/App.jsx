import React from 'react'
import { Button } from "@/components/ui/button"
import Navbar from './components/shared/Navbar'
import { BrowserRouter,Route,Routes } from 'react-router-dom'
import Login from './components/auth/Login'
import Signup from './components/auth/Signup'
import Home from './components/Home'
import { Toaster } from "react-hot-toast";
import Jobs from './components/Jobs';
import Browse from './components/Browse'
import Profile from './components/Profile'
const App = () => {
  return (
    <BrowserRouter>
     <Toaster position="top-right" />
      <Routes>
        <Route path='/' element={<Home/>} />
        <Route path='/login' element={<Login/>}/>
        <Route path='/signup' element={<Signup/>}/>
        <Route path='/jobs' element={<Jobs/>}/>
        <Route path='/browse' element={<Browse/>}/>
        <Route path='/profile' element={<Profile/>}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App

import React, { useEffect, useState } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import Login from './pages/Login'
import axios from 'axios'
import ProtectedRoute from './Components/ProtectedRoute'
import Navbar from './Components/Navbar'
import Builder from './pages/Builder'
import Billing from './pages/Billing'
import { Toaster } from "react-hot-toast"
export const ServerUrl = "http://localhost:8000"
export const CLIENT_URL = "http://localhost:5173"
function App() {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)


  useEffect(() => {

    const fetchMe = async () => {
      try {
        const res = await axios.get(ServerUrl + "/api/user/current-user", { withCredentials: true })
        setUser(res.data)
        setLoading(false)
      } catch (error) {
        console.log(error)
        setLoading(false)
      }
    }
    fetchMe()

  }, [])

  useEffect(() => {
    if (user && user._id) {
      let script = document.getElementById('shifra-assistant-script');
      if (!script) {
        script = document.createElement('script');
        script.id = 'shifra-assistant-script';
        script.src = `${CLIENT_URL}/assistant.js`;
        script.setAttribute('data-user-id', user._id);
        document.body.appendChild(script);
      }
      return () => {
        const existingScript = document.getElementById('shifra-assistant-script');
        if (existingScript) {
          existingScript.remove();
        }
        const btn = document.querySelector('.shifra-btn');
        if (btn) btn.remove();
        const popup = document.querySelector('.shifra-popup');
        if (popup) popup.remove();
      };
    }
  }, [user])


  return (
    <>

    <Toaster position='top-right'/>
      <Routes>

        <Route path='/login' element={<Login setUser={setUser}/>} />

        <Route path='/*' element={<ProtectedRoute user={user} loading={loading}>
          <Navbar setUser={setUser} user={user}/>
          <Routes>
            <Route path='/' element={<Home user={user}/>} />
            <Route path='/builder' element={<Builder user={user} setUser={setUser}/>}/>
            <Route path='/billing' element={<Billing user={user} setUser={setUser}/>}/>

            <Route path='*' element={<Navigate to="/" replace/>}/>
          </Routes>


        </ProtectedRoute>} />

      </Routes>

    </>
  )
}

export default App

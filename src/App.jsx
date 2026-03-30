import React from 'react'
import Landing from './pages/Landing'
import Login from './pages/Login'
import Register from './pages/Register'
import Dashboard from './pages/Dashboard'
import Editor from './pages/Editor'
import Settings from './pages/Settings'
import Timeline from './pages/Timeline'
import {Routes, Route} from 'react-router-dom'
import { AuthProvider } from './context/AuthContext'

export default function App(){
  return (
    <AuthProvider>
      <Routes>
      <Route path="/" element={<Landing/>}/>
      <Route path="/register" element={<Register/>}/>
      <Route path="/login" element={<Login/>}/>
      <Route path="/dashboard" element={<Dashboard/>}/>
      <Route path="/editor" element={<Editor/>}/>
      <Route path="/settings" element={<Settings/>}/>
      <Route path="/timeline" element={<Timeline/>}/>
      </Routes>
    </AuthProvider>
  )
}
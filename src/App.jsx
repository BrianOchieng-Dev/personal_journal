
import Landing from './pages/Landing'
import Login from './pages/Login'
import Register from './pages/Register'
import {Routes, Route} from 'react-router-dom'

export default function App(){
  return(
    <>
    <Routes>
      <Route path="/" element={<Landing/>}/>
      <Route path="/register" element={<Register/>}/>
      <Route path="/login" element={<Login/>}/>
      </Routes>
    </>
  )
}
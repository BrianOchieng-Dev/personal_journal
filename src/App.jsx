import React from 'react'
import AppRoute from './routes/AppRoute'
import { AuthProvider } from './context/AuthContext'

export default function App(){
  return (
    <AuthProvider>
      <AppRoute />
    </AuthProvider>
  )
}
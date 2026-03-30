import React from 'react'
import AppRoute from './routes/AppRoute'
import { AuthProvider } from './context/AuthContext'
import { VaultProvider } from './context/VaultContext'

export default function App(){
  return (
    <AuthProvider>
      <VaultProvider>
        <AppRoute />
      </VaultProvider>
    </AuthProvider>
  )
}
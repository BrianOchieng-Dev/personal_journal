import React from 'react'
import Nav from '../components/Navbar'

export default function Dashboard() {
  return (
    <div className="min-h-screen bg-background-light dark:bg-background-dark">
      <Nav />
      <main className="pt-20 px-8">
        <h1 className="text-3xl font-bold text-slate-900 dark:text-white">Your Dashboard</h1>
        <p className="mt-4 text-slate-600 dark:text-slate-400">Welcome back to your private journal.</p>
      </main>
    </div>
  )
}
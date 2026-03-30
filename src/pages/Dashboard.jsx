import React from 'react'
import Nav from '../components/Navbar'
import { Link } from 'react-router-dom'

export default function Dashboard() {
  return (
    <div className="min-h-screen bg-background-light dark:bg-background-dark">
      <Nav />
      <main className="pt-24 px-8 max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-slate-900 dark:text-white">Your Dashboard</h1>
            <p className="mt-2 text-slate-600 dark:text-slate-400">Welcome back to your private journal.</p>
          </div>
          <Link to="/editor" className="flex items-center gap-2 px-6 py-3 bg-primary text-white rounded-xl font-bold hover:scale-105 transition-transform shadow-lg shadow-primary/20">
            <span className="material-symbols-outlined">add_box</span>
            <span>New Entry</span>
          </Link>
        </div>
        
        {/* Placeholder for entries list */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 border-dashed flex flex-col items-center justify-center min-h-[200px] text-slate-400 text-center">
            <span className="material-symbols-outlined text-4xl mb-2">history_edu</span>
            <p>Your entries will appear here.<br/>Click "New Entry" to start writing.</p>
          </div>
        </div>
      </main>
    </div>
  )
}
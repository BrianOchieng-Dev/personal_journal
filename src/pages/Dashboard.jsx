import React from 'react'
import { Link, useNavigate } from 'react-router-dom'

export default function Dashboard() {
  const navigate = useNavigate();

  return (
    <div className="flex h-screen overflow-hidden bg-background-light dark:bg-background-dark text-slate-900 dark:text-slate-100 font-display">
      {/* Sidebar - Consistent with Editor and Settings */}
      <aside className="w-64 border-r border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 flex flex-col shrink-0">
          <div className="p-6">
              <div className="flex items-center gap-2 mb-1">
                  <span className="material-symbols-outlined text-primary text-3xl">menu_book</span>
                  <h1 className="text-xl font-bold tracking-tight">MindVault</h1>
              </div>
              <p className="text-slate-500 dark:text-slate-400 text-xs font-medium uppercase tracking-wider">Dashboard</p>
          </div>
          <nav className="flex-1 px-4 space-y-1">
              <Link 
                  to="/editor"
                  className="w-full flex items-center gap-3 px-3 py-2.5 bg-primary text-white rounded-lg font-medium transition-colors hover:bg-primary/90 mb-6"
              >
                  <span className="material-symbols-outlined">add_box</span>
                  <span>New Entry</span>
              </Link>
              <div className="space-y-1">
                  <Link to="/dashboard" className="w-full flex items-center gap-3 px-3 py-2 bg-slate-50 dark:bg-slate-800 text-primary rounded-lg font-bold transition-colors">
                      <span className="material-symbols-outlined">grid_view</span>
                      <span>Overview</span>
                  </Link>
                  <Link to="/dashboard" className="w-full flex items-center gap-3 px-3 py-2 text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 rounded-lg font-medium transition-colors">
                      <span className="material-symbols-outlined">history</span>
                      <span>Timeline</span>
                  </Link>
                  <Link to="#" className="w-full flex items-center gap-3 px-3 py-2 text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 rounded-lg font-medium transition-colors">
                      <span className="material-symbols-outlined">star</span>
                      <span>Favorites</span>
                  </Link>
              </div>
          </nav>
          <div className="p-4 border-t border-slate-200 dark:border-slate-800">
              <Link to="/settings" className="flex items-center gap-3 px-3 py-2 text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 rounded-lg font-medium transition-colors">
                  <span className="material-symbols-outlined">settings</span>
                  <span>Settings</span>
              </Link>
              <button onClick={() => navigate('/login')} className="w-full flex items-center gap-3 px-3 py-2 text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 rounded-lg font-medium transition-colors mt-1">
                  <span className="material-symbols-outlined text-red-500">logout</span>
                  <span>Logout</span>
              </button>
          </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 overflow-y-auto bg-slate-50/50 dark:bg-background-dark/50">
        <header className="px-8 py-8">
          <h1 className="text-3xl font-black text-slate-900 dark:text-white tracking-tight">Your Dashboard</h1>
          <p className="mt-2 text-slate-600 dark:text-slate-400">Welcome back to your private vault of thoughts.</p>
        </header>

        <section className="px-8 pb-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Action Card */}
            <Link to="/editor" className="group p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex flex-col items-center justify-center min-h-[240px] text-center transition-all hover:shadow-xl hover:shadow-primary/5 hover:-translate-y-1">
              <div className="size-16 rounded-2xl bg-primary/10 text-primary flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <span className="material-symbols-outlined text-3xl">edit_note</span>
              </div>
              <h3 className="font-bold text-lg mb-1">Capture a thought</h3>
              <p className="text-sm text-slate-500">Express yourself in your private space.</p>
            </Link>

            {/* Empty State / placeholder */}
            <div className="p-8 rounded-3xl bg-slate-100/50 dark:bg-slate-900/50 border border-dashed border-slate-300 dark:border-slate-700 flex flex-col items-center justify-center min-h-[240px] text-slate-400 text-center">
              <span className="material-symbols-outlined text-4xl mb-3 opacity-20">history_edu</span>
              <p className="text-sm font-medium">Your entries will appear here.<br/>Start your journey today.</p>
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}
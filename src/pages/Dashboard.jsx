import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { useVault } from '../context/VaultContext'
import { journalService } from '../services/journalService'
import { formatDashboardDate } from '../utils/formatDate'
import Sidebar from '../components/Sidebar'

export default function Dashboard() {
  const { currentUser } = useAuth();
  const { decrypt, isLocked, unlockVault } = useVault();
  const [recentEntries, setRecentEntries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [passphrase, setPassphrase] = useState('');

  useEffect(() => {
    const fetchRecent = async () => {
      if (currentUser) {
        try {
          // Pass decrypt function to automatically decrypt if vault is open
          const data = await journalService.getEntries(currentUser.uid, isLocked ? null : decrypt);
          setRecentEntries(data.slice(0, 3)); 
        } catch (error) {
          console.error("Failed to fetch dashboard entries:", error);
        } finally {
          setLoading(false);
        }
      }
    };
    fetchRecent();
  }, [currentUser, isLocked, decrypt]);

  const handleUnlock = (e) => {
    e.preventDefault();
    if (unlockVault(passphrase)) {
      setPassphrase('');
    }
  };

  return (
    <div className="flex h-screen overflow-hidden bg-background-light dark:bg-background-dark text-slate-900 dark:text-slate-100 font-display">
      {/* Sidebar Component */}
      <Sidebar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />

      {/* Main Content Area */}
      <main className="flex-1 overflow-y-auto bg-slate-50/50 dark:bg-background-dark/50 p-6 lg:p-12 relative">
        <header className="mb-12 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="flex items-center gap-4">
             {/* Mobile Menu Button */}
             <button 
                onClick={() => setIsSidebarOpen(true)}
                className="lg:hidden p-2 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 shadow-sm"
             >
                <span className="material-symbols-outlined">menu</span>
             </button>
             <div>
                <h1 className="text-3xl font-black text-slate-900 dark:text-white tracking-tight">Your Dashboard</h1>
                <p className="text-slate-600 dark:text-slate-400 font-medium tracking-tight">Welcome back, {currentUser?.displayName || 'Journaler'}.</p>
             </div>
          </div>
          
          <Link 
            to="/editor" 
            className="hidden md:flex items-center gap-2 px-6 py-3 bg-primary text-white rounded-2xl font-bold shadow-lg shadow-primary/20 hover:shadow-primary/30 transition-all hover:bg-primary/90 active:scale-95"
          >
            <span className="material-symbols-outlined">edit_note</span>
            <span>New Memory</span>
          </Link>
        </header>

        {isLocked && (
            <div className="mb-12 p-8 bg-primary/5 border border-primary/10 rounded-3xl animate-in fade-in slide-in-from-top-4 duration-500">
                <div className="flex flex-col md:flex-row items-center gap-8">
                    <div className="size-20 rounded-2xl bg-primary text-white flex items-center justify-center shadow-xl shadow-primary/20 shrink-0">
                        <span className="material-symbols-outlined text-4xl">lock</span>
                    </div>
                    <div className="flex-1 text-center md:text-left">
                        <h2 className="text-xl font-bold mb-2">Your MindVault is locked</h2>
                        <p className="text-slate-500 text-sm mb-6 max-w-md">Unlock your vault to read your private memories. Your vault key never leaves your device.</p>
                        <form onSubmit={handleUnlock} className="flex flex-col sm:flex-row gap-3">
                            <input 
                                type="password" 
                                placeholder="Enter Vault Passphrase" 
                                value={passphrase}
                                onChange={(e) => setPassphrase(e.target.value)}
                                className="flex-1 px-5 py-3 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 outline-none focus:ring-2 focus:ring-primary/20 font-bold text-sm"
                            />
                            <button type="submit" className="px-8 py-3 bg-primary text-white font-bold rounded-xl hover:bg-primary/90 transition-all active:scale-95 text-sm uppercase tracking-widest">Unlock</button>
                        </form>
                    </div>
                </div>
            </div>
        )}

        <section>
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-xl font-bold flex items-center gap-2">
              <span className="material-symbols-outlined text-primary">auto_stories</span>
              Recent Memories
            </h2>
            <Link to="/timeline" className="text-sm font-bold text-primary hover:underline group flex items-center gap-1">
                View all 
                <span className="material-symbols-outlined text-sm group-hover:translate-x-1 transition-transform">arrow_forward</span>
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* New Entry Card */}
            <Link to="/editor" className="group p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex flex-col items-center justify-center min-h-[240px] text-center transition-all hover:shadow-xl hover:shadow-primary/5 hover:-translate-y-1">
              <div className="size-16 rounded-2xl bg-primary/10 text-primary flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <span className="material-symbols-outlined text-3xl">edit_note</span>
              </div>
              <h3 className="font-bold text-lg mb-1">Capture a thought</h3>
              <p className="text-sm text-slate-500">Add a new entry to your vault.</p>
            </Link>

            {loading ? (
               [1, 2].map(i => (
                 <div key={i} className="p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 animate-pulse">
                   <div className="h-4 w-1/3 bg-slate-100 dark:bg-slate-800 rounded mb-4"></div>
                   <div className="h-6 w-3/4 bg-slate-100 dark:bg-slate-800 rounded mb-2"></div>
                   <div className="h-4 w-full bg-slate-100 dark:bg-slate-800 rounded"></div>
                 </div>
               ))
            ) : recentEntries.length === 0 ? (
               <div className="p-8 rounded-3xl bg-slate-100/50 dark:bg-slate-900/50 border border-dashed border-slate-300 dark:border-slate-700 flex flex-col items-center justify-center min-h-[240px] text-slate-400 text-center">
                 <span className="material-symbols-outlined text-4xl mb-3 opacity-20">history_edu</span>
                 <p className="text-sm font-medium">No recent entries.<br/>Start writing to see them here.</p>
               </div>
            ) : (
              recentEntries.map(entry => (
                <Link key={entry.id} to={`/editor?id=${entry.id}`} className="p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm transition-all hover:shadow-xl hover:shadow-primary/5 hover:-translate-y-1 group">
                   <header className="flex justify-between items-start mb-6">
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400">
                            {formatDashboardDate(entry.createdAt)}
                        </span>
                        {entry.isEncrypted && (
                            <span className={`material-symbols-outlined text-xs ${isLocked ? 'text-amber-500' : 'text-green-500'}`}>
                                {isLocked ? 'lock' : 'lock_open'}
                            </span>
                        )}
                      </div>
                      <span className="material-symbols-outlined text-slate-300 group-hover:text-primary transition-all group-hover:rotate-45">north_east</span>
                   </header>
                   <h3 className="text-xl font-bold mb-3 group-hover:text-primary transition-colors line-clamp-1">
                        {isLocked && entry.isEncrypted ? "[Encrypted]" : (entry.title || "Untitled")}
                   </h3>
                   <p className="text-slate-500 text-sm leading-relaxed line-clamp-3">
                     {isLocked && entry.isEncrypted ? "••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••" : (entry.content?.replace(/<[^>]*>/g, '') || 'No content...')}
                   </p>
                </Link>
              ))
            )}
          </div>
        </section>
        
        {/* Floating Action Button for Mobile */}
        <Link 
            to="/editor" 
            className="fixed bottom-8 right-8 size-14 bg-primary text-white rounded-full lg:hidden flex items-center justify-center shadow-2xl shadow-primary/40 active:scale-95 transition-all z-30"
        >
            <span className="material-symbols-outlined text-3xl">add</span>
        </Link>
      </main>
    </div>
  )
}
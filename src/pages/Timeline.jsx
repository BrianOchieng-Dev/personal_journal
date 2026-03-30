import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { journalService } from '../services/journalService';
import { formatTimelineDate, formatMonthYear } from '../utils/formatDate';
import Sidebar from '../components/Sidebar';

export default function Timeline() {
  const { currentUser } = useAuth();
  const [entries, setEntries] = useState([]);
  const [filteredEntries, setFilteredEntries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  useEffect(() => {
    const fetchEntries = async () => {
      if (currentUser) {
        try {
          const data = await journalService.getEntries(currentUser.uid);
          setEntries(data);
          setFilteredEntries(data);
        } catch (error) {
          console.error("Failed to fetch timeline entries:", error);
        } finally {
          setLoading(false);
        }
      }
    };
    fetchEntries();
  }, [currentUser]);

  useEffect(() => {
    const filtered = entries.filter(entry => 
      entry.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      entry.content?.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredEntries(filtered);
  }, [searchTerm, entries]);

  // Group entries by month/year for the timeline view
  const groupedEntries = filteredEntries.reduce((groups, entry) => {
    const monthYear = formatMonthYear(entry.createdAt);
    if (!groups[monthYear]) {
      groups[monthYear] = [];
    }
    groups[monthYear].push(entry);
    return groups;
  }, {});

  return (
    <div className="flex h-screen overflow-hidden bg-background-light dark:bg-background-dark text-slate-900 dark:text-slate-100 font-display">
      {/* Sidebar Component */}
      <Sidebar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />

      {/* Main Content Area */}
      <main className="flex-1 overflow-y-auto bg-slate-50/50 dark:bg-background-dark/50 p-6 lg:p-12 relative">
        <header className="mb-12 max-w-4xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8">
            <div className="flex items-center gap-4">
              {/* Mobile Menu Button */}
              <button 
                onClick={() => setIsSidebarOpen(true)}
                className="lg:hidden p-2 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 shadow-sm"
              >
                <span className="material-symbols-outlined">menu</span>
              </button>
              <div>
                <h1 className="text-4xl font-black text-slate-900 dark:text-white tracking-tight">Your Timeline</h1>
                <p className="mt-2 text-slate-600 dark:text-slate-400 font-medium">Revisit your thoughts and memories through time.</p>
              </div>
            </div>
            <div className="relative group min-w-[300px]">
              <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-primary transition-colors">search</span>
              <input 
                type="text" 
                placeholder="Search your memories..." 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-3 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all text-sm font-medium shadow-sm"
              />
            </div>
          </div>
        </header>

        <section className="max-w-4xl mx-auto">
          {loading ? (
            <div className="space-y-12">
              {[1, 2].map(i => (
                <div key={i} className="animate-pulse">
                  <div className="h-6 w-32 bg-slate-200 dark:bg-slate-800 rounded mb-8"></div>
                  <div className="space-y-8 pl-8 border-l-2 border-slate-100 dark:border-slate-800">
                    {[1, 2].map(j => (
                      <div key={j} className="relative">
                        <div className="h-4 w-24 bg-slate-100 dark:bg-slate-800 rounded mb-3"></div>
                        <div className="h-24 w-full bg-white dark:bg-slate-900 rounded-2xl border border-slate-100 dark:border-slate-800"></div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          ) : filteredEntries.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-20 text-center">
              <div className="size-24 rounded-full bg-slate-100 dark:bg-slate-900 flex items-center justify-center mb-6">
                <span className="material-symbols-outlined text-5xl text-slate-300 dark:text-slate-700">history_edu</span>
              </div>
              <h2 className="text-xl font-bold mb-2">No memories found</h2>
              <p className="text-slate-500 dark:text-slate-400 max-w-xs">
                {searchTerm ? `Nothing matches "${searchTerm}". Try a different search term.` : "Your timeline is empty. Start your first journal entry to see it here."}
              </p>
              {searchTerm && (
                <button 
                  onClick={() => setSearchTerm('')}
                  className="mt-6 text-primary font-bold hover:underline"
                >
                  Clear search
                </button>
              )}
            </div>
          ) : (
            <div className="space-y-16">
              {Object.entries(groupedEntries).map(([monthYear, monthEntries]) => (
                <div key={monthYear} className="relative">
                  <h2 className="text-lg font-black text-slate-400 dark:text-slate-600 uppercase tracking-widest mb-8 sticky top-0 py-2 bg-slate-50/50 dark:bg-background-dark/50 backdrop-blur-sm z-10">
                    {monthYear}
                  </h2>
                  
                  <div className="space-y-8 pl-8 border-l-2 border-slate-200 dark:border-slate-800 relative ml-2">
                    {monthEntries.map((entry) => (
                      <div key={entry.id} className="relative group">
                        {/* Timeline Dot */}
                        <div className="absolute -left-[41px] top-4 size-4 rounded-full border-4 border-slate-50 dark:border-background-dark bg-slate-200 dark:bg-slate-700 group-hover:bg-primary group-hover:scale-125 transition-all duration-300 z-10"></div>
                        
                        <div className="flex flex-col md:flex-row gap-4 items-baseline">
                          <span className="text-xs font-bold text-slate-400 dark:text-slate-500 whitespace-nowrap min-w-[80px]">
                            {formatTimelineDate(entry.createdAt)}
                          </span>
                          
                          <Link 
                            to={`/editor?id=${entry.id}`}
                            className="flex-1 p-6 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-sm hover:shadow-xl hover:shadow-primary/5 hover:-translate-y-1 transition-all duration-300 group/card"
                          >
                            <div className="flex justify-between items-start mb-3">
                              <h3 className="text-xl font-bold text-slate-900 dark:text-white group-hover/card:text-primary transition-colors">
                                {entry.title || 'Untitled Entry'}
                              </h3>
                              <span className="material-symbols-outlined text-slate-300 group-hover/card:text-primary opacity-0 group-hover/card:opacity-100 transition-all transform translate-x-2 group-hover/card:translate-x-0">arrow_forward_ios</span>
                            </div>
                            <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed line-clamp-2">
                              {entry.content?.replace(/<[^>]*>/g, '') || 'No content exploration today...'}
                            </p>
                          </Link>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}
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
  );
}

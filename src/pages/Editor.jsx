import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate, Link, useSearchParams } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { journalService } from '../services/journalService';
import { formatEditorDate, formatLastSaved } from '../utils/formatDate';
import Sidebar from '../components/Sidebar';

export default function Editor() {
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const entryId = searchParams.get('id');
    const { currentUser } = useAuth();
    
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [isSaved, setIsSaved] = useState(true);
    const [lastSaved, setLastSaved] = useState('Just now');
    const [isSaving, setIsSaving] = useState(false);
    const [error, setError] = useState(null);
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    const wordCount = content.trim() ? content.trim().split(/\s+/).length : 0;

    // Load entry if entryId exists
    useEffect(() => {
        const loadEntry = async () => {
            if (entryId && currentUser) {
                try {
                    const entry = await journalService.getEntry(entryId);
                    if (entry) {
                        if (entry.userId === currentUser.uid) {
                            setTitle(entry.title || '');
                            setContent(entry.content || '');
                            setIsSaved(true);
                        } else {
                            setError("You don't have permission to view this entry.");
                            navigate('/dashboard');
                        }
                    }
                } catch (error) {
                    console.error("Failed to load entry:", error);
                    setError("Failed to load your memory. Please try again.");
                }
            }
        };
        loadEntry();
    }, [entryId, currentUser, navigate]);

    // Save functionality
    const handleSave = useCallback(async () => {
        if (!currentUser || isSaving) return;
        
        setIsSaving(true);
        setError(null);
        try {
            const entryData = { 
                title: title || 'Untitled Entry', 
                content,
                updatedAt: new Date()
            };
            
            if (entryId) {
                await journalService.updateEntry(entryId, entryData);
            } else {
                const newId = await journalService.createEntry(currentUser.uid, entryData);
                // Update URL without refresh
                navigate(`/editor?id=${newId}`, { replace: true });
            }
            setIsSaved(true);
            setLastSaved(formatLastSaved(new Date()));
        } catch (err) {
            console.error("Save failed:", err);
            setError("Auto-save failed. Check your connection.");
        } finally {
            setIsSaving(false);
        }
    }, [title, content, currentUser, entryId, isSaving, navigate]);

    // Auto-save logic
    useEffect(() => {
        if (!isSaved && !isSaving && currentUser && (title || content)) {
            const timer = setTimeout(() => {
                handleSave();
            }, 1500); // 1.5 seconds delay

            return () => clearTimeout(timer);
        }
    }, [title, content, isSaved, isSaving, currentUser, handleSave]);

    const handleNewEntry = () => {
        if (!isSaved) {
            const confirm = window.confirm("You have unsaved changes. Create new entry anyway?");
            if (!confirm) return;
        }
        navigate('/editor', { replace: true });
        setTitle('');
        setContent('');
        setIsSaved(true);
        setError(null);
    };

    const handleDelete = async () => {
        if (!entryId) return;
        
        const confirmDelete = window.confirm("Are you sure you want to delete this memory forever?");
        if (!confirmDelete) return;

        try {
            await journalService.deleteEntry(entryId);
            navigate('/dashboard');
        } catch (err) {
            console.error("Delete failed:", err);
            alert("Failed to delete entry. Please try again.");
        }
    };

    return (
        <div className="flex h-screen overflow-hidden bg-background-light dark:bg-background-dark text-slate-900 dark:text-slate-100 font-display">
            {/* Sidebar Component */}
            <Sidebar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} onNewEntry={handleNewEntry} />

            {/* Main Editor Section */}
            <main className="flex-1 flex flex-col h-full bg-white dark:bg-background-dark overflow-hidden relative">
                {/* Toolbar / Header */}
                <header className="sticky top-0 z-10 flex flex-col md:flex-row md:items-center justify-between px-4 md:px-8 py-4 bg-white/80 dark:bg-background-dark/80 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 gap-4">
                    <div className="flex items-center gap-2">
                        {/* Mobile Menu Button */}
                        <button 
                            onClick={() => setIsSidebarOpen(true)}
                            className="lg:hidden p-2 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400"
                        >
                            <span className="material-symbols-outlined">menu</span>
                        </button>
                        <div className="flex items-center gap-1 text-slate-600 dark:text-slate-400 overflow-x-auto no-scrollbar pb-1 md:pb-0">
                            <button className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded transition-colors" title="Bold"><span className="material-symbols-outlined text-[20px]">format_bold</span></button>
                            <button className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded transition-colors" title="Italic"><span className="material-symbols-outlined text-[20px]">format_italic</span></button>
                            <div className="w-px h-6 bg-slate-200 dark:bg-slate-700 mx-1"></div>
                            <button className="hidden sm:block p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded transition-colors" title="Heading 1"><span className="material-symbols-outlined text-[20px]">format_h1</span></button>
                            <button className="hidden sm:block p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded transition-colors" title="Heading 2"><span className="material-symbols-outlined text-[20px]">format_h2</span></button>
                            <div className="w-px h-6 bg-slate-200 dark:bg-slate-700 mx-1"></div>
                            <button className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded transition-colors" title="List"><span className="material-symbols-outlined text-[20px]">format_list_bulleted</span></button>
                            <button className="hidden sm:block p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded transition-colors" title="Quote"><span className="material-symbols-outlined text-[20px]">format_quote</span></button>
                            <div className="w-px h-6 bg-slate-200 dark:bg-slate-700 mx-1"></div>
                            <button className="flex items-center gap-2 px-3 py-1.5 hover:bg-slate-100 dark:hover:bg-slate-800 rounded transition-colors whitespace-nowrap">
                                <span className="material-symbols-outlined text-[20px]">calendar_today</span>
                                <span className="text-[10px] font-bold uppercase tracking-widest">{formatEditorDate(new Date())}</span>
                            </button>
                        </div>
                    </div>
                    <div className="flex items-center justify-between md:justify-end gap-4">
                        <div className="flex items-center gap-2 text-slate-400 dark:text-slate-500 text-sm">
                            <span className={`material-symbols-outlined ${isSaving ? 'animate-spin text-primary' : (isSaved ? 'text-green-500' : 'text-amber-500')} text-[18px]`}>
                                {isSaving ? 'sync' : (isSaved ? 'cloud_done' : 'cloud_upload')}
                            </span>
                            <span className="font-bold text-[10px] uppercase tracking-widest">{isSaving ? 'Saving...' : (isSaved ? 'Saved' : 'Unsaved')}</span>
                        </div>
                        <button 
                            onClick={handleSave}
                            disabled={isSaved || isSaving}
                            className={`px-6 py-2.5 rounded-xl font-bold text-xs uppercase tracking-widest transition-all ${isSaved ? 'bg-slate-100 dark:bg-slate-800 text-slate-400 cursor-not-allowed' : 'bg-primary text-white hover:bg-primary/90 shadow-lg shadow-primary/20 active:scale-95'}`}
                        >
                            Publish
                        </button>
                    </div>
                </header>

                <div className="flex-1 overflow-y-auto w-full">
                    <div className="max-w-3xl mx-auto px-6 md:px-8 pt-16 pb-32">
                        {error && (
                            <div className="mb-6 p-4 bg-red-50 border border-red-100 text-red-600 rounded-xl text-sm flex items-center gap-3 animate-in fade-in slide-in-from-top-2">
                                <span className="material-symbols-outlined">error</span>
                                {error}
                            </div>
                        )}
                        <input 
                            className="w-full bg-transparent border-none text-4xl md:text-5xl font-black placeholder:text-slate-200 dark:placeholder:text-slate-800 focus:ring-0 mb-8 outline-none tracking-tight text-slate-900 dark:text-white" 
                            placeholder="Title your entry..." 
                            type="text"
                            value={title}
                            onChange={(e) => { setTitle(e.target.value); setIsSaved(false); }}
                        />
                        <div className="flex items-center gap-3 mb-10 text-slate-400 border-b border-slate-100 dark:border-slate-800 pb-6">
                            <div className="w-10 h-10 rounded-full bg-primary/10 text-primary shrink-0 overflow-hidden flex items-center justify-center">
                               <span className="material-symbols-outlined">person</span>
                            </div>
                            <div>
                                <p className="text-sm font-bold text-slate-900 dark:text-slate-100 leading-none mb-1">{currentUser?.displayName || 'Journaler'}</p>
                                <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Personal thoughts</p>
                            </div>
                        </div>
                        <textarea 
                            className="w-full min-h-[500px] bg-transparent border-none text-lg md:text-xl leading-relaxed placeholder:text-slate-200 dark:placeholder:text-slate-800 focus:ring-0 p-0 resize-none outline-none text-slate-700 dark:text-slate-300" 
                            placeholder="Start writing your thoughts..."
                            value={content}
                            onChange={(e) => { setContent(e.target.value); setIsSaved(false); }}
                        ></textarea>
                    </div>
                </div>

                {/* Footer Stats - Adjusting left padding based on sidebar presence */}
                <footer className="fixed bottom-0 right-0 left-0 lg:left-64 bg-white/95 dark:bg-background-dark/95 border-t border-slate-200 dark:border-slate-800 px-6 md:px-8 py-3 flex items-center justify-between backdrop-blur-sm z-20">
                    <div className="flex items-center gap-4 md:gap-6">
                        <div className="flex items-center gap-2 text-slate-500 dark:text-slate-400 text-[9px] md:text-[10px] font-bold uppercase tracking-widest">
                            <span className="material-symbols-outlined text-[16px]">article</span>
                            <span>{wordCount} <span className="hidden sm:inline">Words</span></span>
                        </div>
                        <div className="flex items-center gap-2 text-slate-500 dark:text-slate-400 text-[9px] md:text-[10px] font-bold uppercase tracking-widest">
                            <span className="material-symbols-outlined text-[16px]">schedule</span>
                            <span>{lastSaved}</span>
                        </div>
                    </div>
                    <div className="flex items-center gap-4 md:gap-6">
                        <button className="flex items-center gap-2 text-slate-400 hover:text-primary transition-colors group">
                            <span className="material-symbols-outlined text-[20px] group-hover:scale-110 transition-transform">share</span>
                            <span className="hidden md:inline text-[10px] font-black uppercase tracking-widest">Share</span>
                        </button>
                        <div className="w-px h-4 bg-slate-200 dark:bg-slate-800"></div>
                        <button className="flex items-center gap-2 text-slate-400 hover:text-red-500 transition-colors group" onClick={handleDelete}>
                            <span className="material-symbols-outlined text-[20px] group-hover:scale-110 transition-transform">delete</span>
                            <span className="hidden md:inline text-[10px] font-black uppercase tracking-widest">Delete</span>
                        </button>
                    </div>
                </footer>
            </main>
        </div>
    );
}

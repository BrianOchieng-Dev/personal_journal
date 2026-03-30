import React, { useState, useEffect, useCallback, useRef } from 'react';
import { useNavigate, Link, useSearchParams } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useVault } from '../hooks/useVault';
import { journalService } from '../services/journalService';
import { formatEditorDate, formatLastSaved } from '../utils/formatDate';
import Sidebar from '../components/Sidebar';

export default function Editor() {
    const { currentUser } = useAuth();
    const { encrypt, decrypt, isLocked } = useVault();
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    const entryId = searchParams.get('id');

    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [isSaving, setIsSaving] = useState(false);
    const [isSaved, setIsSaved] = useState(true);
    const [lastSaved, setLastSaved] = useState(null);
    const [loading, setLoading] = useState(!!entryId);
    const [error, setError] = useState(null);
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    const saveTimeoutRef = useRef(null);

    // Fetch existing entry
    useEffect(() => {
        if (entryId && currentUser) {
            const fetchEntry = async () => {
                try {
                    // Pass decrypt function to automatically decrypt
                    const entry = await journalService.getEntry(entryId, isLocked ? null : decrypt);
                    if (entry) {
                        setTitle(entry.title || '');
                        setContent(entry.content || '');
                        setIsSaved(true);
                        setLastSaved('Synced');
                    }
                } catch (err) {
                    console.error("Fetch failed:", err);
                    setError("Failed to load your memory. It might be encrypted.");
                } finally {
                    setLoading(false);
                }
            };
            fetchEntry();
        } else {
            setLoading(false);
            setTitle('');
            setContent('');
            setIsSaved(true);
            setLastSaved(null);
        }
    }, [entryId, currentUser, isLocked, decrypt]);

    // Handle Auto-save
    const saveEntry = useCallback(async (currentTitle, currentContent) => {
        if (!currentUser) return;
        setIsSaving(true);
        setError(null);

        try {
            const entryData = { title: currentTitle, content: currentContent };
            // Pass encrypt function to service
            if (entryId) {
                await journalService.updateEntry(entryId, entryData, isLocked ? null : encrypt);
            } else {
                const newId = await journalService.createEntry(currentUser.uid, entryData, isLocked ? null : encrypt);
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
    }, [currentUser, entryId, navigate, isLocked, encrypt]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name === 'title') setTitle(value);
        if (name === 'content') setContent(value);
        setIsSaved(false);

        if (saveTimeoutRef.current) clearTimeout(saveTimeoutRef.current);
        saveTimeoutRef.current = setTimeout(() => {
            saveEntry(name === 'title' ? value : title, name === 'content' ? value : content);
        }, 1500);
    };

    const handleNewEntry = () => {
        navigate('/editor');
        setTitle('');
        setContent('');
        setIsSaved(true);
        setLastSaved(null);
    };

    if (loading) return (
        <div className="h-screen flex items-center justify-center bg-background-light dark:bg-background-dark">
            <div className="flex flex-col items-center gap-4">
                <div className="size-12 border-4 border-primary/20 border-t-primary rounded-full animate-spin"></div>
                <p className="text-slate-400 font-bold text-xs uppercase tracking-widest animate-pulse">Opening Vault...</p>
            </div>
        </div>
    );

    return (
        <div className="flex h-screen overflow-hidden bg-background-light dark:bg-background-dark text-slate-900 dark:text-slate-100 font-display">
            <Sidebar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} onNewEntry={handleNewEntry} />

            <main className="flex-1 flex flex-col overflow-hidden relative">
                {/* Editor Header */}
                <header className="px-6 py-4 md:px-12 md:py-6 border-b border-slate-200 dark:border-slate-800 bg-white/80 dark:bg-background-dark/80 backdrop-blur-xl z-20 flex flex-col md:flex-row items-center gap-4">
                    <div className="w-full flex items-center justify-between gap-4">
                        <div className="flex items-center gap-4">
                            <button 
                                onClick={() => setIsSidebarOpen(true)}
                                className="lg:hidden p-2 rounded-xl bg-slate-100 dark:bg-slate-900 text-slate-600 dark:text-slate-400"
                            >
                                <span className="material-symbols-outlined">menu</span>
                            </button>
                            <div className="flex items-center gap-3 text-slate-400 dark:text-slate-500 hover:text-primary transition-colors cursor-default">
                                <span className="material-symbols-outlined text-[20px]">calendar_today</span>
                                <span className="text-[10px] font-bold uppercase tracking-widest">{formatEditorDate(new Date())}</span>
                            </div>
                        </div>
                        <div className="flex items-center gap-2 text-slate-500 dark:text-slate-400 text-[9px] md:text-[10px] font-bold uppercase tracking-widest">
                            <span className="material-symbols-outlined text-[16px]">schedule</span>
                            <span>{lastSaved}</span>
                        </div>
                    </div>
                    <div className="flex items-center gap-4 md:gap-6">
                         {error && <span className="text-red-500 text-[10px] font-bold uppercase animate-pulse">{error}</span>}
                         <div className="flex items-center gap-2 text-slate-400 dark:text-slate-500 text-sm">
                            <span className={`material-symbols-outlined ${isSaving ? 'animate-spin text-primary' : (isSaved ? 'text-green-500' : 'text-amber-500')} text-[18px]`}>
                                {isSaving ? 'sync' : (isSaved ? 'cloud_done' : 'cloud_upload')}
                            </span>
                            <span className="font-bold text-[10px] uppercase tracking-widest">{isSaving ? 'Saving...' : (isSaved ? 'Saved' : 'Unsaved')}</span>
                         </div>
                         <div className="w-px h-6 bg-slate-200 dark:bg-slate-700 hidden md:block"></div>
                         <div className="flex items-center gap-2">
                            <span className={`material-symbols-outlined text-[20px] ${isLocked ? 'text-amber-500' : 'text-green-500'}`}>
                                {isLocked ? 'lock' : 'lock_open'}
                            </span>
                            <span className="hidden md:inline font-bold text-[10px] uppercase tracking-widest">{isLocked ? 'Encrypted' : 'Key Active'}</span>
                         </div>
                    </div>
                </header>

                {/* Toolbar */}
                <div className="px-6 py-3 md:px-12 border-b border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/50 flex items-center gap-1 overflow-x-auto no-scrollbar">
                    <div className="flex items-center gap-1 bg-white dark:bg-slate-900 p-1 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm">
                        <button className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded transition-colors" title="Bold"><span className="material-symbols-outlined text-[20px]">format_bold</span></button>
                        <button className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded transition-colors" title="Italic"><span className="material-symbols-outlined text-[20px]">format_italic</span></button>
                        <div className="w-px h-6 bg-slate-200 dark:bg-slate-700 mx-1"></div>
                        <button className="hidden sm:block p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded transition-colors" title="Heading 1"><span className="material-symbols-outlined text-[20px]">format_h1</span></button>
                        <button className="hidden sm:block p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded transition-colors" title="Heading 2"><span className="material-symbols-outlined text-[20px]">format_h2</span></button>
                        <div className="w-px h-6 bg-slate-200 dark:bg-slate-700 mx-1"></div>
                        <button className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded transition-colors" title="List"><span className="material-symbols-outlined text-[20px]">format_list_bulleted</span></button>
                        <button className="hidden sm:block p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded transition-colors" title="Quote"><span className="material-symbols-outlined text-[20px]">format_quote</span></button>
                    </div>
                </div>

                {/* Content Area */}
                <div className="flex-1 overflow-y-auto p-6 md:p-12 lg:p-20">
                    <div className="max-w-4xl mx-auto space-y-8 h-full flex flex-col">
                        <textarea
                            name="title"
                            value={title}
                            onChange={handleChange}
                            placeholder="A title for this memory..."
                            className="w-full bg-transparent text-3xl md:text-5xl font-black outline-none placeholder:opacity-20 resize-none overflow-hidden"
                            rows={1}
                            onInput={(e) => {
                                e.target.style.height = 'auto';
                                e.target.style.height = e.target.scrollHeight + 'px';
                            }}
                        />
                        <textarea
                            name="content"
                            value={content}
                            onChange={handleChange}
                            placeholder="What's floating in your head today?"
                            className="w-full flex-1 bg-transparent text-lg md:text-xl leading-relaxed outline-none placeholder:opacity-20 resize-none font-medium"
                        />
                    </div>
                </div>
            </main>
        </div>
    );
}

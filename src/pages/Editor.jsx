import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Nav from '../components/Navbar';

export default function Editor() {
    const navigate = useNavigate();
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [isSaved, setIsSaved] = useState(true);
    const [lastSaved, setLastSaved] = useState('Just now');

    const wordCount = content.trim() ? content.trim().split(/\s+/).length : 0;

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsSaved(true);
            setLastSaved('Just now');
        }, 2000);

        return () => clearTimeout(timer);
    }, [content, title]);

    return (
        <div className="flex h-screen overflow-hidden bg-background-light dark:bg-background-dark text-slate-900 dark:text-slate-100 font-display">
            {/* Sidebar - Reusing styles from code.html */}
            <aside className="w-64 border-r border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 flex flex-col shrink-0">
                <div className="p-6">
                    <div className="flex items-center gap-2 mb-1">
                        <span className="material-symbols-outlined text-primary text-3xl">menu_book</span>
                        <h1 className="text-xl font-bold tracking-tight">MindVault</h1>
                    </div>
                    <p className="text-slate-500 dark:text-slate-400 text-xs font-medium uppercase tracking-wider">Personal Journal</p>
                </div>
                <nav className="flex-1 px-4 space-y-1">
                    <button 
                        onClick={() => { setTitle(''); setContent(''); setIsSaved(true); }}
                        className="w-full flex items-center gap-3 px-3 py-2.5 bg-primary text-white rounded-lg font-medium transition-colors hover:bg-primary/90 mb-6"
                    >
                        <span className="material-symbols-outlined">add_box</span>
                        <span>New Entry</span>
                    </button>
                    <div className="space-y-1">
                        <button onClick={() => navigate('/dashboard')} className="w-full flex items-center gap-3 px-3 py-2 text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 rounded-lg font-medium transition-colors">
                            <span className="material-symbols-outlined">history</span>
                            <span>Journal Timeline</span>
                        </button>
                        <a className="flex items-center gap-3 px-3 py-2 text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 rounded-lg font-medium transition-colors" href="#">
                            <span className="material-symbols-outlined">star</span>
                            <span>Favorites</span>
                        </a>
                        <a className="flex items-center gap-3 px-3 py-2 text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 rounded-lg font-medium transition-colors" href="#">
                            <span className="material-symbols-outlined">lock</span>
                            <span>Private Entries</span>
                        </a>
                    </div>
                </nav>
                <div className="p-4 border-t border-slate-200 dark:border-slate-800">
                    <a className="flex items-center gap-3 px-3 py-2 text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 rounded-lg font-medium transition-colors" href="#">
                        <span className="material-symbols-outlined">settings</span>
                        <span>Settings</span>
                    </a>
                    <button onClick={() => navigate('/login')} className="w-full flex items-center gap-3 px-3 py-2 text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 rounded-lg font-medium transition-colors mt-1">
                        <span className="material-symbols-outlined text-red-500">logout</span>
                        <span>Logout</span>
                    </button>
                </div>
            </aside>

            {/* Main Area */}
            <main className="flex-1 flex flex-col h-full bg-white dark:bg-background-dark overflow-y-auto">
                {/* Toolbar */}
                <header className="sticky top-0 z-10 flex items-center justify-between px-8 py-4 bg-white/80 dark:bg-background-dark/80 backdrop-blur-md border-b border-slate-200 dark:border-slate-800">
                    <div className="flex items-center gap-1 text-slate-600 dark:text-slate-400">
                        <button className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded transition-colors" title="Bold">
                            <span className="material-symbols-outlined text-[20px]">format_bold</span>
                        </button>
                        <button className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded transition-colors" title="Italic">
                            <span className="material-symbols-outlined text-[20px]">format_italic</span>
                        </button>
                        <div className="w-px h-6 bg-slate-200 dark:bg-slate-700 mx-1"></div>
                        <button className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded transition-colors" title="Heading 1">
                            <span className="material-symbols-outlined text-[20px]">format_h1</span>
                        </button>
                        <button className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded transition-colors" title="Heading 2">
                            <span className="material-symbols-outlined text-[20px]">format_h2</span>
                        </button>
                        <div className="w-px h-6 bg-slate-200 dark:bg-slate-700 mx-1"></div>
                        <button className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded transition-colors" title="List">
                            <span className="material-symbols-outlined text-[20px]">format_list_bulleted</span>
                        </button>
                        <button className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded transition-colors" title="Quote">
                            <span className="material-symbols-outlined text-[20px]">format_quote</span>
                        </button>
                        <button className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded transition-colors" title="Code">
                            <span className="material-symbols-outlined text-[20px]">code</span>
                        </button>
                        <button className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded transition-colors" title="Highlight">
                            <span className="material-symbols-outlined text-[20px]">ink_highlighter</span>
                        </button>
                        <div className="w-px h-6 bg-slate-200 dark:bg-slate-700 mx-1"></div>
                        <button className="flex items-center gap-2 px-3 py-1.5 hover:bg-slate-100 dark:hover:bg-slate-800 rounded transition-colors" title="Set Date">
                            <span className="material-symbols-outlined text-[20px]">calendar_today</span>
                            <span className="text-xs font-medium">{new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</span>
                        </button>
                    </div>
                    <div className="flex items-center gap-4">
                        <div className="flex items-center gap-2 text-slate-400 dark:text-slate-500 text-sm">
                            <span className={`material-symbols-outlined ${isSaved ? 'text-green-500' : 'text-amber-500'} text-[18px]`}>
                                {isSaved ? 'cloud_done' : 'cloud_upload'}
                            </span>
                            <span>{isSaved ? 'Saved' : 'Saving...'}</span>
                        </div>
                        <button className="px-5 py-2 bg-primary/10 text-primary dark:bg-primary/20 dark:text-primary rounded-lg font-semibold text-sm hover:bg-primary hover:text-white transition-all">
                            Publish
                        </button>
                    </div>
                </header>

                {/* Editor Section */}
                <div className="max-w-3xl mx-auto w-full px-8 pt-16 pb-32">
                    <input 
                        className="w-full bg-transparent border-none text-4xl font-bold placeholder:text-slate-300 dark:placeholder:text-slate-700 focus:ring-0 mb-8 outline-none" 
                        placeholder="Title your entry..." 
                        type="text"
                        value={title}
                        onChange={(e) => { setTitle(e.target.value); setIsSaved(false); }}
                    />
                    <div className="flex items-center gap-3 mb-10 text-slate-400 border-b border-slate-100 dark:border-slate-800 pb-4">
                        <div className="w-10 h-10 rounded-full bg-slate-200 dark:bg-slate-800 shrink-0 overflow-hidden">
                            <img alt="User avatar" className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDNQw1jNLBRAQEoVdI6nxYkMasWHM9tbNa9nAOy9jdQ-ZFm1B5AAEsywUG4sQZvsCjEnjjfuqccZ13ig8KCvkESIwCn-WfiBdPfIWWr-JJYsVV07T7GCkfykYzg0J56VtM0BvDzRzNOiqJnXpLrT_7WvJB1QtPVO4iNN4iL_MjK0tp-UYo3y6DybnKHqEvbws9os0gxQZxiMsYO76WNPCqSh5-uBVs0LmumdMGkEGYIadSgnRUV3V9Sa-M9x3inl_CBewHJAEhP2z_o"/>
                        </div>
                        <div>
                            <p className="text-sm font-medium text-slate-700 dark:text-slate-300">Journaler</p>
                            <p className="text-xs">Drafting in Personal Thoughts</p>
                        </div>
                    </div>
                    <textarea 
                        className="w-full min-h-[500px] bg-transparent border-none text-lg leading-relaxed placeholder:text-slate-300 dark:placeholder:text-slate-700 focus:ring-0 p-0 resize-none outline-none" 
                        placeholder="Start writing your thoughts... let the mind vault open."
                        value={content}
                        onChange={(e) => { setContent(e.target.value); setIsSaved(false); }}
                    ></textarea>
                </div>

                {/* Footer Stats */}
                <footer className="fixed bottom-0 right-0 left-64 bg-white/95 dark:bg-background-dark/95 border-t border-slate-200 dark:border-slate-800 px-8 py-3 flex items-center justify-between backdrop-blur-sm">
                    <div className="flex items-center gap-6">
                        <div className="flex items-center gap-2 text-slate-500 dark:text-slate-400 text-xs font-medium uppercase tracking-widest">
                            <span className="material-symbols-outlined text-[16px]">article</span>
                            <span>{wordCount} Words</span>
                        </div>
                        <div className="flex items-center gap-2 text-slate-500 dark:text-slate-400 text-xs font-medium uppercase tracking-widest">
                            <span className="material-symbols-outlined text-[16px]">schedule</span>
                            <span>Last saved {lastSaved}</span>
                        </div>
                    </div>
                    <div className="flex items-center gap-4">
                        <button className="flex items-center gap-2 text-slate-400 hover:text-primary transition-colors">
                            <span className="material-symbols-outlined text-[20px]">share</span>
                            <span className="text-xs font-bold uppercase tracking-widest">Share</span>
                        </button>
                        <div className="w-px h-4 bg-slate-200 dark:bg-slate-800"></div>
                        <button className="flex items-center gap-2 text-slate-400 hover:text-red-500 transition-colors" onClick={() => {setTitle(''); setContent('');}}>
                            <span className="material-symbols-outlined text-[20px]">delete</span>
                            <span className="text-xs font-bold uppercase tracking-widest">Delete</span>
                        </button>
                    </div>
                </footer>
            </main>
        </div>
    );
}

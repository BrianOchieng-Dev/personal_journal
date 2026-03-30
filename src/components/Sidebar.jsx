import React from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Sidebar({ isOpen, setIsOpen, onNewEntry }) {
    const navigate = useNavigate();
    const location = useLocation();
    const { logout } = useAuth();

    const menuItems = [
        { path: '/dashboard', label: 'Overview', icon: 'grid_view' },
        { path: '/timeline', label: 'Timeline', icon: 'history' },
        { path: '#', label: 'Favorites', icon: 'star' },
    ];

    const handleLogout = async () => {
        try {
            await logout();
            navigate('/login');
        } catch (error) {
            console.error("Logout failed:", error);
        }
    };

    return (
        <>
            {/* Backdrop for mobile */}
            {isOpen && (
                <div 
                    className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-40 lg:hidden transition-opacity"
                    onClick={() => setIsOpen(false)}
                ></div>
            )}

            {/* Sidebar */}
            <aside className={`
                fixed inset-y-0 left-0 z-50 w-64 bg-white dark:bg-slate-900 border-r border-slate-200 dark:border-slate-800 
                transform transition-transform duration-300 ease-in-out lg:relative lg:translate-x-0
                ${isOpen ? 'translate-x-0' : '-translate-x-full'}
                flex flex-col shrink-0
            `}>
                <div className="p-6 flex items-center justify-between">
                    <div className="flex items-center gap-3" onClick={() => navigate('/dashboard')} style={{ cursor: 'pointer' }}>
                        <div className="size-10 rounded-xl bg-primary flex items-center justify-center text-white shadow-lg shadow-primary/20">
                            <span className="material-symbols-outlined text-2xl">menu_book</span>
                        </div>
                        <div>
                            <h1 className="text-xl font-black tracking-tight text-slate-900 dark:text-white">MindVault</h1>
                            <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Personal Journal</p>
                        </div>
                    </div>
                    {/* Close button for mobile */}
                    <button 
                        onClick={() => setIsOpen(false)}
                        className="lg:hidden p-2 text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors"
                    >
                        <span className="material-symbols-outlined">close</span>
                    </button>
                </div>

                <div className="px-4 mb-6">
                    {onNewEntry ? (
                        <button 
                            onClick={() => { onNewEntry(); setIsOpen(false); }}
                            className="w-full flex items-center justify-center gap-3 px-4 py-3 bg-primary text-white rounded-2xl font-bold transition-all hover:bg-primary/90 shadow-lg shadow-primary/20 hover:shadow-primary/30 active:scale-95"
                        >
                            <span className="material-symbols-outlined">add_box</span>
                            <span>New Entry</span>
                        </button>
                    ) : (
                        <Link 
                            to="/editor"
                            onClick={() => setIsOpen(false)}
                            className="w-full flex items-center justify-center gap-3 px-4 py-3 bg-primary text-white rounded-2xl font-bold transition-all hover:bg-primary/90 shadow-lg shadow-primary/20 hover:shadow-primary/30 active:scale-95"
                        >
                            <span className="material-symbols-outlined">add_box</span>
                            <span>New Entry</span>
                        </Link>
                    )}
                </div>

                <nav className="flex-1 px-4 space-y-1.5 overflow-y-auto">
                    <p className="px-4 text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-3 mt-2">Menu</p>
                    {menuItems.map((item) => {
                        const isActive = location.pathname === item.path;
                        return (
                            <Link 
                                key={item.label}
                                to={item.path}
                                onClick={() => setIsOpen(false)}
                                className={`
                                    flex items-center gap-3 px-4 py-3 rounded-xl font-bold transition-all group
                                    ${isActive 
                                        ? 'bg-primary/10 text-primary' 
                                        : 'text-slate-500 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800/50 hover:text-slate-900 dark:hover:text-white'}
                                `}
                            >
                                <span className={`material-symbols-outlined transition-transform group-hover:scale-110 ${isActive ? 'text-primary' : 'text-slate-400'}`}>
                                    {item.icon}
                                </span>
                                <span>{item.label}</span>
                                {isActive && <div className="ml-auto w-1.5 h-1.5 rounded-full bg-primary animate-pulse"></div>}
                            </Link>
                        );
                    })}
                </nav>

                <div className="p-4 border-t border-slate-200 dark:border-slate-800 space-y-1">
                    <Link 
                        to="/settings" 
                        onClick={() => setIsOpen(false)}
                        className={`
                            flex items-center gap-3 px-4 py-3 rounded-xl font-bold transition-all group
                            ${location.pathname === '/settings' 
                                ? 'bg-primary/5 text-primary' 
                                : 'text-slate-500 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800/50'}
                        `}
                    >
                        <span className="material-symbols-outlined text-slate-400 group-hover:rotate-45 transition-transform">settings</span>
                        <span>Settings</span>
                    </Link>
                    <button 
                        onClick={handleLogout}
                        className="w-full flex items-center gap-3 px-4 py-3 text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10 rounded-xl font-bold transition-all group"
                    >
                        <span className="material-symbols-outlined transition-transform group-hover:-translate-x-1">logout</span>
                        <span>Logout</span>
                    </button>
                </div>
            </aside>
        </>
    );
}

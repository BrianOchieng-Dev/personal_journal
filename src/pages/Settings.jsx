import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Settings() {
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState('profile');

    const sections = [
        { id: 'profile', icon: 'person', label: 'Profile' },
        { id: 'security', icon: 'security', label: 'Security' },
        { id: 'preferences', icon: 'settings', label: 'Preferences' }
    ];

    return (
        <div className="flex h-screen bg-background-light dark:bg-background-dark text-slate-900 dark:text-slate-100 font-display">
            {/* Sidebar - Reusing styles from MindVault Design */}
            <aside className="w-64 border-r border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 flex flex-col shrink-0">
                <div className="p-6">
                    <div className="flex items-center gap-2 mb-1">
                        <span className="material-symbols-outlined text-primary text-3xl cursor-pointer" onClick={() => navigate('/dashboard')}>menu_book</span>
                        <h1 className="text-xl font-bold tracking-tight">MindVault</h1>
                    </div>
                    <p className="text-slate-500 dark:text-slate-400 text-xs font-medium uppercase tracking-wider">Settings</p>
                </div>
                <nav className="flex-1 px-4 space-y-1">
                   {sections.map(section => (
                       <button
                           key={section.id}
                           onClick={() => setActiveTab(section.id)}
                           className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-all ${
                               activeTab === section.id 
                               ? 'bg-primary text-white shadow-lg shadow-primary/20' 
                               : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800'
                           }`}
                       >
                           <span className="material-symbols-outlined">{section.icon}</span>
                           <span>{section.label}</span>
                       </button>
                   ))}
                </nav>
                <div className="p-4 border-t border-slate-200 dark:border-slate-800">
                    <button 
                        onClick={() => navigate('/dashboard')}
                        className="w-full flex items-center gap-3 px-4 py-3 text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 rounded-xl font-medium transition-colors"
                    >
                        <span className="material-symbols-outlined">arrow_back</span>
                        <span>Back to Dashboard</span>
                    </button>
                </div>
            </aside>

            {/* Main Content Area */}
            <main className="flex-1 p-12 overflow-y-auto">
                <div className="max-w-3xl mx-auto">
                    <header className="mb-12">
                        <h2 className="text-4xl font-black tracking-tight mb-2 capitalize">{activeTab}</h2>
                        <p className="text-slate-500 dark:text-slate-400">Manage your private journaling experience.</p>
                    </header>

                    {activeTab === 'profile' && (
                        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
                            <div className="flex items-center gap-6 p-8 bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm transition-all hover:shadow-md">
                                <div className="size-24 rounded-full bg-primary/10 flex items-center justify-center text-primary relative group">
                                    <span className="material-symbols-outlined text-4xl">person</span>
                                    <button className="absolute inset-0 bg-black/40 rounded-full opacity-0 group-hover:opacity-100 flex items-center justify-center text-white transition-opacity">
                                        <span className="material-symbols-outlined">edit</span>
                                    </button>
                                </div>
                                <div className="space-y-1">
                                    <h3 className="text-xl font-bold">Journaler</h3>
                                    <p className="text-slate-500 text-sm">Personal Vault Since 2024</p>
                                    <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-green-500/10 text-green-500 text-[10px] font-bold uppercase tracking-wider rounded">Verified Account</span>
                                </div>
                            </div>

                            <form className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label className="text-sm font-bold text-slate-700 dark:text-slate-300">Display Name</label>
                                    <input className="w-full bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 h-14 rounded-2xl px-5 focus:ring-2 focus:ring-primary/20 outline-none transition-all" defaultValue="Journaler" />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-bold text-slate-700 dark:text-slate-300">Email Address</label>
                                    <input className="w-full bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 h-14 rounded-2xl px-5 outline-none text-slate-500 cursor-not-allowed" defaultValue="user@mindvault.com" disabled />
                                </div>
                                <div className="md:col-span-2 pt-4">
                                    <button className="h-14 px-8 bg-primary text-white font-bold rounded-2xl hover:scale-105 transition-transform shadow-lg shadow-primary/20">Save Profile</button>
                                </div>
                            </form>
                        </div>
                    )}

                    {activeTab === 'security' && (
                        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
                            <div className="p-8 bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm">
                                <div className="flex items-center justify-between mb-8">
                                    <div className="flex items-center gap-4">
                                        <div className="size-12 rounded-2xl bg-primary/10 flex items-center justify-center text-primary">
                                            <span className="material-symbols-outlined">lock</span>
                                        </div>
                                        <div>
                                            <h3 className="font-bold">Vault Encryption</h3>
                                            <p className="text-xs text-slate-500">AES-256 military-grade protection</p>
                                        </div>
                                    </div>
                                    <span className="px-3 py-1 bg-primary text-white text-[10px] font-bold uppercase tracking-widest rounded-full">ACTIVE</span>
                                </div>
                                <button className="w-full h-14 border border-slate-200 dark:border-slate-700 rounded-2xl font-bold hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors">Change Vault Password</button>
                            </div>
                            
                            <div className="p-8 bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm">
                                <h3 className="font-bold mb-6">Privacy settings</h3>
                                <div className="space-y-4">
                                    <label className="flex items-center justify-between cursor-pointer group">
                                        <span className="text-sm text-slate-600 dark:text-slate-400 group-hover:text-slate-900 dark:group-hover:text-white transition-colors">Hide content from previews</span>
                                        <input type="checkbox" className="size-5 rounded border-slate-300 text-primary focus:ring-primary" defaultChecked />
                                    </label>
                                    <label className="flex items-center justify-between cursor-pointer group">
                                        <span className="text-sm text-slate-600 dark:text-slate-400 group-hover:text-slate-900 dark:group-hover:text-white transition-colors">Lock app after inactivity</span>
                                        <input type="checkbox" className="size-5 rounded border-slate-300 text-primary focus:ring-primary" />
                                    </label>
                                </div>
                            </div>
                        </div>
                    )}

                    {activeTab === 'preferences' && (
                        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
                            <div className="p-8 bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm">
                                <h3 className="font-bold mb-6">Appearance</h3>
                                <div className="grid grid-cols-2 gap-4">
                                    <button className="flex flex-col items-center gap-3 p-6 rounded-2xl border-2 border-primary bg-primary/5">
                                        <span className="material-symbols-outlined text-primary">light_mode</span>
                                        <span className="text-sm font-bold">Light Mode</span>
                                    </button>
                                    <button className="flex flex-col items-center gap-3 p-6 rounded-2xl border-2 border-transparent hover:border-slate-200 dark:hover:border-slate-700 transition-all">
                                        <span className="material-symbols-outlined text-slate-400">dark_mode</span>
                                        <span className="text-sm font-bold text-slate-500">Dark Mode</span>
                                    </button>
                                </div>
                            </div>

                            <div className="p-8 bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm">
                                <h3 className="font-bold mb-6">Journaling Defaults</h3>
                                <div className="space-y-4">
                                    <div className="flex flex-col gap-2">
                                        <label className="text-xs font-bold uppercase tracking-wider text-slate-500">Default Editor Font</label>
                                        <select className="w-full bg-slate-50 dark:bg-slate-800 h-14 rounded-2xl px-5 border-none focus:ring-2 focus:ring-primary/20 outline-none">
                                            <option>Sans-serif (Standard)</option>
                                            <option>Serif (Classic)</option>
                                            <option>Monospace (Technical)</option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </main>
        </div>
    );
}

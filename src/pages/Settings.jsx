import React, { useState } from 'react';
import Sidebar from '../components/Sidebar';
import { useVault } from '../hooks/useVault';
import { deriveKeyHash } from '../utils/crypto';

export default function Settings() {
    const { vaultKey, isLocked, lockVault } = useVault();
    const [activeTab, setActiveTab] = useState('profile');
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    const sections = [
        { id: 'profile', icon: 'person', label: 'Profile' },
        { id: 'security', icon: 'security', label: 'Security' },
        { id: 'preferences', icon: 'settings', label: 'Preferences' }
    ];

    const vaultFingerprint = vaultKey ? deriveKeyHash(vaultKey).substring(0, 16) + '...' : 'Vault Locked';

    return (
        <div className="flex h-screen overflow-hidden bg-background-light dark:bg-background-dark text-slate-900 dark:text-slate-100 font-display">
            {/* Sidebar Component */}
            <Sidebar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />

            {/* Main Content Area */}
            <main className="flex-1 overflow-y-auto p-6 md:p-12 bg-slate-50/50 dark:bg-background-dark/50">
                <div className="max-w-3xl mx-auto">
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
                                <h2 className="text-4xl font-black tracking-tight mb-2 capitalize text-slate-900 dark:text-white">{activeTab}</h2>
                                <p className="text-slate-500 dark:text-slate-400 font-medium tracking-tight">Manage your private journaling experience.</p>
                            </div>
                        </div>
                    </header>

                    {/* Settings Navigation Tabs */}
                    <div className="flex items-center gap-2 overflow-x-auto no-scrollbar mb-10 pb-2">
                        {sections.map(section => (
                            <button
                                key={section.id}
                                onClick={() => setActiveTab(section.id)}
                                className={`flex items-center gap-2 px-6 py-3 rounded-2xl font-bold whitespace-nowrap transition-all ${
                                    activeTab === section.id 
                                    ? 'bg-primary text-white shadow-lg shadow-primary/20' 
                                    : 'bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:border-primary/50'
                                }`}
                            >
                                <span className="material-symbols-outlined text-[20px]">{section.icon}</span>
                                <span className="text-xs uppercase tracking-widest">{section.label}</span>
                            </button>
                        ))}
                    </div>

                    <div className="space-y-8 h-full">
                        {activeTab === 'profile' && (
                            <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
                                <div className="flex flex-col md:flex-row items-center gap-6 p-8 bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm transition-all hover:shadow-md">
                                    <div className="size-24 rounded-full bg-primary/10 flex items-center justify-center text-primary relative group shrink-0">
                                        <span className="material-symbols-outlined text-4xl">person</span>
                                        <button className="absolute inset-0 bg-black/40 rounded-full opacity-0 group-hover:opacity-100 flex items-center justify-center text-white transition-opacity">
                                            <span className="material-symbols-outlined">edit</span>
                                        </button>
                                    </div>
                                    <div className="text-center md:text-left space-y-1">
                                        <h3 className="text-xl font-bold">Journaler</h3>
                                        <p className="text-slate-500 text-sm">Personal Vault Since 2024</p>
                                        <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-green-500/10 text-green-500 text-[10px] font-bold uppercase tracking-wider rounded">Verified Account</span>
                                    </div>
                                </div>

                                <form className="grid grid-cols-1 md:grid-cols-2 gap-6" onSubmit={e => e.preventDefault()}>
                                    <div className="space-y-2">
                                        <label className="text-xs font-bold uppercase tracking-widest text-slate-500 px-1">Display Name</label>
                                        <input className="w-full bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 h-14 rounded-2xl px-5 focus:ring-2 focus:ring-primary/20 outline-none transition-all font-bold text-sm" defaultValue="Journaler" />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-xs font-bold uppercase tracking-widest text-slate-500 px-1">Email Address</label>
                                        <input className="w-full bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 h-14 rounded-2xl px-5 outline-none text-slate-500 cursor-not-allowed font-bold text-sm" defaultValue="user@mindvault.com" disabled />
                                    </div>
                                    <div className="md:col-span-2 pt-4">
                                        <button className="h-14 w-full md:w-auto px-10 bg-primary text-white font-bold rounded-2xl hover:scale-105 transition-transform shadow-lg shadow-primary/20 uppercase text-xs tracking-widest">Save Changes</button>
                                    </div>
                                </form>
                            </div>
                        )}

                        {activeTab === 'security' && (
                            <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
                                <div className="p-8 bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm relative overflow-hidden">
                                     {/* Background Decor */}
                                    <div className="absolute top-0 right-0 size-32 bg-primary/5 rounded-full -mr-16 -mt-16 blur-2xl"></div>
                                    
                                    <div className="flex items-center justify-between mb-8">
                                        <div className="flex items-center gap-4">
                                            <div className="size-12 rounded-2xl bg-primary/10 flex items-center justify-center text-primary">
                                                <span className="material-symbols-outlined">{isLocked ? 'lock' : 'lock_open'}</span>
                                            </div>
                                            <div>
                                                <h3 className="font-bold">Vault Encryption</h3>
                                                <p className="text-[10px] text-slate-400 uppercase tracking-widest font-black">AES-256 E2EE</p>
                                            </div>
                                        </div>
                                        <span className={`px-3 py-1 ${isLocked ? 'bg-amber-500/10 text-amber-500' : 'bg-green-500/10 text-green-500'} text-[10px] font-bold uppercase tracking-widest rounded-full`}>
                                            {isLocked ? 'LOCKED' : 'ACTIVE'}
                                        </span>
                                    </div>

                                    <div className="space-y-4">
                                        <div className="p-4 bg-slate-50 dark:bg-slate-800/50 rounded-2xl border border-slate-100 dark:border-slate-800">
                                            <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-1">Key Fingerprint</p>
                                            <p className="font-mono text-sm break-all">{vaultFingerprint}</p>
                                        </div>
                                        
                                        {!isLocked ? (
                                            <button 
                                                onClick={lockVault}
                                                className="w-full h-14 bg-amber-500/10 text-amber-600 border border-amber-500/20 rounded-2xl font-bold hover:bg-amber-500/20 transition-all uppercase text-xs tracking-widest flex items-center justify-center gap-2"
                                            >
                                                <span className="material-symbols-outlined text-sm">lock</span>
                                                Lock My Vault
                                            </button>
                                        ) : (
                                            <Link 
                                                to="/dashboard"
                                                className="w-full h-14 bg-primary text-white rounded-2xl font-bold hover:bg-primary/90 transition-all uppercase text-xs tracking-widest flex items-center justify-center gap-2 shadow-lg shadow-primary/20"
                                            >
                                                Unlock on Dashboard
                                            </Link>
                                        )}
                                    </div>
                                </div>
                                
                                <div className="p-8 bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm">
                                    <h3 className="font-bold mb-6 flex items-center gap-2">
                                        <span className="material-symbols-outlined text-primary">visibility_off</span>
                                        Privacy Settings
                                    </h3>
                                    <div className="space-y-6">
                                        <label className="flex items-center justify-between cursor-pointer group">
                                            <div>
                                                <p className="text-sm font-bold group-hover:text-primary transition-colors">Hide content from previews</p>
                                                <p className="text-xs text-slate-500">Mask your journal text on the timeline and dashboard</p>
                                            </div>
                                            <input type="checkbox" className="size-6 rounded-lg border-slate-300 text-primary focus:ring-primary transition-all" defaultChecked />
                                        </label>
                                        <div className="h-px bg-slate-100 dark:bg-slate-800 w-full"></div>
                                        <label className="flex items-center justify-between cursor-pointer group">
                                            <div>
                                                <p className="text-sm font-bold group-hover:text-primary transition-colors">Lock app after inactivity</p>
                                                <p className="text-xs text-slate-500">Require login after 15 minutes of idle time</p>
                                            </div>
                                            <input type="checkbox" className="size-6 rounded-lg border-slate-300 text-primary focus:ring-primary transition-all" />
                                        </label>
                                    </div>
                                </div>
                            </div>
                        )}

                        {activeTab === 'preferences' && (
                            <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
                                <div className="p-8 bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm">
                                    <h3 className="font-bold mb-8">Appearance</h3>
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                        <button className="flex flex-col items-center gap-3 p-8 rounded-3xl border-2 border-primary bg-primary/5 shadow-md shadow-primary/5 group transition-all">
                                            <div className="size-12 rounded-2xl bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-700 flex items-center justify-center text-primary shadow-sm group-hover:scale-110 transition-transform">
                                                <span className="material-symbols-outlined">light_mode</span>
                                            </div>
                                            <span className="text-xs font-black uppercase tracking-widest">Light Mode</span>
                                        </button>
                                        <button className="flex flex-col items-center gap-3 p-8 rounded-3xl border-2 border-transparent bg-slate-50 dark:bg-slate-800/50 hover:border-slate-200 dark:hover:border-slate-700 transition-all opacity-60 group">
                                            <div className="size-12 rounded-2xl bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-700 flex items-center justify-center text-slate-400 shadow-sm group-hover:scale-110 transition-transform">
                                                <span className="material-symbols-outlined">dark_mode</span>
                                            </div>
                                            <span className="text-xs font-black uppercase tracking-widest text-slate-400">Dark Mode</span>
                                        </button>
                                    </div>
                                </div>

                                <div className="p-8 bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm">
                                    <h3 className="font-bold mb-6 flex items-center gap-2">
                                        <span className="material-symbols-outlined text-primary">font_download</span>
                                        Journaling Defaults
                                    </h3>
                                    <div className="space-y-4">
                                        <div className="flex flex-col gap-3">
                                            <label className="text-[10px] font-black uppercase tracking-widest text-slate-500 px-1">Default Editor Font Style</label>
                                            <select className="w-full bg-slate-50 dark:bg-slate-800 h-14 rounded-2xl px-5 border-none focus:ring-2 focus:ring-primary/20 outline-none font-bold text-sm appearance-none cursor-pointer">
                                                <option>Sans-serif (Modern & Clean)</option>
                                                <option>Serif (Classic Storyteller)</option>
                                                <option>Monospace (Zen Focused)</option>
                                            </select>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </main>
        </div>
    );
}

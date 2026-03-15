
import {Link} from 'react-router-dom'
import {useState} from 'react'
export default function Register(){
            const(first, setFirst) = useState("")
            const(email, setEmail) = useState("")
            const(password, setPassword) = useState("")
            const(confirmPassword, setConfirmPassword) = useState("")
 const handleRegister = async(e) => {
    e.PreventDefault()
 }

    return(
        <>
        <section>
    <header class="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 px-6 py-4 md:px-10 lg:px-40 bg-white dark:bg-slate-900/50 backdrop-blur-md sticky top-0 z-50">
            <div class="flex items-center gap-3">
            <div class="flex h-10 w-10 items-center justify-center rounded-xl bg-primary text-white">
            <span class="material-symbols-outlined text-2xl">shield_lock</span>
            </div>
            <h2 className="text-xl font-bold tracking-tight">Mid`</h2>
            </div>
            <div className="flex items-center gap-4">
            <span className="hidden md:inline text-sm text-slate-500 dark:text-slate-400">Already have an account?</span>
            <Link to="/login" class="flex min-w-[84px] cursor-pointer items-center justify-center rounded-lg h-10 px-4 bg-primary/10 text-primary hover:bg-primary/20 transition-colors text-sm font-bold">
                                    Log In
                                </Link>
            </div>
            </header>
        </section>
        <main className="flex flex-1 justify-center py-12 px-6 md:px-10 lg:px-40">
            <div class="w-full max-w-[480px] flex flex-col gap-8">
            <!-- Hero Section -->
            <div class="flex flex-col gap-3">
            <h1 class="text-4xl font-black tracking-tight text-slate-900 dark:text-white">Create your Vault</h1>
            <p class="text-slate-600 dark:text-slate-400 text-lg">Start your private journey with military-grade end-to-end encryption.</p>
            </div>
            <!-- Registration Form -->
                <form class="flex flex-col gap-6" onsubmit="return false;">
                <!-- Full Name -->
                <div class="flex flex-col gap-2">
                <label class="text-sm font-semibold text-slate-700 dark:text-slate-300">Full Name</label>
                <input class="flex w-full rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 h-14 px-4 text-slate-900 dark:text-white placeholder:text-slate-400 focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all outline-none" 
                 value={first} onChange={(e)=> setName(e.target.value)} placeholder="Enter your full name" type="text"/>
                </div>
                <!-- Email Address -->
                <div class="flex flex-col gap-2">
                <label class="text-sm font-semibold text-slate-700 dark:text-slate-300">Email Address</label>
                <input class="flex w-full rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 h-14 px-4 text-slate-900 dark:text-white placeholder:text-slate-400 focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all outline-none" 
                 value={email} onChange={(e)=> setEmail(e.target.value)} placeholder="email@example.com" type="email"/>
                </div>
                <!-- Password -->
                <div class="flex flex-col gap-2">
                <label class="text-sm font-semibold text-slate-700 dark:text-slate-300">Password</label>
                <div class="relative flex items-center">
                <input class="flex w-full rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 h-14 pl-4 pr-12 text-slate-900 dark:text-white placeholder:text-slate-400 focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all outline-none" 
                 value={password} onChange={(e)=> setPassword(e.target.value)} placeholder="Create a strong password" type="password"/>
                <button class="absolute right-4 text-slate-400 hover:text-primary transition-colors" type="button">
                <span class="material-symbols-outlined">visibility</span>
                </button>
                </div>
                <p class="text-xs text-slate-500 mt-1">Must be at least 8 characters with one number.</p>
                </div>
                <!-- Confirm Password -->
                <div class="flex flex-col gap-2">
                <label class="text-sm font-semibold text-slate-700 dark:text-slate-300">Confirm Password</label>
                <div class="relative flex items-center">
                <input class="flex w-full rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 h-14 pl-4 pr-12 text-slate-900 dark:text-white placeholder:text-slate-400 focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all outline-none" 
                value={confirmPassword} onChange={(e)=> setConfirmPassword(e.target.value)}  placeholder="Repeat your password" type="password"/>
                <button class="absolute right-4 text-slate-400 hover:text-primary transition-colors"  onClick={handleRegister}  type="button">
                <span class="material-symbols-outlined">visibility</span>
                </button>
                </div>
                </div>
            </div>
        </main>
        </>
    )
}
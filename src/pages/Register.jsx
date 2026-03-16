
import {useNavigate, Link} from 'react-router-dom'
import {useState} from 'react'
import { registerUser } from '../firebase/auth'
export default function Register(){
             const navigate = useNavigate();
            //const(first, setFirst) = useState("")
            const[email, setEmail] = useState("")
            const[password, setPassword] = useState("")
            //const(confirmPassword, setConfirmPassword) = useState("")
             const[loading, setLoading] = useState(false)
             const[message, setMessage] = useState("")
 
                const handleRegister = async (e) => {
                    e.preventDefault();
                    setLoading(true);
                    setMessage("");

                    try {
                    const userCredential = await registerUser(email, password);
                    setMessage("Account created successfully!");
                    console.log(userCredential); // shows user info in console
                    setEmail("");
                    setPassword("");
                    
                    setTimeout(() => {
                    navigate('/login'); // replace with your login route
                }, 1000);
                    } catch (error) {
                    setMessage(error.message);
                    } finally {
                    setLoading(false)  ;
                    }
                };


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
          
            <div class="flex flex-col gap-3">
            <h1 class="text-4xl font-black tracking-tight text-slate-900 dark:text-white">Create your Vault</h1>
            <p class="text-slate-600 dark:text-slate-400 text-lg">Start your private journey with military-grade end-to-end encryption.</p>
            </div>

            {message && (
                <div className="p-4 rounded-lg bg-primary/10 text-primary text-sm font-medium text-center">
                    {message}
                </div>
            )}
           
                <form className="flex flex-col gap-6" onSubmit={handleRegister}>
               
                {/*<div className="flex flex-col gap-2">
                <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">Full Name</label>
                <input className="flex w-full rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 h-14 px-4 text-slate-900 dark:text-white placeholder:text-slate-400 focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all outline-none" 
                 value={first} onChange={(e)=> setName(e.target.value)} placeholder="Enter your full name" type="text"/>
                </div>*/}
                
                <div className="flex flex-col gap-2">
                <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">Email Address</label>
                <input className="flex w-full rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 h-14 px-4 text-slate-900 dark:text-white placeholder:text-slate-400 focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all outline-none" 
                 value={email} onChange={(e)=> setEmail(e.target.value)} placeholder="email@example.com" type="email" required/>
                </div>
               
                <div className="flex flex-col gap-2">
                <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">Password</label>
                <div className="relative flex items-center">
                <input className="flex w-full rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 h-14 pl-4 pr-12 text-slate-900 dark:text-white placeholder:text-slate-400 focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all outline-none" 
                 value={password} onChange={(e)=> setPassword(e.target.value)} placeholder="Create a strong password" type="password" required/>
                <button className="absolute right-4 text-slate-400 hover:text-primary transition-colors" type="button">
                <span className="material-symbols-outlined">visibility</span>
                </button>
                </div>
                <p className="text-xs text-slate-500 mt-1">Must be at least 8 characters with one number.</p>
                </div>
               
                {/* <div className="flex flex-col gap-2">
                <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">Confirm Password</label>
                <div className="relative flex items-center">
                <input className="flex w-full rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 h-14 pl-4 pr-12 text-slate-900 dark:text-white placeholder:text-slate-400 focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all outline-none" 
                value={confirmPassword} onChange={(e)=> setConfirmPassword(e.target.value)}  placeholder="Repeat your password" type="password"/>
                <button className="absolute right-4 text-slate-400 hover:text-primary transition-colors" type="button">
                <span className="material-symbols-outlined">visibility</span>
                </button>
                </div>
                </div> */}
                
                <button 
                  type="submit"
                  className="mt-2 flex w-full items-center justify-center rounded-lg bg-primary h-14 text-white font-bold hover:bg-primary/90 transition-all disabled:opacity-70 disabled:cursor-not-allowed"  
                  disabled={loading}
                >
                   {loading ? "Creating account..." : "Sign Up"} 
                </button>
        </form>
        </div>
        </main>
        </>
    )
}

import {useNavigate, Link} from 'react-router-dom'
import {useState} from 'react'
import { registerUser } from '../firebase/auth'
import secure from '../assets/img9.jpg'
export default function Register(){
             const navigate = useNavigate();
            //const(first, setFirst) = useState("")
            const[email, setEmail] = useState("")
            const[password, setPassword] = useState("")
            //const(confirmPassword, setConfirmPassword) = useState("")
             const[loading, setLoading] = useState(false)
             const[message, setMessage] = useState("")
             const[isPasswordVisible, setIsPasswordVisible] = useState(false)
 
                const handleRegister = async (e) => {
                    e.preventDefault();
                    setLoading(true);
                    setMessage("");

                    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
                    if (!passwordRegex.test(password)) {
                        setMessage("Password must be at least 8 characters long and include a letter, a number, and a special character.");
                        setLoading(false);
                        return;
                    }

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
                        let errorMessage = "An unexpected error occurred. Please try again.";
                        
                        if (error.code === 'auth/email-already-in-use') {
                            errorMessage = "This email is already registered. Try logging in instead.";
                        } else if (error.code === 'auth/invalid-email') {
                            errorMessage = "Please enter a valid email address.";
                        } else if (error.code === 'auth/weak-password') {
                            errorMessage = "Password is too weak. Must be at least 6 characters.";
                        } else if (error.code === 'auth/network-request-failed') {
                            errorMessage = "Network error. Please check your connection.";
                        } else if (error.message) {
                            errorMessage = error.message; // Fallback to Firebase message if we don't have a custom one
                        }
                        
                        setMessage(errorMessage);
                    } finally {
                    setLoading(false)  ;
                    }
                };


    return(
        <>
        <section>
    <header className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 px-6 py-4 md:px-10 lg:px-40 bg-white dark:bg-slate-900/50 backdrop-blur-md sticky top-0 z-50">
            <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary text-white">
            <span className="material-symbols-outlined text-2xl">shield_lock</span>
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
                 value={password} onChange={(e)=> setPassword(e.target.value)} placeholder="Create a strong password" type={isPasswordVisible ? "text" : "password"} required/>
                <button 
                    className="absolute right-4 text-slate-400 hover:text-primary transition-colors" 
                    type="button" 
                    onClick={() => setIsPasswordVisible(!isPasswordVisible)}
                >
                <span className="material-symbols-outlined">
                    {isPasswordVisible ? "visibility_off" : "visibility"}
                </span>
                </button>
                </div>
                <p className="text-xs text-slate-500 mt-1">Must be at least 8 characters with a letter, number, and special character.</p>
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

                        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-4 border-t border-slate-200 dark:border-slate-800 pt-8">
                <div className="flex items-start gap-3">
                <div className="bg-primary/10 p-2 rounded-lg text-primary">
                <span className="material-symbols-outlined text-xl">encrypted</span>
                </div>
                <div>
                <h4 className="text-sm font-bold text-slate-800 dark:text-slate-200">Zero-Knowledge</h4>
                <p className="text-xs text-slate-500">Only you can access your data. We can't see it even if we wanted to.</p>
                </div>
                </div>
                <div className="flex items-start gap-3">
                <div className="bg-primary/10 p-2 rounded-lg text-primary">
                <span className="material-symbols-outlined text-xl">verified_user</span>
                </div>
                <div>
                <h4 className="text-sm font-bold text-slate-800 dark:text-slate-200">GDPR Compliant</h4>
                <p className="text-xs text-slate-500">Your privacy rights are protected by the world's strictest standards.</p>
                </div>
                </div>
                </div>
                </div>

                <div className="hidden lg:flex flex-1 items-center justify-center ml-20">
                <div className="relative w-full max-w-md aspect-square rounded-3xl bg-gradient-to-br from-primary to-blue-400 overflow-hidden shadow-2xl">
                <div className="absolute inset-0 opacity-20">
                <img className="w-full h-full object-cover" data-alt="Abstract blue cybersecurity digital network patterns" 
                src={secure}/>
                </div>
                <div className="absolute inset-0 flex flex-col items-center justify-center text-white p-12 text-center">
                <span className="material-symbols-outlined text-6xl mb-6">lock_reset</span>
                <h3 className="text-2xl font-bold mb-4">Your Mind, Protected</h3>
                <p className="text-blue-500/80 leading-relaxed">
                                                Join over 50,000 users who trust MindVault for their most personal reflections and ideas. 
                                                Secure. Private. Forever.
                                            </p>
                </div>
                </div>
                </div>
        </main>
        </>
    )
}
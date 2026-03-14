
import {Link} from 'react-router-dom'
export default function Nav(){
    return(
        <>
        <section>
            <header className="fixed top-0 left-0 z-50 w-full border-b border-slate-200/80 dark:border-slate-800/80 bg-background-light/80 dark:bg-background-dark/80 backdrop-blur-md">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                <div className="flex items-center gap-2">
                <div className="flex items-center justify-center size-8 bg-primary rounded-lg text-white">
                <span className="material-symbols-outlined text-xl">auto_stories</span>
                </div>
                <h2 class="text-slate-900 dark:text-white text-lg font-bold tracking-tight">Mid`</h2>
                 </div>
                 <nav class="hidden md:flex flex-1 justify-center gap-8">
                    <a className="text-slate-600 dark:text-slate-300 text-sm font-medium hover:text-primary transition-colors" href="#home">Home</a>
                    <a className="text-slate-600 dark:text-slate-300 text-sm font-medium hover:text-primary transition-colors" href="#features">Features</a>
                    <a className="text-slate-600 dark:text-slate-300 text-sm font-medium hover:text-primary transition-colors" href="#how-it-works">How It Works</a>
                    <a className="text-slate-600 dark:text-slate-300 text-sm font-medium hover:text-primary transition-colors" href="#testimonials">Testimonials</a>
                                        </nav>
                                        <div className="flex items-center  justify-center gap-4">
                    <Link to="/login" className="hidden sm:block text-slate-600 dark:text-slate-300 text-sm font-medium px-4">Log in</Link>
                    <Link to="/journal" className="bg-primary text-white text-sm font-bold  px-6 py-2 rounded-lg hover:opacity-90 transition-opacity">Start Journaling</Link>
                    </div>
                    </div>
                    </div>
            </header>

            </section>
        </>
    )
}
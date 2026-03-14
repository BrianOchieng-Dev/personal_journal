
import Nav from '../components/Navbar'
import avatar1 from '../assets/avatar1.jpg'
import avatar2 from '../assets/avatar2.jpg'
import avatar3 from '../assets/avatar3.jpg'
import HeroImg from '../assets/img12.jpg'
export default function Landing(){
    return(
        <>
        <Nav/>
        <main>
            <section class="relative overflow-hidden pt-16 pb-20 lg:pt-24 lg:pb-32">
<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
<div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
<div className="flex flex-col gap-8">
<div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold uppercase tracking-wider w-fit">
<span className="material-symbols-outlined text-sm  ">verified_user</span>Encrypted &amp; Private</div>
<div className="flex flex-col gap-4">
<h1 className="text-slate-900 dark:text-white text-4xl md:text-5xl lg:text-6xl font-black leading-tight tracking-tight">Your Mind Deserves a <span className="text-primary">Private Space</span>
</h1>
<p className="text-slate-600 dark:text-slate-400 text-lg lg:text-xl font-normal leading-relaxed max-w-xl">Capture your thoughts, track your personal growth, and find clarity in a secure digital sanctuary designed for your mental well-being.</p>
</div>
<div className="flex flex-wrap gap-4">
<button className="bg-primary text-white text-base font-bold h-14 px-8 rounded-xl shadow-lg shadow-primary/20 hover:scale-[1.02] transition-transform">
                                Start Journaling Free
                            </button>
<button className="bg-white dark:bg-slate-800 text-slate-900 dark:text-white border border-slate-200 dark:border-slate-700 text-base font-bold h-14 px-8 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors">
                                View Demo
                            </button>
</div>
<div className="flex items-center gap-4 text-sm text-slate-500">
<div className="flex -space-x-2">
<div 
  className="size-8 rounded-full border-2 border-background-light bg-center bg-cover bg-slate-200" 
  style={{ backgroundImage: `url(${avatar1})` }}
  aria-label="User avatar 1"
></div>

<div 
  className="size-8 rounded-full border-2 border-background-light bg-center bg-cover bg-slate-300" 
  style={{ backgroundImage: `url(${avatar2})` }}
  aria-label="User avatar 2"
></div>

<div 
  className="size-8 rounded-full border-2 border-background-light bg-center bg-cover bg-slate-400" 
  style={{ backgroundImage: `url(${avatar3})` }}
  aria-label="User avatar 3"
></div>
</div>
<span>Joined by 10,000+ mindful journalers</span>
</div>
</div>
<div className="relative">
<div className="absolute -inset-4 bg-primary/5 rounded-3xl blur-2xl"></div>
<div className="relative bg-white dark:bg-slate-900 rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden aspect-[4/3] bg-center bg-cover flex items-center justify-center" 
data-alt="A modern clean digital journal interface illustration" style={{ backgroundImage: `url(${HeroImg})` }}>
<div className="bg-white/90 dark:bg-slate-900/90 backdrop-blur p-8 rounded-xl border border-slate-200 dark:border-slate-700 w-4/5 shadow-xl">
<div className="h-4 w-1/3 bg-primary/20 rounded mb-4"></div>
<div className="h-8 w-2/3 bg-slate-200 dark:bg-slate-700 rounded mb-6"></div>
<div className="space-y-3">
<div className="h-3 w-full bg-slate-100 dark:bg-slate-800 rounded"></div>
<div className="h-3 w-full bg-slate-100 dark:bg-slate-800 rounded"></div>
<div className="h-3 w-4/5 bg-slate-100 dark:bg-slate-800 rounded"></div>
</div>
</div>
</div>
</div>
</div>
</div></section>

{{/*features section*/}}
         <section id="features">
            
         </section>
        </main>
        </>
    )
}
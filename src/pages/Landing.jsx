
//import Feature from '../components/Features'
import Nav from '../components/Navbar'
import HeroImg from '../assets/img10.jpg'
import avatar1 from '../assets/avatar1.jpg'
import avatar2 from '../assets/avatar2.jpg'
import avatar3 from '../assets/avatar3.jpg'
import Feature from '../components/Features'
import HowItWorks from '../components/HowItWorks' 
import HowImg from '../assets/img13.png'
import TestimonialCard from '../components/Testimonials'
const testimonials = [
  {
    id: 1,
    name: "Sarah Jenkins",
    role: "Designer",
    quote: "The encryption gives me peace of mind I couldn't find in other apps.",
    image: "https://i.pravatar.cc/150?u=sarah"
  },
  {
    id: 2,
    name: "Marcus Thorne",
    role: "Software Engineer",
    quote: "Finally, a journal that respects my privacy and helps me track my consistency.",
    image: "https://i.pravatar.cc/150?u=marcus"
  },
   {
    id: 3,
    name: "James Author",
    role: "UI/UX Enthusiast",
    quote: "Its has really helped conquer my subconcious thoughts.",
    image: "https://i.pravatar.cc/150?u=james"
  }
];

export default function Landing(){
    return(
        <>
        <Nav/>
        <main>
            <section id="home" className="relative overflow-hidden pt-16 pb-20 lg:pt-24 lg:pb-32">

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                <div className="flex flex-col gap-8">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold uppercase tracking-wider w-fit">
                <span className="material-symbols-outlined text-sm">verified_user</span>Encrypted &amp; Private</div>
                <div className="flex flex-col gap-4">
                <h1 className="text-slate-900 dark:text-white text-5xl lg:text-6xl font-black leading-tight tracking-tight">Your Mind Deserves a <span className="text-primary">Private Space</span>
                </h1>
                <p className="text-slate-600 dark:text-slate-400 text-lg lg:text-xl font-normal leading-relaxed max-w-xl">Capture your thoughts, track your personal growth, and find clarity in a secure digital sanctuary designed for your mental well-being.</p>
                </div>

                <div className="flex flex-wrap gap-4">
                <button className="bg-primary text-white text-base font-bold h-14 px-8 rounded-xl shadow-lg shadow-primary/20 hover:scale-[1.02] transition-transform">Start Journaling Free</button>
                <button className="bg-white dark:bg-slate-800 text-slate-900 dark:text-white border border-slate-200 dark:border-slate-700 text-base font-bold h-14 px-8 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors">View Demo</button>
                </div>

                <div className="flex items-center gap-4 text-sm text-slate-500">
                <div className="flex -space-x-2">
                <div className="flex -space-x-2">
                    <div className="size-8 rounded-full border-2 border-background-light bg-center bg-cover bg-slate-200" data-alt="User avatar 1" 
                    style={{ backgroundImage: `url(${avatar1})` }} ></div>
                <div className="size-8 rounded-full border-2 border-background-light bg-center bg-cover bg-slate-300" data-alt="User avatar 2" 
                style={{ backgroundImage: `url(${avatar2})` }} ></div>
                <div className="size-8 rounded-full border-2 border-background-light bg-center bg-cover bg-slate-400" data-alt="User avatar 3" 
                style={{ backgroundImage: `url(${avatar3})` }} ></div>
                </div>
                </div>
                <span>Joined by 10,000+ mindful journalers</span>
                </div>
                </div>
                <div className="relative">
                <div className="absolute -inset-4 bg-primary/5 rounded-3xl blur-2xl"></div>
                <div className="relative bg-white dark:bg-slate-900 rounded-2xl shadow-2xl border bg-center bg-cover border-slate-200 dark:border-slate-800 overflow-hidden aspect-4/3 flex items-center justify-center" data-alt="A modern clean digital journal interface illustration" 
                style={{ backgroundImage: `url(${HeroImg})`}} >
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
                </div>
                
            </section>

            {/**Features */}

            <section>
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center max-w-3xl mx-auto mb-16 flex flex-col gap-4">
                <h2 className="text-primary text-sm font-bold uppercase tracking-widest">Core Features</h2>
                <h3 className="text-slate-900 dark:text-white text-4xl font-black tracking-tight">Designed for Your Peace of Mind</h3>
                <p className="text-slate-600 dark:text-slate-400 text-lg">Experience a journaling tool that prioritizes your privacy, productivity, and personal reflection.</p>
                </div>
                 <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                <Feature
                icon="lock"
                title="Private Encryption"
                description="Your thoughts are for your eyes only. We use industry-leading end-to-end encryption to secure every word."/>
                <Feature
                icon="format_size"
                title="Rich Text Writing"
                description="Express yourself fully with advanced formatting. Use bold, italics, lists, and images to bring your stories to life."/>
                <Feature
                icon="schedule"
                title="Timestamped Entries"
                description="Every thought is automatically logged with the exact moment of inspiration, creating a perfect chronological record."/>
                <Feature
                icon="view_timeline"
                title="Organized Timeline"
                description="Visualize your personal growth through a clean, chronological feed that makes browsing past entries effortless."/>
                <Feature
                icon="search"
                title="Fast Search"
                description="Instantly find past reflections with our powerful indexing engine. Search by keyword, date, or sentiment."/>
                <Feature
                icon="insights"
                title="Mood Tracking"
                description="Understand your emotional patterns over time with integrated mood tracking and visual analytics."/>
                </div>
                </div>
            </section>

            {/*How it works*/}

            <section className="py-24" id="how-it-works">

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex flex-col lg:flex-row gap-16 items-center">
                    <div className="w-full lg:w-1/2">
                    <h2 className="text-slate-900 dark:text-white text-4xl font-black mb-8">How It Works</h2>
                    <div className="space-y-0">
                <HowItWorks
                num="1"
                title="Create Account"
                text="Sign up in seconds with email or Google. Your private vault is ready immediately"
                />
                <HowItWorks
                num="2"
                title="Write Entry"
                text="Pour your heart out using our elegant editor. Add photos, tags, and record your current mood."
                />
                <HowItWorks
                num="3"
                title="Reflect &amp; Grow"
                text="Look back at your journey, notice patterns, and gain new perspectives on your life's path."
                />
                    </div>
                    </div>
                    <div className="w-full lg:w-1/2">
                    <div className="rounded-3xl overflow-hidden shadow-2xl bg-slate-900 aspect-square relative" data-alt="A peaceful person using a digital journal in a cozy room" 
                    style={{backgroundImage: `url(${HowImg})`}}>
                    <div className="absolute inset-0 bg-linear-to-t from-slate-900/60 to-transparent"></div>
                    <div className="absolute bottom-8 left-8 right-8 p-6 bg-white/10 backdrop-blur-md rounded-2xl border border-white/20">
                    <p className="text-white font-medium italic">"Journaling with MindVault has helped me process my daily stress and see how much I've grown this year."</p>
                    </div>
                    </div>
                    </div>
                    </div>
                    </div>
            </section>

            {/**Testimonials */}

           <section className="py-24 bg-primary/5" id="testimonials">
           <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
            <h2 className="text-slate-900 dark:text-white text-3xl font-bold">Trusted by Mindful Individuals</h2>
            </div></div>
            <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {testimonials.map((t) => (
                <TestimonialCard key={t.id} {...t} />
                ))}
            </div>
            
            </section>

            {/*reach out*/ }

                <section className="py-24 bg-primary text-white text-center overflow-hidden relative">
                <div className="absolute inset-0 bg-primary opacity-90"></div>
                <div className="absolute top-0 left-0 w-64 h-64 bg-white/10 rounded-full -translate-x-1/2 -translate-y-1/2 blur-3xl"></div>
                <div className="absolute bottom-0 right-0 w-96 h-96 bg-white/10 rounded-full translate-x-1/3 translate-y-1/3 blur-3xl"></div>
                <div className="relative z-10 max-w-4xl mx-auto px-4">
                <h2 className="text-4xl md:text-5xl font-black mb-6">Start your private journal today</h2>
                <p className="text-white/80 text-lg mb-10 max-w-2xl mx-auto">Join thousands of others who have found clarity and peace of mind. Your first 30 days are completely free.</p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <button className="bg-white text-primary text-lg font-bold h-16 px-10 rounded-xl hover:scale-105 transition-transform w-full sm:w-auto">Get Started Free</button>
                <p className="text-sm text-white/60">No credit card required.</p>
                </div>
                </div>
                </section>

                
        </main>

                        <footer className="bg-slate-50 dark:bg-slate-950 border-t border-slate-200 dark:border-slate-900 py-16">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-12">
                <div className="col-span-2 lg:col-span-2 flex flex-col gap-6">
                <div className="flex items-center gap-2">
                <div className="flex items-center justify-center size-8 bg-primary rounded-lg text-white">
                <span className="material-symbols-outlined text-xl">auto_stories</span>
                </div>
                <h2 className="text-slate-900 dark:text-white text-lg font-bold tracking-tight">MindVault</h2>
                </div>
                <p className="text-slate-500 dark:text-slate-400 max-w-xs">
                                        The world's most private digital journal. Designed for reflection, clarity, and growth.
                                    </p>
                <div className="flex gap-4">
                <a className="text-slate-400 hover:text-primary transition-colors" href="#"><span className="material-symbols-outlined">public</span></a>
                <a className="text-slate-400 hover:text-primary transition-colors" href="#"><span className="material-symbols-outlined">share</span></a>
                <a className="text-slate-400 hover:text-primary transition-colors" href="#"><span className="material-symbols-outlined">mail</span></a>
                </div>
                </div>
                <div>
                <h5 className="text-slate-900 dark:text-white font-bold mb-6">Product</h5>
                <ul className="flex flex-col gap-4 text-slate-500 dark:text-slate-400 text-sm">
                <li><a className="hover:text-primary transition-colors" href="#">Features</a></li>
                <li><a className="hover:text-primary transition-colors" href="#">Pricing</a></li>
                <li><a className="hover:text-primary transition-colors" href="#">Security</a></li>
                <li><a className="hover:text-primary transition-colors" href="#">Mobile App</a></li>
                </ul>
                </div>
                <div>
                <h5 className="text-slate-900 dark:text-white font-bold mb-6">Company</h5>
                <ul className="flex flex-col gap-4 text-slate-500 dark:text-slate-400 text-sm">
                <li><a className="hover:text-primary transition-colors" href="#">About Us</a></li>
                <li><a className="hover:text-primary transition-colors" href="#">Blog</a></li>
                <li><a className="hover:text-primary transition-colors" href="#">Careers</a></li>
                <li><a className="hover:text-primary transition-colors" href="#">Press</a></li>
                </ul>
                </div>
                <div>
                <h5 className="text-slate-900 dark:text-white font-bold mb-6">Legal</h5>
                <ul className="flex flex-col gap-4 text-slate-500 dark:text-slate-400 text-sm">
                <li><a className="hover:text-primary transition-colors" href="#">Privacy Policy</a></li>
                <li><a className="hover:text-primary transition-colors" href="#">Terms of Service</a></li>
                <li><a className="hover:text-primary transition-colors" href="#">Cookie Policy</a></li>
                <li><a className="hover:text-primary transition-colors" href="#">Compliance</a></li>
                </ul>
                </div>
                </div>
                <div className="mt-16 pt-8 border-t border-slate-200 dark:border-slate-900 flex flex-col md:flex-row justify-between items-center gap-4 text-slate-400 text-xs">
                <p>© 2024 MindVault Journal. All rights reserved.</p>
                <div className="flex gap-6">
                <button className="flex items-center gap-1 hover:text-slate-600 dark:hover:text-slate-200 transition-colors">
                <span className="material-symbols-outlined text-sm">language</span>
                                        English (US)
                                    </button>
                <button className="flex items-center gap-1 hover:text-slate-600 dark:hover:text-slate-200 transition-colors">
                <span className="material-symbols-outlined text-sm">light_mode</span>
                                        Light Mode
                                    </button>
                </div>
                </div>
                </div>
                </footer>
        </>
    )
}
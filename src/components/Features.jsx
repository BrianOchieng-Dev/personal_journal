
export default function Feature({icon, title, description}){
    return(
       
        <div className="p-8 rounded-2xl border border-slate-200 dark:border-slate-800 bg-background-light/50 dark:bg-background-dark/50 hover:border-primary/30 transition-colors group">
            <div className="size-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary mb-6 group-hover:bg-primary group-hover:text-white transition-colors">
                <span className="material-symbols-outlined">{icon}</span>
            </div>
            <h4 className="text-slate-900 dark:text-white text-xl font-bold mb-3">{title}</h4>
            <p className="text-slate-600 dark:text-slate-400 leading-relaxed">{description}</p>
        </div>
        
    )
}
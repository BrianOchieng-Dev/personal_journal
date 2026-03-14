
export default function HowItWorks({num, title, text}){
    return(
        <>
        <div className="space-y-0">
        <div className="relative pl-12 pb-12">
            <div className="absolute  left-4.5  top-2 bottom-0 w-0.5 bg-slate-200 dark:bg-slate-800"></div>
            <div className="absolute left-0 top-0 size-10 rounded-full bg-primary text-white flex items-center justify-center font-bold z-10 shadow-lg shadow-primary/30">{num}</div>
            <h4 className="text-slate-900 dark:text-white text-xl font-bold mb-2">{title}</h4>
            <p className="text-slate-600 dark:text-slate-400">{text}</p>
        </div>
        </div>
        </>
    )
}
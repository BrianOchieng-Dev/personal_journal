

export default function Register(){
    return(
        <>
        <section>
                        <header class="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 px-6 py-4 md:px-10 lg:px-40 bg-white dark:bg-slate-900/50 backdrop-blur-md sticky top-0 z-50">
            <div class="flex items-center gap-3">
            <div class="flex h-10 w-10 items-center justify-center rounded-xl bg-primary text-white">
            <span class="material-symbols-outlined text-2xl">shield_lock</span>
            </div>
            <h2 class="text-xl font-bold tracking-tight">Mid`</h2>
            </div>
            <div class="flex items-center gap-4">
            <span class="hidden md:inline text-sm text-slate-500 dark:text-slate-400">Already have an account?</span>
            <button class="flex min-w-[84px] cursor-pointer items-center justify-center rounded-lg h-10 px-4 bg-primary/10 text-primary hover:bg-primary/20 transition-colors text-sm font-bold">
                                    Log In
                                </button>
            </div>
            </header>
        </section>
        </>
    )
}
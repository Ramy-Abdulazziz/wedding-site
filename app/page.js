<<<<<<< HEAD
import Header from "@/components/header";
import { cn } from "@/lib/utils";
import ThemeToggle from "@/components/theme-toggle";

export default async function Home() {
    return (
        <>
            <div
                className={cn(
                    "min-h-screen relative bg-[url(/floral-background-4.png)]"
                )}
            >
                <div className={cn('min-h-screen relative bg-gradient-to-b from-slate-100/85 to-zinc-100/75 dark:from-zinc-900/75 dark:to-background/85')}>
                    <div
                        className={cn(
                            "sticky top-0 z-50 w-full h-full flex flex-row bg-background/85 shadow-md dark:shadow-white/25 dark:shadow-xl/50"
                        )}
                    >
                        <div
                            className={cn(
                                "flex w-full justify-end pr-5 pt-2 pb-2"
                            )}
                        >
                            <ThemeToggle />
                        </div>
                    </div>
                    <Header />
                </div>
            </div>
        </>
    );
}
=======
import Header from "@/components/header";
import { cn } from "@/lib/utils";
import ThemeToggle from "@/components/theme-toggle";

export default async function Home() {
    return (
        <>
            <div
                className={cn(
                    "min-h-screen relative bg-[url(/floral-background-4.png)]"
                )}
            >
                <div className={cn('min-h-screen relative bg-gradient-to-b from-slate-100/55 to-zinc-100/75 dark:from-zinc-900/75 dark:to-background/85')}>
                    <div
                        className={cn(
                            "sticky top-0 z-50 w-full h-full flex flex-row bg-background/85 shadow-md dark:shadow-white/25 dark:shadow-xl/50"
                        )}
                    >
                        <div
                            className={cn(
                                "flex w-full justify-end pr-5 pt-2 pb-2"
                            )}
                        >
                            <ThemeToggle />
                        </div>
                    </div>
                    <Header />
                </div>
            </div>
        </>
    );
}
>>>>>>> 4c1936719c21666fde4fffbb8a79d4fa6ef687dd

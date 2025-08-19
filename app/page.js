import Header from "@/components/header";
import { cn } from "@/lib/utils";
import ThemeToggle from "@/components/theme-toggle";

export default async function Home() {
    return (
        <div className={cn("relative isolate min-h-screen")}>
            <div
                className={cn(
                    "absolute min-h-screen inset-0 bg-[url(/floral-background-4.png)] bg-cover bg-center bg-fixed"
                )}
                aria-hidden="true"
            />
            <div
                className={cn(
                    "absolute inset-0 h-full w-full bg-gradient-to-b from-slate-100/85 to-zinc-100/75 dark:from-zinc-900/75 dark:to-background/85"
                )}
                aria-hidden="true"
            />

            <div className={cn("relative z-0")}>
                <div
                    className={cn(
                        "sticky top-0 z-50 w-full h-full flex flex-row bg-background/85 shadow-md dark:shadow-white/25 dark:shadow-xl/50"
                    )}
                >
                    <div
                        className={cn("flex w-full justify-end pr-5 pt-2 pb-2")}
                    >
                        <ThemeToggle />
                    </div>
                </div>
                <Header />
            </div>
        </div>
    );
}

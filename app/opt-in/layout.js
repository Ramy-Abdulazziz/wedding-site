import ThemeToggle from "@/components/theme-toggle";
import { cn } from "@/lib/utils";
export default function OptInLayout({ children }) {
    return (
        <>
            <div
                className={cn(
                    "sticky top-0 z-50 w-full h-full flex flex-row bg-background/85 shadow-md dark:shadow-white/25 dark:shadow-xl/50"
                )}
            >
                <div className={cn("flex w-full justify-end pr-5 pt-2 pb-2")}>
                    <ThemeToggle />
                </div>
            </div>
            <section>{children}</section>
        </>
    );
}

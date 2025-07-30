import Header from "@/components/header";
import { cn } from "@/lib/utils";
import ThemeToggle from "@/components/theme-toggle";
import { redirect } from "next/navigation";
import { createClient } from "@/utils/supabase/server";
import { sleep } from "@/utils/sleep";
export default async function Home() {
    const supabase = await createClient();
    const {
        data: { user },
    } = await supabase.auth.getUser();

    if (user) {
        const { data: guest } = await supabase
            .from("guests")
            .select("id")
            .eq("id", user.id)
            .single();

        if (guest) {
            redirect("/details");
        }
    }
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
            <Header />
        </>
    );
}

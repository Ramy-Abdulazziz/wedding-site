import Header from "@/components/header";
import { cn } from "@/lib/utils";
import * as React from "react";
import ThemeToggle from "@/components/theme-toggle";
import { redirect } from "next/navigation";
import { createClient } from "@/utils/supabase/server";
export default async function Home() {
    
    const supabase = await createClient();
    const {
        data: { session },
    } = await supabase.auth.getSession();

    if (session) {
        redirect("/details");
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

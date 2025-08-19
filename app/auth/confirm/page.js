"use client";

import { cn } from "@/lib/utils";
import ThemeToggle from "@/components/theme-toggle";
import AuthHeader from "@/components/AuthHeader";
import { useEffect } from "react";
import { createClient } from "@/utils/supabase/client";
import { redirect } from "next/navigation";
import { authConfig } from "@/auth.config";

export default function AuthHome() {
    useEffect(() => {
        const redirectToAuthHome = async () => {
            const supabase = createClient();
            const { data: user, error: userError } =
                await supabase.auth.getUser();
            if (user && !userError) {
                redirect(authConfig.authedHomeRoute);
            }
        };

        redirectToAuthHome();
    }, []);
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
            <AuthHeader />
        </>
    );
}

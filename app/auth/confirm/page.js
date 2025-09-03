
import { cn } from "@/lib/utils";
import ThemeToggle from "@/components/theme-toggle";
import AuthHeader from "@/components/AuthHeader";
// import { useEffect } from "react";
// import { createClient } from "@/utils/supabase/client";
// import { redirect } from "next/navigation";
// import { authConfig } from "@/auth.config";



export const metadata = {
  title: "Ramy & Shazia's Wedding 🎉",
  description: "Tap to RSVP and see details about Ramy & Shazia's wedding!",
  openGraph: {
    title: "You're invited to Ramy & Shazia's Wedding 🎉",
    description: "Tap to RSVP and see details about the wedding!",
    url: "https://ramyandshazia.com/auth/confirm",
    images: [
      {
        url: "https://www.ramyandshazia.com/weddingInvite.jpg",
        width: 800,
        height: 600,
      },
    ],
  },
};

export default function AuthHome() {

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

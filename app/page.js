"use client";

import Header from "@/components/header";
import { cn } from "@/lib/utils";
import * as React from "react";
import ThemeToggle from "@/components/theme-toggle";

export default function Home() {
    return (
        <>
            <div
                className={cn(
                    "sticky top-0 z-50 w-full h-full flex flex-row bg-background/85 pt-5"
                )}
            >
                <div
                    className={cn(
                        "flex w-full justify-end pr-5"
                    )}
                >
                    <ThemeToggle />
                </div>
            </div>
            <Header />
        </>
    );
}

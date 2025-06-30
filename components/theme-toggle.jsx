"use client";

import { MoonIcon, SunIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { Switch } from "./ui/switch";
import { useTheme } from "next-themes";
import { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";

const ThemeToggle = () => {
    const { theme, setTheme, resolvedTheme } = useTheme();
    const [isDark, setIsDark] = useState(false);

    useEffect(() => {
        const checkResolved = () => {
            if (resolvedTheme) {
                setIsDark(resolvedTheme === "dark");
            }
        };

        checkResolved();
    }, [resolvedTheme]);

    const toggleTheme = () => {
        setTheme(theme === "dark" ? "light" : "dark");
        setIsDark((currDarkVal) => !currDarkVal);
    };

    return (
        <div className={cn("flex items-center space-x-2")}>
            <Switch checked={isDark} onCheckedChange={toggleTheme} id="theme" />
            <AnimatePresence mode="wait" initial={false}>
                <motion.div
                    key={isDark ? "moon" : "sun"}
                    initial={{ opacity: 0, rotate: -90, scale: 0.8 }}
                    animate={{ opacity: 1, rotate: 0, scale: 1 }}
                    exit={{ opacity: 0, rotate: 90, scale: 0.8 }}
                    transition={{ duration: 0.3 }}
                >
                    {isDark ? (
                        <MoonIcon className="w-5 h-5 text-white" />
                    ) : (
                        <SunIcon className="w-5 h-5 " />
                    )}
                </motion.div>
            </AnimatePresence>{" "}
        </div>
    );
};

export default ThemeToggle;

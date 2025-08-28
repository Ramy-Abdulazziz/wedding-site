"use client";

import { usePathname } from "next/navigation";

const PathNameWrapper = () => {
    const pathName = usePathname();
    const needsFlorals = pathName === "/" || pathName === "/auth/confirm";
    console.log(pathName);
    if (needsFlorals) {
        return (
            <>
                <div
                    className="absolute -z-20 min-h-screen inset-0 bg-[url('/floral-background-4.png')] bg-fixed"
                    aria-hidden="true"
                />
                <div
                    className="absolute -z-10 inset-0 bg-gradient-to-b from-black/40 to-zinc-100/85 dark:from-zinc-900/75 dark:to-background/85"
                    aria-hidden="true"
                />
            </>
        );
    } else {
        return (
            <div className="absolute inset-0 -z-10 h-full w-full bg-gradient-to-b from-slate-100 to-zinc-100 dark:from-zinc-900 dark:to-background" />
        );
    }
};

export default PathNameWrapper;

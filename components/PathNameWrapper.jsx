"use client";

import { usePathname } from "next/navigation";

const PathNameWrapper = () => {
    const pathName = usePathname();
    const needsBackgroundPhoto =
        pathName === "/" || pathName === "/auth/confirm";
    if (needsBackgroundPhoto) {
        return (
            <>
                <div
                    className="fixed inset-0 -z-20 min-h-screen inset-0 bg-[url('/us_real_center.jpeg')] sm:bg-[url('/us_real.jpeg')] md:bg-[url('/us_real.jpeg')] lg:bg-[url('/us_real.jpeg')] xl:bg-[url('/us_real.jpeg')] 2xl:bg-[url('/us_real.jpeg')] bg-cover bg-center  bg-fixed  sm:bg-[position:45%_40%] "
                    aria-hidden="true"
                />
                <div
                    className="absolute -z-10 inset-0 bg-gradient-to-b from-black/40 to-zinc-100/45 dark:from-zinc-900/75 dark:to-background/85"
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

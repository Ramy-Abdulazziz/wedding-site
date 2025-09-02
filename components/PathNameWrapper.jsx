"use client";

import { usePathname } from "next/navigation";
import Image from "next/image";
import backgroundImageLarge from "@/public/us_real.jpeg";
import backgroundImageSmall from "@/public/us_real_center.jpeg";

const PathNameWrapper = () => {
    const pathName = usePathname();
    const needsBackgroundPhoto =
        pathName === "/" || pathName === "/auth/confirm";
    if (needsBackgroundPhoto) {
        return (
            <>
                {/* <div
                    className="fixed inset-0 w-screen h-screen -z-20 bg-cover bg-center bg-[url('/us_real_center.jpeg')] sm:bg-[url('/us_real.jpeg')] sm:bg-[position:45%_40%]"
                    aria-hidden="true"
                /> */}
                <div className="fixed inset-0 w-screen h-screen -z-20">
                    <Image
                        src={backgroundImageLarge}
                        alt="Background image of the couple"
                        fill // Makes the image cover the parent element
                        style={{ objectFit: "cover" }} // Behaves like bg-cover
                        className="hidden sm:block object-center sm:object-[45%_60%]" // Places it in the background
                        quality={80} // Adjust quality for performance
                        priority // Preloads the image since it's LCP (Largest Contentful Paint)
                    />
                    <Image
                        src={backgroundImageSmall}
                        alt="Background image of the couple"
                        fill // Makes the image cover the parent element
                        style={{ objectFit: "cover" }} // Behaves like bg-cover
                        className="-z-20 block sm:hidden object-center sm:object-[45%_40%]" // Places it in the background
                        quality={80} // Adjust quality for performance
                        priority // Preloads the image since it's LCP (Largest Contentful Paint)
                    />
                </div>
                
                <div
                    className="fixed inset-0 w-screen h-screen -z-10 bg-gradient-to-b from-black/40 to-zinc-100/45 dark:from-zinc-900/75 dark:to-background/85 pointer-events-none"
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

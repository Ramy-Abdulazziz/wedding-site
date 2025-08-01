"use client";

import FloatingInvite from "@/components/FloatingInvite";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { Separator } from "@/components/ui/separator";
import TimingDetails from "@/components/timing-details";
import RsvpDetails from "@/components/rsvp-details";
import FaqDetails from "@/components/faq-details";
import { useEffect } from "react";
const textContainer = {
    hidden: { opacity: 0 },
    show: {
        opacity: 1,
        transition: {
            duration: 1,
            staggerChildren: 0.25,
        },
    },
};

const textItem = {
    hidden: { opacity: 0, y: 5 },
    show: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 1,
            ease: "easeOut",
        },
    },
};

export default function DetailsContent() {
    useEffect(() => {
        const hash = window.location.hash;

        if (hash) {
            const timer = setTimeout(() => {
                const element = document.querySelector(hash);
                if (element) {
                    element.scrollIntoView({ behavior: "smooth" });
                }
            }, 100); 

            return () => clearTimeout(timer);
        }
    }, []);

    return (
        <div className={cn("pb-[50vh]")}>
            <section
                className={cn(
                    "relative h-screen flex overflow-hidden justify-center justify-items-center-safe items-center mt-10"
                )}
            >
                <FloatingInvite />
            </section>
            <section className={cn("xl:ml-20")}>
                <motion.div
                    className={cn("container mx-auto pl-5 sm:pl-7 pt-5")}
                    variants={textContainer}
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true }}
                >
                    <TimingDetails />
                </motion.div>
            </section>
            <Separator
                className={cn(
                    "flex justify-self-center max-w-[94%] sm:max-w-[92%] md:max-w-[93%] lg:max-w-[95%] xl:max-w-[84%] 2xl:max-w-[86%]"
                )}
            />
            <section className={cn("xl:ml-20")}>
                <motion.div
                    className={cn("container mx-auto pl-5 sm:pl-7 mb-10 mt-5")}
                    variants={textContainer}
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true }}
                >
                    <RsvpDetails />
                </motion.div>
            </section>
            <Separator
                className={cn(
                    "flex justify-self-center max-w-[94%] sm:max-w-[92%] md:max-w-[93%] lg:max-w-[95%] xl:max-w-[84%] 2xl:max-w-[86%]"
                )}
            />
            <section className={cn("xl:ml-20 ")}>
                <motion.div
                    className={cn(
                        "container mx-auto pl-5 pr-5 sm:pr-0 md:pr-0 lg:pr-0 xl:pr-0 2xl:pr-0sm:pl-7 mb-10 mt-5"
                    )}
                    variants={textContainer}
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true }}
                >
                    <FaqDetails />
                </motion.div>
            </section>
        </div>
    );
}

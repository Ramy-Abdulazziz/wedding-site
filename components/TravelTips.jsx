"use client";

import { textContainer, textItem } from "@/lib/variants";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import Count from "@/components/Count";
import Link from "next/link";
import { Button } from "@/components/ui/button";

const TravelTips = () => {
    return (
        <>
            <motion.p
                id="rsvp"
                className={cn(
                    "text-2xl sm:text-3xl md:text-3xl xl:text-3xl mb-5 scroll-mt-24"
                )}
                variants={textItem}
            >
                Travel Tips
            </motion.p>
            <motion.div
                className={cn(
                    "flex flex-col text-xl gap-5 sm:flex-row gap-15 md:flex-row lg:flex-row xl:flex-row mb-10 mt-2"
                )}
                variants={textItem}
            >
                <div className={cn("text-justify")}>
                    A hotel block has been setup at a local hotel, which can be
                    booked using the link below (group code: ABD). The code
                    garauntees a rate of $140 dollars per night. If you are
                    interested in this option, we suggest you book ASAP as there
                    are a limited amount of rooms available. Additionally we
                    have provided alternate accomadation options of nearby
                    hotels within different price ranges. These however have no
                    block set up.
                </div>
            </motion.div>
        </>
    );
};

export default TravelTips;

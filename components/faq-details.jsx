"use client";


import { textContainer, textItem } from "@/lib/variants";
import { motion } from "framer-motion"
import { cn } from "@/lib/utils";
import Faq from "@/components/Faq";


const FaqDetails = () => {
    return (
        <>
            <motion.p id='faq'
                className={cn(
                    "text-2xl sm:text-3xl md:text-3xl xl:text-3xl mb-5 scroll-mt-24"
                )}
                variants={textItem}
            >
                FAQ
            </motion.p>
            <motion.div
                className={cn(
                    "flex flex-col gap-5 sm:flex-row gap-15 md:flex-row lg:flex-row xl:flex-row mb-10 mt-2"
                )}
                variants={textItem}
            >
                <Faq />
            </motion.div>
        </>
    );
};


export default FaqDetails; 
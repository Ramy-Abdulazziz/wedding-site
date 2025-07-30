"use client";


import ThanksCard from "@/components/thanksCard";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { textContainer } from "@/lib/variants";

const ThanksContent = () => {
    return (
        <div className={cn("")}>
            <section className={cn("mx-auto pb-[5vh]")}>
                <motion.div
                    className={cn("container mx-auto")}
                    variants={textContainer}
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true }}
                >
                    <ThanksCard />
                </motion.div>
            </section>
        </div>
    );
};

export default ThanksContent;

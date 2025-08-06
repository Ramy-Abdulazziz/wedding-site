"use client"

import { cn } from "@/lib/utils";
import OptInForm from "@/components/optInForm";
import { motion } from "framer-motion";
import { textContainer } from "@/lib/variants";

const OptInContent = () => {
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
                    <OptInForm />
                </motion.div>
            </section>
        </div>
    );
};

export default OptInContent;

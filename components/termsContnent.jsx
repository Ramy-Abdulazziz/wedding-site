"use client";

import { cn } from "@/lib/utils";
import TermsConditions from "@/components/termsAndCondtions";
import { motion } from "framer-motion";
import { textContainer } from "@/lib/variants";

const PrivacyContent = () => {
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
                    <TermsConditions />
                </motion.div>
            </section>
        </div>
    );
};

export default PrivacyContent;

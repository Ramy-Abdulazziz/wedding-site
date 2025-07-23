"use client";


import { cn } from "@/lib/utils";
import { motion } from "framer-motion"
import Image from "next/image";

const FloatingInvite = () => {
    return (
        <motion.div
            initial={{ y: 500 }}
            animate={{ y: 0 }}
            transition={{ duration: 2 }}
            className={cn(
                "relative w-[80%] sm:w-[70%] md:w-[50%] lg:w-[40%] xl:w-[30%] max-w-[800px] h-screen mx-auto flex justify-center justify-items-center-safe items-center -mt-35"
            )}
        >
            <Image
                src="/weddingInvite.jpg"
                layout="responsive"
                width={3}
                height={4}
                alt="Picture of wedding invitation"
                className={cn("border-solid shadow-2xl/50 dark:shadow-2xl dark:shadow-white inset-shadow-xs dark:inset-shadow-gray-500")}
            />
        </motion.div>
    );
};

export default FloatingInvite;

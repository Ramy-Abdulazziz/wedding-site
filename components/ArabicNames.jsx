"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { Tajawal } from "next/font/google";
import { Amiri } from "next/font/google";

const tajawal = Tajawal({
    weight: "400",
    subsets: ["arabic"],
});

const amiri = Amiri({
    weight: "400",
    subsets: ["arabic"],
});

const ArabicNames = () => {
    return (
        <motion.div className={cn("flex justify-center")}>
            <h1
                className={cn(
                    "text-6xl mt-8 mb-5 sm:text-8xl sm:mt-15 md:text-[100px] md:mt-15 md:mb-15 lg:text-[110px] lg:mt-18 lg:mb-18 xl:text-[130px] 2xl:text-[150px]"
                ,amiri.className)}
            >
                رامي وشازيه
            </h1>
            {/* </svg> */}
        </motion.div>
    );
};

export default ArabicNames;

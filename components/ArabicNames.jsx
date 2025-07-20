import * as motion from "framer-motion/client";
import { cn } from "@/lib/utils";
import { Tajawal } from "next/font/google";

const tajawal = Tajawal({
    weight: "400",
    subsets: ["arabic"],
});

const ArabicNames = () => {
    return (
        <motion.div className={cn("justify-center")}>
            <h1
                className={cn(
                    "text-5xl mt-10 mb-5 sm:text-8xl sm:mt-15 md:text-[110px] md:mt-15 md:mb-15 lg:text-[130px] lg:mt-18 lg:mb-18 xl:text-[150px] 2xl:text-[170px]"
                )}
            >
                رامي وشازيه
            </h1>
            {/* </svg> */}
        </motion.div>
    );
};

export default ArabicNames;

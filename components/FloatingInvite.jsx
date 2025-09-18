"use client";

import { cn } from "@/lib/utils";
import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import { ChevronsDownIcon } from "lucide-react";
import { attentionDownItem } from "@/lib/variants";
import { Button } from "./ui/button";
import weddingInvite from "@/public/weddingInvite.jpg";

const FloatingInvite = ({ ref }) => {
    const { scrollY } = useScroll();
    const chevronOpacity = useTransform(scrollY, [0, 50], [1, 0]);

    const onScrollClick = () => {
        ref.current?.scrollIntoView({ behavior: "smooth" });
    };
    return (
        <motion.div
            initial={{ y: 500, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 1.5, ease: "easeOut" }}
            className={cn(
                "relative w-[clamp(200px,85%,400px)] xl:w-[clamp(200px,75%,450px)] 2xl:w-[clamp(200px,75%,500px)] h-[clamp(275px, 85%, 675px)] xl:h-[clamp(275px, 85%, 600px)] flex flex-col justify-center"
            )}
        >
            <div className={cn("relative w-full h-auto")}>
                <Image
                    src={weddingInvite}
                    priority={true}
                    placeholder="blur"
                    sizes="(max-width: 533px) 85vw, 400px"
                    quality={100}
                    alt="Picture of wedding invitation"
                    className={cn(
                        "object-cover",
                        "border-solid shadow-2xl/50 dark:shadow-2xl dark:shadow-white"
                    )}
                />
            </div>
            <motion.div
                variants={attentionDownItem}
                initial="hidden"
                animate="attention"
                style={{ opacity: chevronOpacity }}
                className={cn("flex mt-5 justify-center")}
            >
                <Button variant={"ghost"} onClick={onScrollClick}>
                    <ChevronsDownIcon />
                </Button>
            </motion.div>
        </motion.div>
    );
};

export default FloatingInvite;

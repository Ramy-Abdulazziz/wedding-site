"use client";

import { cn } from "@/lib/utils";
import RsvpForm from "@/components/rsvpForm";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { loadRsvpData } from "@/app/(protected)/rsvp/_lib/actions";
import { toast } from "sonner";
import { Skeleton } from "./ui/skeleton";
import { textContainer } from "@/lib/variants";


const RsvpContent = () => {
    const [initialData, setInitialData] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const populateRsvpInfo = async () => {
            try {
                const data = await loadRsvpData();
                if (data.error) {
                    throw new Error(data.error);
                }
                setInitialData(data);
                toast.info("Your RSVP data has been loaded!");
            } catch (err) {
                console.error(err);
                toast.error("Failed to load RSVP data");
            } finally {
                setLoading(false);
            }
        };

        populateRsvpInfo();
    }, []);

    if (loading) {
        return (
            <Skeleton
                className={cn(
                    "mx-auto h-[500px] mt-35 max-w-[85%] lg:max-w-[75%] xl:max-w-[50%] 2xl:max-w-[50%] pb-[5vh] rounded-xl"
                )}
            />
        );
    }
    return (
        !loading && (
            <div className={cn("")}>
                <section className={cn("mx-auto pb-[5vh]")}>
                    <motion.div
                        className={cn("container mx-auto")}
                        variants={textContainer}
                        initial="hidden"
                        whileInView="show"
                        viewport={{ once: true }}
                    >
                        <RsvpForm initialData={initialData} />
                    </motion.div>
                </section>
            </div>
        )
    );
};

export default RsvpContent;

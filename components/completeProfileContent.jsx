"use client";

import { getCurrentUser } from "@/app/(protected)/complete-profile/_lib/actions";
import { toast } from "sonner";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { Skeleton } from "./ui/skeleton";
import { textContainer } from "@/lib/variants";
import { cn } from "@/lib/utils";
import CompleteProfileForm from "@/components/completeProfileForm";


const CompleteProfileContent = () => {
    const [initialData, setInitialData] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const populateUserInfo = async () => {
            try {
                const data = await getCurrentUser();
                if (data.error) {
                    throw new Error(data.error);
                }
                console.log(data)
                setInitialData(data);
                toast.info("Your user data has been loaded!");
            } catch (err) {
                console.error(err);
                toast.error("Failed to load user data");
            }finally{ 
                setLoading(false); 
            }
        };

        populateUserInfo(); 
    }, []);

    if (loading) {
        return (
            <Skeleton
                className={cn(
                    "bg-gray-400/35 dark:bg-muted mx-auto h-[500px] mt-35 max-w-[85%] lg:max-w-[75%] xl:max-w-[50%] 2xl:max-w-[50%] pb-[5vh] rounded-xl"
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
                     <CompleteProfileForm initialData={initialData}/>   
                    </motion.div>
                </section>
            </div>
        )
    );
};


export default CompleteProfileContent; 
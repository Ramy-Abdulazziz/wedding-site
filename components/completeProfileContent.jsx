"use client";

import {
    getCurrentUser,
    getGuestContactCompletion,
} from "@/app/(protected)/complete-profile/_lib/actions";
import { toast } from "sonner";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { Skeleton } from "./ui/skeleton";
import { textContainer } from "@/lib/variants";
import { cn } from "@/lib/utils";
import CompleteProfileForm from "@/components/completeProfileForm";
import CompleteProfileFormPhone from "./completeProfileFormPhone";
import { useRouter } from "next/navigation";
import { authConfig } from "@/auth.config";

const CompleteProfileContent = () => {
    const [initialData, setInitialData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [hasEmail, setHasEmail] = useState(true);
    const [hasPhone, setHasPhone] = useState(true);

    const router = useRouter();

    useEffect(() => {
        const populateUserInfo = async () => {
            try {
                const data = await getCurrentUser();
                const guestContactCompletion =
                    await getGuestContactCompletion();
                if (!data || guestContactCompletion?.error) {
                    toast.error("Please request a new log in link");
                    router.push(authConfig.unAuthedHomeRoute);
                    return;
                }
                setInitialData(data);
                console.log(guestContactCompletion);
                setHasEmail(guestContactCompletion.email);
                setHasPhone(guestContactCompletion.phone);
            } catch (err) {
                console.error(err);
                toast.error("Failed to load user data");
                router.push(authConfig.unAuthedHomeRoute);
            } finally {
                setLoading(false);
            }
        };

        populateUserInfo();
    }, []);

    if (loading || !initialData) {
        return (
            <Skeleton
                className={cn(
                    "bg-gray-400/35 dark:bg-muted mx-auto h-[500px] mt-35 max-w-[85%] lg:max-w-[75%] xl:max-w-[50%] 2xl:max-w-[50%] pb-[5vh] rounded-xl"
                )}
            />
        );
    }

    if (!hasPhone) {
        return (
            !loading &&
            initialData &&
            !hasPhone && (
                <div className={cn("")}>
                    <section className={cn("mx-auto pb-[5vh]")}>
                        <motion.div
                            className={cn("container mx-auto")}
                            variants={textContainer}
                            initial="hidden"
                            whileInView="show"
                            viewport={{ once: true }}
                        >
                            <CompleteProfileFormPhone />
                        </motion.div>
                    </section>
                </div>
            )
        );
        s;
    }

    return (
        !loading &&
        initialData &&
        !hasEmail && (
            <div className={cn("")}>
                <section className={cn("mx-auto pb-[5vh]")}>
                    <motion.div
                        className={cn("container mx-auto")}
                        variants={textContainer}
                        initial="hidden"
                        whileInView="show"
                        viewport={{ once: true }}
                    >
                        <CompleteProfileForm />
                    </motion.div>
                </section>
            </div>
        )
    );
};

export default CompleteProfileContent;

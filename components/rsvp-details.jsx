"use client";


import { textContainer, textItem } from "@/lib/variants";
import { motion } from "framer-motion"
import { cn } from "@/lib/utils";
import Count from "@/components/Count";
import Link from "next/link";
import { Button } from "@/components/ui/button";

const RsvpDetails = () => {
    return (
        <>
            <motion.p id='rsvp'
                className={cn(
                    "text-2xl sm:text-3xl md:text-3xl xl:text-3xl mb-5 scroll-mt-24"
                )}
                variants={textItem}
            >
                RSVP
            </motion.p>
            <motion.div
                className={cn(
                    "flex flex-col gap-5 sm:flex-row gap-15 md:flex-row lg:flex-row xl:flex-row mb-10 mt-2"
                )}
                variants={textItem}
            >
                <div>
                    <p
                        className={cn(
                            "text-md text-gray-500 lg:text-lg xl:text-lg 2xl:text-xl  mb-2"
                        )}
                    >
                        {" "}
                        Deadline
                    </p>

                    <div>
                        <p
                            className={cn(
                                "text-lg lg:text-2xl xl:text-2xl 2xl:text-2xl"
                            )}
                        >
                            October 26th, 2025
                        </p>
                        <Count year={2025} month={10} days={26} down={false} />
                    </div>
                    <Button
                        asChild
                        variant={"secondary"}
                        className={cn("mt-3 lg:text-lg xl:text-lg 2xl:text-xl")}
                    >
                        <Link href="https://calendar.google.com/calendar/event?action=TEMPLATE&tmeid=NzJqcGlvZTE0NHVwMDZtNTJudjRoMGFvdnAgYWJkdWxhenppei5uYWRlcmkuYWNjdHNAbQ&tmsrc=abdulazziz.naderi.accts%40gmail.com">
                            {" "}
                            Add to Calendar{" "}
                        </Link>
                    </Button>
                </div>

                <div>
                    <p
                        className={cn(
                            "text-md text-gray-500 lg:text-lg xl:text-lg 2xl:text-xl mb-2"
                        )}
                    >
                        {" "}
                        How
                    </p>
                    <p
                        className={cn(
                            "text-lg lg:text-2xl xl:text-2xl 2xl:text-2xl"
                        )}
                    >
                        {" "}
                        RSVP Open
                    </p>
                    <p
                        className={cn(
                            "text-lg lg:text-2xl xl:text-2xl 2xl:text-2xl"
                        )}
                    >
                        {" "}
                        Please RSVP below
                    </p>
                    <Button
                        asChild
                        variant={"secondary"}
                        className={cn("mt-3 lg:text-lg xl:text-lg 2xl:text-xl")}
                    >
                        <Link href="/rsvp"> Find Your Invite </Link>
                    </Button>
                </div>
            </motion.div>
        </>
    );
};

export default RsvpDetails;

"use client";

import { textContainer, textItem } from "@/lib/variants";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import Count from "@/components/Count";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import AddToCalendar from "@/components/AddToCalendar";
import rsvpEvent from "@/lib/events/rsvp/rsvp-deadline.json";
import { RadarIcon, UserSearchIcon } from "lucide-react";

const RsvpDetails = () => {
    return (
        <>
            <motion.p
                id="rsvp"
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
                    <div className={cn("")}>
                        <AddToCalendar
                            event={rsvpEvent}
                            icalUrl={"/rsvp-deadline.ics"}
                        />
                    </div>
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
                        className={cn(
                            "mt-3 text-base flex lg:text-lg xl:text-lg 2xl:text-xl cursor-pointer leading-normal "
                        )}
                    >
                        <Link
                            href="/rsvp"
                            className={cn(
                                "inline-flex text-base items-center gap-2 cursor-pointer leading-normal "
                            )}
                        >
                            <div className={cn("inline-flex space-x-2 lg:items-center")}>
                                <UserSearchIcon
                                    className={cn("w-5 h-5 shrink-0")}
                                />
                                <span>Find Your Invite</span>
                            </div>
                        </Link>
                    </Button>
                </div>
            </motion.div>
        </>
    );
};

export default RsvpDetails;

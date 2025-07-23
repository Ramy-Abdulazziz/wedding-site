"use client";

import { motion } from "framer-motion"
import { cn } from "@/lib/utils";
import Count from "@/components/Count";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { textContainer, textItem } from "@/lib/variants";

const TimingDetails = () => {
    return (
        <>
            <motion.p
                className={cn("text-2xl sm:text-3xl md:text-3xl xl:text-3xl mb-5")}
                variants={textItem}
            >
                {" "}
                Ramy and Shazia's Wedding
            </motion.p>
            <motion.div
                className={cn(
                    "flex flex-col gap-5 sm:flex-row gap-15 md:flex-row lg:flex-row xl:flex-row mb-10 mt-2"
                )}
                variants={textItem}
            >
                <div id="when" className={cn('scroll-mt-24')}>
                    <p
                        className={cn(
                            "text-md text-gray-500 lg:text-lg xl:text-lg 2xl:text-xl  mb-2"
                        )}
                    >
                        {" "}
                        When
                    </p>

                    <div>
                        <p
                            className={cn(
                                "text-lg lg:text-2xl xl:text-2xl 2xl:text-2xl"
                            )}
                        >
                            November 26th, 2025
                        </p>
                        <Count year={2025} month={11} days={26} down={true} />
                    </div>
                    <Button
                        asChild
                        variant={"secondary"}
                        className={cn(
                            "mt-3 lg:text-lg xl:text-lg 2xl:text-xl "
                        )}
                    >
                        <Link href="https://calendar.google.com/calendar/event?action=TEMPLATE&amp;tmeid=MDltazNuZmhoaDg5M24ycGFmMmltZ2plMzggYWJkdWxhenppei5uYWRlcmkuYWNjdHNAbQ&amp;tmsrc=abdulazziz.naderi.accts%40gmail.com">
                            {" "}
                            Add to Calendar{" "}
                        </Link>
                    </Button>
                </div>
                <div id="where" className={cn("flex-grow scroll-mt-24")}>
                    <p
                        className={cn(
                            "text-md text-gray-500 lg:text-lg xl:text-lg 2xl:text-xl  mb-2"
                        )}
                    >
                        {" "}
                        Where
                    </p>
                    <p
                        className={cn(
                            "text-lg lg:text-2xl xl:text-2xl 2xl:text-2xl"
                        )}
                    >
                        {" "}
                        Crest Hollow Country Club
                    </p>
                    <div
                        className="relative max-w-5/6  h-0 mt-2"
                        style={{ paddingBottom: "56.25%" }}
                    >
                        <iframe
                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3019.4499025161417!2d-73.46783248802627!3d40.818080571258584!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c2820a858fdf25%3A0x5f349321629070e4!2sCrest%20Hollow%20Country%20Club!5e0!3m2!1sen!2sus!4v1750810406312!5m2!1sen!2sus"
                            className="absolute top-0 left-0 w-[80%] h-[80%]"
                            style={{ border: 0 }}
                            allowFullScreen
                            loading="lazy"
                            referrerPolicy="no-referrer-when-downgrade"
                        ></iframe>
                    </div>
                </div>
            </motion.div>
        </>
    );
};

export default TimingDetails;

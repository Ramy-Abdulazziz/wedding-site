"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import Count from "@/components/Count";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { textContainer, textItem } from "@/lib/variants";

const BookingDetails = () => {
    return (
        <>
            <motion.p
                id="hotelblock"
                className={cn(
                    "text-2xl sm:text-3xl md:text-3xl xl:text-3xl mb-5 scroll-mt-24"
                )}
                variants={textItem}
            >
                {" "}
                Hotel Block
            </motion.p>
            <motion.div
                className={cn(
                    "flex flex-col text-xl gap-5 sm:flex-row gap-15 md:flex-row lg:flex-row xl:flex-row mb-10 mt-2 pr-5"
                )}
                variants={textItem}
            >
                <div className={cn("container mx-auto text-justify")}>
                    A hotel block has been setup at a local hotel, which can be
                    booked using the link below (group code: ABD). The code
                    garauntees a rate of $140 dollars per night. If you are
                    interested in this option, we suggest you book ASAP as there
                    are a limited amount of rooms available. Additionally we
                    have provided alternate accomadation options of nearby
                    hotels within different price ranges. These however have no
                    block set up.
                </div>
            </motion.div>
            <motion.div
                className={cn(
                    "flex flex-col gap-5 sm:flex-row gap-15 md:flex-row lg:flex-row xl:flex-row mb-10 mt-2"
                )}
                variants={textItem}
            >
                <div id="when" className={cn("scroll-mt-24")}>
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
                        <Count year={2025} month={11} days={26} down={true} />
                    </div>
                    <Button
                        asChild
                        variant={"secondary"}
                        className={cn(
                            "mt-3 lg:text-lg xl:text-lg 2xl:text-xl "
                        )}
                    >
                        <Link
                            href="https://www.ihg.com/holidayinn/hotels/us/en/find-hotels/select-roomrate?fromRedirect=true&qSrt=sBR&qDest=215%20Sunnyside%20Blvd,%20Plainview,%20NY%2011803,%20USA&qErm=false&qSlH=nycpv&qRms=1&qAdlt=1&qChld=0&qCiD=26&qCiMy=102025&qCoD=27&qCoMy=102025&qGrpCd=ABD&setPMCookies=true&qSHBrC=HI&qpMbw=0&qpMn=1&srb_u=1&qRmFltr="
                            target="_blank"
                        >
                            {" "}
                            Book Now{" "}
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
                        Holiday Inn Plainview{" "}
                    </p>
                    <div
                        className="relative max-w-5/6  h-0 mt-2"
                        style={{ paddingBottom: "56.25%" }}
                    >
                        <iframe
                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3020.436221495386!2d-73.46641699999999!3d40.796406999999995!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c281fe49f98ae1%3A0x498cda2f0071b1f4!2sHoliday%20Inn%20Plainview-Long%20Island%2C%20an%20IHG%20Hotel!5e0!3m2!1sen!2sus!4v1756526333038!5m2!1sen!2sus"
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

export default BookingDetails;

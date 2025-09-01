"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { Separator } from "@/components/ui/separator";
import { useEffect, useState } from "react";
import { textContainer, textItem } from "@/lib/variants";
import BookingDetails from "./booking-details";
import TravelTips from "./TravelTips";
import alternateHotels from "@/lib/alternateAccomadations/alternateAccomadations.json";
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel";
import AlternateBookingCard from "./AlternateBookingCard";
import HotelBlockInfoCard from "./HotelBlockInfoCard";

export default function TravelContent() {
    const [hotelData, setHotelData] = useState(Object.values(alternateHotels));

    useEffect(() => {
        const hash = window.location.hash;

        if (hash) {
            const timer = setTimeout(() => {
                const element = document.querySelector(hash);
                if (element) {
                    element.scrollIntoView({ behavior: "smooth" });
                }
            }, 100);

            return () => clearTimeout(timer);
        }
    }, []);

    return (
        <div className={cn("pb-[50vh]")}>
            <section>
                <motion.div
                    className={cn(
                        "container mx-auto pl-5 pr-5 mb-10 sm:pl-7 pt-5"
                    )}
                    variants={textContainer}
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true }}
                >
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
                    <HotelBlockInfoCard />
                </motion.div>
            </section>
            <Separator
                className={cn(
                    "flex justify-self-center max-w-[94%] sm:max-w-[92%] md:max-w-[93%] lg:max-w-[95%] xl:max-w-[84%] 2xl:max-w-[86%]"
                )}
            />
            <section className={cn("")}>
                <motion.div
                    className={cn("container mx-auto  pl-5 pr-5 mb-10 mt-5")}
                    variants={textContainer}
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true }}
                >
                    <motion.p
                        id="alternateHotels"
                        className={cn(
                            "text-2xl sm:text-3xl md:text-3xl xl:text-3xl mb-5 scroll-mt-24"
                        )}
                        variants={textItem}
                    >
                        {" "}
                        Alternate Hotels
                    </motion.p>
                    <Carousel
                        className={""}
                        opts={{
                            align: "start",
                            loop: true,
                        }}
                    >
                        <div className={cn("h-full")}>
                            <CarouselContent className={cn("h-full")}>
                                {hotelData.map((hotel, index) => (
                                    <CarouselItem
                                        key={index}
                                        className={cn(
                                            "basis-full sm:basis-1/2 md:basis-1/3 lg:basis-1/3 xl:basis-1/3 2xl:1/3 "
                                        )}
                                    >
                                        <AlternateBookingCard
                                            className={cn("")}
                                            hotelDetails={hotel}
                                        />
                                    </CarouselItem>
                                ))}
                            </CarouselContent>
                            <div
                                className={cn(
                                    "flex flex-row justify-between mt-10"
                                )}
                            >
                                <CarouselPrevious className={cn("flex")} />
                                <CarouselNext className={cn("flex")} />
                            </div>
                        </div>
                    </Carousel>
                </motion.div>
            </section>
        </div>
    );
}

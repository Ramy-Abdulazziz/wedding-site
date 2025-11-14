"use client";

import { cn } from "@/lib/utils";
import { Separator } from "./ui/separator";
import { Calendar, Clock, MapPin, ArrowRight } from "lucide-react";
import { textContainer, textItem } from "@/lib/variants";
import { motion } from "framer-motion";

const events = [
    {
        name: "Ceremony",
        id: "nikkah",
        description: "Join us as we perform our Nikkah ceremony.",
        time_start: "6:15",
        time_end: "7:00",
        duration: "45 Minutes",
        location: "Crest Hollow County Club",
    },
    {
        name: "Cocktail Hour",
        id: "cocktail",
        description: "Enjoy drinks and snacks while we capture photos.",
        time_start: "7:00",
        time_end: "8:00",
        duration: "1 Hour",
        location: "Crest Hollow County Club",
    },
    {
        name: "Reception",
        id: "recep",
        description: "Dinner, dancing, and festivities to celebrate together.",
        time_start: "8:00",
        time_end: "12:00",
        duration: "1 Hour",
        location: "Crest Hollow County Club",
    },
];

const ScheduleTree = () => {
    return (
        <>
            <div className={cn("py-12 px-4")}>
                <div className={cn("max-w-5xl mx-auto")}>
                    <div className={cn("mt-2 md:mb-5 md:ml-5")}>
                        <h2 className={cn("text-5xl font-bold mb-2")}>
                            Schedule
                        </h2>
                        <p className={cn("text-lg text-neutral-500")}>
                            {" "}
                            Three Events. One Great Day.
                        </p>
                    </div>
                </div>
            </div>
            <Separator />
            <motion.div
                variants={textContainer}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true }}
                className="max-w-5xl mx-auto px-6 py-16 md:py-24"
            >
                <div className="space-y-0 border-l border-neutral-800">
                    {events.map((event, index) => {
                        const delay = index * 100;
                        return (
                            <motion.div
                                key={event.id}
                                className="group relative pl-8 pb-16 last:pb-0"
                                variant={textItem}
                                initial="hidden"
                                whileInView="show"
                                viewport={{ once: true }}
                            >
                                {/* Timeline dot */}
                                <div className="absolute left-0 top-2 w-px h-full bg-neutral-800 -ml-px"></div>
                                <div className="absolute left-0 top-2 w-2 h-2 -ml-1 rounded-full bg-white ring-2 ring-black transition-all duration-300 group-hover:scale-150 light:bg-black"></div>

                                {/* Content */}
                                <div className="space-y-6">
                                    {/* Header */}
                                    <div className="flex flex-col md:flex-row md:items-baseline md:justify-between gap-4">
                                        <div>
                                            <div className="flex items-baseline gap-4 mb-2">
                                                <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
                                                    {event.name}
                                                </h2>
                                                <span className="text-sm font-mono text-neutral-500">
                                                    {String(index + 1).padStart(
                                                        2,
                                                        "0"
                                                    )}
                                                </span>
                                            </div>
                                            <p className="text-neutral-400 leading-relaxed max-w-xl">
                                                {event.description}
                                            </p>
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-6 border-t border-neutral-800/50">
                                        <div className="space-y-1">
                                            <div className="flex items-center gap-2 text-xs font-mono text-neutral-500 uppercase tracking-wider mb-2">
                                                <Clock className="w-3 h-3" />
                                                <span>Time</span>
                                            </div>
                                            <div className="text-base font-medium">
                                                {event.time_start} PM
                                            </div>
                                        </div>

                                        <div className="space-y-1">
                                            <div className="flex items-center gap-2 text-xs font-mono text-neutral-500 uppercase tracking-wider mb-2">
                                                <Calendar className="w-3 h-3" />
                                                <span>Duration</span>
                                            </div>
                                            <div className="text-base font-medium">
                                                {event.duration}
                                            </div>
                                        </div>

                                        <div className="space-y-1">
                                            <div className="flex items-center gap-2 text-xs font-mono text-neutral-500 uppercase tracking-wider mb-2">
                                                <MapPin className="w-3 h-3" />
                                                <span>Location</span>
                                            </div>
                                            <div className="text-base font-medium">
                                                {event.location}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        );
                    })}
                </div>
            </motion.div>
        </>
    );
};

export default ScheduleTree;

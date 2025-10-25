import {
    Drawer,
    DrawerClose,
    DrawerContent,
    DrawerDescription,
    DrawerFooter,
    DrawerHeader,
    DrawerTitle,
    DrawerTrigger,
} from "@/components/ui/drawer";
import { FaGoogle } from "react-icons/fa6";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { CalendarIcon, CalendarPlus } from "lucide-react";
import { Inter } from "next/font/google";

const inter = Inter({
    weight: "400",
    subsets: ["latin"],
});

const CalendarDrawer = ({ event, icalUrl }) => {
    const formatGoogleCalendarDate = (dateString) => {
        return new Date(dateString).toISOString().replace(/-|:|\.\d+/g, "");
    };

    const googleCalendarUrl = new URL("https://www.google.com/calendar/render");
    googleCalendarUrl.searchParams.append("action", "TEMPLATE");
    googleCalendarUrl.searchParams.append("text", event.title);
    googleCalendarUrl.searchParams.append(
        "dates",
        `${formatGoogleCalendarDate(event.startTime)}/${formatGoogleCalendarDate(event.endTime)}`
    );
    googleCalendarUrl.searchParams.append("details", event.description);
    if (event?.location) {
        googleCalendarUrl.searchParams.append("location", event.location);
    }
    googleCalendarUrl.searchParams.append("ctz", "America/New_York");
    return (
        <Drawer className={cn("")}>
            <DrawerTrigger asChild>
                <Button
                    variant={"secondary"}
                    className="mt-3 inline-flex items-center lg:text-lg xl:text-lg 2xl:text-xl justify-center gap-2 px-4 py-2 text-base leading-none"
                >
                    <CalendarPlus className="w-5 h-5 shrink-0" />
                    <span className={cn(inter.className)}>Add To Calendar</span>
                </Button>
            </DrawerTrigger>
            <DrawerContent>
                <DrawerHeader>
                    <DrawerTitle className={cn("text-2xl")}>
                        Add To Calendar
                    </DrawerTitle>
                    <DrawerDescription className={cn("text-lg")}>
                        Choose a calendar type
                    </DrawerDescription>
                </DrawerHeader>
                <div className={cn("flex flex-row justify-center gap-10 min-h-50 mt-10")}>
                    <div
                        className={cn(
                            "flex justify-center items-center border-1 w-35 h-25 mb-10 bg-card rounded-sm"
                        )}
                    >
                        <Link
                            href={googleCalendarUrl.toString()}
                            target="_blank"
                            rel="noopener noreferrer"
                            className={cn("cursor-pointer leading-normal")}
                        >
                            <div
                                className={cn(
                                    "flex flex-col items-center justify-center gap-2"
                                )}
                            >
                                <FaGoogle
                                    className={cn("w-10 h-10 shrink-0")}
                                />
                                <span className={cn(inter.className)}>
                                    Gcal
                                </span>
                            </div>
                        </Link>
                    </div>
                    <div
                        className={cn(
                            "flex justify-center items-center mb-10 border-1 w-35 h-25 bg-card rounded-sm"
                        )}
                    >
                        <a
                            href={icalUrl}
                            className={cn("cursor-pointer leading-normal ")}
                        >
                            <div
                                className={cn(
                                    "flex flex-col items-center justify-center gap-2"
                                )}
                            >
                                <CalendarIcon
                                    className={cn("w-10 h-10 shrink-0 ")}
                                />
                                <span className={cn(inter.className)}>
                                    iCal
                                </span>
                            </div>
                        </a>
                    </div>
                </div>
            </DrawerContent>
        </Drawer>
    );
};

export default CalendarDrawer;

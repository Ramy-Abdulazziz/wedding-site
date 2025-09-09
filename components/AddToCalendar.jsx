import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
    DropdownMenuShortcut,
} from "@/components/ui/dropdown-menu";
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

const AddToCalendar = ({ event, icalUrl }) => {
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
        <DropdownMenu className={cn("inline-flex items-center justify-center")}>
            <DropdownMenuTrigger asChild>
                <Button
                    variant={"secondary"}
                    className="mt-3 inline-flex items-center lg:text-lg xl:text-lg 2xl:text-xl justify-center gap-2 px-4 py-2 text-base leading-none"
                >
                    <CalendarPlus className="w-5 h-5 shrink-0" />
                    <span className={cn(inter.className)}>Add To Calendar</span>
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className={cn("")}>
                <DropdownMenuItem asChild>
                    <Link
                        href={googleCalendarUrl.toString()}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={cn(
                            "flex text-base items-center gap-2 cursor-pointer leading-normal"
                        )}
                    >
                        <div className={cn("inline-flex items-center justify-center space-x-2")}>
                            <FaGoogle className={cn("w-5 h-5 shrink-0")} />
                            <span className={cn(inter.className)}>Google</span>
                        </div>
                    </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                    <a
                        href={icalUrl}
                        className={cn(
                            "inline-flex text-base items-center gap-2 cursor-pointer leading-normal "
                        )}
                    >
                        <div className={cn("inline-flex items-center justify-center space-x-2")}>
                            <CalendarIcon className={cn("w-5 h-5 shrink-0")} />
                            <span className={cn(inter.className)}>iCal</span>
                        </div>
                    </a>
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
};

export default AddToCalendar;

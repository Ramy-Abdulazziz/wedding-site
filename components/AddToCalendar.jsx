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
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button
                    variant={"secondary"}
                    className={cn("mt-3 lg:text-lg xl:text-lg 2xl:text-xl cursor-pointer")}
                >
                    <CalendarPlus />
                    Add To Calendar
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className={cn("")}>
                <DropdownMenuItem asChild>
                    <div
                        className={cn(
                            "flex flex-row justify-left w-full text-center cursor-pointer "
                        )}
                    >
                        <FaGoogle className={cn("h-4 w-4")} />
                        <Link
                            href={googleCalendarUrl.toString()}
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            {" "}
                            Google{" "}
                        </Link>
                    </div>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                    <a href={icalUrl}>
                        <div
                            className={cn(
                                "flex items-center gap-2 cursor-pointer"
                            )}
                        >
                            <CalendarIcon className={cn("h-4 w-4")} />
                            <span>iCal</span>
                        </div>
                    </a>
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
};

export default AddToCalendar;
